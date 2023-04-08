// IMPORTS
const config = require('./config')
const path = require('path')
const fs = require('node:fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { TOKEN, CLIENT_ID } = config

// 1- creates the a command array

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
    .put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })
    .then(() =>
      console.log(
        '⚙️ Successfully registered application commands.'
      )
    )
    .catch(console.error)
}

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)

  logger.info('---')
  next()
}

module.exports = {
  requestLogger,
  deployCommands,
  commandsPath,
  commandFiles,
}
