import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './TuringMachineSimulator.module.css';

const TM_PRESETS = {
  an_bn_cn: {
    id: 'an_bn_cn',
    name: "L = { aⁿ bⁿ cⁿ | n ≥ 1 }",
    badge: '3-Symbol TM Decider',
    description: "The classic language uncomputable by PDA. Solved via in-place symbol mutation: a→X, b→Y, c→Z with left/right sweeps.",
    alphabet: ['a', 'b', 'c'],
    tapeAlphabet: ['a', 'b', 'c', 'X', 'Y', 'Z', 'B'],
    defaultString: 'aabbcc',
    testCases: ['abc', 'aabbcc', 'aaabbbccc', 'aabbc', 'abcc', 'ba'],
    initialState: 'q0',
    acceptState: 'q_accept',
    rejectState: 'q_reject',
    simulate: (inputStr) => {
      const steps = [];
      // Pad tape with blanks
      const leftPad = 2;
      const rightPad = 4;
      let tape = [
        ...Array(leftPad).fill('B'),
        ...(inputStr.length > 0 ? inputStr.split('') : ['B']),
        ...Array(rightPad).fill('B'),
      ];
      let head = leftPad;
      let state = 'q0';

      const record = (action, status = 'running') => {
        // Create formatted ID: u q v
        const u = tape.slice(0, head).join('').replace(/^B+/, '') || '';
        const v = tape.slice(head).join('').replace(/B+$/, '') || 'B';
        steps.push({
          state,
          head,
          tape: [...tape],
          action,
          idStr: `${u ? u + ' ' : ''}[${state}] ${v}`,
          status,
        });
      };

      record('Initial tape configuration. Tape head points to start of input.');

      let iterations = 0;
      const maxIterations = 120;

      while (iterations++ < maxIterations) {
        if (state === 'q_accept') {
          break;
        }

        const sym = tape[head];

        if (state === 'q0') {
          if (sym === 'a') {
            tape[head] = 'X';
            head++;
            state = 'q1';
            record("Replaced 'a' with 'X', moved Right → Entered q₁.", 'running');
          } else if (sym === 'Y') {
            head++;
            state = 'q4';
            record("No more 'a's left. Scanned 'Y', verifying remaining symbols → Entered q₄.", 'running');
          } else {
            state = 'q_reject';
            record(`Unexpected symbol '${sym}' in state q₀ → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q1') {
          if (sym === 'a' || sym === 'Y') {
            head++;
            record(`Skipping '${sym}' Right in search of matching 'b' → q₁.`, 'running');
          } else if (sym === 'b') {
            tape[head] = 'Y';
            head++;
            state = 'q2';
            record("Found matching 'b', replaced with 'Y', moved Right → Entered q₂.", 'running');
          } else {
            state = 'q_reject';
            record(`Failed to find matching 'b' (saw '${sym}') → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q2') {
          if (sym === 'b' || sym === 'Z') {
            head++;
            record(`Skipping '${sym}' Right in search of matching 'c' → q₂.`, 'running');
          } else if (sym === 'c') {
            tape[head] = 'Z';
            head--;
            state = 'q3';
            record("Found matching 'c', replaced with 'Z', moved Left → Entered q₃.", 'running');
          } else {
            state = 'q_reject';
            record(`Failed to find matching 'c' (saw '${sym}') → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q3') {
          if (sym === 'a' || sym === 'b' || sym === 'Y' || sym === 'Z') {
            head--;
            record(`Rewinding Left past '${sym}' toward leftmost 'X' → q₃.`, 'running');
          } else if (sym === 'X') {
            head++;
            state = 'q0';
            record("Encountered barrier 'X', moved Right to next unmarked symbol → Entered q₀.", 'running');
          } else {
            state = 'q_reject';
            record(`Corrupted tape during rewind (saw '${sym}') → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q4') {
          if (sym === 'Y' || sym === 'Z') {
            head++;
            record(`Verifying clean tail: scanned valid '${sym}' → q₄.`, 'running');
          } else if (sym === 'B') {
            state = 'q_accept';
            record("Reached terminal Blank 'B'. All counts perfectly balanced aⁿbⁿcⁿ → ACCEPTED!", 'accepted');
            break;
          } else {
            state = 'q_reject';
            record(`Extraneous symbol '${sym}' found after matching phase → Reject.`, 'rejected');
            break;
          }
        }
      }

      if (state !== 'q_accept' && state !== 'q_reject') {
        record('Execution step threshold exceeded (infinite loop safeguard).', 'rejected');
      }

      return steps;
    },
  },

  binary_inc: {
    id: 'binary_inc',
    name: "Binary Incrementer (w + 1)",
    badge: 'Turing Transducer',
    description: "Computes serial binary addition (w + 1). Moves to LSB, flips trailing 1s to 0s, and changes the first 0 to 1.",
    alphabet: ['0', '1'],
    tapeAlphabet: ['0', '1', 'B'],
    defaultString: '1011',
    testCases: ['1011', '111', '100', '0', '1101'],
    initialState: 'q0',
    acceptState: 'q_accept',
    rejectState: 'q_reject',
    simulate: (inputStr) => {
      const steps = [];
      const leftPad = 2;
      const rightPad = 4;
      let tape = [
        ...Array(leftPad).fill('B'),
        ...(inputStr.length > 0 ? inputStr.split('') : ['0']),
        ...Array(rightPad).fill('B'),
      ];
      let head = leftPad;
      let state = 'q0';

      const record = (action, status = 'running') => {
        const u = tape.slice(0, head).join('').replace(/^B+/, '') || '';
        const v = tape.slice(head).join('').replace(/B+$/, '') || 'B';
        steps.push({
          state,
          head,
          tape: [...tape],
          action,
          idStr: `${u ? u + ' ' : ''}[${state}] ${v}`,
          status,
        });
      };

      record('Initial tape configuration. Head at most-significant bit.');

      let iterations = 0;
      const maxIterations = 80;

      while (iterations++ < maxIterations) {
        if (state === 'q_accept') break;

        const sym = tape[head];

        if (state === 'q0') {
          if (sym === '0' || sym === '1') {
            head++;
            record(`Scanning Right past bit '${sym}' toward end of number → q₀.`, 'running');
          } else if (sym === 'B') {
            head--;
            state = 'q1';
            record("Reached end of number (Blank). Moved Left to least-significant bit → Entered q₁.", 'running');
          }
        } else if (state === 'q1') {
          if (sym === '1') {
            tape[head] = '0';
            head--;
            record("Bit is '1' (carry generated): flipped to '0', moved Left → q₁.", 'running');
          } else if (sym === '0') {
            tape[head] = '1';
            state = 'q_accept';
            record("Bit is '0': flipped to '1' (carry absorbed). Computation finished → ACCEPT!", 'accepted');
            break;
          } else if (sym === 'B') {
            tape[head] = '1';
            state = 'q_accept';
            record("All bits were '1'. Added new leading '1' into blank cell → ACCEPT!", 'accepted');
            break;
          }
        }
      }

      return steps;
    },
  },

  zeros_ones: {
    id: 'zeros_ones',
    name: "L = { 0ⁿ 1ⁿ | n ≥ 1 }",
    badge: 'Equal 0-1 Decider',
    description: "Validates equal count of 0s followed by equal count of 1s. Alternates marking 0→X and 1→Y.",
    alphabet: ['0', '1'],
    tapeAlphabet: ['0', '1', 'X', 'Y', 'B'],
    defaultString: '0011',
    testCases: ['01', '0011', '000111', '001', '011', '10'],
    initialState: 'q0',
    acceptState: 'q_accept',
    rejectState: 'q_reject',
    simulate: (inputStr) => {
      const steps = [];
      const leftPad = 2;
      const rightPad = 4;
      let tape = [
        ...Array(leftPad).fill('B'),
        ...(inputStr.length > 0 ? inputStr.split('') : ['B']),
        ...Array(rightPad).fill('B'),
      ];
      let head = leftPad;
      let state = 'q0';

      const record = (action, status = 'running') => {
        const u = tape.slice(0, head).join('').replace(/^B+/, '') || '';
        const v = tape.slice(head).join('').replace(/B+$/, '') || 'B';
        steps.push({
          state,
          head,
          tape: [...tape],
          action,
          idStr: `${u ? u + ' ' : ''}[${state}] ${v}`,
          status,
        });
      };

      record('Initial configuration. Tape head points to start of input.');

      let iterations = 0;
      const maxIterations = 80;

      while (iterations++ < maxIterations) {
        if (state === 'q_accept') break;
        const sym = tape[head];

        if (state === 'q0') {
          if (sym === '0') {
            tape[head] = 'X';
            head++;
            state = 'q1';
            record("Marked '0' as 'X', moved Right in search of matching '1' → Entered q₁.", 'running');
          } else if (sym === 'Y') {
            head++;
            state = 'q3';
            record("No more '0's. Scanned 'Y', checking for trailing junk → Entered q₃.", 'running');
          } else {
            state = 'q_reject';
            record(`Illegal starting symbol '${sym}' in state q₀ → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q1') {
          if (sym === '0' || sym === 'Y') {
            head++;
            record(`Skipping '${sym}' Right → q₁.`, 'running');
          } else if (sym === '1') {
            tape[head] = 'Y';
            head--;
            state = 'q2';
            record("Found matching '1', marked as 'Y', moved Left to rewind → Entered q₂.", 'running');
          } else {
            state = 'q_reject';
            record(`Missing matching '1' for marked '0' → Reject.`, 'rejected');
            break;
          }
        } else if (state === 'q2') {
          if (sym === '0' || sym === 'Y') {
            head--;
            record(`Rewinding Left past '${sym}' toward 'X' → q₂.`, 'running');
          } else if (sym === 'X') {
            head++;
            state = 'q0';
            record("Found boundary marker 'X', moved Right to next symbol → Entered q₀.", 'running');
          }
        } else if (state === 'q3') {
          if (sym === 'Y') {
            head++;
            record("Skipping verified 'Y' Right → q₃.", 'running');
          } else if (sym === 'B') {
            state = 'q_accept';
            record("Reached terminal Blank 'B'. Perfect 0ⁿ1ⁿ match verified → ACCEPT!", 'accepted');
            break;
          } else {
            state = 'q_reject';
            record(`Found extraneous symbol '${sym}' during final sweep → Reject.`, 'rejected');
            break;
          }
        }
      }

      if (state !== 'q_accept' && state !== 'q_reject') {
        record('Execution step threshold exceeded.', 'rejected');
      }

      return steps;
    },
  },
};

export default function TuringMachineSimulator({ preset: initialPresetId = 'an_bn_cn' }) {
  const [selectedPresetId, setSelectedPresetId] = useState(
    TM_PRESETS[initialPresetId] ? initialPresetId : 'an_bn_cn'
  );
  const activePreset = TM_PRESETS[selectedPresetId] || TM_PRESETS.an_bn_cn;

  const [inputString, setInputString] = useState(activePreset.defaultString);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  const simulationSteps = useMemo(() => {
    return activePreset.simulate(inputString);
  }, [activePreset, inputString]);

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [inputString, selectedPresetId]);

  const handlePresetChange = (newId) => {
    setSelectedPresetId(newId);
    setInputString(TM_PRESETS[newId].defaultString);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= simulationSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 650);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, simulationSteps.length]);

  const currentStep = simulationSteps[currentStepIndex] || simulationSteps[0];
  const isFinished = currentStepIndex >= simulationSteps.length - 1;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>💻</div>
          <div>
            <div className={styles.titleRow}>
              <h4 className={styles.title}>{activePreset.name}</h4>
              <span className={styles.badge}>{activePreset.badge}</span>
            </div>
            <p className={styles.subtitle}>{activePreset.description}</p>
          </div>
        </div>

        <div className={styles.headerRight}>
          <select
            className={styles.presetSelect}
            value={selectedPresetId}
            onChange={(e) => handlePresetChange(e.target.value)}
          >
            {Object.values(TM_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Test Cases */}
      <div className={styles.testChips}>
        <span className={styles.testChipLabel}>Sample Inputs:</span>
        {activePreset.testCases.map((tc) => (
          <button
            key={tc}
            className={styles.testChip}
            onClick={() => {
              setInputString(tc);
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
          >
            {tc}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Input String (w):</label>
          <input
            type="text"
            className={styles.inputField}
            value={inputString}
            onChange={(e) => setInputString(e.target.value.trim())}
          />
        </div>

        <div className={styles.btnGroup}>
          <button
            className={styles.btn}
            onClick={() => setCurrentStepIndex(0)}
            disabled={currentStepIndex === 0}
            title="Reset to Start"
          >
            ⏮ Reset
          </button>
          <button
            className={styles.btn}
            onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
            disabled={currentStepIndex === 0}
            title="Previous Step"
          >
            ◀ Prev
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => {
              if (isFinished) {
                setCurrentStepIndex(0);
                setIsPlaying(true);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
          >
            {isPlaying ? '⏸ Pause' : isFinished ? '🔄 Replay' : '▶ Play'}
          </button>
          <button
            className={styles.btn}
            onClick={() => setCurrentStepIndex((p) => Math.min(simulationSteps.length - 1, p + 1))}
            disabled={isFinished}
            title="Next Step"
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Tape Workspace */}
      <div className={styles.tapeWorkspace}>
        {/* Visual Infinite Tape Ribbon */}
        <div className={styles.tapeContainer}>
          {/* Tape Track */}
          <div className={styles.tapeTrack}>
            {currentStep.tape.map((sym, i) => {
              const isActive = i === currentStep.head;
              const isBlank = sym === 'B';
              return (
                <div
                  key={i}
                  className={`${styles.tapeCell} ${isActive ? styles.tapeCellActive : ''} ${
                    isBlank ? styles.tapeCellBlank : ''
                  }`}
                >
                  {/* Floating Tape Head Marker */}
                  {isActive && (
                    <div className={styles.headMarker} style={{ position: 'absolute', top: '-34px' }}>
                      <span className={styles.headStateBadge}>{currentStep.state}</span>
                      <span className={styles.headPointer}>▼</span>
                    </div>
                  )}
                  <span>{sym}</span>
                  <span className={styles.cellIndex}>{i}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Machine Metadata Cards */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>Instantaneous Description (ID)</span>
            <div className={styles.idDisplay}>
              {currentStep.idStr}
            </div>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>Head Coordinate & Progress</span>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600 }}>
              Tape Cell: <strong style={{ color: '#fb7185' }}>{currentStep.head}</strong> | Step{' '}
              <strong style={{ color: '#38bdf8' }}>{currentStepIndex + 1}</strong> of{' '}
              {simulationSteps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Step Log & Final Status Banner */}
      <div className={styles.logBanner}>
        <div className={styles.logText}>
          <strong>Step Action:</strong> {currentStep.action}
        </div>
        <div>
          {currentStep.status === 'accepted' && (
            <div className={`${styles.logStatus} ${styles.statusAccepted}`}>
              ✅ Halts & Accepts
            </div>
          )}
          {currentStep.status === 'rejected' && (
            <div className={`${styles.logStatus} ${styles.statusRejected}`}>
              ❌ Halts & Rejects
            </div>
          )}
          {currentStep.status === 'running' && (
            <div className={`${styles.logStatus} ${styles.statusRunning}`}>
              ⚡ Tape Head Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
