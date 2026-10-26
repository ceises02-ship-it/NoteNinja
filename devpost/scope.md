---
doc: scope
status: draft
---

# NoteNinja Scope

## The Idea
NoteNinja is a study helper for university students. A student pastes lecture notes into the app and receives a short plain-language summary, key terms explained in full sentences, and exam-style practice questions with full answers. The app also includes an "Explain it like I'm new to this" mode and a Read aloud feature with a yellow reading ruler that highlights the line being spoken.

## The User
Primary users are university students who need a faster way to turn dense course material into study-ready content. Secondary users include students with dyslexia, low vision, or attention difficulties who benefit from read-aloud, simplified wording, high-contrast reading support, and keyboard-friendly interaction.

## The Problem
Lecture slides and notes are often dense, jargon-heavy, and difficult to revise quickly. Students can spend hours turning raw material into summaries and revision questions. NoteNinja reduces that effort while making the content more accessible and easier to understand.

## The Unique Kernel
The core idea is not simply AI summarisation. The unique value is that NoteNinja turns notes into study tools that are easier to absorb, easier to revise, and more accessible to learn from. It helps students understand the topic, learn the key terms, and test themselves quickly.

## The Core Loop
1. Student pastes lecture notes.
2. Student optionally chooses the beginner mode.
3. Student clicks the main action button.
4. The app shows a loading state while processing.
5. The app returns a short summary, key terms, and exam-style questions with answers.
6. The student can use read aloud and the visual reading ruler to follow along.
7. The student uses the output to revise or study.

## What "Working" Looks Like
A student can paste a note block, wait briefly for processing, and get useful study output in the same page. The output includes:
- a plain-language summary
- key terms explained clearly in full sentences
- three exam-style questions with answers
- optional beginner mode with simpler explanations and analogies
- a Read aloud function that speaks the content
- a yellow reading ruler that follows the spoken line
- a clear red error message if the request fails

## POC Boundary
This proof of concept focuses on one simple workflow: paste notes, generate study support, read it aloud, and improve accessibility. It does not need to be a full LMS, PDF uploader, flashcard system, or multi-user platform.

## Explicitly Cut
We are not building in this phase:
- full PDF or slide upload support
- student accounts or saved history
- multi-language support beyond the initial scope
- flashcards or spaced repetition
- advanced analytics or dashboards
- social sharing or collaborative study features
- deployment beyond the intended lightweight app setup

## Assumptions
- The app is a single-page web experience with a small serverless backend for the Gemini API key.
- The first version is already live and the next goal is to improve and document it properly.
- The app is intended for students in a university study context rather than general public use.
- The read-aloud feature is a browser-based enhancement using standard web speech APIs or a simple text-to-speech approach, depending on implementation.
- The project is meant to be kept small and practical for a short deadline, not a full product suite.
