var pcQueue = [];
var timer = setInterval(queueCountdown, 60000);

function queueCountdown() {
  if (pcQueue.length > 0) {
    for (i = 0; i < pcQueue.length; i++) {
      if (pcQueue[i].time == 60) {
        pcQueue.splice(i, 1);
        continue;
      }
      pcQueue[i].time = pcQueue[i].time + 1;
    }
  }
}

exports.pcQueue = pcQueue;
