const fs = require("node:fs");
const path = require("node:path");

const { REST, Routes, Collection } = require("discord.js");
const { clientId, guildId, token } = require("../config.json");

module.exports = async (client) => {
  const commands = [];
  client.commands = new Collection();

  // Grab all the command subfolders from the main commands directory
  const foldersPath = path.join(__dirname, "../commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Grab all the command files from the commands subfolders
    const commandsPath = path.join(foldersPath, folder);

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    // Grab the SlashCommandBuilde.toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
      }
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);

  // Deploy the commands
  try {
    console.log(`Started refreshing ${commands.length} application commands.`);

    // Fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application commands.`);
  } catch (error) {
    console.error(error);
  }
};
