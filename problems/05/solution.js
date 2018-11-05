const hyperdb = require('hyperdb')

module.exports = class Saga {
  constructor (storage, key, username) {
    this.messages = new Map()
    this.users = new Map()
    this.username = username
    this.db = hyperdb(storage, key, { valueEncoding: 'json' })
  }
}
