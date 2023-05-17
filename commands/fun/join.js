const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("join").setDescription("Join a VC"),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    if (channel) {
      try {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        if (connection) {
          setTimeout(() => connection.destroy(), 5_000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      await interaction.reply("You need to join a voice channel first!");
    }
  },
};
