---
doc: spec
status: approved
---

# LazyLegend — Technical Specification

A zero-build, client-side web application blueprint implementing the deadpan corporate anti-productivity tracker specified in `prd.md`.

---

## How This Works, In Plain Language

LazyLegend is built with standard web technologies (HTML, CSS, JavaScript) that require no build steps, compilers, or server processes. You can run it simply by double-clicking `index.html` in any web browser.

The app acts as a real-time inactivity monitor:
- It listens for user activity events (mouse movement, clicks, scrolling, key presses) across the browser window.
- When no activity occurs for 2 seconds, the internal state machine transitions into **Active Stillness**, awarding 1 point per second to the user's Laziness Score.
- If the user moves or types, the state machine instantly trips into **Movement Violation**, pausing score accumulation and flashing a sarcastic reprimand for breaking the sloth oath.
- Interacting with the **Procrastination Confessional** allows logging chores or rolling random excuses, awarding +50 point bonuses with celebratory confetti.
- All state (score, unbroken streak, unlocked badges, recent confessions) is validated and stored in browser `localStorage`, ensuring data survives tab reloads without requiring a backend database or user accounts.

---

## The Core Journey Through the System
Implements: `prd.md > The Core Journey`

1. **DOM Load (`DOMContentLoaded`)**:
   - `StorageManager.load()` reads `lazylegend_state` from `localStorage`. If empty or corrupted, it initializes default zero-effort state.
   - UI components (`ExecutiveHeader`, `SlothTracker`, `Confessional`, `BadgeManager`, `CertificateCard`, `Leaderboard`) render initial states based on stored data.
2. **Stillness Detection Loop**:
   - `ActivityMonitor` tracks timestamp of last detected user event.
   - A 1000ms heartbeat interval evaluates elapsed time:
     - If elapsed $\ge$ 2000ms: emits `STILLNESS_TICK`, increments score by +1, updates DOM timers, and evaluates badge criteria.
3. **Movement Interruption**:
   - Window listener catches `mousemove`, `keydown`, or `touchstart`.
   - If currently in `STILLNESS`, emits `MOVEMENT_DETECTED`, pauses the idle timer, and renders the deadpan reprimand banner via `UIManager.showReprimand()`.
4. **Confessional Interaction**:
   - User types chore or clicks "Roll Random Excuse".
   - `ConfessionManager.submit()` appends confession to state, awards +50 pts, triggers `ConfettiService.burst()`, and saves state.
5. **Badge Unlock Check**:
   - After any score update or confession, `BadgeManager.evaluate()` tests criteria. Unlocked badges trigger high-intensity confetti and update the badge card.
6. **Certificate Export**:
   - User clicks "Copy Certificate". `CertificateService.generate()` compiles formatted text with emojis, writes to `navigator.clipboard`, and toggles button feedback.

---

## Stack
Implements: `prd.md > Look and Feel`

- **Markup**: Semantic HTML5 (no template engines or preprocessors).
- **Styling**: Vanilla CSS3 utilizing strict CSS Custom Properties (Design Tokens), Flexbox, and CSS Grid.
- **Logic**: Vanilla ECMAScript 2022 (ES6+) structured into modular, self-executing namespaces/modules using classic script orchestration (enabling direct execution from `file:///` without CORS module errors).
- **External Dependencies**:
  - [canvas-confetti (v1.9.3)](https://github.com/catdad/canvas-confetti): Loaded via CDN (`https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js`) with an inline DOM particle fallback if offline.
- **Fonts**: System sans-serif font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) with monospace accents (`ui-monospace, SFMono-Regular, Menlo, monospace`) to eliminate web font latency.

---

## Where It Runs and How Someone Tries It

- **Runtime**: Any modern desktop or mobile browser (Chrome, Edge, Firefox, Safari).
- **Start Command**: 
  - Direct file launch: Double-click `index.html` or drag it into any browser tab (`file:///.../index.html`).
  - Optional local server: `python -m http.server 8000` or `npx serve .` (not required).
- **Demo Recording**: Open `index.html`, let idle run for 10s to see points accumulate, move mouse to trigger reprimand, click "Roll Random Excuse" to pop confetti and unlock badge, then click "Copy Certificate".
- **Deployment (Optional)**: Can be deployed to GitHub Pages or Netlify by simply pushing `index.html`, `styles.css`, and `app.js`.

---

## Strict CSS Design Token Contracts
Implements: `prd.md > Look and Feel`

To prevent AI coding agent drift and maintain an authentic Linear/Stripe dark corporate aesthetic, styling is strictly bound to the following CSS custom properties:

