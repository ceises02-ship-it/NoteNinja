# NoteNinja

NoteNinja is a study helper for university students. Paste lecture notes into the app, and it turns them into a short plain-language summary, key terms explained in full sentences, and exam-style practice questions with full answers. It also includes a beginner mode, read-aloud support, and a yellow reading ruler to help students follow along while listening.

## Why it exists
Lecture notes are often dense, technical, and hard to revise quickly. NoteNinja aims to make study notes more understandable, easier to recall, and more accessible for students with dyslexia, low vision, or other reading challenges.

## Run locally
1. Open the project folder in a code editor.
2. Make sure your environment has the Gemini API key available for the serverless function.
3. Run the app locally with a simple static server or use Vercel dev mode if you are deploying the serverless function.
4. Open the app in a browser.

Example local server:

```bash
python -m http.server 8000
```

If using Vercel for the API function:

```bash
npx vercel dev
```

## Environment variable
Set the Gemini API key in the backend environment so it is not exposed in the browser. Example:

```bash
GEMINI_API_KEY=your_key_here
```

## Main files
- index.html — main UI
- style.css — app styling and accessibility features
- script.js — client-side logic
- api/ninja.js — serverless backend that calls the Gemini API

## License
This project is licensed under the MIT License.
