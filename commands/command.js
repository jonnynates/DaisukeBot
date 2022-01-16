const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "command",
  description: "list all commands",
  async execute(client, message, args) {
    const newEmbed = new MessageEmbed()
      .setColor("#304281")
      .setTitle("Commands")
      .setDescription("See below for a list of all server commands")
      .addFields(
        {
          name: ".lfg",
          value:
            "You can use '.lfg pc' or '.lfg ps4' to find games.\n If you're done looking for a game type '.lfg pc -' or '.lfg ps4 -' to remove yourself from the queue",
        },
        { name: ".command", value: "Get a full list of server commands" }
      );

    message.channel.send({ embeds: [newEmbed] });
  },
};
