/**
 * LazyLegend — Slacker Certificate & Clipboard Export
 * Implements: spec.md > Components > SlackerCertificateComponent
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  function formatDuration(totalSeconds) {
    if (!totalSeconds) return "0s";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  function generateCertificateText(state) {
    const s = state || {};
    const score = s.score || 0;
    let rank = "Novice Procrastinator";
    if (score >= 500) rank = "Supreme Couch Commander";
    else if (score >= 250) rank = "Senior Slacker";
    else if (score >= 100) rank = "Intermediate Postponist";

    const totalIdle = formatDuration(s.totalIdleSeconds || 0);
    const longestStreak = formatDuration(s.longestStreak || 0);
    
    let latestConfession = "Preserving baseline metabolic efficiency";
    if (s.confessions && s.confessions.length > 0) {
      latestConfession = s.confessions[s.confessions.length - 1].text;
    }

    const badgesCount = (s.unlockedBadgeIds && s.unlockedBadgeIds.length) || 0;

    return [
      "🦥 OFFICIAL SLACKER AUDIT REPORT 🦥",
      "----------------------------------------",
      "Candidate: Certified Slacker",
      `Status: ${rank.toUpperCase()}`,
      `Laziness Score: ${score} pts`,
      `Total Idle Time: ${totalIdle}`,
      `Longest Inaction Streak: ${longestStreak}`,
      `Chore Avoided: "${latestConfession}"`,
      `Badges Earned: ${badgesCount} / 4`,
      "----------------------------------------",
      "Verified by: LazyLegend Corporate Bureau of Inaction"
    ].join("\n");
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn("[LazyLegend] navigator.clipboard failed, attempting fallback:", err);
      }
    }

    // Fallback using temporary textarea
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      return success;
    } catch (fallbackErr) {
      console.error("[LazyLegend] Clipboard fallback failed:", fallbackErr);
      return false;
    }
  }

  LazyLegend.generateCertificateText = generateCertificateText;
  LazyLegend.copyToClipboard = copyToClipboard;
})();
