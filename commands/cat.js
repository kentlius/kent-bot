const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('cat').setDescription('Cat pics!'),
  async execute(interaction) {
    const catResult = await fetch('https://aws.random.cat/meow');
    const { file } = await catResult.json();
    await interaction.deferReply();
    interaction.editReply({ files: [{ attachment: file, name: 'cat.png' }] });
  },
};
