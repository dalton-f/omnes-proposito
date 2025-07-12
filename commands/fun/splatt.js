const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("splatt").setDescription("splatt"),

  async execute(interaction) {
    const file = new AttachmentBuilder("assets/splatt.png");

    await interaction.reply({ files: [file] });
  },
};
