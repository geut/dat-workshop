const Component = require('choo/component')
const html = require('choo/html')
const copy = require('copy-to-clipboard')
const QRCode = require('qrcode')

const clipboardIcon = require('./icons/clipboard')

module.exports = class KeyModal extends Component {
  constructor (name, state, emit) {
    super(name)
    this.state = state
    this.emit = emit
  }

  update () {
    return true
  }

  load (el) {
    QRCode.toCanvas(el.querySelector('#qrcode'), this.key)
  }

  hideModalKey = () => {
    const { events: { HIDE_MODAL_KEY } } = this.state
    this.emit(HIDE_MODAL_KEY)
  };

  copyToClipboard = (e) => {
    e.preventDefault()
    copy(this.key)
  };

  createElement ({ key }) {
    this.key = key

    return html`
      <div class="modal-overlay" onclick=${this.hideModalKey}>
        <div
          class="flex flex-column break-word mw-100 w-80 w-60-ns fixed z-5 center ph3 ph5-ns tc br2 pv3 pv5-ns bg-washed-green dark-green mb"
          style="transform: translate(-50%, -50%);left: 50%; top: 50%; max-height: 100%"
          >
          <a href="#" class="flex-auto link dim light-purple" onclick=${this.copyToClipboard}>
            ${key}
            <div class="dib ml2" style="width: 25px; height: 25px;">${clipboardIcon()}</div>
          </a>
          <canvas id="qrcode" class="flex-auto self-center"></canvas>
        </div>
      </div>
    `
  }
}
