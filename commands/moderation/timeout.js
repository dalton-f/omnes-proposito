const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user in the server.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to timeout.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the timeout in seconds.")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "❌ You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const member = interaction.options.getMember("target");
    const duration = interaction.options.getInteger("duration");

    // Convert timeout duration from seconds to milliseconds
    member.timeout(duration * 1000);

    return interaction.reply({
      content: `${member.user.tag} has been timed out for ${duration} seconds.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
