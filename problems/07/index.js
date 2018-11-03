const EventEmitter = require('events')
const hyperdb = require('hyperdb')
const hyperid = require('hyperid')
const pump = require('pump')
const forEachChunk = require('../../lib/for-each-chunk')

const uuid = hyperid()

/**
 * 0 - When the db is ready we need to update our messages history and start watching for new messages
 * 1 - Create a reader history stream and iterate in reverse mode
 * 2 - When we have all the messages, destroy the stream
 * 3 - Push each new message in the Map messages
 * 4 - Emit a `message` event with the data and the key as arguments
 * 5 - Pipe into our write stream and call a function when the process is done
 * 6 - We need to watch the namespace `messages/*` to detect when there are new messages
 */
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

    this._updateHistory(/* ... */)
  }

  writeMessage (message) {
    const key = `/messages/${uuid()}`
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
    // const h = (1)

    // forEachChunk returns a stream
    const ws = forEachChunk({ objectMode: true }, (data, enc, next) => {
      const { key, value } = data
      // Note: since we are reading on reverse order... If we already have the last one, we have'em all
      if (/messages/.test(key)) {
        if (this.messages.has(key)) {
          // (2)
          return
        }

        // (3)

        // (4)

      }

      next()
    })

    pump(h, /* (5) */)
  }

  _watchForMessages () {
    // (6)

  }

  _ready () {
    return new Promise(resolve => this.db.on('ready', resolve))
  }
}
