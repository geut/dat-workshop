const hypercore = require('hypercore')
const ram = require('random-access-memory')

module.exports = () => {
  const feed = hypercore(ram, { valueEncoding: 'json' })
  feed.append({ title: 'dat-is-freedom' })
  return feed
}
