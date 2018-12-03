const signalhub = require('signalhubws')
const rai = require('random-access-idb')
const saga = require('../lib/saga')
const { getDB, updateDB } = require('../lib/db-names')
const { SIGNAL_URLS, ICE_URLS } = require('../config')
const swarm = require('@geut/discovery-swarm-webrtc')
const { COLORS } = require('../lib/theme')
const rcolor = require('random-color')
const contrast = require('color-contrast')

const webrtcOpts = {
  config: {
    iceServers: (process.env.ICE_URLS || ICE_URLS).split(';').map(data => {
      const [urls, credential, username] = data.split(',')

      if (credential && username) {
        return {
          urls,
          credential,
          username
        }
      }

      return { urls }
    })
  }
}
console.log('ICE Servers: ', webrtcOpts.config.iceServers)

async function initChat (username, key) {
  const publicKey = key && key.length > 0 ? key : null
  const dbName = getDB(publicKey)
  const chat = saga(rai(dbName), publicKey, username)

  await chat.initialize()

  if (publicKey === null) {
    updateDB(dbName, chat.db.key.toString('hex'))
  }

  const sw = swarm({
    id: username,
    stream: () => chat.replicate()
  })

  const discoveryKey = chat.db.discoveryKey.toString('hex')
  const signalUrls = (process.env.SIGNAL_URLS || SIGNAL_URLS).split(';')

  sw.join(signalhub(discoveryKey, signalUrls), webrtcOpts)

  sw.on('connection', async peer => {
    try {
      await chat.connect(peer)
    } catch (err) {
      console.log(err)
    }
  })

  return chat
}

const TIMEOUT_DISCONNECTION = 30000

function store (state, emitter) {
  state.storeName = 'chat'

  // declare app events
  const { events } = state
  events.INIT_ROOM = 'chat:init_room'
  events.UPDATE_USERNAME = 'chat:update_username'
  events.UPDATE_KEY = 'chat:update_key'
  events.JOIN_FRIEND = 'chat:join_friend'
  events.LEAVE_FRIEND = 'chat:leave_friend'
  events.WRITE_MESSAGE = 'chat:write_message'
  events.ADD_MESSAGE = 'chat:add_message'

  let chat
  const timers = new Map()

  state.chat = {
    initRoom: false,
    key: null,
    username: null,
    userTimestamp: null,
    messages: [],
    friends: [],
    colors: {}
  }

  emitter.on('DOMContentLoaded', function () {
    rehydrate()
    emitter.on(events.INIT_ROOM, initRoom)
    emitter.on(events.UPDATE_USERNAME, updateUsername)
    emitter.on(events.UPDATE_KEY, updateKey)
    emitter.on(events.ADD_MESSAGE, addMessage)
    emitter.on(events.WRITE_MESSAGE, writeMessage)
    emitter.on(events.JOIN_FRIEND, joinFriend)
    emitter.on(events.LEAVE_FRIEND, leaveFriend)
  })

  function rehydrate () {
    const data = JSON.parse(localStorage.getItem('olaf/last-room'))

    state.chat.username = data ? data.username : null

    if (state.query.key) {
      state.chat.key = state.query.key
    } else {
      state.chat.key = data ? data.key : null
    }

    render()
  }

  async function initRoom (isNew = false) {
    chat = await initChat(state.chat.username, isNew ? null : state.chat.key)

    state.chat.key = chat.db.key.toString('hex')
    state.chat.userTimestamp = chat.timestamp
    state.chat.init = true

    localStorage.setItem('olaf/last-room', JSON.stringify({ username: state.chat.username, key: state.chat.key }))

    chat.on('message', data => {
      emitter.emit(events.ADD_MESSAGE, data)
    })

    chat.on('join', user => {
      emitter.emit(events.JOIN_FRIEND, user)
    })

    chat.on('leave', user => {
      emitter.emit(events.LEAVE_FRIEND, user)
    })

    render()
  }

  function updateUsername (username) {
    state.chat.username = username
    render()
  }

  function updateKey (key) {
    state.chat.key = key
    render()
  }

  function writeMessage (msg) {
    chat.writeMessage(msg)
    render()
  }

  function joinFriend (user) {
    const index = state.chat.friends.findIndex(u => u.username === user.username)

    // check if the user already exists
    if (index !== -1) {
      // check if it has a timer to disconnect
      if (timers.has(user.username)) {
        clearTimeout(timers.get(user.username))
        timers.delete(user.username)
      }
      return
    }

    let newColor = rcolor(0.99, 0.99).hexString()
    const currentTheme = state.ui.toggleTheme ? 'light' : 'dark'
    while (contrast(COLORS[currentTheme].hex.bg, newColor) < 4) {
      newColor = rcolor(0.99, 0.99).hexString()
    }
    user.color = newColor
    state.chat.colors[user.username] = user.color
    state.chat.friends.push(user)
    render()
  }

  function leaveFriend (user) {
    const index = state.chat.friends.findIndex(u => u.username === user.username)
    if (index !== -1) {
      // the webrtc connection could be losted for a moment so it's better wait a couple of seconds
      timers.set(user.username, setTimeout(() => {
        state.chat.friends.splice(index, 1)
        timers.delete(user.username)
        render()
      }, TIMEOUT_DISCONNECTION))
    }
  }

  function addMessage (data) {
    state.chat.messages.push(data)
    render()
  }

  function render () {
    emitter.emit('render')
  }
}

module.exports = store
