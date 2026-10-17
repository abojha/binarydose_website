import React, { useState, useMemo } from 'react';
import styles from './NumberSystemSimulator.module.css';

/**
 * NumberSystemSimulator
 * Interactive educational simulator for:
 * 1. Radix & Base Conversions (Binary, Octal, Decimal, Hexadecimal, Custom Base) with step-by-step division/multiplication
 * 2. 1's & 2's Complements, Subtraction, and Hardware Overflow Detection (V = C_in_msb ^ C_out_msb)
 * 3. IEEE-754 Single Precision 32-bit Floating-Point Inspector with interactive bit toggling
 */

export default function NumberSystemSimulator({
  mode = 'converter', // 'converter' | 'complements' | 'floating-point'
  hideTabs = false,
  hideHeader = false,
  categoryBadge,
  title,
  subtitle,
}) {
  const [activeTab, setActiveTab] = useState(mode);

  // Synchronize if prop changes
  React.useEffect(() => {
    if (mode) setActiveTab(mode);
  }, [mode]);

  const badgeText =
    categoryBadge ||
    (activeTab === 'floating-point' ? 'Computer Architecture 1.x' : 'Digital Logic 7.x');

  return (
    <div className={styles.container}>
      {!hideHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>
              {activeTab === 'converter' && '🔢'}
              {activeTab === 'complements' && '⚖️'}
              {activeTab === 'floating-point' && '💾'}
            </span>
            <div>
              <h3 className={styles.title}>
                {title ||
                  (activeTab === 'converter' && 'Radix & Positional Base Conversion Engine') ||
                  (activeTab === 'complements' && "r's & (r-1)'s Complement Arithmetic & Overflow Inspector") ||
                  (activeTab === 'floating-point' && 'IEEE 754 Single-Precision (32-Bit) Floating Point Inspector')}
              </h3>
              <p className={styles.subtitle}>
                {subtitle ||
                  (activeTab === 'converter' && 'Step-by-step integer division, fractional multiplication, and bit-grouping') ||
                  (activeTab === 'complements' && 'Bitwise 1’s/2’s inversion, adder columns, carry-out handling, and overflow detection') ||
                  (activeTab === 'floating-point' && 'Sign, 8-bit biased exponent, 23-bit normalized mantissa, and live bit toggles')}
              </p>
            </div>
          </div>
          <span className={styles.categoryBadge}>{badgeText}</span>
        </div>
      )}

      {!hideTabs && (
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'converter' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('converter')}
          >
            <span>🔢</span> Radix Base Converter
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'complements' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('complements')}
          >
            <span>⚖️</span> Complements & Overflow
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'floating-point' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('floating-point')}
          >
            <span>💾</span> IEEE 754 Floating-Point
          </button>
        </div>
      )}

      <div className={styles.contentBody}>
        {activeTab === 'converter' && <RadixConverterView />}
        {activeTab === 'complements' && <ComplementsView />}
        {activeTab === 'floating-point' && <FloatingPointView />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. RADIX CONVERTER VIEW
   ========================================================================= */
function RadixConverterView() {
  const [inputValue, setInputValue] = useState('42.625');
  const [sourceBase, setSourceBase] = useState(10);
  const [targetBase, setTargetBase] = useState(2);

  // Parse input into decimal number
  const decimalVal = useMemo(() => {
    try {
      const clean = inputValue.trim();
      if (!clean) return 0;
      const isNeg = clean.startsWith('-');
      const absClean = isNeg ? clean.slice(1) : clean;
      const parts = absClean.split('.');
      const intPart = parts[0] || '0';
      const fracPart = parts[1] || '';

      const intDec = parseInt(intPart, sourceBase);
      if (isNaN(intDec)) return NaN;

      let fracDec = 0;
      for (let i = 0; i < fracPart.length; i++) {
        const digitVal = parseInt(fracPart[i], sourceBase);
        if (isNaN(digitVal) || digitVal >= sourceBase) return NaN;
        fracDec += digitVal / Math.pow(sourceBase, i + 1);
      }

      const total = intDec + fracDec;
      return isNeg ? -total : total;
    } catch {
      return NaN;
    }
  }, [inputValue, sourceBase]);

  // Conversions for standard bases
  const conversions = useMemo(() => {
    if (isNaN(decimalVal)) return null;
    const abs = Math.abs(decimalVal);
    const sign = decimalVal < 0 ? '-' : '';
    const intPart = Math.floor(abs);
    const fracPart = abs - intPart;

    const convertFrac = (base, maxDigits = 8) => {
      let f = fracPart;
      let digits = '';
      for (let i = 0; i < maxDigits; i++) {
        if (f === 0) break;
        f *= base;
        const d = Math.floor(f);
        digits += d.toString(base).toUpperCase();
        f -= d;
      }
      return digits ? '.' + digits : '';
    };

    return {
      bin: sign + intPart.toString(2) + convertFrac(2),
      oct: sign + intPart.toString(8) + convertFrac(8),
      dec: sign + intPart.toString(10) + (fracPart > 0 ? ('' + fracPart).slice(1, 9) : ''),
      hex: sign + intPart.toString(16).toUpperCase() + convertFrac(16),
      custom: sign + intPart.toString(targetBase).toUpperCase() + convertFrac(targetBase),
    };
  }, [decimalVal, targetBase]);

  // Step-by-step Division (Integer Part) & Multiplication (Fractional Part)
  const steps = useMemo(() => {
    if (isNaN(decimalVal)) return { division: [], multiplication: [] };
    const abs = Math.abs(decimalVal);
    let intVal = Math.floor(abs);
    const divSteps = [];
    while (intVal > 0) {
      const q = Math.floor(intVal / targetBase);
      const rem = intVal % targetBase;
      const remChar = rem.toString(targetBase).toUpperCase();
      divSteps.push({ dividend: intVal, divisor: targetBase, quotient: q, remainder: remChar });
      intVal = q;
    }

    let fracVal = abs - Math.floor(abs);
    const mulSteps = [];
    let count = 0;
    while (fracVal > 0 && count < 8) {
      const prod = fracVal * targetBase;
      const intDigit = Math.floor(prod);
      const remFrac = +(prod - intDigit).toFixed(8);
      mulSteps.push({
        fraction: fracVal.toFixed(6),
        multiplier: targetBase,
        product: prod.toFixed(6),
        digit: intDigit.toString(targetBase).toUpperCase(),
      });
      fracVal = remFrac;
      count++;
    }

    return { division: divSteps, multiplication: mulSteps };
  }, [decimalVal, targetBase]);

  // Bit Grouping (Nibbles / Octals)
  const grouping = useMemo(() => {
    if (isNaN(decimalVal) || !conversions) return null;
    const absInt = Math.floor(Math.abs(decimalVal));
    const binStr = absInt.toString(2);
    // Pad to multiple of 4 for Hex
    const padHexLen = (4 - (binStr.length % 4)) % 4;
    const paddedHexBin = '0'.repeat(padHexLen) + binStr;
    const hexNibbles = [];
    for (let i = 0; i < paddedHexBin.length; i += 4) {
      const nib = paddedHexBin.slice(i, i + 4);
      hexNibbles.push({ bits: nib, digit: parseInt(nib, 2).toString(16).toUpperCase() });
    }

    // Pad to multiple of 3 for Octal
    const padOctLen = (3 - (binStr.length % 3)) % 3;
    const paddedOctBin = '0'.repeat(padOctLen) + binStr;
    const octGroups = [];
    for (let i = 0; i < paddedOctBin.length; i += 3) {
      const grp = paddedOctBin.slice(i, i + 3);
      octGroups.push({ bits: grp, digit: parseInt(grp, 2).toString(8) });
    }

    return { hexNibbles, octGroups };
  }, [decimalVal, conversions]);

  return (
    <div>
      {/* Control Row */}
      <div className={styles.controlRow}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Input Number</label>
          <input
            type="text"
            className={styles.textInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. 42.625"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Source Base</label>
          <select
            className={styles.selectInput}
            value={sourceBase}
            onChange={(e) => setSourceBase(Number(e.target.value))}
          >
            <option value={2}>Base 2 (Binary)</option>
            <option value={8}>Base 8 (Octal)</option>
            <option value={10}>Base 10 (Decimal)</option>
            <option value={16}>Base 16 (Hexadecimal)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Target Base for Steps</label>
          <select
            className={styles.selectInput}
            value={targetBase}
            onChange={(e) => setTargetBase(Number(e.target.value))}
          >
            <option value={2}>Base 2 (Binary)</option>
            <option value={8}>Base 8 (Octal)</option>
            <option value={16}>Base 16 (Hex)</option>
            <option value={5}>Base 5 (Quinary)</option>
            <option value={12}>Base 12 (Duodecimal)</option>
          </select>
        </div>

        <div className={styles.inputGroup} style={{ flex: '1 1 100%' }}>
          <label className={styles.inputLabel}>Quick Presets</label>
          <div className={styles.presetGroup}>
            {['42.625', '255', '1024', '0.1', '13.375', '37'].map((p) => (
              <button
                key={p}
                className={styles.presetBtn}
                onClick={() => {
                  setInputValue(p);
                  setSourceBase(10);
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isNaN(decimalVal) ? (
        <div className={`${styles.statusBanner} ${styles.statusDanger}`}>
          ⚠️ Invalid input format for selected Base {sourceBase}. Please enter valid digits.
        </div>
      ) : (
        <>
          {/* Base Cards Grid */}
          <div className={styles.baseGrid}>
            <div className={styles.baseCard}>
              <div className={styles.baseHeader}>
                <span className={styles.baseTitle}>Binary</span>
                <span className={styles.radixSub}>Base 2</span>
              </div>
              <div className={styles.baseValue}>{conversions.bin}</div>
              <div className={styles.baseSubtext}>Bits (0, 1)</div>
            </div>

            <div className={styles.baseCard}>
              <div className={styles.baseHeader}>
                <span className={styles.baseTitle}>Octal</span>
                <span className={styles.radixSub}>Base 8</span>
              </div>
              <div className={styles.baseValue}>{conversions.oct}</div>
              <div className={styles.baseSubtext}>Digits (0–7)</div>
            </div>

            <div className={styles.baseCard}>
              <div className={styles.baseHeader}>
                <span className={styles.baseTitle}>Decimal</span>
                <span className={styles.radixSub}>Base 10</span>
              </div>
              <div className={styles.baseValue}>{conversions.dec}</div>
              <div className={styles.baseSubtext}>Standard Base</div>
            </div>

            <div className={styles.baseCard}>
              <div className={styles.baseHeader}>
                <span className={styles.baseTitle}>Hexadecimal</span>
                <span className={styles.radixSub}>Base 16</span>
              </div>
              <div className={styles.baseValue}>{conversions.hex}</div>
              <div className={styles.baseSubtext}>Digits (0–9, A–F)</div>
            </div>
          </div>

          {/* Grouping Breakdown (4-bit nibbles to Hex, 3-bit to Octal) */}
          {grouping && (
            <div className={styles.groupingBox}>
              <div className={styles.groupingTitle}>
                <span>💡</span> Direct Power-of-Two Bit Grouping (Binary ↔ Hex / Octal)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                    <strong>4-Bit Nibbles to Hexadecimal:</strong> (padded on left with 0s)
                  </div>
                  <div className={styles.nibbleRow}>
                    {grouping.hexNibbles.map((item, idx) => (
                      <div key={idx} className={styles.nibbleCard}>
                        <span className={styles.nibbleBits}>{item.bits}</span>
                        <span className={styles.nibbleDigit}>0x{item.digit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                    <strong>3-Bit Groups to Octal:</strong> (padded on left with 0s)
                  </div>
                  <div className={styles.nibbleRow}>
                    {grouping.octGroups.map((item, idx) => (
                      <div key={idx} className={styles.nibbleCard}>
                        <span className={styles.nibbleBits} style={{ color: '#a5b4fc' }}>
                          {item.bits}
                        </span>
                        <span className={styles.nibbleDigit} style={{ color: '#34d399' }}>
                          O{item.digit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Derivation Breakdown */}
          <div className={styles.stepsContainer}>
            {/* Division Steps */}
            <div className={styles.stepSection}>
              <div className={styles.stepTitle}>
                <span>Integer: Successive Division by {targetBase}</span>
                <span className={styles.stepBadge}>LSB to MSB (Bottom to Top)</span>
              </div>
              {steps.division.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Integer part is 0</div>
              ) : (
                <table className={styles.stepsTable}>
                  <thead>
                    <tr>
                      <th>Dividend</th>
                      <th>Divisor</th>
                      <th>Quotient</th>
                      <th>Remainder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {steps.division.map((s, idx) => (
                      <tr key={idx}>
                        <td>{s.dividend}</td>
                        <td>÷ {s.divisor}</td>
                        <td>{s.quotient}</td>
                        <td className={styles.highlightCell}>{s.remainder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className={styles.arrowIndicator}>
                <span>⬆ Read remainders from bottom to top!</span>
              </div>
            </div>

            {/* Multiplication Steps */}
            <div className={styles.stepSection}>
              <div className={styles.stepTitle}>
                <span>Fraction: Successive Multiplication by {targetBase}</span>
                <span className={styles.stepBadge}>MSB to LSB (Top to Bottom)</span>
              </div>
              {steps.multiplication.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No fractional part</div>
              ) : (
                <table className={styles.stepsTable}>
                  <thead>
                    <tr>
                      <th>Fraction</th>
                      <th>Multiplier</th>
                      <th>Product</th>
                      <th>Integer Part</th>
                    </tr>
                  </thead>
                  <tbody>
                    {steps.multiplication.map((s, idx) => (
                      <tr key={idx}>
                        <td>{s.fraction}</td>
                        <td>× {s.multiplier}</td>
                        <td>{s.product}</td>
                        <td className={styles.highlightCell}>{s.digit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className={styles.arrowIndicator}>
                <span>⬇ Read integer parts from top to bottom!</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   2. COMPLEMENTS & OVERFLOW VIEW
   ========================================================================= */
function ComplementsView() {
  const [bitWidth, setBitWidth] = useState(8); // 4, 8, 16
  const [valA, setValA] = useState(42);
  const [valB, setValB] = useState(15);
  const [operation, setOperation] = useState('subtract'); // 'add' | 'subtract'

  // Min and max signed bounds for bitWidth
  const minVal = -Math.pow(2, bitWidth - 1);
  const maxVal = Math.pow(2, bitWidth - 1) - 1;

  // Convert signed integer to 2's complement binary array
  const toBits = (val, width) => {
    let u = val < 0 ? (1 << width) + val : val;
    u = u & ((1 << width) - 1);
    const bits = [];
    for (let i = width - 1; i >= 0; i--) {
      bits.push((u >> i) & 1);
    }
    return bits;
  };

  const bitsA = useMemo(() => toBits(valA, bitWidth), [valA, bitWidth]);
  const bitsB = useMemo(() => toBits(valB, bitWidth), [valB, bitWidth]);

  // 1's complement of B: flip all bits
  const onesCompB = useMemo(() => bitsB.map((b) => (b === 1 ? 0 : 1)), [bitsB]);

  // 2's complement of B: 1's comp + 1
  const twosCompB = useMemo(() => toBits(-valB, bitWidth), [valB, bitWidth]);

  // Operand B used in adder
  const adderB = operation === 'subtract' ? twosCompB : bitsB;

  // Full-adder bit-by-bit calculation
  const additionResult = useMemo(() => {
    const carries = new Array(bitWidth + 1).fill(0);
    const sumBits = new Array(bitWidth).fill(0);

    let carry = 0;
    for (let i = bitWidth - 1; i >= 0; i--) {
      carries[i + 1] = carry;
      const bitA = bitsA[i];
      const bitB = adderB[i];
      const total = bitA + bitB + carry;
      sumBits[i] = total % 2;
      carry = Math.floor(total / 2);
    }
    carries[0] = carry;

    const cInMsb = carries[1];
    const cOutMsb = carries[0];
    const isOverflow = (cInMsb ^ cOutMsb) === 1;

    // Numerical sum in 2's complement
    let decSum = 0;
    if (sumBits[0] === 1) {
      // Negative
      decSum = -Math.pow(2, bitWidth - 1);
      for (let i = 1; i < bitWidth; i++) {
        decSum += sumBits[i] * Math.pow(2, bitWidth - 1 - i);
      }
    } else {
      for (let i = 0; i < bitWidth; i++) {
        decSum += sumBits[i] * Math.pow(2, bitWidth - 1 - i);
      }
    }

    const mathematicalExpected = operation === 'subtract' ? valA - valB : valA + valB;

    return {
      carries,
      sumBits,
      cInMsb,
      cOutMsb,
      isOverflow,
      decSum,
      mathematicalExpected,
    };
  }, [bitsA, adderB, bitWidth, operation, valA, valB]);

  return (
    <div>
      <div className={styles.controlRow}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Bit Width (N)</label>
          <select
            className={styles.selectInput}
            value={bitWidth}
            onChange={(e) => setBitWidth(Number(e.target.value))}
          >
            <option value={4}>4-Bit (Range: -8 to +7)</option>
            <option value={8}>8-Bit (Range: -128 to +127)</option>
            <option value={16}>16-Bit (Range: -32768 to +32767)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Operand A (Decimal)</label>
          <input
            type="number"
            className={styles.textInput}
            value={valA}
            min={minVal}
            max={maxVal}
            onChange={(e) => setValA(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Operation</label>
          <select
            className={styles.selectInput}
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="subtract">A - B (via A + 2's Comp of B)</option>
            <option value="add">A + B (Standard 2's Comp Addition)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Operand B (Decimal)</label>
          <input
            type="number"
            className={styles.textInput}
            value={valB}
            min={minVal}
            max={maxVal}
            onChange={(e) => setValB(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup} style={{ flex: '1 1 100%' }}>
          <label className={styles.inputLabel}>Presets</label>
          <div className={styles.presetGroup}>
            <button
              className={styles.presetBtn}
              onClick={() => {
                setBitWidth(4);
                setValA(5);
                setValB(3);
                setOperation('subtract');
              }}
            >
              4-bit: 5 - 3 (Normal)
            </button>
            <button
              className={styles.presetBtn}
              onClick={() => {
                setBitWidth(4);
                setValA(5);
                setValB(4);
                setOperation('add');
              }}
            >
              4-bit: 5 + 4 (Overflow!)
            </button>
            <button
              className={styles.presetBtn}
              onClick={() => {
                setBitWidth(4);
                setValA(-6);
                setValB(4);
                setOperation('subtract');
              }}
            >
              4-bit: -6 - 4 (Neg Overflow!)
            </button>
            <button
              className={styles.presetBtn}
              onClick={() => {
                setBitWidth(8);
                setValA(70);
                setValB(80);
                setOperation('add');
              }}
            >
              8-bit: 70 + 80 (Overflow!)
            </button>
            <button
              className={styles.presetBtn}
              onClick={() => {
                setBitWidth(8);
                setValA(42);
                setValB(15);
                setOperation('subtract');
              }}
            >
              8-bit: 42 - 15 (Standard)
            </button>
          </div>
        </div>
      </div>

      {/* Complements of Operand B Inspection Card */}
      <div className={styles.complementCard}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.6rem' }}>
          🔍 Representation & Inversion of Operand B ({valB}) in {bitWidth}-Bit
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Original Binary of B:</div>
            <div className={styles.bitRow}>
              {bitsB.map((b, i) => (
                <span key={i} className={styles.bitPill}>
                  {b}
                  <span className={styles.bitIndex}>{bitWidth - 1 - i}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>1's Complement of B (Invert all bits):</div>
            <div className={styles.bitRow}>
              {onesCompB.map((b, i) => (
                <span key={i} className={`${styles.bitPill} ${styles.bitPillActive}`}>
                  {b}
                  <span className={styles.bitIndex}>{bitWidth - 1 - i}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>2's Complement of B (1's Comp + 1):</div>
            <div className={styles.bitRow}>
              {twosCompB.map((b, i) => (
                <span key={i} className={styles.bitPill} style={{ borderColor: '#34d399', color: '#34d399' }}>
                  {b}
                  <span className={styles.bitIndex}>{bitWidth - 1 - i}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bitwise Arithmetic Adder Columns */}
      <div className={styles.calcGrid}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
          ⚙️ Hardware Parallel Adder Stage ({operation === 'subtract' ? 'A + (-B)' : 'A + B'})
        </div>

        {/* Carries Row */}
        <div className={styles.calcRow}>
          <div className={styles.calcLabel}>Carry-In (C_in):</div>
          <div className={styles.calcBits}>
            <span className={`${styles.calcBit} ${styles.carryBit}`}>
              {additionResult.cOutMsb}
            </span>
            {additionResult.carries.slice(1, bitWidth + 1).map((c, i) => (
              <span key={i} className={`${styles.calcBit} ${styles.carryBit}`}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Operand A Row */}
        <div className={styles.calcRow}>
          <div className={styles.calcLabel}>Operand A ({valA}):</div>
          <div className={styles.calcBits}>
            <span className={styles.calcBit}> </span>
            {bitsA.map((b, i) => (
              <span key={i} className={`${styles.calcBit} ${styles.operandBit}`}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Operand B / Comp B Row */}
        <div className={styles.calcRow}>
          <div className={styles.calcLabel}>
            {operation === 'subtract' ? `2's Comp B (${-valB})` : `Operand B (${valB})`}:
          </div>
          <div className={styles.calcBits}>
            <span className={styles.calcBit}>+</span>
            {adderB.map((b, i) => (
              <span key={i} className={`${styles.calcBit} ${styles.operandBit}`}>
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.calcDivider} />

        {/* Sum Row */}
        <div className={styles.calcRow}>
          <div className={styles.calcLabel}>Binary Sum:</div>
          <div className={styles.calcBits}>
            <span className={`${styles.calcBit} ${styles.carryBit}`}>
              [{additionResult.cOutMsb}]
            </span>
            {additionResult.sumBits.map((b, i) => (
              <span key={i} className={`${styles.calcBit} ${styles.sumBit}`}>
                {b}
              </span>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '0.5rem' }}>
          End Carry-Out (C_out = {additionResult.cOutMsb}) is{' '}
          <strong>DISCARDED</strong> in 2's complement hardware arithmetic!
        </div>
      </div>

      {/* Overflow Status Banner */}
      <div
        className={`${styles.statusBanner} ${
          additionResult.isOverflow ? styles.statusDanger : styles.statusSuccess
        }`}
      >
        <div>
          <strong>
            {additionResult.isOverflow
              ? '⚠️ ARITHMETIC OVERFLOW DETECTED (V = 1)!'
              : '✅ VALID ARITHMETIC RESULT (V = 0)'}
          </strong>
          <div style={{ fontSize: '0.76rem', marginTop: '0.2rem' }}>
            Hardware Formula: V = C_in(MSB) ⊕ C_out(MSB) = {additionResult.cInMsb} ⊕{' '}
            {additionResult.cOutMsb} = {additionResult.isOverflow ? '1' : '0'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>
            Hardware Value: <strong>{additionResult.decSum}</strong>
          </div>
          <div style={{ fontSize: '0.74rem' }}>
            Expected Math: <strong>{additionResult.mathematicalExpected}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. IEEE 754 FLOATING POINT INSPECTOR
   ========================================================================= */
function FloatingPointView() {
  const [floatInput, setFloatInput] = useState('-13.625');
  const [bitArray, setBitArray] = useState(() => floatToBits(-13.625));

  // Helper: float to 32 bits array
  function floatToBits(val) {
    const buf = new ArrayBuffer(4);
    const f32 = new Float32Array(buf);
    const u32 = new Uint32Array(buf);
    f32[0] = val;
    const uintVal = u32[0];
    const bits = [];
    for (let i = 31; i >= 0; i--) {
      bits.push((uintVal >> i) & 1);
    }
    return bits;
  }

  // Helper: 32 bits array to float
  function bitsToFloat(bits) {
    let uintVal = 0;
    for (let i = 0; i < 32; i++) {
      uintVal = (uintVal << 1) | bits[i];
    }
    const buf = new ArrayBuffer(4);
    const u32 = new Uint32Array(buf);
    const f32 = new Float32Array(buf);
    u32[0] = uintVal >>> 0;
    return f32[0];
  }

  // Handle text input change
  const handleInputChange = (text) => {
    setFloatInput(text);
    const num = parseFloat(text);
    if (!isNaN(num)) {
      setBitArray(floatToBits(num));
    }
  };

  // Toggle specific bit by clicking
  const toggleBit = (index) => {
    const updated = [...bitArray];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setBitArray(updated);
    const newFloat = bitsToFloat(updated);
    setFloatInput(newFloat.toString());
  };

  // Decompose current bits
  const signBit = bitArray[0];
  const expBits = bitArray.slice(1, 9);
  const mantissaBits = bitArray.slice(9);

  const biasedExp = parseInt(expBits.join(''), 2);
  const trueExp = biasedExp === 0 ? -126 : biasedExp - 127; // Subnormal vs Normalized
  const isZero = biasedExp === 0 && mantissaBits.every((b) => b === 0);
  const isInf = biasedExp === 255 && mantissaBits.every((b) => b === 0);
  const isNaNVal = biasedExp === 255 && mantissaBits.some((b) => b === 1);

  // Mantissa fraction calculation
  let fractionVal = 0;
  for (let i = 0; i < 23; i++) {
    fractionVal += mantissaBits[i] * Math.pow(2, -(i + 1));
  }
  const significandVal = biasedExp === 0 ? fractionVal : 1 + fractionVal;
  const currentFloat = bitsToFloat(bitArray);

  return (
    <div>
      <div className={styles.controlRow}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Float Number Input</label>
          <input
            type="text"
            className={styles.textInput}
            value={floatInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="e.g. -13.625"
          />
        </div>

        <div className={styles.inputGroup} style={{ flex: '1 1 100%' }}>
          <label className={styles.inputLabel}>Interactive Presets</label>
          <div className={styles.presetGroup}>
            {['-13.625', '0.1', '1.0', '0.0', '-0.0', '3.14159', '1e38'].map((p) => (
              <button
                key={p}
                className={styles.presetBtn}
                onClick={() => {
                  setFloatInput(p);
                  setBitArray(floatToBits(parseFloat(p)));
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 32-Bit Register Visualizer */}
      <div className={styles.fpRegister}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
            Interactive 32-Bit Register (Click any bit to flip it!):
          </span>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'monospace' }}>
            MSB [31] ➔ LSB [0]
          </span>
        </div>

        <div className={styles.fpBitBar}>
          {bitArray.map((bit, idx) => {
            const isSign = idx === 0;
            const isExp = idx >= 1 && idx <= 8;
            const className = isSign
              ? `${styles.fpBit} ${styles.fpSign}`
              : isExp
              ? `${styles.fpBit} ${styles.fpExp}`
              : `${styles.fpBit} ${styles.fpMantissa}`;

            return (
              <div
                key={idx}
                className={className}
                onClick={() => toggleBit(idx)}
                title={`Bit ${31 - idx} (${isSign ? 'Sign' : isExp ? 'Exp' : 'Mantissa'})`}
              >
                <span>{bit}</span>
                <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>{31 - idx}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className={styles.fpLegend}>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: '#ef4444' }} />
            <span>Sign (1 Bit: [31]) = {signBit === 0 ? '+ (Positive)' : '- (Negative)'}</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: '#10b981' }} />
            <span>Biased Exponent (8 Bits: [30..23]) = {biasedExp}</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: '#38bdf8' }} />
            <span>Mantissa Fraction (23 Bits: [22..0])</span>
          </div>
        </div>
      </div>

      {/* Mathematical Breakdown Cards */}
      <div className={styles.fpMathBreakdown}>
        <div className={styles.fpMathCard}>
          <div className={styles.fpMathTitle}>1. Sign Component (S)</div>
          <div className={styles.fpMathFormula}>
            (-1)<sup>{signBit}</sup> = {signBit === 0 ? '+1' : '-1'}
          </div>
        </div>

        <div className={styles.fpMathCard}>
          <div className={styles.fpMathTitle}>2. True Exponent (E - Bias)</div>
          <div className={styles.fpMathFormula}>
            2<sup>({biasedExp} - 127)</sup> = 2<sup>{trueExp}</sup>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>
            Bias = 127 (Single Precision)
          </div>
        </div>

        <div className={styles.fpMathCard}>
          <div className={styles.fpMathTitle}>3. Significand / Mantissa (M)</div>
          <div className={styles.fpMathFormula}>
            {biasedExp === 0 ? '0.' : '1.'}
            {fractionVal.toFixed(6).slice(2)}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>
            {biasedExp === 0 ? 'Subnormal (Hidden bit is 0)' : 'Normalized (Hidden bit is 1)'}
          </div>
        </div>

        <div className={styles.fpMathCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.fpMathTitle}>Full Reconstructed IEEE-754 Formula</div>
          <div
            className={styles.fpMathFormula}
            style={{ color: '#38bdf8', fontSize: '1.05rem', fontWeight: 700 }}
          >
            {isZero && (signBit === 0 ? '+0.0' : '-0.0')}
            {isInf && (signBit === 0 ? '+Infinity' : '-Infinity')}
            {isNaNVal && 'NaN (Not a Number)'}
            {!isZero && !isInf && !isNaNVal && (
              <>
                ({signBit === 0 ? '+' : '-'}) {significandVal.toFixed(7)} × 2<sup>{trueExp}</sup> ={' '}
                <span style={{ color: '#f59e0b' }}>{currentFloat}</span>
              </>
            )}
          </div>
          {floatInput === '0.1' && (
            <div style={{ fontSize: '0.75rem', color: '#fb7185', marginTop: '0.4rem' }}>
              ⚠️ Precision Hazard Notice: 0.1 cannot be represented exactly in binary floating point.
              Its reconstructed 32-bit value is 0.100000001490116119384765625!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
