const html = require('choo/html')

module.exports = function modal (props, emit, events) {
  const { username, key } = props

  return html`
    <div class="modal-overlay">
      <div
        class="mw-100 w-80 w-60-ns fixed z-5 center ph3 ph5-ns tc br2 pv3 pv5-ns bg-washed-green dark-green mb"
        style="transform: translate(-50%, -50%);left: 50%; top: 50%; max-height: 100%"
        >
        <h1 class="fw6 f3 f2-ns lh-title mt0 mb3">
          Welcome! Please set your info.
        </h1>
        <form class="pa3 black-80">
          <div class="measure center">
            <label for="nickname" class="f6 b db mb2">Nickname</label>

            <input id="nickname"
              value=${username || ''}
              onkeyup=${updateUsername}
              class="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              aria-describedby="nickname-desc"
              autocomplete="off"
              required>
          </div>
          <div class="measure center">
            <label for="key" class="f6 b db mb2">Join to the room</label>

            <input id="key"
              value=${key || ''}
              onkeyup=${updateKey}
              class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"
              aria-describedby="nickname-desc"
              autocomplete="off"
              placeholder="Public Key">
          </div>
        </form>
        <div>
          <a class="center ma2 f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
            href="#" onclick=${join}>
            Join
          </a>
          <a class="center ma2 f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
            href="#" onclick=${createRoom}>
            Create room
          </a>
        </div>
      </div>
    </div>
    `

  function join (e) {
    e.stopPropagation()
    e.preventDefault()
    if (username && username.length > 0 && key && key.length > 0) {
      emit(events.INIT_ROOM)
    }
  }

  function createRoom (e) {
    e.stopPropagation()
    e.preventDefault()
    if (username && username.length > 0) {
      emit(events.INIT_ROOM, true)
    }
  }

  function updateUsername (e) {
    emit(events.UPDATE_USERNAME, e.target.value)
  }

  function updateKey (e) {
    emit(events.UPDATE_KEY, e.target.value)
  }
}
