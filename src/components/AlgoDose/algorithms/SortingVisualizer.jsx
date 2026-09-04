import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import layoutStyles from "../TwoColumnLayout.module.css";
import styles from "./SortingVisualizer.module.css";

const BUBBLE_SORT_CODE = [
  "def bubble_sort(arr):",
  "    n = len(arr)",
  "    for i in range(n - 1):",
  "        for j in range(n - i - 1):",
  "            if arr[j] > arr[j + 1]:",
  "                # Swap adjacent out-of-order elements",
  "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
  "    return arr",
];

const SELECTION_SORT_CODE = [
  "def selection_sort(arr):",
  "    n = len(arr)",
  "    for i in range(n - 1):",
  "        min_idx = i",
  "        for j in range(i + 1, n):",
  "            if arr[j] < arr[min_idx]:",
  "                min_idx = j",
  "        if min_idx != i:",
  "            # Place minimum at sorted boundary",
  "            arr[i], arr[min_idx] = arr[min_idx], arr[i]",
  "    return arr",
];

export default function SortingVisualizer({ selectedAlgoId = null }) {
  const [algo, setAlgo] = useState(
    selectedAlgoId === "selection_sort" ? "selection" : "bubble"
  );

  useEffect(() => {
    if (selectedAlgoId === "selection_sort") {
      setAlgo("selection");
      setCurrentStepIndex(0);
    } else if (selectedAlgoId === "bubble_sort") {
      setAlgo("bubble");
      setCurrentStepIndex(0);
    }
  }, [selectedAlgoId]);

  const [initialArray, setInitialArray] = useState([
    45, 12, 85, 32, 89, 39, 69, 22,
  ]);
  const [customInput, setCustomInput] = useState(
    "45, 12, 85, 32, 89, 39, 69, 22"
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  // Generate sorting steps
  const steps = useMemo(() => {
    const generated = [];
    const arr = [...initialArray];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices = new Set();

    if (algo === "bubble") {
      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 2,
        statusText: "Ready",
        statusType: "info",
        variables: [
          { label: "Elements", value: n },
          { label: "Comparisons", value: 0 },
          { label: "Swaps", value: 0 },
        ],
        explanation: `Array ready for Bubble Sort. Total elements: ${n}.`,
      });

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          const willSwap = arr[j] > arr[j + 1];

          generated.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 5,
            statusText: willSwap ? "Swap Required" : "Ordered",
            statusType: willSwap ? "warning" : "info",
            variables: [
              { label: "Comparing", value: `${arr[j]} vs ${arr[j + 1]}`, highlight: willSwap },
              { label: "Swaps", value: swaps },
            ],
            explanation: willSwap
              ? `${arr[j]} > ${arr[j + 1]} ➔ Adjacent elements out of order. Swapping.`
              : `${arr[j]} <= ${arr[j + 1]} ➔ Already in non-decreasing order. No swap.`,
          });

          if (willSwap) {
            swaps++;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            generated.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: new Set(sortedIndices),
              comparisons,
              swaps,
              codeLine: 7,
              statusText: "Swapped",
              statusType: "danger",
              variables: [
                { label: "Swapped", value: `${arr[j + 1]} ↔ ${arr[j]}`, highlight: true },
                { label: "Total Swaps", value: swaps },
              ],
              explanation: `Bubbled larger element (${arr[j + 1]}) to index ${j + 1}.`,
            });
          }
        }
        sortedIndices.add(n - i - 1);
      }
      sortedIndices.add(0);

      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 8,
        statusText: "✅ Sorted",
        statusType: "success",
        variables: [
          { label: "Total Comparisons", value: comparisons },
          { label: "Total Swaps", value: swaps, highlight: true },
          { label: "Status", value: "Fully Sorted ✅", highlight: true },
        ],
        explanation: `🏁 All adjacent elements are sorted. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
      });
    } else {
      // Selection Sort
      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 2,
        statusText: "Ready",
        statusType: "info",
        variables: [
          { label: "Elements", value: n },
          { label: "Comparisons", value: 0 },
          { label: "Swaps", value: 0 },
        ],
        explanation: `Array ready for Selection Sort. Scanning for minimum in each pass.`,
      });

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        generated.push({
          array: [...arr],
          comparing: [i],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 4,
          statusText: "Set Min",
          statusType: "info",
          variables: [
            { label: "Pass", value: `${i + 1}/${n - 1}` },
            { label: "min_idx", value: `${i} (val: ${arr[i]})`, highlight: true },
          ],
          explanation: `Starting pass ${i + 1}. Initial candidate minimum at index ${i} (val: ${arr[i]}).`,
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          const isNewMin = arr[j] < arr[minIdx];

          generated.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 6,
            statusText: isNewMin ? "New Min!" : "Comparing",
            statusType: isNewMin ? "warning" : "info",
            variables: [
              { label: "arr[j]", value: arr[j] },
              { label: "min_idx", value: `${minIdx} (val: ${arr[minIdx]})`, highlight: isNewMin },
            ],
            explanation: isNewMin
              ? `🔥 Found smaller element: ${arr[j]} < ${arr[minIdx]}. Updating min_idx = ${j}.`
              : `${arr[j]} >= current minimum (${arr[minIdx]}). Moving to next element.`,
          });

          if (isNewMin) {
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;

          generated.push({
            array: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 10,
            statusText: "Swapped",
            statusType: "danger",
            variables: [
              { label: "arr[i]", value: arr[i], highlight: true },
              { label: "Total Swaps", value: swaps },
            ],
            explanation: `Placed minimum element (${arr[i]}) at sorted boundary index ${i}.`,
          });
        }
        sortedIndices.add(i);
      }
      sortedIndices.add(n - 1);

      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 11,
        statusText: "✅ Sorted",
        statusType: "success",
        variables: [
          { label: "Total Comparisons", value: comparisons },
          { label: "Total Swaps", value: swaps, highlight: true },
          { label: "Status", value: "Fully Sorted ✅", highlight: true },
        ],
        explanation: `🏁 Selection sort complete! All elements placed at sorted positions.`,
      });
    }

    return generated;
  }, [initialArray, algo]);

  const currentStep = steps[currentStepIndex] || steps[0];
  const maxVal = Math.max(...initialArray, 1);

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
    const randomArr = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 85) + 12
    );
    setInitialArray(randomArr);
    setCustomInput(randomArr.join(", "));
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = () => {
    setIsPlaying(false);
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x) && x > 0);

    if (parsed.length >= 3 && parsed.length <= 15) {
      setInitialArray(parsed);
      setCustomInput(parsed.join(", "));
      setCurrentStepIndex(0);
    }
  };

  return (
    <div className={layoutStyles.twoColumnGrid}>
      {/* Left Column: Visual Canvas & Controls */}
      <div className={layoutStyles.leftColumn}>
        {/* Sub-algorithm Selector */}
        {!selectedAlgoId && (
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={`${styles.modeTab} ${
                algo === "bubble" ? styles.modeTabActive : ""
              }`}
              onClick={() => {
                setIsPlaying(false);
                setAlgo("bubble");
                setCurrentStepIndex(0);
              }}
            >
              🫧 Bubble Sort
            </button>
            <button
              type="button"
              className={`${styles.modeTab} ${
                algo === "selection" ? styles.modeTabActive : ""
              }`}
              onClick={() => {
                setIsPlaying(false);
                setAlgo("selection");
                setCurrentStepIndex(0);
              }}
            >
              🎯 Selection Sort
            </button>
          </div>
        )}

        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
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
              placeholder="e.g. 45, 12, 85, 32, 89, 39, 69, 22"
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
        </div>

        {/* Stats Counter Bar */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Comparisons:</span>
            <span className={styles.statValue}>{currentStep.comparisons}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Swaps:</span>
            <span className={styles.statValue}>{currentStep.swaps}</span>
          </div>
          <div className={styles.legend}>
            <span className={`${styles.legendDot} ${styles.dotComparing}`}></span>{" "}
            Comparing
            <span className={`${styles.legendDot} ${styles.dotSwapping}`}></span>{" "}
            Swapping
            <span className={`${styles.legendDot} ${styles.dotSorted}`}></span>{" "}
            Sorted
          </div>
        </div>

        {/* Visual Canvas with Dynamic Bars */}
        <div className={styles.canvasCard}>
          {/* Status banner with fixed height slot to avoid CLS */}
          <div className={styles.canvasStatusSlot}>
            {currentStep.statusText.includes("Sorted") ? (
              <div className={styles.winningBanner}>
                ✅ Array Successfully Sorted! Total Comparisons:{" "}
                {currentStep.comparisons} | Swaps: {currentStep.swaps}
              </div>
            ) : (
              <div className={styles.activePhaseHint}>
                <span>Pass:</span>
                <strong>{currentStep.variables?.find((v) => v.label === "Pass")?.value || "Running"}</strong>
                <span>| Action:</span>
                <strong style={{ color: "var(--ifm-color-primary)" }}>{currentStep.statusText}</strong>
              </div>
            )}
          </div>

          <div className={styles.barsContainer}>
            {currentStep.array.map((num, idx) => {
              const isComparing = currentStep.comparing.includes(idx);
              const isSwapping = currentStep.swapping.includes(idx);
              const isSorted = currentStep.sorted.has(idx);

              const heightPercent = Math.max(
                20,
                Math.round((num / maxVal) * 160)
              );

              return (
                <div key={idx} className={styles.barColumn}>
                  <span className={styles.barValue}>{num}</span>
                  <div
                    className={`
                      ${styles.barFill}
                      ${isComparing ? styles.barComparing : ""}
                      ${isSwapping ? styles.barSwapping : ""}
                      ${isSorted ? styles.barSorted : ""}
                    `}
                    style={{ height: `${heightPercent}px` }}
                  />
                  <span className={styles.barIndex}>[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Player Controls */}
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
          codeLines={algo === "bubble" ? BUBBLE_SORT_CODE : SELECTION_SORT_CODE}
          activeLine={currentStep.codeLine}
          explanation={currentStep.explanation}
          actionTitle={currentStep.actionTitle}
          variables={currentStep.variables}
          statusText={currentStep.statusText}
          statusType={currentStep.statusType}
          timeComplexity="O(N²)"
          spaceComplexity="O(1)"
          language="Python"
        />
      </div>
    </div>
  );
}
