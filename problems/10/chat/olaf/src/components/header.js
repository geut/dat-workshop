const html = require('choo/html')

const usersIcon = require('./icons/users')
const keyIcon = require('./icons/key')

const iconButton = (icon, onclick, classes = '') => {
  return html`
    <a class="${classes || ''} icon-button ma1 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3"
      href="#" onclick=${onclick}>
      ${icon}
    </a>
  `
}

module.exports = function header (state, emit) {
  function toggleFriends () {
    const { TOGGLE_FRIENDS } = state.events
    emit(TOGGLE_FRIENDS)
  }

  function showModalKey () {
    const { SHOW_MODAL_KEY } = state.events
    emit(SHOW_MODAL_KEY)
  }

  return html`<div class="logo w-100 flex justify-around">
    <div class="w-50">
      <h1 class="f2 mt0 mb0">olaf 🐱</h1>
    </div>
    <div class="w-50 flex justify-end items-center">
      ${iconButton(keyIcon(), showModalKey, null)}
      ${iconButton(usersIcon(), toggleFriends, 'db dn-ns')}
    </div>
  </div>`
}
