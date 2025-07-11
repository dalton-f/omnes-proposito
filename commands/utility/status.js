const {
  SlashCommandBuilder,
  PermissionsBitField,
  MessageFlags,
  PresenceUpdateStatus,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Changes the bot status")
    .addStringOption((option) =>
      option
        .setName("option")
        .setDescription("The status options")
        .setRequired(true)
        .addChoices(
          { name: "Online", value: "Online" },
          { name: "Idle", value: "Idle" },
          { name: "Do not disturb", value: "DoNotDisturb" },
          { name: "Invisible", value: "Invisible" }
        )
    ),

  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content: "You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const client = interaction.client;

    const statusOption = interaction.options.getString("option");

    client.user.setPresence({ status: PresenceUpdateStatus[statusOption] });

    await interaction.reply({
      content: `Status updated to ${statusOption}!`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
