/**
 * LazyLegend — Application Coordinator
 * Implements: spec.md > Components > ExecutiveHeaderComponent, SlothTrackerComponent
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};

  // Simple in-memory session score for Slice 1 (persisted in Slice 2)
  let currentScore = 0;
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

  document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerClock = document.getElementById('timerClock');
    const statusPill = document.getElementById('statusPill');
    const reprimandBanner = document.getElementById('reprimandBanner');
    const reprimandText = document.getElementById('reprimandText');
    const btnResetDay = document.getElementById('btnResetDay');

    // Instantiate Tracker FSM
    const tracker = new LazyLegend.ActivityTracker({
      idleThresholdMs: 2000,
      heartbeatMs: 1000,
      
      onTick: (totalSeconds, streakSeconds) => {
        currentScore += 1;
        if (scoreDisplay) scoreDisplay.textContent = currentScore;
        if (timerClock) timerClock.textContent = formatTime(streakSeconds);
        showPointPopup(1);
        updateRank(currentScore);
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

    if (btnResetDay) {
      btnResetDay.addEventListener('click', () => {
        currentScore = 0;
        if (scoreDisplay) scoreDisplay.textContent = '0';
        if (timerClock) timerClock.textContent = '00:00:00';
        if (reprimandBanner) reprimandBanner.style.display = 'none';
        updateRank(0);
      });
    }

    tracker.start();
    LazyLegend.tracker = tracker;
  });
})();
