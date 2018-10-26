const hypercore = require('hypercore')
const ram = require('random-access-memory')
const getMessages = require('.')

describe('problem 04', () => {
  const feed = hypercore(ram)

  beforeAll(done => {
    feed.on('ready', () => {
      feed.append('dat')
      feed.append('is')
      feed.append('the')
      feed.append('future', err => {
        if (err) throw err
        done()
      })
    })
  })

  test('read and replicate', async () => {
    expect.assertions(1)
    const messages = await getMessages(feed.key, feed.replicate())
    expect(messages.join(' ')).toBe('dat is the future')
  })
})
