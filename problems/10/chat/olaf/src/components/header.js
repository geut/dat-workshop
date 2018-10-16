const html = require('choo/html')

const usersIcon = require('./icons/users')
const keyIcon = require('./icons/key')
const moonIcon = require('./icons/moon')
const sunIcon = require('./icons/sun')

const iconButton = (icon, onclick, classes = '') => {
  return html`
    <a class="${classes || ''} icon-button ma1 br-pill bg-green no-underline washed-green ba b--green grow pv2 ph3"
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

  function toggleTheme () {
    const { TOGGLE_THEME } = state.events
    emit(TOGGLE_THEME)
  }

  return html`<div class="logo w-100 flex justify-around">
    <div class="w-50">
      <h1 class="f2 mt0 mb0">olaf 🐱</h1>
    </div>
    <div class="w-50 flex justify-end items-center">
      ${iconButton(state.ui.toggleTheme ? moonIcon() : sunIcon(), toggleTheme, null)}
      ${iconButton(keyIcon(), showModalKey, null)}
      ${iconButton(usersIcon(), toggleFriends, 'db dn-ns')}
    </div>
  </div>`
}
