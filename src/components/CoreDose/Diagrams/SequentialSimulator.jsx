import React, { useState } from 'react';
import styles from './SequentialSimulator.module.css';

/**
 * SequentialSimulator
 * Interactive Sequential Circuits & Storage Elements Simulator.
 * Features live bistable cross-coupled feedback loops, animated voltage wires,
 * clock pulse generation, and state retention.
 * Supports dedicated mode (hideTabs=true) or multi-circuit tabs.
 */

// Reusable SVG Primitives with Voltage Flow Animation
const SvgWire = ({ d, active, colorOverride, width = 3.5 }) => {
  const strokeColor = colorOverride || (active ? '#10b981' : '#475569');
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={active ? width : width - 1}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: active ? `drop-shadow(0 0 4px ${colorOverride || 'rgba(16, 185, 129, 0.7)'})` : 'none',
          transition: 'stroke 0.2s ease, filter 0.2s ease',
        }}
      />
      {active && (
        <path
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeWidth={Math.max(1.8, width - 1.5)}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 8"
          className={styles.wireFlowPulse}
          style={{ opacity: 0.9 }}
        />
      )}
    </g>
  );
};

const SvgJunction = ({ cx, cy, active, color = '#10b981' }) => (
  <circle
    cx={cx}
    cy={cy}
    r="4"
    fill={active ? color : '#64748b'}
    style={{ filter: active ? `drop-shadow(0 0 5px ${color})` : 'none' }}
  />
);

const SvgLed = ({ cx, cy, active, label, color = '#38bdf8' }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r="7"
      fill={active ? color : '#334155'}
      stroke={active ? '#f8fafc' : '#475569'}
      strokeWidth="2"
      style={{ filter: active ? `drop-shadow(0 0 8px ${color})` : 'none' }}
    />
    {label && (
      <text
        x={cx + 12}
        y={cy + 4}
        fill={active ? '#f8fafc' : '#94a3b8'}
        fontSize="11"
        fontWeight="800"
      >
        {label}
      </text>
    )}
  </g>
);

