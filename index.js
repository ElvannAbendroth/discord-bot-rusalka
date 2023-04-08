// IMPORTS
const { TOKEN, PORT } = require('./config')
const app = require('./app')
const api = require('./api')
const client = require('./client')

// DEPLOY COMMANDS -------------------------------------

api.deployCommands()

// ORIGINAL INDEX -------------------------------------

client.login(TOKEN)

// EXPRESS SERVER -------------------------------------

const listener = app.listen(PORT, function () {
  console.log('Listening on port ' + listener.address().port)
})
