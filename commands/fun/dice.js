const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll a dice.")
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("The number of sides on the dice.")
        .setRequired(false)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger("sides") || 6;
    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(":game_die: Dice Roll")
      .setDescription(`You rolled a ${sides}-sided dice and got a ${result}!`);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
