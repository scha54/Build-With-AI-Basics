/**
 * LazyLegend — Corporate Excuse Library
 * Implements: spec.md > Components > ProcrastinationConfessionalComponent
 */
(function() {
  window.LazyLegend = window.LazyLegend || {};
  const LazyLegend = window.LazyLegend;

  const EXCUSES = [
    "Awaiting stakeholder alignment on my nap schedule.",
    "Conducting an asynchronous mental audit of the ceiling fan.",
    "Refactoring my motivation in staging before pushing to production.",
    "Debugging my attention span; encountered unexpected NullPointerException.",
    "Synthesizing synergies around the concept of doing literally nothing.",
    "Blocked by internal organizational inertia.",
    "Taking a strategic pause to avoid dangerously outperforming expectations.",
    "Benchmarking horizontal posture efficiency on the sofa.",
    "Reorganizing my desktop icons by chromatic vibration frequency.",
    "Currently stuck in an indefinite queue for personal initiative.",
    "Deferred to Q5 pending executive inertia sign-off.",
    "Running an offline exploratory brainstorm with my eyes closed.",
    "Waiting for the coffee to manifest into actionable deliverables.",
    "Preserving enterprise battery life by minimizing cranial CPU utilization.",
    "Drafting an apology memo explaining why this email could have been total silence.",
    "Conducting market research on the optimal blanket-to-body temperature ratio.",
    "Observing the cosmic expansion of unread notification badges.",
    "Awaiting cross-functional buy-in to open this spreadsheet."
  ];

  let lastIndex = -1;

  function getRandomExcuse() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * EXCUSES.length);
    } while (newIndex === lastIndex && EXCUSES.length > 1);
    
    lastIndex = newIndex;
    return EXCUSES[newIndex];
  }

  LazyLegend.EXCUSES = EXCUSES;
  LazyLegend.getRandomExcuse = getRandomExcuse;
})();
