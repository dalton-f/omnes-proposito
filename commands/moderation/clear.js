const {
  SlashCommandBuilder,
  PermissionsBitField,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete a number of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    ) {
      return interaction.reply({
        content: "You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "Please provide a number between 1 and 100.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const deletedMessages = await interaction.channel.bulkDelete(amount, true);

    return interaction.reply({
      content: `Successfully deleted ${deletedMessages.size} messages.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
