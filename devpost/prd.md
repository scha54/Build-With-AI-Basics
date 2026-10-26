---
doc: prd
status: approved
---

# LazyLegend — Product Requirements

A corporate-grade, satirical anti-productivity dashboard that tracks idle time, celebrates avoided chores, reprimands effort, and crowns users with official slacker badges and certificates.
Source: `scope.md > The Unique Kernel`

---

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`

1. **Arrival**: The user opens LazyLegend in a browser and is greeted by a sleepy sloth mascot with deadpan enterprise praise (e.g., *"Inactive for 12 seconds. That's true corporate dedication."*). The top header immediately displays their current **Laziness Score** and slacker rank.
2. **Idle Accumulation ("Sloth Mode")**: The user sits back without touching the mouse or keyboard. A live timer counts consecutive idle seconds, steadily adding **+1 point per second** to the Laziness Score with smooth counter animations.
3. **The Cardinal Sin**: When the user moves the mouse or taps a key, the inactivity streak pauses and a humorous "Cardinal Sin" warning banner appears (e.g., *"UNAUTHORIZED PRODUCTIVITY DETECTED: Put down the mouse before someone gets promoted."*).
4. **The Confessional**: To overcome the urge to work, the user opens the *Procrastination Confessional* card to either type an avoided task (*"Write quarterly report"*) or click **"Roll Random Excuse"** (*"Reorganizing desktop icons by color frequency"*). 
5. **Reward & Confetti**: Submitting an avoided task or rolling an excuse displays a sarcastic reprimand for the physical effort of typing/clicking, but instantly rewards a **+50 point bonus** and bursts celebratory confetti.
6. **Badge Unlock**: Reaching milestones (e.g., 30 seconds of stillness, 3 excuses logged, 500 total points) triggers celebratory popups that unlock official badges (*"Speed Is Overrated"*, *"Supreme Couch Commander"*).
7. **Certificate Generation**: The user clicks the **"Copy Slacker Certificate"** action card. A formatted slacker audit report snippet with emojis is copied to their clipboard, ready to paste into Slack, Discord, or WhatsApp.
8. **Leaderboard Glance**: The user inspects the *Global Slacker Leaderboard* card to see how they rank against pre-populated legendary slackers.

---

## Screens and Layout
Source: `scope.md > The POC Boundary`

LazyLegend is an ultra-responsive, single-page corporate web application optimized for desktop and mobile browsers, structured into two main zones:

### 1. Top Executive Header
- **Sloth Mascot Avatar**: Sleepy sloth illustration with animated blinking/breathing states and dynamic status speech bubble.
- **Enterprise Status Badge**: Current rank title (e.g., *Level 1: Novice Procrastinator* → *Level 4: Supreme Couch Commander*).
- **Primary Laziness Score**: Large, prominent numeric score with animated "+X" floating popups when points are awarded.
- **Quick Reset Action**: Discreet "Reset Day" text button to clear today's progress for testing or starting a fresh slacker session.

### 2. Main Dashboard Grid
A responsive 2-column (or 3-column on wide screens) grid containing 5 dedicated cards:
1. **Sloth Mode Card**: Shows real-time unbroken idle duration, active status indicator (*"Zen Stillness"* vs. *"Cardinal Sin Detected"*), and current point accumulation rate.
2. **Procrastination Confessional Card**: Text input to type an avoided task, "Confess & Postpone" button, and a prominent "Roll Random Excuse" button with a library of enterprise excuses.
3. **Badges & Accolades Card**: Grid of achievement badges showing unlocked status, lock icons for remaining badges, and unlock criteria tooltips.
4. **Official Slacker Certificate Card**: Live preview of the formatted report card with a high-contrast **"Copy to Clipboard"** button and copy confirmation feedback.
5. **Colleague Leaderboard Card**: Read-only enterprise leaderboard showing ranked fictional colleagues, their avoided activities, and slacker scores.

---

## Look and Feel
Source: `scope.md > Inspiration & Identity`

- **Visual Style**: Sleek, modern enterprise tool reminiscent of Linear, Stripe, or Vercel dashboards—serious corporate UI subverted by humorous sloth content.
- **Color Palette**:
  - *Backgrounds*: Deep charcoal and slate (`#0B0F17`, `#111827`, `#1F2937`).
  - *Cards & Borders*: Translucent slate with subtle 1px border highlights (`#374151` / `rgba(255,255,255,0.08)`).
  - *Accents*: Sloth earth tones and warm amber (`#F59E0B`, `#D97706`, `#10B981` for idle status, `#EF4444` for movement warning).
  - *Text*: Crisp high-contrast white headers (`#F9FAFB`) with muted slate secondary labels (`#9CA3AF`).
