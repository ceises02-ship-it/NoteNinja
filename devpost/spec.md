---
doc: spec
status: draft
---

# NoteNinja Technical Specification

## Overview
NoteNinja is a lightweight single-page web app that helps students convert lecture notes into revision-ready outputs. The front end is built with HTML, CSS, and JavaScript. A serverless function running on Vercel handles the Gemini API call so that the API key stays hidden from the browser.

## Goals
- Accept pasted notes from the student.
- Generate a short summary in plain language.
- Define key terms in full sentence explanations.
- Generate three exam-style questions with full answers.
- Support a beginner mode with simpler wording and analogies.
- Support read aloud and a visual reading ruler.
- Handle loading and failure states clearly.

## Architecture
### Front end
A simple browser-based UI includes:
- a large text area for notes
- a checkbox for beginner mode
- a submit button
- a loading state
- a results section
- a Read aloud button
- a yellow reading ruler overlay / highlight effect while audio plays
- visible error messaging

### Backend
A small serverless function sits between the browser and Gemini. It receives the note text and generation request from the browser, adds the API key on the server side, and returns the result to the front end.

### Data flow
1. Student pastes notes into the front-end textarea.
2. Front end sends the text to the backend function.
3. Backend calls the Gemini API securely.
4. Gemini returns the generated summary, terms, and questions.
5. Front end renders the output in the results panel.
6. Read aloud uses the generated text to speak the result to the user.

## Components
### Notes input panel
Responsible for collecting the student's notes and starting the study-generation process.

### Beginner mode toggle
Controls whether the AI response should be simplified with plain language and analogies.

### Loading state
Shown while the app waits on the backend response. It should communicate that the request is in progress and reassure the user that the system is working.

### Results panel
Displays:
- summary
- key terms and meanings
- exam-style questions and answers

### Read aloud control
Uses browser speech synthesis to speak the generated content.

### Reading ruler
A yellow highlight bar that follows the currently spoken sentence or line to help with tracking while reading.

### Error handling
Any failure in the network or API call should produce a visible red message instead of leaving the page blank.

## Data and Prompting Model
The app sends the student notes and the selected mode to the Gemini API. The backend prompt should ask for a simple study output, including:
- a plain-language summary
- key terms with full-sentence definitions
- three exam-style questions and answers
- optional beginner wording and analogies when the beginner mode is enabled

The response structure should be predictable and easy to render in the UI. It should avoid overly long or vague text so that it remains useful for revision.

## File Structure
- index.html — main page structure
- style.css — styling for the app and accessibility improvements
- script.js — front-end logic for requests, rendering, and speech features
- api/ninja.js — Vercel serverless function for Gemini API access
- devpost/ — planning documents, including scope, PRD, and spec

## Where It Runs
This project is designed for a simple web deployment pattern:
- front end runs in the browser or is served from a lightweight static host
- backend runs as a serverless function in Vercel
- an environment variable stores the Gemini API key safely on the server side

## Security and API Protection
The application must not expose the Gemini API key in browser code. The key should be stored in a server-side environment variable and accessed only inside the backend function. This is the main safety measure for using an AI API in a web app.

## Accessibility and Inclusion
Accessibility is a product feature, not a bonus. The UI should include:
- keyboard support
- visible focus rings
- large interactive targets
- clear labels for screen readers
- strong color contrast
- a simple reading flow that supports dyslexia and low-vision users

## Risks and Open Questions
- AI output quality can vary depending on the quality and structure of the notes.
- Long or messy lecture notes may need preprocessing or clearer prompting.
- Browser speech support varies by device and browser.
- The reading ruler may need tuning to match the text layout and performance expectations.

## Verification Plan
- Test the app with sample lecture notes to confirm the summary, key terms, and questions render correctly.
- Validate the beginner mode produces simpler explanations.
- Confirm the loading state appears while the request is running.
- Confirm the app surfaces a red error message instead of a blank state if the request fails.
- Verify the Read aloud button speaks output and the reading ruler follows the spoken line.
- Check keyboard navigation and focus visibility.

## Assumptions
- The app is a proof of concept, not a full-scale education platform.
- The current version is already live and the main goal is to improve and document it under a tight deadline.
- The simplest architecture is preferred over complexity to keep the project reliable and easy to understand.
- The app will remain focused on desktop and laptop use for this phase, with accessibility improvements built in from the start.
