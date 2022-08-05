const { SlashCommandBuilder } = require('discord.js');
const { fetch } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('valorank')
    .setDescription('Displays the current Valorant Rank of the user.')
    .addStringOption((option) =>
      option
        .setName('region')
        .setDescription('Region')
        .setRequired(true)
        .addChoices(
          { name: 'Asia Pasific', value: 'ap' },
          { name: 'North America', value: 'na' },
          { name: 'Europe', value: 'eu' },
          { name: 'Korea', value: 'kr' }
        )
    )
    .addStringOption((option) =>
      option.setName('username').setDescription('Username').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('tagline').setDescription('Tagline').setRequired(true)
    ),
  async execute(interaction) {
    const res = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/mmr/${interaction.options.getString(
        'region'
      )}/${interaction.options.getString(
        'username'
      )}/${interaction.options.getString('tagline')}`
    );
    const data = await res.json();
    await interaction.deferReply();
    if (data.status !== 200)
      return interaction.editReply(data.errors[0].message);
    const rank = data.data.currenttierpatched;
    const name = data.data.name;
    const tag = data.data.tag;
    const mmr = data.data.ranking_in_tier;
    if (rank === null) return interaction.editReply('Rank not found');
    return interaction.editReply(`${name}#${tag} is ${rank} | ${mmr}/100`);
  },
};
