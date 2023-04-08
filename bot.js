const path = require('path')
const api = require('./api')

api.deployCommands()

const {
  Client,
  Collection,
  GatewayIntentBits,
} = require('discord.js')
const { Player } = require('discord-player')

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

bot.player = new Player(bot, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
})

bot.commands = new Collection()
for (const file of api.commandFiles) {
  const filePath = path.join(api.commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  bot.commands.set(command.data.name, command)
}

// When the client is ready, run this code (only once)

bot.once('ready', () => {
  console.log(`🤖 Logged in as ${bot.user.tag}!`)
})

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = bot.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute({ interaction, client: bot })
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content:
        'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

module.exports = bot
