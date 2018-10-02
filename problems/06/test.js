const ram = require('random-access-memory')
const Saga = require('.')

describe('problem 05', () => {
  const saga = new Saga(ram, null, 'peti')

  const readMessage = id => {
    return new Promise((resolve, reject) => {
      saga.db.get(id, (err, data) => {
        if (err) return reject(err)
        resolve(data[0].value.message)
      })
    })
  }

  test('ready method', async () => {
    expect.assertions(1)
    const result = await saga.ready()
    expect(result).toBeNull()
  })

  test('writeMessage method', async () => {
    expect.assertions(1)
    const [ id1, id2 ] = await Promise.all([
      saga.writeMessage('hi'),
      saga.writeMessage('how are you?')
    ])
    const messages = await Promise.all([
      readMessage(id1),
      readMessage(id2)
    ])
    expect(messages.join(' ')).toBe('hi how are you?')
  })
})
