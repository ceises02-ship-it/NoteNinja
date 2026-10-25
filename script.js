const notesBox = document.getElementById("notes");
const simpleMode = document.getElementById("simple-mode");
const goButton = document.getElementById("go-btn");
const results = document.getElementById("results");
const readButton = document.getElementById("read-btn");

let runId = 0; 
function renderResults(text) {
  results.textContent = "";
  text.split("\n").forEach(function (line) {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = line === "" ? "\u00A0" : line;
    results.appendChild(div);
  });
}


function clearHighlight() {
  results.querySelectorAll(".line.reading").forEach(function (el) {
    el.classList.remove("reading");
  });
}


function stopReading() {
  runId++;
  window.speechSynthesis.cancel();
  clearHighlight();
}


goButton.addEventListener("click", async function () {
  stopReading();
  const notes = notesBox.value.trim();

  if (notes === "") {
    results.className = "error";
    results.textContent = "⚠️ Please paste some notes first!";
    readButton.hidden = true;
    return;
  }

  results.className = "";
  results.textContent = "🥷 Ninja-fying your notes... this can take a few seconds.";
  readButton.hidden = true;
  goButton.disabled = true;

  try {
    const response = await fetch("/api/ninja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notes, simple: simpleMode.checked }),
    });

    const data = await response.json();

    if (!response.ok) {
      results.className = "error";
      results.textContent = "⚠️ " + (data.error || "Something went wrong.");
    } else {
      results.className = "";
      renderResults(data.result);
      readButton.hidden = false;
    }
  } catch (err) {
    results.className = "error";
    results.textContent = "⚠️ Could not reach NoteNinja. Check your internet and try again.";
  }

  goButton.disabled = false;
});


readButton.addEventListener("click", function () {
  stopReading();
  const myRun = runId;
  const lines = Array.from(results.querySelectorAll(".line")).filter(function (el) {
    return el.textContent.trim() !== "";
  });

  lines.forEach(function (el, index) {
    const speech = new SpeechSynthesisUtterance(el.textContent.trim());

    speech.onstart = function () {
      if (myRun !== runId) return;
      clearHighlight();
      el.classList.add("reading");
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    if (index === lines.length - 1) {
      speech.onend = function () {
        if (myRun === runId) clearHighlight();
      };
    }

    window.speechSynthesis.speak(speech);
  });
});