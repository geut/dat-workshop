const ram = require('random-access-memory')
const Saga = require('./solution')

describe('problem 07', () => {
  const saga = new Saga(ram, null, 'peti')

  beforeAll(() => saga.initialize())

  test('_updateHistory method get messages list', async () => {
    expect.assertions(1)

    await Promise.all([
      saga.writeMessage('message1'),
      saga.writeMessage('message2')
    ])

    const messages = []
    for (const m of saga.messages) {
      messages.push(m[1].message)
    }

    expect(messages).toEqual(expect.arrayContaining(['message1', 'message2']))
  })

  test('`message` event on _updateHistory', done => {
    expect.assertions(1)
    saga.once('message', data => {
      expect(data.message).toBe('hi')
      done()
    })
    saga.writeMessage('hi')
  })
})
