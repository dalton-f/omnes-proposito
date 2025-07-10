const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user in the server.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The username of the user to unban.")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "You must be an administrator to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const input = interaction.options.getString("user");

    try {
      const bans = await interaction.guild.bans.fetch();

      const bannedUser = bans.find((ban) => ban.user.username === input);

      if (!bannedUser) {
        return interaction.reply({
          content: `Could not find a banned user matching \`${input}\`.`,
          flags: MessageFlags.Ephemeral,
        });
      }

      await interaction.guild.members.unban(bannedUser.user.id);

      return interaction.reply({
        content: `Successfully unbanned \`${bannedUser.user.tag}\`.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error(error);

      return interaction.reply({
        content: "An error occurred while trying to unban the user.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
