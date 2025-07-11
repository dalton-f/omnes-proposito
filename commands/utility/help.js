const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lists all available commands."),

  async execute(interaction) {
    let description = "";

    // Grab all the command subfolders from the main commands directory
    const foldersPath = path.join(__dirname, "../../commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      // Grab all the command files from each commands subfolder
      const commandsSubfolder = path.join(foldersPath, folder);

      const commandFiles = fs
        .readdirSync(commandsSubfolder)
        .filter((file) => file.endsWith(".js"));

      // Get the category name from the final subfolder in the path
      const category = commandsSubfolder.split("\\").pop();

      // Add the category name in bold as a subtitle and capitalise the first letter
      description += `**${
        category.charAt(0).toUpperCase() + category.slice(1)
      }**:\n`;

      for (const file of commandFiles) {
        const filePath = path.join(commandsSubfolder, file);
        const command = require(filePath);

        const commandName = command.data?.name || file.replace(".js", "");
        const commandDescription =
          command.data?.description || "No description.";

        description += `\`/${commandName}\` - ${commandDescription}\n`;
      }

      description += "\n";
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Available Commands:")
      .setDescription(description || "No commands available.");

    await interaction.reply({ embeds: [embed] });
  },
};
