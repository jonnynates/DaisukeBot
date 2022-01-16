var ps4Queue = [];
var timer = setInterval(queueCountdown, 60000);

function queueCountdown() {
  if (ps4Queue.length > 0) {
    for (i = 0; i < ps4Queue.length; i++) {
      if (ps4Queue[i].time == 0) {
        ps4Queue.splice(i, 1);
        continue;
      }
      ps4Queue[i].time = ps4Queue[i].time - 1;
    }
  }
}

exports.ps4Queue = ps4Queue;
