var choo = require('choo')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload()
  })
}

app.use(require('./stores/chat'))
app.use(require('./stores/ui'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
