const ram = require('random-access-memory')
const crypto = require('hypercore-crypto')
const Saga = require('.')


describe('problem 08', () => {
  const saga = new Saga(ram, null, 'peti')

  const keyPair = crypto.keyPair()
  const peerKey = keyPair.publicKey

  beforeAll(() => saga.initialize())

  test('authorize a new key', async () => {
    expect.assertions(1)

    await expect(saga._authorize(peerKey)).resolves.toBe('AUTHORIZED')
  })

  test('authorize a known key', async () => {
    expect.assertions(1)

    await expect(saga._authorize(peerKey)).resolves.toBe('AUTHORIZED')
  })
})
