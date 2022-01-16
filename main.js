const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.events = new Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login("OTMyMjIzMTkyNzcxMjExMzA0.YeP2gQ.N0cTQPM7F1AvEQ_BzDdqriBBI5w");