const SvgNorGate = ({ x, y, active, label = 'NOR' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      d="M 0 0 Q 14 20 0 40 Q 34 40 50 20 Q 34 0 0 0 Z"
      fill={active ? 'rgba(244, 63, 94, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#f43f5e' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.4))' : 'none' }}
    />
    <circle
      cx="54"
      cy="20"
      r="3.5"
      fill={active ? 'rgba(244, 63, 94, 0.3)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#f43f5e' : '#64748b'}
      strokeWidth="1.8"
    />
    <text x="26" y="24" fontSize="8" fontWeight="800" fill={active ? '#fb7185' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

const SvgNandGate = ({ x, y, active, label = 'NAND' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      d="M 0 0 L 25 0 A 20 20 0 0 1 25 40 L 0 40 Z"
      fill={active ? 'rgba(59, 130, 246, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#3b82f6' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' : 'none' }}
    />
    <circle
      cx="49"
      cy="20"
      r="3.5"
      fill={active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#3b82f6' : '#64748b'}
      strokeWidth="1.8"
    />
    <text x="20" y="24" fontSize="8" fontWeight="800" fill={active ? '#60a5fa' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

const SvgAndGate = ({ x, y, active, label = 'AND' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      d="M 0 0 L 25 0 A 20 20 0 0 1 25 40 L 0 40 Z"
      fill={active ? 'rgba(56, 189, 248, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#38bdf8' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))' : 'none' }}
    />
    <text x="20" y="24" fontSize="8" fontWeight="800" fill={active ? '#38bdf8' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

const SvgNotGate = ({ x, y, active, label = 'NOT' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <polygon
      points="0,4 24,16 0,28"
      fill={active ? 'rgba(244, 63, 94, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#f43f5e' : '#64748b'}
      strokeWidth="2.2"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.4))' : 'none' }}
    />
    <circle
      cx="28"
      cy="16"
      r="3.5"
      fill={active ? 'rgba(244, 63, 94, 0.3)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#f43f5e' : '#64748b'}
      strokeWidth="1.8"
    />
    <text x="9" y="19" fontSize="7" fontWeight="800" fill={active ? '#fb7185' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

// ---------------------------------------------------------------------
// 1. Active-High NOR SR Latch
// ---------------------------------------------------------------------
function NorSrLatchView() {
  const [r, setR] = useState(0);
  const [s, setS] = useState(0);
  const [qState, setQState] = useState(0); // Internal memory: default 0 (Reset state)

  // Determine physical NOR outputs:
  // Top NOR computes Q_bar = !(R | Q)
  // Bottom NOR computes Q = !(S | Q_bar)
  let qOut = qState;
  let qBarOut = qState === 1 ? 0 : 1;
  let isForbidden = false;

  if (s === 1 && r === 0) {
    qOut = 1;
    qBarOut = 0;
  } else if (s === 0 && r === 1) {
    qOut = 0;
    qBarOut = 1;
  } else if (s === 1 && r === 1) {
    // Both NOR outputs forced low!
    qOut = 0;
    qBarOut = 0;
    isForbidden = true;
  }

  const toggleInput = (pin) => {
    if (pin === 's') {
      const nextS = s === 1 ? 0 : 1;
      setS(nextS);
      if (nextS === 1 && r === 0) setQState(1);
    } else {
      const nextR = r === 1 ? 0 : 1;
      setR(nextR);
      if (nextR === 1 && s === 0) setQState(0);
    }
  };

  const topNorActive = r === 0 && qOut === 0;
  const btmNorActive = s === 0 && qBarOut === 0;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Active-High NOR SR Latch</span>
          <span className={isForbidden ? styles.hintTag : styles.stateMemoryTag}>
            {isForbidden ? '⚠️ METASTABLE HAZARD' : s === 0 && r === 0 ? '🔒 LATCHED (MEMORY)' : '⚡ LIVE STATE'}
          </span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 220" className={styles.circuitSvg}>
            {/* Input R at top */}
            <SvgWire d="M 20 45 L 230 45" active={r === 1} />
            <text x="18" y="38" fill={r === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">R={r} (Reset)</text>

            {/* Input S at bottom */}
            <SvgWire d="M 20 175 L 230 175" active={s === 1} />
            <text x="18" y="195" fill={s === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">S={s} (Set)</text>

            {/* Top NOR Gate: computes Q_bar */}
            <SvgNorGate x={230} y={35} active={topNorActive} label="NOR 1" />
            {/* Top Output Q_bar */}
            <SvgWire d="M 287.5 55 L 395 55" active={qBarOut === 1} />
            <SvgLed cx={395} cy={55} active={qBarOut === 1} label={`Q' = ${qBarOut}`} color="#fb7185" />
            <SvgJunction cx={325} cy={55} active={qBarOut === 1} color="#fb7185" />

            {/* Bottom NOR Gate: computes Q */}
            <SvgNorGate x={230} y={145} active={btmNorActive} label="NOR 2" />
            {/* Bottom Output Q */}
            <SvgWire d="M 287.5 165 L 395 165" active={qOut === 1} />
            <SvgLed cx={395} cy={165} active={qOut === 1} label={`Q = ${qOut}`} color="#38bdf8" />
            <SvgJunction cx={345} cy={165} active={qOut === 1} color="#38bdf8" />

            {/* Cross-Coupled Feedback Wire 1: From Q' down to bottom NOR top input */}
            <SvgWire d="M 325 55 L 325 105 L 180 105 L 180 155 L 230 155" active={qBarOut === 1} colorOverride={qBarOut === 1 ? '#fb7185' : undefined} />

            {/* Cross-Coupled Feedback Wire 2: From Q up to top NOR bottom input */}
            <SvgWire d="M 345 165 L 345 115 L 195 115 L 195 65 L 230 65" active={qOut === 1} colorOverride={qOut === 1 ? '#38bdf8' : undefined} />
          </svg>
        </div>

        {/* Input Toggle Buttons */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${s === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('s')}
          >
            <span className={styles.pinLabel}>Set (S):</span>
            <span className={styles.pinValue}>{s}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${r === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('r')}
          >
            <span className={styles.pinLabel}>Reset (R):</span>
            <span className={styles.pinValue}>{r}</span>
          </button>
        </div>

        {isForbidden ? (
          <div className={styles.forbiddenBanner}>
            <span>⚠️</span>
            <div>
              <strong>FORBIDDEN STATE ($S=R=1$):</strong> Both NOR outputs are forced to 0 ($Q = Q' = 0$), violating complementary output physics. If both inputs drop to 0 simultaneously, a critical race causes undefined metastability!
            </div>
          </div>
        ) : (
          <div className={styles.safeBanner}>
            <span>✅</span>
            <div>
              <strong>LATCH OPERATING MODE:</strong>{' '}
              {s === 1 && r === 0 ? 'SET (Q=1, Q\'=0)' : s === 0 && r === 1 ? 'RESET (Q=0, Q\'=1)' : `LATCHED MEMORY (Retaining Q=${qOut})`}
            </div>
          </div>
        )}
      </div>

      {/* Truth Table */}
      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>NOR SR Latch Characteristic Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>S</th>
              <th>R</th>
              <th>Q(next)</th>
              <th>Q'(next)</th>
              <th>Operating Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr className={s === 0 && r === 0 && !isForbidden ? styles.activeRow : ''}>
              <td>0</td>
              <td>0</td>
              <td>Q</td>
              <td>Q'</td>
              <td>Memory / Hold (No Change)</td>
            </tr>
            <tr className={s === 0 && r === 1 ? styles.activeRow : ''}>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>Reset (Clear)</td>
            </tr>
            <tr className={s === 1 && r === 0 ? styles.activeRow : ''}>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>Set</td>
            </tr>
            <tr className={isForbidden ? styles.activeRow : ''}>
              <td>1</td>
              <td>1</td>
              <td>0 (Invalid: Q = Q' = 0)</td>
              <td>0 (Invalid: Q = Q' = 0)</td>
              <td>Forbidden / Race Hazard</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2. Active-Low NAND S'-R' Latch
// ---------------------------------------------------------------------
function NandSrLatchView() {
  const [sBar, setSBar] = useState(1);
  const [rBar, setRBar] = useState(1);
  const [qState, setQState] = useState(0);

  let qOut = qState;
  let qBarOut = qState === 1 ? 0 : 1;
  let isForbidden = false;

  if (sBar === 0 && rBar === 1) {
    qOut = 1;
    qBarOut = 0;
  } else if (sBar === 1 && rBar === 0) {
    qOut = 0;
    qBarOut = 1;
  } else if (sBar === 0 && rBar === 0) {
    qOut = 1;
    qBarOut = 1;
    isForbidden = true;
  }

  const toggleInput = (pin) => {
    if (pin === 'sBar') {
      const nextS = sBar === 1 ? 0 : 1;
      setSBar(nextS);
      if (nextS === 0 && rBar === 1) setQState(1);
    } else {
      const nextR = rBar === 1 ? 0 : 1;
      setRBar(nextR);
      if (nextR === 0 && sBar === 1) setQState(0);
    }
  };

  const topNandActive = !(sBar === 1 && qBarOut === 1);
  const btmNandActive = !(rBar === 1 && qOut === 1);

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Active-Low NAND S'R' Latch</span>
          <span className={isForbidden ? styles.hintTag : styles.stateMemoryTag}>
            {isForbidden ? '⚠️ METASTABLE HAZARD' : sBar === 1 && rBar === 1 ? '🔒 LATCHED (MEMORY)' : '⚡ LIVE STATE'}
          </span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 220" className={styles.circuitSvg}>
            {/* Input S' at top */}
            <SvgWire d="M 20 45 L 230 45" active={sBar === 0} colorOverride={sBar === 0 ? '#38bdf8' : undefined} />
            <text x="18" y="38" fill={sBar === 0 ? '#38bdf8' : '#94a3b8'} fontSize="10" fontWeight="800">S'={sBar} (Active-Low Set)</text>

            {/* Input R' at bottom */}
            <SvgWire d="M 20 175 L 230 175" active={rBar === 0} colorOverride={rBar === 0 ? '#fb7185' : undefined} />
            <text x="18" y="195" fill={rBar === 0 ? '#fb7185' : '#94a3b8'} fontSize="10" fontWeight="800">R'={rBar} (Active-Low Reset)</text>

            {/* Top NAND Gate: computes Q */}
            <SvgNandGate x={230} y={35} active={topNandActive} label="NAND 1" />
            <SvgWire d="M 282.5 55 L 395 55" active={qOut === 1} />
            <SvgLed cx={395} cy={55} active={qOut === 1} label={`Q = ${qOut}`} color="#38bdf8" />
            <SvgJunction cx={325} cy={55} active={qOut === 1} color="#38bdf8" />

            {/* Bottom NAND Gate: computes Q_bar */}
            <SvgNandGate x={230} y={145} active={btmNandActive} label="NAND 2" />
            <SvgWire d="M 282.5 165 L 395 165" active={qBarOut === 1} />
            <SvgLed cx={395} cy={165} active={qBarOut === 1} label={`Q' = ${qBarOut}`} color="#fb7185" />
            <SvgJunction cx={345} cy={165} active={qBarOut === 1} color="#fb7185" />

            {/* Feedback Q down to bottom NAND */}
            <SvgWire d="M 325 55 L 325 105 L 180 105 L 180 155 L 230 155" active={qOut === 1} colorOverride={qOut === 1 ? '#38bdf8' : undefined} />

            {/* Feedback Q' up to top NAND */}
            <SvgWire d="M 345 165 L 345 115 L 195 115 L 195 65 L 230 65" active={qBarOut === 1} colorOverride={qBarOut === 1 ? '#fb7185' : undefined} />
          </svg>
        </div>

        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${sBar === 0 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('sBar')}
          >
            <span className={styles.pinLabel}>Set' (S_bar):</span>
            <span className={styles.pinValue}>{sBar}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${rBar === 0 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('rBar')}
          >
            <span className={styles.pinLabel}>Reset' (R_bar):</span>
            <span className={styles.pinValue}>{rBar}</span>
          </button>
        </div>

        {isForbidden ? (
          <div className={styles.forbiddenBanner}>
            <span>⚠️</span>
            <div>
              <strong>FORBIDDEN STATE ($S'=R'=0$):</strong> Both NAND outputs are forced high ($Q = Q' = 1$), destroying logical inversion. Simultaneous release to $11$ causes unpredictable oscillation!
            </div>
          </div>
        ) : (
          <div className={styles.safeBanner}>
            <span>✅</span>
            <div>
              <strong>LATCH OPERATING MODE:</strong>{' '}
              {sBar === 0 && rBar === 1 ? 'SET (Q=1)' : sBar === 1 && rBar === 0 ? 'RESET (Q=0)' : `LATCHED MEMORY (Retaining Q=${qOut})`}
            </div>
          </div>
        )}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>NAND S'R' Latch Truth Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>S'</th>
              <th>R'</th>
              <th>Q(next)</th>
              <th>Q'(next)</th>
              <th>Operating Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr className={isForbidden ? styles.activeRow : ''}>
              <td>0</td>
              <td>0</td>
              <td>1 (Invalid: Q = Q' = 1)</td>
              <td>1 (Invalid: Q = Q' = 1)</td>
              <td>Forbidden / Race Hazard</td>
            </tr>
            <tr className={sBar === 0 && rBar === 1 ? styles.activeRow : ''}>
              <td>0</td>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>Set (Active Low)</td>
            </tr>
            <tr className={sBar === 1 && rBar === 0 ? styles.activeRow : ''}>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>1</td>
              <td>Reset (Active Low)</td>
            </tr>
            <tr className={sBar === 1 && rBar === 1 && !isForbidden ? styles.activeRow : ''}>
              <td>1</td>
              <td>1</td>
              <td>Q</td>
              <td>Q'</td>
              <td>Memory / Hold (No Change)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 3. Clock-Gated SR Latch
// ---------------------------------------------------------------------
function GatedSrLatchView() {
  const [en, setEn] = useState(1);
  const [s, setS] = useState(0);
  const [r, setR] = useState(0);
  const [qState, setQState] = useState(0);

  let qOut = qState;
  let qBarOut = qState === 1 ? 0 : 1;
  let isForbidden = false;

  const effS = en === 1 ? s : 0;
  const effR = en === 1 ? r : 0;

  if (effS === 1 && effR === 0) {
    qOut = 1;
    qBarOut = 0;
  } else if (effS === 0 && effR === 1) {
    qOut = 0;
    qBarOut = 1;
  } else if (effS === 1 && effR === 1) {
    qOut = 0;
    qBarOut = 0;
    isForbidden = true;
  }

  const toggleInput = (pin) => {
    if (pin === 'en') {
      setEn(en === 1 ? 0 : 1);
    } else if (pin === 's') {
      const nextS = s === 1 ? 0 : 1;
      setS(nextS);
      if (en === 1 && nextS === 1 && r === 0) setQState(1);
    } else {
      const nextR = r === 1 ? 0 : 1;
      setR(nextR);
      if (en === 1 && nextR === 1 && s === 0) setQState(0);
    }
  };

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Clock-Gated SR Latch</span>
          <span className={en === 1 ? styles.hintTag : styles.stateMemoryTag}>
            {en === 1 ? '🔓 CLK=1 (ENABLED)' : '🔒 CLK=0 (LATCH LOCKED)'}
          </span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 540 230" className={styles.circuitSvg}>
            {/* Input S at top */}
            <SvgWire d="M 15 40 L 95 40" active={s === 1} />
            <text x="12" y="32" fill={s === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">S={s}</text>

            {/* Input EN (Clock) at middle */}
            <SvgWire d="M 15 115 L 60 115" active={en === 1} colorOverride={en === 1 ? '#38bdf8' : undefined} />
            <text x="12" y="110" fill={en === 1 ? '#38bdf8' : '#94a3b8'} fontSize="10" fontWeight="800">CLK/EN={en}</text>
            <SvgJunction cx="60" cy="115" active={en === 1} color="#38bdf8" />
            <SvgWire d="M 60 115 L 60 60 L 95 60" active={en === 1} colorOverride={en === 1 ? '#38bdf8' : undefined} />
            <SvgWire d="M 60 115 L 60 170 L 95 170" active={en === 1} colorOverride={en === 1 ? '#38bdf8' : undefined} />

            {/* Input R at bottom */}
            <SvgWire d="M 15 190 L 95 190" active={r === 1} />
            <text x="12" y="205" fill={r === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">R={r}</text>

            {/* Steering AND Gates */}
            <SvgAndGate x={95} y={30} active={effS === 1} label="AND 1" />
            <SvgWire d="M 140 50 L 275 50" active={effS === 1} />

            <SvgAndGate x={95} y={160} active={effR === 1} label="AND 2" />
            <SvgWire d="M 140 180 L 275 180" active={effR === 1} />

            {/* NOR Latch Core */}
            <SvgNorGate x={275} y={40} active={effS === 0 && qBarOut === 0} label="NOR 1" />
            <SvgWire d="M 332.5 60 L 460 60" active={qOut === 1} />
            <SvgLed cx={460} cy={60} active={qOut === 1} label={`Q = ${qOut}`} color="#38bdf8" />
            <SvgJunction cx={380} cy={60} active={qOut === 1} color="#38bdf8" />

            <SvgNorGate x={275} y={150} active={effR === 0 && qOut === 0} label="NOR 2" />
            <SvgWire d="M 332.5 170 L 460 170" active={qBarOut === 1} />
            <SvgLed cx={460} cy={170} active={qBarOut === 1} label={`Q' = ${qBarOut}`} color="#fb7185" />
            <SvgJunction cx={400} cy={170} active={qBarOut === 1} color="#fb7185" />

            {/* Feedback Q down to NOR 2 */}
            <SvgWire d="M 380 60 L 380 110 L 235 110 L 235 160 L 275 160" active={qOut === 1} colorOverride={qOut === 1 ? '#38bdf8' : undefined} />

            {/* Feedback Q' up to NOR 1 */}
            <SvgWire d="M 400 170 L 400 120 L 250 120 L 250 70 L 275 70" active={qBarOut === 1} colorOverride={qBarOut === 1 ? '#fb7185' : undefined} />
          </svg>
        </div>

        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${en === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('en')}
          >
            <span className={styles.pinLabel}>Clock / Enable:</span>
            <span className={styles.pinValue}>{en === 1 ? '1 (Active)' : '0 (Locked)'}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${s === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('s')}
          >
            <span className={styles.pinLabel}>Set (S):</span>
            <span className={styles.pinValue}>{s}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${r === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => toggleInput('r')}
          >
            <span className={styles.pinLabel}>Reset (R):</span>
            <span className={styles.pinValue}>{r}</span>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Gated SR Latch Operating Matrix</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>EN</th>
              <th>S</th>
              <th>R</th>
              <th>Q(next)</th>
              <th>State Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <tr className={en === 0 ? styles.activeRow : ''}>
              <td>0</td>
              <td>×</td>
              <td>×</td>
              <td>Q</td>
              <td>Locked / Inhibited (Zero Glitch Transmission)</td>
            </tr>
            <tr className={en === 1 && s === 0 && r === 0 ? styles.activeRow : ''}>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>Q</td>
              <td>Transparent Hold</td>
            </tr>
            <tr className={en === 1 && s === 0 && r === 1 ? styles.activeRow : ''}>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>Synchronous Reset</td>
            </tr>
            <tr className={en === 1 && s === 1 && r === 0 ? styles.activeRow : ''}>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>Synchronous Set</td>
            </tr>
            <tr className={en === 1 && s === 1 && r === 1 ? styles.activeRow : ''}>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>0*</td>
              <td>Forbidden Condition</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 4. Edge-Triggered / Pulse JK Flip-Flop
// ---------------------------------------------------------------------
function JkFlipFlopView() {
  const [j, setJ] = useState(1);
  const [k, setK] = useState(0);
  const [q, setQ] = useState(0);
  const [clkPulse, setClkPulse] = useState(false);

  const qBar = q === 1 ? 0 : 1;

  const triggerClock = () => {
    setClkPulse(true);
    setTimeout(() => setClkPulse(false), 300);

    // JK Characteristic: Q_next = J*Q' + K'*Q
    if (j === 0 && k === 0) {
      // Hold
    } else if (j === 0 && k === 1) {
      setQ(0); // Reset
    } else if (j === 1 && k === 0) {
      setQ(1); // Set
    } else if (j === 1 && k === 1) {
      setQ((prev) => (prev === 1 ? 0 : 1)); // Toggle!
    }
  };

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>JK Flip-Flop (Universal Toggle Element)</span>
          <span className={styles.hintTag}>Click Clock to Trigger Edge</span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 540 230" className={styles.circuitSvg}>
            {/* Input J at top */}
            <SvgWire d="M 15 40 L 115 40" active={j === 1} />
            <text x="12" y="32" fill={j === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">J={j}</text>

            {/* Clock Pin at center */}
            <SvgWire d="M 15 115 L 75 115" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <text x="12" y="110" fill={clkPulse ? '#fbbf24' : '#94a3b8'} fontSize="10" fontWeight="800">CLK</text>
            <SvgJunction cx="75" cy="115" active={clkPulse} color="#fbbf24" />
            <SvgWire d="M 75 115 L 75 55 L 115 55" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <SvgWire d="M 75 115 L 75 175 L 115 175" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />

            {/* Input K at bottom */}
            <SvgWire d="M 15 190 L 115 190" active={k === 1} />
            <text x="12" y="205" fill={k === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">K={k}</text>

            {/* Steering 3-input AND Gates */}
            <SvgAndGate x={115} y={30} active={j === 1 && qBar === 1} label="AND 1" />
            <SvgWire d="M 160 50 L 275 50" active={j === 1 && qBar === 1} />

            <SvgAndGate x={115} y={160} active={k === 1 && q === 1} label="AND 2" />
            <SvgWire d="M 160 180 L 275 180" active={k === 1 && q === 1} />

            {/* NOR Core */}
            <SvgNorGate x={275} y={40} active={q === 1} label="NOR 1" />
            <SvgWire d="M 332.5 60 L 460 60" active={q === 1} />
            <SvgLed cx={460} cy={60} active={q === 1} label={`Q = ${q}`} color="#38bdf8" />
            <SvgJunction cx={380} cy={60} active={q === 1} color="#38bdf8" />

            <SvgNorGate x={275} y={150} active={qBar === 1} label="NOR 2" />
            <SvgWire d="M 332.5 170 L 460 170" active={qBar === 1} />
            <SvgLed cx={460} cy={170} active={qBar === 1} label={`Q' = ${qBar}`} color="#fb7185" />
            <SvgJunction cx={400} cy={170} active={qBar === 1} color="#fb7185" />

            {/* JK Output Feedback: Q' back to top AND 1 */}
            <SvgWire d="M 400 170 L 400 220 L 95 220 L 95 48 L 115 48" active={qBar === 1} colorOverride={qBar === 1 ? '#fb7185' : undefined} />

            {/* JK Output Feedback: Q back to bottom AND 2 */}
            <SvgWire d="M 380 60 L 380 10 L 95 10 L 95 182 L 115 182" active={q === 1} colorOverride={q === 1 ? '#38bdf8' : undefined} />
          </svg>
        </div>

        <div className={styles.inputPinsRow}>
          <button type="button" className={styles.clockPulseBtn} onClick={triggerClock}>
            <span>⚡ Pulse Clock (↑ Edge)</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${j === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => setJ(j === 1 ? 0 : 1)}
          >
            <span className={styles.pinLabel}>J:</span>
            <span className={styles.pinValue}>{j}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${k === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => setK(k === 1 ? 0 : 1)}
          >
            <span className={styles.pinLabel}>K:</span>
            <span className={styles.pinValue}>{k}</span>
          </button>
        </div>

        <div className={styles.safeBanner}>
          <span>💡</span>
          <div>
            <strong>JK RESOLUTION:</strong> When J=1, K=1, the race condition is eradicated. Each clock edge strictly inverts state (Q → Q'). Characteristic Equation: Q(next) = J·Q' + K'·Q.
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>JK Flip-Flop State Transition Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>J</th>
              <th>K</th>
              <th>Q<sub>n</sub></th>
              <th>Q<sub>n+1</sub></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className={j === 0 && k === 0 ? styles.activeRow : ''}>
              <td>0</td>
              <td>0</td>
              <td>{q}</td>
              <td>{q}</td>
              <td>No Change (Hold)</td>
            </tr>
            <tr className={j === 0 && k === 1 ? styles.activeRow : ''}>
              <td>0</td>
              <td>1</td>
              <td>{q}</td>
              <td>0</td>
              <td>Reset (Clear)</td>
            </tr>
            <tr className={j === 1 && k === 0 ? styles.activeRow : ''}>
              <td>1</td>
              <td>0</td>
              <td>{q}</td>
              <td>1</td>
              <td>Set</td>
            </tr>
            <tr className={j === 1 && k === 1 ? styles.activeRow : ''}>
              <td>1</td>
              <td>1</td>
              <td>{q}</td>
              <td>{qBar}</td>
              <td>Toggle (Inversion)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 5. D Flip-Flop (Data / Delay Element)
// ---------------------------------------------------------------------
function DFlipFlopView() {
  const [d, setD] = useState(1);
  const [q, setQ] = useState(0);
  const [clkPulse, setClkPulse] = useState(false);

  const dBar = d === 1 ? 0 : 1;
  const qBar = q === 1 ? 0 : 1;

  const triggerClock = () => {
    setClkPulse(true);
    setTimeout(() => setClkPulse(false), 300);
    setQ(d); // Latches Data
  };

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>D Flip-Flop (Single-Bit Storage Core)</span>
          <span className={styles.hintTag}>Click Clock to Sample D</span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 540 230" className={styles.circuitSvg}>
            {/* Input D */}
            <SvgWire d="M 20 40 L 70 40 L 70 40 L 130 40" active={d === 1} />
            <text x="18" y="32" fill={d === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">D={d}</text>
            <SvgJunction cx="70" cy="40" active={d === 1} />

            {/* Inverter branch to R */}
            <SvgWire d="M 70 40 L 70 190 L 85 190" active={d === 1} />
            <SvgNotGate x={85} y={174} active={dBar === 1} label="NOT" />
            <SvgWire d="M 116.5 190 L 130 190" active={dBar === 1} />

            {/* Clock line */}
            <SvgWire d="M 20 115 L 75 115" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <text x="18" y="110" fill={clkPulse ? '#fbbf24' : '#94a3b8'} fontSize="10" fontWeight="800">CLK</text>
            <SvgJunction cx="75" cy="115" active={clkPulse} color="#fbbf24" />
            <SvgWire d="M 75 115 L 75 60 L 130 60" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <SvgWire d="M 75 115 L 75 170 L 130 170" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />

            {/* Steering AND gates */}
            <SvgAndGate x={130} y={30} active={d === 1} label="AND 1" />
            <SvgWire d="M 175 50 L 285 50" active={d === 1} />

            <SvgAndGate x={130} y={160} active={dBar === 1} label="AND 2" />
            <SvgWire d="M 175 180 L 285 180" active={dBar === 1} />

            {/* NOR Latch */}
            <SvgNorGate x={285} y={40} active={q === 1} label="NOR 1" />
            <SvgWire d="M 342.5 60 L 460 60" active={q === 1} />
            <SvgLed cx={460} cy={60} active={q === 1} label={`Q = ${q}`} color="#38bdf8" />
            <SvgJunction cx={390} cy={60} active={q === 1} color="#38bdf8" />

            <SvgNorGate x={285} y={150} active={qBar === 1} label="NOR 2" />
            <SvgWire d="M 342.5 170 L 460 170" active={qBar === 1} />
            <SvgLed cx={460} cy={170} active={qBar === 1} label={`Q' = ${qBar}`} color="#fb7185" />
            <SvgJunction cx={410} cy={170} active={qBar === 1} color="#fb7185" />

            {/* Feedback Q down */}
            <SvgWire d="M 390 60 L 390 110 L 245 110 L 245 160 L 285 160" active={q === 1} colorOverride={q === 1 ? '#38bdf8' : undefined} />

            {/* Feedback Q' up */}
            <SvgWire d="M 410 170 L 410 120 L 260 120 L 260 70 L 285 70" active={qBar === 1} colorOverride={qBar === 1 ? '#fb7185' : undefined} />
          </svg>
        </div>

        <div className={styles.inputPinsRow}>
          <button type="button" className={styles.clockPulseBtn} onClick={triggerClock}>
            <span>⚡ Pulse Clock (↑ Edge)</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${d === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => setD(d === 1 ? 0 : 1)}
          >
            <span className={styles.pinLabel}>Data Input (D):</span>
            <span className={styles.pinValue}>{d}</span>
          </button>
        </div>

        <div className={styles.safeBanner}>
          <span>📦</span>
          <div>
            <strong>DATA LATCHING:</strong> On the rising clock edge, the value present at D is transferred directly to output Q. Characteristic Equation: Q(next) = D.
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>D Flip-Flop Excitation & Truth Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>CLK</th>
              <th>D</th>
              <th>Q<sub>n</sub></th>
              <th>Q<sub>n+1</sub></th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>×</td>
              <td>{q}</td>
              <td>{q}</td>
              <td>Hold (No Trigger)</td>
            </tr>
            <tr className={d === 0 ? styles.activeRow : ''}>
              <td>↑</td>
              <td>0</td>
              <td>{q}</td>
              <td>0</td>
              <td>Reset (Sample 0)</td>
            </tr>
            <tr className={d === 1 ? styles.activeRow : ''}>
              <td>↑</td>
              <td>1</td>
              <td>{q}</td>
              <td>1</td>
              <td>Set (Sample 1)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 6. T Flip-Flop (Toggle / Frequency Divider)
// ---------------------------------------------------------------------
function TFlipFlopView() {
  const [t, setT] = useState(1);
  const [q, setQ] = useState(0);
  const [clkPulse, setClkPulse] = useState(false);

  const qBar = q === 1 ? 0 : 1;

  const triggerClock = () => {
    setClkPulse(true);
    setTimeout(() => setClkPulse(false), 300);
    if (t === 1) {
      setQ((prev) => (prev === 1 ? 0 : 1));
    }
  };

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>T Flip-Flop (Frequency Divider)</span>
          <span className={styles.hintTag}>Click Clock to Toggle</span>
        </div>

        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 540 230" className={styles.circuitSvg}>
            {/* Input T tied to both top and bottom */}
            <SvgWire d="M 20 115 L 60 115" active={t === 1} />
            <text x="18" y="105" fill={t === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="800">T={t}</text>
            <SvgJunction cx="60" cy="115" active={t === 1} />
            <SvgWire d="M 60 115 L 60 40 L 115 40" active={t === 1} />
            <SvgWire d="M 60 115 L 60 190 L 115 190" active={t === 1} />

            {/* Clock line */}
            <SvgWire d="M 20 145 L 80 145" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <text x="18" y="140" fill={clkPulse ? '#fbbf24' : '#94a3b8'} fontSize="10" fontWeight="800">CLK</text>
            <SvgJunction cx="80" cy="145" active={clkPulse} color="#fbbf24" />
            <SvgWire d="M 80 145 L 80 55 L 115 55" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />
            <SvgWire d="M 80 145 L 80 175 L 115 175" active={clkPulse} colorOverride={clkPulse ? '#fbbf24' : undefined} />

            {/* Steering AND gates */}
            <SvgAndGate x={115} y={30} active={t === 1 && qBar === 1} label="AND 1" />
            <SvgWire d="M 160 50 L 275 50" active={t === 1 && qBar === 1} />

            <SvgAndGate x={115} y={160} active={t === 1 && q === 1} label="AND 2" />
            <SvgWire d="M 160 180 L 275 180" active={t === 1 && q === 1} />

            {/* NOR Latch */}
            <SvgNorGate x={275} y={40} active={q === 1} label="NOR 1" />
            <SvgWire d="M 332.5 60 L 460 60" active={q === 1} />
            <SvgLed cx={460} cy={60} active={q === 1} label={`Q = ${q}`} color="#38bdf8" />
            <SvgJunction cx={380} cy={60} active={q === 1} color="#38bdf8" />

            <SvgNorGate x={275} y={150} active={qBar === 1} label="NOR 2" />
            <SvgWire d="M 332.5 170 L 460 170" active={qBar === 1} />
            <SvgLed cx={460} cy={170} active={qBar === 1} label={`Q' = ${qBar}`} color="#fb7185" />
            <SvgJunction cx={400} cy={170} active={qBar === 1} color="#fb7185" />

            {/* Feedback Q' back to top AND 1 */}
            <SvgWire d="M 400 170 L 400 220 L 95 220 L 95 48 L 115 48" active={qBar === 1} colorOverride={qBar === 1 ? '#fb7185' : undefined} />

            {/* Feedback Q back to bottom AND 2 */}
            <SvgWire d="M 380 60 L 380 10 L 95 10 L 95 182 L 115 182" active={q === 1} colorOverride={q === 1 ? '#38bdf8' : undefined} />
          </svg>
        </div>

        <div className={styles.inputPinsRow}>
          <button type="button" className={styles.clockPulseBtn} onClick={triggerClock}>
            <span>⚡ Pulse Clock (↑ Edge)</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${t === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => setT(t === 1 ? 0 : 1)}
          >
            <span className={styles.pinLabel}>Toggle Input (T):</span>
            <span className={styles.pinValue}>{t}</span>
          </button>
        </div>

        <div className={styles.safeBanner}>
          <span>🔁</span>
          <div>
            <strong>FREQUENCY DIVISION:</strong> With T=1, output Q changes state once every clock period, creating an exact divide-by-2 square wave (f_Q = f_CLK / 2). Characteristic Equation: Q(next) = T ⊕ Q.
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>T Flip-Flop Characteristic Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>CLK</th>
              <th>T</th>
              <th>Q<sub>n</sub></th>
              <th>Q<sub>n+1</sub></th>
              <th>Resulting Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className={t === 0 ? styles.activeRow : ''}>
              <td>↑</td>
              <td>0</td>
              <td>{q}</td>
              <td>{q}</td>
              <td>Hold (No Change)</td>
            </tr>
            <tr className={t === 1 ? styles.activeRow : ''}>
              <td>↑</td>
              <td>1</td>
              <td>{q}</td>
              <td>{qBar}</td>
              <td>Toggle State ($Q \leftarrow Q'$)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 7. 4-Bit Shift Register (SISO / SIPO)
// ---------------------------------------------------------------------
function ShiftRegisterView() {
  const [bits, setBits] = useState([0, 0, 0, 0]); // [Q3, Q2, Q1, Q0]
  const [din, setDin] = useState(1);
  const [pulse, setPulse] = useState(false);

  const clockShift = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 300);
    setBits(([q3, q2, q1]) => [din, q3, q2, q1]);
  };

  const resetAll = () => {
    setBits([0, 0, 0, 0]);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.sectionHeaderRow}>
        <span className={styles.sectionTitle}>4-Bit Serial-In Shift Register (SISO / SIPO)</span>
        <span className={styles.hintTag}>Click Clock to Shift Bits Right</span>
      </div>

      <div className={styles.svgWrapper}>
        <svg viewBox="0 0 620 180" className={styles.circuitSvg}>
          {/* Serial Data Input Din */}
          <SvgWire d="M 20 60 L 70 60" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
          <text x="18" y="52" fill={din === 1 ? '#38bdf8' : '#94a3b8'} fontSize="10" fontWeight="800">Din={din}</text>

          {/* Clock Rail across bottom */}
          <SvgWire d="M 20 140 L 530 140" active={pulse} colorOverride={pulse ? '#fbbf24' : undefined} />
          <text x="18" y="132" fill={pulse ? '#fbbf24' : '#94a3b8'} fontSize="10" fontWeight="800">CLK</text>

          {/* 4 D-FF Stages */}
          {[
            { idx: 3, x: 70, val: bits[0] },
            { idx: 2, x: 200, val: bits[1] },
            { idx: 1, x: 330, val: bits[2] },
            { idx: 0, x: 460, val: bits[3] },
          ].map((ff, i) => (
            <g key={ff.idx}>
              {/* D-FF Box */}
              <rect
                x={ff.x}
                y="35"
                width="75"
                height="80"
                rx="6"
                fill="rgba(15, 23, 42, 0.88)"
                stroke={ff.val === 1 ? '#38bdf8' : '#334155'}
                strokeWidth="2"
              />
              <text x={ff.x + 37} y="58" fill="#f8fafc" fontSize="11" fontWeight="900" textAnchor="middle">FF {ff.idx}</text>
              <text x={ff.x + 15} y="80" fill="#94a3b8" fontSize="9" fontWeight="700">D</text>
              <text x={ff.x + 55} y="80" fill={ff.val === 1 ? '#38bdf8' : '#64748b'} fontSize="10" fontWeight="900">Q={ff.val}</text>

              {/* Clock Tap */}
              <SvgWire d={`M ${ff.x + 25} 140 L ${ff.x + 25} 115`} active={pulse} colorOverride={pulse ? '#fbbf24' : undefined} />
              <SvgJunction cx={ff.x + 25} cy={140} active={pulse} color="#fbbf24" />

              {/* Cascading wire to next stage */}
              {i < 3 && (
                <SvgWire d={`M ${ff.x + 75} 75 L ${ff.x + 130} 75`} active={ff.val === 1} colorOverride={ff.val === 1 ? '#38bdf8' : undefined} />
              )}
            </g>
          ))}

          {/* Serial Output from FF0 */}
          <SvgWire d="M 535 75 L 585 75" active={bits[3] === 1} />
          <SvgLed cx={585} cy={75} active={bits[3] === 1} label={`Dout=${bits[3]}`} color="#38bdf8" />
        </svg>
      </div>

      <div className={styles.inputPinsRow}>
        <button type="button" className={styles.clockPulseBtn} onClick={clockShift}>
          <span>⚡ Pulse Clock (Shift ➔)</span>
        </button>
        <button
          type="button"
          className={`${styles.pinToggleBtn} ${din === 1 ? styles.pinHigh : styles.pinLow}`}
          onClick={() => setDin(din === 1 ? 0 : 1)}
        >
          <span className={styles.pinLabel}>Next Serial Bit (Din):</span>
          <span className={styles.pinValue}>{din}</span>
        </button>
        <button type="button" className={styles.pinToggleBtn} onClick={resetAll}>
          <span>Clear Register</span>
        </button>
      </div>

      <div className={styles.statePillGrid}>
        <div className={styles.statePill}>
          <span>Stored Nibble:</span>
          <span className={styles.statePillStrong}>{bits.join('')}₂ ({parseInt(bits.join(''), 2)}₁₀)</span>
        </div>
        <div className={styles.statePill}>
          <span>Q₃(MSB):</span>
          <span className={styles.statePillStrong}>{bits[0]}</span>
        </div>
        <div className={styles.statePill}>
          <span>Q₂:</span>
          <span className={styles.statePillStrong}>{bits[1]}</span>
        </div>
        <div className={styles.statePill}>
          <span>Q₁:</span>
          <span className={styles.statePillStrong}>{bits[2]}</span>
        </div>
        <div className={styles.statePill}>
          <span>Q₀(LSB / Dout):</span>
          <span className={styles.statePillStrong}>{bits[3]}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// 8. 3-Bit Synchronous Up Counter
// ---------------------------------------------------------------------
function SynchronousCounterView() {
  const [count, setCount] = useState(0); // 0 to 7
  const [pulse, setPulse] = useState(false);

  const q2 = (count >> 2) & 1;
  const q1 = (count >> 1) & 1;
  const q0 = count & 1;

  const clockCount = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 300);
    setCount((prev) => (prev + 1) % 8);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.sectionHeaderRow}>
        <span className={styles.sectionTitle}>3-Bit Synchronous Binary Up Counter (Modulo-8)</span>
        <span className={styles.hintTag}>Simultaneous Clocking: 0 Ripple Delay</span>
      </div>

      <div className={styles.svgWrapper}>
        <svg viewBox="0 0 620 180" className={styles.circuitSvg}>
          {/* Master Clock Rail running across bottom */}
          <SvgWire d="M 20 140 L 540 140" active={pulse} colorOverride={pulse ? '#fbbf24' : undefined} />
          <text x="18" y="132" fill={pulse ? '#fbbf24' : '#94a3b8'} fontSize="10" fontWeight="800">CLK</text>

          {/* 3 Flip Flop Stages: FF0 (LSB, right), FF1 (mid), FF2 (MSB, left) */}
          {[
            { idx: 0, x: 440, q: q0, label: 'FF₀ (T₀=1)' },
            { idx: 1, x: 270, q: q1, label: 'FF₁ (T₁=Q₀)' },
            { idx: 2, x: 100, q: q2, label: 'FF₂ (T₂=Q₁Q₀)' },
          ].map((ff) => (
            <g key={ff.idx}>
              <rect
                x={ff.x}
                y="35"
                width="85"
                height="80"
                rx="6"
                fill="rgba(15, 23, 42, 0.88)"
                stroke={ff.q === 1 ? '#38bdf8' : '#334155'}
                strokeWidth="2"
              />
              <text x={ff.x + 42} y="56" fill="#f8fafc" fontSize="11" fontWeight="900" textAnchor="middle">{ff.label}</text>
              <text x={ff.x + 42} y="82" fill={ff.q === 1 ? '#38bdf8' : '#64748b'} fontSize="14" fontWeight="900" textAnchor="middle">
                Q{ff.idx} = {ff.q}
              </text>

              {/* Synchronous Clock Tap */}
              <SvgWire d={`M ${ff.x + 42} 140 L ${ff.x + 42} 115`} active={pulse} colorOverride={pulse ? '#fbbf24' : undefined} />
              <SvgJunction cx={ff.x + 42} cy={140} active={pulse} color="#fbbf24" />
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.inputPinsRow}>
        <button type="button" className={styles.clockPulseBtn} onClick={clockCount}>
          <span>⚡ Pulse Clock (Increment +1)</span>
        </button>
        <button type="button" className={styles.pinToggleBtn} onClick={resetCount}>
          <span>Reset Counter (000)</span>
        </button>
      </div>

      <div className={styles.statePillGrid}>
        <div className={styles.statePill}>
          <span>Decimal State:</span>
          <span className={styles.statePillStrong}>{count}₁₀</span>
        </div>
        <div className={styles.statePill}>
          <span>Binary State Vector:</span>
          <span className={styles.statePillStrong}>{q2}{q1}{q0}₂ (Q₂Q₁Q₀)</span>
        </div>
        <div className={styles.statePill}>
          <span>Next State (on ↑CLK):</span>
          <span className={styles.statePillStrong}>{(count + 1) % 8}₁₀</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Component Barrel & Circuit Definitions
// ---------------------------------------------------------------------
const circuitComponents = {
  'sr-latch-nor': {
    id: 'sr-latch-nor',
    name: 'Active-High NOR SR Latch',
    component: NorSrLatchView,
  },
  'sr-latch-nand': {
    id: 'sr-latch-nand',
    name: "Active-Low NAND S'R' Latch",
    component: NandSrLatchView,
  },
  'gated-sr-latch': {
    id: 'gated-sr-latch',
    name: 'Clock-Gated SR Latch',
    component: GatedSrLatchView,
  },
  'jk-flip-flop': {
    id: 'jk-flip-flop',
    name: 'JK Flip-Flop (Toggle)',
    component: JkFlipFlopView,
  },
  'd-flip-flop': {
    id: 'd-flip-flop',
    name: 'D Flip-Flop (Data Latch)',
    component: DFlipFlopView,
  },
  't-flip-flop': {
    id: 't-flip-flop',
    name: 'T Flip-Flop (Divider)',
    component: TFlipFlopView,
  },
  'shift-register-4bit': {
    id: 'shift-register-4bit',
    name: '4-Bit Shift Register',
    component: ShiftRegisterView,
  },
  'synchronous-counter-3bit': {
    id: 'synchronous-counter-3bit',
    name: '3-Bit Synchronous Counter',
    component: SynchronousCounterView,
  },
};

export default function SequentialSimulator({
  circuit = 'sr-latch-nor',
  title,
  subtitle,
  hideTabs = false,
  hideHeader = false,
}) {
  const [activeTab, setActiveTab] = useState(circuit);

  const currentDef = circuitComponents[activeTab] || circuitComponents['sr-latch-nor'];
  const CurrentView = currentDef.component;

  return (
    <div className={styles.container}>
      {!hideHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>🔄</span>
            <div>
              <h3 className={styles.title}>{title || currentDef.name}</h3>
              <p className={styles.subtitle}>
                {subtitle || 'Interactive Sequential Circuit: Live Cross-Coupled Feedback & Memory Retention'}
              </p>
            </div>
          </div>
          <span className={styles.categoryBadge}>Sequential Logic</span>
        </div>
      )}

      {!hideTabs && (
        <div className={styles.tabBar}>
          {Object.values(circuitComponents).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.tabBtn} ${activeTab === item.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.contentBody}>
        <CurrentView />
      </div>
    </div>
  );
}
