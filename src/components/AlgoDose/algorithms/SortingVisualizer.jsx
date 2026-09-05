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
      // Step 0: Line 2 - n = len(arr)
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
          { label: "n", value: `len(arr) = ${n}` },
          { label: "algorithm", value: "Bubble Sort" },
        ],
        explanation: `Bubble sort initialized: n = ${n}. Array elements will bubble into sorted positions.`,
      });

      for (let i = 0; i < n - 1; i++) {
        let swappedInPass = false;

        // Step A: Line 3 - for i in range(n - 1):
        generated.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 3,
          statusText: `Pass ${i + 1} of ${n - 1}`,
          statusType: "info",
          variables: [
            { label: "pass (i)", value: `${i} (Pass ${i + 1} of ${n - 1})`, highlight: true },
            { label: "unsorted partition", value: `[0..${n - i - 1}]` },
          ],
          explanation: `Outer pass ${i + 1}: bubbling largest remaining element into position ${n - i - 1}.`,
        });

        for (let j = 0; j < n - i - 1; j++) {
          // Step B: Line 4 - for j in range(n - i - 1):
          generated.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 4,
            statusText: "Inspect Pair",
            statusType: "info",
            variables: [
              { label: "j", value: `${j} (arr[${j}]=${arr[j]})`, highlight: true },
              { label: "j + 1", value: `${j + 1} (arr[${j + 1}]=${arr[j + 1]})` },
            ],
            explanation: `Inner loop: inspecting adjacent pair arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
          });

          comparisons++;
          const willSwap = arr[j] > arr[j + 1];

          // Step C: Line 5 - if arr[j] > arr[j + 1]:
          generated.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 5,
            statusText: willSwap ? "Out of Order! ⚠️" : "In Order ✓",
            statusType: willSwap ? "warning" : "info",
            variables: [
              { label: "arr[j] > arr[j + 1]", value: `${arr[j]} > ${arr[j + 1]} (${willSwap ? "True" : "False"})`, highlight: true },
              { label: "action", value: willSwap ? "Swap elements" : "Keep relative order" },
            ],
            explanation: willSwap
              ? `arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]}): Condition is True! Out of order, executing swap.`
              : `arr[${j}] (${arr[j]}) <= arr[${j + 1}] (${arr[j + 1]}): Condition is False! Elements already in relative order.`,
          });

          if (willSwap) {
            swaps++;
            swappedInPass = true;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            // Step D: Line 7 - arr[j], arr[j + 1] = arr[j + 1], arr[j]
            generated.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: new Set(sortedIndices),
              comparisons,
              swaps,
              codeLine: 7,
              statusText: "Swapped 🔄",
              statusType: "danger",
              variables: [
                { label: "swapped", value: `arr[${j}] ⟷ arr[${j + 1}]`, highlight: true },
                { label: "total swaps", value: swaps },
              ],
              explanation: `Executed swap: swapped values ${arr[j + 1]} and ${arr[j]}.`,
            });
          }
        }
        sortedIndices.add(n - i - 1);
        if (!swappedInPass) break;
      }
      for (let k = 0; k < n; k++) sortedIndices.add(k);

      // Final Step: Line 8 - return arr
      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 8,
        statusText: "✅ Fully Sorted",
        statusType: "success",
        variables: [
          { label: "Total Comparisons", value: comparisons },
          { label: "Total Swaps", value: swaps, highlight: true },
          { label: "Status", value: "Fully Sorted ✅", highlight: true },
        ],
        explanation: `🏁 All bubble sort passes complete! Array is completely sorted in non-decreasing order. Returning arr.`,
      });
    } else {
      // Selection Sort
      // Step 0: Line 2 - n = len(arr)
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
          { label: "n", value: `len(arr) = ${n}` },
          { label: "Algorithm", value: "Selection Sort" },
        ],
        explanation: `Selection sort initialized: n = ${n}. Will repeatedly place minimum element at boundary index.`,
      });

      for (let i = 0; i < n - 1; i++) {
        // Step A: Line 3 - for i in range(n - 1):
        generated.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 3,
          statusText: `Pass ${i + 1} (Target idx ${i})`,
          statusType: "info",
          variables: [
            { label: "pass (i)", value: `idx ${i}`, highlight: true },
            { label: "unsorted boundary", value: `[${i}..${n - 1}]` },
          ],
          explanation: `Outer loop pass ${i + 1}: searching for minimum element in [${i}..${n - 1}] to place at index ${i}.`,
        });

        let minIdx = i;

        // Step B: Line 4 - min_idx = i
        generated.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 4,
          statusText: "Set Initial Min",
          statusType: "info",
          variables: [
            { label: "min_idx", value: `${i} (val: ${arr[i]})`, highlight: true },
          ],
          explanation: `Executed min_idx = ${i}. Initial assumption: smallest element is arr[${i}] (${arr[i]}).`,
        });

        for (let j = i + 1; j < n; j++) {
          // Step C: Line 5 - for j in range(i + 1, n):
          generated.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 5,
            statusText: "Scan Candidate",
            statusType: "info",
            variables: [
              { label: "j (candidate)", value: `idx ${j} (${arr[j]})`, highlight: true },
              { label: "current min", value: `idx ${minIdx} (${arr[minIdx]})` },
            ],
            explanation: `Inner loop: scanning candidate arr[${j}] (${arr[j]}) against current minimum arr[${minIdx}] (${arr[minIdx]}).`,
          });

          comparisons++;
          const isNewMin = arr[j] < arr[minIdx];

          // Step D: Line 6 - if arr[j] < arr[min_idx]:
          generated.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 6,
            statusText: isNewMin ? "Smaller Found! 🔥" : "Not Smaller",
            statusType: isNewMin ? "warning" : "info",
            variables: [
              { label: "arr[j] < arr[min_idx]", value: `${arr[j]} < ${arr[minIdx]} (${isNewMin ? "True" : "False"})`, highlight: true },
              { label: "action", value: isNewMin ? "Update min_idx" : "Continue scan" },
            ],
            explanation: isNewMin
              ? `🔥 Condition is True (${arr[j]} < ${arr[minIdx]})! Found smaller element at index ${j}.`
              : `Condition is False (${arr[j]} >= ${arr[minIdx]}). Current minimum (${arr[minIdx]}) remains unchanged.`,
          });

          if (isNewMin) {
            minIdx = j;

            // Step E: Line 7 - min_idx = j
            generated.push({
              array: [...arr],
              comparing: [minIdx],
              swapping: [],
              sorted: new Set(sortedIndices),
              comparisons,
              swaps,
              codeLine: 7,
              statusText: "Update min_idx",
              statusType: "info",
              variables: [
                { label: "min_idx", value: `${j} (val: ${arr[j]})`, highlight: true },
              ],
              explanation: `Executed min_idx = ${j}. New minimum element recorded at index ${j} (${arr[j]}).`,
            });
          }
        }

        const needsSwap = minIdx !== i;

        // Step F: Line 8 - if min_idx != i:
        generated.push({
          array: [...arr],
          comparing: needsSwap ? [i, minIdx] : [i],
          swapping: [],
          sorted: new Set(sortedIndices),
          comparisons,
          swaps,
          codeLine: 8,
          statusText: needsSwap ? "Swap Needed" : "Already in Place",
          statusType: "info",
          variables: [
            { label: "min_idx != i", value: `${minIdx} != ${i} (${needsSwap ? "True" : "False"})`, highlight: true },
            { label: "action", value: needsSwap ? `Swap arr[${i}] and arr[${minIdx}]` : "No swap needed" },
          ],
          explanation: needsSwap
            ? `Condition min_idx != i is True (${minIdx} != ${i}). Minimum element is at index ${minIdx}; executing boundary swap.`
            : `Condition min_idx != i is False (${minIdx} == ${i}). Minimum element already at boundary index ${i}; no swap needed.`,
        });

        if (needsSwap) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;

          // Step G: Line 10 - arr[i], arr[min_idx] = arr[min_idx], arr[i]
          generated.push({
            array: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sorted: new Set(sortedIndices),
            comparisons,
            swaps,
            codeLine: 10,
            statusText: "Swapped Min to Boundary",
            statusType: "danger",
            variables: [
              { label: "placed at boundary", value: `arr[${i}] = ${arr[i]}`, highlight: true },
              { label: "total swaps", value: swaps },
            ],
            explanation: `Placed minimum element (${arr[i]}) at sorted boundary index ${i}.`,
          });
        }
        sortedIndices.add(i);
      }
      sortedIndices.add(n - 1);

      // Final Step: Line 11 - return arr
      generated.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: new Set(sortedIndices),
        comparisons,
        swaps,
        codeLine: 11,
        statusText: "✅ Fully Sorted",
        statusType: "success",
        variables: [
          { label: "Total Comparisons", value: comparisons },
          { label: "Total Swaps", value: swaps, highlight: true },
          { label: "Status", value: "Fully Sorted ✅", highlight: true },
        ],
        explanation: `🏁 Selection sort complete! All elements placed at sorted positions. Returning arr.`,
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
