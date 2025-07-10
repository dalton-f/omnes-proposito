const { Client, GatewayIntentBits } = require("discord.js");

const { token } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

(async () => {
  await commandHandler(client);
  eventHandler(client);

  client.login(token);
})();
