const {
  SlashCommandBuilder,
  MessageFlags,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Change your nickname.")
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("The new nickname for the user.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const nickname = interaction.options.getString("nickname");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ChangeNickname
      )
    )
      return interaction.reply({
        content: "You do not have permission to change your nickname.",
        flags: MessageFlags.Ephemeral,
      });

    try {
      await interaction.member.setNickname(nickname);

      return interaction.reply({
        content: `Your nickname has been changed to \`${nickname}\`.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error(error);

      return interaction.reply({
        content: "An error occurred while trying to change your nickname.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