```css
:root {
  /* Surface & Background Tokens */
  --ll-bg-base: #0b0f17;
  --ll-bg-surface: #111827;
  --ll-bg-card: rgba(17, 24, 39, 0.85);
  --ll-bg-card-hover: rgba(31, 41, 55, 0.85);
  --ll-bg-input: #1f2937;

  /* Border Tokens */
  --ll-border-subtle: rgba(255, 255, 255, 0.08);
  --ll-border-card: #374151;
  --ll-border-active: #f59e0b;

  /* Accent & Brand Tokens */
  --ll-accent-sloth-gold: #f59e0b;
  --ll-accent-sloth-amber: #d97706;
  --ll-accent-idle-green: #10b981;
  --ll-accent-sin-red: #ef4444;
  --ll-accent-purple: #8b5cf6;
  --ll-accent-blue: #38bdf8;

  /* Text & Contrast Tokens */
  --ll-text-primary: #f9fafb;
  --ll-text-secondary: #9ca3af;
  --ll-text-muted: #6b7280;

  /* Typography & Layout Tokens */
  --ll-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --ll-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --ll-radius-sm: 6px;
  --ll-radius-md: 10px;
  --ll-radius-lg: 16px;
  --ll-shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
}
```

---

## State Machine: Idle / Movement FSM
Implements: `prd.md > Features and Behavior > Sloth Mode Idle Tracker`, `prd.md > Cardinal Sin Movement Reprimand`

The app uses a strict Finite State Machine (FSM) to govern user activity and prevent ambiguous timing states:

```
                  ┌────────────────────────────────────────┐
                  │                                        │
                  ▼                                        │ User moves/types
         ┌──────────────────┐  No input for 2.0s  ┌───────────────────────┐
         │  ACTIVE_INPUT    │───────────────────→│   ACTIVE_STILLNESS    │
         └──────────────────┘                    └───────────────────────┘
                  │                                        │
User moves/types  │                                        │ 1000ms Heartbeat
during violation  ▼                                        ▼
         ┌──────────────────┐                    ┌───────────────────────┐
         │MOVEMENT_VIOLATION│←───────────────────│     STILLNESS_TICK    │
         └──────────────────┘   User moves/types └───────────────────────┘
                  │                                        │
                  │ No input for 2.0s                      │ Score += 1
                  └────────────────────────────────────────┘
```

### State Definitions:
1. `ACTIVE_INPUT`: User is actively clicking or typing. Score accumulation paused. Reprimand hidden.
2. `ACTIVE_STILLNESS`: 2000ms have elapsed since last detected event. Timer is active; pulses green indicator.
3. `STILLNESS_TICK`: Fired every 1000ms of continuous stillness. Awards +1 point to Laziness Score, updates DOM counters, evaluates milestone badges.
4. `MOVEMENT_VIOLATION`: Fired when `mousemove`, `keydown`, or `scroll` occurs while in `ACTIVE_STILLNESS`. 
   - Halts idle timer.
   - Displays sarcastic reprimand banner within 100ms.
   - After 2000ms of stillness following the violation, transitions back to `ACTIVE_STILLNESS`.

---

## Data Model & Persistence Layer
Implements: `prd.md > States and Boundaries > Persistence`

All application state is held in a single immutable-style object saved under `localStorage.getItem('lazylegend_state')`.

### Schema Contract:
```typescript
interface LazyLegendState {
  version: 1;
  score: number;             // Total Laziness Points (e.g. 150)
  totalIdleSeconds: number;  // Cumulative seconds spent in stillness
  longestStreak: number;     // Highest unbroken idle streak in seconds
  confessions: Array<{
    id: string;
    text: string;
    timestamp: number;
    pointsAwarded: number;
  }>;
  unlockedBadgeIds: string[]; // e.g. ["speed_overrated", "tomorrows_problem"]
  lastActiveTimestamp: number;
}
```

### Default State (First Run / Corrupted Recovery):
```javascript
const DEFAULT_STATE = {
  version: 1,
  score: 0,
  totalIdleSeconds: 0,
  longestStreak: 0,
  confessions: [],
  unlockedBadgeIds: [],
  lastActiveTimestamp: Date.now()
};
```

### Persistence Protocol:
- **Write**: Debounced state serialization (`JSON.stringify`) executed on score increment, confession submit, or badge unlock.
- **Read & Validate**: At boot, `StorageManager.load()` verifies `version === 1` and all required fields. If parsing fails or fields are missing, it safely falls back to `DEFAULT_STATE` without crashing.
- **Reset**: Clicking "Reset Day" purges the key and resets the state to `DEFAULT_STATE`.

---

## Components

### 1. ExecutiveHeaderComponent
- Implements: `prd.md > Screens and Layout > Top Executive Header`
- Renders sloth avatar, corporate status rank title (e.g., *Novice Slacker*, *Senior Postponist*, *Supreme Couch Commander*), large numerical score, and "Reset Day" trigger.
- Emits: Floating `+1` or `+50` point animation on DOM when score changes.

### 2. SlothTrackerComponent
- Implements: `prd.md > Features and Behavior > Sloth Mode Idle Tracker`, `prd.md > Cardinal Sin Movement Reprimand`
- Renders:
  - Current idle timer (`00:00:00`).
  - Active Stillness green pill indicator.
  - Movement violation reprimand alert container with deadpan corporate scolding copy.

