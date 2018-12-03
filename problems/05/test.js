const hyperdb = require('hyperdb')
const ram = require('random-access-memory')
const Saga = require('.')

describe('problem 05', () => {
  const saga = new Saga(ram, null, 'peti')

  test('db instance', () => {
    expect(saga.db).toBeInstanceOf(hyperdb)
  })

  test('RAM storage', () => {
    expect(saga.db._storage.name).toBe('RAM')
  })

  test('users prop', () => {
    expect(saga.users).toEqual(new Map())
  })

  test('messages prop', () => {
    expect(saga.messages).toEqual(new Map())
  })

  test('username prop', () => {
    expect(saga.username).toBe('peti')
  })

  test('timestamp prop', () => {
    expect(typeof saga.timestamp).toBe('number')
  })
})
