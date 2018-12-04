const html = require('choo/html')

module.exports = ({ owner = false, username, timestamp, color = 'green' }) => {
  if (!username || !timestamp) {
    return ''
  }

  let connectionTime = 'right now'
  const difference = Math.abs(new Date() - new Date(timestamp))
  let time = Math.floor(difference / 36e5) // hours
  if (time > 0) {
    connectionTime = `${time} hours ago`
  } else {
    time = Math.floor(difference / 6e4) // minutes
    if (time > 0) {
      connectionTime = `${time} minutes ago`
    }
  }

  const colorStyle = color ? `color: ${color}` : ''

  return html`
    <li
      class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
      <div class="pl3 pl0-ns flex-auto">
        <span class="f6 db" style='${colorStyle}'>${username}${owner ? ' (you)' : ''}</span>
      </div>
      <div>
        <span class="f6 db hover-dark-green">${connectionTime}</span>
      </div>
    </li>
  `
}
