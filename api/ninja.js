const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.8-flash"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { notes, simple } = req.body || {};
  if (!notes || typeof notes !== "string" || notes.trim() === "") {
    return res.status(400).json({ error: "No notes provided" });
  }

  const style = simple
    ? "Explain everything in very simple, beginner-friendly language using everyday analogies. Assume the reader is brand new to the topic."
    : "Use clear, plain language.";

  const prompt = `You are NoteNinja, a friendly study helper for university students.
${style}

Using ONLY the lecture notes below, produce:
SUMMARY: a short summary (max 5 sentences)
KEY TERMS: 3 to 5 important terms, each defined in one complete sentence
PRACTICE QUESTIONS: 3 exam-style questions, each followed by a full answer

Use plain text only. Do not use markdown symbols like ** or #.

LECTURE NOTES:
${notes.slice(0, 8000)}`;

  let lastError = "The AI request failed.";

  for (let i = 0; i < MODELS.length; i++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODELS[i]}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { thinkingConfig: { thinkingLevel: "low" } },
}),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const text =
          data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
        if (text) {
          return res.status(200).json({ result: text });
        }
        lastError = "The AI returned an empty answer.";
      } else {
        lastError = data.error?.message || lastError;
        const busy = response.status === 503 || response.status === 429;
        const modelMissing = response.status === 404;
        if (!busy && !modelMissing) break;
      }
    } catch (err) {
      lastError = "Something went wrong talking to the AI.";
    }

    await sleep(1000);
  }

  return res.status(500).json({ error: lastError });
};