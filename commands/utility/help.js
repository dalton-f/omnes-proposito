const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lists all available commands."),

  async execute(interaction) {
    // Dynamically fetch all commands from the bot's command collection
    const { commands } = interaction.client;
    const commandList = commands
      .map(
        (command) => `\`/${command.data.name}\`: ${command.data.description}`
      )
      .join("\n");

    // Create an embed message with the command list
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Available Commands")
      .setDescription(commandList || "No commands available.");

    await interaction.reply({ embeds: [embed] });
  },
};
