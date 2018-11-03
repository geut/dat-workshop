const html = require('choo/html')

const user = require('./user')

module.exports = function users (state, emit) {
  const { chat: { friends, username, userTimestamp }, ui: { showFriendsPanel } } = state
  const users = friends.slice()
  users.sort((a, b) => a.timestamp - b.timestamp)

  const displayOnMobile = showFriendsPanel ? 'db flex-grow-1' : 'dn'

  return html`
    <aside class="${displayOnMobile} flex-grow-0-ns db-ns w-100 w-30-ns pa1-ns ba b--silver b--dashed br3 overflow-auto">
      <h2 class="f2 tc ma0 ph3 ph1-ns measure">
        Users
      </h2>
      <ul class="list pa3 mt0 measure center overflow-auto">
        ${user({ owner: true, username, timestamp: userTimestamp })}
        ${users.map(user)}
      </ul>
    </aside>
  `
}
