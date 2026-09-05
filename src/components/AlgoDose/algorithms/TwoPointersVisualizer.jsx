import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import CustomDropdown from "../CustomDropdown";
import CanvasStatusBanner from "../CanvasStatusBanner";
import PatternBlueprintCard from "../PatternBlueprintCard";
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

const FAST_SLOW_CODE = [
  "def remove_duplicates(nums):",
  "    if not nums: return 0",
  "    slow = 0",
  "    for fast in range(1, len(nums)):",
  "        if nums[fast] != nums[slow]:",
  "            slow += 1",
  "            nums[slow] = nums[fast]  # Overwrite in-place",
  "    return slow + 1",
];

const THREE_SUM_CODE = [
  "def three_sum(nums):",
  "    nums.sort()",
  "    res = []",
  "    for i in range(len(nums) - 2):",
  "        if i > 0 and nums[i] == nums[i - 1]: continue",
  "        left, right = i + 1, len(nums) - 1",
  "        while left < right:",
  "            total = nums[i] + nums[left] + nums[right]",
  "            if total == 0:",
  "                res.append([nums[i], nums[left], nums[right]])",
  "    return res",
];

const PATTERN_COMPLEXITIES = {
  two_sum: { tc: "O(N)", sc: "O(1)" },
  fast_slow: { tc: "O(N)", sc: "O(1)" },
  container_water: { tc: "O(N)", sc: "O(1)" },
  three_sum: { tc: "O(N²)", sc: "O(1)" },
};

const TWO_POINTERS_BLUEPRINTS = {
  two_sum: {
    id: "two_sum",
    name: "Opposing Pointers (Two Sum)",
    icon: "↔️",
    problem: "Find two elements in an ordered collection whose combined sum matches a target condition.",
    whenToUse: "When the input array is sorted or monotonic, and a pair condition can be evaluated from the extreme boundaries inward.",
    mechanics: "Left starts at 0, Right starts at N-1. Advance left to increase sum; retract right to decrease sum.",
  },
  fast_slow: {
    id: "fast_slow",
    name: "Fast & Slow (Remove Duplicates)",
    icon: "🏎️",
    problem: "In-place array compaction, element filtering, or partitioning without auxiliary memory allocation.",
    whenToUse: "When you must modify an array in-place based on a condition (e.g. unique items or filtered values) in O(1) extra space.",
    mechanics: "A reader pointer (fast) scans ahead through all items. A writer pointer (slow) only advances when writing a valid unique item.",
  },
  container_water: {
    id: "container_water",
    name: "Greedy Opposing (Container With Water)",
    icon: "🌊",
    problem: "Maximizing an enclosed area or capacity constrained by the minimum of two boundary walls.",
    whenToUse: "When capacity is limited by the shorter boundary. Moving the taller boundary can never increase the result, so greedily move the shorter boundary.",
    mechanics: "Pointers start at both ends. Compute current capacity, then advance whichever pointer points to the shorter boundary inward.",
  },
  three_sum: {
    id: "three_sum",
    name: "Anchored 3-Pointer (3Sum)",
    icon: "📐",
    problem: "Finding triplet combinations meeting a target condition without cubic O(N³) brute-force.",
    whenToUse: "When solving k-sum problems where sorting the collection reduces the problem dimensionality by 1.",
    mechanics: "An outer loop fixes an anchor element at index i, while standard opposing two pointers search the remaining sorted subarray.",
  },
};

const TWO_POINTERS_PATTERN_OPTIONS = [
  {
    group: "Ready Patterns",
    items: [
      { value: "two_sum", label: "Opposing Pointers (Two Sum)", icon: "↔️" },
      { value: "fast_slow", label: "Fast & Slow (Remove Duplicates)", icon: "🏎️" },
    ],
  },
  {
    group: "Upcoming Patterns",
    items: [
      { value: "container_water", label: "Greedy Opposing (Container With Water)", icon: "🌊", badge: "Coming Soon" },
      { value: "three_sum", label: "Anchored 3-Pointer (3Sum)", icon: "📐", badge: "Coming Soon" },
    ],
  },
];

