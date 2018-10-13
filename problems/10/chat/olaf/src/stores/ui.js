function Store (state, emitter) {
  state.storeName = 'ui'

  // declare app events
  const { events } = state
  events.SHOW_MODAL_KEY = 'ui:show_modal_key'
  events.HIDE_MODAL_KEY = 'ui:hide_modal_key'
  events.TOGGLE_FRIENDS = 'ui:toggle_friends'

  state.ui = {
    showModalKey: false,
    showFriendsPanel: false
  }

  emitter.on('DOMContentLoaded', function () {
    emitter.on(events.SHOW_MODAL_KEY, showModalKey)
    emitter.on(events.HIDE_MODAL_KEY, hideModalKey)
    emitter.on(events.TOGGLE_FRIENDS, toggleFriends)
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
}

module.exports = Store
