import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './PDASimulator.module.css';

const PDA_PRESETS = {
  an_bn: {
    id: 'an_bn',
    name: "L = { aⁿ bⁿ | n ≥ 1 }",
    badge: 'Equal a-b PDA',
    description: "Matches count of 'a's and 'b's using a single stack. Pushes 'A' on each 'a', pops 'A' on each 'b'.",
    alphabet: ['a', 'b'],
    stackAlphabet: ['A', 'Z₀'],
    initialStack: 'Z₀',
    defaultString: 'aabb',
    testCases: ['ab', 'aabb', 'aaabbb', 'aab', 'abb', 'ba'],
    initialState: 'q0',
    acceptStates: ['q2'],
    simulate: (inputStr) => {
      const steps = [];
      let state = 'q0';
      let stack = ['Z₀'];
      let idx = 0;

      steps.push({
        state,
        idx,
        stack: [...stack],
        action: 'Initial configuration with stack marker Z₀.',
        status: 'running',
      });

      let stuck = false;
      let iterations = 0;
      const maxIterations = 50;

      while (iterations++ < maxIterations) {
        const char = idx < inputStr.length ? inputStr[idx] : 'ε';
        const top = stack.length > 0 ? stack[stack.length - 1] : 'EMPTY';

        if (state === 'q0') {
          if (char === 'a') {
            stack.push('A');
            idx++;
            steps.push({
              state: 'q0',
              idx,
              stack: [...stack],
              action: `Read 'a', Top of stack was '${top}' → Pushed 'A' onto stack.`,
              status: 'running',
            });
          } else if (char === 'b' && top === 'A') {
            stack.pop();
            idx++;
            state = 'q1';
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `First 'b' encountered. Top was 'A' → Popped 'A', transitioned to q₁.`,
              status: 'running',
            });
          } else {
            stuck = true;
            break;
          }
        } else if (state === 'q1') {
          if (char === 'b' && top === 'A') {
            stack.pop();
            idx++;
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `Read 'b', Top was 'A' → Popped 'A'.`,
              status: 'running',
            });
          } else if (char === 'ε' && top === 'Z₀') {
            state = 'q2';
            steps.push({
              state: 'q2',
              idx,
              stack: [...stack],
              action: `Input exhausted (ε). Top is 'Z₀' → Transitioned to final state q₂.`,
              status: 'accepted',
            });
            break;
          } else {
            stuck = true;
            break;
          }
        } else if (state === 'q2') {
          break;
        }
      }

      if (stuck || (state !== 'q2' && idx >= inputStr.length)) {
        steps.push({
          state,
          idx,
          stack: [...stack],
          action: stuck 
            ? `Undefined transition for symbol '${idx < inputStr.length ? inputStr[idx] : 'ε'}' with stack top '${stack[stack.length - 1] || 'EMPTY'}'.`
            : `Input ended in non-accepting state with un-cleared stack.`,
          status: 'rejected',
        });
      }

      return steps;
    },
  },

  palindrome_wcw: {
    id: 'palindrome_wcw',
    name: "L = { w c wᴿ | w ∈ {a, b}* }",
    badge: 'Marked Palindrome',
    description: "Recognizes palindromes with a distinct center marker 'c'. Pushes w before 'c', then verifies matching wᴿ after 'c'.",
    alphabet: ['a', 'b', 'c'],
    stackAlphabet: ['A', 'B', 'Z₀'],
    initialStack: 'Z₀',
    defaultString: 'abcba',
    testCases: ['abcba', 'abbcbba', 'aca', 'c', 'abcb', 'abcca'],
    initialState: 'q0',
    acceptStates: ['q2'],
    simulate: (inputStr) => {
      const steps = [];
      let state = 'q0';
      let stack = ['Z₀'];
      let idx = 0;

      steps.push({
        state,
        idx,
        stack: [...stack],
        action: 'Initial configuration with stack marker Z₀.',
        status: 'running',
      });

      let stuck = false;
      let iterations = 0;
      const maxIterations = 50;

      while (iterations++ < maxIterations) {
        const char = idx < inputStr.length ? inputStr[idx] : 'ε';
        const top = stack.length > 0 ? stack[stack.length - 1] : 'EMPTY';

        if (state === 'q0') {
          if (char === 'a') {
            stack.push('A');
            idx++;
            steps.push({
              state: 'q0',
              idx,
              stack: [...stack],
              action: `Read 'a' before marker → Pushed 'A' onto stack.`,
              status: 'running',
            });
          } else if (char === 'b') {
            stack.push('B');
            idx++;
            steps.push({
              state: 'q0',
              idx,
              stack: [...stack],
              action: `Read 'b' before marker → Pushed 'B' onto stack.`,
              status: 'running',
            });
          } else if (char === 'c') {
            idx++;
            state = 'q1';
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `Center marker 'c' reached. Stack preserved → Transitioned to match state q₁.`,
              status: 'running',
            });
          } else {
            stuck = true;
            break;
          }
        } else if (state === 'q1') {
          if (char === 'a' && top === 'A') {
            stack.pop();
            idx++;
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `Read 'a' matching top 'A' → Popped 'A'.`,
              status: 'running',
            });
          } else if (char === 'b' && top === 'B') {
            stack.pop();
            idx++;
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `Read 'b' matching top 'B' → Popped 'B'.`,
              status: 'running',
            });
          } else if (char === 'ε' && top === 'Z₀') {
            state = 'q2';
            steps.push({
              state: 'q2',
              idx,
              stack: [...stack],
              action: `Palindrome verified: input consumed and stack contains only Z₀ → Accepted!`,
              status: 'accepted',
            });
            break;
          } else {
            stuck = true;
            break;
          }
        } else if (state === 'q2') {
          break;
        }
      }

      if (stuck || (state !== 'q2' && idx >= inputStr.length)) {
        steps.push({
          state,
          idx,
          stack: [...stack],
          action: stuck
            ? `Mismatch: read '${idx < inputStr.length ? inputStr[idx] : 'ε'}' but stack top was '${stack[stack.length - 1] || 'EMPTY'}'.`
            : `Input ended without completing reverse palindrome matching.`,
          status: 'rejected',
        });
      }

      return steps;
    },
  },

  balanced_parentheses: {
    id: 'balanced_parentheses',
    name: "Balanced Parentheses",
    badge: "Dyck Language",
    description: "Verifies properly nested parentheses. Pushes '(' on open, pops '(' on close.",
    alphabet: ['(', ')'],
    stackAlphabet: ['(', 'Z₀'],
    initialStack: 'Z₀',
    defaultString: '(())()',
    testCases: ['(())()', '((()))', '()()', '(()', ')(', '())'],
    initialState: 'q0',
    acceptStates: ['q1'],
    simulate: (inputStr) => {
      const steps = [];
      let state = 'q0';
      let stack = ['Z₀'];
      let idx = 0;

      steps.push({
        state,
        idx,
        stack: [...stack],
        action: 'Initial configuration with stack marker Z₀.',
        status: 'running',
      });

      let stuck = false;
      let iterations = 0;
      const maxIterations = 50;

      while (iterations++ < maxIterations) {
        const char = idx < inputStr.length ? inputStr[idx] : 'ε';
        const top = stack.length > 0 ? stack[stack.length - 1] : 'EMPTY';

        if (state === 'q0') {
          if (char === '(') {
            stack.push('(');
            idx++;
            steps.push({
              state: 'q0',
              idx,
              stack: [...stack],
              action: `Read '(' → Pushed '(' onto stack.`,
              status: 'running',
            });
          } else if (char === ')' && top === '(') {
            stack.pop();
            idx++;
            steps.push({
              state: 'q0',
              idx,
              stack: [...stack],
              action: `Read ')' matching open '(' → Popped '(' from stack.`,
              status: 'running',
            });
          } else if (char === 'ε' && top === 'Z₀') {
            state = 'q1';
            steps.push({
              state: 'q1',
              idx,
              stack: [...stack],
              action: `All parentheses matched and input consumed → Transitioned to accept state q₁.`,
              status: 'accepted',
            });
            break;
          } else {
            stuck = true;
            break;
          }
        } else if (state === 'q1') {
          break;
        }
      }

      if (stuck || (state !== 'q1' && idx >= inputStr.length)) {
        steps.push({
          state,
          idx,
          stack: [...stack],
          action: stuck
            ? `Parenthesis nesting violation: encountered '${idx < inputStr.length ? inputStr[idx] : 'ε'}' with stack top '${stack[stack.length - 1] || 'EMPTY'}'.`
            : `Unmatched open parentheses left on stack.`,
          status: 'rejected',
        });
      }

      return steps;
    },
  },
};

