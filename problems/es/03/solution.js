const hypercore = require('hypercore')
const ram = require('random-access-memory')

module.exports = key => {
  const feed = hypercore(ram, key)

  return new Promise(resolve => {
    feed.on('ready', () => {
      resolve({
        publicKey: feed.key.toString('hex'),
        discoveryKey: feed.discoveryKey.toString('hex')
      })
    })
  })
}
