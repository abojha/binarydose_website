import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
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

export default function BinarySearchVisualizer() {
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 72]);
  const [target, setTarget] = useState(23);
  const [customInput, setCustomInput] = useState(
    "2, 5, 8, 12, 16, 23, 38, 45, 56, 72"
  );
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
        statusText: "Inspect Mid",
        statusType: "info",
        codeLine: 4,
        variables: [
          { label: "low", value: low },
          { label: "mid", value: `${mid} (val: ${array[mid]})`, highlight: true },
          { label: "high", value: high },
        ],
        explanation: `Checking middle element arr[${mid}] = ${array[mid]} against target ${target}.`,
      });

      if (array[mid] === target) {
        generated.push({
          low,
          high,
          mid,
          eliminated: new Set(eliminated),
          status: "found",
          statusText: "🎯 Found!",
          statusType: "success",
          codeLine: 6,
          variables: [
            { label: "Index", value: mid, highlight: true },
            { label: "Value", value: `${array[mid]} == ${target}`, highlight: true },
          ],
          explanation: `🎯 Target found! arr[${mid}] equals ${target}. Returning index ${mid}.`,
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
          variables: [
            { label: "arr[mid]", value: `${array[mid]} < ${target}` },
            { label: "New low", value: mid + 1, highlight: true },
          ],
          explanation: `Target is larger than arr[${mid}]. Discarding left half; searching right (low = ${mid + 1}).`,
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
          variables: [
            { label: "arr[mid]", value: `${array[mid]} > ${target}` },
            { label: "New high", value: mid - 1, highlight: true },
          ],
          explanation: `Target is smaller than arr[${mid}]. Discarding right half; searching left (high = ${mid - 1}).`,
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
        { label: "Result", value: "-1 (Not Found)", highlight: true },
      ],
      explanation: `❌ Search boundary crossed (low > high). Target ${target} does not exist in array.`,
    });

    return generated;
  }, [array, target]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer
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
    const len = 9;
    const sorted = [];
    let val = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < len; i++) {
      sorted.push(val);
      val += Math.floor(Math.random() * 8) + 2;
    }
    setArray(sorted);
    setCustomInput(sorted.join(", "));
    const randomPick =
      Math.random() > 0.25
        ? sorted[Math.floor(Math.random() * sorted.length)]
        : 99;
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
    <div className={layoutStyles.twoColumnGrid}>
      <div className={layoutStyles.leftColumn}>
        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
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
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 2, 5, 8, 12, 16, 23, 38, 45"
            />
            <button type="submit" className={styles.applyBtn}>
              Apply
            </button>
            <button
              type="button"
              className={styles.randomBtn}
              onClick={handleRandomize}
              title="Generate new random array"
            >
              🎲 Randomize
            </button>
          </form>

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
              {array.slice(0, 4).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`${styles.chip} ${
                    target === num ? styles.chipActive : ""
                  }`}
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
                className={`${styles.chip} ${
                  target === 99 ? styles.chipActive : ""
                }`}
                onClick={() => {
                  setIsPlaying(false);
                  setTarget(99);
                  setCurrentStepIndex(0);
                }}
              >
                99 (Not Found)
              </button>
            </div>
          </div>
        </div>

        {/* Visual Array Canvas */}
        <div className={styles.canvasCard}>
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
          showCustomInput={false}
        />
      </div>

      {/* Right Column: Synchronized Code & Step Explanation Panel */}
      <div className={layoutStyles.rightColumn}>
        <CodeSyncPanel
          codeLines={BINARY_SEARCH_CODE}
          activeLine={currentStep.codeLine}
          explanation={currentStep.explanation}
          actionTitle={currentStep.actionTitle}
          variables={currentStep.variables}
          statusText={currentStep.statusText}
          statusType={currentStep.statusType}
          timeComplexity="O(log N)"
          spaceComplexity="O(1)"
          language="Python"
        />
      </div>
    </div>
  );
}
