const Component = require('choo/component')
const html = require('choo/html')

module.exports = class InputMsg extends Component {
  constructor (name, state, emit) {
    super(name)
    this.state = state
    this.emit = emit
  }

  update () {
    return false
  }

  sendMessage = (e) => {
    e.preventDefault()
    const { events } = this.state
    const input = this.element.querySelector('#input-msg')

    if (input.value.length === 0) {
      return
    }

    this.emit(events.WRITE_MESSAGE, input.value)
    input.value = ''
  };

  createElement () {
    return html`
      <form>
        <fieldset class="cf bn ma0 pa0">
          <div class="cf courier">
            <label class="clip" for="Message">Message</label>
            <input
              class="f6 f5-l input-reset bn fl pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="Message..."
              autofocus
              type="text"
              autocomplete="off"
              name="chat-msg"
              id="input-msg">
            <input
              class="dn db-ns f6 f5-ns button-reset fl pv3 tc bn bg-animate bg-green washed-green ba b--green pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
              type="submit"
              value="Send"
              onclick=${this.sendMessage}>
          </div>
        </fieldset>
      </form>
    `
  }
}
