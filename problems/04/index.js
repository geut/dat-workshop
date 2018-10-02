const hypercore = require('hypercore')
const ram = require('random-access-memory')
const pump = require('pump')
const writer = require('flush-write-stream')

/**
 * 1. You need a ReadableStream to read the data from the feed
 * 2. Append each message in the messages list
 * 3. Pipe your streams in order to work
 * 4. Pipe your streams to accomplish the replication process
 */
module.exports = (key, peer) => {
  const feed = hypercore(ram, key, { valueEncoding: 'utf8' })

  return new Promise((resolve, reject) => {
    // we need to sync our database with the remote one
    const onFinishSync = () => {
      // when is done we can retrieve the log
      const messages = []

      // const reader = (1)

      // our transform to process the data of the ReadableStream
      const ws = writer((data, enc, next) => {
        // (2)
      })

      // pump(reader, (3), err => {
      //   if (err) return reject(err)
      //   resolve()
      // }
    }

    // pump(peer, (4))
  })
}
