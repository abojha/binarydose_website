import React, { useState, useEffect, useRef, useMemo } from "react";
import PlayerControls from "../PlayerControls";
import CodeSyncPanel from "../CodeSyncPanel";
import CustomDropdown from "../CustomDropdown";
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
  three_sum: { tc: "O(N²)", sc: "O(1)" },
};

export default function TwoPointersVisualizer() {
  const [activePattern, setActivePattern] = useState("two_sum");

  const [twoSumArray, setTwoSumArray] = useState([1, 3, 4, 6, 8, 11, 15]);
  const [twoSumTarget, setTwoSumTarget] = useState(14);
  const [customInputStr, setCustomInputStr] = useState("1, 3, 4, 6, 8, 11, 15");

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

  // Two Sum Steps
  const steps = useMemo(() => {
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
        { label: "sum", value: twoSumArray[0] + twoSumArray[right] },
        { label: "target", value: twoSumTarget },
      ],
      explanation: `Initialized left pointer at index 0 (val: ${twoSumArray[0]}) and right pointer at index ${right} (val: ${twoSumArray[right]}).`,
    });

    let found = false;
    while (left < right) {
      const sum = twoSumArray[left] + twoSumArray[right];

      if (sum === twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "found",
          statusText: "Match Found! 🎯",
          statusType: "success",
          codeLine: 6,
          variables: [
            { label: "left", value: `arr[${left}] = ${twoSumArray[left]}`, highlight: true },
            { label: "right", value: `arr[${right}] = ${twoSumArray[right]}`, highlight: true },
            { label: "sum", value: `${sum} == ${twoSumTarget}`, highlight: true },
          ],
          explanation: `🎯 Target pair found! arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${twoSumTarget}. Returning indices [${left}, ${right}].`,
        });
        found = true;
        break;
      } else if (sum < twoSumTarget) {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "less",
          statusText: "Advance left ➔",
          statusType: "warning",
          codeLine: 8,
          variables: [
            { label: "currentSum", value: `${sum} < ${twoSumTarget}` },
            { label: "action", value: "left += 1 (need larger sum)" },
          ],
          explanation: `arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${sum} < target (${twoSumTarget}). Sum is too small, advancing left pointer to index ${left + 1}.`,
        });
        left++;
      } else {
        generated.push({
          left,
          right,
          currentSum: sum,
          status: "greater",
          statusText: "Retract right ⬅",
          statusType: "warning",
          codeLine: 10,
          variables: [
            { label: "currentSum", value: `${sum} > ${twoSumTarget}` },
            { label: "action", value: "right -= 1 (need smaller sum)" },
          ],
          explanation: `arr[${left}] (${twoSumArray[left]}) + arr[${right}] (${twoSumArray[right]}) = ${sum} > target (${twoSumTarget}). Sum is too large, decrementing right pointer to index ${right - 1}.`,
        });
        right--;
      }
    }

    if (!found) {
      generated.push({
        left,
        right,
        currentSum: null,
        status: "not_found",
        statusText: "No Pair Found",
        statusType: "error",
        codeLine: 11,
        variables: [{ label: "result", value: "[-1, -1] (no pair found)" }],
        explanation: `Pointers met (left=${left}, right=${right}). No two elements sum to target ${twoSumTarget}.`,
      });
    }

    return generated;
  }, [twoSumArray, twoSumTarget]);

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

  return (
    <div className={layoutStyles.twoColumnGrid}>
      {/* Left Column: Visualizer Canvas & Controls */}
      <div className={layoutStyles.leftColumn}>
        {/* Consolidated Inputs & Configuration Toolbar at Top */}
        <div className={styles.configCard}>
          {/* Pattern Header Row */}
          <div className={styles.patternRow}>
            <label htmlFor="tp-pattern-select" className={styles.patternLabel}>
              Pattern:
            </label>
            <div className={styles.patternSelectWrapper}>
              <CustomDropdown
                id="tp-pattern-select"
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
                      { value: "two_sum", label: "Opposing Pointers (Two Sum)", icon: "↔️" },
                    ],
                  },
                  {
                    group: "Upcoming Patterns",
                    items: [
                      { value: "fast_slow", label: "Fast & Slow (Remove Duplicates)", icon: "🏎️", badge: "Coming Soon" },
                      { value: "three_sum", label: "Three Sum (Sorted Boundary)", icon: "📐", badge: "Coming Soon" },
                    ],
                  },
                ]}
                ariaLabel="Select Two Pointers pattern"
              />
            </div>
          </div>

          {/* Row 1: Array Input & Randomize */}
          {activePattern === "two_sum" ? (
            <>
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
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--ifm-font-color-secondary)", padding: "0.25rem 0" }}>
              💡 Switch to <strong>Opposing Pointers (Two Sum)</strong> to run live interactive array executions.
            </div>
          )}
        </div>

        {/* Visual Canvas Card */}
        <div className={styles.canvasCard}>
          {activePattern === "two_sum" ? (
            <>
              {/* Status banner with fixed height slot to avoid CLS */}
              <div className={styles.canvasStatusSlot}>
                {currentStep.status === "found" ? (
                  <div className={styles.winningBanner}>
                    🎯 Target Pair Found: arr[{currentStep.left}] ({twoSumArray[currentStep.left]}) + arr[{currentStep.right}] ({twoSumArray[currentStep.right]}) = {twoSumTarget}
                  </div>
                ) : currentStep.status === "not_found" ? (
                  <div className={styles.activePhaseHint} style={{ color: "#ef4444" }}>
                    ❌ No pair in array sums to {twoSumTarget}
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
                )}
              </div>

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
          ) : (
            <div className={styles.patternComingSoon}>
              <span style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>🛠️</span>
              <div className={styles.patternComingSoonBadge}>Pattern in Active Development</div>
              <h3 style={{ margin: "0.25rem 0", fontSize: "1.25rem", color: "var(--ifm-font-color-base)" }}>
                {activePattern === "fast_slow"
                  ? "Fast & Slow Pointers (Remove Duplicates)"
                  : "Three Sum (Sorted Boundary)"}
              </h3>
              <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--ifm-font-color-secondary)", margin: "0.5rem 0 1.25rem 0", lineHeight: 1.6 }}>
                {activePattern === "fast_slow"
                  ? "Dual-speed pointer synchronization illustrating in-place array element overwriting and Floyd's cycle detection is currently being engineered."
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
        {activePattern === "two_sum" && (
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
          activeLine={activePattern === "two_sum" ? currentStep.codeLine : 1}
          explanation={
            activePattern === "fast_slow"
              ? "Fast & Slow pointers: The slow pointer marks the boundary of unique elements, while the fast pointer explores ahead."
              : activePattern === "three_sum"
              ? "Three Sum: Fixes the first element using an outer loop, then uses two opposing pointers on the remaining sorted subarray."
              : currentStep.explanation
          }
          variables={activePattern === "two_sum" ? currentStep.variables : []}
          statusText={activePattern === "two_sum" ? currentStep.statusText : "Coming Soon"}
          statusType={activePattern === "two_sum" ? currentStep.statusType : "info"}
          timeComplexity={PATTERN_COMPLEXITIES[activePattern]?.tc}
          spaceComplexity={PATTERN_COMPLEXITIES[activePattern]?.sc}
        />
      </div>
    </div>
  );
}
