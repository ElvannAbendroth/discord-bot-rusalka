// IMPORTS
const { TOKEN } = require('./config')
const app = require('./app')
const path = require('path')
const api = require('./api')
const client = require('./client')

// DEPLOY COMMANDS -------------------------------------

api.deployCommands()

// ORIGINAL INDEX -------------------------------------

// Login to Discord with your client's TOKEN
client.login(TOKEN)

// EXPRESS SERVER -------------------------------------

const listener = app.listen(8080, function () {
  console.log('Listening on port ' + listener.address().port)
})
