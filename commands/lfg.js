const { pcQueue } = require("../queues/pc_queue");
const { ps4Queue } = require("../queues/ps4_queue");
const { queue, Queue } = require("../queues/queue");

server_queues = {};

module.exports = {
  name: "lfg",
  description: "looking for game command",
  async execute(client, message, args) {
    const command = args.join(" ").toLowerCase();
    switch (command) {
      case "pc":
        message.channel.send(
          message.author.username +
            " is looking for Strive for PC.\n\n" +
            queueMessage(message.guild.id, "strive", "pc")
        );
        addUserQueue(message.author, message.guild.id, "strive", "pc");
        break;
      case "pc -":
        message.channel.send(
          message.author.username + " is no longer looking a game."
        );
        removeUserQueue(message.author, message.guild.id, "strive", "pc");
        break;
      case "ps4":
        message.channel.send(
          message.author.username +
            " is looking for Strive for PS4.\n\n" +
            queueMessage(message.guild.id, "strive", "ps4")
        );
        addUserQueue(message.author, message.guild.id, "strive", "ps4");
        break;
      case "ps4 -":
        message.channel.send(
          message.author.username + " is no longer looking a game."
        );
        removeUserQueue(message.author, message.guild.id, "strive", "ps4");
        break;
      default:
        message.channel.send("unkown game please try again");
    }

    function addUserQueue(author, serverId, game, platform) {
      const newPlayer = { name: author.username, id: author.id, time: 0 };
      const queueName = serverId + "-" + game + "-" + platform;
      const newQueue = new Queue(queueName);

      if (queueName in server_queues) {
        const currentQueue = server_queues[queueName];
        if (currentQueue.filter((e) => e.name === author.username).length > 0) {
          return;
        }
        const currentPlayers = currentQueue.getPlayers;
        currentPlayers.push(newPlayer);
        currentQueue.setPlayers(currentPlayers);
        server_queues[queueName].push(currentQueue);
      } else {
        newQueue.setPlayers([newPlayer]);
        server_queues[queueName] = [newQueue];
      }
    }

    function removeUserQueue(author, serverId, game, platform) {
      const queueName = serverId + "-" + game + "-" + platform;

      for (i = 0; i < server_queues[queueName].length; i++) {
        if (
          server_queues[queueName].filter((e) => e.name === author.username)
            .length > 0
        ) {
          server_queues[queueName].splice(i, 1);
          return;
        }
      }
    }

    function queueMessage(serverId, game, platform) {
      const queueName = serverId + "-" + game + "-" + platform;
      console.log(server_queues[queueName]);
      if (server_queues[queueName] == 0) {
        return `Noone is currently looking for ${game} right now.`;
      }
      return "Players current waiting for games: " + printQueue(queueName);
    }

    function printQueue(queue) {
      var message = "";
      for (i = 0; i < server_queues[queue]; i++) {
        message =
          message +
          `<@${server_queues[queue][i].id}>` +
          ` [${server_queues[queue][i].time} mins] `;
      }
      return message;
    }
  },
};
