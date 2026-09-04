import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import layoutStyles from "../TwoColumnLayout.module.css";
import styles from "./TwoPointersVisualizer.module.css";

const TWO_SUM_CODE = [
  "def two_sum_sorted(arr, target):",
  "    left, right = 0, len(arr) - 1",
  "    while left < right:",
  "        curr_sum = arr[left] + arr[right]",
  "        if curr_sum == target:",
  "            return [left, right]  # Pair found!",
  "        elif curr_sum < target:",
  "            left += 1   # Need larger sum",
  "        else:",
  "            right -= 1  # Need smaller sum",
  "    return [-1, -1]  # No pair found",
];

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

export default function TwoPointersVisualizer({ selectedAlgoId = null }) {
  const [subType, setSubType] = useState(
    selectedAlgoId === "sliding_window_sum" ? "sliding_window" : "two_sum"
  );

  useEffect(() => {
    if (selectedAlgoId === "sliding_window_sum") {
      setSubType("sliding_window");
      setCurrentStepIndex(0);
    } else if (selectedAlgoId === "two_sum") {
      setSubType("two_sum");
      setCurrentStepIndex(0);
    }
  }, [selectedAlgoId]);

  const [twoSumArray, setTwoSumArray] = useState([1, 3, 4, 6, 8, 11, 15]);
  const [twoSumTarget, setTwoSumTarget] = useState(14);

  const [windowArray, setWindowArray] = useState([2, 1, 5, 1, 3, 2]);
  const [windowK, setWindowK] = useState(3);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  // Two Sum Steps
  const twoSumSteps = useMemo(() => {
    const generated = [];
    let left = 0;
    let right = twoSumArray.length - 1;

    generated.push({
      left,
      right,
      currentSum: twoSumArray[left] + twoSumArray[right],
      status: "initial",
      statusText: "Initialized",
      statusType: "info",
      codeLine: 2,
      variables: [
        { label: "left", value: `0 (val: ${twoSumArray[0]})` },
        { label: "right", value: `${right} (val: ${twoSumArray[right]})` },
        { label: "target", value: twoSumTarget },
      ],
      explanation: `Initialized pointers at both boundaries. Target sum to find: ${twoSumTarget}.`,
    });

    while (left < right) {
      const sum = twoSumArray[left] + twoSumArray[right];

      generated.push({
        left,
        right,
        currentSum: sum,
        status: "checking",
        statusText: "Checking",
        statusType: "info",
        codeLine: 4,
        variables: [
          { label: "arr[left] + arr[right]", value: `${twoSumArray[left]} + ${twoSumArray[right]} = ${sum}`, highlight: true },
          { label: "target", value: twoSumTarget },
        ],
        explanation: `Comparing current sum (${sum}) against target (${twoSumTarget}).`,
      });

      if (sum === twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "found",
          statusText: "🎯 Pair Found",
          statusType: "success",
          codeLine: 6,
          variables: [
            { label: "Pair", value: `[${left}, ${right}]`, highlight: true },
            { label: "Sum", value: `${sum} == ${twoSumTarget}`, highlight: true },
          ],
          explanation: `🎯 Target sum reached! Returning indices [${left}, ${right}].`,
        });
        return generated;
      } else if (sum < twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "move_left",
          statusText: "Advance left ➔",
          statusType: "warning",
          codeLine: 8,
          variables: [
            { label: "Sum", value: `${sum} < ${twoSumTarget}` },
            { label: "Next", value: `left = ${left + 1}`, highlight: true },
          ],
          explanation: `Sum is too small. Since array is sorted, advancing left++ increases the sum.`,
        });
        left++;
      } else {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "move_right",
          statusText: "Retract right ⬅",
          statusType: "warning",
          codeLine: 10,
          variables: [
            { label: "Sum", value: `${sum} > ${twoSumTarget}` },
            { label: "Next", value: `right = ${right - 1}`, highlight: true },
          ],
          explanation: `Sum is too large. Since array is sorted, decrementing right-- decreases the sum.`,
        });
        right--;
      }
    }

    generated.push({
      left,
      right,
      currentSum: null,
      status: "not_found",
      statusText: "Not Found",
      statusType: "danger",
      codeLine: 11,
      variables: [
        { label: "Result", value: "[-1, -1]", highlight: true },
      ],
      explanation: `❌ Pointers crossed without finding any pair summing to ${twoSumTarget}.`,
    });

    return generated;
  }, [twoSumArray, twoSumTarget]);

  // Sliding Window Steps (with true best window tracking!)
  const slidingWindowSteps = useMemo(() => {
    const generated = [];
    const k = windowK;
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
      explanation: `🏁 Finished sliding! Subarray [${windowArray
        .slice(bestStart, bestEnd + 1)
        .join(", ")}] yields the maximum sum of ${maxSum}.`,
    });

    return generated;
  }, [windowArray, windowK]);

  const activeSteps = subType === "two_sum" ? twoSumSteps : slidingWindowSteps;
  const currentStep = activeSteps[currentStepIndex] || activeSteps[0];

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < activeSteps.length - 1) {
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
  }, [isPlaying, currentStepIndex, activeSteps.length, speed]);

  const handlePlayPause = () => {
    if (currentStepIndex >= activeSteps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < activeSteps.length - 1) {
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
    if (subType === "two_sum") {
      const len = 7;
      const sorted = [];
      let val = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < len; i++) {
        sorted.push(val);
        val += Math.floor(Math.random() * 4) + 2;
      }
      setTwoSumArray(sorted);
      const i1 = Math.floor(Math.random() * 3);
      const i2 = Math.floor(Math.random() * 3) + 3;
      setTwoSumTarget(sorted[i1] + sorted[i2]);
    } else {
      const randomArr = Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 10) + 1
      );
      setWindowArray(randomArr);
    }
    setCurrentStepIndex(0);
  };

  const [customInputStr, setCustomInputStr] = useState(
    subType === "two_sum" ? twoSumArray.join(", ") : windowArray.join(", ")
  );

  useEffect(() => {
    setCustomInputStr(
      subType === "two_sum" ? twoSumArray.join(", ") : windowArray.join(", ")
    );
  }, [subType, twoSumArray, windowArray]);

  const handleCustomInputSubmit = (e) => {
    if (e) e.preventDefault();
    const parsed = customInputStr
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length >= 3) {
      setIsPlaying(false);
      if (subType === "two_sum") {
        const sorted = [...parsed].sort((a, b) => a - b);
        setTwoSumArray(sorted);
        // Automatically adjust target to something reasonable if current target is impossible
        if (twoSumTarget < sorted[0] + sorted[1]) {
          setTwoSumTarget(sorted[0] + sorted[sorted.length - 1]);
        }
      } else {
        setWindowArray(parsed);
      }
      setCurrentStepIndex(0);
    }
  };

  return (
    <div className={layoutStyles.twoColumnGrid}>
      {/* Left Column: Visualizer Canvas & Controls */}
      <div className={layoutStyles.leftColumn}>
        {/* Sub-algorithm Selector */}
        {!selectedAlgoId && (
          <div className={styles.modeTabs}>
            <button
              className={`${styles.modeTab} ${
                subType === "two_sum" ? styles.modeTabActive : ""
              }`}
              onClick={() => {
                setIsPlaying(false);
                setSubType("two_sum");
                setCurrentStepIndex(0);
              }}
            >
              ↔️ Two Sum (Sorted)
            </button>
            <button
              className={`${styles.modeTab} ${
                subType === "sliding_window" ? styles.modeTabActive : ""
              }`}
              onClick={() => {
                setIsPlaying(false);
                setSubType("sliding_window");
                setCurrentStepIndex(0);
              }}
            >
              🪟 Sliding Window (Max Sum)
            </button>
          </div>
        )}

        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
          {/* Row 1: Array Input & Randomize */}
          <form className={styles.inputRow} onSubmit={handleCustomInputSubmit}>
            <label className={styles.label}>Array:</label>
            <input
              type="text"
              className={styles.textInput}
              value={customInputStr}
              onChange={(e) => setCustomInputStr(e.target.value)}
              placeholder="e.g. 1, 3, 4, 7, 9, 11, 15"
            />
            <button type="submit" className={styles.applyBtn}>
              Apply
            </button>
            <button
              type="button"
              className={styles.randomBtn}
              onClick={handleRandomize}
              title="Generate random array"
            >
              🎲 Randomize
            </button>
          </form>

          {/* Row 2: Target Sum or Window Size K + Quick Chips */}
          {subType === "two_sum" ? (
            <div className={styles.inputRow}>
              <label className={styles.label}>Target Sum:</label>
              <input
                type="number"
                className={styles.numInput}
                value={twoSumTarget}
                onChange={(e) => {
                  setIsPlaying(false);
                  setTwoSumTarget(parseInt(e.target.value, 10) || 0);
                  setCurrentStepIndex(0);
                }}
              />
              <span className={styles.label}>Quick:</span>
              <div className={styles.quickChips}>
                {[10, 14, 17, 23].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`${styles.chip} ${
                      twoSumTarget === val ? styles.chipActive : ""
                    }`}
                    onClick={() => {
                      setIsPlaying(false);
                      setTwoSumTarget(val);
                      setCurrentStepIndex(0);
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.inputRow}>
              <label className={styles.label}>Window Size (k):</label>
              <input
                type="number"
                min="2"
                max="5"
                className={styles.numInput}
                value={windowK}
                onChange={(e) => {
                  setIsPlaying(false);
                  const val = Math.max(
                    2,
                    Math.min(5, parseInt(e.target.value, 10) || 2)
                  );
                  setWindowK(val);
                  setCurrentStepIndex(0);
                }}
              />
              <span className={styles.label}>Quick:</span>
              <div className={styles.quickChips}>
                {[2, 3, 4].map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`${styles.chip} ${
                      windowK === k ? styles.chipActive : ""
                    }`}
                    onClick={() => {
                      setIsPlaying(false);
                      setWindowK(k);
                      setCurrentStepIndex(0);
                    }}
                  >
                    k={k}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visual Canvas Card */}
        <div className={styles.canvasCard}>
          {/* Status banner with fixed height slot to avoid CLS */}
          <div className={styles.canvasStatusSlot}>
            {subType === "two_sum" ? (
              currentStep.status === "found" ? (
                <div className={styles.winningBanner}>
                  🎯 Target Pair Found: arr[{currentStep.left}] ({twoSumArray[currentStep.left]}) + arr[{currentStep.right}] ({twoSumArray[currentStep.right]}) = {twoSumTarget}
                </div>
              ) : (
                <div className={styles.activePhaseHint}>
                  <span>Current Sum:</span>
                  <strong style={{ color: "var(--ifm-color-primary)" }}>
                    {currentStep.currentSum ?? (twoSumArray[currentStep.left] + twoSumArray[currentStep.right])}
                  </strong>
                  <span>vs Target</span>
                  <strong>{twoSumTarget}</strong>
                </div>
              )
            ) : currentStep.status === "complete" ? (
              <div className={styles.winningBanner}>
                🏆 Winner: Window [{currentStep.bestStart}..{currentStep.bestEnd}] &rarr; Max Sum = {currentStep.maxSum}
              </div>
            ) : (
              <div className={styles.activePhaseHint}>
                <span>Window Sum:</span>
                <strong style={{ color: "var(--ifm-color-primary)" }}>
                  {currentStep.windowSum}
                </strong>
                <span>| Record Max:</span>
                <strong style={{ color: "#10b981" }}>{currentStep.maxSum} 🏆</strong>
              </div>
            )}
          </div>

          {subType === "two_sum" ? (
            <div className={styles.arrayWrapper}>
              {twoSumArray.map((num, idx) => {
                const isLeft = currentStep.left === idx;
                const isRight = currentStep.right === idx;
                const isFound =
                  (isLeft || isRight) && currentStep.status === "found";

                return (
                  <div key={idx} className={styles.elementColumn}>
                    {/* Top Pointer Badge */}
                    <div className={styles.pointerTopSpace}>
                      {isFound ? (
                        <span className={styles.pointerFound}>MATCH!</span>
                      ) : (
                        <>
                          {isLeft && (
                            <span
                              className={`${styles.pointerBadge} ${styles.pointerLeft}`}
                            >
                              LEFT
                            </span>
                          )}
                          {isRight && (
                            <span
                              className={`${styles.pointerBadge} ${styles.pointerRight}`}
                            >
                              RIGHT
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Element Box */}
                    <div
                      className={`
                        ${styles.elementBox}
                        ${isLeft ? styles.boxLeft : ""}
                        ${isRight ? styles.boxRight : ""}
                        ${isFound ? styles.boxFound : ""}
                      `}
                    >
                      <span>{num}</span>
                    </div>

                    {/* Index Below */}
                    <span className={styles.elementIndex}>[{idx}]</span>
                  </div>
                );
              })}
            </div>
          ) : (
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
          )}
        </div>

        {/* Player Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={handleReset}
          currentStep={currentStepIndex}
          totalSteps={activeSteps.length}
          speed={speed}
          onSpeedChange={setSpeed}
          onRandomize={handleRandomize}
          showCustomInput={false}
        />
      </div>

      {/* Right Column: Code Sync & Step Intuition */}
      <div className={layoutStyles.rightColumn}>
        <CodeSyncPanel
          codeLines={subType === "two_sum" ? TWO_SUM_CODE : SLIDING_WINDOW_CODE}
          activeLine={currentStep.codeLine}
          explanation={currentStep.explanation}
          actionTitle={currentStep.actionTitle}
          variables={currentStep.variables}
          statusText={currentStep.statusText}
          statusType={currentStep.statusType}
          timeComplexity="O(N)"
          spaceComplexity="O(1)"
          language="Python"
        />
      </div>
    </div>
  );
}
