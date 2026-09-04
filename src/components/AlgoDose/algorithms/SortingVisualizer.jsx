import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import layoutStyles from "../TwoColumnLayout.module.css";
import styles from "./SortingVisualizer.module.css";

const BUBBLE_SORT_CODE = [
  "function bubbleSort(arr) {",
  "  let n = arr.length;",
  "  for (let i = 0; i < n - 1; i++) {",
  "    for (let j = 0; j < n - i - 1; j++) {",
  "      if (arr[j] > arr[j + 1]) {",
  "        // Swap adjacent elements",
  "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
  "      }",
  "    }",
  "  }",
  "  return arr;",
  "}",
];

const SELECTION_SORT_CODE = [
  "function selectionSort(arr) {",
  "  let n = arr.length;",
  "  for (let i = 0; i < n - 1; i++) {",
  "    let minIdx = i;",
  "    for (let j = i + 1; j < n; j++) {",
  "      if (arr[j] < arr[minIdx]) minIdx = j;",
  "    }",
  "    if (minIdx !== i) {",
  "      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
  "    }",
  "  }",
  "  return arr;",
  "}",
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
  const [initialArray, setInitialArray] = useState([45, 12, 85, 32, 89, 39, 69, 22]);
  const [customInput, setCustomInput] = useState("45, 12, 85, 32, 89, 39, 69, 22");

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
        explanation: `Initial array ready for Bubble Sort. Total elements: ${n}.`,
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
            statusText: "Comparing",
            statusType: "warning",
            explanation: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}). ${
              willSwap ? `${arr[j]} > ${arr[j + 1]} -> Swap required!` : `${arr[j]} <= ${arr[j + 1]} -> In correct order.`
            }`,
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
              statusType: "info",
              explanation: `Swapped positions: ${arr[j]} and ${arr[j + 1]}.`,
            });
          }
        }
        sortedIndices.add(n - i - 1);
        generated.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 4,
          statusText: "Element Sorted",
          statusType: "success",
          explanation: `Pass ${i + 1} complete. Element at index ${n - i - 1} (${arr[n - i - 1]}) is now in its final sorted position.`,
        });
      }
      sortedIndices.add(0);
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
        explanation: `Initial array ready for Selection Sort. Total elements: ${n}.`,
      });

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          const isNewMin = arr[j] < arr[minIdx];

          generated.push({
            array: [...arr],
            comparing: [j, minIdx],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 6,
            statusText: "Finding Min",
            statusType: "warning",
            explanation: `Comparing arr[${j}] (${arr[j]}) against current min arr[${minIdx}] (${arr[minIdx]}).${
              isNewMin ? ` Found new minimum element: ${arr[j]} at index ${j}!` : ""
            }`,
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
            codeLine: 9,
            statusText: "Swapped Min",
            statusType: "info",
            explanation: `Swapped minimum element ${arr[i]} into sorted position at index ${i}.`,
          });
        }

        sortedIndices.add(i);
      }
      sortedIndices.add(n - 1);
    }

    generated.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: new Set(Array.from({ length: n }, (_, i) => i)),
      comparisons,
      swaps,
      codeLine: 11,
      statusText: "Sorted!",
      statusType: "success",
      explanation: `🎉 Array is completely sorted! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    });

    return generated;
  }, [initialArray, algo]);

  const currentStep = steps[currentStepIndex] || steps[0];
  const maxVal = Math.max(...initialArray, 100);

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
    const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setInitialArray(rand);
    setCustomInput(rand.join(", "));
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = () => {
    setIsPlaying(false);
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x) && x > 0 && x <= 999);

    if (parsed.length >= 3 && parsed.length <= 15) {
      setInitialArray(parsed);
      setCustomInput(parsed.join(", "));
      setCurrentStepIndex(0);
    }
  };

  return (
    <div className={layoutStyles.twoColumnGrid}>
      <div className={layoutStyles.leftColumn}>
        {!selectedAlgoId && (
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={`${styles.modeTab} ${algo === "bubble" ? styles.modeTabActive : ""}`}
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
              className={`${styles.modeTab} ${algo === "selection" ? styles.modeTabActive : ""}`}
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
          <span className={`${styles.legendDot} ${styles.dotComparing}`}></span> Comparing
          <span className={`${styles.legendDot} ${styles.dotSwapping}`}></span> Swapping
          <span className={`${styles.legendDot} ${styles.dotSorted}`}></span> Sorted
        </div>
      </div>

      {/* Visual Canvas with Dynamic Bars */}
      <div className={styles.canvasCard}>
        <div className={styles.barsContainer}>
          {currentStep.array.map((num, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.has(idx);

            const heightPercent = Math.max(20, Math.round((num / maxVal) * 160));

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
        onRandomize={handleRandomize}
        customInput={customInput}
        onCustomInputChange={setCustomInput}
        onCustomInputSubmit={handleCustomInputSubmit}
        inputPlaceholder="e.g. 45, 12, 85, 32, 89"
      />
    </div>

    {/* Right Column: Synchronized Code & Step Explanation Panel */}
    <div className={layoutStyles.rightColumn}>
      <CodeSyncPanel
        codeLines={algo === "bubble" ? BUBBLE_SORT_CODE : SELECTION_SORT_CODE}
        activeLine={currentStep.codeLine}
        explanation={currentStep.explanation}
        statusText={currentStep.statusText}
        statusType={currentStep.statusType}
        timeComplexity="O(N²)"
        spaceComplexity="O(1)"
      />
    </div>
  </div>
);
}
