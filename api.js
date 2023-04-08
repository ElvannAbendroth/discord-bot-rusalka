// IMPORTS
const config = require('./config')
const app = require('./app')

const path = require('path')
const fs = require('node:fs')

const { TOKEN, CLIENT_ID } = config

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

const deployCommands = () => {
  const api = new REST({ version: '9' }).setToken(TOKEN)

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    commands.push(command.data.toJSON())
  }

  api
    .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('⚙️ Successfully registered application commands.'))
    .catch(console.error)
}

module.exports = {
  deployCommands,
  commandsPath,
  commandFiles,
}
