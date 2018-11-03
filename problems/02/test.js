const hypercore = require('hypercore')
const ram = require('random-access-memory')
const createFeed = require('.')

describe('problem 02', () => {
  const feed = createFeed()

  test('return feed', () => {
    expect(feed).toBeInstanceOf(hypercore)
  })

  test('RAM storage', () => {
    expect(feed._storage.key).toBeInstanceOf(ram)
  })

  test('append log', (done) => {
    feed.get(0, (err, data) => {
      if (err) throw err
      expect(data).toEqual({ title: 'dat-is-freedom' })
      done()
    })
  })
})
