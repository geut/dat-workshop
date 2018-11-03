const signalhub = require('signalhub')
const ram = require('random-access-memory')
const swarm = require('@geut/discovery-swarm-webrtc')
const saga = require('./')

const webrtcOpts = {}

async function initChat (username, key) {
  const publicKey = key && key.length > 0 ? key : null
  const chat = saga(ram, publicKey, username)

  await chat.initialize()

  // (1)
  const sw = swarm({
    /* id:  ... , */
    /* stream: () => ... */
  })

  // (2)
  // creating a signalhub instance...
  const discoveryKey = /* ... */
  const signalUrls = ['https://signalhub-jccqtwhdwc.now.sh/']

  sw.join(signalhub(discoveryKey, signalUrls), webrtcOpts)

  sw.on('connection', async peer => {
    try {
      // (3)
      /* await ... */
    } catch (err) {
      console.log(err)
    }
  })

  return chat
}

module.exports = initChat
