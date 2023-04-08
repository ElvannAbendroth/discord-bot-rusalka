const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('quit').setDescription('Stops the bot and clears the queue'),
  execute: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) return await interaction.reply("I'm not even here yet!")
    queue.destroy()
    await interaction.reply('Bye!')
  },
}
