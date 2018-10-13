const html = require('choo/html')

const initModal = require('../components/init-modal')
const header = require('../components/header')
const users = require('../components/users')

const InputMsg = require('../components/input-msg')
const ViewMessages = require('../components/view-messages')
const KeyModal = require('../components/key-modal')

module.exports = view

function view (state, emit) {
  const { username, key, init } = state.chat
  const { showModalKey } = state.ui

  return html`
    <body class="code lh-copy">
      <main class="pa3 flex flex-column dt w-100 h-100">
        ${header(state, emit)}
        <div class="flex w-100 justify-between flex-column-reverse flex-row-ns flex-grow-1">
          ${state.cache(ViewMessages, 'viewMessages').render()}
          ${users(state, emit)}
        </div>
        <section class="w-100 pa0 mt2 mb2">
          ${state.cache(InputMsg, 'inputMsg').render()}
        </section>
      </main>
      ${(!init) ? initModal({ username, key }, this.emit, this.state.events) : ''}
      ${showModalKey ? state.cache(KeyModal, 'keyModal').render({ key }) : ''}
    </body>
  `
}
