/**
 * LazyLegend — Idle / Movement Finite State Machine (FSM)
 * Implements: spec.md > State Machine: Idle / Movement FSM
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  const FSM_STATES = {
    ACTIVE_INPUT: 'ACTIVE_INPUT',
    ACTIVE_STILLNESS: 'ACTIVE_STILLNESS',
    STILLNESS_TICK: 'STILLNESS_TICK',
    MOVEMENT_VIOLATION: 'MOVEMENT_VIOLATION'
  };

  const REPRIMAND_MESSAGES = [
    "UNAUTHORIZED EXERTION: Put down the mouse before someone promotes you.",
    "CARDINAL SIN DETECTED: Physical effort is strictly prohibited on company time.",
    "SLACK VIOLATION: Moving your cursor burns calories. Cease immediately.",
    "EFFORT ALERT: Why move when you could simply achieve nothing?",
    "UNSANCTIONED ACTIVITY: That keystroke has been logged on your slacker audit."
  ];

  class ActivityTracker {
    constructor(options = {}) {
      this.idleThresholdMs = options.idleThresholdMs || 2000; // 2 seconds to enter stillness
      this.heartbeatMs = options.heartbeatMs || 1000;         // 1 tick per second
      
      this.state = FSM_STATES.ACTIVE_INPUT;
      this.lastInputTime = Date.now();
      this.currentStreakSeconds = 0;
      this.totalIdleSeconds = 0;
      
      this.onTick = options.onTick || (() => {});
      this.onStateChange = options.onStateChange || (() => {});
      this.onViolation = options.onViolation || (() => {});
      
      this.heartbeatInterval = null;
      this._boundHandleInput = this.handleInput.bind(this);
    }

    start() {
      const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
      events.forEach(evt => window.addEventListener(evt, this._boundHandleInput, { passive: true }));
      
      this.heartbeatInterval = setInterval(() => this.heartbeat(), this.heartbeatMs);
    }

    stop() {
      const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
      events.forEach(evt => window.removeEventListener(evt, this._boundHandleInput));
      if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    }

    handleInput() {
      const now = Date.now();
      this.lastInputTime = now;

      if (this.state === FSM_STATES.ACTIVE_STILLNESS || this.state === FSM_STATES.STILLNESS_TICK) {
        // Transition into MOVEMENT_VIOLATION
        this.transitionTo(FSM_STATES.MOVEMENT_VIOLATION);
        this.currentStreakSeconds = 0;
        
        const randomScolding = REPRIMAND_MESSAGES[Math.floor(Math.random() * REPRIMAND_MESSAGES.length)];
        this.onViolation(randomScolding);
      }
    }

    heartbeat() {
      const now = Date.now();
      const elapsedSinceInput = now - this.lastInputTime;

      if (elapsedSinceInput >= this.idleThresholdMs) {
        if (this.state !== FSM_STATES.ACTIVE_STILLNESS && this.state !== FSM_STATES.STILLNESS_TICK) {
          this.transitionTo(FSM_STATES.ACTIVE_STILLNESS);
        }

        // Emit tick
        this.currentStreakSeconds++;
        this.totalIdleSeconds++;
        this.onTick(this.totalIdleSeconds, this.currentStreakSeconds);
      } else if (this.state === FSM_STATES.MOVEMENT_VIOLATION && elapsedSinceInput >= 1500) {
        // Clear violation back to ACTIVE_INPUT when movement pauses
        this.transitionTo(FSM_STATES.ACTIVE_INPUT);
      }
    }

    transitionTo(newState) {
      if (this.state === newState) return;
      const oldState = this.state;
      this.state = newState;
      this.onStateChange(newState, oldState);
    }
  }

  LazyLegend.FSM_STATES = FSM_STATES;
  LazyLegend.ActivityTracker = ActivityTracker;
})();
