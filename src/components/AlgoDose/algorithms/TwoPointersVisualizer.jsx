import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import styles from "./TwoPointersVisualizer.module.css";

const TWO_SUM_CODE = [
  "function twoSumSorted(arr, target) {",
  "  let left = 0, right = arr.length - 1;",
  "  while (left < right) {",
  "    let currentSum = arr[left] + arr[right];",
  "    if (currentSum === target) {",
  "      return [left, right]; // Found pair!",
  "    } else if (currentSum < target) {",
  "      left++; // Need a larger sum",
  "    } else {",
  "      right--; // Need a smaller sum",
  "    }",
  "  }",
  "  return [-1, -1]; // No pair found",
  "}",
];

const SLIDING_WINDOW_CODE = [
  "function maxSubarraySum(arr, k) {",
  "  let windowSum = 0, maxSum = 0;",
  "  for (let i = 0; i < k; i++) windowSum += arr[i];",
  "  maxSum = windowSum;",
  "  for (let i = k; i < arr.length; i++) {",
  "    windowSum += arr[i] - arr[i - k]; // Slide window",
  "    maxSum = Math.max(maxSum, windowSum);",
  "  }",
  "  return maxSum;",
  "}",
];

export default function TwoPointersVisualizer() {
  const [subType, setSubType] = useState("two_sum"); // "two_sum" | "sliding_window"
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
      explanation: `Initialized left = 0 (val: ${twoSumArray[0]}), right = ${right} (val: ${twoSumArray[right]}). Target sum: ${twoSumTarget}.`,
    });

    while (left < right) {
      const sum = twoSumArray[left] + twoSumArray[right];

      generated.push({
        left,
        right,
        currentSum: sum,
        status: "checking",
        statusText: "Checking Sum",
        statusType: "info",
        codeLine: 4,
        explanation: `Comparing arr[left] (${twoSumArray[left]}) + arr[right] (${twoSumArray[right]}) = ${sum} against target (${twoSumTarget}).`,
      });

      if (sum === twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "found",
          statusText: "Pair Found!",
          statusType: "success",
          codeLine: 6,
          explanation: `🎯 Target sum found! arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${twoSumTarget}. Indices [${left}, ${right}].`,
        });
        return generated;
      } else if (sum < twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "move_left",
          statusText: "Move Left ➔",
          statusType: "warning",
          codeLine: 8,
          explanation: `Current sum ${sum} < target ${twoSumTarget}. Since array is sorted, moving left pointer (left++) to get a larger sum.`,
        });
        left++;
      } else {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "move_right",
          statusText: "Move Right ⬅",
          statusType: "warning",
          codeLine: 10,
          explanation: `Current sum ${sum} > target ${twoSumTarget}. Since array is sorted, moving right pointer (right--) to get a smaller sum.`,
        });
        right--;
      }
    }

    generated.push({
      left,
      right,
      currentSum: null,
      status: "not_found",
      statusText: "No Pair Found",
      statusType: "danger",
      codeLine: 13,
      explanation: `❌ left pointer crossed right pointer. No two numbers in this array sum to ${twoSumTarget}.`,
    });

    return generated;
  }, [twoSumArray, twoSumTarget]);

  // Sliding Window Steps
  const slidingWindowSteps = useMemo(() => {
    const generated = [];
    const k = windowK;
    const n = windowArray.length;

    let initialSum = 0;
    for (let i = 0; i < k; i++) initialSum += windowArray[i];
    let maxSum = initialSum;

    generated.push({
      windowStart: 0,
      windowEnd: k - 1,
      windowSum: initialSum,
      maxSum: initialSum,
      status: "initial_window",
      statusText: "First Window",
      statusType: "info",
      codeLine: 3,
      explanation: `Built initial window of size ${k} (indices 0 to ${k - 1}). Current sum: ${initialSum}. Max sum so far: ${maxSum}.`,
    });

    for (let i = k; i < n; i++) {
      const added = windowArray[i];
      const removed = windowArray[i - k];
      initialSum += added - removed;
      const isNewMax = initialSum > maxSum;
      maxSum = Math.max(maxSum, initialSum);

      generated.push({
        windowStart: i - k + 1,
        windowEnd: i,
        windowSum: initialSum,
        maxSum,
        status: isNewMax ? "new_max" : "slide",
        statusText: isNewMax ? "New Max Sum!" : "Sliding Window",
        statusType: isNewMax ? "success" : "info",
        codeLine: 6,
        explanation: `Slid window ➔: Subtracted arr[${i - k}] (${removed}) and added arr[${i}] (${added}). Window sum = ${initialSum}.${
          isNewMax ? ` 🔥 New Maximum Sum: ${maxSum}!` : ` Max sum remains ${maxSum}.`
        }`,
      });
    }

    generated.push({
      windowStart: n - k,
      windowEnd: n - 1,
      windowSum: initialSum,
      maxSum,
      status: "complete",
      statusText: "Finished",
      statusType: "success",
      codeLine: 9,
      explanation: `🏁 Finished sliding across entire array. Maximum subarray sum of size ${k} is ${maxSum}!`,
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
    setIsPlaying(false);
    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
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
      const length = 7;
      const set = new Set();
      while (set.size < length) {
        set.add(Math.floor(Math.random() * 30) + 1);
      }
      const sorted = Array.from(set).sort((a, b) => a - b);
      setTwoSumArray(sorted);
      // Pick target as a real sum of two random items
      const i1 = Math.floor(Math.random() * (length - 1));
      const i2 = i1 + 1 + Math.floor(Math.random() * (length - 1 - i1));
      setTwoSumTarget(sorted[i1] + sorted[i2]);
    } else {
      const rand = Array.from({ length: 7 }, () => Math.floor(Math.random() * 15) + 1);
      setWindowArray(rand);
    }
    setCurrentStepIndex(0);
  };

  return (
    <div className={styles.container}>
      {/* Sub-algorithm Mode Tabs */}
      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeTab} ${
            subType === "two_sum" ? styles.modeTabActive : ""
          }`}
          onClick={() => {
            setIsPlaying(false);
            setSubType("two_sum");
            setCurrentStepIndex(0);
          }}
        >
          ↔️ Two Sum (Sorted Array)
        </button>
        <button
          type="button"
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

      {/* Mode Controls Bar */}
      {subType === "two_sum" ? (
        <div className={styles.controlHeader}>
          <div className={styles.inputGroup}>
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
          </div>
          {currentStep.currentSum !== undefined && currentStep.currentSum !== null && (
            <div className={styles.sumBadge}>
              Current Sum: <strong>{currentStep.currentSum}</strong> (vs Target {twoSumTarget})
            </div>
          )}
        </div>
      ) : (
        <div className={styles.controlHeader}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Window Size (k):</label>
            <input
              type="number"
              min="2"
              max="5"
              className={styles.numInput}
              value={windowK}
              onChange={(e) => {
                setIsPlaying(false);
                const val = Math.max(2, Math.min(5, parseInt(e.target.value, 10) || 2));
                setWindowK(val);
                setCurrentStepIndex(0);
              }}
            />
          </div>
          <div className={styles.sumBadge}>
            Window Sum: <strong>{currentStep.windowSum}</strong> | Max Sum:{" "}
            <strong style={{ color: "#10b981" }}>{currentStep.maxSum}</strong>
          </div>
        </div>
      )}

      {/* Visual Canvas */}
      <div className={styles.canvasCard}>
        {subType === "two_sum" ? (
          <div className={styles.arrayWrapper}>
            {twoSumArray.map((num, idx) => {
              const isLeft = currentStep.left === idx;
              const isRight = currentStep.right === idx;
              const isFound = (isLeft || isRight) && currentStep.status === "found";

              return (
                <div key={idx} className={styles.elementColumn}>
                  {/* Top Pointer Badge */}
                  <div className={styles.pointerTopSpace}>
                    {isLeft && (
                      <span className={`${styles.pointerBadge} ${styles.pointerLeft}`}>
                        L ({num})
                      </span>
                    )}
                    {isRight && (
                      <span className={`${styles.pointerBadge} ${styles.pointerRight}`}>
                        R ({num})
                      </span>
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
              const inWindow =
                idx >= currentStep.windowStart && idx <= currentStep.windowEnd;

              return (
                <div key={idx} className={styles.elementColumn}>
                  <div className={styles.pointerTopSpace}>
                    {idx === currentStep.windowStart && (
                      <span className={styles.windowBorderMarker}>start</span>
                    )}
                    {idx === currentStep.windowEnd && (
                      <span className={styles.windowBorderMarker}>end</span>
                    )}
                  </div>

                  <div
                    className={`
                      ${styles.elementBox}
                      ${inWindow ? styles.boxInWindow : styles.boxOutsideWindow}
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

      {/* Synchronized Code & Step Explanation Panel */}
      <CodeSyncPanel
        codeLines={subType === "two_sum" ? TWO_SUM_CODE : SLIDING_WINDOW_CODE}
        activeLine={currentStep.codeLine}
        explanation={currentStep.explanation}
        statusText={currentStep.statusText}
        statusType={currentStep.statusType}
        timeComplexity={subType === "two_sum" ? "O(N)" : "O(N)"}
        spaceComplexity="O(1)"
      />
    </div>
  );
}
