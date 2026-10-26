/**
 * LazyLegend — Application Coordinator
 * Implements: spec.md > Components > ExecutiveHeaderComponent, SlothTrackerComponent
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

  function renderState() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerClock = document.getElementById('timerClock');

    if (scoreDisplay) scoreDisplay.textContent = appState.score;
    if (timerClock) timerClock.textContent = formatTime(appState.longestStreak);
    updateRank(appState.score);
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

    // 2. Instantiate Tracker FSM
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

    // 3. Reset Day Action
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
  });
})();
