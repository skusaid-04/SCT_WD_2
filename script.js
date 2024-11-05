let startTime, interval;
let isRunning = false;
let elapsed = 0;
let lapCount = 0;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateDisplay, 10);
    isRunning = true;

    document.getElementById("start-btn").style.display = "none";
    document.getElementById("pause-btn").style.display = "inline-block";
    document.getElementById("pause-btn").innerText = "Pause";
    document.getElementById("reset-btn").style.display = "inline-block";
    document.getElementById("lap-btn").style.display = "inline-block";
    document.getElementById("lap-heading").style.display = "block";
  }
}

function pauseOrResume() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    document.getElementById("pause-btn").innerText = "Resume";
  } else {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
    document.getElementById("pause-btn").innerText = "Pause";
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  elapsed = 0;
  lapCount = 0;
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("laps").innerHTML = "";

  document.getElementById("start-btn").style.display = "inline-block";
  document.getElementById("pause-btn").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("lap-btn").style.display = "none";
  document.getElementById("lap-heading").style.display = "none";
}

function lap() {
  if (elapsed === 0 || !isRunning) return;

  lapCount++;
  const lapTime = document.getElementById("display").innerText;
  const lapItem = document.createElement("li");
  lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
  document.getElementById("laps").appendChild(lapItem);
}

function updateDisplay() {
  elapsed = Date.now() - startTime;
  const ms = Math.floor((elapsed % 1000) / 10);
  const s = Math.floor((elapsed / 1000) % 60);
  const m = Math.floor((elapsed / 60000) % 60);
  document.getElementById("display").innerText = 
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}
