const json = require("../roles.json");
const _ = require("lodash");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "list",
  description: "list all members for a character",
  async execute(client, message, args) {
    const command = args.join(" ").toLowerCase();
    const role = JSON.parse(JSON.stringify(json));
    const character = _.find(role.characters, ["character", command]);
    if (character == undefined || character == null) {
      message.channel.send("Unkown character");
      return;
    }
    const list = client.guilds.cache.get(message.guild.id);

    const newEmbed = new MessageEmbed()
      .setColor("#304281")
      .setTitle(`List of ${character.display} players`);

    var players;
    try {
      await list.members.fetch();
      players = list.roles.cache
        .get(character.id)
        .members.map((m) => m.user.username);

      if (players.length > 0) {
        newEmbed.setDescription(players.join("\n"));
      } else if (players.length < 0) {
        newEmbed.setDescription("No members play this character");
      }
    } catch (error) {
      if (players === undefined) {
        newEmbed.setDescription("No members play this character");
      }
    }

    message.channel.send({ embeds: [newEmbed] });
  },
};
