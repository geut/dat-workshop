function Store (state, emitter) {
  state.storeName = 'ui'

  // declare app events
  const { events } = state
  events.SHOW_MODAL_KEY = 'ui:show_modal_key'
  events.HIDE_MODAL_KEY = 'ui:hide_modal_key'
  events.TOGGLE_FRIENDS = 'ui:toggle_friends'
  events.TOGGLE_THEME = 'ui:toggle_theme'

  state.ui = {
    showModalKey: false,
    showFriendsPanel: false,
    toggleTheme: true
  }

  emitter.on('DOMContentLoaded', function () {
    emitter.on(events.SHOW_MODAL_KEY, showModalKey)
    emitter.on(events.HIDE_MODAL_KEY, hideModalKey)
    emitter.on(events.TOGGLE_FRIENDS, toggleFriends)
    emitter.on(events.TOGGLE_THEME, toggleTheme)
  })

  function showModalKey () {
    state.ui.showModalKey = true
    emitter.emit('render')
  }

  function hideModalKey () {
    state.ui.showModalKey = false
    emitter.emit('render')
  }

  function toggleFriends () {
    state.ui.showFriendsPanel = !state.ui.showFriendsPanel
    emitter.emit('render')
  }

  function toggleTheme () {
    state.ui.toggleTheme = !state.ui.toggleTheme
    emitter.emit('render')
  }
}

module.exports = Store