export default function TwoPointersVisualizer() {
  const [activePattern, setActivePattern] = useState("two_sum");

  // Two Sum State
  const [twoSumArray, setTwoSumArray] = useState([1, 3, 4, 6, 8, 11, 15]);
  const [twoSumTarget, setTwoSumTarget] = useState(14);
  const [customInputStr, setCustomInputStr] = useState("1, 3, 4, 6, 8, 11, 15");

  // Fast & Slow State (Remove Duplicates from Sorted Array)
  const [fastSlowArray, setFastSlowArray] = useState([1, 1, 2, 2, 3, 4, 4, 5]);
  const [fastSlowInputStr, setFastSlowInputStr] = useState("1, 1, 2, 2, 3, 4, 4, 5");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputError, setInputError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  // Dynamic Quick Targets computed from active array (realistic pair sums + test missing sum)
  const quickTargets = useMemo(() => {
    if (!twoSumArray || twoSumArray.length < 2) return { valid: [], impossible: null };
    const n = twoSumArray.length;
    const t1 = twoSumArray[0] + twoSumArray[1];
    const midIdx = Math.floor(n / 2);
    const t2 = twoSumArray[1] + twoSumArray[midIdx];
    const t3 = twoSumArray[n - 2] + twoSumArray[n - 1];
    const valid = Array.from(new Set([t1, t2, t3]));
    const impossible = twoSumArray[n - 1] + twoSumArray[n - 1] + 3;
    return { valid, impossible };
  }, [twoSumArray]);

  // Two Sum Steps Generator (Detailed 1-to-1 Code Sync)
  const twoSumSteps = useMemo(() => {
    const generated = [];
    let left = 0;
    let right = twoSumArray.length - 1;

    // Step 0: Line 2 - Initialize Pointers
    generated.push({
      left,
      right,
      currentSum: twoSumArray[left] + twoSumArray[right],
      status: "initial",
      statusText: "Initialize Pointers",
      statusType: "info",
      codeLine: 2,
      variables: [
        { label: "left", value: `0 (arr[0] = ${twoSumArray[0]})` },
        { label: "right", value: `${right} (arr[${right}] = ${twoSumArray[right]})` },
        { label: "target", value: twoSumTarget },
      ],
      explanation: `Initialized left = 0 (val: ${twoSumArray[0]}) at the beginning, and right = ${right} (val: ${twoSumArray[right]}) at the end of the sorted array.`,
    });

    let found = false;
    while (left < right) {
      // Step A: Line 3 - While condition check
      generated.push({
        left,
        right,
        currentSum: twoSumArray[left] + twoSumArray[right],
        status: "checking",
        statusText: "Check Boundary",
        statusType: "info",
        codeLine: 3,
        variables: [
          { label: "left < right", value: `${left} < ${right} (True)`, highlight: true },
          { label: "arr[left]", value: twoSumArray[left] },
          { label: "arr[right]", value: twoSumArray[right] },
          { label: "target", value: twoSumTarget },
        ],
        explanation: `Boundary check: left (${left}) < right (${right}) is True. Pointers have not crossed; proceeding inside the while loop.`,
      });

      const sum = twoSumArray[left] + twoSumArray[right];

      // Step B: Line 4 - Calculate curr_sum
      generated.push({
        left,
        right,
        currentSum: sum,
        status: "computing",
        statusText: "Compute Pair Sum",
        statusType: "info",
        codeLine: 4,
        variables: [
          { label: "arr[left]", value: twoSumArray[left] },
          { label: "arr[right]", value: twoSumArray[right] },
          { label: "curr_sum", value: `${twoSumArray[left]} + ${twoSumArray[right]} = ${sum}`, highlight: true },
          { label: "target", value: twoSumTarget },
        ],
        explanation: `Calculated curr_sum = arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${sum}. Comparing against target = ${twoSumTarget}.`,
      });

      if (sum === twoSumTarget) {
        // Step C1: Line 5 - Evaluate if curr_sum == target
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "eval_equal",
          statusText: "Condition Matched! 🎯",
          statusType: "success",
          codeLine: 5,
          variables: [
            { label: "curr_sum == target", value: `${sum} == ${twoSumTarget} (True!)`, highlight: true },
            { label: "left", value: `idx ${left}` },
            { label: "right", value: `idx ${right}` },
          ],
          explanation: `Condition curr_sum == target is True (${sum} == ${twoSumTarget})! Match found. Entering if block to return indices.`,
        });

        // Step C2: Line 6 - return [left, right]
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "found",
          statusText: "Match Found! 🎯",
          statusType: "success",
          codeLine: 6,
          variables: [
            { label: "arr[left]", value: `arr[${left}] = ${twoSumArray[left]}`, highlight: true },
            { label: "arr[right]", value: `arr[${right}] = ${twoSumArray[right]}`, highlight: true },
            { label: "return", value: `[${left}, ${right}]`, highlight: true },
          ],
          explanation: `🎯 Target pair found! arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${twoSumTarget}. Returning indices [${left}, ${right}].`,
        });
        found = true;
        break;
      } else if (sum < twoSumTarget) {
        // Step C1: Line 7 - elif curr_sum < target
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "eval_less",
          statusText: "Sum Too Small",
          statusType: "warning",
          codeLine: 7,
          variables: [
            { label: "curr_sum < target", value: `${sum} < ${twoSumTarget} (True)`, highlight: true },
            { label: "action needed", value: "Need larger sum ➔ move left rightward" },
          ],
          explanation: `Condition elif curr_sum < target is True (${sum} < ${twoSumTarget}). Sum is too small. Because array is sorted, advancing left will produce a larger candidate sum.`,
        });

        // Step C2: Line 8 - left += 1
        const prevLeft = left;
        left++;
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "less",
          statusText: "Advance left ➔",
          statusType: "info",
          codeLine: 8,
          variables: [
            { label: "left", value: `${prevLeft} ➔ ${left}`, highlight: true },
            { label: "new arr[left]", value: twoSumArray[left] },
            { label: "right", value: `${right} (${twoSumArray[right]})` },
          ],
          explanation: `Executed left += 1. Left pointer advanced from index ${prevLeft} to index ${left} (val: ${twoSumArray[left]}).`,
        });
      } else {
        // Step C1: Line 9 - else:
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "eval_greater",
          statusText: "Sum Too Large",
          statusType: "warning",
          codeLine: 9,
          variables: [
            { label: "curr_sum > target", value: `${sum} > ${twoSumTarget} (fell into else)`, highlight: true },
            { label: "action needed", value: "Need smaller sum ➔ move right leftward" },
          ],
          explanation: `curr_sum (${sum}) > target (${twoSumTarget}). Fell into else block. Sum is too large; decrementing right will produce a smaller candidate sum.`,
        });

        // Step C2: Line 10 - right -= 1
        const prevRight = right;
        right--;
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "greater",
          statusText: "Retract right ⬅",
          statusType: "info",
          codeLine: 10,
          variables: [
            { label: "right", value: `${prevRight} ➔ ${right}`, highlight: true },
            { label: "new arr[right]", value: twoSumArray[right] },
            { label: "left", value: `${left} (${twoSumArray[left]})` },
          ],
          explanation: `Executed right -= 1. Right pointer retracted from index ${prevRight} to index ${right} (val: ${twoSumArray[right]}).`,
        });
      }
    }

    if (!found) {
      // Line 3 - While condition evaluated to False
      generated.push({
        left,
        right,
        currentSum: null,
        status: "loop_exit",
        statusText: "Loop Terminated",
        statusType: "warning",
        codeLine: 3,
        variables: [
          { label: "left < right", value: `${left} < ${right} (False)`, highlight: true },
          { label: "result", value: "Pointers met/crossed" },
        ],
        explanation: `Boundary check: left (${left}) < right (${right}) is now False. The search window has collapsed; exiting while loop.`,
      });

      // Line 11 - return [-1, -1]
      generated.push({
        left,
        right,
        currentSum: null,
        status: "not_found",
        statusText: "No Pair Found",
        statusType: "error",
        codeLine: 11,
        variables: [{ label: "result", value: "[-1, -1] (no pair found)" }],
        explanation: `Pointers met (left=${left}, right=${right}). No two elements sum to target ${twoSumTarget}. Returning [-1, -1].`,
      });
    }

    return generated;
  }, [twoSumArray, twoSumTarget]);

  // Fast & Slow (In-Place Remove Duplicates) Steps Generator (Detailed 1-to-1 Code Sync)
  const fastSlowSteps = useMemo(() => {
    if (!fastSlowArray || fastSlowArray.length === 0) return [];
    const generated = [];
    const arr = [...fastSlowArray];
    const n = arr.length;

    let slow = 0;

    // Step 0: Line 3 - slow = 0
    generated.push({
      array: [...arr],
      slow: 0,
      fast: 1,
      action: "init",
      statusText: "Initialize Pointers",
      statusType: "info",
      codeLine: 3, // slow = 0
      justWrittenIdx: null,
      variables: [
        { label: "slow (writer)", value: "0", highlight: true },
        { label: "fast (reader)", value: "starts at 1" },
        { label: "nums[slow]", value: arr[0] },
        { label: "Unique (k)", value: 1 },
      ],
      explanation: `Initialized writer slow = 0 at index 0 (val: ${arr[0]}). The first element is always part of the unique prefix.`,
    });

    for (let fast = 1; fast < n; fast++) {
      // Step A: Line 4 - for fast in range(1, len(nums)):
      generated.push({
        array: [...arr],
        slow,
        fast,
        action: "reader_advance",
        statusText: "Reader Advances ⏩",
        statusType: "info",
        codeLine: 4, // for fast in range(1, len(nums)):
        justWrittenIdx: null,
        variables: [
          { label: "fast (reader)", value: `idx ${fast} (val: ${arr[fast]})`, highlight: true },
          { label: "slow (writer)", value: `idx ${slow} (val: ${arr[slow]})` },
          { label: "loop progress", value: `${fast} of ${n - 1}` },
        ],
        explanation: `For loop iteration: fast reader advances to index ${fast} (val: ${arr[fast]}). Now checking if it differs from the last unique element at slow (idx ${slow}).`,
      });

      const isDuplicate = arr[fast] === arr[slow];

      // Step B: Line 5 - if nums[fast] != nums[slow]:
      if (isDuplicate) {
        generated.push({
          array: [...arr],
          slow,
          fast,
          action: "duplicate_skip",
          statusText: "Duplicate Skip ⏭️",
          statusType: "warning",
          codeLine: 5, // if nums[fast] != nums[slow]:
          justWrittenIdx: null,
          variables: [
            { label: "nums[fast] != nums[slow]", value: `${arr[fast]} != ${arr[slow]} (False)`, highlight: true },
            { label: "nums[fast]", value: arr[fast] },
            { label: "nums[slow]", value: arr[slow] },
            { label: "decision", value: "Duplicate! Skip if block." },
          ],
          explanation: `nums[${fast}] (${arr[fast]}) != nums[${slow}] (${arr[slow]}) is False! Duplicate value detected. Writer slow remains at index ${slow}; fast reader skips to next element.`,
        });
      } else {
        const newUniqueVal = arr[fast];

        // Step B (Distinct): Line 5 evaluates to True!
        generated.push({
          array: [...arr],
          slow,
          fast,
          action: "condition_true",
          statusText: "New Unique Found! ✨",
          statusType: "info",
          codeLine: 5, // if nums[fast] != nums[slow]:
          justWrittenIdx: null,
          variables: [
            { label: "nums[fast] != nums[slow]", value: `${arr[fast]} != ${arr[slow]} (True!)`, highlight: true },
            { label: "nums[fast]", value: arr[fast] },
            { label: "nums[slow]", value: arr[slow] },
            { label: "decision", value: "Distinct! Entering if block." },
          ],
          explanation: `nums[${fast}] (${arr[fast]}) != nums[${slow}] (${arr[slow]}) is True! New unique value ${arr[fast]} discovered. Entering if block to advance writer and overwrite.`,
        });

        // Step C: Line 6 - slow += 1
        const prevSlow = slow;
        slow++;
        generated.push({
          array: [...arr],
          slow,
          fast,
          action: "advance_slow",
          statusText: "Advance Writer ➔",
          statusType: "info",
          codeLine: 6, // slow += 1
          justWrittenIdx: null,
          variables: [
            { label: "slow (writer)", value: `${prevSlow} ➔ ${slow}`, highlight: true },
            { label: "fast (reader)", value: fast },
            { label: "new unique val", value: newUniqueVal },
            { label: "Unique (k)", value: slow + 1, highlight: true },
          ],
          explanation: `Executed slow += 1. Writer pointer slow advances from index ${prevSlow} to index ${slow} to reserve slot for the next unique element.`,
        });

        // Step D: Line 7 - nums[slow] = nums[fast]
        arr[slow] = newUniqueVal;
        generated.push({
          array: [...arr],
          slow,
          fast,
          action: "write",
          statusText: "In-Place Write ✍️",
          statusType: "success",
          codeLine: 7, // nums[slow] = nums[fast]
          justWrittenIdx: slow,
          variables: [
            { label: `nums[${slow}]`, value: newUniqueVal, highlight: true },
            { label: "slow (writer)", value: slow },
            { label: "fast (reader)", value: fast },
            { label: "Unique Prefix", value: `[${arr.slice(0, slow + 1).join(", ")}]` },
          ],
          explanation: `Executed nums[${slow}] = nums[${fast}]: In-place write! Value ${newUniqueVal} written into nums[${slow}]. Unique prefix [0..${slow}] updated.`,
        });
      }
    }

    const uniqueCount = slow + 1;
    const uniqueElements = arr.slice(0, uniqueCount);
    // Final Step: Line 8 - return slow + 1
    generated.push({
      array: [...arr],
      slow,
      fast: n,
      action: "complete",
      statusText: "Compaction Complete ✅",
      statusType: "success",
      codeLine: 8, // return slow + 1
      justWrittenIdx: null,
      variables: [
        { label: "k (Unique Length)", value: uniqueCount, highlight: true },
        { label: "Unique Prefix", value: `[${uniqueElements.join(", ")}]`, highlight: true },
        { label: "Return Value", value: uniqueCount, highlight: true },
      ],
      explanation: `🏁 Reader reached end of array. Array compaction complete! The first k = ${uniqueCount} elements [${uniqueElements.join(", ")}] are the unique elements in sorted order. Returning k = ${uniqueCount}.`,
    });

    return generated;
  }, [fastSlowArray]);

  const steps = activePattern === "fast_slow" ? fastSlowSteps : twoSumSteps;
  const currentStep = steps[currentStepIndex] || steps[0];
  const isReadyPattern = activePattern === "two_sum" || activePattern === "fast_slow";

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
    const len = 7;
    const sorted = [];
    let val = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < len; i++) {
      sorted.push(val);
      val += Math.floor(Math.random() * 4) + 2;
    }
    setTwoSumArray(sorted);
    setCustomInputStr(sorted.join(", "));

    // 80% probability: pick 2 distinct indices from the list so target exists
    // 20% probability: pick a target not in the list
    let newTarget;
    if (Math.random() < 0.8) {
      const i1 = Math.floor(Math.random() * 3);
      const i2 = Math.floor(Math.random() * 3) + 3;
      newTarget = sorted[i1] + sorted[i2];
    } else {
      newTarget = sorted[len - 1] + sorted[len - 2] + 3;
    }
    setTwoSumTarget(newTarget);
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = (e) => {
    if (e) e.preventDefault();
    const parsed = customInputStr
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length < 3) {
      setInputError("Please enter at least 3 numbers.");
      return;
    }
    if (parsed.length > 12) {
      setInputError("Please enter no more than 12 numbers.");
      return;
    }

    setInputError("");
    setIsPlaying(false);
    const sorted = [...parsed].sort((a, b) => a - b);
    setTwoSumArray(sorted);
    setCustomInputStr(sorted.join(", "));
    if (twoSumTarget < sorted[0] + sorted[1]) {
      setTwoSumTarget(sorted[0] + sorted[sorted.length - 1]);
    }
    setCurrentStepIndex(0);
  };

  const handleFastSlowRandomize = () => {
    setIsPlaying(false);
    setInputError("");
    const length = 7 + Math.floor(Math.random() * 3); // 7 to 9 items
    const arr = [];
    let current = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < length; i++) {
      arr.push(current);
      if (Math.random() > 0.55) {
        current += Math.floor(Math.random() * 2) + 1;
      }
    }
    if (new Set(arr).size === arr.length) {
      arr[1] = arr[0];
    }
    setFastSlowArray(arr);
    setFastSlowInputStr(arr.join(", "));
    setCurrentStepIndex(0);
  };

  const handleFastSlowInputSubmit = (e) => {
    if (e) e.preventDefault();
    const parsed = fastSlowInputStr
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length < 3) {
      setInputError("Please enter at least 3 numbers.");
      return;
    }
    if (parsed.length > 12) {
      setInputError("Please enter no more than 12 numbers.");
      return;
    }

    setInputError("");
    setIsPlaying(false);
    const sorted = [...parsed].sort((a, b) => a - b);
    setFastSlowArray(sorted);
    setFastSlowInputStr(sorted.join(", "));
    setCurrentStepIndex(0);
  };

  return (
    <div className={styles.container}>
      {/* Generalized Pattern Blueprint & Selector Card */}
      <PatternBlueprintCard
        patternId={activePattern}
        onPatternChange={(val) => {
          setActivePattern(val);
          setIsPlaying(false);
          setCurrentStepIndex(0);
        }}
        options={TWO_POINTERS_PATTERN_OPTIONS}
        blueprint={TWO_POINTERS_BLUEPRINTS[activePattern]}
      />

      <div className={layoutStyles.twoColumnGrid}>
        {/* Left Column: Visualizer Canvas & Controls */}
        <div className={layoutStyles.leftColumn}>
          {/* Consolidated Inputs & Configuration Toolbar at Top */}
          <div className={styles.configCard}>
            {activePattern === "two_sum" ? (
              <>
                {/* Row 1: Array Input & Randomize */}
                <form className={styles.inputRow} onSubmit={handleCustomInputSubmit}>
                  <label className={styles.label}>Sorted Array:</label>
                  <input
                    type="text"
                    className={styles.textInput}
                    value={customInputStr}
                    onChange={(e) => {
                      setCustomInputStr(e.target.value);
                      setInputError("");
                    }}
                    placeholder="e.g. 1, 3, 4, 7, 9, 11 (3 to 12 items)"
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
                    title="Generate random sorted array"
                  >
                    🎲 Randomize
                  </button>
                </form>
                {inputError && <div className={styles.errorNotice}>⚠️ {inputError}</div>}

                {/* Row 2: Target Sum Input & Quick Chips */}
                <div className={styles.targetRow}>
                  <div className={styles.targetInputGroup}>
                    <label htmlFor="tp-target-input" className={styles.label}>
                      Target Sum:
                    </label>
                    <input
                      id="tp-target-input"
                      type="number"
                      className={styles.targetInput}
                      value={twoSumTarget}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          setTwoSumTarget(val);
                          setIsPlaying(false);
                          setCurrentStepIndex(0);
                        }
                      }}
                    />
                  </div>
                  <div className={styles.quickGroup}>
                    <span className={styles.label}>Quick:</span>
                    <div className={styles.quickChips}>
                      {quickTargets.valid.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`${styles.chip} ${twoSumTarget === t ? styles.chipActive : ""}`}
                          onClick={() => {
                            setTwoSumTarget(t);
                            setIsPlaying(false);
                            setCurrentStepIndex(0);
                          }}
                        >
                          {t}
                        </button>
                      ))}
                      {quickTargets.impossible && (
                        <button
                          type="button"
                          className={`${styles.chip} ${twoSumTarget === quickTargets.impossible ? styles.chipActive : ""}`}
                          onClick={() => {
                            setTwoSumTarget(quickTargets.impossible);
                            setIsPlaying(false);
                            setCurrentStepIndex(0);
                          }}
                          title="Test target with no matching pair"
                        >
                          {quickTargets.impossible} ❌
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : activePattern === "fast_slow" ? (
              <>
                {/* Row 1: Array Input & Randomize */}
                <form className={styles.inputRow} onSubmit={handleFastSlowInputSubmit}>
                  <label className={styles.label}>Sorted Array:</label>
                  <input
                    type="text"
                    className={styles.textInput}
                    value={fastSlowInputStr}
                    onChange={(e) => {
                      setFastSlowInputStr(e.target.value);
                      setInputError("");
                    }}
                    placeholder="e.g. 1, 1, 2, 2, 3, 4, 4, 5 (3 to 12 items)"
                  />
                  <button type="submit" className={styles.applyBtn}>
                    Apply
                  </button>
                  <button
                    type="button"
                    className={styles.randomBtn}
                    onClick={handleFastSlowRandomize}
                    title="Generate random sorted array with duplicates"
                  >
                    🎲 Randomize
                  </button>
                </form>
                {inputError && <div className={styles.errorNotice}>⚠️ {inputError}</div>}

                {/* Row 2: Presets for Fast & Slow */}
                <div className={styles.targetRow}>
                  <div className={styles.quickGroup}>
                    <span className={styles.label}>Presets:</span>
                    <div className={styles.quickChips}>
                      {[
                        { label: "Standard", arr: [1, 1, 2, 2, 3, 4, 4, 5] },
                        { label: "Classic 0-4", arr: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
                        { label: "Clusters", arr: [1, 2, 2, 3, 4, 4, 4] },
                        { label: "All Duplicates", arr: [2, 2, 2, 2, 2] },
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          className={`${styles.chip} ${
                            fastSlowArray.join(",") === preset.arr.join(",") ? styles.chipActive : ""
                          }`}
                          onClick={() => {
                            setFastSlowArray(preset.arr);
                            setFastSlowInputStr(preset.arr.join(", "));
                            setInputError("");
                            setIsPlaying(false);
                            setCurrentStepIndex(0);
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: "0.85rem", color: "var(--ifm-font-color-secondary)", padding: "0.25rem 0" }}>
                💡 Switch to <strong>Opposing Pointers (Two Sum)</strong> or <strong>Fast & Slow (Remove Duplicates)</strong> to run live executions.
              </div>
            )}
          </div>

          {/* Visual Canvas Card */}
          <div className={styles.canvasCard}>
            {activePattern === "two_sum" ? (
              <>
                {/* Status banner with fixed height slot to avoid CLS */}
                {currentStep.status === "found" ? (
                  <CanvasStatusBanner
                    type="success"
                    icon="🎯"
                    text={`Target Pair Found: arr[${currentStep.left}] (${twoSumArray[currentStep.left]}) + arr[${currentStep.right}] (${twoSumArray[currentStep.right]}) = ${twoSumTarget}`}
                    mobileText={`Pair Found: arr[${currentStep.left}] + arr[${currentStep.right}] = ${twoSumTarget}`}
                  />
                ) : currentStep.status === "not_found" ? (
                  <CanvasStatusBanner
                    type="danger"
                    icon="❌"
                    text={`No pair in array sums to ${twoSumTarget}`}
                    mobileText={`No pair sums to ${twoSumTarget}`}
                  />
                ) : (
                  <CanvasStatusBanner type="info">
                    <span>Current Sum:</span>
                    <strong style={{ color: "var(--ifm-color-primary)" }}>
                      {currentStep.currentSum ?? (twoSumArray[currentStep.left] + twoSumArray[currentStep.right])}
                    </strong>
                    <span>vs Target</span>
                    <strong>{twoSumTarget}</strong>
                  </CanvasStatusBanner>
                )}

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
              </>
            ) : activePattern === "fast_slow" ? (
              <>
                {/* Fast & Slow Status Banner */}
                {currentStep.action === "complete" ? (
                  <CanvasStatusBanner
                    type="success"
                    icon="🏆"
                    text={`Compaction Complete! Unique count k = ${currentStep.slow + 1} | Unique Prefix: [${currentStep.array.slice(0, currentStep.slow + 1).join(", ")}]`}
                    mobileText={`Complete! k = ${currentStep.slow + 1} unique items: [${currentStep.array.slice(0, currentStep.slow + 1).join(", ")}]`}
                  />
                ) : (
                  <CanvasStatusBanner type="info">
                    <span>Writer (Slow):</span>
                    <strong style={{ color: "#10b981" }}>idx {currentStep.slow}</strong>
                    <span>| Reader (Fast):</span>
                    <strong style={{ color: "#3b82f6" }}>
                      {currentStep.fast < currentStep.array.length ? `idx ${currentStep.fast}` : "End"}
                    </strong>
                    <span>| Action:</span>
                    <strong style={{ color: "var(--ifm-color-primary)" }}>{currentStep.statusText}</strong>
                  </CanvasStatusBanner>
                )}

                {/* Fast & Slow Array Elements */}
                <div className={styles.arrayWrapper}>
                  {currentStep.array.map((num, idx) => {
                    const isSlow = idx === currentStep.slow;
                    const isFast = idx === currentStep.fast;
                    const isInPrefix = idx <= currentStep.slow;
                    const isJustWritten = idx === currentStep.justWrittenIdx;
                    const isDuplicateSkipped = currentStep.action === "duplicate_skip" && isFast;

                    return (
                      <div key={idx} className={styles.elementColumn}>
                        {/* Top Pointer Badge */}
                        <div className={styles.pointerTopSpace}>
                          {isSlow && isFast ? (
                            <span className={`${styles.pointerBadge} ${styles.pointerBoth}`}>
                              S&F
                            </span>
                          ) : isSlow ? (
                            <span className={`${styles.pointerBadge} ${styles.pointerSlow}`}>
                              S: WRITER
                            </span>
                          ) : isFast ? (
                            <span className={`${styles.pointerBadge} ${styles.pointerFast}`}>
                              F: READER
                            </span>
                          ) : null}
                        </div>

                        {/* Element Box */}
                        <div
                          className={`
                            ${styles.elementBox}
                            ${isInPrefix ? styles.boxUniquePrefix : ""}
                            ${isSlow ? styles.boxSlow : ""}
                            ${isFast ? styles.boxFast : ""}
                            ${isJustWritten ? styles.boxWrittenFlash : ""}
                            ${isDuplicateSkipped ? styles.boxDuplicateSkipped : ""}
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
              </>
            ) : (
              <div className={styles.patternComingSoon}>
                <span style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>🛠️</span>
                <div className={styles.patternComingSoonBadge}>Pattern in Active Development</div>
                <h3 style={{ margin: "0.25rem 0", fontSize: "1.25rem", color: "var(--ifm-font-color-base)" }}>
                  {activePattern === "container_water"
                    ? "Greedy Opposing (Container With Water)"
                    : "Anchored 3-Pointer (3Sum)"}
                </h3>
                <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--ifm-font-color-secondary)", margin: "0.5rem 0 1.25rem 0", lineHeight: 1.6 }}>
                  {activePattern === "container_water"
                    ? "Greedy two-pointer area maximization constrained by boundary heights is currently being engineered."
                    : "3-pointer outer anchoring loop combined with inner two-pointer target convergence is currently being engineered."}
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
          {isReadyPattern && (
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
              activePattern === "fast_slow"
                ? FAST_SLOW_CODE
                : activePattern === "three_sum"
                ? THREE_SUM_CODE
                : TWO_SUM_CODE
            }
            activeLine={isReadyPattern ? currentStep.codeLine : 1}
            explanation={
              activePattern === "three_sum"
                ? "Three Sum: Fixes the first element using an outer loop, then uses two opposing pointers on the remaining sorted subarray."
                : activePattern === "container_water"
                ? "Container With Water: Evaluates boundary heights and moves the shorter wall inward."
                : currentStep.explanation
            }
            variables={isReadyPattern ? currentStep.variables : []}
            statusText={isReadyPattern ? currentStep.statusText : "Coming Soon"}
            statusType={isReadyPattern ? currentStep.statusType : "info"}
            timeComplexity={PATTERN_COMPLEXITIES[activePattern]?.tc}
            spaceComplexity={PATTERN_COMPLEXITIES[activePattern]?.sc}
          />
        </div>
      </div>
    </div>
  );
}

