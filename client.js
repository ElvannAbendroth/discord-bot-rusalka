const path = require('path')
const api = require('./api')

const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { Player } = require('discord-player')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
})

const setPlayer = () => {
  client.player = new Player(client, {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    },
  })
}

const setCommands = () => {
  client.commands = new Collection()
  for (const file of api.commandFiles) {
    const filePath = path.join(api.commandsPath, file)
    const command = require(filePath)
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command)
  }

  // When the client is ready, run this code (only once)
}

setCommands()
setPlayer()

client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute({ interaction, client })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

module.exports = client
