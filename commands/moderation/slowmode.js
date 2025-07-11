const {
  SlashCommandBuilder,
  PermissionsBitField,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Put the channel in slowmode.")
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration of the slowmode in seconds.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for putting the channel in slowmode.")
        .setRequired(false)
    ),

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    ) {
      return interaction.reply({
        content: "You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const duration = interaction.options.getInteger("duration");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    if (duration < 0) {
      return interaction.reply({
        content: "Please provide a positive duration in seconds.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.channel.setRateLimitPerUser(duration, reason);

    await interaction.reply({
      content:
        duration === 0
          ? "Slowmode has been lifted."
          : `Channel is now in slowmode of ${duration} seconds.`,
    });
  },
};
