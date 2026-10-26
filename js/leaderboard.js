/**
 * LazyLegend — Mock Enterprise Leaderboard
 * Implements: spec.md > Components > ColleagueLeaderboardComponent
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  const MOCK_COLLEAGUES = [
    {
      id: 'sarah',
      name: 'Sarah Jenkins',
      title: 'VP of Postponing',
      score: 1240,
      activity: 'Napping through Q3 planning'
    },
    {
      id: 'dave',
      name: 'Dave Miller',
      title: 'Senior Idle Architect',
      score: 980,
      activity: 'Canceled zoom call to take a nap'
    },
    {
      id: 'alex',
      name: 'Alex Rivera',
      title: 'Lead Excuse Officer',
      score: 340,
      activity: 'Staring out window for inspiration'
    },
    {
      id: 'morgan',
      name: 'Morgan Chen',
      title: 'Junior Procrastinator',
      score: 110,
      activity: 'Left boss on "Read" for 4 hours'
    }
  ];

  class LeaderboardManager {
    static getRankings(state) {
      const s = state || {};
      const userScore = s.score || 0;
      
      let userActivity = 'Achieving absolute zero exertion';
      if (s.confessions && s.confessions.length > 0) {
        userActivity = s.confessions[s.confessions.length - 1].text;
      }

      const currentUser = {
        id: 'current_user',
        name: 'You (Certified Slacker)',
        title: 'Executive Sloth',
        score: userScore,
        activity: userActivity,
        isCurrentUser: true
      };

      const all = [...MOCK_COLLEAGUES, currentUser];
      all.sort((a, b) => b.score - a.score);

      return all.map((entry, idx) => ({
        ...entry,
        rank: idx + 1
      }));
    }

    static getUserStanding(state) {
      const rankings = this.getRankings(state);
      const user = rankings.find(r => r.isCurrentUser);
      return user ? user.rank : rankings.length;
    }
  }

  LazyLegend.MOCK_COLLEAGUES = MOCK_COLLEAGUES;
  LazyLegend.LeaderboardManager = LeaderboardManager;
})();
