const signalhub = require('signalhub')
const ram = require('random-access-memory')
const swarm = require('@geut/discovery-swarm-webrtc')
const saga = require('./')

const webrtcOpts = {}

async function initChat (username, key) {
  const publicKey = key && key.length > 0 ? key : null
  const chat = saga(ram, publicKey, username)

  await chat.initialize()

  const sw = swarm({
    id: chat.db.local.key.toString('hex'),
    stream: () => chat.replicate()
  })

  const discoveryKey = chat.db.discoveryKey.toString('hex')
  const signalUrls = process.env.SIGNAL_URLS ? process.env.SIGNAL_URLS.split(',') : ['http://localhost:4000']

  sw.join(signalhub(discoveryKey, signalUrls), webrtcOpts)

  sw.on('connection', async peer => {
    try {
      await chat.connect(peer)
    } catch (err) {
      console.log(err)
    }
  })

  return chat
}

module.exports = initChat
