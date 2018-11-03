const hypercore = require('hypercore')
const ram = require('random-access-memory')
const pump = require('pump')
const forEachChunk = require('../../lib/for-each-chunk')

/**
 * Note: if you are not familiar with `pump` please check
 * the tips section!
 */
module.exports = (key, peer) => {
  const feed = hypercore(ram, key, { valueEncoding: 'utf8' })

  return new Promise((resolve, reject) => {
    const onFinishSync = () => {
      // Cool, our feed is syncronized, now we can continue...
      const messageList = []

      // 2 - You need a ReadableStream to read the data from the feed
      // const reader =

      const ws = forEachChunk((chunk, enc, next) => {
        // 3 - Append each message into the list
        // Think about this writer as a normal [].forEach
        // but remember to call next() after processing your chunk
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
