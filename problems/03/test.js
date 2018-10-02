const hypercore = require('hypercore')
const ram = require('random-access-memory')
const getKeys = require('.')

describe('problem 03', () => {
  const feed = hypercore(ram)

  let keys

  beforeAll(done => {
    feed.on('ready', () => {
      keys = {
        publicKey: feed.key.toString('hex'),
        discoveryKey: feed.discoveryKey.toString('hex')
      }
      done()
    })
  })

  test('return keys', async () => {
    expect.assertions(1)
    const expectedKeys = await getKeys(keys.publicKey)

    expect(expectedKeys).toEqual(keys)
  })
})
