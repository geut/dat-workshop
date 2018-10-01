module.exports = feed => {
  return new Promise(resolve => {
    feed.on('ready', () => {
      resolve({
        publicKey: feed.key.toString('hex'),
        secretKey: feed.secretKey.toString('hex'),
        discoveryKey: feed.discoveryKey.toString('hex')
      })
    })
  })
}
