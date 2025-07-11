const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription(
      "Provides information about a user, the server, or the bot."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Get information about a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to get information about.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Get information about the server.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("bot").setDescription("Get information about the bot.")
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const embed = new EmbedBuilder().setColor("#0099ff");

    switch (subcommand) {
      case "user": {
        const user = interaction.options.getUser("target");

        const guildMemberInfo = await interaction.guild.members.fetch(user.id);

        embed
          .setTitle("User Information")
          .addFields(
            { name: "Username", value: guildMemberInfo.user.username },
            { name: "Display Name", value: guildMemberInfo.displayName },
            { name: "User ID", value: guildMemberInfo.id },
            {
              name: "Account Created",
              value: guildMemberInfo.user.createdAt.toUTCString(),
            },
            {
              name: "Joined Server",
              value: guildMemberInfo.joinedAt.toUTCString(),
            }
          )
          .setThumbnail(user.displayAvatarURL())
          .setTimestamp();

        break;
      }

      case "bot": {
        const client = interaction.client;

        embed
          .setTitle("Bot Information")
          .addFields(
            { name: "Bot Name", value: client.user.username },
            { name: "Bot ID", value: client.user.id },
            {
              name: "Bot Created At",
              value: client.user.createdAt.toUTCString(),
            },
            { name: "Servers", value: `${client.guilds.cache.size} servers` },
            {
              name: "Uptime",
              value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`,
            },
            {
              name: "Commands Loaded",
              value: `${client.commands.size} command(s)`,
            },

            {
              name: "Ping",
              value: `${client.ws.ping}ms`,
            }
          )
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp();

        break;
      }

      case "server": {
        const guildInfo = interaction.guild;

        embed
          .setTitle("Server Information")
          .addFields(
            { name: "Server Name", value: guildInfo.name },
            { name: "Server ID", value: guildInfo.id },
            {
              name: "Server Description",
              value: guildInfo.description || "No description set.",
            },
            {
              name: "Created At",
              value: guildInfo.createdAt.toUTCString(),
            },
            { name: "Member Count", value: guildInfo.memberCount.toString() },
            { name: "Owner", value: `<@${guildInfo.ownerId}>` }
          )
          .setThumbnail(guildInfo.iconURL())
          .setTimestamp();

        break;
      }
    }

    await interaction.reply({
      embeds: [embed],
      // flags: MessageFlags.Ephemeral,
    });
  },
};
