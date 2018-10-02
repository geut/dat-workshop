const hypercore = require('hypercore')
const ram = require('random-access-memory')
const pump = require('pump')
const writer = require('flush-write-stream')

module.exports = (key, peer) => {
  const feed = hypercore(ram, key, { valueEncoding: 'utf8' })

  return new Promise((resolve, reject) => {
    // we need to sync our database with the remote one
    const onFinishSync = () => {
      // when is done we can retrieve the log
      const messages = []

      const reader = feed.createReadStream()

      const ws = writer((data, enc, next) => {
        messages.push(data)
        next()
      })

      pump(reader, ws, err => {
        if (err) return reject(err)
        resolve(messages)
      })
    }

    pump(peer, feed.replicate(), peer, onFinishSync)
  })
}
