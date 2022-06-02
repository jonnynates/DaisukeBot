function Queue(name) {
  this.name = name;
  this.players = [];
  this.timer = setInterval(queueCountdown, 100);
  this.getPlayers = function() {
    return players;
  };
  this.setPlayers = function(newPlayers) {
    players = newPlayers;
  };

  function queueCountdown() {
    if (players.length > 0) {
      for (i = 0; i < players.length; i++) {
        if (players[i].time == 60) {
          players.splice(i, 1);
          continue;
        }
        players[i].time = players[i].time + 1;
      }
    }
  }
}

exports.Queue = Queue;
