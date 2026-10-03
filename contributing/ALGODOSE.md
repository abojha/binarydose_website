# Contributing to AlgoDose (Interactive Visualizer Lab) 🕹️

AlgoDose is Binary Dose's proprietary interactive algorithm lab. It transforms dry, abstract computer science algorithms into step-by-step visual intuitions with real-time pointer movement, highlighted comparison boundaries, and line-by-line synchronized code execution.

This guide details the strict performance, physics, and component reuse rules for building or enhancing AlgoDose visualizers.

---

## 🏗️ Visualizer Architecture & Mandatory Reusable Components

Never reinvent base controls or canvas containers. All visualizers inside `src/components/AlgoDose/` must assemble and reuse these shared platform components:

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| **`VisualizerConfigCard`** | `src/components/AlgoDose/VisualizerConfigCard` | Array/input entry box, Apply button, 🎲 Randomize button, error alerts. |
| **`CanvasStatusBanner`** | `src/components/AlgoDose/CanvasStatusBanner` | Fixed 42px status pill bar above the canvas showing current operation state. |
| **`PatternBlueprintCard`** | `src/components/AlgoDose/PatternBlueprintCard` | Unified header card for pattern dropdown, operation selection, and complexity metrics. |
| **`PlayerControls`** | `src/components/AlgoDose/PlayerControls` | Bottom playback bar: Play/Pause, Step Forward/Backward, Speed selector, Scrubber. |
| **`CodeSyncPanel`** | `src/components/AlgoDose/CodeSyncPanel` | Right-side column with synchronized code highlighting, Step Intuition prose, and live variables. |

---

## ⚡ Strict Performance & Responsive Rules

1. **Global Input Cap (Max 7 Items)**:
   * Arrays, Linked Lists, and Sorting inputs are strictly capped at **7 elements** (`MAX_CAP = 7`, `MIN_CAP = 3`).
   * **Why**: On mobile screens (360px–375px), 7 elements fit cleanly with 0 horizontal scrolling, 0 clipped edges, and readable typography.
   * If a user attempts to enter more than 7 items, display an error alert via `VisualizerConfigCard`'s `error` prop: `"Please enter between 3 and 7 numbers."`
2. **Fluctuating Length on Randomize**:
   * When the user clicks the 🎲 **Randomize** button, do NOT generate a fixed length every time. The length must dynamically fluctuate between `MIN_CAP` and `MAX_CAP`:
     ```javascript
     const length = MIN_CAP + Math.floor(Math.random() * (MAX_CAP - MIN_CAP + 1));
     ```
3. **Zero Cumulative Layout Shift (CLS)**:
   * The canvas container must maintain a fixed or bounded aspect ratio so stepping through states never causes the page to jump or reflow.
4. **State-Driven Snapshot Playback**:
   * Visualizer engines precompute an array of `ExecutionStep` snapshots:
     ```typescript
     interface ExecutionStep {
       stepIndex: number;
       codeLine: number;
       statusText: string;
       arrayState: number[];
       activePointers: { left?: number; right?: number; pivot?: number };
       comparedIndices: number[];
       swappedIndices: number[];
       variables: Record<string, any>;
     }
     ```
   * The UI simply renders `history[currentStep]`. This guarantees instant, deterministic backward and forward stepping with zero calculation lag.

---

## ✅ Pre-Submission Verification Checklist

Before opening a Pull Request for an AlgoDose visualizer, verify:

- [ ] All animations are powered by pure React state or CSS transforms — never raw DOM manipulation (`document.getElementById`).
- [ ] Input cap adheres strictly to **7 items maximum** and **3 items minimum**.
- [ ] Randomize button produces fluctuating lengths (not a fixed count every time).
- [ ] Reuses platform components: `VisualizerConfigCard`, `PlayerControls`, `CodeSyncPanel`, `CanvasStatusBanner`.
- [ ] Zero horizontal scrolling on mobile (360px–375px viewport).
- [ ] Zero Cumulative Layout Shift (CLS) when stepping through execution states.
- [ ] Dark mode renders correctly — no hardcoded colors that break with `[data-theme='dark']`.
- [ ] Execution steps are precomputed as an array of snapshots (forward and backward stepping must be instant, deterministic, and lag-free).
- [ ] Runs cleanly on `npm run start` with zero console errors.

