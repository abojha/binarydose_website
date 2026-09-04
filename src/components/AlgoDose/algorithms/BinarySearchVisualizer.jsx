import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import CustomDropdown from "../CustomDropdown";
import layoutStyles from "../TwoColumnLayout.module.css";
import styles from "./BinarySearchVisualizer.module.css";

const BINARY_SEARCH_CODE = [
  "def binary_search(arr, target):",
  "    low, high = 0, len(arr) - 1",
  "    while low <= high:",
  "        mid = (low + high) // 2",
  "        if arr[mid] == target:",
  "            return mid  # Target found!",
  "        elif arr[mid] < target:",
  "            low = mid + 1   # Discard left half",
  "        else:",
  "            high = mid - 1  # Discard right half",
  "    return -1  # Target not found",
];

const LOWER_BOUND_CODE = [
  "def lower_bound(arr, target):",
  "    low, high = 0, len(arr) - 1",
  "    ans = len(arr)",
  "    while low <= high:",
  "        mid = (low + high) // 2",
  "        if arr[mid] >= target:",
  "            ans = mid  # First index >= target",
  "            high = mid - 1  # Try finding earlier occurrence",
  "        else:",
  "            low = mid + 1",
  "    return ans",
];

const PATTERN_COMPLEXITIES = {
  exact_search: { tc: "O(log N)", sc: "O(1)" },
  lower_bound: { tc: "O(log N)", sc: "O(1)" },
  upper_bound: { tc: "O(log N)", sc: "O(1)" },
  rotated_array: { tc: "O(log N)", sc: "O(1)" },
};

