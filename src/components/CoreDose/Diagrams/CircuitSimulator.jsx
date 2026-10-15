import React, { useState } from 'react';
import styles from './CircuitSimulator.module.css';

/**
 * CircuitSimulator
 * Interactive Combinational & Datapath Circuit Simulator with real gate schematics and live glowing wires.
 * Supports dedicated single-circuit mode (hideTabs=true) or multi-circuit tabs.
 */

// Reusable SVG Gate Primitives
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

const SvgJunction = ({ cx, cy, active }) => (
  <circle
    cx={cx}
    cy={cy}
    r="4"
    fill={active ? '#10b981' : '#64748b'}
    style={{ filter: active ? 'drop-shadow(0 0 5px #10b981)' : 'none' }}
  />
);

const SvgXorGate = ({ x, y, active, label = 'XOR' }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* curved back input rail */}
    <path
      d="M 0 0 Q 14 20 0 40"
      fill="none"
      stroke={active ? '#06b6d4' : '#64748b'}
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    {/* body */}
    <path
      d="M 8 0 Q 22 20 8 40 Q 36 40 54 20 Q 36 0 8 0 Z"
      fill={active ? 'rgba(6, 182, 212, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#06b6d4' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' : 'none' }}
    />
    {/* Centered label: between back curve (x=22) and nose (x=54) */}
    <text x="34" y="24" fontSize="8" fontWeight="800" fill={active ? '#38bdf8' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

const SvgAndGate = ({ x, y, active, label = 'AND' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      d="M 0 0 L 25 0 A 20 20 0 0 1 25 40 L 0 40 Z"
      fill={active ? 'rgba(59, 130, 246, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#3b82f6' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' : 'none' }}
    />
    <text x="20" y="24" fontSize="8" fontWeight="800" fill={active ? '#60a5fa' : '#94a3b8'} textAnchor="middle">
      {label}
    </text>
  </g>
);

const SvgOrGate = ({ x, y, active, label = 'OR' }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path
      d="M 0 0 Q 14 20 0 40 Q 34 40 50 20 Q 34 0 0 0 Z"
      fill={active ? 'rgba(16, 185, 129, 0.22)' : 'rgba(30, 41, 59, 0.75)'}
      stroke={active ? '#10b981' : '#64748b'}
      strokeWidth="2.5"
      strokeLinejoin="round"
      style={{ filter: active ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' : 'none' }}
    />
    <text x="30" y="24" fontSize="8" fontWeight="800" fill={active ? '#34d399' : '#94a3b8'} textAnchor="middle">
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

const SvgLed = ({ cx, cy, active, label, color = '#38bdf8' }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r="7"
      fill={active ? color : '#334155'}
      stroke={active ? '#f8fafc' : '#475569'}
      strokeWidth="2"
      style={{ filter: active ? `drop-shadow(0 0 6px ${color})` : 'none' }}
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

// Circuit metadata definition
const CIRCUITS = {
  'half-adder': {
    id: 'half-adder',
    name: 'Half Adder (HA)',
    category: 'Arithmetic',
    icon: '➕',
    description: 'Computes sum of two single-bit inputs without incoming carry. S = A ⊕ B, C = AB.',
    defaultInputs: { a: 1, b: 1 },
    inputs: [
      { key: 'a', label: 'Operand A' },
      { key: 'b', label: 'Operand B' },
    ],
    evaluate: (inp) => {
      const s = inp.a ^ inp.b;
      const c = inp.a & inp.b;
      return {
        outputs: [
          { label: 'Sum (S)', value: s, formula: 'A ⊕ B' },
          { label: 'Carry (C)', value: c, formula: 'A · B' },
        ],
        details: `${inp.a} + ${inp.b} = ${inp.a + inp.b}₁₀ (${c}${s}₂)`,
        activeRowIndex: (inp.a << 1) | inp.b,
        table: [
          { a: 0, b: 0, s: 0, c: 0 },
          { a: 0, b: 1, s: 1, c: 0 },
          { a: 1, b: 0, s: 1, c: 0 },
          { a: 1, b: 1, s: 0, c: 1 },
        ],
      };
    },
  },
  'full-adder': {
    id: 'full-adder',
    name: 'Full Adder (FA)',
    category: 'Arithmetic',
    icon: '⚡',
    description: 'Synthesized via 2 Half Adders + 1 OR gate. Adds A, B, and Cin.',
    defaultInputs: { a: 1, b: 0, cin: 1 },
    inputs: [
      { key: 'a', label: 'Operand A' },
      { key: 'b', label: 'Operand B' },
      { key: 'cin', label: 'Carry In (Cin)' },
    ],
    evaluate: (inp) => {
      const s1 = inp.a ^ inp.b;
      const c1 = inp.a & inp.b;
      const s = s1 ^ inp.cin;
      const c2 = s1 & inp.cin;
      const cout = c1 | c2;
      const total = inp.a + inp.b + inp.cin;
      return {
        s1,
        c1,
        c2,
        s,
        cout,
        outputs: [
          { label: 'Sum (S)', value: s, formula: 'A ⊕ B ⊕ Cin' },
          { label: 'Carry Out (Cout)', value: cout, formula: 'C₁ + C₂ = AB + Cin(A ⊕ B)' },
        ],
        internals: [
          { label: 'HA1 Sum (S₁ = A ⊕ B)', value: s1 },
          { label: 'HA1 Carry (C₁ = AB)', value: c1 },
          { label: 'HA2 Carry (C₂ = S₁·Cin)', value: c2 },
        ],
        details: `${inp.a} + ${inp.b} + ${inp.cin} = ${total}₁₀ (${cout}${s}₂)`,
        activeRowIndex: (inp.a << 2) | (inp.b << 1) | inp.cin,
        table: [
          { a: 0, b: 0, cin: 0, s: 0, cout: 0 },
          { a: 0, b: 0, cin: 1, s: 1, cout: 0 },
          { a: 0, b: 1, cin: 0, s: 1, cout: 0 },
          { a: 0, b: 1, cin: 1, s: 0, cout: 1 },
          { a: 1, b: 0, cin: 0, s: 1, cout: 0 },
          { a: 1, b: 0, cin: 1, s: 0, cout: 1 },
          { a: 1, b: 1, cin: 0, s: 0, cout: 1 },
          { a: 1, b: 1, cin: 1, s: 1, cout: 1 },
        ],
      };
    },
  },
  'half-subtractor': {
    id: 'half-subtractor',
    name: 'Half Subtractor (HS)',
    category: 'Arithmetic',
    icon: '➖',
    description: 'Computes difference of two single-bit inputs without incoming borrow. D = A ⊕ B, Bout = A\'B.',
    defaultInputs: { a: 1, b: 0 },
    inputs: [
      { key: 'a', label: 'Minuend A' },
      { key: 'b', label: 'Subtrahend B' },
    ],
    evaluate: (inp) => {
      const d = inp.a ^ inp.b;
      const aBar = inp.a === 1 ? 0 : 1;
      const bout = aBar & inp.b;
      return {
        outputs: [
          { label: 'Difference (D)', value: d, formula: 'A ⊕ B' },
          { label: 'Borrow (Bout)', value: bout, formula: 'A\' · B' },
        ],
        details: `${inp.a} − ${inp.b} = ${inp.a - inp.b}₁₀ (Borrow=${bout}, Diff=${d})`,
        activeRowIndex: (inp.a << 1) | inp.b,
        table: [
          { a: 0, b: 0, d: 0, bout: 0 },
          { a: 0, b: 1, d: 1, bout: 1 },
          { a: 1, b: 0, d: 1, bout: 0 },
          { a: 1, b: 1, d: 0, bout: 0 },
        ],
      };
    },
  },
  'full-subtractor': {
    id: 'full-subtractor',
    name: 'Full Subtractor (FS)',
    category: 'Arithmetic',
    icon: '⚡',
    description: 'Synthesized via 2 Half Subtractors + 1 OR gate. Computes A − B − Bin.',
    defaultInputs: { a: 1, b: 0, bin: 1 },
    inputs: [
      { key: 'a', label: 'Minuend A' },
      { key: 'b', label: 'Subtrahend B' },
      { key: 'bin', label: 'Borrow In (Bin)' },
    ],
    evaluate: (inp) => {
      const d1 = inp.a ^ inp.b;
      const aBar = inp.a === 1 ? 0 : 1;
      const b1 = aBar & inp.b;
      const d = d1 ^ inp.bin;
      const d1Bar = d1 === 1 ? 0 : 1;
      const b2 = d1Bar & inp.bin;
      const bout = b1 | b2;
      return {
        d1,
        b1,
        b2,
        d,
        bout,
        outputs: [
          { label: 'Difference (D)', value: d, formula: 'A ⊕ B ⊕ Bin' },
          { label: 'Borrow Out (Bout)', value: bout, formula: 'B₁ + B₂ = A\'B + (A ⊕ B)\'Bin' },
        ],
        internals: [
          { label: 'HS1 Difference (D₁ = A ⊕ B)', value: d1 },
          { label: 'HS1 Borrow (B₁ = A\'B)', value: b1 },
          { label: 'HS2 Borrow (B₂ = D₁\'Bin)', value: b2 },
        ],
        details: `${inp.a} − ${inp.b} − ${inp.bin} = ${inp.a - inp.b - inp.bin}₁₀ (Bout=${bout}, D=${d})`,
        activeRowIndex: (inp.a << 2) | (inp.b << 1) | inp.bin,
        table: [
          { a: 0, b: 0, bin: 0, d: 0, bout: 0 },
          { a: 0, b: 0, bin: 1, d: 1, bout: 1 },
          { a: 0, b: 1, bin: 0, d: 1, bout: 1 },
          { a: 0, b: 1, bin: 1, d: 0, bout: 1 },
          { a: 1, b: 0, bin: 0, d: 1, bout: 0 },
          { a: 1, b: 0, bin: 1, d: 0, bout: 0 },
          { a: 1, b: 1, bin: 0, d: 0, bout: 0 },
          { a: 1, b: 1, bin: 1, d: 1, bout: 1 },
        ],
      };
    },
  },
  'ripple-carry-adder': {
    id: 'ripple-carry-adder',
    name: '4-Bit Ripple Carry Adder',
    category: 'Architecture',
    icon: '🌊',
    description: 'Cascaded 4-stage Full Adder chain demonstrating carry propagation across stages.',
    defaultInputs: { a3: 0, a2: 1, a1: 1, a0: 1, b3: 0, b2: 1, b1: 0, b0: 1, c0: 0 },
    isMultiBit: true,
    evaluateMultiBit: (inp) => {
      const a = [inp.a0, inp.a1, inp.a2, inp.a3];
      const b = [inp.b0, inp.b1, inp.b2, inp.b3];
      let c = inp.c0;
      const stages = [];
      const sum = [];
      const carries = [inp.c0];

      for (let i = 0; i < 4; i++) {
        const ai = a[i];
        const bi = b[i];
        const cin = c;
        const si = ai ^ bi ^ cin;
        const cout = (ai & bi) | (cin & (ai ^ bi));
        stages.push({ stage: i, a: ai, b: bi, cin, s: si, cout });
        sum.push(si);
        c = cout;
        carries.push(cout);
      }

      const valA = (a[3] << 3) | (a[2] << 2) | (a[1] << 1) | a[0];
      const valB = (b[3] << 3) | (b[2] << 2) | (b[1] << 1) | b[0];
      const valSum = (sum[3] << 3) | (sum[2] << 2) | (sum[1] << 1) | sum[0];
      const total = valA + valB + inp.c0;

      return {
        stages,
        carries,
        finalCarry: c,
        valA,
        valB,
        valSum,
        total,
      };
    },
  },
  'adder-subtractor': {
    id: 'adder-subtractor',
    name: '4-Bit Adder-Subtractor & Overflow',
    category: 'ALU Datapath',
    icon: '⚖️',
    description: 'Controlled inversion via XOR gates. M=0 adds (A+B); M=1 subtracts (A-B). Evaluates signed overflow V = C₄ ⊕ C₃.',
    defaultInputs: { m: 1, a3: 0, a2: 1, a1: 0, a0: 1, b3: 0, b2: 1, b1: 0, b0: 0 },
    isAdderSubtractor: true,
    evaluateAdderSubtractor: (inp) => {
      const mode = inp.m;
      const a = [inp.a0, inp.a1, inp.a2, inp.a3];
      const bRaw = [inp.b0, inp.b1, inp.b2, inp.b3];
      const bInverted = bRaw.map((bit) => bit ^ mode);

      let c = mode;
      const stages = [];
      const sum = [];
      const carries = [mode];

      for (let i = 0; i < 4; i++) {
        const ai = a[i];
        const bi = bInverted[i];
        const cin = c;
        const si = ai ^ bi ^ cin;
        const cout = (ai & bi) | (cin & (ai ^ bi));
        stages.push({ stage: i, a: ai, bRaw: bRaw[i], bEff: bi, cin, s: si, cout });
        sum.push(si);
        c = cout;
        carries.push(cout);
      }

      const c3 = carries[3];
      const c4 = carries[4];
      const overflow = c3 ^ c4;

      const toSigned4 = (binArr) => {
        const unsigned = (binArr[3] << 3) | (binArr[2] << 2) | (binArr[1] << 1) | binArr[0];
        return unsigned >= 8 ? unsigned - 16 : unsigned;
      };

      const signedA = toSigned4(a);
      const signedB = toSigned4(bRaw);
      const signedRes = toSigned4(sum);

      return {
        mode,
        stages,
        carries,
        c3,
        c4,
        overflow,
        signedA,
        signedB,
        signedRes,
        sumBits: sum,
      };
    },
  },
  'carry-lookahead-adder': {
    id: 'carry-lookahead-adder',
    name: '4-Bit Carry Lookahead Adder (CLA)',
    category: 'High-Speed Arithmetic',
    icon: '⚡',
    description: 'Computes carries C₁..C₄ simultaneously in O(1) two-level logic without ripple delay. Pᵢ = Aᵢ ⊕ Bᵢ, Gᵢ = AᵢBᵢ.',
    defaultInputs: { a3: 1, a2: 0, a1: 1, a0: 1, b3: 0, b2: 1, b1: 1, b0: 1, c0: 0 },
    evaluateCla: (inp) => {
      const a = [inp.a0, inp.a1, inp.a2, inp.a3];
      const b = [inp.b0, inp.b1, inp.b2, inp.b3];
      const c0 = inp.c0;

      const p = a.map((ai, i) => ai ^ b[i]);
      const g = a.map((ai, i) => ai & b[i]);

      const c1 = g[0] | (p[0] & c0);
      const c2 = g[1] | (p[1] & g[0]) | (p[1] & p[0] & c0);
      const c3 = g[2] | (p[2] & g[1]) | (p[2] & p[1] & g[0]) | (p[2] & p[1] & p[0] & c0);
      const c4 = g[3] | (p[3] & g[2]) | (p[3] & p[2] & g[1]) | (p[3] & p[2] & p[1] & g[0]) | (p[3] & p[2] & p[1] & p[0] & c0);

      const carries = [c0, c1, c2, c3, c4];
      const s = p.map((pi, i) => pi ^ carries[i]);

      const valA = (a[3] << 3) | (a[2] << 2) | (a[1] << 1) | a[0];
      const valB = (b[3] << 3) | (b[2] << 2) | (b[1] << 1) | b[0];
      const valSum = (s[3] << 3) | (s[2] << 2) | (s[1] << 1) | s[0];
      const total = valA + valB + c0;

      return {
        a, b, c0, p, g, carries, s, valA, valB, valSum, total,
      };
    },
  },
  'mux-4-to-1': {
    id: 'mux-4-to-1',
    name: '4:1 Multiplexer (MUX)',
    category: 'Data Routing',
    icon: '🔀',
    description: 'Selects one of 4 data inputs (I₀..I₃) steered by 2 select lines (S₁, S₀) and active-low Enable (E_bar).',
    defaultInputs: { ebar: 0, s1: 0, s0: 1, i0: 0, i1: 1, i2: 0, i3: 1 },
    isMux: true,
    evaluateMux: (inp) => {
      const disabled = inp.ebar === 1;
      const selIdx = (inp.s1 << 1) | inp.s0;
      const dataInputs = [inp.i0, inp.i1, inp.i2, inp.i3];
      const selectedValue = dataInputs[selIdx];
      const out = disabled ? 0 : selectedValue;

      return {
        disabled,
        selIdx,
        selectedValue,
        out,
        channels: [
          { idx: 0, code: '00', val: inp.i0, active: !disabled && selIdx === 0 },
          { idx: 1, code: '01', val: inp.i1, active: !disabled && selIdx === 1 },
          { idx: 2, code: '10', val: inp.i2, active: !disabled && selIdx === 2 },
          { idx: 3, code: '11', val: inp.i3, active: !disabled && selIdx === 3 },
        ],
      };
    },
  },
  'demux-1-to-4': {
    id: 'demux-1-to-4',
    name: '1:4 Demultiplexer (DEMUX)',
    category: 'Data Routing',
    icon: '📡',
    description: 'Distributes a single data input (Din) to one of 4 output channels selected by address lines S₁ and S₀.',
    defaultInputs: { din: 1, s1: 0, s0: 1 },
    isDemux: true,
    evaluateDemux: (inp) => {
      const selIdx = (inp.s1 << 1) | inp.s0;
      const outputs = [0, 0, 0, 0];
      outputs[selIdx] = inp.din;
      return {
        selIdx,
        outputs,
        channels: [
          { idx: 0, code: '00', val: outputs[0], active: selIdx === 0 },
          { idx: 1, code: '01', val: outputs[1], active: selIdx === 1 },
          { idx: 2, code: '10', val: outputs[2], active: selIdx === 2 },
          { idx: 3, code: '11', val: outputs[3], active: selIdx === 3 },
        ],
      };
    },
  },
  'decoder-2-to-4': {
    id: 'decoder-2-to-4',
    name: '2:4 Line Decoder',
    category: 'Data Routing',
    icon: '🎯',
    description: 'Decodes a 2-bit address into one of 4 active lines (m₀..m₃) controlled by Enable (E).',
    defaultInputs: { e: 1, a: 1, b: 0 },
    isDecoder: true,
    evaluateDecoder: (inp) => {
      const enabled = inp.e === 1;
      const selIdx = (inp.a << 1) | inp.b;
      const outputs = [0, 0, 0, 0];
      if (enabled) {
        outputs[selIdx] = 1;
      }

      return {
        enabled,
        selIdx,
        outputs,
        lines: [
          { idx: 0, minterm: 'm₀ (A\'B\')', val: outputs[0], active: enabled && selIdx === 0 },
          { idx: 1, minterm: 'm₁ (A\'B)', val: outputs[1], active: enabled && selIdx === 1 },
          { idx: 2, minterm: 'm₂ (AB\')', val: outputs[2], active: enabled && selIdx === 2 },
          { idx: 3, minterm: 'm₃ (AB)', val: outputs[3], active: enabled && selIdx === 3 },
        ],
      };
    },
  },
  'encoder-4-to-2': {
    id: 'encoder-4-to-2',
    name: '4:2 Standard Binary Encoder',
    category: 'Data Compression',
    icon: '🔢',
    description: 'Compresses 4 lines (Y₀..Y₃) into 2-bit code (A₁, A₀). Highlights multi-request conflict and all-zero ambiguity.',
    defaultInputs: { y3: 0, y2: 1, y1: 0, y0: 0 },
    isStandardEncoder: true,
    evaluateEncoder: (inp) => {
      const a1 = inp.y3 | inp.y2;
      const a0 = inp.y3 | inp.y1;
      const activeCount = inp.y3 + inp.y2 + inp.y1 + inp.y0;
      let status = 'valid';
      let message = 'Valid 1-Hot input. Encoding clean binary output.';
      if (activeCount > 1) {
        status = 'conflict';
        message = 'Priority Conflict! Multiple inputs active. False output generated due to lack of priority arbitration.';
      } else if (activeCount === 0) {
        status = 'allzero';
        message = 'All-Zero Ambiguity! Output is 00, identical to Y₀ active. Circuit cannot differentiate idle state.';
      }
      return {
        a1,
        a0,
        activeCount,
        status,
        message,
        inputs: [
          { name: 'Y₃', val: inp.y3, bit: 3 },
          { name: 'Y₂', val: inp.y2, bit: 2 },
          { name: 'Y₁', val: inp.y1, bit: 1 },
          { name: 'Y₀', val: inp.y0, bit: 0 },
        ],
      };
    },
  },
  'priority-encoder-4-to-2': {
    id: 'priority-encoder-4-to-2',
    name: '4:2 Priority Encoder',
    category: 'Interrupts & Arbitration',
    icon: '🚨',
    description: 'Outputs the code of highest active line (D₃ highest, D₀ lowest). Valid flag V asserts if any input is active.',
    defaultInputs: { d3: 0, d2: 1, d1: 1, d0: 1 },
    isPriorityEncoder: true,
    evaluatePriority: (inp) => {
      const v = inp.d3 | inp.d2 | inp.d1 | inp.d0;
      let y1 = 0;
      let y0 = 0;
      let activeSource = 'None';

      if (inp.d3 === 1) {
        y1 = 1;
        y0 = 1;
        activeSource = 'D₃ (Highest Priority)';
      } else if (inp.d2 === 1) {
        y1 = 1;
        y0 = 0;
        activeSource = 'D₂';
      } else if (inp.d1 === 1) {
        y1 = 0;
        y0 = 1;
        activeSource = 'D₁';
      } else if (inp.d0 === 1) {
        y1 = 0;
        y0 = 0;
        activeSource = 'D₀ (Lowest Priority)';
      }

      return {
        v,
        y1,
        y0,
        activeSource,
        inputs: [
          { name: 'D₃', val: inp.d3, priority: '3 (Highest)', winning: inp.d3 === 1 },
          { name: 'D₂', val: inp.d2, priority: '2', winning: inp.d3 === 0 && inp.d2 === 1 },
          { name: 'D₁', val: inp.d1, priority: '1', winning: inp.d3 === 0 && inp.d2 === 0 && inp.d1 === 1 },
          { name: 'D₀', val: inp.d0, priority: '0 (Lowest)', winning: inp.d3 === 0 && inp.d2 === 0 && inp.d1 === 0 && inp.d0 === 1 },
        ],
      };
    },
  },
};

export default function CircuitSimulator({
  circuit = 'half-adder',
  allowedCircuits,
  hideTabs = false,
  hideHeader = false,
  title,
  subtitle,
}) {
  const [selectedCircuitKey, setSelectedCircuitKey] = useState(circuit);
  const activeDef = CIRCUITS[selectedCircuitKey] || CIRCUITS['half-adder'];

  const [inputs, setInputs] = useState(activeDef.defaultInputs);

  const handleCircuitChange = (key) => {
    setSelectedCircuitKey(key);
    setInputs(CIRCUITS[key].defaultInputs);
  };

  const toggleInput = (key) => {
    setInputs((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
  };

  const visibleCircuitKeys = allowedCircuits || [circuit];
  const shouldShowTabs = !hideTabs && visibleCircuitKeys.length > 1;

  return (
    <div className={styles.container}>
      {/* Header bar */}
      {!hideHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>{activeDef.icon}</span>
            <div>
              <h4 className={styles.title}>{title || activeDef.name}</h4>
              <p className={styles.subtitle}>{subtitle || activeDef.description}</p>
            </div>
          </div>
          <div className={styles.categoryBadge}>{activeDef.category}</div>
        </div>
      )}

      {/* Tabs navigation ONLY when multiple circuits explicitly allowed and not hidden */}
      {shouldShowTabs && (
        <div className={styles.tabBar}>
          {visibleCircuitKeys.map((key) => {
            const item = CIRCUITS[key];
            if (!item) return null;
            const isTabActive = selectedCircuitKey === key;
            return (
              <button
                key={key}
                type="button"
                className={`${styles.tabBtn} ${isTabActive ? styles.tabBtnActive : ''}`}
                onClick={() => handleCircuitChange(key)}
              >
                <span>{item.icon}</span>
                <span>{item.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Playground Stage */}
      <div className={styles.stage}>
        {/* CASE 1: Half Adder */}
        {selectedCircuitKey === 'half-adder' && (
          <HalfAdderSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 2: Full Adder */}
        {selectedCircuitKey === 'full-adder' && (
          <FullAdderSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 3: Half Subtractor */}
        {selectedCircuitKey === 'half-subtractor' && (
          <HalfSubtractorSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 4: Full Subtractor */}
        {selectedCircuitKey === 'full-subtractor' && (
          <FullSubtractorSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 5: 4-Bit Ripple Carry Adder */}
        {selectedCircuitKey === 'ripple-carry-adder' && (
          <RippleCarrySchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 6: Adder-Subtractor */}
        {selectedCircuitKey === 'adder-subtractor' && (
          <AdderSubtractorSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 7: 4:1 Multiplexer */}
        {selectedCircuitKey === 'mux-4-to-1' && (
          <MuxSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 8: 1:4 Demultiplexer */}
        {selectedCircuitKey === 'demux-1-to-4' && (
          <DemuxSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 9: 2:4 Decoder */}
        {selectedCircuitKey === 'decoder-2-to-4' && (
          <DecoderView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 10: 4:2 Standard Binary Encoder */}
        {selectedCircuitKey === 'encoder-4-to-2' && (
          <StandardEncoderView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 11: 4:2 Priority Encoder */}
        {selectedCircuitKey === 'priority-encoder-4-to-2' && (
          <PriorityEncoderView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}

        {/* CASE 12: Carry Lookahead Adder */}
        {selectedCircuitKey === 'carry-lookahead-adder' && (
          <CarryLookaheadSchematicView def={activeDef} inputs={inputs} onToggle={toggleInput} />
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 1. Half Adder Dedicated Schematic View with Visible SVG Wires
// -------------------------------------------------------------
function HalfAdderSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluate(inputs);
  const a = inputs.a;
  const b = inputs.b;
  const s = a ^ b;
  const c = a & b;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Interactive Gate Schematic</span>
          <span className={styles.hintTag}>Click Input Buttons to Toggle Voltage</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 430 180" className={styles.circuitSvg}>
            {/* Input Wire A: From (25, 48) to XOR (180, 48) and branch down to AND (180, 120) */}
            <SvgWire d="M 25 48 L 180 48" active={a === 1} />
            <SvgWire d="M 85 48 L 85 120 L 180 120" active={a === 1} />
            <SvgJunction cx="85" cy="48" active={a === 1} />

            {/* Input Wire B: From (25, 140) to AND (180, 140) and branch up to XOR (180, 68) */}
            <SvgWire d="M 25 140 L 180 140" active={b === 1} />
            <SvgWire d="M 125 140 L 125 68 L 180 68" active={b === 1} />
            <SvgJunction cx="125" cy="140" active={b === 1} />

            {/* Gates */}
            <SvgXorGate x="180" y="38" active={s === 1} label="XOR" />
            <SvgAndGate x="180" y="110" active={c === 1} label="AND" />

            {/* Output Wire S: Starts EXACTLY at XOR nose (180 + 54 = 234, 58) to LED center (355, 58) */}
            <SvgWire d="M 234 58 L 355 58" active={s === 1} />

            {/* Output Wire C: Starts EXACTLY at AND nose (180 + 45 = 225, 130) to LED center (355, 130) */}
            <SvgWire d="M 225 130 L 355 130" active={c === 1} />

            {/* Text labels on wires */}
            <text x="40" y="40" fill={a === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800">A={a}</text>
            <text x="40" y="155" fill={b === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800">B={b}</text>
            <text x="248" y="48" fill={s === 1 ? '#38bdf8' : '#64748b'} fontSize="10" fontWeight="800">S = A ⊕ B</text>
            <text x="248" y="122" fill={c === 1 ? '#60a5fa' : '#64748b'} fontSize="10" fontWeight="800">C = A · B</text>

            {/* Output terminal LEDs */}
            <SvgLed cx={355} cy={58} active={s === 1} label={`S=${s}`} color="#38bdf8" />
            <SvgLed cx={355} cy={130} active={c === 1} label={`C=${c}`} color="#3b82f6" />
          </svg>
        </div>

        {/* Interactive Input Buttons */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${a === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('a')}
          >
            <span className={styles.pinLabel}>Toggle Operand A:</span>
            <span className={styles.pinValue}>{a}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${b === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('b')}
          >
            <span className={styles.pinLabel}>Toggle Operand B:</span>
            <span className={styles.pinValue}>{b}</span>
          </button>
        </div>

        <div className={styles.equationSummary}>
          <strong>Arithmetic Total:</strong> {result.details}
        </div>
      </div>

      {/* Truth Table */}
      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Half Adder Truth Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>Sum (S = A ⊕ B)</th>
              <th>Carry (C = AB)</th>
            </tr>
          </thead>
          <tbody>
            {result.table.map((row, idx) => {
              const isActive = idx === result.activeRowIndex;
              return (
                <tr key={idx} className={isActive ? styles.activeRow : ''}>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                  <td>{row.s}</td>
                  <td>{row.c}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Full Adder Dedicated Schematic View (2 HAs + 1 OR Gate)
// -------------------------------------------------------------
function FullAdderSchematicView({ def, inputs, onToggle }) {
  const res = def.evaluate(inputs);
  const { a, b, cin } = inputs;
  const { s1, c1, c2, s, cout } = res;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Full Adder Gate Schematic (2 HAs + 1 OR)</span>
          <span className={styles.hintTag}>Click Pins to Trace Current</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 580 240" className={styles.circuitSvg}>
            {/* Box container for HA1 */}
            <rect x="90" y="15" width="125" height="135" rx="8" fill="rgba(56, 189, 248, 0.04)" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="4 3" />
            <text x="96" y="28" fill="#38bdf8" fontSize="9" fontWeight="800">HALF ADDER 1</text>

            {/* Box container for HA2 */}
            <rect x="250" y="25" width="125" height="145" rx="8" fill="rgba(168, 85, 247, 0.04)" stroke="rgba(168, 85, 247, 0.25)" strokeDasharray="4 3" />
            <text x="256" y="38" fill="#c084fc" fontSize="9" fontWeight="800">HALF ADDER 2</text>

            {/* Input A: (25, 44) */}
            <SvgWire d="M 25 44 L 115 44" active={a === 1} />
            <SvgWire d="M 55 44 L 55 110 L 115 110" active={a === 1} />
            <SvgJunction cx="55" cy="44" active={a === 1} />

            {/* Input B: (25, 64) */}
            <SvgWire d="M 25 64 L 115 64" active={b === 1} />
            <SvgWire d="M 75 64 L 75 126 L 115 126" active={b === 1} />
            <SvgJunction cx="75" cy="64" active={b === 1} />

            {/* Input Cin: (25, 205) */}
            <SvgWire d="M 25 205 L 235 205 L 235 74 L 275 74" active={cin === 1} />
            <SvgWire d="M 235 150 L 275 150" active={cin === 1} />
            <SvgJunction cx="235" cy="150" active={cin === 1} />

            {/* HA1 Gates */}
            <SvgXorGate x="115" y="34" active={s1 === 1} label="XOR 1" />
            <SvgAndGate x="115" y="98" active={c1 === 1} label="AND 1" />

            {/* Intermediate Wire S1: From HA1 XOR nose (169, 54) to HA2 XOR (275, 54) and HA2 AND (275, 134) */}
            <SvgWire d="M 169 54 L 275 54" active={s1 === 1} />
            <SvgWire d="M 205 54 L 205 134 L 275 134" active={s1 === 1} />
            <SvgJunction cx="205" cy="54" active={s1 === 1} />

            {/* HA2 Gates */}
            <SvgXorGate x="275" y="44" active={s === 1} label="XOR 2" />
            <SvgAndGate x="275" y="122" active={c2 === 1} label="AND 2" />

            {/* Intermediate Wire C1: From HA1 AND nose (160, 118) to OR Gate top input (405, 152) */}
            <SvgWire d="M 160 118 L 385 118 L 385 152 L 405 152" active={c1 === 1} />

            {/* Intermediate Wire C2: From HA2 AND nose (320, 142) to OR Gate bottom input (405, 172) */}
            <SvgWire d="M 320 142 L 370 142 L 370 172 L 405 172" active={c2 === 1} />

            {/* OR Gate combining C1 and C2 */}
            <SvgOrGate x="405" y="142" active={cout === 1} label="OR" />

            {/* Final Output Sum (S) from HA2 XOR nose (329, 64) */}
            <SvgWire d="M 329 64 L 490 64" active={s === 1} />
            <SvgLed cx={490} cy={64} active={s === 1} label={`S=${s}`} color="#38bdf8" />

            {/* Final Output Carry Out (Cout) from OR nose (455, 162) */}
            <SvgWire d="M 455 162 L 490 162" active={cout === 1} />
            <SvgLed cx={490} cy={162} active={cout === 1} label={`Cout=${cout}`} color="#10b981" />

            {/* Wire text labels */}
            <text x="28" y="34" fill={a === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">A={a}</text>
            <text x="28" y="60" fill={b === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">B={b}</text>
            <text x="28" y="198" fill={cin === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">Cin={cin}</text>
            <text x="180" y="46" fill={s1 === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="700">S₁={s1}</text>
            <text x="175" y="112" fill={c1 === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="700">C₁={c1}</text>
            <text x="338" y="136" fill={c2 === 1 ? '#c084fc' : '#64748b'} fontSize="9" fontWeight="700">C₂={c2}</text>
          </svg>
        </div>

        {/* Input Controls */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${a === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('a')}
          >
            <span className={styles.pinLabel}>Operand A:</span>
            <span className={styles.pinValue}>{a}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${b === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('b')}
          >
            <span className={styles.pinLabel}>Operand B:</span>
            <span className={styles.pinValue}>{b}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${cin === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('cin')}
          >
            <span className={styles.pinLabel}>Carry In (Cin):</span>
            <span className={styles.pinValue}>{cin}</span>
          </button>
        </div>

        <div className={styles.equationSummary}>
          <strong>Arithmetic Total:</strong> {res.details}
        </div>
      </div>

      {/* Full Adder Truth Table */}
      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Full Adder Truth Table</div>
        <div className={styles.tableScroll}>
          <table className={styles.truthTable}>
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>Cin</th>
                <th>Sum (S)</th>
                <th>Cout</th>
              </tr>
            </thead>
            <tbody>
              {res.table.map((row, idx) => {
                const isActive = idx === res.activeRowIndex;
                return (
                  <tr key={idx} className={isActive ? styles.activeRow : ''}>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                    <td>{row.cin}</td>
                    <td>{row.s}</td>
                    <td>{row.cout}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. 4-Bit Ripple Carry Adder Schematic View
// -------------------------------------------------------------
function RippleCarrySchematicView({ def, inputs, onToggle }) {
  const result = def.evaluateMultiBit(inputs);

  return (
    <div className={styles.wideCard}>
      {/* Top Bar Equation */}
      <div className={styles.aluBanner}>
        <div className={styles.aluMath}>
          <span className={styles.operandBadge}>A = {result.valA}₁₀ ({result.valA.toString(2).padStart(4, '0')}₂)</span>
          <span className={styles.operatorSymbol}>+</span>
          <span className={styles.operandBadge}>B = {result.valB}₁₀ ({result.valB.toString(2).padStart(4, '0')}₂)</span>
          <span className={styles.operatorSymbol}>+</span>
          <span className={styles.operandBadge}>C₀ = {inputs.c0}</span>
          <span className={styles.operatorSymbol}>=</span>
          <span className={`${styles.operandBadge} ${styles.resultBadge}`}>
            Total = {result.total}₁₀ (Carry C₄={result.finalCarry}, Sum={result.valSum.toString(2).padStart(4, '0')}₂)
          </span>
        </div>
      </div>

      {/* SVG Ripple Carry Schematic with Live Ripple Wires */}
      <div className={styles.svgWrapper} style={{ margin: '1rem 0' }}>
        <svg viewBox="0 0 660 170" className={styles.circuitSvg}>
          {/* Initial Carry In C0 on right */}
          <text x="640" y="80" fill={inputs.c0 === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800" textAnchor="end">C₀={inputs.c0}</text>
          <SvgWire d="M 620 85 L 535 85" active={inputs.c0 === 1} />

          {/* 4 Full Adder Blocks (Rendered MSB FA3 on left to LSB FA0 on right) */}
          {[
            { idx: 3, x: 50, a: inputs.a3, b: inputs.b3, cin: result.carries[3], cout: result.carries[4], s: result.stages[3].s },
            { idx: 2, x: 180, a: inputs.a2, b: inputs.b2, cin: result.carries[2], cout: result.carries[3], s: result.stages[2].s },
            { idx: 1, x: 310, a: inputs.a1, b: inputs.b1, cin: result.carries[1], cout: result.carries[2], s: result.stages[1].s },
            { idx: 0, x: 440, a: inputs.a0, b: inputs.b0, cin: result.carries[0], cout: result.carries[1], s: result.stages[0].s },
          ].map((fa) => (
            <g key={fa.idx}>
              {/* FA Box */}
              <rect
                x={fa.x}
                y="45"
                width="95"
                height="80"
                rx="8"
                fill="rgba(15, 23, 42, 0.85)"
                stroke={fa.cin === 1 || fa.cout === 1 ? '#38bdf8' : '#334155'}
                strokeWidth="2.5"
              />
              <text x={fa.x + 47} y="68" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">FA {fa.idx}</text>
              <text x={fa.x + 47} y="82" fill="#64748b" fontSize="8" fontWeight="700" textAnchor="middle">Stage 2^{fa.idx}</text>

              {/* Operand A wire from top */}
              <SvgWire d={`M ${fa.x + 25} 12 L ${fa.x + 25} 45`} active={fa.a === 1} />
              <text x={fa.x + 25} y="10" fill={fa.a === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">A{fa.idx}={fa.a}</text>

              {/* Operand B wire from top */}
              <SvgWire d={`M ${fa.x + 70} 12 L ${fa.x + 70} 45`} active={fa.b === 1} />
              <text x={fa.x + 70} y="10" fill={fa.b === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">B{fa.idx}={fa.b}</text>

              {/* Sum S wire to bottom */}
              <SvgWire d={`M ${fa.x + 47} 125 L ${fa.x + 47} 155`} active={fa.s === 1} />
              <circle cx={fa.x + 47} cy="155" r="5" fill={fa.s === 1 ? '#38bdf8' : '#334155'} stroke={fa.s === 1 ? '#bae6fd' : '#475569'} strokeWidth="2" />
              <text x={fa.x + 47} y="168" fill="#f8fafc" fontSize="10" fontWeight="800" textAnchor="middle">S{fa.idx}={fa.s}</text>
            </g>
          ))}

          {/* Ripple Carry Wires connecting the stages horizontally */}
          {/* C1: from FA0 (440) to FA1 (405) */}
          <SvgWire d="M 440 85 L 405 85" active={result.carries[1] === 1} />
          <text x="422" y="78" fill={result.carries[1] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₁={result.carries[1]}</text>

          {/* C2: from FA1 (310) to FA2 (275) */}
          <SvgWire d="M 310 85 L 275 85" active={result.carries[2] === 1} />
          <text x="292" y="78" fill={result.carries[2] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₂={result.carries[2]}</text>

          {/* C3: from FA2 (180) to FA3 (145) */}
          <SvgWire d="M 180 85 L 145 85" active={result.carries[3] === 1} />
          <text x="162" y="78" fill={result.carries[3] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₃={result.carries[3]}</text>

          {/* Final Carry C4 from FA3 (50) to (12) */}
          <SvgWire d="M 50 85 L 12 85" active={result.carries[4] === 1} />
          <circle cx="12" cy="85" r="6" fill={result.carries[4] === 1 ? '#10b981' : '#334155'} stroke={result.carries[4] === 1 ? '#a7f3d0' : '#475569'} strokeWidth="2" />
          <text x="12" y="105" fill="#f8fafc" fontSize="10" fontWeight="900" textAnchor="middle">C₄={result.carries[4]}</text>
        </svg>
      </div>

      {/* Bit Toggle Controls */}
      <div className={styles.stagesPipeline}>
        <div className={styles.c0Block}>
          <span className={styles.c0Label}>Toggle C₀</span>
          <button
            type="button"
            className={`${styles.bitBtn} ${inputs.c0 === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('c0')}
          >
            {inputs.c0}
          </button>
        </div>

        {[3, 2, 1, 0].map((idx) => (
          <div key={idx} className={styles.faStageCard}>
            <div className={styles.stageHeader}>
              <strong>Stage {idx}</strong>
              <span className={styles.bitWeight}>2^{idx}</span>
            </div>
            <div className={styles.stageInputsRow}>
              <div className={styles.stageInputCol}>
                <span className={styles.wireName}>A{idx}</span>
                <button
                  type="button"
                  className={`${styles.bitBtn} ${inputs[`a${idx}`] === 1 ? styles.pinHigh : styles.pinLow}`}
                  onClick={() => onToggle(`a${idx}`)}
                >
                  {inputs[`a${idx}`]}
                </button>
              </div>
              <div className={styles.stageInputCol}>
                <span className={styles.wireName}>B{idx}</span>
                <button
                  type="button"
                  className={`${styles.bitBtn} ${inputs[`b${idx}`] === 1 ? styles.pinHigh : styles.pinLow}`}
                  onClick={() => onToggle(`b${idx}`)}
                >
                  {inputs[`b${idx}`]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Adder-Subtractor Schematic View with Overflow
// -------------------------------------------------------------
function AdderSubtractorSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluateAdderSubtractor(inputs);
  const m = inputs.m;

  return (
    <div className={styles.wideCard}>
      {/* Mode Control Toolbar */}
      <div className={styles.modeToolbar}>
        <div className={styles.modeToggleGroup}>
          <span className={styles.modeTitle}>Mode Signal (M):</span>
          <button
            type="button"
            className={`${styles.modeBtn} ${m === 0 ? styles.modeBtnActiveAdd : ''}`}
            onClick={() => m !== 0 && onToggle('m')}
          >
            M = 0 (ADD: A + B)
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${m === 1 ? styles.modeBtnActiveSub : ''}`}
            onClick={() => m !== 1 && onToggle('m')}
          >
            M = 1 (SUB: A − B via 2's Complement)
          </button>
        </div>

        {/* Overflow Indicator */}
        <div className={`${styles.overflowBanner} ${result.overflow ? styles.overflowActive : styles.overflowSafe}`}>
          <span className={styles.flagIcon}>{result.overflow ? '🚨' : '✅'}</span>
          <div>
            <strong>Signed Overflow Flag (V = C₄ ⊕ C₃ = {result.c4} ⊕ {result.c3} = {result.overflow}):</strong>{' '}
            {result.overflow
              ? `OVERFLOW! Result (${result.signedRes}) exceeds 4-bit signed limits [-8, +7]`
              : `Valid: ${result.signedA} ${m === 1 ? '−' : '+'} ${result.signedB} = ${result.signedRes}`}
          </div>
        </div>
      </div>

      {/* SVG Circuit Canvas with Live Wires & XOR Controlled Inverters */}
      <div className={styles.svgWrapper} style={{ margin: '1rem 0' }}>
        <svg viewBox="0 0 710 240" className={styles.circuitSvg}>
          {/* Mode Rail M running across the top */}
          <text x="690" y="24" fill={m === 1 ? '#c084fc' : '#94a3b8'} fontSize="11" fontWeight="800" textAnchor="end">
            Mode M = {m} ({m === 0 ? 'ADD' : 'SUB'})
          </text>
          <SvgWire d="M 690 30 L 105 30" active={m === 1} colorOverride={m === 1 ? '#c084fc' : undefined} />

          {/* Wire from Mode M down to C0 of FA 0 */}
          <SvgWire d="M 615 30 L 615 145 L 590 145" active={m === 1} colorOverride={m === 1 ? '#c084fc' : undefined} />
          <SvgJunction cx="615" cy="30" active={m === 1} />
          <text x="620" y="140" fill={m === 1 ? '#c084fc' : '#64748b'} fontSize="9" fontWeight="800">C₀ = {m}</text>

          {/* 4 Stages: from MSB (Stage 3) on left to LSB (Stage 0) on right */}
          {[
            { idx: 3, x: 75, a: inputs.a3, b: inputs.b3, bEff: result.stages[3].bEff, cin: result.carries[3], cout: result.carries[4], s: result.stages[3].s },
            { idx: 2, x: 215, a: inputs.a2, b: inputs.b2, bEff: result.stages[2].bEff, cin: result.carries[2], cout: result.carries[3], s: result.stages[2].s },
            { idx: 1, x: 355, a: inputs.a1, b: inputs.b1, bEff: result.stages[1].bEff, cin: result.carries[1], cout: result.carries[2], s: result.stages[1].s },
            { idx: 0, x: 495, a: inputs.a0, b: inputs.b0, bEff: result.stages[0].bEff, cin: result.carries[0], cout: result.carries[1], s: result.stages[0].s },
          ].map((st) => (
            <g key={st.idx}>
              {/* Mode M branch dropping into XOR gate */}
              <SvgWire d={`M ${st.x + 35} 30 L ${st.x + 35} 44`} active={m === 1} colorOverride={m === 1 ? '#c084fc' : undefined} />
              <SvgJunction cx={st.x + 35} cy="30" active={m === 1} />

              {/* Input B wire entering XOR */}
              <SvgWire d={`M ${st.x + 15} 12 L ${st.x + 15} 46`} active={st.b === 1} />
              <text x={st.x + 15} y="10" fill={st.b === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">B{st.idx}={st.b}</text>

              {/* XOR Gate Symbol */}
              <SvgXorGate x={st.x + 8} y="44" active={st.bEff === 1} label="XOR" />

              {/* Inverted / Passed B' wire leaving XOR and entering FA */}
              <SvgWire d={`M ${st.x + 35} 84 L ${st.x + 35} 115`} active={st.bEff === 1} />
              <text x={st.x + 38} y="104" fill={st.bEff === 1 ? '#38bdf8' : '#64748b'} fontSize="8" fontWeight="800">B'{st.idx}={st.bEff}</text>

              {/* Input A wire entering FA directly from top */}
              <SvgWire d={`M ${st.x + 75} 12 L ${st.x + 75} 115`} active={st.a === 1} />
              <text x={st.x + 75} y="10" fill={st.a === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">A{st.idx}={st.a}</text>

              {/* FA Box */}
              <rect
                x={st.x}
                y="115"
                width="95"
                height="75"
                rx="8"
                fill="rgba(15, 23, 42, 0.88)"
                stroke={st.cin === 1 || st.cout === 1 ? '#38bdf8' : '#334155'}
                strokeWidth="2.2"
              />
              <text x={st.x + 47} y="136" fill="#f8fafc" fontSize="12" fontWeight="900" textAnchor="middle">FA {st.idx}</text>
              <text x={st.x + 47} y="149" fill="#64748b" fontSize="8" fontWeight="700" textAnchor="middle">Bit {st.idx}</text>

              {/* Sum S wire to bottom */}
              <SvgWire d={`M ${st.x + 47} 190 L ${st.x + 47} 216`} active={st.s === 1} />
              <circle cx={st.x + 47} cy="216" r="6" fill={st.s === 1 ? '#38bdf8' : '#334155'} stroke={st.s === 1 ? '#bae6fd' : '#475569'} strokeWidth="2" />
              <text x={st.x + 47} y="232" fill="#f8fafc" fontSize="10" fontWeight="800" textAnchor="middle">S{st.idx}={st.s}</text>
            </g>
          ))}

          {/* Ripple Carry Wires connecting FAs */}
          {/* C1: FA0 (495) to FA1 (450) */}
          <SvgWire d="M 495 145 L 450 145" active={result.carries[1] === 1} />
          <text x="472" y="138" fill={result.carries[1] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₁={result.carries[1]}</text>

          {/* C2: FA1 (355) to FA2 (310) */}
          <SvgWire d="M 355 145 L 310 145" active={result.carries[2] === 1} />
          <text x="332" y="138" fill={result.carries[2] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₂={result.carries[2]}</text>

          {/* C3: FA2 (215) to FA3 (170) */}
          <SvgWire d="M 215 145 L 170 145" active={result.carries[3] === 1} />
          <text x="192" y="138" fill={result.carries[3] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800" textAnchor="middle">C₃={result.carries[3]}</text>
          <SvgJunction cx="192" cy="145" active={result.carries[3] === 1} />

          {/* Branch of C3 down to Overflow XOR bottom input */}
          <SvgWire d="M 192 145 L 192 195 L 8 195 L 8 228 L 25 228" active={result.carries[3] === 1} />

          {/* C4 from FA3 (75) to Overflow XOR top input */}
          <SvgWire d="M 75 145 L 15 145 L 15 208 L 25 208" active={result.carries[4] === 1} />
          <text x="50" y="138" fill={result.carries[4] === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800">C₄={result.carries[4]}</text>

          {/* Overflow XOR Gate (takes C4 at 208 and C3 at 228) */}
          <SvgXorGate x="25" y="198" active={result.overflow === 1} label="XOR" />

          {/* Output Overflow LED */}
          <SvgWire d="M 79 218 L 105 218" active={result.overflow === 1} colorOverride={result.overflow === 1 ? '#f43f5e' : undefined} />
          <circle cx="112" cy="218" r="7" fill={result.overflow === 1 ? '#f43f5e' : '#334155'} stroke={result.overflow === 1 ? '#fecdd3' : '#475569'} strokeWidth="2" />
          <text x="125" y="222" fill={result.overflow === 1 ? '#fb7185' : '#94a3b8'} fontSize="11" fontWeight="900">V = {result.overflow}</text>
        </svg>
      </div>

      {/* Bit Manipulation Row */}
      <div className={styles.stagesPipeline}>
        {[3, 2, 1, 0].map((idx) => {
          const st = result.stages[idx];
          return (
            <div key={idx} className={styles.asStageCard}>
              <div className={styles.stageHeader}>
                <strong>Bit {idx}</strong>
                <span>{idx === 3 ? '(Sign Bit MSB)' : ''}</span>
              </div>
              <div className={styles.asInputRow}>
                <div>
                  <span className={styles.wireName}>A{idx}</span>
                  <button
                    type="button"
                    className={`${styles.bitBtn} ${st.a === 1 ? styles.pinHigh : styles.pinLow}`}
                    onClick={() => onToggle(`a${idx}`)}
                  >
                    {st.a}
                  </button>
                </div>
                <div>
                  <span className={styles.wireName}>B{idx}</span>
                  <button
                    type="button"
                    className={`${styles.bitBtn} ${st.bRaw === 1 ? styles.pinHigh : styles.pinLow}`}
                    onClick={() => onToggle(`b${idx}`)}
                  >
                    {st.bRaw}
                  </button>
                </div>
              </div>
              <div className={styles.xorBox}>
                <span>XOR Inverter (B{idx} ⊕ M):</span>
                <strong>{st.bEff}</strong>
              </div>
              <div className={styles.stageOutputs}>
                <div>Sum S{idx}: <strong>{st.s}</strong></div>
                <div>C{idx + 1} out: <strong>{st.cout}</strong></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4B. 4-Bit Carry Lookahead Adder (CLA) Parallel Schematic View
// -------------------------------------------------------------
function CarryLookaheadSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluateCla(inputs);
  const { c0, p, g, carries, s, valA, valB, valSum, total } = result;

  return (
    <div className={styles.wideCard}>
      {/* Top Bar Equation */}
      <div className={styles.aluBanner}>
        <div className={styles.aluMath}>
          <span className={styles.operandBadge}>A = {valA}₁₀ ({valA.toString(2).padStart(4, '0')}₂)</span>
          <span className={styles.operatorSymbol}>+</span>
          <span className={styles.operandBadge}>B = {valB}₁₀ ({valB.toString(2).padStart(4, '0')}₂)</span>
          <span className={styles.operatorSymbol}>+</span>
          <span className={styles.operandBadge}>C₀ = {c0}</span>
          <span className={styles.operatorSymbol}>=</span>
          <span className={`${styles.operandBadge} ${styles.resultBadge}`}>
            Total = {total}₁₀ (Carry C₄={carries[4]}, Sum={valSum.toString(2).padStart(4, '0')}₂)
          </span>
        </div>
      </div>

      {/* SVG CLA Schematic with Parallel Lookahead Unit */}
      <div className={styles.svgWrapper} style={{ margin: '1rem 0' }}>
        <svg viewBox="0 0 710 260" className={styles.circuitSvg}>
          {/* Initial C0 on the right */}
          <text x="690" y="115" fill={c0 === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800" textAnchor="end">C₀={c0}</text>
          <SvgWire d="M 650 120 L 595 120" active={c0 === 1} />

          {/* Central Lookahead Carry Generator Box (LCU) spanning all 4 stages */}
          <rect
            x="60"
            y="95"
            width="535"
            height="55"
            rx="8"
            fill="rgba(168, 85, 247, 0.08)"
            stroke="rgba(168, 85, 247, 0.45)"
            strokeWidth="2"
          />
          <text x="328" y="118" fill="#c084fc" fontSize="12" fontWeight="900" textAnchor="middle">
            LOOKAHEAD CARRY GENERATOR (O(1) Two-Level AND-OR Array)
          </text>
          <text x="328" y="136" fill="#94a3b8" fontSize="9" fontWeight="700" textAnchor="middle">
            Parallel Evaluation: C₁, C₂, C₃, C₄ valid simultaneously at 3Δ (Zero Serial Ripple)
          </text>

          {/* 4 Bit Stages */}
          {[
            { idx: 3, x: 70, a: inputs.a3, b: inputs.b3, p: p[3], g: g[3], cIn: carries[3], s: s[3] },
            { idx: 2, x: 210, a: inputs.a2, b: inputs.b2, p: p[2], g: g[2], cIn: carries[2], s: s[2] },
            { idx: 1, x: 350, a: inputs.a1, b: inputs.b1, p: p[1], g: g[1], cIn: carries[1], s: s[1] },
            { idx: 0, x: 490, a: inputs.a0, b: inputs.b0, p: p[0], g: g[0], cIn: carries[0], s: s[0] },
          ].map((st) => (
            <g key={st.idx}>
              {/* Bit Inputs A & B from top */}
              <SvgWire d={`M ${st.x + 20} 10 L ${st.x + 20} 35`} active={st.a === 1} />
              <text x={st.x + 20} y="8" fill={st.a === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">A{st.idx}={st.a}</text>

              <SvgWire d={`M ${st.x + 65} 10 L ${st.x + 65} 35`} active={st.b === 1} />
              <text x={st.x + 65} y="8" fill={st.b === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">B{st.idx}={st.b}</text>

              {/* P & G Stage Box */}
              <rect
                x={st.x}
                y="35"
                width="88"
                height="45"
                rx="6"
                fill="rgba(15, 23, 42, 0.85)"
                stroke={st.p === 1 || st.g === 1 ? '#38bdf8' : '#334155'}
                strokeWidth="1.8"
              />
              <text x={st.x + 44} y="50" fill="#f8fafc" fontSize="10" fontWeight="800" textAnchor="middle">Stage {st.idx} P/G</text>
              <text x={st.x + 20} y="68" fill={st.p === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800">P={st.p}</text>
              <text x={st.x + 55} y="68" fill={st.g === 1 ? '#34d399' : '#64748b'} fontSize="9" fontWeight="800">G={st.g}</text>

              {/* Wire down into LCU */}
              <SvgWire d={`M ${st.x + 44} 80 L ${st.x + 44} 95`} active={st.p === 1 || st.g === 1} />

              {/* Carry out of LCU to bottom Sum XOR top input */}
              <SvgWire d={`M ${st.x + 30} 150 L ${st.x + 30} 175 L ${st.x + 18} 190`} active={st.cIn === 1} />
              <text x={st.x + 10} y="168" fill={st.cIn === 1 ? '#c084fc' : '#64748b'} fontSize="8" fontWeight="800">C{st.idx}={st.cIn}</text>

              {/* P branch down to bottom Sum XOR bottom input */}
              <SvgWire d={`M ${st.x + 60} 80 L ${st.x + 60} 175 L ${st.x + 18} 210`} active={st.p === 1} />

              {/* Sum XOR Gate at bottom */}
              <SvgXorGate x={st.x + 18} y="180" active={st.s === 1} label={`XOR`} />

              {/* Output Sum S wire from XOR nose to LED */}
              <SvgWire d={`M ${st.x + 72} 200 L ${st.x + 78} 200 L ${st.x + 78} 242`} active={st.s === 1} />
              <circle cx={st.x + 78} cy="242" r="5" fill={st.s === 1 ? '#38bdf8' : '#334155'} stroke={st.s === 1 ? '#bae6fd' : '#475569'} strokeWidth="2" />
              <text x={st.x + 78} y="258" fill="#f8fafc" fontSize="10" fontWeight="900" textAnchor="middle">S{st.idx}={st.s}</text>
            </g>
          ))}

          {/* Terminal Carry Out C4 leaving LCU on far left at x=60 */}
          <SvgWire d="M 60 120 L 25 120 L 25 195" active={carries[4] === 1} colorOverride={carries[4] === 1 ? '#10b981' : undefined} />
          <circle cx="25" cy="195" r="6" fill={carries[4] === 1 ? '#10b981' : '#334155'} stroke={carries[4] === 1 ? '#a7f3d0' : '#475569'} strokeWidth="2" />
          <text x="25" y="215" fill="#f8fafc" fontSize="11" fontWeight="900" textAnchor="middle">C₄={carries[4]}</text>
        </svg>
      </div>

      {/* Bit Toggle Controls */}
      <div className={styles.stagesPipeline}>
        <div className={styles.c0Block}>
          <span className={styles.c0Label}>Toggle C₀</span>
          <button
            type="button"
            className={`${styles.bitBtn} ${c0 === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('c0')}
          >
            {c0}
          </button>
        </div>

        {[3, 2, 1, 0].map((idx) => (
          <div key={idx} className={styles.faStageCard}>
            <div className={styles.stageHeader}>
              <strong>Stage {idx}</strong>
              <span className={styles.bitWeight}>2^{idx}</span>
            </div>
            <div className={styles.stageInputsRow}>
              <div className={styles.stageInputCol}>
                <span className={styles.wireName}>A{idx}</span>
                <button
                  type="button"
                  className={`${styles.bitBtn} ${inputs[`a${idx}`] === 1 ? styles.pinHigh : styles.pinLow}`}
                  onClick={() => onToggle(`a${idx}`)}
                >
                  {inputs[`a${idx}`]}
                </button>
              </div>
              <div className={styles.stageInputCol}>
                <span className={styles.wireName}>B{idx}</span>
                <button
                  type="button"
                  className={`${styles.bitBtn} ${inputs[`b${idx}`] === 1 ? styles.pinHigh : styles.pinLow}`}
                  onClick={() => onToggle(`b${idx}`)}
                >
                  {inputs[`b${idx}`]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. 4:1 Multiplexer Schematic View
// -------------------------------------------------------------
function MuxSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluateMux(inputs);

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionTitle}>Interactive 4:1 MUX Routing</div>

        {/* SVG MUX Schematic with Channel Glow */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 420 190" className={styles.circuitSvg}>
            {/* Trapezoid MUX Symbol */}
            <polygon
              points="140,20 280,45 280,145 140,170"
              fill="rgba(15, 23, 42, 0.9)"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <text x="210" y="98" fill="#f8fafc" fontSize="13" fontWeight="900" textAnchor="middle">4:1 MUX</text>

            {/* 4 Data Inputs on Left */}
            {[0, 1, 2, 3].map((ch) => {
              const yPos = 40 + ch * 35;
              const isSelected = !result.disabled && result.selIdx === ch;
              return (
                <g key={ch}>
                  <SvgWire
                    d={`M 35 ${yPos} L 140 ${yPos}`}
                    active={inputs[`i${ch}`] === 1}
                    colorOverride={isSelected ? '#38bdf8' : undefined}
                    width={isSelected ? 4.5 : 2.5}
                  />
                  <text x="30" y={yPos + 4} fill={isSelected ? '#38bdf8' : '#94a3b8'} fontSize="10" fontWeight="800" textAnchor="end">
                    I{ch}={inputs[`i${ch}`]}
                  </text>
                </g>
              );
            })}

            {/* Select Lines entering from bottom */}
            <SvgWire d="M 180 185 L 180 162" active={inputs.s1 === 1} />
            <text x="180" y="185" fill={inputs.s1 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">S₁={inputs.s1}</text>

            <SvgWire d="M 240 185 L 240 152" active={inputs.s0 === 1} />
            <text x="240" y="185" fill={inputs.s0 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800" textAnchor="middle">S₀={inputs.s0}</text>

            {/* Output Y */}
            <SvgWire d="M 280 95 L 385 95" active={result.out === 1} />
            <circle cx="385" cy="95" r="7" fill={result.out === 1 ? '#38bdf8' : '#334155'} stroke={result.out === 1 ? '#bae6fd' : '#475569'} strokeWidth="2" />
            <text x="398" y="99" fill="#f8fafc" fontSize="12" fontWeight="800">Y={result.out}</text>
          </svg>
        </div>

        {/* Controls */}
        <div className={styles.muxControlRow}>
          <div>
            <span className={styles.wireName}>Enable (E_bar)</span>
            <button
              type="button"
              className={`${styles.pinToggleBtn} ${inputs.ebar === 0 ? styles.pinHigh : styles.pinLow}`}
              onClick={() => onToggle('ebar')}
            >
              {inputs.ebar === 0 ? '0 (Active)' : '1 (Disabled)'}
            </button>
          </div>
          <div>
            <span className={styles.wireName}>Select S₁ (MSB)</span>
            <button
              type="button"
              className={`${styles.pinToggleBtn} ${inputs.s1 === 1 ? styles.pinHigh : styles.pinLow}`}
              onClick={() => onToggle('s1')}
            >
              {inputs.s1}
            </button>
          </div>
          <div>
            <span className={styles.wireName}>Select S₀ (LSB)</span>
            <button
              type="button"
              className={`${styles.pinToggleBtn} ${inputs.s0 === 1 ? styles.pinHigh : styles.pinLow}`}
              onClick={() => onToggle('s0')}
            >
              {inputs.s0}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Data Channels (Toggle Values)</div>
        <div className={styles.channelsGrid}>
          {result.channels.map((ch) => (
            <div key={ch.idx} className={`${styles.channelCard} ${ch.active ? styles.channelActive : ''}`}>
              <div className={styles.channelHeader}>
                <strong>I_{ch.idx}</strong>
                <span>Code {ch.code}</span>
              </div>
              <button
                type="button"
                className={`${styles.pinToggleBtn} ${ch.val === 1 ? styles.pinHigh : styles.pinLow}`}
                onClick={() => onToggle(`i${ch.idx}`)}
              >
                {ch.val}
              </button>
              {ch.active && <span className={styles.steeredTag}>➔ ROUTED</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Decoder & 7. Priority Encoder Standard Views
// -------------------------------------------------------------
function DecoderView({ def, inputs, onToggle }) {
  const result = def.evaluateDecoder(inputs);
  const { e, a, b } = inputs;
  const aBar = a === 1 ? 0 : 1;
  const bBar = b === 1 ? 0 : 1;

  const y0Active = e === 1 && aBar === 1 && bBar === 1;
  const y1Active = e === 1 && aBar === 1 && b === 1;
  const y2Active = e === 1 && a === 1 && bBar === 1;
  const y3Active = e === 1 && a === 1 && b === 1;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>2:4 Decoder Gate-Level Schematic</span>
          <span className={styles.hintTag}>Click Pins to Trace Bus Rails</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 250" className={styles.circuitSvg}>
            {/* Input E (Enable) */}
            <SvgWire d="M 15 25 L 140 25" active={e === 1} />
            <text x="12" y="20" fill={e === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">E={e}</text>
            <SvgJunction cx="140" cy="25" active={e === 1} />
            <SvgWire d="M 140 25 L 140 203" active={e === 1} />

            {/* Input A (MSB) */}
            <SvgWire d="M 15 75 L 60 75" active={a === 1} />
            <text x="12" y="70" fill={a === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">A={a}</text>
            <SvgJunction cx="60" cy="75" active={a === 1} />
            {/* Direct A rail */}
            <SvgWire d="M 60 75 L 165 75 L 165 213" active={a === 1} />
            {/* A NOT gate */}
            <SvgWire d="M 60 75 L 60 100 L 75 100" active={a === 1} />
            <SvgNotGate x="75" y="84" active={aBar === 1} label="NOT" />
            <SvgWire d="M 106.5 100 L 190 100" active={aBar === 1} />
            <SvgJunction cx="190" cy="100" active={aBar === 1} />
            <SvgWire d="M 190 100 L 190 48" active={aBar === 1} />
            <SvgWire d="M 190 100 L 190 103" active={aBar === 1} />
            <text x="118" y="94" fill={aBar === 1 ? '#fb7185' : '#64748b'} fontSize="8" fontWeight="800">A'={aBar}</text>

            {/* Input B (LSB) */}
            <SvgWire d="M 15 145 L 60 145" active={b === 1} />
            <text x="12" y="140" fill={b === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">B={b}</text>
            <SvgJunction cx="60" cy="145" active={b === 1} />
            {/* Direct B rail */}
            <SvgWire d="M 60 145 L 215 145" active={b === 1} />
            <SvgJunction cx="215" cy="145" active={b === 1} />
            <SvgWire d="M 215 145 L 215 113" active={b === 1} />
            <SvgWire d="M 215 145 L 215 223" active={b === 1} />
            {/* B NOT gate */}
            <SvgWire d="M 60 145 L 60 170 L 75 170" active={b === 1} />
            <SvgNotGate x="75" y="154" active={bBar === 1} label="NOT" />
            <SvgWire d="M 106.5 170 L 240 170" active={bBar === 1} />
            <SvgJunction cx="240" cy="170" active={bBar === 1} />
            <SvgWire d="M 240 170 L 240 58" active={bBar === 1} />
            <SvgWire d="M 240 170 L 240 168" active={bBar === 1} />
            <text x="118" y="164" fill={bBar === 1 ? '#fb7185' : '#64748b'} fontSize="8" fontWeight="800">B'={bBar}</text>

            {/* 4 AND Gates: Y0, Y1, Y2, Y3 */}
            {/* AND 0: Y0 = E · A' · B' (y = 35) */}
            <SvgWire d="M 140 38 L 295 38" active={e === 1} />
            <SvgJunction cx="140" cy="38" active={e === 1} />
            <SvgWire d="M 190 48 L 295 48" active={aBar === 1} />
            <SvgJunction cx="190" cy="48" active={aBar === 1} />
            <SvgWire d="M 240 58 L 295 58" active={bBar === 1} />
            <SvgJunction cx="240" cy="58" active={bBar === 1} />
            <SvgAndGate x="295" y="28" active={y0Active} label="AND" />
            <SvgWire d="M 340 48 L 405 48" active={y0Active} />
            <SvgLed cx={405} cy={48} active={y0Active} label="Y₀" color="#10b981" />

            {/* AND 1: Y1 = E · A' · B (y = 90) */}
            <SvgWire d="M 140 93 L 295 93" active={e === 1} />
            <SvgJunction cx="140" cy="93" active={e === 1} />
            <SvgWire d="M 190 103 L 295 103" active={aBar === 1} />
            <SvgJunction cx="190" cy="103" active={aBar === 1} />
            <SvgWire d="M 215 113 L 295 113" active={b === 1} />
            <SvgJunction cx="215" cy="113" active={b === 1} />
            <SvgAndGate x="295" y="83" active={y1Active} label="AND" />
            <SvgWire d="M 340 103 L 405 103" active={y1Active} />
            <SvgLed cx={405} cy={103} active={y1Active} label="Y₁" color="#10b981" />

            {/* AND 2: Y2 = E · A · B' (y = 145) */}
            <SvgWire d="M 140 148 L 295 148" active={e === 1} />
            <SvgJunction cx="140" cy="148" active={e === 1} />
            <SvgWire d="M 165 158 L 295 158" active={a === 1} />
            <SvgJunction cx="165" cy="158" active={a === 1} />
            <SvgWire d="M 240 168 L 295 168" active={bBar === 1} />
            <SvgJunction cx="240" cy="168" active={bBar === 1} />
            <SvgAndGate x="295" y="138" active={y2Active} label="AND" />
            <SvgWire d="M 340 158 L 405 158" active={y2Active} />
            <SvgLed cx={405} cy={158} active={y2Active} label="Y₂" color="#10b981" />

            {/* AND 3: Y3 = E · A · B (y = 200) */}
            <SvgWire d="M 140 203 L 295 203" active={e === 1} />
            <SvgJunction cx="140" cy="203" active={e === 1} />
            <SvgWire d="M 165 213 L 295 213" active={a === 1} />
            <SvgJunction cx="165" cy="213" active={a === 1} />
            <SvgWire d="M 215 223 L 295 223" active={b === 1} />
            <SvgJunction cx="215" cy="223" active={b === 1} />
            <SvgAndGate x="295" y="193" active={y3Active} label="AND" />
            <SvgWire d="M 340 213 L 405 213" active={y3Active} />
            <SvgLed cx={405} cy={213} active={y3Active} label="Y₃" color="#10b981" />
          </svg>
        </div>

        {/* Input Controls */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${e === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('e')}
          >
            <span className={styles.pinLabel}>Enable (E):</span>
            <span className={styles.pinValue}>{e === 1 ? '1 (Active)' : '0 (Off)'}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${a === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('a')}
          >
            <span className={styles.pinLabel}>Address A:</span>
            <span className={styles.pinValue}>{a}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${b === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('b')}
          >
            <span className={styles.pinLabel}>Address B:</span>
            <span className={styles.pinValue}>{b}</span>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>1-of-4 Activation Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>E</th>
              <th>A</th>
              <th>B</th>
              <th>Y₃</th>
              <th>Y₂</th>
              <th>Y₁</th>
              <th>Y₀</th>
            </tr>
          </thead>
          <tbody>
            {[
              { a: 0, b: 0, y: [0, 0, 0, 1] },
              { a: 0, b: 1, y: [0, 0, 1, 0] },
              { a: 1, b: 0, y: [0, 1, 0, 0] },
              { a: 1, b: 1, y: [1, 0, 0, 0] },
            ].map((row, i) => {
              const isCur = inputs.e === 1 && inputs.a === row.a && inputs.b === row.b;
              return (
                <tr key={i} className={isCur ? styles.activeRow : ''}>
                  <td>1</td>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                  <td>{row.y[0]}</td>
                  <td>{row.y[1]}</td>
                  <td>{row.y[2]}</td>
                  <td>{row.y[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PriorityEncoderView({ def, inputs, onToggle }) {
  const result = def.evaluatePriority(inputs);
  const { d3, d2, d1, d0 } = inputs;
  const d2Bar = d2 === 1 ? 0 : 1;
  const termD2barD1 = d2Bar & d1;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>4:2 Priority Encoder Gate-Level Schematic</span>
          <span className={styles.hintTag}>Click Pins to Test Priority Masking</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 250" className={styles.circuitSvg}>
            {/* Input Request Lines D3..D0 */}
            {/* D3 (Highest Priority) */}
            <SvgWire d="M 15 30 L 280 30" active={d3 === 1} />
            <text x="12" y="24" fill={d3 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">D₃={d3} (High)</text>
            <SvgJunction cx="55" cy="30" active={d3 === 1} />
            <SvgJunction cx="75" cy="30" active={d3 === 1} />

            {/* D3 branch down to OR2 (Y0) */}
            <SvgWire d="M 55 30 L 55 110 L 280 110" active={d3 === 1} />

            {/* D3 branch down to OR3 (V) */}
            <SvgWire d="M 75 30 L 75 186 L 280 186" active={d3 === 1} />

            {/* D2 */}
            <SvgWire d="M 15 65 L 240 65 L 240 50 L 280 50" active={d2 === 1} />
            <text x="12" y="60" fill={d2 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">D₂={d2}</text>
            <SvgJunction cx="45" cy="65" active={d2 === 1} />
            <SvgJunction cx="85" cy="65" active={d2 === 1} />

            {/* D2 branch to Inverter for D2' */}
            <SvgWire d="M 45 65 L 45 120 L 75 120" active={d2 === 1} />
            <SvgNotGate x="75" y="104" active={d2Bar === 1} label="NOT" />
            <SvgWire d="M 106.5 120 L 175 120" active={d2Bar === 1} />

            {/* D2 branch to OR3 (V) */}
            <SvgWire d="M 85 65 L 85 195 L 280 195" active={d2 === 1} />

            {/* D1 */}
            <SvgWire d="M 15 140 L 175 140" active={d1 === 1} />
            <text x="12" y="135" fill={d1 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">D₁={d1}</text>
            <SvgJunction cx="95" cy="140" active={d1 === 1} />

            {/* D1 branch to OR3 (V) */}
            <SvgWire d="M 95 140 L 95 204 L 280 204" active={d1 === 1} />

            {/* D0 */}
            <SvgWire d="M 15 214 L 280 214" active={d0 === 1} />
            <text x="12" y="210" fill={d0 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">D₀={d0} (Low)</text>

            {/* AND Gate computing D2' · D1 */}
            <SvgAndGate x="175" y="110" active={termD2barD1 === 1} label="AND" />
            <SvgWire d="M 220 130 L 280 130" active={termD2barD1 === 1} />

            {/* OR 1: Y1 = D3 + D2 */}
            <SvgOrGate x="280" y="20" active={result.y1 === 1} label="OR" />
            <SvgWire d="M 330 40 L 405 40" active={result.y1 === 1} />
            <SvgLed cx={405} cy={40} active={result.y1 === 1} label="Y₁" color="#38bdf8" />

            {/* OR 2: Y0 = D3 + D2'D1 */}
            <SvgOrGate x="280" y="100" active={result.y0 === 1} label="OR" />
            <SvgWire d="M 330 120 L 405 120" active={result.y0 === 1} />
            <SvgLed cx={405} cy={120} active={result.y0 === 1} label="Y₀" color="#38bdf8" />

            {/* OR 3: Valid Flag V = D3 + D2 + D1 + D0 */}
            <SvgOrGate x="280" y="180" active={result.v === 1} label="OR" />
            <SvgWire d="M 330 200 L 405 200" active={result.v === 1} colorOverride={result.v === 1 ? '#10b981' : undefined} />
            <SvgLed cx={405} cy={200} active={result.v === 1} label="V" color="#10b981" />
          </svg>
        </div>

        {/* Input Toggle Controls */}
        <div className={styles.inputPinsRow}>
          {['d3', 'd2', 'd1', 'd0'].map((key) => {
            const val = inputs[key];
            const isWinner = result.activeSource.toLowerCase().startsWith(key);
            return (
              <button
                key={key}
                type="button"
                className={`${styles.pinToggleBtn} ${val === 1 ? styles.pinHigh : styles.pinLow} ${isWinner ? styles.cardActive : ''}`}
                onClick={() => onToggle(key)}
              >
                <span className={styles.pinLabel}>{key.toUpperCase()}:</span>
                <span className={styles.pinValue}>{val}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.equationSummary}>
          <strong>Active Request Arbiter:</strong> {result.activeSource}
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Priority Resolution Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>D₃</th>
              <th>D₂</th>
              <th>D₁</th>
              <th>D₀</th>
              <th>Y₁</th>
              <th>Y₀</th>
              <th>V</th>
            </tr>
          </thead>
          <tbody>
            {[
              { d3: 0, d2: 0, d1: 0, d0: 0, y1: '×', y0: '×', v: 0 },
              { d3: 0, d2: 0, d1: 0, d0: 1, y1: 0, y0: 0, v: 1 },
              { d3: 0, d2: 0, d1: 1, d0: '×', y1: 0, y0: 1, v: 1 },
              { d3: 0, d2: 1, d1: '×', d0: '×', y1: 1, y0: 0, v: 1 },
              { d3: 1, d2: '×', d1: '×', d0: '×', y1: 1, y0: 1, v: 1 },
            ].map((row, idx) => {
              const isMatch =
                (row.d3 === inputs.d3 || row.d3 === '×') &&
                (row.d2 === inputs.d2 || row.d2 === '×') &&
                (row.d1 === inputs.d1 || row.d1 === '×') &&
                (row.d0 === inputs.d0 || row.d0 === '×');
              return (
                <tr key={idx} className={isMatch ? styles.activeRow : ''}>
                  <td>{row.d3}</td>
                  <td>{row.d2}</td>
                  <td>{row.d1}</td>
                  <td>{row.d0}</td>
                  <td>{row.y1}</td>
                  <td>{row.y0}</td>
                  <td>{row.v}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. Half Subtractor Dedicated Schematic View
// -------------------------------------------------------------
function HalfSubtractorSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluate(inputs);
  const a = inputs.a;
  const b = inputs.b;
  const aBar = a === 1 ? 0 : 1;
  const d = a ^ b;
  const bout = aBar & b;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Half Subtractor Gate Schematic</span>
          <span className={styles.hintTag}>Click Pins to Toggle Voltage</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 450 190" className={styles.circuitSvg}>
            {/* Input Wire A: From (25, 48) to XOR (195, 48) and branch down to NOT (85, 134) */}
            <SvgWire d="M 25 48 L 195 48" active={a === 1} />
            <SvgWire d="M 65 48 L 65 134 L 85 134" active={a === 1} />
            <SvgJunction cx="65" cy="48" active={a === 1} />

            {/* Input Wire B: From (25, 150) to AND (195, 150) and branch up to XOR (195, 68) */}
            <SvgWire d="M 25 150 L 195 150" active={b === 1} />
            <SvgWire d="M 135 150 L 135 68 L 195 68" active={b === 1} />
            <SvgJunction cx="135" cy="150" active={b === 1} />

            {/* Gates */}
            {/* XOR Gate for Difference D = A ⊕ B */}
            <SvgXorGate x="195" y="38" active={d === 1} label="XOR" />

            {/* NOT Gate for A' */}
            <SvgNotGate x="85" y="118" active={aBar === 1} label="NOT" />
            <SvgWire d="M 116.5 134 L 195 134" active={aBar === 1} />

            {/* AND Gate for Borrow Bout = A' · B */}
            <SvgAndGate x="195" y="122" active={bout === 1} label="AND" />

            {/* Output Wire D: from XOR nose (195 + 54 = 249, 58) to LED (375, 58) */}
            <SvgWire d="M 249 58 L 375 58" active={d === 1} />
            <SvgLed cx={375} cy={58} active={d === 1} label={`D=${d}`} color="#38bdf8" />

            {/* Output Wire Bout: from AND nose (195 + 45 = 240, 142) to LED (375, 142) */}
            <SvgWire d="M 240 142 L 375 142" active={bout === 1} colorOverride={bout === 1 ? '#f43f5e' : undefined} />
            <SvgLed cx={375} cy={142} active={bout === 1} label={`Bout=${bout}`} color="#f43f5e" />

            {/* Text labels on wires */}
            <text x="35" y="40" fill={a === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800">A={a}</text>
            <text x="35" y="165" fill={b === 1 ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="800">B={b}</text>
            <text x="130" y="128" fill={aBar === 1 ? '#fb7185' : '#64748b'} fontSize="9" fontWeight="800">A'={aBar}</text>
            <text x="260" y="50" fill={d === 1 ? '#38bdf8' : '#64748b'} fontSize="10" fontWeight="800">D = A ⊕ B</text>
            <text x="260" y="134" fill={bout === 1 ? '#fb7185' : '#64748b'} fontSize="10" fontWeight="800">Bout = A' · B</text>
          </svg>
        </div>

        {/* Interactive Input Buttons */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${a === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('a')}
          >
            <span className={styles.pinLabel}>Toggle Minuend A:</span>
            <span className={styles.pinValue}>{a}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${b === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('b')}
          >
            <span className={styles.pinLabel}>Toggle Subtrahend B:</span>
            <span className={styles.pinValue}>{b}</span>
          </button>
        </div>

        <div className={styles.equationSummary}>
          <strong>Arithmetic Operation:</strong> {result.details}
        </div>
      </div>

      {/* Truth Table */}
      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Half Subtractor Truth Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>Difference (D = A ⊕ B)</th>
              <th>Borrow (Bout = A'B)</th>
            </tr>
          </thead>
          <tbody>
            {result.table.map((row, idx) => {
              const isActive = idx === result.activeRowIndex;
              return (
                <tr key={idx} className={isActive ? styles.activeRow : ''}>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                  <td>{row.d}</td>
                  <td>{row.bout}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. Full Subtractor Dedicated Schematic View (2 HSs + 1 OR Gate)
// -------------------------------------------------------------
function FullSubtractorSchematicView({ def, inputs, onToggle }) {
  const res = def.evaluate(inputs);
  const { a, b, bin } = inputs;
  const { d1, b1, b2, d, bout } = res;
  const aBar = a === 1 ? 0 : 1;
  const d1Bar = d1 === 1 ? 0 : 1;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>Full Subtractor Schematic (2 HSs + 1 OR)</span>
          <span className={styles.hintTag}>Click Pins to Trace Current</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 580 250" className={styles.circuitSvg}>
            {/* Box container for HS1 */}
            <rect x="75" y="15" width="145" height="135" rx="8" fill="rgba(56, 189, 248, 0.04)" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="4 3" />
            <text x="82" y="28" fill="#38bdf8" fontSize="9" fontWeight="800">HALF SUBTRACTOR 1</text>

            {/* Box container for HS2 */}
            <rect x="235" y="25" width="150" height="145" rx="8" fill="rgba(168, 85, 247, 0.04)" stroke="rgba(168, 85, 247, 0.25)" strokeDasharray="4 3" />
            <text x="242" y="38" fill="#c084fc" fontSize="9" fontWeight="800">HALF SUBTRACTOR 2</text>

            {/* Input A: (25, 44) */}
            <SvgWire d="M 25 44 L 120 44" active={a === 1} />
            <SvgWire d="M 45 44 L 45 118 L 60 118" active={a === 1} />
            <SvgJunction cx="45" cy="44" active={a === 1} />

            {/* Input B: (25, 64) */}
            <SvgWire d="M 25 64 L 120 64" active={b === 1} />
            <SvgWire d="M 55 64 L 55 126 L 120 126" active={b === 1} />
            <SvgJunction cx="55" cy="64" active={b === 1} />

            {/* Input Bin: (25, 210) */}
            <SvgWire d="M 25 210 L 250 210 L 250 74 L 280 74" active={bin === 1} />
            <SvgWire d="M 250 150 L 280 150" active={bin === 1} />
            <SvgJunction cx="250" cy="150" active={bin === 1} />

            {/* HS1 Gates */}
            <SvgXorGate x="120" y="34" active={d1 === 1} label="XOR 1" />
            <SvgNotGate x="60" y="102" active={aBar === 1} label="NOT 1" />
            <SvgWire d="M 91.5 118 L 120 118" active={aBar === 1} />
            <SvgAndGate x="120" y="98" active={b1 === 1} label="AND 1" />

            {/* Intermediate Wire D1: from HS1 XOR nose (174, 54) to HS2 XOR (280, 54) */}
            <SvgWire d="M 174 54 L 280 54" active={d1 === 1} />
            <SvgWire d="M 195 54 L 195 142 L 220 142" active={d1 === 1} />
            <SvgJunction cx="195" cy="54" active={d1 === 1} />

            {/* HS2 Gates */}
            <SvgXorGate x="280" y="44" active={d === 1} label="XOR 2" />
            <SvgNotGate x="220" y="126" active={d1Bar === 1} label="NOT 2" />
            <SvgWire d="M 251.5 142 L 280 142" active={d1Bar === 1} />
            <SvgAndGate x="280" y="122" active={b2 === 1} label="AND 2" />

            {/* Intermediate Wire B1: from HS1 AND nose (165, 118) to OR top input (410, 152) */}
            <SvgWire d="M 165 118 L 390 118 L 390 152 L 410 152" active={b1 === 1} />

            {/* Intermediate Wire B2: from HS2 AND nose (325, 142) to OR bottom input (410, 172) */}
            <SvgWire d="M 325 142 L 375 142 L 375 172 L 410 172" active={b2 === 1} />

            {/* OR Gate combining B1 and B2 */}
            <SvgOrGate x="410" y="142" active={bout === 1} label="OR" />

            {/* Final Output Difference (D) from HS2 XOR nose (334, 64) */}
            <SvgWire d="M 334 64 L 490 64" active={d === 1} />
            <SvgLed cx={490} cy={64} active={d === 1} label={`D=${d}`} color="#38bdf8" />

            {/* Final Output Borrow Out (Bout) from OR nose (460, 162) */}
            <SvgWire d="M 460 162 L 490 162" active={bout === 1} colorOverride={bout === 1 ? '#f43f5e' : undefined} />
            <SvgLed cx={490} cy={162} active={bout === 1} label={`Bout=${bout}`} color="#f43f5e" />

            {/* Wire text labels */}
            <text x="28" y="34" fill={a === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">A={a}</text>
            <text x="28" y="60" fill={b === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">B={b}</text>
            <text x="28" y="202" fill={bin === 1 ? '#34d399' : '#94a3b8'} fontSize="10" fontWeight="700">Bin={bin}</text>
            <text x="180" y="46" fill={d1 === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="700">D₁={d1}</text>
            <text x="175" y="112" fill={b1 === 1 ? '#fb7185' : '#64748b'} fontSize="9" fontWeight="700">B₁={b1}</text>
            <text x="338" y="136" fill={b2 === 1 ? '#c084fc' : '#64748b'} fontSize="9" fontWeight="700">B₂={b2}</text>
          </svg>
        </div>

        {/* Input Controls */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${a === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('a')}
          >
            <span className={styles.pinLabel}>Minuend A:</span>
            <span className={styles.pinValue}>{a}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${b === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('b')}
          >
            <span className={styles.pinLabel}>Subtrahend B:</span>
            <span className={styles.pinValue}>{b}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${bin === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('bin')}
          >
            <span className={styles.pinLabel}>Borrow In (Bin):</span>
            <span className={styles.pinValue}>{bin}</span>
          </button>
        </div>

        <div className={styles.equationSummary}>
          <strong>Arithmetic Operation:</strong> {res.details}
        </div>
      </div>

      {/* Truth Table */}
      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Full Subtractor Truth Table</div>
        <div className={styles.tableScroll}>
          <table className={styles.truthTable}>
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>Bin</th>
                <th>Diff (D)</th>
                <th>Bout</th>
              </tr>
            </thead>
            <tbody>
              {res.table.map((row, idx) => {
                const isActive = idx === res.activeRowIndex;
                return (
                  <tr key={idx} className={isActive ? styles.activeRow : ''}>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                    <td>{row.bin}</td>
                    <td>{row.d}</td>
                    <td>{row.bout}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. 1:4 Demultiplexer Dedicated Schematic View
// -------------------------------------------------------------
function DemuxSchematicView({ def, inputs, onToggle }) {
  const result = def.evaluateDemux(inputs);
  const { din, s1, s0 } = inputs;
  const s1Bar = s1 === 1 ? 0 : 1;
  const s0Bar = s0 === 1 ? 0 : 1;

  const y0Active = s1Bar === 1 && s0Bar === 1 && din === 1;
  const y1Active = s1Bar === 1 && s0 === 1 && din === 1;
  const y2Active = s1 === 1 && s0Bar === 1 && din === 1;
  const y3Active = s1 === 1 && s0 === 1 && din === 1;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>1:4 Demultiplexer Gate-Level Schematic</span>
          <span className={styles.hintTag}>Click Pins to Steer Data Stream</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 250" className={styles.circuitSvg}>
            {/* Input Din (Data In) */}
            <SvgWire d="M 15 25 L 130 25" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
            <text x="12" y="20" fill={din === 1 ? '#38bdf8' : '#94a3b8'} fontSize="9" fontWeight="800">Din={din}</text>
            <SvgJunction cx="130" cy="25" active={din === 1} />
            {/* Din Bus Rail spanning all 4 gates */}
            <SvgWire d="M 130 25 L 130 203" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />

            {/* Input S1 (MSB Select) */}
            <SvgWire d="M 15 75 L 60 75" active={s1 === 1} />
            <text x="12" y="70" fill={s1 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">S₁={s1}</text>
            <SvgJunction cx="60" cy="75" active={s1 === 1} />
            {/* Direct S1 rail */}
            <SvgWire d="M 60 75 L 160 75 L 160 213" active={s1 === 1} />
            {/* S1 NOT gate */}
            <SvgWire d="M 60 75 L 60 100 L 75 100" active={s1 === 1} />
            <SvgNotGate x="75" y="84" active={s1Bar === 1} label="NOT" />
            <SvgWire d="M 106.5 100 L 190 100" active={s1Bar === 1} />
            <SvgJunction cx="190" cy="100" active={s1Bar === 1} />
            <SvgWire d="M 190 100 L 190 48" active={s1Bar === 1} />
            <SvgWire d="M 190 100 L 190 103" active={s1Bar === 1} />
            <text x="118" y="94" fill={s1Bar === 1 ? '#fb7185' : '#64748b'} fontSize="8" fontWeight="800">S₁'={s1Bar}</text>

            {/* Input S0 (LSB Select) */}
            <SvgWire d="M 15 145 L 60 145" active={s0 === 1} />
            <text x="12" y="140" fill={s0 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">S₀={s0}</text>
            <SvgJunction cx="60" cy="145" active={s0 === 1} />
            {/* Direct S0 rail */}
            <SvgWire d="M 60 145 L 220 145" active={s0 === 1} />
            <SvgJunction cx="220" cy="145" active={s0 === 1} />
            <SvgWire d="M 220 145 L 220 113" active={s0 === 1} />
            <SvgWire d="M 220 145 L 220 223" active={s0 === 1} />
            {/* S0 NOT gate */}
            <SvgWire d="M 60 145 L 60 170 L 75 170" active={s0 === 1} />
            <SvgNotGate x="75" y="154" active={s0Bar === 1} label="NOT" />
            <SvgWire d="M 106.5 170 L 250 170" active={s0Bar === 1} />
            <SvgJunction cx="250" cy="170" active={s0Bar === 1} />
            <SvgWire d="M 250 170 L 250 58" active={s0Bar === 1} />
            <SvgWire d="M 250 170 L 250 168" active={s0Bar === 1} />
            <text x="118" y="164" fill={s0Bar === 1 ? '#fb7185' : '#64748b'} fontSize="8" fontWeight="800">S₀'={s0Bar}</text>

            {/* 4 AND Gates: Y0..Y3 at x=295 */}
            {/* AND 0: Y0 = Din · S1' · S0' (y = 28..68, center 48) */}
            <SvgWire d="M 130 38 L 295 38" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
            <SvgJunction cx="130" cy="38" active={din === 1} />
            <SvgWire d="M 190 48 L 295 48" active={s1Bar === 1} />
            <SvgJunction cx="190" cy="48" active={s1Bar === 1} />
            <SvgWire d="M 250 58 L 295 58" active={s0Bar === 1} />
            <SvgJunction cx="250" cy="58" active={s0Bar === 1} />
            <SvgAndGate x="295" y="28" active={y0Active} label="AND" />
            <SvgWire d="M 340 48 L 405 48" active={y0Active} colorOverride={y0Active ? '#10b981' : undefined} />
            <SvgLed cx={405} cy={48} active={y0Active} label="Y₀" color="#10b981" />

            {/* AND 1: Y1 = Din · S1' · S0 (y = 83..123, center 103) */}
            <SvgWire d="M 130 93 L 295 93" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
            <SvgJunction cx="130" cy="93" active={din === 1} />
            <SvgWire d="M 190 103 L 295 103" active={s1Bar === 1} />
            <SvgJunction cx="190" cy="103" active={s1Bar === 1} />
            <SvgWire d="M 220 113 L 295 113" active={s0 === 1} />
            <SvgJunction cx="220" cy="113" active={s0 === 1} />
            <SvgAndGate x="295" y="83" active={y1Active} label="AND" />
            <SvgWire d="M 340 103 L 405 103" active={y1Active} colorOverride={y1Active ? '#10b981' : undefined} />
            <SvgLed cx={405} cy={103} active={y1Active} label="Y₁" color="#10b981" />

            {/* AND 2: Y2 = Din · S1 · S0' (y = 138..178, center 158) */}
            <SvgWire d="M 130 148 L 295 148" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
            <SvgJunction cx="130" cy="148" active={din === 1} />
            <SvgWire d="M 160 158 L 295 158" active={s1 === 1} />
            <SvgJunction cx="160" cy="158" active={s1 === 1} />
            <SvgWire d="M 250 168 L 295 168" active={s0Bar === 1} />
            <SvgJunction cx="250" cy="168" active={s0Bar === 1} />
            <SvgAndGate x="295" y="138" active={y2Active} label="AND" />
            <SvgWire d="M 340 158 L 405 158" active={y2Active} colorOverride={y2Active ? '#10b981' : undefined} />
            <SvgLed cx={405} cy={158} active={y2Active} label="Y₂" color="#10b981" />

            {/* AND 3: Y3 = Din · S1 · S0 (y = 193..233, center 213) */}
            <SvgWire d="M 130 203 L 295 203" active={din === 1} colorOverride={din === 1 ? '#38bdf8' : undefined} />
            <SvgJunction cx="130" cy="203" active={din === 1} />
            <SvgWire d="M 160 213 L 295 213" active={s1 === 1} />
            <SvgJunction cx="160" cy="213" active={s1 === 1} />
            <SvgWire d="M 220 223 L 295 223" active={s0 === 1} />
            <SvgJunction cx="220" cy="223" active={s0 === 1} />
            <SvgAndGate x="295" y="193" active={y3Active} label="AND" />
            <SvgWire d="M 340 213 L 405 213" active={y3Active} colorOverride={y3Active ? '#10b981' : undefined} />
            <SvgLed cx={405} cy={213} active={y3Active} label="Y₃" color="#10b981" />
          </svg>
        </div>

        {/* Input Controls */}
        <div className={styles.inputPinsRow}>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${din === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('din')}
          >
            <span className={styles.pinLabel}>Data In (Din):</span>
            <span className={styles.pinValue}>{din}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${s1 === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('s1')}
          >
            <span className={styles.pinLabel}>Select S₁:</span>
            <span className={styles.pinValue}>{s1}</span>
          </button>
          <button
            type="button"
            className={`${styles.pinToggleBtn} ${s0 === 1 ? styles.pinHigh : styles.pinLow}`}
            onClick={() => onToggle('s0')}
          >
            <span className={styles.pinLabel}>Select S₀:</span>
            <span className={styles.pinValue}>{s0}</span>
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Demultiplexing Routing Status</div>
        <div className={styles.channelsGrid}>
          {result.channels.map((ch) => (
            <div key={ch.idx} className={`${styles.channelCard} ${ch.active ? styles.channelActive : ''}`}>
              <div className={styles.channelHeader}>
                <strong>Y_{ch.idx}</strong>
                <span>Code {ch.code}</span>
              </div>
              <div className={styles.outDigit} style={{ color: ch.active && ch.val === 1 ? '#10b981' : '#64748b' }}>
                {ch.val}
              </div>
              {ch.active && <span className={styles.steeredTag}>➔ DISTRIBUTED</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. 4:2 Standard Binary Encoder View with Ambiguity Warnings
// -------------------------------------------------------------
function StandardEncoderView({ def, inputs, onToggle }) {
  const result = def.evaluateEncoder(inputs);
  const { y3, y2, y1, y0 } = inputs;
  const { a1, a0, status, message } = result;

  return (
    <div className={styles.splitGrid}>
      <div className={styles.schematicCard}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionTitle}>4:2 Standard Encoder Schematic</span>
          <span className={styles.hintTag}>Click Pins to Test Encoding</span>
        </div>

        {/* SVG Circuit Canvas */}
        <div className={styles.svgWrapper}>
          <svg viewBox="0 0 460 230" className={styles.circuitSvg}>
            {/* Input Y3: (15, 35) */}
            <SvgWire d="M 15 35 L 250 35 L 250 50 L 280 50" active={y3 === 1} />
            <text x="12" y="28" fill={y3 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">Y₃={y3}</text>
            <SvgJunction cx="75" cy="35" active={y3 === 1} />

            {/* Y3 branch down to OR 2 top input (280, 130) */}
            <SvgWire d="M 75 35 L 75 130 L 280 130" active={y3 === 1} />

            {/* Input Y2: (15, 70) to OR 1 bottom input (280, 70) */}
            <SvgWire d="M 15 70 L 280 70" active={y2 === 1} />
            <text x="12" y="65" fill={y2 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">Y₂={y2}</text>

            {/* Input Y1: (15, 150) to OR 2 bottom input (280, 150) */}
            <SvgWire d="M 15 150 L 280 150" active={y1 === 1} />
            <text x="12" y="145" fill={y1 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">Y₁={y1}</text>

            {/* Input Y0: (15, 195) */}
            <SvgWire d="M 15 195 L 240 195" active={y0 === 1} colorOverride={y0 === 1 ? '#94a3b8' : undefined} />
            <text x="12" y="190" fill={y0 === 1 ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="800">Y₀={y0}</text>
            <text x="248" y="198" fill="#64748b" fontSize="8" fontWeight="700">(Encodes to 00; No OR gate required)</text>

            {/* OR 1: A1 = Y3 + Y2 at (280, 40) */}
            <SvgOrGate x="280" y="40" active={a1 === 1} label="OR" />
            <SvgWire d="M 330 60 L 405 60" active={a1 === 1} />
            <SvgLed cx={405} cy={60} active={a1 === 1} label="A₁" color="#38bdf8" />
            <text x="340" y="52" fill={a1 === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800">A₁ = Y₃ + Y₂</text>

            {/* OR 2: A0 = Y3 + Y1 at (280, 120) */}
            <SvgOrGate x="280" y="120" active={a0 === 1} label="OR" />
            <SvgWire d="M 330 140 L 405 140" active={a0 === 1} />
            <SvgLed cx={405} cy={140} active={a0 === 1} label="A₀" color="#38bdf8" />
            <text x="340" y="132" fill={a0 === 1 ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="800">A₀ = Y₃ + Y₁</text>
          </svg>
        </div>

        {/* Input Toggle Controls */}
        <div className={styles.inputPinsRow}>
          {['y3', 'y2', 'y1', 'y0'].map((key) => {
            const val = inputs[key];
            return (
              <button
                key={key}
                type="button"
                className={`${styles.pinToggleBtn} ${val === 1 ? styles.pinHigh : styles.pinLow}`}
                onClick={() => onToggle(key)}
              >
                <span className={styles.pinLabel}>{key.toUpperCase()}:</span>
                <span className={styles.pinValue}>{val}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Architectural Alert Banner */}
        <div style={{ marginTop: '1rem' }} className={`${styles.overflowBanner} ${status === 'conflict' ? styles.overflowActive : status === 'allzero' ? styles.xorBox : styles.overflowSafe}`}>
          <span className={styles.flagIcon}>{status === 'conflict' ? '🚨' : status === 'allzero' ? '⚠️' : '✅'}</span>
          <div>
            <strong>{status === 'conflict' ? 'Priority Conflict Detected: ' : status === 'allzero' ? 'All-Zero Ambiguity: ' : 'Standard Encoding: '}</strong>
            {message}
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.sectionTitle}>Standard Encoder Truth Table</div>
        <table className={styles.truthTable}>
          <thead>
            <tr>
              <th>Active Line</th>
              <th>Y₃</th>
              <th>Y₂</th>
              <th>Y₁</th>
              <th>Y₀</th>
              <th>A₁</th>
              <th>A₀</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Y₀ only', y3: 0, y2: 0, y1: 0, y0: 1, a1: 0, a0: 0 },
              { label: 'Y₁ only', y3: 0, y2: 0, y1: 1, y0: 0, a1: 0, a0: 1 },
              { label: 'Y₂ only', y3: 0, y2: 1, y1: 0, y0: 0, a1: 1, a0: 0 },
              { label: 'Y₃ only', y3: 1, y2: 0, y1: 0, y0: 0, a1: 1, a0: 1 },
            ].map((row, idx) => {
              const isMatch = inputs.y3 === row.y3 && inputs.y2 === row.y2 && inputs.y1 === row.y1 && inputs.y0 === row.y0;
              return (
                <tr key={idx} className={isMatch ? styles.activeRow : ''}>
                  <td>{row.label}</td>
                  <td>{row.y3}</td>
                  <td>{row.y2}</td>
                  <td>{row.y1}</td>
                  <td>{row.y0}</td>
                  <td>{row.a1}</td>
                  <td>{row.a0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

