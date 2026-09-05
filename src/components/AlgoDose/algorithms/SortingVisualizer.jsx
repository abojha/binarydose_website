import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import CustomDropdown from "../CustomDropdown";
import CanvasStatusBanner from "../CanvasStatusBanner";
import PatternBlueprintCard from "../PatternBlueprintCard";
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

const INSERTION_SORT_CODE = [
  "def insertion_sort(arr):",
  "    for i in range(1, len(arr)):",
  "        key = arr[i]",
  "        j = i - 1",
  "        while j >= 0 and arr[j] > key:",
  "            arr[j + 1] = arr[j]  # Shift element right",
  "            j -= 1",
  "        arr[j + 1] = key  # Insert into sorted partition",
  "    return arr",
];

const QUICKSORT_CODE = [
  "def partition(arr, low, high):",
  "    pivot = arr[high]",
  "    i = low - 1",
  "    for j in range(low, high):",
  "        if arr[j] < pivot:",
  "            i += 1",
  "            arr[i], arr[j] = arr[j], arr[i]",
  "    arr[i + 1], arr[high] = arr[high], arr[i + 1]",
  "    return i + 1",
];

const PATTERN_COMPLEXITIES = {
  bubble: { tc: "O(N²)", sc: "O(1)" },
  selection: { tc: "O(N²)", sc: "O(1)" },
  insertion: { tc: "O(N²)", sc: "O(1)" },
  quicksort: { tc: "O(N log N)", sc: "O(log N)" },
  mergesort: { tc: "O(N log N)", sc: "O(N)" },
};

const SORTING_PATTERN_OPTIONS = [
  {
    group: "Ready Patterns",
    items: [
      { value: "bubble", label: "Bubble Sort (Adjacent Swaps)", icon: "🫧" },
      { value: "selection", label: "Selection Sort (Min Boundary Placement)", icon: "🎯" },
    ],
  },
  {
    group: "Upcoming Patterns",
    items: [
      { value: "insertion", label: "Insertion Sort (Sorted Partition Shift)", icon: "📥", badge: "Coming Soon" },
      { value: "quicksort", label: "QuickSort (Lomuto Partition)", icon: "⚡", badge: "Coming Soon" },
      { value: "mergesort", label: "Merge Sort (Divide & Conquer)", icon: "🔀", badge: "Coming Soon" },
    ],
  },
];

const SORTING_BLUEPRINTS = {
  bubble: {
    id: "bubble",
    name: "Bubble Sort (Adjacent Swaps)",
    icon: "🫧",
    problem: "Order elements in non-decreasing sequence through sequential adjacent pairwise comparisons.",
    whenToUse: "Educational baseline for swap mechanics; detects already-sorted arrays early in O(N).",
    mechanics: "Iterate through array comparing neighbors arr[j] > arr[j+1]. Swap out-of-order pairs to bubble maximum rightward.",
  },
  selection: {
    id: "selection",
    name: "Selection Sort (Min Boundary Placement)",
    icon: "🎯",
    problem: "Sort array by repeatedly finding the absolute minimum element from the unsorted segment.",
    whenToUse: "When memory writes (swaps) are expensive and need to be strictly bounded to O(N).",
    mechanics: "Maintain sorted prefix boundary. Scan unsorted suffix to find minimum, then swap once per outer pass.",
  },
  insertion: {
    id: "insertion",
    name: "Insertion Sort (Sorted Partition Shift)",
    icon: "📥",
    problem: "Incrementally build a sorted array one element at a time by shifting larger elements.",
    whenToUse: "Ideal for small datasets (N < 25) or nearly sorted streams.",
    mechanics: "Pick next element and insert it into correct position in sorted left prefix by shifting elements right.",
  },
  quicksort: {
    id: "quicksort",
    name: "QuickSort (Lomuto Partition)",
    icon: "⚡",
    problem: "High-speed in-place sorting by partitioning elements around a chosen pivot value.",
    whenToUse: "General-purpose internal sorting when average-case cache locality and O(1) space matter.",
    mechanics: "Partition array such that elements < pivot are left and > pivot are right; recurse on partitions.",
  },
  mergesort: {
    id: "mergesort",
    name: "Merge Sort (Divide & Conquer)",
    icon: "🔀",
    problem: "Guaranteed O(N log N) sorting by recursive halving and merging sorted subarrays.",
    whenToUse: "When stability is required and additional O(N) memory is acceptable.",
    mechanics: "Recursively split array into halves until singletons, then merge two sorted halves in sorted order.",
  },
};

