import React, { useState } from 'react';
import flowStyles from './FlowDiagram.module.css';
import styles from './LogicGateSimulator.module.css';

/**
 * LogicGateSimulator
 * Interactive Vector Logic Gate & Truth Table Simulator.
 * Allows students to toggle input lines, observe live output voltage states,
 * inspect IEEE/ANSI gate symbols, and track active rows in the truth table.
 */

const GATE_DATA = {
  AND: {
    name: 'AND Gate',
    formula: 'Y = A · B',
    description: 'Output is HIGH (1) if and only if ALL inputs are HIGH (1).',
    analogy: 'Switches in Series: Current flows only when both Switch A AND Switch B are closed.',
    inputsCount: 2,
    compute: (a, b) => a & b,
    table: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
  },
  OR: {
    name: 'OR Gate',
    formula: 'Y = A + B',
    description: 'Output is HIGH (1) if at least ONE input is HIGH (1).',
    analogy: 'Switches in Parallel: Current flows if Switch A OR Switch B (or both) are closed.',
    inputsCount: 2,
    compute: (a, b) => a | b,
    table: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 1 },
    ],
  },
  NOT: {
    name: 'NOT Gate (Inverter)',
    formula: 'Y = A\'',
    description: 'Unary inverter: Inverts the binary input state (0 becomes 1, 1 becomes 0).',
    analogy: 'Shunt Switch: Closing the switch shorts the load to ground, extinguishing the output.',
    inputsCount: 1,
    compute: (a) => (a === 1 ? 0 : 1),
    table: [
      { a: 0, y: 1 },
      { a: 1, y: 0 },
    ],
  },
  NAND: {
    name: 'NAND Gate',
    formula: 'Y = (A · B)\'',
    description: 'Universal Gate: Inverted AND. Output is LOW (0) only when ALL inputs are HIGH (1).',
    analogy: 'Series switches controlling a normally-closed shunt relay.',
    inputsCount: 2,
    compute: (a, b) => ((a & b) === 1 ? 0 : 1),
    table: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
  },
  NOR: {
    name: 'NOR Gate',
    formula: 'Y = (A + B)\'',
    description: 'Universal Gate: Inverted OR. Output is HIGH (1) only when ALL inputs are LOW (0).',
    analogy: 'Parallel switches controlling a normally-closed shunt relay.',
    inputsCount: 2,
    compute: (a, b) => ((a | b) === 1 ? 0 : 1),
    table: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 0 },
    ],
  },
  XOR: {
    name: 'XOR Gate (Exclusive OR)',
    formula: 'Y = A ⊕ B',
    description: 'Odd-Parity Detector: Output is HIGH (1) if inputs are DIFFERENT.',
    analogy: 'Two-Way Staircase Switch: Toggling either switch flips the light state.',
    inputsCount: 2,
    compute: (a, b) => a ^ b,
    table: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
  },
  XNOR: {
    name: 'XNOR Gate (Equivalence)',
    formula: 'Y = A ⊙ B',
    description: 'Coincidence Detector: Output is HIGH (1) if inputs are IDENTICAL.',
    analogy: 'Equality comparator: Outputs true when A and B share the exact same logic state.',
    inputsCount: 2,
    compute: (a, b) => ((a ^ b) === 1 ? 0 : 1),
    table: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
  },
};

