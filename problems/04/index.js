const hypercore = require('hypercore')
const ram = require('random-access-memory')
const pump = require('pump')
const writer = require('flush-write-stream')

/**
 * Note: if you are not familiar with `pump` please check
 * the tips section!
 *
 * Note: if you are not familiar with `flush-write-stream` please check
 * the tips section!
 */
module.exports = (key, peer) => {
  const feed = hypercore(ram, key, { valueEncoding: 'utf8' })

  return new Promise((resolve, reject) => {
    const onFinishSync = () => {
      // Cool, our feed is loaded, now we can continue...
      const messageList = []

      // 2 - You need a ReadableStream to read the data from the feed
      // const reader =

      const ws = writer((data, enc, next) => {
        // 3 - Append each message into the list
        // Think about this writer as a normal writable stream writers method
      })

      // 4 - Pump your streams
      // pump(reader, /* a stream */, err => {
      //  if (err) return reject(err)
      //  resolve(/* data */)
      // })
    }

    // 1 - Pipe your streams and replicate!
    // pump(peer, /* replication */, /* target */, onFinishSync)
  })
}
