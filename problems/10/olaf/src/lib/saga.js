const EventEmitter = require('events')
const { Writable } = require('stream')
const hyperdb = require('hyperdb')
const pump = require('pump')
const hyperid = require('hyperid')
const uuid = hyperid()

class ForEachChunk extends Writable {
  constructor (opts, cb) {
    if (!cb) {
      cb = opts
      opts = {}
    }
    super(opts)

    this.cb = cb
  }

  _write (chunk, enc, next) {
    this.cb(chunk, enc, next)
  }
}

const forEachChunk = (...args) => new ForEachChunk(...args)

class Saga extends EventEmitter {
  constructor (storage, key, username) {
    super()

    this.messages = new Map()
    this.users = new Map()
    this.username = username
    this.timestamp = Date.now()
    this.db = hyperdb(storage, key, { valueEncoding: 'json' })
  }

  async initialize () {
    await this._ready()

    this._updateHistory(this._watchForMessages.bind(this))
  }

  writeMessage (message) {
    const key = `messages/${uuid()}`
    const data = {
      key,
      message,
      username: this.username,
      timestamp: Date.now()
    }

    return new Promise((resolve, reject) => {
      this.db.put(key, data, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(key)
        }
      })
    })
  }

  replicate () {
    return this.db.replicate({
      live: true,
      userData: JSON.stringify({
        key: this.db.local.key,
        username: this.username,
        timestamp: this.timestamp
      })
    })
  }

  async connect (peer) {
    if (!peer.remoteUserData) {
      throw new Error('peer does not have userData')
    }

    const data = JSON.parse(peer.remoteUserData)

    const key = Buffer.from(data.key)
    const username = data.username

    await this._authorize(key)

    if (!this.users.has(username)) {
      this.users.set(username, new Date())
      this.emit('join', data)
      peer.on('close', () => {
        if (!this.users.has(username)) return
        this.users.delete(username)
        this.emit('leave', data)
      })
    }
  }

  _authorize (key) {
    return new Promise((resolve, reject) => {
      this.db.authorized(key, (err, auth) => {
        if (err) return reject(err)

        if (auth) {
          return resolve()
        }

        this.db.authorize(key, (err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    })
  }

  _updateHistory (onFinish) {
    const h = this.db.createHistoryStream({ reverse: true })

    const ws = forEachChunk({ objectMode: true }, (data, enc, next) => {
      const { key, value } = data

      if (/messages/.test(key)) {
        if (this.messages.has(key)) {
          h.destroy()
          return
        }

        this.messages.set(key, value)
        this.emit('message', value, key)
      }

      next()
    })

    pump(h, ws, onFinish)
  }

  _watchForMessages () {
    this.db.watch('messages', () => {
      this._updateHistory()
    })
  }

  _ready () {
    return new Promise(resolve => this.db.ready(resolve))
  }
}

module.exports = (...args) => new Saga(...args)
