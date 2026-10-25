const notesBox = document.getElementById("notes");
const simpleMode = document.getElementById("simple-mode");
const goButton = document.getElementById("go-btn");
const results = document.getElementById("results");
const readButton = document.getElementById("read-btn");

goButton.addEventListener("click", function () {
  const notes = notesBox.value.trim();

  if (notes === "") {
    results.className = "error";
    results.textContent = "⚠️ Please paste some notes first!";
    readButton.hidden = true;
    return;
  }

  results.className = "";

  let mode = "normal mode";
  if (simpleMode.checked) {
    mode = "beginner mode";
  }

  results.textContent =
    "Fake result (" + mode + ")\n\n" +
    "You pasted " + notes.length + " characters of notes.\n" +
    "The real AI summary and questions will appear here soon!";

  readButton.hidden = false;
});

readButton.addEventListener("click", function () {
  window.speechSynthesis.cancel(); 
  const speech = new SpeechSynthesisUtterance(results.textContent);
  window.speechSynthesis.speak(speech);
});