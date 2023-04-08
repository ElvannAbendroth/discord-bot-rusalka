const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('join').setDescription('I will join the voice channel!'),
  async execute({ interaction, client }) {
    if (!interaction.member.voice.channel) return interaction.reply('You need to be in a VC to use this command')

    const queue = await client.player.createQueue(interaction.guild)
    if (!queue.connection) {
      await queue.connect(interaction.member.voice.channel)
      await interaction.reply('Hello there!')
    } else {
      await interaction.reply("I'm already here!")
    }
  },
}
