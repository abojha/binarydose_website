import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import CustomDropdown from "../CustomDropdown";
import CanvasStatusBanner from "../CanvasStatusBanner";
import layoutStyles from "../TwoColumnLayout.module.css";
import styles from "./SlidingWindowVisualizer.module.css";

const SLIDING_WINDOW_CODE = [
  "def max_subarray_sum(arr, k):",
  "    window_sum = sum(arr[:k])",
  "    max_sum = window_sum",
  "",
  "    for i in range(k, len(arr)):",
  "        window_sum += arr[i] - arr[i - k]  # Slide window",
  "        max_sum = max(max_sum, window_sum)",
  "",
  "    return max_sum",
];

const DYNAMIC_WINDOW_CODE = [
  "def min_subarray_len(target, nums):",
  "    left = 0",
  "    curr_sum = 0",
  "    min_len = float('inf')",
  "    for right in range(len(nums)):",
  "        curr_sum += nums[right]",
  "        while curr_sum >= target:",
  "            min_len = min(min_len, right - left + 1)",
  "            curr_sum -= nums[left]  # Shrink window",
  "            left += 1",
  "    return min_len if min_len != float('inf') else 0",
];

const LONGEST_SUBSTR_CODE = [
  "def length_of_longest_substring(s):",
  "    char_map = {}",
  "    left = 0",
  "    max_len = 0",
  "    for right, ch in enumerate(s):",
  "        if ch in char_map and char_map[ch] >= left:",
  "            left = char_map[ch] + 1  # Contract window",
  "        char_map[ch] = right",
  "        max_len = max(max_len, right - left + 1)",
  "    return max_len",
];

const PATTERN_COMPLEXITIES = {
  fixed_window: { tc: "O(N)", sc: "O(1)" },
  dynamic_window: { tc: "O(N)", sc: "O(1)" },
  longest_substr: { tc: "O(N)", sc: "O(min(N, M))" },
};

