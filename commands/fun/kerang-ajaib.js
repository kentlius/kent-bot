const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kerang-ajaib")
    .setDescription("Bertanya kepada kerang ajaib.")
    .addStringOption((option) =>
      option
        .setName("pertanyaan")
        .setDescription("mau nanya apa")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pertanyaan = interaction.options.getString("pertanyaan");
    if (pertanyaan.startsWith("apa") || pertanyaan.startsWith("Apa")) {
      const randomNumber = Math.random();
      if (randomNumber < 0.45) {
        return interaction.reply(`${pertanyaan}\niya`);
      } else if (randomNumber < 0.9) {
        return interaction.reply(`${pertanyaan}\ntidak`);
      } else {
        return interaction.reply(`${pertanyaan}\nmungkin suatu hari`);
      }
    }
    await interaction.reply({ content: "format: apakah ....?", ephemeral: true });
  },
};
