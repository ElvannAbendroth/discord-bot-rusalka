const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('strings')
		.setDescription('I will give info about my strings!'),
	async execute({ interaction }) {
		await interaction.reply('I have 47 strings!');
	},
};