export default function SortingVisualizer({
  selectedAlgoId = null,
  previewMode = false,
}) {
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
    45, 12, 85, 32, 89, 39, 69,
  ]);
  const [customInput, setCustomInput] = useState(
    "45, 12, 85, 32, 89, 39, 69"
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputError, setInputError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  const isReadyAlgo = algo === "bubble" || algo === "selection";

  // Generate sorting steps
  const steps = useMemo(() => {
    if (!isReadyAlgo) {
      return [{
        array: [...initialArray],
        comparing: [],
        swapping: [],
        sorted: new Set(),
        comparisons: 0,
        swaps: 0,
        codeLine: 1,
        statusText: "Coming Soon",
        statusType: "info",
        explanation: "This sorting pattern visualizer is currently being engineered.",
      }];
    }

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
          { label: "Algorithm", value: "Bubble Sort" },
          { label: "Array Length", value: n },
        ],
        explanation: "Bubble sort initialized. Will repeatedly scan array and bubble largest elements to the end.",
      });

      for (let i = 0; i < n - 1; i++) {
        let swappedInPass = false;
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
            variables: [
              { label: "arr[j]", value: arr[j] },
              { label: "arr[j+1]", value: arr[j + 1] },
              { label: "Condition", value: `${arr[j]} > ${arr[j + 1]} (${willSwap ? "True" : "False"})` },
            ],
            explanation: willSwap
              ? `arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]}): Out of order! Swapping elements.`
              : `arr[${j}] (${arr[j]}) <= arr[${j + 1}] (${arr[j + 1]}): In correct relative order.`,
          });

          if (willSwap) {
            swaps++;
            swappedInPass = true;
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
                { label: "Swapped", value: `arr[${j}] ⟷ arr[${j + 1}]` },
                { label: "Total Swaps", value: swaps },
              ],
              explanation: `Swapped ${arr[j + 1]} and ${arr[j]}.`,
            });
          }
        }
        sortedIndices.add(n - i - 1);
        if (!swappedInPass) break;
      }
      for (let k = 0; k < n; k++) sortedIndices.add(k);

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
        explanation: `🏁 Bubble sort complete! Array is completely sorted in non-decreasing order.`,
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
          { label: "Algorithm", value: "Selection Sort" },
          { label: "Array Length", value: n },
        ],
        explanation: "Selection sort initialized. Will repeatedly find minimum element from unsorted boundary and place it at boundary index.",
      });

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
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
            statusText: "Comparing",
            statusType: "warning",
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
  }, [initialArray, algo, isReadyAlgo]);

  const currentStep = steps[currentStepIndex] || steps[0];
  const maxVal = Math.max(...initialArray, 1);

  // Playback timer
  useEffect(() => {
    if (isPlaying && isReadyAlgo) {
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
  }, [isPlaying, currentStepIndex, steps.length, speed, isReadyAlgo]);

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
      { length: 7 },
      () => Math.floor(Math.random() * 85) + 12
    );
    setInitialArray(randomArr);
    setCustomInput(randomArr.join(", "));
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = () => {
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x) && x > 0);

    if (parsed.length < 3) {
      setInputError("Array must contain at least 3 positive numbers.");
      return;
    }
    if (parsed.length > 12) {
      setInputError("Array cannot exceed 12 numbers.");
      return;
    }

    setInputError("");
    setIsPlaying(false);
    setInitialArray(parsed);
    setCustomInput(parsed.join(", "));
    setCurrentStepIndex(0);
  };

  if (previewMode) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.canvasCard}>
          {currentStep.statusText.includes("Sorted") ? (
            <CanvasStatusBanner
              type="success"
              icon="✅"
              text={`Array Successfully Sorted! Total Comparisons: ${currentStep.comparisons} | Swaps: ${currentStep.swaps}`}
              mobileText={`Sorted! • ${currentStep.comparisons} Comps • ${currentStep.swaps} Swaps`}
            />
          ) : (
            <CanvasStatusBanner type="info">
              <span>Pass:</span>
              <strong>{currentStep.variables?.find((v) => v.label === "Pass")?.value || "Running"}</strong>
              <span>| Action:</span>
              <strong style={{ color: "var(--ifm-color-primary)" }}>{currentStep.statusText}</strong>
            </CanvasStatusBanner>
          )}

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

        <div className={styles.previewControlsWrapper}>
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
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Generalized Pattern Blueprint & Selector Card */}
      <PatternBlueprintCard
        patternId={algo}
        onPatternChange={(val) => {
          setIsPlaying(false);
          setAlgo(val);
          setCurrentStepIndex(0);
        }}
        options={SORTING_PATTERN_OPTIONS}
        blueprint={SORTING_BLUEPRINTS[algo]}
        id="sort-pattern-select"
      />

      <div className={layoutStyles.twoColumnGrid}>
        {/* Left Column: Visual Canvas & Controls */}
        <div className={layoutStyles.leftColumn}>
          {/* Consolidated Inputs & Configuration Toolbar at Top */}
          <div className={styles.configCard}>
            {isReadyAlgo ? (
            <>
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
                  placeholder="e.g. 45, 12, 85, 32 (3 to 12 items)"
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

              {/* Real-time stats & Legend */}
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
            </>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--ifm-font-color-secondary)", padding: "0.25rem 0" }}>
              💡 Switch to <strong>Bubble Sort</strong> or <strong>Selection Sort</strong> to run live interactive sorting executions.
            </div>
          )}
        </div>

        {/* Visual Canvas with Dynamic Bars */}
        <div className={styles.canvasCard}>
          {isReadyAlgo ? (
            <>
              {/* Status banner with fixed height slot to avoid CLS */}
              {currentStep.statusText.includes("Sorted") ? (
                <CanvasStatusBanner
                  type="success"
                  icon="✅"
                  text={`Array Successfully Sorted! Total Comparisons: ${currentStep.comparisons} | Swaps: ${currentStep.swaps}`}
                  mobileText={`Sorted! • ${currentStep.comparisons} Comps • ${currentStep.swaps} Swaps`}
                />
              ) : (
                <CanvasStatusBanner type="info">
                  <span>Pass:</span>
                  <strong>{currentStep.variables?.find((v) => v.label === "Pass")?.value || "Running"}</strong>
                  <span>| Action:</span>
                  <strong style={{ color: "var(--ifm-color-primary)" }}>{currentStep.statusText}</strong>
                </CanvasStatusBanner>
              )}

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
            </>
          ) : (
            <div className={styles.patternComingSoon}>
              <span style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>🛠️</span>
              <div className={styles.patternComingSoonBadge}>Pattern in Active Development</div>
              <h3 style={{ margin: "0.25rem 0", fontSize: "1.25rem", color: "var(--ifm-font-color-base)" }}>
                {algo === "insertion"
                  ? "Insertion Sort Visualizer"
                  : algo === "quicksort"
                  ? "QuickSort (Lomuto Partition) Visualizer"
                  : "Merge Sort (Divide & Conquer) Visualizer"}
              </h3>
              <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--ifm-font-color-secondary)", margin: "0.5rem 0 1.25rem 0", lineHeight: 1.6 }}>
                {algo === "insertion"
                  ? "Incremental sorted subarray expansion and shifting larger elements to the right is currently being engineered."
                  : algo === "quicksort"
                  ? "Pivot selection, boundary partition scanning, and recursive sub-array division are currently being engineered."
                  : "Recursive split trees and auxiliary merge buffers are currently being engineered."}
              </p>
              <a
                href="/coding/sorting"
                className={styles.patternComingSoonBtn}
              >
                <span>📖 Study Full Sorting Tutorial on CodeDose</span>
                <span>&rarr;</span>
              </a>
            </div>
          )}
        </div>

        {/* Player Controls */}
        {isReadyAlgo && (
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
            algo === "bubble"
              ? BUBBLE_SORT_CODE
              : algo === "selection"
              ? SELECTION_SORT_CODE
              : algo === "insertion"
              ? INSERTION_SORT_CODE
              : QUICKSORT_CODE
          }
          activeLine={isReadyAlgo ? currentStep.codeLine : 1}
          explanation={
            algo === "insertion"
              ? "Insertion sort: Progressively expands a sorted partition by shifting elements greater than the key to the right."
              : algo === "quicksort"
              ? "QuickSort: Partitions elements around a pivot such that smaller elements are left and greater elements are right."
              : currentStep.explanation
          }
          variables={isReadyAlgo ? currentStep.variables : []}
          statusText={isReadyAlgo ? currentStep.statusText : "Coming Soon"}
          statusType={isReadyAlgo ? currentStep.statusType : "info"}
          timeComplexity={PATTERN_COMPLEXITIES[algo]?.tc}
          spaceComplexity={PATTERN_COMPLEXITIES[algo]?.sc}
        />
      </div>
    </div>
  </div>
  );
}
