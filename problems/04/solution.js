const EventEmitter = require('events')
const hypercore = require('hypercore')
const ram = require('random-access-memory')

module.exports = class Solution extends EventEmitter {
  constructor () {
    super()

    this.db = hypercore(ram, { valueEncoding: 'json' })
    this.db.on('ready', () => {
      this.emit('keys', {
        publicKey: this.db.key,
        discoveryKey: this.db.discoveryKey
      })
    })
  }
}
