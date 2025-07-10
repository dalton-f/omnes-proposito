const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user in the server.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to ban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban.")
        .setRequired(false)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "❌ You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const member = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";

    interaction.guild.members.ban(member, { reason });

    return interaction.reply({
      content: `${member.user.tag} has been banned from the server for: ${reason}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
