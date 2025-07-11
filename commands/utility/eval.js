const {
  SlashCommandBuilder,
  MessageFlags,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluates a mathematical expression or line of code")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("math")
        .setDescription("Evaluate a math expression")
        .addStringOption((option) =>
          option
            .setName("expression")
            .setDescription("The expression you want to evaluate")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dev")
        .setDescription("Evalutes a script")
        .addStringOption((option) =>
          option
            .setName("script")
            .setDescription("A script you want to run through the bot")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "math": {
        const expression = interaction.options.getString("expression");

        return interaction.reply({
          content: `The completion value of the evaluated expression \`${expression}\` is equal to \`${eval(
            expression
          )}\``,
        });
      }
      case "dev": {
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

        const expression = interaction.options.getString("script");

        return interaction.reply({ content: String(eval(expression)) });
      }
    }
  },
};
