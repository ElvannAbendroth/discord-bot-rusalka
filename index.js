const { TOKEN, PORT } = require('./config')
const app = require('./app')
const bot = require('./bot')

bot.login(TOKEN)

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
