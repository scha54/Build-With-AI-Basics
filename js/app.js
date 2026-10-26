/**
 * LazyLegend — Application Coordinator
 * Implements: spec.md > Components > ExecutiveHeaderComponent, SlothTrackerComponent, ProcrastinationConfessionalComponent
 * Persists via: spec.md > Data Model & Persistence Layer
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  // Active state loaded from localStorage
  let appState = null;
  let currentRank = "Level 1: Novice Procrastinator";

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }

  function showPointPopup(points = 1) {
    const popup = document.getElementById('scorePopup');
    if (!popup) return;
    popup.textContent = `+${points}`;
    popup.style.animation = 'none';
    popup.offsetHeight; // Trigger DOM reflow
    popup.style.animation = 'floatUp 0.8s ease-out forwards';
  }

  function updateRank(score) {
    const badge = document.getElementById('userRankBadge');
    if (!badge) return;

    if (score >= 500) {
      currentRank = "Level 4: Supreme Couch Commander";
    } else if (score >= 250) {
      currentRank = "Level 3: Senior Slacker";
    } else if (score >= 100) {
      currentRank = "Level 2: Intermediate Postponist";
    } else {
      currentRank = "Level 1: Novice Procrastinator";
    }
    badge.textContent = currentRank;
  }

  function triggerConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#10b981', '#8b5cf6', '#38bdf8']
      });
    }
  }

  function renderConfessions() {
    const list = document.getElementById('confessionsList');
    if (!list) return;

    if (!appState.confessions || appState.confessions.length === 0) {
      list.innerHTML = '<div class="confession-empty" id="confessionEmpty">No effort detected yet. Outstanding.</div>';
      return;
    }

    // Display recent 5 in reverse chronological order
    const recent = appState.confessions.slice(-5).reverse();
    list.innerHTML = recent.map(c => `
      <div class="confession-item">
        <span class="confession-text" title="${c.text}">🦥 ${escapeHtml(c.text)}</span>
        <span class="confession-points">+${c.pointsAwarded || 50} pts</span>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function addConfession(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // 1. Add confession record
    const entry = {
      id: Date.now().toString(),
      text: cleanText,
      timestamp: Date.now(),
      pointsAwarded: 50
    };
    appState.confessions.push(entry);
    appState.score += 50;

    // 2. Persist state
    LazyLegend.StorageManager.save(appState);

    // 3. Update DOM
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (scoreDisplay) scoreDisplay.textContent = appState.score;
    showPointPopup(50);
    updateRank(appState.score);
    renderConfessions();
    triggerConfetti();

    // 4. Deadpan Scolding for physical effort of typing/clicking
    const reprimandBanner = document.getElementById('reprimandBanner');
    const reprimandText = document.getElementById('reprimandText');
    if (reprimandBanner && reprimandText) {
      reprimandText.textContent = `CARDINAL SIN OF TYPING (+50 pts): You expended physical energy to postpone: "${cleanText}". The sloth is conflicted but rewards you.`;
      reprimandBanner.style.display = 'block';
    }
  }

  function renderState() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerClock = document.getElementById('timerClock');

    if (scoreDisplay) scoreDisplay.textContent = appState.score;
    if (timerClock) timerClock.textContent = formatTime(appState.longestStreak);
    updateRank(appState.score);
    renderConfessions();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Load persisted state or fallback
    appState = LazyLegend.StorageManager.load();
    renderState();

    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerClock = document.getElementById('timerClock');
    const statusPill = document.getElementById('statusPill');
    const reprimandBanner = document.getElementById('reprimandBanner');
    const reprimandText = document.getElementById('reprimandText');
    const btnResetDay = document.getElementById('btnResetDay');
    
    // Confessional DOM elements
    const confessionInput = document.getElementById('confessionInput');
    const btnPostpone = document.getElementById('btnPostpone');
    const btnRollExcuse = document.getElementById('btnRollExcuse');

    // 2. Wire Confessional interactions
    if (btnPostpone && confessionInput) {
      btnPostpone.addEventListener('click', () => {
        const val = confessionInput.value.trim() || "Unspecified mundane responsibility";
        addConfession(val);
        confessionInput.value = '';
      });

      confessionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = confessionInput.value.trim() || "Unspecified mundane responsibility";
          addConfession(val);
          confessionInput.value = '';
        }
      });
    }

    if (btnRollExcuse) {
      btnRollExcuse.addEventListener('click', () => {
        const excuse = LazyLegend.getRandomExcuse ? LazyLegend.getRandomExcuse() : "Conducting mental audit of ceiling.";
        addConfession(excuse);
      });
    }

    // 3. Instantiate Tracker FSM
    const tracker = new LazyLegend.ActivityTracker({
      idleThresholdMs: 2000,
      heartbeatMs: 1000,
      
      onTick: (totalSeconds, streakSeconds) => {
        appState.score += 1;
        appState.totalIdleSeconds += 1;
        appState.longestStreak = Math.max(appState.longestStreak, streakSeconds);
        
        // Persist state on tick
        LazyLegend.StorageManager.save(appState);

        if (scoreDisplay) scoreDisplay.textContent = appState.score;
        if (timerClock) timerClock.textContent = formatTime(streakSeconds);
        showPointPopup(1);
        updateRank(appState.score);
      },

      onStateChange: (newState) => {
        if (!statusPill) return;

        if (newState === LazyLegend.FSM_STATES.ACTIVE_STILLNESS || newState === LazyLegend.FSM_STATES.STILLNESS_TICK) {
          statusPill.className = 'status-pill stillness';
          statusPill.textContent = 'Zen Stillness';
          if (reprimandBanner) reprimandBanner.style.display = 'none';
        } else if (newState === LazyLegend.FSM_STATES.MOVEMENT_VIOLATION) {
          statusPill.className = 'status-pill violation';
          statusPill.textContent = 'Cardinal Sin';
        } else {
          statusPill.className = 'status-pill input';
          statusPill.textContent = 'Active Input';
        }
      },

      onViolation: (message) => {
        if (!reprimandBanner || !reprimandText) return;
        reprimandText.textContent = message;
        reprimandBanner.style.display = 'block';
      }
    });

    // 4. Reset Day Action
    if (btnResetDay) {
      btnResetDay.addEventListener('click', () => {
        appState = LazyLegend.StorageManager.reset();
        renderState();
        if (timerClock) timerClock.textContent = '00:00:00';
        if (reprimandBanner) reprimandBanner.style.display = 'none';
      });
    }

    tracker.start();
    LazyLegend.tracker = tracker;
    LazyLegend.getState = () => appState;
    LazyLegend.addConfession = addConfession;
    LazyLegend.triggerConfetti = triggerConfetti;
  });
})();
