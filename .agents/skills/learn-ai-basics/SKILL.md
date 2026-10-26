---
name: learn-ai-basics
description: "Master coordinator and guide for the Devpost Learn 'Build With AI: Basics' hackathon curriculum. Automatically inspects devpost/ to assess progress and seamlessly routes the learner into the appropriate step: 1-start, 2-scope, 3-prd, 4-spec, 5-build, or 6-ship."
---

# Learn AI Basics — Master Curriculum Coordinator

This skill coordinates the 6-step Devpost Learn **Build With AI: Basics** curriculum in Antigravity. It guides the learner through planning before building using flipped interaction.

## Curriculum Sequence

| Step | Skill | Purpose | Key Artifact |
|---|---|---|---|
| 1 | `1-start` | Meet the learner, check workspace, configure settings | `devpost/learner-profile.md` |
| 2 | `2-scope` | Brainstorm, sharpen idea, size to a proof-of-concept | `devpost/scope.md` |
| 3 | `3-prd` | Product requirements interview (look, feel, behavior) | `devpost/prd.md` |
| 4 | `4-spec` | Technical architecture blueprint & tool decisions | `devpost/spec.md` |
| 5 | `5-build` | Step-by-step verified sliced build & learning wrap-up | `devpost/checklist.md`, App code |
| 6 | `6-ship` | Demo video preparation, GitHub repo, Devpost submission | Video, Public Repo, Submission |

## Automated Progress Assessment & Routing

Whenever this skill is triggered, inspect `devpost/` in the workspace to evaluate progress:

1. **Check `devpost/learner-profile.md`**:
   - If missing: Route immediately to **`1-start`**.
2. **Check `devpost/scope.md`**:
   - If missing or status is `draft`: Route to **`2-scope`**.
3. **Check `devpost/prd.md`**:
   - If missing or status is `draft`: Route to **`3-prd`**.
4. **Check `devpost/spec.md`**:
   - If missing or status is `draft`: Route to **`4-spec`**.
5. **Check `devpost/checklist.md`**:
   - If missing, or incomplete slices remain: Route to **`5-build`**.
6. **Check Ship Status**:
   - If build and wrap-up are complete: Route to **`6-ship`**.

State where the learner is in a single friendly sentence, and proceed directly to that skill's instructions.
