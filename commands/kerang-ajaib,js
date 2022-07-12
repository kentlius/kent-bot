const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kerang-ajaib')
		.setDescription('Bertanya kepada kerang ajaib.')
		.addStringOption(option => option.setName('pertanyaan').setDescription('mau nanya apa')),
	async execute(interaction) {
		const pertanyaan = interaction.options.getString('pertanyaan');
		if (pertanyaan) {
			const jawaban = Math.random() > 0.5 ? interaction.reply('iya') : interaction.reply('tidak');
			return jawaban;
		}
		return interaction.reply('nanya apa oi!');
	},
};
