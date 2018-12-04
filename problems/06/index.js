const hyperdb = require('hyperdb')
const hyperid = require('hyperid')()

module.exports = class Saga {
  constructor (storage, key, username) {
    this.messages = new Map()
    this.users = new Map()
    this.username = username
    this.timestamp = Date.now()
    this.db = hyperdb(storage, key, { valueEncoding: 'json' })
  }

  ready () {}

  writeMessage (message) {
    const key = '...' // this key should be unique
    const data = {}

    return new Promise((resolve, reject) => {
      this.db.put(key, data, err => {
        // ...
      })
    })
  }
}
