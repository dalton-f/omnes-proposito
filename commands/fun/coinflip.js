const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin."),
  async execute(interaction) {
    const result = Math.random() < 0.5 ? "heads" : "tails";

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(":coin: Coin Flip")
      .setDescription(`You flipped a coin and got ${result}!`);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
