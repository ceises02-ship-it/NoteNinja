---
doc: prd
status: draft
---

# NoteNinja Product Requirements Document

## Product Goal
NoteNinja helps university students turn dense lecture notes into short, understandable revision material. The product turns notes into accessible study support that is easier to understand, easier to revise, and easier to follow while reading or listening.

## Target Users
- university students revising lecture content
- students who struggle with academic jargon or dense notes
- students with dyslexia, low vision, or reading difficulties
- students who prefer to learn by listening and reading at the same time

## Core Journey
1. A student opens the app and pastes lecture notes into a main input area.
2. They optionally enable beginner mode for simpler wording and analogies.
3. They click the main processing button.
4. The app shows a loading state while it prepares the results.
5. The app displays a short summary, glossary-style key terms, and three exam-style questions with full answers.
6. The student can click Read aloud to hear the generated content.
7. The yellow reading ruler follows the spoken line to improve focus and reading flow.
8. If the request fails, the UI shows a clear red message instead of a blank page.

## User Experience Requirements
### Main input
- A large notes box should be the central interaction area.
- The app should make it easy to paste notes from lecture slides or documents.
- The interface should stay simple and uncluttered.

### Beginner mode
- A checkbox or toggle provides a simpler explanation mode.
- This mode should rewrite content in plain language and use everyday analogies where relevant.

### Results view
- The generated output should appear below the main action button.
- Results should include:
  - plain-language summary
  - key terms with full sentence definitions
  - three exam-style questions with full answers
- The UI should be easy to scan and read.

### Read aloud and accessibility
- The user can trigger text-to-speech from the output.
- The yellow reading ruler should track the currently spoken line.
- The app should support keyboard users and have visible focus outlines.
- Click targets should be large enough for touch and keyboard use.
- Screen-reader labels and semantic controls should be present.

### Error states
- If the AI request fails, the app should show a clear error message.
- The interface should not appear broken or blank when the request is unsuccessful.

## Functional Requirements
- The app accepts pasted lecture notes as text input.
- It passes the text to a backend function that calls the Gemini API securely.
- It returns structured study support in a readable format.
- It supports a simple beginner mode that rewrites explanations.
- It supports a read aloud button and text highlighting while reading.
- It handles failed requests with visible user-facing error messaging.

## Non-Functional Requirements
- The experience must be quick enough to feel useful during revision sessions.
- The interface must be simple enough for first-time users to understand immediately.
- Accessibility must be considered as a core product feature, not an afterthought.
- The app should be usable on modern desktop and laptop browsers.
- The front end should be lightweight and easy to run locally or deploy.

## Proof of Concept Boundary
The product should prove that note-to-study conversion is useful and accessible. It does not need to support every advanced study workflow or a large student community to be valuable.

## Deferred Features
These are valid future enhancements but are not required for this proof of concept:
- PDF upload
- flashcard generation
- spaced repetition
- dyslexia font settings
- adjustable size controls
- multi-language support
- account-based study tracking

## Assumptions
- The project already has a first version and the goal is improvement and documentation rather than a brand-new app from scratch.
- The app will run as a small static front end and a Vercel serverless function for the Gemini API key.
- An AI-generated response may sometimes be slow or fail, so the UI must handle waiting and errors gracefully.
- The deadline is short, so the scope should remain focused on the core workflow and accessibility features.
