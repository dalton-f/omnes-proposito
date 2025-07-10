const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      // Access the command which has been run
      const command = interaction.client.commands.get(interaction.commandName);

      // Ignore if there are no matching commands
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      // Execute the command
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
