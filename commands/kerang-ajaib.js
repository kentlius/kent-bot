const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kerang-ajaib')
		.setDescription('Bertanya kepada kerang ajaib.')
		.addStringOption(option => option.setName('pertanyaan').setDescription('mau nanya apa')),
	async execute(interaction) {
		const pertanyaan = interaction.options.getString('pertanyaan');
		if (pertanyaan.startsWith('apa') || pertanyaan.startsWith('Apa')) {
			const jawaban = Math.random() > 0.5 ? interaction.reply(`${pertanyaan}\niya`) : interaction.reply(`${pertanyaan}\ntidak`);
			return jawaban;
		}
		return interaction.reply('nanya apa oi!');
	},
};
