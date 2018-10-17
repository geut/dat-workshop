const signalhub = require('signalhub')
const ram = require('random-access-memory')
const saga = require('../lib/saga')
const swarm = require('@geut/discovery-swarm-webrtc')
const rcolor = require('random-color')

const webrtcOpts = {}
if (process.env.ICE_URLS) {
  webrtcOpts.config = {
    iceServers: process.env.ICE_URLS.split(',').map(urls => ({ urls }))
  }
}

async function initChat (username, key) {
  const publicKey = key && key.length > 0 ? key : null
  const chat = saga(ram, publicKey, username)

  await chat.initialize()

  const sw = swarm({
    id: chat.db.local.key.toString('hex'),
    stream: () => chat.replicate()
  })

  const discoveryKey = chat.db.discoveryKey.toString('hex')
  const signalUrls = process.env.SIGNAL_URLS ? process.env.SIGNAL_URLS.split(',') : ['https://signalhub-olaf.glitch.me/']

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
    // Usually in Choo apps when the DOMContentLoaded is triggered
    // that is a good time to attach our listeners.
    emitter.on(events.INIT_ROOM, initRoom)
    emitter.on(events.UPDATE_USERNAME, updateUsername)
    emitter.on(events.UPDATE_KEY, updateKey)
    emitter.on(events.ADD_MESSAGE, addMessage)
    emitter.on(events.WRITE_MESSAGE, writeMessage)
    emitter.on(events.JOIN_FRIEND, joinFriend)
    emitter.on(events.LEAVE_FRIEND, leaveFriend)
  })

  function rehydrate () {
    const data = JSON.parse(window.localStorage.getItem('olaf'))

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
    state.chat.userTimestamp = Date.now()
    state.chat.init = true

    window.localStorage.setItem('olaf', JSON.stringify({ username: state.chat.username, key: state.chat.key }))

    // ********************************** //
    // Lets connect Saga with Olaf        //
    chat.on('message', data => {
      // ...
    })

    chat.on('join', user => {
      // ...
    })

    chat.on('leave', user => {
      // ...
    })
    // ********************************** //

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
    if (index !== -1) state.chat.friends.splice(index, 1)
    const friendColor = rcolor(0.3, 0.99)
    user.color = friendColor.hexString()
    state.chat.colors[user.username] = user.color
    state.chat.friends.push(user)
    render()
  }

  function leaveFriend (user) {
    const index = state.chat.friends.findIndex(u => u.username === user.username)
    if (index !== -1) {
      state.chat.friends.splice(index, 1)
      render()
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
