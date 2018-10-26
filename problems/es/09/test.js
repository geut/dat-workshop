const Emitter = require('events')
const ram = require('random-access-memory')
const crypto = require('hypercore-crypto')
const Saga = require('./solution')

class MockedPeer extends Emitter {
  constructor (data) {
    super()
    this.remoteUserData = JSON.stringify(data)
  }
}

describe('problem 09', () => {
  const saga = new Saga(ram, null, 'peti')

  const keyPair = crypto.keyPair()
  const peerKey = keyPair.publicKey
  const peer = new MockedPeer({
    username: 'test',
    key: peerKey
  })

  beforeAll(() => saga.initialize())

  test('call connect and authorize a new peer', async (done) => {
    expect.assertions(2)

    await saga.connect(peer)

    saga.db.authorized(peerKey, (err, auth) => {
      expect(err).toBeNull()
      expect(auth).toBeTruthy()
      done()
    })
  })
})
