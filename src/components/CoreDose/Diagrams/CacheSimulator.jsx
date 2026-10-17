import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './CacheSimulator.module.css';

const MODE_CONFIGS = {
  direct: {
    title: "Direct-Mapped Cache Hardware & Conflict Simulator",
    subtitle: "Deterministic modulo line placement: Line c = b mod N. A memory block maps to exactly one predetermined line.",
    presets: [
      {
        name: "Ping-Pong Conflict Thrashing",
        lines: 4,
        associativity: 1,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "0, 4, 0, 4, 0, 4",
        desc: "Direct Mapped (c = b mod 4). Both Block 0 and 4 collide on Line 0 (0 % 4 = 0, 4 % 4 = 0), producing 0% hit rate!"
      },
      {
        name: "Sequential Loop (0, 1, 2, 3, 0, 1)",
        lines: 4,
        associativity: 1,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "0, 1, 2, 3, 0, 1, 2, 3",
        desc: "First iteration misses 4 times (compulsory). Second loop iteration hits 100%!"
      },
      {
        name: "Strided Collisions (0, 8, 16, 24)",
        lines: 8,
        associativity: 1,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "0, 8, 16, 24, 0, 8",
        desc: "All blocks with stride 8 map to Line 0 (b mod 8 = 0), producing continuous collision misses."
      }
    ]
  },
  "fully-associative": {
    title: "Fully Associative Cache Mapping Simulator",
    subtitle: "Zero Line Index bits (Tag = Block Number). Any block can freely occupy any line across all N parallel lines.",
    presets: [
      {
        name: "Zero Conflict Elimination (0, 4, 8, 0, 4)",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 4, 8, 0, 4",
        desc: "In direct mapping, blocks 0, 4, 8 all collide on Line 0. In fully associative, each occupies an independent line with zero conflict!"
      },
      {
        name: "Capacity Eviction Threshold (0, 1, 2, 3, 4, 0)",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 1, 2, 3, 4, 0",
        desc: "Zero conflict misses occur until cache capacity (4 lines) is exhausted. Block 4 evicts LRU Block 0 (pure capacity miss)."
      },
      {
        name: "Loop Spatial & Temporal Hit Trace (0, 1, 2, 0, 1, 2)",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 1, 2, 0, 1, 2",
        desc: "Working set fits entirely in cache. 50% hit rate overall with 100% hits in the second pass."
      }
    ]
  },
  "set-associative": {
    title: "K-Way Set-Associative Mapping Simulator",
    subtitle: "Two-level placement: Block b is assigned to Set (b mod S), and can freely occupy any of the K lines within that set.",
    presets: [
      {
        name: "2-Way Set-Associative (0, 7, 0, 1, 2, 0, 7, 2)",
        lines: 4,
        associativity: 2,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 7, 0, 1, 2, 0, 7, 2",
        desc: "4 lines (2 sets of 2 lines). Even blocks go to Set 0, odd blocks go to Set 1."
      },
      {
        name: "Resolving Ping-Pong Thrashing (0, 4, 0, 4)",
        lines: 4,
        associativity: 2,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 4, 0, 4, 0, 4",
        desc: "Block 0 & 4 both map to Set 0, but 2-Way has 2 lines so BOTH stay cached -> 66% Hit Rate!"
      },
      {
        name: "4-Way Multi-Block (16 Lines, 4 Sets)",
        lines: 16,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 255, 1, 4, 3, 8, 133, 159",
        desc: "16 lines divided into 4 sets of 4 lines each."
      }
    ]
  },
  fifo: {
    title: "FIFO (First-In, First-Out) Cache Replacement Simulator",
    subtitle: "Circular queue replacement: Evicts the block that arrived earliest in chronological time, regardless of access frequency.",
    presets: [
      {
        name: "Standard 20-Reference Trace (4 Lines)",
        lines: 4,
        associativity: 4,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1",
        desc: "Standard workload trace across 4 frames. FIFO yields 10 hits and 10 misses (50% hit rate)."
      },
      {
        name: "FIFO Cyclic Thrashing (5 Blocks, 4 Lines)",
        lines: 4,
        associativity: 4,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "0, 1, 2, 3, 4, 0, 1, 2, 3, 4",
        desc: "Cyclic working set larger than capacity. Every reference causes a miss (0% hit rate) as the oldest block is evicted right before use."
      }
    ]
  },
  lru: {
    title: "LRU (Least Recently Used) Cache Replacement Simulator",
    subtitle: "Recency-driven replacement: Evicts the block unreferenced for the longest past duration. Directly leverages temporal locality.",
    presets: [
      {
        name: "Standard 20-Reference Trace (4 Lines)",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1",
        desc: "Same workload trace under LRU yields 12 hits and 8 misses (60% hit rate) — strictly outperforming FIFO!"
      },
      {
        name: "Temporal Locality Protection",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 1, 2, 5, 1, 2",
        desc: "Repeated access to blocks 1 & 2 continually refreshes their recency, protecting them from eviction."
      }
    ]
  },
  opt: {
    title: "Optimal Replacement Policy (OPT / MIN Oracle) Simulator",
    subtitle: "Clairvoyant oracle: Evicts the block whose next reference is farthest in future time. The theoretical maximum performance bound.",
    presets: [
      {
        name: "Standard 20-Reference Trace (4 Lines)",
        lines: 4,
        associativity: 4,
        policy: "OPT",
        writePolicy: "write-back",
        sequence: "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1",
        desc: "Optimal algorithm achieves the theoretical maximum hit rate (12 hits, 8 misses = 60%) with zero premature evictions."
      },
      {
        name: "Belady MIN Oracle Test (3 Lines)",
        lines: 3,
        associativity: 3,
        policy: "OPT",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "OPT yields only 7 misses compared to 9 in FIFO and 10 in LRU on the 3-frame Belady sequence."
      }
    ]
  },
  belady: {
    title: "Belady's Anomaly & Replacement Policy Simulator",
    subtitle: "Test why FIFO violates the stack inclusion property while LRU and OPT remain strictly monotonic.",
    presets: [
      {
        name: "3 Lines FIFO (9 Misses)",
        lines: 3,
        associativity: 3,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "3 lines fully associative under FIFO yields 9 misses."
      },
      {
        name: "4 Lines FIFO (10 Misses! Anomaly)",
        lines: 4,
        associativity: 4,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "Increasing to 4 lines paradoxically INCREASES misses to 10!"
      },
      {
        name: "3 Lines LRU (10 Misses)",
        lines: 3,
        associativity: 3,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "Stack algorithm with 3 lines."
      },
      {
        name: "4 Lines LRU (8 Misses - Monotonic!)",
        lines: 4,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "Stack algorithm with 4 lines decreases misses from 10 to 8!"
      }
    ]
  },
  example2: {
    title: "Worked Example 2: 2-Way Set-Associative LRU Trace",
    subtitle: "Step through the reference sequence (0, 7, 0, 1, 2, 0, 7, 2) cycle-by-cycle live.",
    presets: [
      {
        name: "Example 2 Trace (0, 7, 0, 1, 2, 0, 7, 2)",
        lines: 4,
        associativity: 2,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 7, 0, 1, 2, 0, 7, 2",
        desc: "4 lines (2 sets of 2 lines), LRU replacement."
      }
    ]
  },
  general: {
    title: "Interactive Cache Architecture & Trace Simulator",
    subtitle: "Cycle-by-cycle live hardware visualizer for Direct, Set-Associative & Fully Associative caches",
    presets: [
      {
        name: "Example 2: 2-Way LRU Trace",
        lines: 4,
        associativity: 2,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 7, 0, 1, 2, 0, 7, 2",
        desc: "4 lines (2 sets), 2-way set-associative. Trace 0, 7, 0, 1, 2, 0, 7, 2."
      },
      {
        name: "Ping-Pong Conflict Thrashing",
        lines: 4,
        associativity: 1,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "0, 4, 0, 4, 0, 4",
        desc: "Direct mapped cache. Both Block 0 and Block 4 collide on Line 0."
      },
      {
        name: "Belady's Anomaly (3 Lines FIFO)",
        lines: 3,
        associativity: 3,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "3 lines FIFO produces 9 misses."
      },
      {
        name: "Belady's Anomaly (4 Lines FIFO)",
        lines: 4,
        associativity: 4,
        policy: "FIFO",
        writePolicy: "write-back",
        sequence: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
        desc: "4 lines FIFO produces 10 misses!"
      },
      {
        name: "4-Way Set-Associative (16 Lines)",
        lines: 16,
        associativity: 4,
        policy: "LRU",
        writePolicy: "write-back",
        sequence: "0, 255, 1, 4, 3, 8, 133, 159",
        desc: "16 lines (4 sets of 4 lines)."
      }
    ]
  }
};

