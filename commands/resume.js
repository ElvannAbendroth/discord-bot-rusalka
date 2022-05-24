const { SlashCommandBuilder } = require("@discordjs/builders")

const data = new SlashCommandBuilder().setName("resume").setDescription("Resumes the music");

const execute = async ({ client, interaction }) => {
	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) return await interaction.reply("There are no songs in the queue")

	queue.setPaused(false)
	await interaction.reply("Music has been paused! Use `/pause` to resume the music")
};

module.exports = { data, execute }