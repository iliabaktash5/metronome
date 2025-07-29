let bpmInput = document.getElementById("bpm");
let bpmValue = document.getElementById("bpmValue");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");

let intervalId;
let audioCtx;

bpmInput.addEventListener("input", () => {
  bpmValue.textContent = bpmInput.value;
  if (intervalId) {
    stopMetronome();
    startMetronome();
  }
});

function clickSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
  gain.gain.setValueAtTime(1, audioCtx.currentTime);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

function startMetronome() {
  let bpm = parseInt(bpmInput.value);
  let interval = 60000 / bpm;
  clickSound(); // اولین ضرب
  intervalId = setInterval(clickSound, interval);
}

function stopMetronome() {
  clearInterval(intervalId);
  intervalId = null;
}

startBtn.addEventListener("click", () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (!intervalId) {
    startMetronome();
  }
});

stopBtn.addEventListener("click", stopMetronome);