export default function BinarySearchVisualizer() {
  const [activePattern, setActivePattern] = useState("exact_search");
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38]);
  const [target, setTarget] = useState(23);
  const [customInput, setCustomInput] = useState(
    "2, 5, 8, 12, 16, 23, 38"
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputError, setInputError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  // Generate all binary search steps deterministically
  const steps = useMemo(() => {
    const generated = [];
    let low = 0;
    let high = array.length - 1;
    let eliminated = new Set();

    // Initial step
    generated.push({
      low,
      high,
      mid: null,
      eliminated: new Set(eliminated),
      status: "initial",
      statusText: "Ready",
      statusType: "info",
      codeLine: 2,
      variables: [
        { label: "low", value: 0 },
        { label: "high", value: high },
        { label: "target", value: target },
      ],
      explanation: `Search space initialized: indices [0..${high}]. Target: ${target}.`,
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      // Comparing step
      generated.push({
        low,
        high,
        mid,
        eliminated: new Set(eliminated),
        status: "comparing",
        statusText: "Check Mid",
        statusType: "info",
        codeLine: 4,
        variables: [
          { label: "mid", value: `${mid} (val: ${array[mid]})` },
          { label: "target", value: target },
          { label: "range", value: `[${low}..${high}]` },
        ],
        explanation: `Calculated mid = floor((${low} + ${high}) / 2) = ${mid}. Checking arr[${mid}] (${array[mid]}) vs target (${target}).`,
      });

      if (array[mid] === target) {
        // Found step
        generated.push({
          low,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "found",
          statusText: "Found! 🎯",
          statusType: "success",
          codeLine: 6,
          variables: [
            { label: "mid", value: `${mid} (MATCH)`, highlight: true },
            { label: "target", value: target, highlight: true },
            { label: "result", value: `Index ${mid}`, highlight: true },
          ],
          explanation: `🎯 Target ${target} found at index ${mid}! Returning ${mid}.`,
        });
        return generated;
      } else if (array[mid] < target) {
        // Eliminate left half
        for (let i = low; i <= mid; i++) {
          eliminated.add(i);
        }
        generated.push({
          low: mid + 1,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "eliminate_left",
          statusText: "Discard Left",
          statusType: "warning",
          codeLine: 8,
          variables: [
            { label: "arr[mid]", value: `${array[mid]} < ${target}` },
            { label: "action", value: `low = mid + 1 (${mid + 1})` },
            { label: "new range", value: `[${mid + 1}..${high}]` },
          ],
          explanation: `arr[${mid}] (${array[mid]}) < ${target}. All elements from index ${low} to ${mid} are too small. Setting low = ${mid + 1}.`,
        });
        low = mid + 1;
      } else {
        // Eliminate right half
        for (let i = mid; i <= high; i++) {
          eliminated.add(i);
        }
        generated.push({
          low,
          high: mid - 1,
          mid,
          eliminated: new Set(eliminated),
          status: "eliminate_right",
          statusText: "Discard Right",
          statusType: "warning",
          codeLine: 10,
          variables: [
            { label: "arr[mid]", value: `${array[mid]} > ${target}` },
            { label: "action", value: `high = mid - 1 (${mid - 1})` },
            { label: "new range", value: `[${low}..${mid - 1}]` },
          ],
          explanation: `arr[${mid}] (${array[mid]}) > ${target}. All elements from index ${mid} to ${high} are too large. Setting high = ${mid - 1}.`,
        });
        high = mid - 1;
      }
    }

    // Not found
    generated.push({
      low,
      high,
      mid: null,
      eliminated: new Set(eliminated),
      status: "not_found",
      statusText: "Not Found",
      statusType: "danger",
      codeLine: 11,
      variables: [
        { label: "search space", value: "exhausted (low > high)" },
        { label: "result", value: -1, highlight: true },
      ],
      explanation: `Search space exhausted (low=${low} > high=${high}). Target ${target} is not in the array. Returning -1.`,
    });

    return generated;
  }, [array, target]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    setInputError("");
    const length = 7;
    const sorted = [];
    let current = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < length; i++) {
      sorted.push(current);
      current += Math.floor(Math.random() * 8) + 2;
    }
    setArray(sorted);
    setCustomInput(sorted.join(", "));

    // 80% probability: pick a number directly from the list
    // 20% probability: pick a number NOT in the list
    let newTarget;
    if (Math.random() < 0.8) {
      newTarget = sorted[Math.floor(Math.random() * sorted.length)];
    } else {
      const midVal = sorted[Math.floor(sorted.length / 2)];
      const candidate = midVal + 1;
      newTarget = sorted.includes(candidate) ? sorted[sorted.length - 1] + 4 : candidate;
    }
    setTarget(newTarget);
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = () => {
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (parsed.length < 3) {
      setInputError("Array must contain at least 3 numbers.");
      return;
    }
    if (parsed.length > 12) {
      setInputError("Array cannot exceed 12 numbers.");
      return;
    }

    setInputError("");
    setIsPlaying(false);
    const sorted = [...parsed].sort((a, b) => a - b);
    setArray(sorted);
    setCustomInput(sorted.join(", "));
    setCurrentStepIndex(0);
  };

  return (
    <div className={layoutStyles.twoColumnGrid}>
      <div className={layoutStyles.leftColumn}>
        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
          {/* Pattern Header Row */}
          <div className={styles.patternRow}>
            <label htmlFor="bs-pattern-select" className={styles.patternLabel}>
              Pattern:
            </label>
            <div className={styles.patternSelectWrapper}>
              <CustomDropdown
                id="bs-pattern-select"
                value={activePattern}
                onChange={(val) => {
                  setActivePattern(val);
                  setIsPlaying(false);
                  setCurrentStepIndex(0);
                }}
                options={[
                  {
                    group: "Ready Patterns",
                    items: [
                      { value: "exact_search", label: "Exact Target Search", icon: "🔍" },
                    ],
                  },
                  {
                    group: "Upcoming Patterns",
                    items: [
                      { value: "lower_bound", label: "Lower Bound (First Occurrence)", icon: "📉", badge: "Coming Soon" },
                      { value: "upper_bound", label: "Upper Bound (Last Occurrence)", icon: "📈", badge: "Coming Soon" },
                      { value: "rotated_array", label: "Rotated Sorted Array Search", icon: "🔄", badge: "Coming Soon" },
                    ],
                  },
                ]}
                ariaLabel="Select Binary Search pattern"
              />
            </div>
          </div>

          {activePattern === "exact_search" ? (
            <>
              {/* Row 1: Array Input & Randomize */}
              <form
                className={styles.inputRow}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCustomInputSubmit();
                }}
              >
                <label className={styles.label}>Array:</label>
                <input
                  type="text"
                  className={styles.textInput}
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value);
                    setInputError("");
                  }}
                  placeholder="e.g. 2, 5, 8, 12, 16, 23 (3 to 12 items)"
                />
                <button type="submit" className={styles.applyBtn}>
                  Apply
                </button>
                <button
                  type="button"
                  className={styles.randomBtn}
                  onClick={() => {
                    setInputError("");
                    handleRandomize();
                  }}
                  title="Generate new random array"
                >
                  🎲 Randomize
                </button>
              </form>
              {inputError && <div className={styles.errorNotice}>⚠️ {inputError}</div>}

              {/* Row 2: Target Input & Quick Chips */}
              <div className={styles.inputRow}>
                <label htmlFor="bs-target-input" className={styles.label}>
                  Target:
                </label>
                <input
                  id="bs-target-input"
                  type="number"
                  className={styles.targetInput}
                  value={target}
                  onChange={(e) => {
                    setIsPlaying(false);
                    const val = parseInt(e.target.value, 10);
                    setTarget(isNaN(val) ? 0 : val);
                    setCurrentStepIndex(0);
                  }}
                />
                <span className={styles.label}>Quick:</span>
                <div className={styles.quickChips}>
                  {array.slice(0, 5).map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.chip} ${target === num ? styles.chipActive : ""}`}
                      onClick={() => {
                        setIsPlaying(false);
                        setTarget(num);
                        setCurrentStepIndex(0);
                      }}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`${styles.chip} ${target === 99 ? styles.chipActive : ""}`}
                    onClick={() => {
                      setIsPlaying(false);
                      setTarget(99);
                      setCurrentStepIndex(0);
                    }}
                    title="Test missing value"
                  >
                    99 ❌
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--ifm-font-color-secondary)", padding: "0.25rem 0" }}>
              💡 Switch to <strong>Exact Target Search</strong> to run live interactive binary search executions.
            </div>
          )}
        </div>

        {/* Visual Array Canvas */}
        <div className={styles.canvasCard}>
          {activePattern === "exact_search" ? (
            <>
              {/* Status banner with fixed height slot to avoid CLS */}
              <div className={styles.canvasStatusSlot}>
                {currentStep.status === "found" ? (
                  <div className={styles.winningBanner}>
                    🎯 Target Found: arr[{currentStep.mid}] = {target} (Index:{" "}
                    {currentStep.mid})
                  </div>
                ) : currentStep.status === "not_found" ? (
                  <div className={styles.notFoundBanner}>
                    ❌ Target {target} not found in array
                  </div>
                ) : (
                  <div className={styles.activePhaseHint}>
                    <span>Search Range:</span>
                    <strong>arr[{currentStep.low}..{currentStep.high}]</strong>
                    <span>| Mid:</span>
                    <strong style={{ color: "#8b5cf6" }}>[{currentStep.mid}] = {array[currentStep.mid]}</strong>
                  </div>
                )}
              </div>

              <div className={styles.arrayWrapper}>
                {array.map((num, idx) => {
                  const isMid = currentStep.mid === idx;
                  const isLow = currentStep.low === idx;
                  const isHigh = currentStep.high === idx;
                  const isEliminated = currentStep.eliminated.has(idx);
                  const isFound = isMid && currentStep.status === "found";

                  return (
                    <div key={idx} className={styles.elementColumn}>
                      {/* Pointer indicators on top */}
                      <div className={styles.pointerTopSpace}>
                        {isMid && (
                          <span
                            className={`${styles.pointerBadge} ${styles.pointerMid}`}
                          >
                            MID
                          </span>
                        )}
                      </div>

                      {/* Number Box */}
                      <div
                        className={`
                          ${styles.elementBox}
                          ${isMid ? styles.boxMid : ""}
                          ${isEliminated ? styles.boxEliminated : ""}
                          ${isFound ? styles.boxFound : ""}
                        `}
                      >
                        <span className={styles.elementValue}>{num}</span>
                      </div>

                      {/* Index & Low/High pointers below */}
                      <div className={styles.elementFooter}>
                        <span className={styles.elementIndex}>[{idx}]</span>
                        <div className={styles.pointerBottomSpace}>
                          {isLow && isHigh ? (
                            <span
                              className={`${styles.pointerBadge} ${styles.pointerBoth}`}
                            >
                              L & H
                            </span>
                          ) : (
                            <>
                              {isLow && (
                                <span
                                  className={`${styles.pointerBadge} ${styles.pointerLow}`}
                                >
                                  LOW
                                </span>
                              )}
                              {isHigh && (
                                <span
                                  className={`${styles.pointerBadge} ${styles.pointerHigh}`}
                                >
                                  HIGH
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={styles.patternComingSoon}>
              <span style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>🛠️</span>
              <div className={styles.patternComingSoonBadge}>Pattern in Active Development</div>
              <h3 style={{ margin: "0.25rem 0", fontSize: "1.25rem", color: "var(--ifm-font-color-base)" }}>
                {activePattern === "lower_bound"
                  ? "Lower Bound (First Occurrence)"
                  : activePattern === "upper_bound"
                  ? "Upper Bound (Last Occurrence)"
                  : "Rotated Sorted Array Search"}
              </h3>
              <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--ifm-font-color-secondary)", margin: "0.5rem 0 1.25rem 0", lineHeight: 1.6 }}>
                {activePattern === "lower_bound"
                  ? "Binary search boundary halving while recording the earliest index satisfying arr[mid] >= target is currently being engineered."
                  : activePattern === "upper_bound"
                  ? "Binary search boundary halving while recording the latest index satisfying arr[mid] <= target is currently being engineered."
                  : "Inflection pivot point detection combined with partitioned binary search is currently being engineered."}
              </p>
              <a
                href="/coding/binary-search"
                className={styles.patternComingSoonBtn}
              >
                <span>📖 Study Full Tutorial & Problems on CodeDose</span>
                <span>&rarr;</span>
              </a>
            </div>
          )}
        </div>

        {/* Player Controls */}
        {activePattern === "exact_search" && (
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrev={handlePrev}
            onReset={handleReset}
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            speed={speed}
            onSpeedChange={setSpeed}
            showCustomInput={false}
          />
        )}
      </div>

      {/* Right Column: Code Sync & Step Intuition */}
      <div className={layoutStyles.rightColumn}>
        <CodeSyncPanel
          codeLines={
            activePattern === "lower_bound"
              ? LOWER_BOUND_CODE
              : BINARY_SEARCH_CODE
          }
          activeLine={activePattern === "exact_search" ? currentStep.codeLine : 1}
          explanation={
            activePattern === "lower_bound"
              ? "Lower Bound: Discards right half even on match to find the very first occurrence of target."
              : currentStep.explanation
          }
          variables={activePattern === "exact_search" ? currentStep.variables : []}
          statusText={activePattern === "exact_search" ? currentStep.statusText : "Coming Soon"}
          statusType={activePattern === "exact_search" ? currentStep.statusType : "info"}
          timeComplexity={PATTERN_COMPLEXITIES[activePattern]?.tc}
          spaceComplexity={PATTERN_COMPLEXITIES[activePattern]?.sc}
        />
      </div>
    </div>
  );
}
