const Component = require('choo/component')
const html = require('choo/html')
const copy = require('copy-to-clipboard')
const QRCode = require('qrcode')

const clipboardIcon = require('./icons/clipboard')

const url = window.location.protocol + '//' + window.location.host

module.exports = class KeyModal extends Component {
  constructor (name, state, emit) {
    super(name)
    this.state = state
    this.emit = emit
  }

  update ({ key }) {
    if (this.key !== key) {
      return true
    }
  }

  load (el) {
    this.loadQRCode(el)
  }

  afterupdate (el) {
    this.loadQRCode(el)
  }

  loadQRCode (el) {
    QRCode.toCanvas(el.querySelector('#qrcode'), `${url}?key=${this.key}`)
  }

  hideModalKey = () => {
    const { events: { HIDE_MODAL_KEY } } = this.state
    this.emit(HIDE_MODAL_KEY)
  };

  copyToClipboard = (e) => {
    e.preventDefault()
    copy(`${url}?key=${this.key}`)
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