export default function LogicGateSimulator({
  title = "Interactive Logic Gate & Truth Table Simulator",
  subtitle = "Toggle binary inputs to observe live output voltages, IEEE vector gate symbols, and truth table tracking",
  initialGate = "AND",
  allowGateSelect = true,
}) {
  const [activeGate, setActiveGate] = useState(initialGate);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);

  const currentGate = GATE_DATA[activeGate] || GATE_DATA.AND;
  const isUnary = currentGate.inputsCount === 1;
  const currentOutput = currentGate.compute(inputA, inputB);

  // Wire styling based on logic state
  const highColor = '#10b981'; // Emerald 500
  const lowColor = '#64748b';  // Slate 500

  const wireAColor = inputA === 1 ? highColor : lowColor;
  const wireBColor = inputB === 1 ? highColor : lowColor;
  const wireOutColor = currentOutput === 1 ? highColor : lowColor;

  return (
    <div className={flowStyles.container}>
      {/* Header */}
      <div className={flowStyles.header}>
        <div className={flowStyles.headerTopRow}>
          <span className={flowStyles.titleBadge}>Digital Logic Simulator</span>
          <span className={styles.formulaBadge}>{currentGate.formula}</span>
        </div>
        {title && <h3 className={flowStyles.title}>{title}</h3>}
        {subtitle && <p className={flowStyles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.simulatorBody}>
        {/* Gate Selection Tabs */}
        {allowGateSelect && (
          <div className={styles.gateTabTrack}>
            {Object.keys(GATE_DATA).map((gateKey) => (
              <button
                key={gateKey}
                className={`${styles.gateTab} ${activeGate === gateKey ? styles.gateTabActive : ''}`}
                onClick={() => {
                  setActiveGate(gateKey);
                }}
              >
                {gateKey} Gate
              </button>
            ))}
          </div>
        )}

        {/* Sandbox Grid */}
        <div className={styles.sandboxGrid}>
          {/* Left Column: Interactive Gate Canvas */}
          <div className={styles.canvasCard}>
            <div className={styles.svgWrapper}>
              <svg viewBox="0 0 200 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                {/* Input Wire A */}
                <line x1="20" y1={isUnary ? "50" : "35"} x2="60" y2={isUnary ? "50" : "35"} stroke={wireAColor} strokeWidth="4" strokeLinecap="round" />
                <circle cx="20" cy={isUnary ? "50" : "35"} r="5" fill={wireAColor} />
                <text x="8" y={isUnary ? "54" : "39"} fill="var(--ifm-color-emphasis-700, #94a3b8)" fontSize="11" fontWeight="700">A</text>

                {/* Input Wire B (for 2-input gates) */}
                {!isUnary && (
                  <>
                    <line x1="20" y1="65" x2="60" y2="65" stroke={wireBColor} strokeWidth="4" strokeLinecap="round" />
                    <circle cx="20" cy="65" r="5" fill={wireBColor} />
                    <text x="8" y="69" fill="var(--ifm-color-emphasis-700, #94a3b8)" fontSize="11" fontWeight="700">B</text>
                  </>
                )}

                {/* Gate Body based on active type */}
                {activeGate === 'AND' && (
                  <path d="M 60 20 L 95 20 A 30 30 0 0 1 95 80 L 60 80 Z" fill="rgba(37, 99, 235, 0.15)" stroke="#3b82f6" strokeWidth="3.5" strokeLinejoin="round" />
                )}

                {activeGate === 'OR' && (
                  <path d="M 55 20 Q 75 50 55 80 Q 95 80 120 50 Q 95 20 55 20 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="3.5" strokeLinejoin="round" />
                )}

                {activeGate === 'NOT' && (
                  <>
                    <polygon points="60,25 105,50 60,75" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="3.5" strokeLinejoin="round" />
                    <circle cx="111" cy="50" r="6" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="3" />
                  </>
                )}

                {activeGate === 'NAND' && (
                  <>
                    <path d="M 60 20 L 95 20 A 30 30 0 0 1 95 80 L 60 80 Z" fill="rgba(147, 51, 234, 0.15)" stroke="#a855f7" strokeWidth="3.5" strokeLinejoin="round" />
                    <circle cx="131" cy="50" r="6" fill="rgba(147, 51, 234, 0.2)" stroke="#a855f7" strokeWidth="3" />
                  </>
                )}

                {activeGate === 'NOR' && (
                  <>
                    <path d="M 55 20 Q 75 50 55 80 Q 95 80 120 50 Q 95 20 55 20 Z" fill="rgba(217, 119, 6, 0.15)" stroke="#f59e0b" strokeWidth="3.5" strokeLinejoin="round" />
                    <circle cx="126" cy="50" r="6" fill="rgba(217, 119, 6, 0.2)" stroke="#f59e0b" strokeWidth="3" />
                  </>
                )}

                {activeGate === 'XOR' && (
                  <>
                    <path d="M 47 20 Q 67 50 47 80" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 57 20 Q 77 50 57 80 Q 97 80 122 50 Q 97 20 57 20 Z" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="3.5" strokeLinejoin="round" />
                  </>
                )}

                {activeGate === 'XNOR' && (
                  <>
                    <path d="M 47 20 Q 67 50 47 80" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 57 20 Q 77 50 57 80 Q 97 80 122 50 Q 97 20 57 20 Z" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="3.5" strokeLinejoin="round" />
                    <circle cx="128" cy="50" r="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="3" />
                  </>
                )}

                {/* Output Wire */}
                {(() => {
                  let outStartX = 125;
                  if (activeGate === 'AND') outStartX = 125;
                  if (activeGate === 'OR') outStartX = 120;
                  if (activeGate === 'NOT') outStartX = 117;
                  if (activeGate === 'NAND') outStartX = 137;
                  if (activeGate === 'NOR') outStartX = 132;
                  if (activeGate === 'XOR') outStartX = 122;
                  if (activeGate === 'XNOR') outStartX = 134;

                  return (
                    <>
                      <line x1={outStartX} y1="50" x2="175" y2="50" stroke={wireOutColor} strokeWidth="4" strokeLinecap="round" />
                      <circle cx="175" cy="50" r="5" fill={wireOutColor} />
                      <text x="183" y="54" fill="var(--ifm-color-emphasis-700, #94a3b8)" fontSize="11" fontWeight="700">Y</text>
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Input Toggle Controls */}
            <div className={styles.controlsRow}>
              <button
                className={styles.inputBtn}
                onClick={() => setInputA(inputA === 0 ? 1 : 0)}
              >
                Input A:
                <span className={`${styles.statePill} ${inputA === 1 ? styles.stateHigh : styles.stateLow}`}>
                  {inputA}
                </span>
              </button>

              {!isUnary && (
                <button
                  className={styles.inputBtn}
                  onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                >
                  Input B:
                  <span className={`${styles.statePill} ${inputB === 1 ? styles.stateHigh : styles.stateLow}`}>
                    {inputB}
                  </span>
                </button>
              )}
            </div>

            {/* Live Output Status */}
            <div className={styles.outputIndicator}>
              Output Y =
              <span className={`${styles.statePill} ${currentOutput === 1 ? styles.stateHigh : styles.stateLow}`}>
                {currentOutput}
              </span>
              <span>({currentOutput === 1 ? 'HIGH / 5V' : 'LOW / 0V'})</span>
            </div>
          </div>

          {/* Right Column: Truth Table & Operational Mechanics */}
          <div className={styles.infoCol}>
            <div className={styles.tableCard}>
              <div className={styles.cardTitle}>
                <span>📊</span> Live Truth Table
              </div>
              <table className={styles.tableElement}>
                <thead>
                  <tr>
                    <th>Input A</th>
                    {!isUnary && <th>Input B</th>}
                    <th>Output Y</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGate.table.map((row, idx) => {
                    const isActiveRow =
                      isUnary
                        ? row.a === inputA
                        : row.a === inputA && row.b === inputB;

                    return (
                      <tr key={idx} className={isActiveRow ? styles.rowActive : ''}>
                        <td>{row.a}</td>
                        {!isUnary && <td>{row.b}</td>}
                        <td>
                          <strong>{row.y}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mechanical Switch Analogy */}
            <div className={styles.analogyStrip}>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--ifm-color-emphasis-800, #e2e8f0)' }}>
                💡 Physics & Switch Analogy:
              </div>
              <div>{currentGate.analogy}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
