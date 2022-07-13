const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('love')
		.setDescription('Love Calculator')
        .addStringOption(option => option.setName('orang_1').setDescription('tumbal 1').setRequired(true))
        .addStringOption(option => option.setName('orang_2').setDescription('tumbal 2').setRequired(true)),
	async execute(interaction) {
        const orang_1 = interaction.options.getString('orang_1');
        const orang_2 = interaction.options.getString('orang_2');
        const response = await axios.get(`https://api.genderize.io/?name[]=${orang_1}&name[]=${orang_2}&country_id=ID`);
        const gender_1 = await response.data[0].gender;
        const gender_2 = await response.data[1].gender;
        await interaction.deferReply();
        if (gender_1 == gender_2) {
            return interaction.editReply(`${orang_1} ❤️ ${orang_2} = sus ඞ`);
        }
		return interaction.editReply(`${orang_1} ❤️ ${orang_2} =`, Math.floor(Math.random() * 100) + 1 + '%');
	},
};