### 3. ProcrastinationConfessionalComponent
- Implements: `prd.md > Features and Behavior > Procrastination Confessional & Excuse Generator`
- Contains:
  - Text input for custom task avoidance with "Postpone" submit button.
  - "Roll Random Excuse" button connected to a library of 18 pre-defined corporate excuses.
  - Recent confessions feed displaying the 3 most recently logged avoidances.

### 4. BadgeManagerComponent
- Implements: `prd.md > Features and Behavior > Badges & Accolades`
- Monitors 4 milestone criteria:
  1. `speed_overrated`: `longestStreak >= 30` (30s stillness)
  2. `tomorrows_problem`: `confessions.length >= 1` (First excuse/task logged)
  3. `master_delegation`: `confessions.length >= 3` (3 excuses logged)
  4. `couch_commander`: `score >= 500` (500 total points)
- Renders badge cards with lock status, unlock timestamps, and fires confetti on new unlock.

### 5. SlackerCertificateComponent
- Implements: `prd.md > Features and Behavior > Slacker Certificate Action Card`
- Generates dynamic ASCII/emoji audit report card with current score, rank, idle time, and latest excuse.
- Handles `navigator.clipboard.writeText()` with instant button state toggle (*"Copied to Clipboard! 🦥"*).

### 6. ColleagueLeaderboardComponent
- Implements: `prd.md > Features and Behavior > Mock Enterprise Leaderboard`
- Merges 4 static mock coworkers with the dynamic user record, sorts by `score DESC`, and renders ranked table rows with animated position re-ordering.

---

## File Structure

```
c:/Build/Antigravity/Build With AI Basics/
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md              # Canonical Technical Specification
│   └── spec.html            # Interactive Spec Companion
├── index.html               # Semantic single-page HTML layout
├── styles.css               # Strict Design Token styling & layout
├── js/
│   ├── state.js             # Data Model, StorageManager, Default State
│   ├── excuses.js           # Curated library of 18 enterprise excuses
│   ├── tracker.js           # Idle/Movement State Machine & Event Listeners
│   ├── badges.js            # Badge definitions & unlock evaluation logic
│   ├── certificate.js       # Dynamic report card generator & clipboard API
│   ├── leaderboard.js       # Mock coworkers & dynamic ranking logic
│   └── app.js               # Application coordinator & DOM binding
└── README.md                # Quickstart & Demo recording instructions
```

---

## Important Failure Modes and Fallbacks

1. **`file:///` Protocol CORS Block**:
   - *Risk*: Using ES6 modules (`type="module"`) causes browser CORS errors when opened directly from disk (`file:///`).
   - *Fallback*: All scripts use modular classic script loading or namespaced objects attached to `window.LazyLegend` loaded in dependency order, ensuring 100% functionality when double-clicked from local folders.
2. **Clipboard Permission Denied**:
   - *Risk*: Some browser privacy settings or insecure contexts block `navigator.clipboard.writeText()`.
   - *Fallback*: If the clipboard promise rejects, the app falls back to `document.execCommand('copy')` or pops open a select-all `<textarea>` modal with instructions (*"Press Ctrl+C to copy"*).
3. **`localStorage` Disabled or Private Browsing Quota**:
   - *Risk*: Safari private mode or disabled cookies block `localStorage`.
   - *Fallback*: In-memory object fallback that keeps the current session working seamlessly without throwing unhandled exceptions.
4. **Confetti CDN Offline**:
   - *Risk*: Running with no internet connection fails to fetch `canvas-confetti` from CDN.
   - *Fallback*: `ConfettiService` checks if `window.confetti` exists; if undefined, it triggers an inline CSS burst animation on the badge card.

---

## What Was Simplified and Why

- **Client-Side Storage instead of Database**: Using `localStorage` avoids spinning up SQLite or Supabase, fulfilling the single-user local demo requirement in 0ms network latency.
- **Mock Leaderboard instead of WebSockets**: 4 pre-seeded fictional colleagues provide instant competitive banter and real-time rank hopping without needing real-time backend synchronization.
- **Direct Browser File Launch instead of Bundler**: Zero build tools (no Webpack, Vite, or npm installs) eliminates tooling setup failure and allows instant execution on any computer.

---

## Decisions and Open Issues

- **Learner Decision — Zero-Build Vanilla**: Selected semantic HTML5, CSS custom properties, and modular JS for instant run-anywhere simplicity.
- **Learner Decision — Direct File Opening**: Selected direct browser launch, solved via classic script orchestration to bypass `file:///` CORS module restrictions.
- **Learner Steering Focus — Triple Boundary Enforcement**:
  1. *FSM Boundary*: Formal 4-state diagram with explicit 2000ms delay and 1000ms tick rules.
  2. *Persistence Contract*: Strict TypeScript-style schema with versioning and corrupted-state recovery.
  3. *Design Tokens*: Complete `:root` CSS custom property contract locking the dark corporate Linear/Stripe palette.
- **Open Questions**: None blocking build. All components, schemas, and timing contracts are fully specified.
