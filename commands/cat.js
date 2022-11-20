const { SlashCommandBuilder } = require('discord.js');
const getJSONResponse = require('../utils/getJSONResponse');

module.exports = {
  data: new SlashCommandBuilder().setName('cat').setDescription('Cat pics!'),
  async execute(interaction) {
    const catResult = await fetch('https://aws.random.cat/meow');
    const { file } = await catResult.json();
    await interaction.deferReply();
    return interaction.editReply({ files: [file] });
  },
};
