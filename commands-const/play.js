const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('song')
        .setDescription('Loads a single song from url')
        .addStringOption(option => option.setName('url').setDescription("the song's url").setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('playlist')
        .setDescription('Loads a playlist of songs from a url')
        .addStringOption(option => option.setName('url'.setDescription("the playlist's url").setRequired(true)))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('search')
        .setDescription('Searches for song based on provided keywords')
        .addStringOption(option =>
          option.setName('searchterms'.setDescription('the search keywords').setRequired(true))
        )
    ),
  async execute(client, interaction) {
    if (interaction.member.voice.channel) return interaction.editReply('You need to be in VC to use this command')

    const queue = await client.player.createQueue(interaction.guild)
    if (!queue.connection) await queue.connect(ineraction.member.voice.channel)

    let embed = new MessageEmbed()

    if (interaction.options.getSubcommand() === 'song') {
      let url = interaction.options.getString('url')
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        seachEngine: QueryType.SOUNDCLOUD,
      })
      if (result.tracks.length === 0) return interaction.editReply('No results')
      const song = result.tracks[0]
      await queue.addTrack(song)
      embed
        .setDescription(`**[${song.title}](${song.url}** has been added to the queue)`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
    } else if (interaction.option.getSubcommand() === 'playlist') {
    } else if (interaction.option.getSubcommand() === 'search') {
    }
  },
}
