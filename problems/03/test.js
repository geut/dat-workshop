const hypercore = require('hypercore')
const ram = require('random-access-memory')
const getKeys = require('.')
const getExpectedKeys = require('./solution')

describe('problem 03', () => {
  const feed = hypercore(ram)

  test('return keys', async () => {
    expect.assertions(1)
    const [ expectedKeys, keys ] = await Promise.all([ getExpectedKeys(feed), getKeys(feed) ])

    expect(expectedKeys).toEqual(keys)
  })
})
