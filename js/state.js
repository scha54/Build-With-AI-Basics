/**
 * LazyLegend — Data Model & Persistence Layer
 * Implements: spec.md > Data Model & Persistence Layer
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  const STORAGE_KEY = 'lazylegend_state';

  const DEFAULT_STATE = {
    version: 1,
    score: 0,
    totalIdleSeconds: 0,
    longestStreak: 0,
    confessions: [],
    unlockedBadgeIds: [],
    lastActiveTimestamp: Date.now()
  };

  class StorageManager {
    static getDefaultState() {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    static isValidState(state) {
      return (
        state &&
        typeof state === 'object' &&
        state.version === 1 &&
        typeof state.score === 'number' &&
        typeof state.totalIdleSeconds === 'number' &&
        typeof state.longestStreak === 'number' &&
        Array.isArray(state.confessions) &&
        Array.isArray(state.unlockedBadgeIds)
      );
    }

    static load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return this.getDefaultState();
        }

        const parsed = JSON.parse(raw);
        if (this.isValidState(parsed)) {
          return parsed;
        } else {
          console.warn('[LazyLegend] Corrupted state schema detected; reverting to default state.');
          return this.getDefaultState();
        }
      } catch (err) {
        console.warn('[LazyLegend] Failed to read localStorage:', err);
        return this.getDefaultState();
      }
    }

    static save(state) {
      if (!this.isValidState(state)) {
        console.error('[LazyLegend] Attempted to save invalid state:', state);
        return false;
      }

      state.lastActiveTimestamp = Date.now();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return true;
      } catch (err) {
        console.warn('[LazyLegend] Failed to write localStorage:', err);
        return false;
      }
    }

    static reset() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('[LazyLegend] Failed to clear localStorage:', err);
      }
      return this.getDefaultState();
    }
  }

  LazyLegend.DEFAULT_STATE = DEFAULT_STATE;
  LazyLegend.StorageManager = StorageManager;
})();