export default function PDASimulator({ preset: initialPresetId = 'an_bn' }) {
  const [selectedPresetId, setSelectedPresetId] = useState(
    PDA_PRESETS[initialPresetId] ? initialPresetId : 'an_bn'
  );
  const activePreset = PDA_PRESETS[selectedPresetId] || PDA_PRESETS.an_bn;

  const [inputString, setInputString] = useState(activePreset.defaultString);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  // Compute simulation steps
  const simulationSteps = useMemo(() => {
    return activePreset.simulate(inputString);
  }, [activePreset, inputString]);

  // Reset step index when input or preset changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [inputString, selectedPresetId]);

  // Handle Preset switch
  const handlePresetChange = (newId) => {
    setSelectedPresetId(newId);
    setInputString(PDA_PRESETS[newId].defaultString);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Playback timer
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
      }, 700);
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
          <div className={styles.iconBox}>📥</div>
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
            {Object.values(PDA_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Test Case Chips */}
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

      {/* Interactive Simulation Grid */}
      <div className={styles.simGrid}>
        {/* Left Column: Tape + State ID */}
        <div className={styles.leftCol}>
          {/* Input Tape Track */}
          <div className={styles.tapeCard}>
            <div className={styles.sectionLabel}>
              <span>Input Tape & Reading Head</span>
              <span>Head Position: {currentStep.idx} / {inputString.length}</span>
            </div>
            <div className={styles.tapeTrack}>
              {inputString.length === 0 ? (
                <div className={`${styles.tapeCell} ${styles.tapeCellEpsilon}`}>ε</div>
              ) : (
                inputString.split('').map((char, i) => {
                  const isCurrent = i === currentStep.idx;
                  const isConsumed = i < currentStep.idx;
                  return (
                    <div
                      key={i}
                      className={`${styles.tapeCell} ${isCurrent ? styles.tapeCellCurrent : ''} ${
                        isConsumed ? styles.tapeCellConsumed : ''
                      }`}
                    >
                      {char}
                    </div>
                  );
                })
              )}
              {/* Terminal symbol / end of tape */}
              <div
                className={`${styles.tapeCell} ${
                  currentStep.idx >= inputString.length ? styles.tapeCellCurrent : ''
                } ${styles.tapeCellEpsilon}`}
              >
                ε
              </div>
            </div>
          </div>

          {/* Current State & Instantaneous Description */}
          <div className={styles.stateCard}>
            <div className={styles.sectionLabel}>
              <span>Active Control State</span>
              <span>Step {currentStepIndex + 1} of {simulationSteps.length}</span>
            </div>

            <div className={styles.statePillsRow}>
              {['q0', 'q1', 'q2'].map((st) => {
                const isActive = currentStep.state === st;
                const isAccept = activePreset.acceptStates.includes(st);
                return (
                  <div
                    key={st}
                    className={`${styles.statePill} ${isActive ? styles.statePillActive : ''}`}
                  >
                    <span>{st}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                      {isAccept ? '(Accept State)' : '(Matching)'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.idRow}>
              <span className={styles.idTag}>Instantaneous Description (ID):</span>
              <span>
                ({currentStep.state},{' '}
                {inputString.slice(currentStep.idx) || 'ε'},{' '}
                {currentStep.stack.slice().reverse().join('') || 'ε'})
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: The Visual Stack */}
        <div className={styles.stackCol}>
          <div className={styles.sectionLabel}>
            <span>Pushdown Stack</span>
            <span>Height: {currentStep.stack.length}</span>
          </div>

          <div className={styles.stackVessel}>
            {currentStep.stack.length === 0 ? (
              <div className={styles.stackEmptyMsg}>Stack is Empty (ε)</div>
            ) : (
              currentStep.stack.map((item, idx) => {
                const isTop = idx === currentStep.stack.length - 1;
                const isZ0 = item === 'Z₀';
                return (
                  <div
                    key={idx}
                    className={`${styles.stackItem} ${isTop ? styles.stackItemTop : ''} ${
                      isZ0 ? styles.stackItemZ0 : ''
                    }`}
                  >
                    <span>{item}</span>
                    {isTop && <span className={styles.stackPointer}>TOP ▲</span>}
                  </div>
                );
              })
            )}
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
              ✅ Accepted by PDA
            </div>
          )}
          {currentStep.status === 'rejected' && (
            <div className={`${styles.logStatus} ${styles.statusRejected}`}>
              ❌ Rejected by PDA
            </div>
          )}
          {currentStep.status === 'running' && (
            <div className={`${styles.logStatus} ${styles.statusRunning}`}>
              ⚡ Processing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