- **Typography**: Clean, razor-sharp modern sans-serif (`Inter`, system-ui) paired with monospace accents (`ui-monospace`, `SFMono-Regular`) for timers, metrics, and audit codes.
- **Animations**: Subtle pulse on idle timer, quick red flash/shake on mouse movement violation, celebratory confetti bursts via `canvas-confetti` on badge unlocks and confessional submissions.

---

## Features and Behavior

### 1. Sloth Mode Idle Tracker
Source: `scope.md > The POC Boundary`

- Automatically monitors browser window activity (mouse movement, clicks, scrolling, key presses).
- When no input is detected for 2+ seconds, the app enters **Active Stillness**.
- Every full second of stillness increments the active idle timer and adds **+1 point** to the total Laziness Score.
- Acceptance Criteria:
  - [ ] Leaving mouse and keyboard untouched for 5 seconds increases the Laziness Score by 5 points.
  - [ ] Moving the mouse or typing immediately halts the idle counter and triggers the movement reprimand.

### 2. The Cardinal Sin Movement Reprimand
Source: `scope.md > The Unique Kernel`

- Whenever user activity breaks a stillness streak, an alert badge or toast message displays deadpan corporate scolding (e.g., *"ALERT: Unsanctioned physical exertion detected."*, *"Why move when you could simply not?"*).
- Acceptance Criteria:
  - [ ] Any mouse movement or keypress while in stillness displays a humorous reprimand message within 300ms.
  - [ ] The reprimand automatically fades or collapses when stillness resumes.

### 3. Procrastination Confessional & Excuse Generator
Source: `scope.md > The POC Boundary`

- **Manual Confession**: User types any task they are putting off into an input field and clicks "Postpone".
- **Random Excuse Generator**: User clicks "Roll Random Excuse" to randomly cycle through at least 15 absurd, corporate-flavored excuses (e.g., *"Awaiting stakeholder alignment on my nap schedule"*, *"Debugging my motivation in staging"*).
- **Execution & Feedback**: Submitting an avoided task or generating an excuse triggers:
  1. A toast scolding the user for the mechanical exertion of typing/clicking.
  2. An immediate **+50 point bonus** added to the Laziness Score.
  3. A confetti burst.
  4. The newly confessed task or excuse is appended to a "Recent Avoidances" list in the card.
- Acceptance Criteria:
  - [ ] Typing an item and clicking "Postpone" clears the input, adds +50 points to the score, and logs the item.
  - [ ] Clicking "Roll Random Excuse" instantly inserts a random excuse from the library, awards +50 points, and displays the reprimand.

### 4. Badges & Accolades
Source: `scope.md > The POC Boundary`

- The app includes at least 4 milestone badges:
  - **Speed Is Overrated**: Remain idle for 30 consecutive seconds.
  - **Tomorrow's Problem**: Confess your first avoided task or roll your first excuse.
  - **Master of Delegation**: Log at least 3 avoided chores or excuses.
  - **Supreme Couch Commander**: Reach 500 total Laziness Points.
- Badges appear semi-transparent with lock icons until unlocked.
- Unlocking a badge triggers full-screen confetti, plays an optional soft celebratory tone, and permanently displays the badge in full color.
- Acceptance Criteria:
  - [ ] Reaching 30 seconds of unbroken stillness unlocks "Speed Is Overrated" with confetti.
  - [ ] Reaching 500 points unlocks "Supreme Couch Commander" with confetti.

### 5. Slacker Certificate Action Card
Source: `scope.md > The POC Boundary`, `scope.md > What "Working" Looks Like`

- Displays a live preview of the generated **Official Slacker Audit Certificate**:
  ```text
  🦥 OFFICIAL SLACKER AUDIT REPORT 🦥
  Candidate: Certified Slacker
  Status: ELITE COUCH COMMANDER
  Laziness Score: 540 pts
  Total Idle Time: 3m 42s
  Chore Avoided: "Quarterly Taxes"
  Primary Excuse: "Awaiting stakeholder alignment on my nap schedule"
  Badges Earned: 3/4
  Verified by LazyLegend Corporate Bureau of Inaction
  ```
