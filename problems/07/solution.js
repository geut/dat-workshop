const EventEmitter = require('events')
const hyperdb = require('hyperdb')
const hyperid = require('hyperid')
const writer = require('flush-write-stream')
const pump = require('pump')
const uuid = hyperid()

module.exports = class Saga extends EventEmitter {
  constructor (storage, key, username) {
    super()

    this.messages = new Map()
    this.users = new Map()
    this.username = username
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
        if (err) return reject(err)
        resolve(key)
      })
    })
  }

  _updateHistory (onFinish) {
    const h = this.db.createHistoryStream({ reverse: true })

    const ws = writer.obj((data, enc, next) => {
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
