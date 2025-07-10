const {
  SlashCommandBuilder,
  PermissionsBitField,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lockdown")
    .setDescription("Put the channel in lockdown.")
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration of the lockdown in seconds.")
        .setRequired(true)
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

    if (duration <= 0) {
      return interaction.reply({
        content: "Please provide a positive duration in seconds.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.channel.permissionOverwrites.edit(
      interaction.guild.roles.everyone,
      {
        SendMessages: false,
        AddReactions: false,
      }
    );

    await interaction.reply({
      content: `Channel is now in lockdown for ${duration} seconds.`,
    });

    setTimeout(async () => {
      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          SendMessages: true,
          AddReactions: true,
        }
      );

      await interaction.followUp({
        content: "Channel lockdown has been lifted.",
      });
    }, duration * 1000);
  },
};
