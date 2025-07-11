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

    if (sides <= 1)
      return interaction.reply({
        content:
          "Please provide a positive non-zero number of sides (greater than 1).",
        ephemeral: true,
      });

    const result = Math.floor(Math.random() * sides) + 1;

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(":game_die: Dice Roll")
      .setDescription(`You rolled a ${sides}-sided dice and got a ${result}!`);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
