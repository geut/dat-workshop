const hyperdb = require('hyperdb')
const hyperid = require('hyperid')
const uuid = hyperid()

module.exports = class Saga {
  constructor (storage, key, username) {
    this.messages = new Map()
    this.users = new Map()
    this.username = username
    this.db = hyperdb(storage, key, { valueEncoding: 'json' })
  }

  ready () {
    return new Promise(resolve => this.db.ready(resolve))
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
}
