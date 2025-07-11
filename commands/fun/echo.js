const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Whether or not the echo should be ephemeral")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply({
      content: interaction.options.getString("input"),
      flags: interaction.options.getBoolean("ephemeral")
        ? MessageFlags.Ephemeral
        : undefined,
    });
  },
};
