---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Scaffolding, Executive Header, and Stillness/Violation State Machine**
  Becomes usable: A running dark-mode dashboard where leaving the mouse/keyboard untouched accumulates idle time and +1 pt/sec to the Laziness Score, and moving or typing immediately pauses the timer and surfaces the deadpan "Cardinal Sin" reprimand banner.
  Why now: Bootstraps the application files, design tokens, and proves the central unique kernel (the FSM engine and deadpan scolding) immediately on slice one.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Features and Behavior > Sloth Mode Idle Tracker`, `prd.md > Cardinal Sin Movement Reprimand`
  Spec ref: `spec.md > Stack`, `spec.md > Strict CSS Design Token Contracts`, `spec.md > State Machine: Idle / Movement FSM`, `spec.md > Components > ExecutiveHeaderComponent`, `spec.md > Components > SlothTrackerComponent`
  Build: Create `index.html` with basic executive layout and tracker card; `styles.css` with token contracts; `js/tracker.js` with FSM event listeners (`mousemove`, `keydown`); `js/app.js` linking timer to score and reprimand banner.
  Verify (mechanical): Run browser/DOM verification confirming elements exist, idle timer increments score after 2s stillness, and simulated mouse movement pauses counter and renders reprimand banner.
  Learner check: Open `index.html` in your browser. Leave your mouse still for 5 seconds to watch points climb, then nudge your mouse or tap a key to verify the sloth's reprimand appears.
  Commit: `Bootstrap app and implement core idle FSM with movement reprimand`

- [x] **2. LocalStorage State Persistence & Session Reset**
  Becomes usable: Your Laziness Score, unbroken idle streak, and session stats persist across page refreshes, with a "Reset Day" button to clear state.
  Why now: Data integrity is the foundation for badges, confessions, and certificates. Verifying persistence now ensures later features save reliably.
  PRD ref: `prd.md > States and Boundaries > Persistence State`
  Spec ref: `spec.md > Data Model & Persistence Layer`
  Build: Implement `js/state.js` (`StorageManager`, schema validation, fallback to `DEFAULT_STATE`), wire into `app.js` so score increments persist, and wire the "Reset Day" button in the executive header.
  Verify (mechanical): Save test state to localStorage, reload/re-evaluate state loader, verify stored score renders in DOM, invoke reset handler, verify state zeroes out.
  Learner check: Sit still until your score hits 10+, refresh the browser tab, and verify your score is still 10+; then click "Reset Day" to verify it zeroes out.
  Commit: `Add localStorage state persistence and reset handler`

- [x] **3. Procrastination Confessional & Random Excuse Generator**
  Becomes usable: You can type an avoided chore or roll from 18 absurd corporate excuses, each awarding +50 points, popping celebratory confetti, and scolding you for physical effort.
  Why now: Adds the active comedic counterpart to idle accumulation, introducing the +50 point bonus mechanics and confetti celebrations.
  PRD ref: `prd.md > Features and Behavior > Procrastination Confessional & Excuse Generator`
  Spec ref: `spec.md > Components > ProcrastinationConfessionalComponent`, `spec.md > External Services and Dependencies`
  Build: Create `js/excuses.js` with 18 corporate excuses; build the Confessional card in `index.html`; wire task submission and excuse rolling in `app.js`; integrate `canvas-confetti` (with fallback particle burst).
  Verify (mechanical): Programmatically trigger excuse roll, verify +50 pts awarded to state, verify excuse text appended to DOM, verify confetti function invoked without exceptions.
  Learner check: Type a task like "Quarterly taxes" and click Postpone, or click "Roll Random Excuse", and verify you get +50 points, an effort reprimand, and a confetti burst.
  Commit: `Implement procrastination confessional, excuse library, and confetti rewards`

- [x] **4. Badges & Milestone Accolades**
  Becomes usable: 4 milestone achievement badges that visually unlock with confetti and celebration when you reach stillness and score targets.
  Why now: Closes the motivational loop by rewarding persistence and confessions with permanent visual credentials.
  PRD ref: `prd.md > Features and Behavior > Badges & Accolades`
  Spec ref: `spec.md > Components > BadgeManagerComponent`
  Build: Create `js/badges.js` defining the 4 badges and evaluation rules; build the Badges card grid in `index.html`; wire milestone check into the score and confession events; animate unlocked status.
  Verify (mechanical): Simulate state reaching 30s streak and 500 points, verify all 4 badge elements toggle from locked to unlocked state in DOM.
  Learner check: Stay still for 30 seconds to unlock "Speed Is Overrated", and roll an excuse to unlock "Tomorrow's Problem".
  Commit: `Add milestone badge manager and unlock animations`

- [x] **5. 1-Click Clipboard Certificate & Dynamic Leaderboard**
  Becomes usable: An Official Slacker Certificate card that copies a formatted emoji audit report to your clipboard, and a mock coworker leaderboard that dynamically re-ranks as your score climbs.
  Why now: Completes the full PoC journey—giving the user immediate social bragging rights to share in Slack/Discord and a live competitive rank.
  PRD ref: `prd.md > Features and Behavior > Slacker Certificate Action Card`, `prd.md > Mock Enterprise Leaderboard`
  Spec ref: `spec.md > Components > SlackerCertificateComponent`, `spec.md > Components > ColleagueLeaderboardComponent`
  Build: Create `js/certificate.js` generating the formatted text report with clipboard copy & fallback; create `js/leaderboard.js` rendering mock coworkers and dynamically sorting user rank; build both cards in `index.html`.
  Verify (mechanical): Call certificate generator and verify output string matches PRD template; simulate score change and verify leaderboard row order updates dynamically.
  Learner check: Click "Copy Certificate", paste into a text editor/chat, and verify your real score and excuse are in the snippet; verify your row moves up on the leaderboard as your score rises.
  Commit: `Implement 1-click clipboard certificate and dynamic leaderboard`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 1 (core idle FSM, stillness/movement feedback, and visual tokens)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 5 (complete 5-card dashboard)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions

