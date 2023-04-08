const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('loads songs from youtube')
  .addSubcommand(subcommand =>
    subcommand
      .setName('song')
      .setDescription('Loads a single song from a url')
      .addStringOption(option =>
        option.setName('url').setDescription("the song's url").setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('playlist')
      .setDescription('Loads a playlist of songs from a url')
      .addStringOption(option =>
        option
          .setName('url')
          .setDescription("the playlist's url")
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('search')
      .setDescription('Searches for sogn based on provided keywords')
      .addStringOption(option =>
        option
          .setName('searchterms')
          .setDescription('the search keywords')
          .setRequired(true)
      )
  )

function isValidURL(url) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

function queryType(url) {
  let parsedUrl = new URL(url)

  if (parsedUrl.hostname.includes('youtube')) {
    return QueryType.YOUTUBE_VIDEO
  }
}

const execute = async ({ client, interaction }) => {
  if (!interaction.member.voice.channel)
    return interaction.reply('You need to be in a VC to use this command')

  const queue = await client.player.createQueue(interaction.guild)
  if (!queue.connection) await queue.connect(interaction.member.voice.channel)

  if (interaction.options.getSubcommand() === 'song') {
    let url = interaction.options.getString('url')

    if (!isValidURL(url)) {
      console.log("Can't parse url", url)
      return interaction.reply('Not a valid URL')
    }

    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: queryType(url),
    })
    if (result.tracks.length === 0) {
      return interaction.reply('No results')
    }

    const song = result.tracks[0]
    await queue.addTrack(song)
    if (!queue.playing) {
      await queue.play()
    }
    const embed = new MessageEmbed()
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` })
    await interaction.reply({
      embeds: [embed],
    })
  } else if (interaction.options.getSubcommand() === 'playlist') {
    let url = interaction.options.getString('url')
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_PLAYLIST,
    })

    if (result.tracks.length === 0) return interaction.reply('No results')

    const playlist = result.playlist
    await queue.addTracks(result.tracks)
    if (!queue.playing) {
      await queue.play()
    }
    const embed = new MessageEmbed()
      .setDescription(
        `**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
      )
      .setThumbnail(playlist.thumbnail)
    await interaction.reply({
      embeds: [embed],
    })
  } else if (interaction.options.getSubcommand() === 'search') {
    let url = interaction.options.getString('searchterms')
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    })

    if (result.tracks.length === 0) return interaction.reply('No results')

    const song = result.tracks[0]
    await queue.addTrack(song)
    if (!queue.playing) {
      await queue.play()
    }
    const embed = new MessageEmbed()
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` })
    await interaction.reply({
      embeds: [embed],
    })
  }
}

module.exports = { data, execute }
