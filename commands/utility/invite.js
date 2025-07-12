const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription(
      "Generates an invite link to add the bot to another server"
    ),

  async execute(interaction) {
    const inviteLink = await interaction.channel.createInvite({
      maxAge: 3600,
      maxUses: 1,
    });

    interaction.user.send(
      "You can use the following link to invite this bot to servers: \nhttps://discord.gg/" +
        inviteLink.code
    );

    await interaction.reply({
      content: "The bot has DMed you a one-time use invite link",
      flags: MessageFlags.Ephemeral,
    });
  },
};
