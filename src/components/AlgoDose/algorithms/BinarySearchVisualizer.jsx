import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import styles from "./BinarySearchVisualizer.module.css";

const BINARY_SEARCH_CODE = [
  "function binarySearch(arr, target) {",
  "  let low = 0, high = arr.length - 1;",
  "  while (low <= high) {",
  "    let mid = Math.floor((low + high) / 2);",
  "    if (arr[mid] === target) {",
  "      return mid; // Found!",
  "    } else if (arr[mid] < target) {",
  "      low = mid + 1; // Search right half",
  "    } else {",
  "      high = mid - 1; // Search left half",
  "    }",
  "  }",
  "  return -1; // Not found",
  "}",
];

export default function BinarySearchVisualizer() {
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 72]);
  const [target, setTarget] = useState(23);
  const [customInput, setCustomInput] = useState("2, 5, 8, 12, 16, 23, 38, 45, 56, 72");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
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
      explanation: `Initialized low = 0, high = ${high}. Target to find: ${target}.`,
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
        statusText: "Comparing",
        statusType: "info",
        codeLine: 4,
        explanation: `Calculated mid index = Math.floor((${low} + ${high}) / 2) = ${mid}. Inspecting element arr[${mid}] = ${array[mid]}.`,
      });

      if (array[mid] === target) {
        generated.push({
          low,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "found",
          statusText: "Found!",
          statusType: "success",
          codeLine: 6,
          explanation: `🎯 Match found! arr[${mid}] == ${target} at index ${mid}. Search complete!`,
        });
        return generated;
      } else if (array[mid] < target) {
        // Discard left half
        for (let i = low; i <= mid; i++) {
          eliminated.add(i);
        }
        generated.push({
          low,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "discard_left",
          statusText: "Eliminate Left",
          statusType: "warning",
          codeLine: 8,
          explanation: `arr[${mid}] (${array[mid]}) < ${target}. Since array is sorted, all elements from index ${low} to ${mid} are smaller. Discarding left half and setting low = ${mid + 1}.`,
        });
        low = mid + 1;
      } else {
        // Discard right half
        for (let i = mid; i <= high; i++) {
          eliminated.add(i);
        }
        generated.push({
          low,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "discard_right",
          statusText: "Eliminate Right",
          statusType: "warning",
          codeLine: 10,
          explanation: `arr[${mid}] (${array[mid]}) > ${target}. Since array is sorted, all elements from index ${mid} to ${high} are larger. Discarding right half and setting high = ${mid - 1}.`,
        });
        high = mid - 1;
      }
    }

    // Not found step
    generated.push({
      low,
      high,
      mid: null,
      eliminated: new Set(eliminated),
      status: "not_found",
      statusText: "Not Found",
      statusType: "danger",
      codeLine: 13,
      explanation: `❌ low (${low}) > high (${high}). Search interval is empty. Target ${target} does not exist in this array.`,
    });

    return generated;
  }, [array, target]);

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
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
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
    const length = 10;
    const set = new Set();
    while (set.size < length) {
      set.add(Math.floor(Math.random() * 90) + 5);
    }
    const sorted = Array.from(set).sort((a, b) => a - b);
    setArray(sorted);
    setCustomInput(sorted.join(", "));
    // Pick a random target (either present or absent)
    const randomPick = Math.random() > 0.3 ? sorted[Math.floor(Math.random() * sorted.length)] : 99;
    setTarget(randomPick);
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = () => {
    setIsPlaying(false);
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (parsed.length >= 3) {
      const sorted = Array.from(new Set(parsed)).sort((a, b) => a - b);
      setArray(sorted);
      setCustomInput(sorted.join(", "));
      if (!sorted.includes(target)) {
        setTarget(sorted[Math.floor(sorted.length / 2)]);
      }
      setCurrentStepIndex(0);
    }
  };

  return (
    <div className={styles.container}>
      {/* Target Selector Bar */}
      <div className={styles.targetBar}>
        <div className={styles.targetInputGroup}>
          <label htmlFor="bs-target-input" className={styles.targetLabel}>
            🎯 Target to Search:
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
        </div>

        {/* Quick Pick Target Chips */}
        <div className={styles.quickChips}>
          <span className={styles.chipsLabel}>Quick picks:</span>
          {array.slice(0, 4).map((num) => (
            <button
              key={num}
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
          >
            99 (Not Present)
          </button>
        </div>
      </div>

      {/* Visual Array Canvas */}
      <div className={styles.canvasCard}>
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
                    <span className={`${styles.pointerBadge} ${styles.pointerMid}`}>
                      mid
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
                    {isLow && (
                      <span className={`${styles.pointerBadge} ${styles.pointerLow}`}>
                        low
                      </span>
                    )}
                    {isHigh && (
                      <span className={`${styles.pointerBadge} ${styles.pointerHigh}`}>
                        high
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Player Controls */}
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
        onRandomize={handleRandomize}
        customInput={customInput}
        onCustomInputChange={setCustomInput}
        onCustomInputSubmit={handleCustomInputSubmit}
        inputPlaceholder="Enter comma-separated sorted numbers"
      />

      {/* Synchronized Code & Step Explanation Panel */}
      <CodeSyncPanel
        codeLines={BINARY_SEARCH_CODE}
        activeLine={currentStep.codeLine}
        explanation={currentStep.explanation}
        statusText={currentStep.statusText}
        statusType={currentStep.statusType}
        timeComplexity="O(log N)"
        spaceComplexity="O(1)"
      />
    </div>
  );
}
