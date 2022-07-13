const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { request } = require('undici');
const getJSONResponse = require('../utils/getJSONResponse');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Search for a word in urban dictionary')
		.addStringOption(option => option.setName('term').setDescription('null')),
	async execute(interaction) {
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({ term });

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const { list } = await getJSONResponse(dictResult.body);

		await interaction.deferReply();

		if (!list.length) {
			return interaction.editReply(`No results found for **${term}**.`);
		}

		const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
		const [answer] = list;

		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields({ name: 'Definition', value: trim(answer.definition, 1024) }, { name: 'Example', value: trim(answer.example, 1024) }, { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` });

		return interaction.editReply({ embeds: [embed] });
	},
};