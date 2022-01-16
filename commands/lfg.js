const { pcQueue } = require("../queues/pc_queue");
const { ps4Queue } = require("../queues/ps4_queue");

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
            queueMessage("pc")
        );
        addUserQueue(message.author, "pc");
        break;
      case "pc -":
        message.channel.send(
          message.author.username + " is no longer looking a game."
        );
        removeUserQueue(message.author, "pc");
        break;
      case "ps4":
        message.channel.send(
          message.author.username +
            " is looking for Strive for PS4.\n\n" +
            queueMessage("ps4")
        );
        addUserQueue(message.author, "ps4");
        break;
      case "ps4 -":
        message.channel.send(
          message.author.username + " is no longer looking a game."
        );
        removeUserQueue(message.author, "ps4");
        break;
      default:
        message.channel.send("unkown game please try again");
    }

    function addUserQueue(author, type) {
      const newPlayer = { name: author.username, id: author.id, time: 30 };
      if (type === "pc") {
        if (pcQueue.filter((e) => e.name === author.username).length > 0) {
          return;
        }
        pcQueue.push(newPlayer);
      } else if (type === "ps4") {
        if (ps4Queue.filter((e) => e.name === author.username).length > 0) {
          return;
        }
        ps4Queue.push(newPlayer);
      }
    }

    function removeUserQueue(author, type) {
      if (type === "pc") {
        for (i = 0; i < pcQueue.length; i++) {
          if (pcQueue.filter((e) => e.name === author.username).length > 0) {
            pcQueue.splice(i, 1);
            return;
          }
        }
      } else if (type === "ps4") {
        for (i = 0; i < ps4Queue.length; i++) {
          if (ps4Queue.filter((e) => e.name === author.username).length > 0) {
            ps4Queue.splice(i, 1);
            return;
          }
        }
      }
    }

    function queueMessage(type) {
      if (type === "pc") {
        if (pcQueue.length == 0) {
          return "Noone is currently looking for games right now.";
        }
        return "Players current waiting for games: " + printQueue(pcQueue);
      } else if (type === "ps4") {
        if (ps4Queue.length == 0) {
          return "Noone is currently looking for games right now.";
        }
        return "Players current waiting for games: " + printQueue(ps4Queue);
      }
    }

    function printQueue(queue) {
      var message = "";
      for (i = 0; i < queue.length; i++) {
        message = message + `<@${queue[i].id}>` + ` [${queue[i].time} mins] `;
      }
      return message;
    }
  },
};