- Clicking **"Copy Certificate"** writes this text to the system clipboard and changes the button label to *"Copied to Clipboard! 🦥"* for 2 seconds.
- Acceptance Criteria:
  - [ ] Clicking "Copy Certificate" successfully writes formatted text including current score, idle time, and latest excuse to clipboard.
  - [ ] Button displays visual confirmation feedback immediately.

### 6. Mock Enterprise Leaderboard
Source: `scope.md > The POC Boundary`

- Renders a clean table card comparing the current user against 4 pre-configured fictional slackers:
  1. *Sarah Jenkins (VP of Postponing)* — 1,240 pts — *"Napping through Q3 planning"*
  2. *Dave Miller (Senior Idle Architect)* — 980 pts — *"Canceled zoom call to take a nap"*
  3. *You (Certified Slacker)* — [Dynamic Current User Score] — [Current Rank]
  4. *Alex Rivera (Lead Excuse Officer)* — 340 pts — *"Staring out window for inspiration"*
  5. *Morgan Chen (Junior Procrastinator)* — 110 pts — *"Left on 'Read' for 4 hours"*
- The current user's row dynamically moves up or down the rankings as their score increases.
- Acceptance Criteria:
  - [ ] When the user's score surpasses 340 points, their row dynamically jumps above Alex Rivera in the table.

---

## States and Boundaries

- **First Use State**: Score starts at 0 (or a base starter rank of 0 pts, *Level 1: Novice Procrastinator*). Badges are all locked. Confessional history is empty with a placeholder prompt (*"No effort detected yet. Excellent."*).
- **Active Stillness State**: Timer running, score incrementing every second, green pulsating indicator.
- **Violation State**: Movement detected; counter pauses, red badge highlights the cardinal sin, score accumulation pauses until stillness returns.
- **Persistence State**: Current score, total idle seconds, unlocked badges, and recent confessions persist in `localStorage` so refreshing or reopening the tab retains progress.
- **Clipboard Fallback**: If browser permissions block automatic clipboard access, a select-all text box is displayed for manual copying.

---

## Product Decisions

- **Automated Idle vs. Manual Timer**: Decided on automatic browser idle detection rather than a manual start/stop button to make stillness effortless and immediately reactive.
- **Effort Reprimand on Confession**: Decided that typing or clicking in the confessional intentionally triggers the "Cardinal Sin of Effort" scolding, balancing it with a generous +50 pt reward to heighten the comedic contradiction.
- **Text/Emoji Certificate over Image**: Opted for a formatted text/emoji clipboard snippet so users can instantly paste their report directly into Slack, Teams, Discord, or WhatsApp without downloading files.
- **Dynamic Local Leaderboard**: Decided to include a live re-ranking table using mock coworkers to satisfy the competitive bragging urge without requiring backend user accounts.

---

## What We're Building (Proof of Concept)
- Single-page dark mode responsive dashboard.
- Real-time idle detection counter (+1 pt/sec).
- Movement reprimand banner on keyboard/mouse activity.
- Procrastination Confessional with task input and 15+ curated random excuses (+50 pts bonus).
- 4 unlockable achievement badges with confetti bursts.
- Live-updating Slacker Certificate with 1-click clipboard copy.
- Dynamic 5-row leaderboard re-ranking in real time.
- Browser persistence via `localStorage`.

---

## Deferred From the POC
- Multi-user live backend syncing for real friend leaderboards (deferred to keep build to <3 hours without server infrastructure).
- Native OS-level / background system activity tracking (deferred due to browser sandbox and privacy concerns).
- Sound effects pack / customizable sloth voices (deferred to focus on core visual humor).

---

## Possible Later Enhancements
- Slack / Discord webhook bot to post slacker certificates directly to team channels.
- Custom mascot generator (choose between Sloth, Cat, Panda, or Capybara).
- Daily "Slacker Standup" summary generator for standup meetings.

---

## Non-Goals
- No real productivity integrations (Google Calendar, Jira, Todoist, Asana).
- No user registration, password authentication, or cloud database setup.
- No invasive spyware or screen recording.

---

## Open Questions
- None blocking specification. All core interactions, layout zones, and acceptance criteria are concrete and testable.
