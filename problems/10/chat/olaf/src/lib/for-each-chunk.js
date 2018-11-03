const { Writable } = require('stream')

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

module.exports = (...args) => new ForEachChunk(...args)
