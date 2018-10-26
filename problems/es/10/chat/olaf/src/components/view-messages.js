const Component = require('choo/component')
const html = require('choo/html')

const Message = require('./message')

const customStyle = 'outline: none;overflow-x: hidden;overflow-y: auto;transform: translateZ(0);'

module.exports = class ViewMessages extends Component {
  constructor (name, state, emit) {
    super(name)
    this.state = state
    this.emit = emit
    this.local = this.state.components[name] = {}
    this.setState()
  }

  setState () {
    this.local.messages = this.state.chat.messages.slice()
    this.local.messages.sort((a, b) => a.timestamp - b.timestamp)
  }

  update () {
    const { chat: { messages } } = this.state
    if (this.local.messages.length !== messages.length) {
      this.setState()
      return true
    }
  }

  createElement () {
    return html`
      <section
        id="olaf-chat"
        class="flex-grow-1 flex-grow-0-ns w-100 w-60-ns shadow-5 pa3 ba b--silver b--dashed br3 cover overflow-auto mt2 mt0-ns"
        style=${customStyle}
        >
        ${this.local.messages.map(m => this.state.cache(Message, `message_${m.key}`, { updateHeight: this.updateHeight }).render(m, this.state.chat.colors[m.username]))}
      </section>
    `
  }

  updateHeight = h => {
    this.element.scrollTo(0, this.element.scrollHeight + h + 10)
  }

  afterupdate (el) {
    el.scrollTo(0, el.scrollHeight)
  }
}
