/**
 * LazyLegend — Badge Manager & Milestone Accolades
 * Implements: spec.md > Components > BadgeManagerComponent
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  const BADGES = [
    {
      id: 'speed_overrated',
      name: 'Speed Is Overrated',
      icon: '🐢',
      description: 'Remain idle for 30 consecutive seconds.',
      check: (state) => (state.longestStreak >= 30)
    },
    {
      id: 'tomorrows_problem',
      name: "Tomorrow's Problem",
      icon: '🛋️',
      description: 'Confess your first avoided chore or excuse.',
      check: (state) => (state.confessions && state.confessions.length >= 1)
    },
    {
      id: 'master_delegation',
      name: 'Master of Delegation',
      icon: '📋',
      description: 'Log at least 3 avoided chores or excuses.',
      check: (state) => (state.confessions && state.confessions.length >= 3)
    },
    {
      id: 'couch_commander',
      name: 'Supreme Couch Commander',
      icon: '👑',
      description: 'Reach 500 total Laziness Points.',
      check: (state) => (state.score >= 500)
    }
  ];

  class BadgeManager {
    static getBadges() {
      return BADGES;
    }

    static evaluate(state) {
      if (!state || !Array.isArray(state.unlockedBadgeIds)) return [];

      const newlyUnlocked = [];

      for (const badge of BADGES) {
        if (!state.unlockedBadgeIds.includes(badge.id)) {
          if (badge.check(state)) {
            state.unlockedBadgeIds.push(badge.id);
            newlyUnlocked.push(badge);
          }
        }
      }

      return newlyUnlocked;
    }

    static isUnlocked(badgeId, state) {
      return state && state.unlockedBadgeIds && state.unlockedBadgeIds.includes(badgeId);
    }
  }

  LazyLegend.BADGES = BADGES;
  LazyLegend.BadgeManager = BadgeManager;
})();
