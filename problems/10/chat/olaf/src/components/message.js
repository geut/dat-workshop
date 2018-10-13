const Component = require('choo/component')
const html = require('choo/html')
const raw = require('choo/html/raw')
const tinydate = require('tinydate').default
const anchorme = require('anchorme').default
const fileType = require('file-type')

const stamp = tinydate('{HH}:{mm}:{ss}')

const parseMessage = message => {
  const anchor = anchorme(message, { list: true })
  if (anchor.length) {
    // detect file type
    return Promise.all(anchor.map(async anchorData => {
      const controller = new window.AbortController()
      const signal = controller.signal

      const fetchPromise = window.fetch(anchorData.raw, { signal })

      // 5 second timeout:
      setTimeout(() => controller.abort(), 5000)
      const response = await fetchPromise

      if (!response) return ''
      const ab = await response.arrayBuffer()
      const ft = fileType(ab)
      if (ft && ft.mime.includes('image')) {
        return html`<img class="mw-100" style="height: 300px"src="${anchorData.raw}"/>`
      } else return ''
    })).then(out => {
      // prepare output
      var f = anchorme(message)
      console.log(f)
      return html`
        <span class="lh-copy">
          ${out.filter(img => img)}
        </span>
      `
    })
  } else {
    return Promise.resolve()
  }
}

class Message extends Component {
  constructor (id, choo, f, opts) {
    super()
    this.local = {
      extra: ''
    }
    this.parent = {}
    this.parent.updateHeight = opts.updateHeight
  }

  update ({ message }) {
    if (this.local.message !== message) return true
  }

  load (el) {
    parseMessage(this.local.message)
      .then(msg => {
        if (msg) {
          this.local.extra = msg
          this.rerender()
        }
      })
      .catch(console.log)
  }

  createElement (props, color = 'black') {
    const { username, message, timestamp } = props
    const { extra } = this.local

    this.local.message = message

    const date = stamp(new Date(timestamp))
    return html`
      <div class="flex h-auto mt3 tl" style="min-height:2rem">
        <div class="flex olaf__message bg-white w-auto br3 ba b--white">
          <div class="flex flex-column w-90">
            <div class="flex h2 mt1 ml2 w4">
              <div class="dib f7 f6-ns mw4 truncate"><span style="color: ${color}">${username}</span></div>
            </div>
            <div class="flex">
              <p class="dib f7 f6-ns pa1 pl0 pl0-ns f5-ns ml2 lh-copy mv0" style="word-break: break-all;">
                ${raw(anchorme(message))}
              </p>
            </div>
          </div>
          <div class="flex w-10 items-end pa1 ph3-ns ml2 ml5-ns justify-end">
            <div data-balloon="${date}" data-balloon-pos="left">
              <span class="f5-ns f6-ns f7 lh-copy">⌚️</span>
            </div>
          </div>
        </div>
        ${extra}
      </div>
    `
  }

  afterupdate () {
    if (this.parent.updateHeight) {
      this.parent.updateHeight(this.element.scrollHeight)
    }
  }
}

module.exports = Message
