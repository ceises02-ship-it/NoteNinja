const notesBox = document.getElementById("notes");
const simpleMode = document.getElementById("simple-mode");
const goButton = document.getElementById("go-btn");
const results = document.getElementById("results");
const readButton = document.getElementById("read-btn");

goButton.addEventListener("click", async function () {
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
      results.textContent = data.result;
      readButton.hidden = false;
    }
  } catch (err) {
    results.className = "error";
    results.textContent = "⚠️ Could not reach NoteNinja. Check your internet and try again.";
  }


  goButton.disabled = false;
});


readButton.addEventListener("click", function () {
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(results.textContent);
  window.speechSynthesis.speak(speech);
});