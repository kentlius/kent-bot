const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kerang-ajaib')
		.setDescription('Bertanya pada Kerang Ajaib')
		.addStringOption(option => option.setName('pertanyaan').setDescription('mau nanya apa')),
	async execute(interaction) {
		const value = interaction.options.getString('pertanyaan');
		if (value) return interaction.reply('bisa jadi');
		return interaction.reply('nanya apa asw');
	},
};