export default function CacheSimulator({
  mode = "general",
  title: customTitle,
  subtitle: customSubtitle,
  defaultPreset = 0,
  hideHeader = true,
  initialView = "matrix",
}) {
  const currentConfig = MODE_CONFIGS[mode] || MODE_CONFIGS.general;
  const presets = currentConfig.presets;
  const safeDefaultPreset = Math.min(defaultPreset, presets.length - 1);

  const [activePreset, setActivePreset] = useState(safeDefaultPreset);
  const [linesCount, setLinesCount] = useState(presets[safeDefaultPreset].lines);
  const [associativity, setAssociativity] = useState(presets[safeDefaultPreset].associativity);
  const [policy, setPolicy] = useState(presets[safeDefaultPreset].policy);
  const [writePolicy, setWritePolicy] = useState(presets[safeDefaultPreset].writePolicy);
  const [rawSequence, setRawSequence] = useState(presets[safeDefaultPreset].sequence);
  const effectivePolicy = mode === "fifo" ? "FIFO" : mode === "lru" ? "LRU" : mode === "opt" ? "OPT" : policy;
  const isReplacementMode = mode === "fifo" || mode === "lru" || mode === "opt" || mode === "belady";
  const shouldHideHeader = hideHeader !== false;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCustomConfig, setShowCustomConfig] = useState(false);
  const [activeView, setActiveView] = useState(initialView);
  const timerRef = useRef(null);

  // Parse sequence
  const sequence = useMemo(() => {
    return rawSequence
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '' && !isNaN(Number(s)))
      .map(Number);
  }, [rawSequence]);

  // Handle Preset Selection
  const applyPreset = (index) => {
    setActivePreset(index);
    const p = presets[index];
    setLinesCount(p.lines);
    setAssociativity(p.associativity);
    setPolicy(p.policy);
    setWritePolicy(p.writePolicy);
    setRawSequence(p.sequence);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Compute Full Execution Trace
  const simulationTrace = useMemo(() => {
    const totalLines = Number(linesCount);
    let assoc = mode === "direct" ? 1 : (mode === "fully-associative" || mode === "belady" || mode === "fifo" || mode === "lru" || mode === "opt") ? totalLines : Number(associativity);
    if (assoc > totalLines) assoc = totalLines;
    const numSets = Math.max(1, Math.floor(totalLines / assoc));
    const effectivePolicy = mode === "fifo" ? "FIFO" : mode === "lru" ? "LRU" : mode === "opt" ? "OPT" : policy;

    // Initialize cache
    let sets = [];
    for (let s = 0; s < numSets; s++) {
      let lines = [];
      for (let l = 0; l < assoc; l++) {
        lines.push({
          lineId: s * assoc + l,
          valid: false,
          dirty: false,
          tag: null,
          blockId: null,
          accessTime: -1,
          insertTime: -1
        });
      }
      sets.push(lines);
    }

    let historySeenBlocks = new Set();
    let steps = [];
    let hitsCount = 0;
    let missesCount = 0;
    let compulsoryCount = 0;
    let conflictCount = 0;
    let capacityCount = 0;

    // Initial state before cycle 0
    steps.push({
      cycle: 0,
      blockId: null,
      setIndex: null,
      tag: null,
      isHit: null,
      activeLineId: null,
      evictedBlock: null,
      missType: null,
      explanation: "Initial state: Cache is completely empty. Valid bits are 0. Click 'Step Next' to begin.",
      cacheSnapshot: JSON.parse(JSON.stringify(sets)),
      hits: 0,
      misses: 0,
      compulsory: 0,
      conflict: 0,
      capacity: 0
    });

    for (let t = 0; t < sequence.length; t++) {
      const blockId = sequence[t];
      const setIndex = blockId % numSets;
      const tag = Math.floor(blockId / numSets);
      const targetSet = sets[setIndex];

      // Check for hit
      const hitIndex = targetSet.findIndex(l => l.valid && l.tag === tag);
      const isHit = hitIndex !== -1;

      let activeLineId = null;
      let evictedBlock = null;
      let missType = null;
      let explanation = "";

      if (isHit) {
        hitsCount++;
        const line = targetSet[hitIndex];
        activeLineId = line.lineId;
        line.accessTime = t;
        if (mode === "fully-associative") {
          explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Tag = ${tag} matched in Line ${line.lineId} across all parallel comparators! Cache Hit (MRU updated).`;
        } else if (mode === "direct") {
          explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Maps to Line ${setIndex} (${blockId} mod ${numSets} = ${setIndex}), Tag = ${tag}. Hit in Line ${line.lineId}!`;
        } else {
          explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Maps to Set ${setIndex} (${blockId} mod ${numSets} = ${setIndex}), Tag = ${tag}. Hit in Line ${line.lineId}! Marked MRU.`;
        }
      } else {
        missesCount++;
        const isCompulsory = !historySeenBlocks.has(blockId);
        historySeenBlocks.add(blockId);

        // Find empty line
        const emptyIndex = targetSet.findIndex(l => !l.valid);

        if (emptyIndex !== -1) {
          // Free line available
          const line = targetSet[emptyIndex];
          activeLineId = line.lineId;
          line.valid = true;
          line.tag = tag;
          line.blockId = blockId;
          line.insertTime = t;
          line.accessTime = t;
          line.dirty = false;
          compulsoryCount++;
          missType = "Compulsory";
          if (mode === "fully-associative") {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Tag = ${tag} (Zero Index). Free Line ${line.lineId} found in associative array. COMPULSORY MISS! Placed Block ${blockId} into Line ${line.lineId}.`;
          } else {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Maps to Set ${setIndex}, Tag = ${tag}. Set ${setIndex} has empty Line ${line.lineId}. COMPULSORY MISS! Placed Block ${blockId} into Line ${line.lineId}.`;
          }
        } else {
          // Set is full: Select victim based on effectivePolicy
          let victimIndex = 0;
          if (mode === "direct" || assoc === 1) {
            victimIndex = 0; // deterministic in direct mapping
          } else if (effectivePolicy === "FIFO") {
            victimIndex = targetSet.reduce((minIdx, l, idx, arr) => l.insertTime < arr[minIdx].insertTime ? idx : minIdx, 0);
          } else if (effectivePolicy === "LRU") {
            victimIndex = targetSet.reduce((minIdx, l, idx, arr) => l.accessTime < arr[minIdx].accessTime ? idx : minIdx, 0);
          } else if (effectivePolicy === "MRU") {
            victimIndex = targetSet.reduce((maxIdx, l, idx, arr) => l.accessTime > arr[maxIdx].accessTime ? idx : maxIdx, 0);
          } else if (effectivePolicy === "OPT") {
            let farthestTime = -1;
            let chosenIdx = 0;
            for (let li = 0; li < targetSet.length; li++) {
              const resBlock = targetSet[li].blockId;
              let nextUse = Infinity;
              for (let f = t + 1; f < sequence.length; f++) {
                if (sequence[f] === resBlock) {
                  nextUse = f;
                  break;
                }
              }
              if (nextUse > farthestTime) {
                farthestTime = nextUse;
                chosenIdx = li;
              }
            }
            victimIndex = chosenIdx;
          }

          const victimLine = targetSet[victimIndex];
          activeLineId = victimLine.lineId;
          evictedBlock = victimLine.blockId;

          // Classify Miss: Compulsory vs Capacity vs Conflict
          if (isCompulsory) {
            compulsoryCount++;
            missType = "Compulsory";
          } else if (assoc === totalLines) {
            capacityCount++;
            missType = "Capacity";
          } else {
            conflictCount++;
            missType = "Conflict";
          }

          if (mode === "direct" || assoc === 1) {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Maps to Line ${victimLine.lineId} (${blockId} mod ${numSets} = ${victimLine.lineId}). Deterministic Direct Eviction! Evicting resident Block ${evictedBlock} (${missType} Miss). Replaced with Block ${blockId}.`;
          } else if (mode === "fifo") {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Cache capacity is full (${totalLines} lines)! FIFO circular queue evicts oldest Block ${evictedBlock} (arrived at cycle ${victimLine.insertTime + 1}) from Line ${victimLine.lineId}. Replaced with Block ${blockId}.`;
          } else if (mode === "lru") {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Cache capacity is full (${totalLines} lines)! LRU evicts least-recently-accessed Block ${evictedBlock} (last touched at cycle ${victimLine.accessTime + 1}) from Line ${victimLine.lineId}. Replaced with Block ${blockId}.`;
          } else if (mode === "opt") {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Cache capacity is full (${totalLines} lines)! OPT Oracle scans future references and evicts Block ${evictedBlock} from Line ${victimLine.lineId} (next used farthest in future). Replaced with Block ${blockId}.`;
          } else if (mode === "fully-associative") {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Array is 100% full (${totalLines} lines)! ${effectivePolicy} evicts resident Block ${evictedBlock} from Line ${victimLine.lineId} (CAPACITY MISS, Zero Conflicts!). Replaced with Block ${blockId}.`;
          } else {
            explanation = `Cycle ${t + 1}: CPU requests Block ${blockId}. Set ${setIndex} is full! ${effectivePolicy} evicts Block ${evictedBlock} from Line ${victimLine.lineId} (${missType} Miss). Replaced with Block ${blockId}.`;
          }

          victimLine.tag = tag;
          victimLine.blockId = blockId;
          victimLine.insertTime = t;
          victimLine.accessTime = t;
          victimLine.dirty = false;
        }
      }

      steps.push({
        cycle: t + 1,
        blockId,
        setIndex,
        tag,
        isHit,
        activeLineId,
        evictedBlock,
        missType,
        explanation,
        cacheSnapshot: JSON.parse(JSON.stringify(sets)),
        hits: hitsCount,
        misses: missesCount,
        compulsory: compulsoryCount,
        conflict: conflictCount,
        capacity: capacityCount
      });
    }

    return steps;
  }, [linesCount, associativity, policy, sequence, mode]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < simulationTrace.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 900);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, simulationTrace.length]);

  const currentSnapshot = simulationTrace[currentStep] || simulationTrace[0];
  const numSets = currentSnapshot.cacheSnapshot.length;
  const assocActual = currentSnapshot.cacheSnapshot[0].length;

  return (
    <div className={styles.container}>
      {/* Header */}
      {!shouldHideHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>⚡</span>
            <div>
              <h3 className={styles.title}>{customTitle || currentConfig.title}</h3>
              <p className={styles.subtitle}>
                {customSubtitle || currentConfig.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preset Selector */}
      {presets.length > 1 && (
        <div className={styles.presetBar}>
          <span className={styles.presetLabel}>Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={p.name}
              className={`${styles.presetBtn} ${activePreset === idx ? styles.presetBtnActive : ''}`}
              onClick={() => applyPreset(idx)}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Mode-Tailored Controls (Collapsed by default across all modes to maximize screen space) */}
      {mode !== "example2" && showCustomConfig && (
        <div className={styles.controlsPanel}>
          {/* Total Lines */}
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>Total Lines (N)</label>
            <select
              className={styles.select}
              value={linesCount}
              onChange={(e) => {
                const newLines = Number(e.target.value);
                setLinesCount(newLines);
                if (mode === "fully-associative" || mode === "belady" || mode === "fifo" || mode === "lru" || mode === "opt") {
                  setAssociativity(newLines);
                } else if (associativity > newLines) {
                  setAssociativity(newLines);
                }
                setCurrentStep(0);
                setIsPlaying(false);
              }}
            >
              {mode === "belady" || mode === "fifo" || mode === "lru" || mode === "opt" ? (
                <>
                  <option value={3}>3 Lines</option>
                  <option value={4}>4 Lines</option>
                </>
              ) : mode === "fully-associative" ? (
                <>
                  <option value={4}>4 Lines (4-Way Parallel)</option>
                  <option value={8}>8 Lines (8-Way Parallel)</option>
                </>
              ) : (
                <>
                  <option value={4}>4 Lines</option>
                  <option value={8}>8 Lines</option>
                  <option value={16}>16 Lines</option>
                </>
              )}
            </select>
          </div>

          {/* Associativity (K) - Only shown in set-associative or general mode */}
          {(mode === "set-associative" || mode === "general") && (
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Associativity (K)</label>
              <select
                className={styles.select}
                value={associativity}
                onChange={(e) => {
                  setAssociativity(Number(e.target.value));
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
              >
                {mode === "general" && <option value={1}>1-Way (Direct Mapped)</option>}
                <option value={2}>2-Way Set-Associative ({Math.max(1, Math.floor(linesCount / 2))} Sets)</option>
                {linesCount > 4 && (
                  <option value={4}>4-Way Set-Associative ({Math.max(1, Math.floor(linesCount / 4))} Sets)</option>
                )}
                {linesCount > 8 && (
                  <option value={8}>8-Way Set-Associative ({Math.max(1, Math.floor(linesCount / 8))} Sets)</option>
                )}
                <option value={linesCount}>Fully Associative ({linesCount}-Way)</option>
              </select>
            </div>
          )}

          {/* Replacement Policy - Only shown in belady or general mode */}
          {(mode === "belady" || mode === "general") && (
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Replacement Policy</label>
              <select
                className={styles.select}
                value={policy}
                onChange={(e) => {
                  setPolicy(e.target.value);
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
              >
                <option value="FIFO">FIFO (First-In, First-Out)</option>
                <option value="LRU">LRU (Least Recently Used)</option>
                <option value="MRU">MRU (Most Recently Used)</option>
                <option value="OPT">OPT (Optimal / MIN Oracle)</option>
              </select>
            </div>
          )}

          {/* Sequence Input */}
          <div className={`${styles.controlGroup} ${styles.controlGroupGrow}`}>
            <label className={styles.controlLabel}>Reference Sequence (Block Numbers)</label>
            <input
              className={styles.input}
              type="text"
              value={rawSequence}
              onChange={(e) => {
                setRawSequence(e.target.value);
                setCurrentStep(0);
                setIsPlaying(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Stepper & Playback Controls Bar */}
      <div className={styles.stepperRow}>
        <div className={styles.btnGroup}>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            title="Reset simulation to cycle 0"
          >
            ⏮ Reset
          </button>
          <button
            className={styles.actionBtn}
            disabled={currentStep === 0}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(p => Math.max(0, p - 1));
            }}
            title="Step back 1 cycle"
          >
            ◀ Step Back
          </button>
          <button
            className={`${styles.actionBtn} ${styles.primaryAction}`}
            disabled={currentStep >= simulationTrace.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(p => Math.min(simulationTrace.length - 1, p + 1));
            }}
            title="Step forward 1 cycle"
          >
            ▶ Step Next
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => setIsPlaying(!isPlaying)}
            title="Toggle playback"
          >
            {isPlaying ? "⏸ Pause" : "▶ Auto Play"}
          </button>
          <button
            className={`${styles.actionBtn} ${showCustomConfig ? styles.actionBtnActive : ''}`}
            onClick={() => setShowCustomConfig(!showCustomConfig)}
            title="Toggle custom sequence / lines settings"
          >
            ⚙️ Custom
          </button>
        </div>

        {/* Unified View Switcher: Trace Matrix vs Textbook Hardware Circuit */}
        <div className={styles.viewToggleGroup}>
          <button
            type="button"
            className={`${styles.viewToggleBtn} ${activeView === 'matrix' ? styles.viewToggleActive : ''}`}
            onClick={() => setActiveView('matrix')}
            title="Execution trace matrix (numerical problem view)"
          >
            📊 Trace Matrix
          </button>
          <button
            type="button"
            className={`${styles.viewToggleBtn} ${activeView === 'hardware' ? styles.viewToggleActive : ''}`}
            onClick={() => setActiveView('hardware')}
            title="Textbook hardware circuit diagram"
          >
            ⚡ Hardware Circuit
          </button>
        </div>

        <div className={styles.cycleCounter}>
          <span>Cycle:</span>
          <span className={styles.cycleBadge}>
            {currentStep} / {sequence.length}
          </span>
        </div>
      </div>

      {/* 📊 Cache Frame Execution Trace (All Modes) */}
      {activeView === "matrix" && (
        <div className={styles.textbookMatrixContainer}>
        <div className={styles.matrixHeaderRow}>
          <span className={styles.matrixHint}>
            Click any cycle column to inspect cache state
          </span>
          <div className={styles.matrixLegend}>
            <span className={styles.legendItem}><span className={styles.legendDotHit}></span> Hit (H)</span>
            <span className={styles.legendItem}><span className={styles.legendDotMiss}></span> Miss (M)</span>
            <span className={styles.legendItem}><span className={styles.legendDotCurrent}></span> Current (t{currentStep})</span>
          </div>
        </div>

        <div className={styles.matrixScrollWrapper}>
          <table className={styles.matrixTable}>
            <thead>
              {/* Row 1: Cycle Index (t1, t2, t3...) */}
              <tr>
                <th className={styles.matrixLabelCol}>Cycle</th>
                {sequence.map((_, idx) => (
                  <th
                    key={idx}
                    className={`${styles.matrixColHead} ${currentStep === idx + 1 ? styles.matrixActiveColHead : ''}`}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(idx + 1);
                    }}
                    title={`Cycle ${idx + 1}`}
                  >
                    t{idx + 1}
                  </th>
                ))}
              </tr>
              {/* Row 2: Reference String (Block ID) */}
              <tr>
                <th className={styles.matrixLabelCol}>Block</th>
                {sequence.map((bNum, idx) => (
                  <th
                    key={idx}
                    className={`${styles.matrixBlockHead} ${currentStep === idx + 1 ? styles.matrixActiveBlockHead : ''}`}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(idx + 1);
                    }}
                    title={`Block ${bNum}`}
                  >
                    {bNum}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Lines Rows: From Line 0 to Line N-1 */}
              {Array.from({ length: linesCount }).map((_, lIdx) => (
                <tr key={lIdx}>
                  <td className={styles.matrixLabelCol}>
                    Line {lIdx}
                  </td>
                  {sequence.map((_, cIdx) => {
                    const stepNum = cIdx + 1;
                    const stepData = simulationTrace[stepNum];
                    const isFuture = stepNum > currentStep;
                    const isCurrentCol = currentStep === stepNum;

                    const flatLines = stepData?.cacheSnapshot ? stepData.cacheSnapshot.flat() : [];
                    const lineInfo = flatLines.find(l => l.lineId === lIdx);
                    const isModifiedLine = stepData?.activeLineId === lIdx;

                    let cellClass = styles.matrixCell;
                    if (isCurrentCol) cellClass += ` ${styles.matrixCellActiveCol}`;
                    if (isFuture) cellClass += ` ${styles.matrixCellFuture}`;
                    else if (isModifiedLine && stepData?.isHit) cellClass += ` ${styles.matrixCellHit}`;
                    else if (isModifiedLine && !stepData?.isHit) cellClass += ` ${styles.matrixCellMiss}`;

                    return (
                      <td
                        key={cIdx}
                        className={cellClass}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStep(stepNum);
                        }}
                      >
                        {isFuture ? (
                          <span className={styles.matrixEmpty}>·</span>
                        ) : lineInfo?.valid ? (
                          <span className={styles.matrixBlockVal}>
                            {lineInfo.blockId}
                          </span>
                        ) : (
                          <span className={styles.matrixEmpty}>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Result Row: Hit (H) or Miss (M) */}
              <tr>
                <td className={styles.matrixLabelCol}>Result</td>
                {sequence.map((_, idx) => {
                  const stepNum = idx + 1;
                  const stepData = simulationTrace[stepNum];
                  const isFuture = stepNum > currentStep;
                  const isCurrentCol = currentStep === stepNum;
                  const isHit = stepData?.isHit;

                  let resClass = styles.matrixResCell;
                  if (isCurrentCol) resClass += ` ${styles.matrixCellActiveCol}`;
                  if (isFuture) resClass += ` ${styles.matrixCellFuture}`;
                  else if (isHit) resClass += ` ${styles.matrixResHit}`;
                  else resClass += ` ${styles.matrixResMiss}`;

                  return (
                    <td
                      key={idx}
                      className={resClass}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(stepNum);
                      }}
                    >
                      {isFuture ? "·" : isHit ? "H" : "M"}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* ⚡ Standard Textbook Hardware Architecture Circuit (All Modes) */}
      {activeView === "hardware" && (
        <div className={styles.hardwareStage}>
          {/* CPU Address Register Field Splitting */}
          <div className={styles.cpuRegisterCard}>
            <div className={styles.registerTitle}>
              CPU Address Register (Bit-Field Allocation)
            </div>
            <div className={styles.registerBitsRow}>
              {/* Tag Field */}
              <div className={`${styles.regField} ${styles.regFieldTag}`}>
                <div className={styles.regFieldHeader}>
                  <span>Tag Field</span>
                  <span className={styles.regBitsLabel}>
                    {mode === "direct" 
                      ? `${Math.max(1, 16 - Math.round(Math.log2(linesCount || 1)) - 4)} bits`
                      : (mode === "fully-associative" || isReplacementMode)
                      ? "12 bits"
                      : `${Math.max(1, 16 - Math.round(Math.log2(numSets || 1)) - 4)} bits`}
                  </span>
                </div>
                <div className={styles.regFieldVal}>
                  {currentSnapshot.blockId !== null ? `Tag ${currentSnapshot.tag}` : "—"}
                </div>
              </div>

              {/* Set / Line Index Field */}
              {(mode === "direct" || (!isReplacementMode && mode !== "fully-associative" && numSets > 1)) && (
                <div className={`${styles.regField} ${styles.regFieldIdx}`}>
                  <div className={styles.regFieldHeader}>
                    <span>{mode === "direct" ? "Line Index" : "Set Index"}</span>
                    <span className={styles.regBitsLabel}>
                      {`${Math.max(1, Math.round(Math.log2(mode === "direct" ? linesCount : numSets)))} bits (Decoder)`}
                    </span>
                  </div>
                  <div className={styles.regFieldVal}>
                    {currentSnapshot.blockId !== null 
                      ? (mode === "direct" ? `Line ${currentSnapshot.setIndex}` : `Set ${currentSnapshot.setIndex}`) 
                      : "—"}
                  </div>
                </div>
              )}

              {/* Word / Byte Offset Field */}
              <div className={`${styles.regField} ${styles.regFieldOffset}`}>
                <div className={styles.regFieldHeader}>
                  <span>Word Offset</span>
                  <span className={styles.regBitsLabel}>4 bits (Byte Select)</span>
                </div>
                <div className={styles.regFieldVal}>
                  w bits
                </div>
              </div>
            </div>
          </div>

          {/* Circuit Diagram Box */}
          <div className={styles.circuitDiagramContainer}>
            <div className={styles.circuitHeader}>
              <div className={styles.circuitTitle}>
                {mode === "direct"
                  ? "Direct Mapped Architecture: Set Decoder → Line Inspection"
                  : (mode === "fully-associative" || isReplacementMode)
                  ? `Fully Associative Architecture: Parallel CAM Array → ${linesCount} Comparators → OR Gate`
                  : `${assocActual}-Way Set Associative Architecture: Set Decoder → ${assocActual} Comparators → OR Gate`}
              </div>
              <div className={styles.circuitSubtitle}>
                {mode === "direct"
                  ? "Index bits select the unique line. Hardware comparator checks Tag match and Valid bit."
                  : (mode === "fully-associative" || isReplacementMode)
                  ? `Search tag is broadcast to all ${linesCount} lines simultaneously. Comparator hits are combined via multi-input OR gate.`
                  : `Set decoder activates Set ${currentSnapshot.setIndex !== null ? currentSnapshot.setIndex : 0}. All ${assocActual} lines within the set are compared in parallel.`}
              </div>
            </div>

            {/* Hardware Grid */}
            <div className={styles.hardwareGrid}>
              {currentSnapshot.cacheSnapshot.map((setLines, sIdx) => {
                const isTargetSet = currentStep > 0 && currentSnapshot.setIndex === sIdx;
                const isAssociativeArray = (mode === "fully-associative" || isReplacementMode);

                return (
                  <div
                    key={sIdx}
                    className={`${styles.hwSetCard} ${(!isAssociativeArray && isTargetSet) ? styles.hwSetCardActive : ''}`}
                  >
                    <div className={styles.hwSetHeader}>
                      <span className={styles.hwSetTitle}>
                        {mode === "direct"
                          ? `Line ${sIdx}`
                          : isAssociativeArray
                          ? `Unified CAM Array (${linesCount} Parallel Frames)`
                          : `Set ${sIdx} (${assocActual}-Way)`}
                      </span>
                      {isAssociativeArray ? (
                        <span className={styles.decoderActiveBadge}>⚡ PARALLEL CAM</span>
                      ) : isTargetSet ? (
                        <span className={styles.decoderActiveBadge}>⚡ DECODER ACTIVE</span>
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Standby</span>
                      )}
                    </div>

                    <div className={styles.hwLinesList}>
                      {setLines.map((line) => {
                        const isMatch = line.valid && currentSnapshot.blockId !== null && line.tag === currentSnapshot.tag && (isAssociativeArray || currentSnapshot.setIndex === sIdx);
                        const isModifiedLine = currentStep > 0 && currentSnapshot.activeLineId === line.lineId;

                        let lineRowClass = styles.hwLineRow;
                        if (isModifiedLine) {
                          lineRowClass += currentSnapshot.isHit ? ` ${styles.hwRowHit}` : ` ${styles.hwRowMiss}`;
                        }

                        return (
                          <div key={line.lineId} className={lineRowClass}>
                            <div className={styles.hwLineMeta}>
                              <span className={styles.hwLineId}>L{line.lineId}</span>
                              <span className={`${styles.hwBitBadge} ${line.valid ? styles.hwBitValid : styles.hwBitInvalid}`}>
                                V={line.valid ? 1 : 0}
                              </span>
                            </div>

                            <div className={styles.hwLineData}>
                              {line.valid ? (
                                <>
                                  <span className={styles.hwBlockBadge}>B_{line.blockId}</span>
                                  <span className={styles.hwTagBadge}>Tag:{line.tag}</span>
                                </>
                              ) : (
                                <span className={styles.hwEmptySlot}>[ Empty ]</span>
                              )}
                            </div>

                            <div className={`${styles.comparatorBox} ${isMatch ? styles.comparatorMatch : ''}`}>
                              <span className={styles.comparatorSymbol}>{isMatch ? "=" : "≠"}</span>
                              <span className={styles.comparatorStatus}>
                                {currentStep === 0 ? "IDLE" : isMatch ? "MATCH (1)" : "0"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Circuit Result Row: Multi-input OR Gate */}
            <div className={styles.circuitResultRow}>
              <div className={styles.orGateBox}>
                <span className={styles.orGateLabel}>OR-GATE (HIT LOGIC):</span>
                <span className={`${styles.orGateResult} ${currentStep === 0 ? '' : currentSnapshot.isHit ? styles.orGateHit : styles.orGateMiss}`}>
                  {currentStep === 0 ? "STANDBY" : currentSnapshot.isHit ? "CACHE HIT = 1" : "CACHE MISS = 0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stage: Reasoning & Scorecard (All Modes) */}
      <div className={styles.mainStage}>

        {/* Pedagogical Step Explanation */}
        <div className={styles.explanationConsole}>
          <div className={styles.explanationTitle}>
            <span>💡 Architectural Step Reasoning</span>
          </div>
          <p className={styles.explanationText}>
            {currentSnapshot.explanation}
          </p>
        </div>

        {/* Cumulative Scorecard / Metrics */}
        <div className={styles.metricsRow}>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{currentSnapshot.hits}</div>
            <div className={`${styles.metricLabel} ${styles.hitValue}`}>Hits</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{currentSnapshot.misses}</div>
            <div className={`${styles.metricLabel} ${styles.missValue}`}>Misses</div>
          </div>
          <div className={styles.metricCard}>
            <div className={`${styles.metricValue} ${styles.rateValue}`}>
              {currentStep > 0 ? ((currentSnapshot.hits / currentStep) * 100).toFixed(1) : 0}%
            </div>
            <div className={styles.metricLabel}>Hit Ratio</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{currentSnapshot.compulsory}</div>
            <div className={styles.metricLabel}>Compulsory</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{currentSnapshot.conflict}</div>
            <div className={styles.metricLabel}>Conflict</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{currentSnapshot.capacity}</div>
            <div className={styles.metricLabel}>Capacity</div>
          </div>
        </div>
      </div>
    </div>
  );
}