export default function SlidingWindowVisualizer() {
  const [activePattern, setActivePattern] = useState("fixed_window");

  const [windowArray, setWindowArray] = useState([2, 1, 5, 2, 8, 1, 5]);
  const [windowK, setWindowK] = useState(3);
  const [customInputStr, setCustomInputStr] = useState("2, 1, 5, 2, 8, 1, 5");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputError, setInputError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  // Generate Sliding Window Steps
  const steps = useMemo(() => {
    const generated = [];
    const k = Math.min(Math.max(1, windowK), windowArray.length);
    const n = windowArray.length;

    let initialSum = 0;
    for (let i = 0; i < k; i++) initialSum += windowArray[i];
    let maxSum = initialSum;
    let bestStart = 0;
    let bestEnd = k - 1;

    generated.push({
      windowStart: 0,
      windowEnd: k - 1,
      windowSum: initialSum,
      maxSum: initialSum,
      bestStart: 0,
      bestEnd: k - 1,
      isNewMax: true,
      status: "initial_window",
      statusText: "First Window",
      statusType: "info",
      codeLine: 2,
      variables: [
        { label: "Window", value: `[0..${k - 1}]` },
        { label: "Sum", value: initialSum, highlight: true },
        { label: "Max", value: maxSum },
      ],
      explanation: `Calculated sum of initial window [0..${k - 1}] = ${initialSum}.`,
    });

    for (let i = k; i < n; i++) {
      const added = windowArray[i];
      const removed = windowArray[i - k];
      initialSum += added - removed;
      const isNewMax = initialSum > maxSum;
      if (isNewMax) {
        maxSum = initialSum;
        bestStart = i - k + 1;
        bestEnd = i;
      }

      generated.push({
        windowStart: i - k + 1,
        windowEnd: i,
        windowSum: initialSum,
        maxSum,
        bestStart,
        bestEnd,
        isNewMax,
        status: isNewMax ? "new_max" : "slide",
        statusText: isNewMax ? "New Record!" : "Slide ➔",
        statusType: isNewMax ? "success" : "info",
        codeLine: 6,
        variables: [
          { label: "Window", value: `[${i - k + 1}..${i}]` },
          { label: "Sum", value: initialSum, highlight: isNewMax },
          { label: "Record Max", value: `${maxSum} 🏆`, highlight: isNewMax },
        ],
        explanation: isNewMax
          ? `🔥 Subtracted ${removed}, added ${added}. Window sum ${initialSum} sets a new record max!`
          : `Subtracted ${removed}, added ${added}. Window sum is ${initialSum} (max remains ${maxSum}).`,
      });
    }

    // Final Completion Step: Highlights the TRUE WINNING window!
    generated.push({
      windowStart: bestStart,
      windowEnd: bestEnd,
      windowSum: maxSum,
      maxSum,
      bestStart,
      bestEnd,
      isNewMax: false,
      status: "complete",
      statusText: "🏆 Max Window",
      statusType: "success",
      codeLine: 9,
      variables: [
        { label: "Winning Window", value: `[${bestStart}..${bestEnd}]`, highlight: true },
        { label: "Max Sum", value: `${maxSum} 🏆`, highlight: true },
        { label: "Subarray", value: `[${windowArray.slice(bestStart, bestEnd + 1).join(", ")}]` },
      ],
      explanation: `Completed array traversal! Maximum subarray sum of size ${k} is ${maxSum} in subarray [${windowArray.slice(bestStart, bestEnd + 1).join(", ")}].`,
    });

    return generated;
  }, [windowArray, windowK]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Playback timer
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
    const randomArr = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 10) + 1
    );
    setWindowArray(randomArr);
    setCustomInputStr(randomArr.join(", "));
    const newK = Math.floor(Math.random() * 3) + 2;
    setWindowK(newK);
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = (e) => {
    if (e) e.preventDefault();
    const parsed = customInputStr
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((n) => !isNaN(n));

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
    setWindowArray(parsed);
    setCustomInputStr(parsed.join(", "));
    if (windowK > parsed.length) {
      setWindowK(Math.max(1, Math.floor(parsed.length / 2)));
    }
    setCurrentStepIndex(0);
  };

  return (
    <div className={layoutStyles.twoColumnGrid}>
      {/* Left Column: Visualizer Canvas & Controls */}
      <div className={layoutStyles.leftColumn}>
        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
          {/* Pattern Header Row */}
          <div className={styles.patternRow}>
            <label htmlFor="sw-pattern-select" className={styles.patternLabel}>
              Pattern:
            </label>
            <div className={styles.patternSelectWrapper}>
              <CustomDropdown
                id="sw-pattern-select"
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
                      { value: "fixed_window", label: "Fixed Window (Max Subarray Sum)", icon: "🪟" },
                    ],
                  },
                  {
                    group: "Upcoming Patterns",
                    items: [
                      { value: "dynamic_window", label: "Dynamic Window (Min Subarray Sum)", icon: "📏", badge: "Coming Soon" },
                      { value: "longest_substr", label: "Longest Substring Without Repeating", icon: "🔤", badge: "Coming Soon" },
                    ],
                  },
                ]}
                ariaLabel="Select Sliding Window pattern"
              />
            </div>
          </div>

          {activePattern === "fixed_window" ? (
            <>
              {/* Row 1: Array Input & Randomize */}
              <form className={styles.inputRow} onSubmit={handleCustomInputSubmit}>
                <label className={styles.label}>Array:</label>
                <input
                  type="text"
                  className={styles.textInput}
                  value={customInputStr}
                  onChange={(e) => {
                    setCustomInputStr(e.target.value);
                    setInputError("");
                  }}
                  placeholder="e.g. 2, 1, 5, 1, 3, 2 (3 to 12 items)"
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
                  title="Generate random array"
                >
                  🎲 Randomize
                </button>
              </form>
              {inputError && <div className={styles.errorNotice}>⚠️ {inputError}</div>}

              {/* Row 2: Window Size (k) Configuration */}
              <div className={styles.targetRow}>
                <div className={styles.targetInputGroup}>
                  <label htmlFor="sw-k-input" className={styles.label}>
                    Window Size (k):
                  </label>
                  <input
                    id="sw-k-input"
                    type="number"
                    min="1"
                    max={windowArray.length}
                    className={styles.targetInput}
                    value={windowK}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1 && val <= windowArray.length) {
                        setWindowK(val);
                        setIsPlaying(false);
                        setCurrentStepIndex(0);
                      }
                    }}
                  />
                </div>
                <div className={styles.quickGroup}>
                  <span className={styles.label}>Quick:</span>
                  <div className={styles.quickChips}>
                    {[2, 3, 4]
                      .filter((k) => k <= windowArray.length)
                      .map((k) => (
                        <button
                          key={k}
                          type="button"
                          className={`${styles.chip} ${windowK === k ? styles.chipActive : ""}`}
                          onClick={() => {
                            setWindowK(k);
                            setIsPlaying(false);
                            setCurrentStepIndex(0);
                          }}
                        >
                          k={k}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--ifm-font-color-secondary)", padding: "0.25rem 0" }}>
              💡 Switch to <strong>Fixed Window (Max Subarray Sum)</strong> to run live interactive array executions.
            </div>
          )}
        </div>

        {/* Visual Canvas Card */}
        <div className={styles.canvasCard}>
          {activePattern === "fixed_window" ? (
            <>
              {/* Status banner with fixed height slot to avoid CLS */}
              {currentStep.status === "complete" ? (
                <CanvasStatusBanner
                  type="success"
                  icon="🏆"
                  text={`Winner: Window [${currentStep.bestStart}..${currentStep.bestEnd}] → Max Sum = ${currentStep.maxSum}`}
                  mobileText={`Winner: Win [${currentStep.bestStart}..${currentStep.bestEnd}] → Max = ${currentStep.maxSum}`}
                />
              ) : (
                <CanvasStatusBanner type="info">
                  <span>Window Sum:</span>
                  <strong style={{ color: "var(--ifm-color-primary)" }}>
                    {currentStep.windowSum}
                  </strong>
                  <span>| Record Max:</span>
                  <strong style={{ color: "#10b981" }}>{currentStep.maxSum} 🏆</strong>
                </CanvasStatusBanner>
              )}

              <div className={styles.arrayWrapper}>
                {windowArray.map((num, idx) => {
                  const isComplete = currentStep.status === "complete";
                  const inActiveWindow =
                    idx >= currentStep.windowStart && idx <= currentStep.windowEnd;
                  const inWinningWindow =
                    isComplete &&
                    idx >= currentStep.bestStart &&
                    idx <= currentStep.bestEnd;

                  return (
                    <div key={idx} className={styles.elementColumn}>
                      <div className={styles.pointerTopSpace}>
                        {isComplete ? (
                          inWinningWindow && idx === currentStep.bestStart && (
                            <span className={styles.winnerMarker}>WINNER</span>
                          )
                        ) : (
                          <>
                            {idx === currentStep.windowStart && (
                              <span className={styles.windowBorderMarker}>START</span>
                            )}
                            {idx === currentStep.windowEnd && (
                              <span className={styles.windowBorderMarker}>END</span>
                            )}
                          </>
                        )}
                      </div>

                      <div
                        className={`
                          ${styles.elementBox}
                          ${
                            inWinningWindow
                              ? styles.boxWinningWindow
                              : inActiveWindow
                              ? styles.boxInWindow
                              : styles.boxOutsideWindow
                          }
                        `}
                      >
                        <span>{num}</span>
                      </div>

                      <span className={styles.elementIndex}>[{idx}]</span>
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
                {activePattern === "dynamic_window"
                  ? "Dynamic Window (Minimum Size Subarray Sum)"
                  : "Longest Substring Without Repeating Characters"}
              </h3>
              <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--ifm-font-color-secondary)", margin: "0.5rem 0 1.25rem 0", lineHeight: 1.6 }}>
                {activePattern === "dynamic_window"
                  ? "Dynamic window expansion (advancing right pointer) and contraction (advancing left pointer while condition holds) is currently being engineered."
                  : "Hash map indexed character frequency tracking with dynamic left pointer jump contraction is currently being engineered."}
              </p>
              <a
                href="/coding/two-pointers-sliding-window-problems"
                className={styles.patternComingSoonBtn}
              >
                <span>📖 Study Full Tutorial & Problems on CodeDose</span>
                <span>&rarr;</span>
              </a>
            </div>
          )}
        </div>

        {/* Player Controls */}
        {activePattern === "fixed_window" && (
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
            activePattern === "dynamic_window"
              ? DYNAMIC_WINDOW_CODE
              : activePattern === "longest_substr"
              ? LONGEST_SUBSTR_CODE
              : SLIDING_WINDOW_CODE
          }
          activeLine={activePattern === "fixed_window" ? currentStep.codeLine : 1}
          explanation={
            activePattern === "dynamic_window"
              ? "Dynamic window: Expands right pointer until sum >= target, then contracts left pointer to find minimum subarray length."
              : activePattern === "longest_substr"
              ? "Longest Substring: Expands right pointer; when duplicate character is encountered, contracts left pointer beyond previous occurrence."
              : currentStep.explanation
          }
          variables={activePattern === "fixed_window" ? currentStep.variables : []}
          statusText={activePattern === "fixed_window" ? currentStep.statusText : "Coming Soon"}
          statusType={activePattern === "fixed_window" ? currentStep.statusType : "info"}
          timeComplexity={PATTERN_COMPLEXITIES[activePattern]?.tc}
          spaceComplexity={PATTERN_COMPLEXITIES[activePattern]?.sc}
        />
      </div>
    </div>
  );
}
