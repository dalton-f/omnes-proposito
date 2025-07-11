const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the magic 8-ball a question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question you want to ask the magic 8-ball.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question");

    const responses = [
      "Yes",
      "No",
      "Maybe",
      "Ask again later",
      "Definitely not",
      "Absolutely",
      "It is certain",
      "Without a doubt",
      "You may rely on it",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(":8ball: Magic 8-ball")
      .setDescription(
        `**You asked:** ${question} \n\n**The magic 8-ball says:** ${response}`
      );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
