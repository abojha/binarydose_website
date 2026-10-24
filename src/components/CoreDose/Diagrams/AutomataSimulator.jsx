import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './AutomataSimulator.module.css';

const PRESETS = {
  // --- Standard DFAs ---
  even_a: {
    id: 'even_a',
    name: "Even Number of a's",
    badge: 'Parity DFA',
    type: 'dfa',
    description: "Accepts all strings over {a, b} where count of symbol 'a' is even (|w|_a ≡ 0 mod 2).",
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 115, isInitial: true, isFinal: true, subtext: "Even a's", subtextPos: { x: 0, y: 46, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 280, y: 115, isInitial: false, isFinal: false, subtext: "Odd a's", subtextPos: { x: 0, y: 46, anchor: 'middle' } },
    ],
    transitions: {
      q0: { a: 'q1', b: 'q0' },
      q1: { a: 'q0', b: 'q1' },
    },
    defaultString: 'baba',
    testCases: ['baba', 'aba', 'bb', 'aaaa', 'a'],
    arcs: [
      { d: 'M 88 92 C 65 42, 135 42, 112 92', from: 'q0', to: 'q0', symbol: 'b', labelX: 100, labelY: 38 },
      { d: 'M 123 103 Q 190 73, 257 103', from: 'q0', to: 'q1', symbol: 'a', labelX: 190, labelY: 72 },
      { d: 'M 257 127 Q 190 157, 123 127', from: 'q1', to: 'q0', symbol: 'a', labelX: 190, labelY: 155 },
      { d: 'M 268 92 C 245 42, 315 42, 292 92', from: 'q1', to: 'q1', symbol: 'b', labelX: 280, labelY: 38 },
    ],
  },
  mod3: {
    id: 'mod3',
    name: 'Binary Modulo 3',
    badge: 'Divisibility',
    type: 'dfa',
    description: 'Accepts all binary strings whose decimal value is divisible by 3 (w ≡ 0 mod 3).',
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 80, y: 115, isInitial: true, isFinal: true, subtext: 'rem = 0', subtextPos: { x: 0, y: 46, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 255, y: 62, isInitial: false, isFinal: false, subtext: 'rem = 1', subtextPos: { x: 38, y: 4, anchor: 'start' } },
      { id: 'q2', label: 'q2', x: 255, y: 168, isInitial: false, isFinal: false, subtext: 'rem = 2', subtextPos: { x: 38, y: 4, anchor: 'start' } },
    ],
    transitions: {
      q0: { '0': 'q0', '1': 'q1' },
      q1: { '0': 'q2', '1': 'q0' },
      q2: { '0': 'q1', '1': 'q2' },
    },
    defaultString: '110',
    testCases: ['110', '1001', '101', '0', '1111'],
    arcs: [
      { d: 'M 64 90 C 38 40, 122 40, 96 90', from: 'q0', to: 'q0', symbol: '0', labelX: 80, labelY: 36 },
      { d: 'M 104 96 Q 168 56, 232 54', from: 'q0', to: 'q1', symbol: '1', labelX: 168, labelY: 56 },
      { d: 'M 232 70 Q 168 122, 107 125', from: 'q1', to: 'q0', symbol: '1', labelX: 168, labelY: 122 },
      { d: 'M 245 86 Q 216 115, 245 144', from: 'q1', to: 'q2', symbol: '0', labelX: 216, labelY: 115 },
      { d: 'M 265 144 Q 294 115, 265 86', from: 'q2', to: 'q1', symbol: '0', labelX: 294, labelY: 115 },
      { d: 'M 245 192 C 220 234, 290 234, 265 192', from: 'q2', to: 'q2', symbol: '1', labelX: 255, labelY: 224 },
    ],
  },
  contains_ab: {
    id: 'contains_ab',
    name: "Contains 'ab'",
    badge: 'Substring DFA',
    type: 'dfa',
    description: "Accepts all strings over {a, b} that contain the substring 'ab' (w = XabY).",
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', label: 'q0', x: 70, y: 105, isInitial: true, isFinal: false, subtext: "start / saw 'b'", subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 190, y: 105, isInitial: false, isFinal: false, subtext: "saw 'a'", subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q2', label: 'q2', x: 310, y: 105, isInitial: false, isFinal: true, subtext: "saw 'ab' (Accept)", subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { a: 'q1', b: 'q0' },
      q1: { a: 'q1', b: 'q2' },
      q2: { a: 'q2', b: 'q2' },
    },
    defaultString: 'aab',
    testCases: ['aab', 'bba', 'abab', 'bbbb', 'ba'],
    arcs: [
      { d: 'M 58 82 C 35 35, 105 35, 82 82', from: 'q0', to: 'q0', symbol: 'b', labelX: 70, labelY: 30 },
      { d: 'M 94 105 L 166 105', from: 'q0', to: 'q1', symbol: 'a', labelX: 130, labelY: 95 },
      { d: 'M 178 82 C 155 35, 225 35, 202 82', from: 'q1', to: 'q1', symbol: 'a', labelX: 190, labelY: 30 },
      { d: 'M 214 105 L 286 105', from: 'q1', to: 'q2', symbol: 'b', labelX: 250, labelY: 95 },
      { d: 'M 298 82 C 275 35, 345 35, 322 82', from: 'q2', to: 'q2', symbol: ['a', 'b'], labelX: 310, labelY: 30, labelText: 'a, b' },
    ],
  },
  ends01: {
    id: 'ends01',
    name: "Ends with '01'",
    badge: 'Suffix DFA',
    type: 'dfa',
    description: "Accepts all binary strings ending with substring '01' (w = X01).",
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 70, y: 85, isInitial: true, isFinal: false, subtext: "start / saw '1'", subtextPos: { x: 0, y: 36, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 190, y: 85, isInitial: false, isFinal: false, subtext: "saw '0'", subtextPos: { x: 0, y: 36, anchor: 'middle' } },
      { id: 'q2', label: 'q2', x: 310, y: 85, isInitial: false, isFinal: true, subtext: "saw '01' (Accept)", subtextPos: { x: 0, y: 36, anchor: 'middle' } },
    ],
    transitions: {
      q0: { '0': 'q1', '1': 'q0' },
      q1: { '0': 'q1', '1': 'q2' },
      q2: { '0': 'q1', '1': 'q0' },
    },
    defaultString: '1001',
    testCases: ['1001', '1101', '1010', '01', '1000'],
    arcs: [
      { d: 'M 58 62 C 35 15, 105 15, 82 62', from: 'q0', to: 'q0', symbol: '1', labelX: 70, labelY: 16 },
      { d: 'M 94 85 L 166 85', from: 'q0', to: 'q1', symbol: '0', labelX: 130, labelY: 75 },
      { d: 'M 178 62 C 155 15, 225 15, 202 62', from: 'q1', to: 'q1', symbol: '0', labelX: 190, labelY: 16 },
      { d: 'M 214 85 L 286 85', from: 'q1', to: 'q2', symbol: '1', labelX: 250, labelY: 75 },
      { d: 'M 296 105 Q 250 145, 204 105', from: 'q2', to: 'q1', symbol: '0', labelX: 250, labelY: 140 },
      { d: 'M 302 110 Q 190 205, 78 110', from: 'q2', to: 'q0', symbol: '1', labelX: 190, labelY: 195 },
    ],
  },

  // --- Moore Machine Transducers ---
  moore_ab: {
    id: 'moore_ab',
    name: 'Substring "ab" Moore Counter',
    badge: 'Moore Transducer',
    type: 'moore',
    description: 'Emits 1 every time substring "ab" is recognized, and 0 otherwise. Length of output = n + 1.',
    alphabet: ['a', 'b'],
    outputAlphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', output: '0', x: 70, y: 110, isInitial: true, isFinal: false, subtext: 'Start (λ=0)', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', output: '0', x: 190, y: 110, isInitial: false, isFinal: false, subtext: 'Saw a (λ=0)', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q2', label: 'q2', output: '1', x: 310, y: 110, isInitial: false, isFinal: false, subtext: 'Saw ab (λ=1)', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { a: 'q1', b: 'q0' },
      q1: { a: 'q1', b: 'q2' },
      q2: { a: 'q1', b: 'q0' },
    },
    defaultString: 'ababb',
    testCases: ['ababb', 'aba', 'bab', 'ab', 'baba'],
    arcs: [
      { d: 'M 58 88 C 35 40, 105 40, 82 88', from: 'q0', to: 'q0', symbol: 'b', labelX: 70, labelY: 35 },
      { d: 'M 94 110 L 166 110', from: 'q0', to: 'q1', symbol: 'a', labelX: 130, labelY: 100 },
      { d: 'M 178 88 C 155 40, 225 40, 202 88', from: 'q1', to: 'q1', symbol: 'a', labelX: 190, labelY: 35 },
      { d: 'M 214 110 L 286 110', from: 'q1', to: 'q2', symbol: 'b', labelX: 250, labelY: 100 },
      { d: 'M 296 128 Q 250 165, 204 128', from: 'q2', to: 'q1', symbol: 'a', labelX: 250, labelY: 160 },
      { d: 'M 302 134 Q 190 220, 78 134', from: 'q2', to: 'q0', symbol: 'b', labelX: 190, labelY: 210 },
    ],
  },
  moore_conversion_demo: {
    id: 'moore_conversion_demo',
    name: 'Moore Machine (Before Mealy Conversion)',
    badge: 'Moore Machine',
    type: 'moore',
    description: '2-state Moore machine with state outputs λ(q0)=0 and λ(q1)=1.',
    alphabet: ['a', 'b'],
    outputAlphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', output: '0', x: 100, y: 115, isInitial: true, isFinal: false, subtext: 'λ = 0', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', output: '1', x: 280, y: 115, isInitial: false, isFinal: false, subtext: 'λ = 1', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { a: 'q0', b: 'q1' },
      q1: { a: 'q0', b: 'q1' },
    },
    defaultString: 'abba',
    testCases: ['abba', 'ab', 'ba', 'bbb', 'aaaa'],
    arcs: [
      { d: 'M 88 92 C 65 42, 135 42, 112 92', from: 'q0', to: 'q0', symbol: 'a', labelX: 100, labelY: 38 },
      { d: 'M 124 105 Q 190 75, 256 105', from: 'q0', to: 'q1', symbol: 'b', labelX: 190, labelY: 74 },
      { d: 'M 256 125 Q 190 155, 124 125', from: 'q1', to: 'q0', symbol: 'a', labelX: 190, labelY: 153 },
      { d: 'M 268 92 C 245 42, 315 42, 292 92', from: 'q1', to: 'q1', symbol: 'b', labelX: 280, labelY: 38 },
    ],
  },

  // --- Mealy Machine Transducers ---
  mealy_twos_complement: {
    id: 'mealy_twos_complement',
    name: "Serial 2's Complement Generator (LSB First)",
    badge: "2's Complement FSM",
    type: 'mealy',
    description: "Computes 2's complement of serial binary integer arriving LSB-first. Length of output = n.",
    alphabet: ['0', '1'],
    outputAlphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 115, isInitial: true, isFinal: false, subtext: 'Before First 1', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 280, y: 115, isInitial: false, isFinal: false, subtext: 'After First 1 (Invert)', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { '0': { next: 'q0', output: '0' }, '1': { next: 'q1', output: '1' } },
      q1: { '0': { next: 'q1', output: '1' }, '1': { next: 'q1', output: '0' } },
    },
    defaultString: '0011',
    testCases: ['0011', '1010', '0001', '1111', '0000'],
    arcs: [
      { d: 'M 88 92 C 65 42, 135 42, 112 92', from: 'q0', to: 'q0', symbol: '0', labelText: '0 / 0', labelX: 100, labelY: 38 },
      { d: 'M 124 115 L 256 115', from: 'q0', to: 'q1', symbol: '1', labelText: '1 / 1', labelX: 190, labelY: 105 },
      { d: 'M 268 92 C 245 40, 315 40, 292 92', from: 'q1', to: 'q1', symbol: '0', labelText: '0 / 1', labelX: 255, labelY: 36 },
      { d: 'M 268 138 C 245 190, 315 190, 292 138', from: 'q1', to: 'q1', symbol: '1', labelText: '1 / 0', labelX: 280, labelY: 195 },
    ],
  },
  mealy_conversion_demo: {
    id: 'mealy_conversion_demo',
    name: 'Equivalent Mealy Machine (Output on Edges)',
    badge: 'Mealy Machine',
    type: 'mealy',
    description: 'Equivalent Mealy machine resulting from pushing Moore outputs onto incoming arcs. |Q| = 2.',
    alphabet: ['a', 'b'],
    outputAlphabet: ['0', '1'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 115, isInitial: true, isFinal: false, subtext: 'State q0', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 280, y: 115, isInitial: false, isFinal: false, subtext: 'State q1', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { a: { next: 'q0', output: '0' }, b: { next: 'q1', output: '1' } },
      q1: { a: { next: 'q0', output: '0' }, b: { next: 'q1', output: '1' } },
    },
    defaultString: 'abba',
    testCases: ['abba', 'ab', 'ba', 'bbb', 'aaaa'],
    arcs: [
      { d: 'M 88 92 C 65 42, 135 42, 112 92', from: 'q0', to: 'q0', symbol: 'a', labelText: 'a / 0', labelX: 100, labelY: 38 },
      { d: 'M 124 105 Q 190 75, 256 105', from: 'q0', to: 'q1', symbol: 'b', labelText: 'b / 1', labelX: 190, labelY: 74 },
      { d: 'M 256 125 Q 190 155, 124 125', from: 'q1', to: 'q0', symbol: 'a', labelText: 'a / 0', labelX: 190, labelY: 153 },
      { d: 'M 268 92 C 245 42, 315 42, 292 92', from: 'q1', to: 'q1', symbol: 'b', labelText: 'b / 1', labelX: 280, labelY: 38 },
    ],
  },
  mealy_suffix: {
    id: 'mealy_suffix',
    name: 'Suffix Pattern Mealy Detector',
    badge: 'Mealy Transducer',
    type: 'mealy',
    description: 'Outputs "a" if ends in 10, "b" if ends in 11, and "c" otherwise.',
    alphabet: ['0', '1'],
    outputAlphabet: ['a', 'b', 'c'],
    states: [
      { id: 'q0', label: 'q0', x: 100, y: 115, isInitial: true, isFinal: false, subtext: 'Last bit 0', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'q1', label: 'q1', x: 280, y: 115, isInitial: false, isFinal: false, subtext: 'Last bit 1', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      q0: { '0': { next: 'q0', output: 'c' }, '1': { next: 'q1', output: 'c' } },
      q1: { '0': { next: 'q0', output: 'a' }, '1': { next: 'q1', output: 'b' } },
    },
    defaultString: '10110',
    testCases: ['10110', '10', '11', '00', '0110'],
    arcs: [
      { d: 'M 88 92 C 65 42, 135 42, 112 92', from: 'q0', to: 'q0', symbol: '0', labelText: '0 / c', labelX: 100, labelY: 38 },
      { d: 'M 124 105 Q 190 75, 256 105', from: 'q0', to: 'q1', symbol: '1', labelText: '1 / c', labelX: 190, labelY: 74 },
      { d: 'M 256 125 Q 190 155, 124 125', from: 'q1', to: 'q0', symbol: '0', labelText: '0 / a', labelX: 190, labelY: 153 },
      { d: 'M 268 92 C 245 42, 315 42, 292 92', from: 'q1', to: 'q1', symbol: '1', labelText: '1 / b', labelX: 280, labelY: 38 },
    ],
  },
  mealy_serial_adder: {
    id: 'mealy_serial_adder',
    name: 'Serial Bit-Pair Adder Mealy FSM',
    badge: 'Serial Bit-Pair Adder',
    type: 'mealy',
    description: 'Outputs binary sum of present and previous bits: y = xt + xt-1.',
    alphabet: ['0', '1'],
    outputAlphabet: ['00', '01', '10'],
    states: [
      { id: 'A', label: 'A', x: 65, y: 110, isInitial: true, isFinal: false, subtext: 'Prev bit 0', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'B', label: 'B', x: 190, y: 110, isInitial: false, isFinal: false, subtext: 'Prev bit 1', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
      { id: 'C', label: 'C', x: 315, y: 110, isInitial: false, isFinal: false, subtext: 'Consecutive 1s', subtextPos: { x: 0, y: 44, anchor: 'middle' } },
    ],
    transitions: {
      A: { '0': { next: 'A', output: '00' }, '1': { next: 'B', output: '01' } },
      B: { '0': { next: 'A', output: '01' }, '1': { next: 'C', output: '10' } },
      C: { '0': { next: 'A', output: '01' }, '1': { next: 'C', output: '10' } },
    },
    defaultString: '1101',
    testCases: ['1101', '00', '11', '101', '011'],
    arcs: [
      { d: 'M 53 88 C 30 40, 100 40, 77 88', from: 'A', to: 'A', symbol: '0', labelText: '0 / 00', labelX: 65, labelY: 35 },
      { d: 'M 89 110 L 166 110', from: 'A', to: 'B', symbol: '1', labelText: '1 / 01', labelX: 127, labelY: 100 },
      { d: 'M 178 128 Q 128 160, 77 128', from: 'B', to: 'A', symbol: '0', labelText: '0 / 01', labelX: 127, labelY: 155 },
      { d: 'M 214 110 L 291 110', from: 'B', to: 'C', symbol: '1', labelText: '1 / 10', labelX: 252, labelY: 100 },
      { d: 'M 303 128 Q 190 205, 77 132', from: 'C', to: 'A', symbol: '0', labelText: '0 / 01', labelX: 190, labelY: 195 },
      { d: 'M 303 88 C 280 40, 350 40, 327 88', from: 'C', to: 'C', symbol: '1', labelText: '1 / 10', labelX: 315, labelY: 35 },
    ],
  },
};

export default function AutomataSimulator({
  preset = 'even_a',
  defaultPreset,
  config,
  title,
  subtitle,
  interactive = true,
}) {
  const activePreset = useMemo(() => {
    if (config) return config;
    const key = preset || defaultPreset || 'even_a';
    return PRESETS[key] || PRESETS.even_a;
  }, [config, preset, defaultPreset]);

  const machineType = activePreset.type || 'dfa';

  const [inputString, setInputString] = useState(activePreset.defaultString || '');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    setInputString(activePreset.defaultString || '');
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [activePreset]);

  // Compute full execution trace for current string
  const executionTrace = useMemo(() => {
    const trace = [];
    const initialState = activePreset.states.find((s) => s.isInitial)?.id || activePreset.states[0]?.id;
    let curr = initialState;

    const initialObj = activePreset.states.find((s) => s.id === curr);
    trace.push({
      step: 0,
      state: curr,
      symbol: null,
      output: machineType === 'moore' ? (initialObj?.output ?? 'ε') : null,
      isFinal: initialObj?.isFinal || false,
    });

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      const trans = activePreset.transitions[curr]?.[char];
      if (!trans) break;

      let nextStateId = null;
      let emittedOutput = null;

      if (typeof trans === 'string') {
        nextStateId = trans;
        const targetObj = activePreset.states.find((s) => s.id === trans);
        if (machineType === 'moore') {
          emittedOutput = targetObj?.output ?? '';
        }
      } else if (trans && typeof trans === 'object') {
        nextStateId = trans.next;
        emittedOutput = trans.output;
      }

      if (!nextStateId) break;
      curr = nextStateId;

      const stateObj = activePreset.states.find((s) => s.id === curr);
      trace.push({
        step: i + 1,
        state: curr,
        symbol: char,
        output: emittedOutput,
        isFinal: stateObj?.isFinal || false,
      });
    }

    return trace;
  }, [inputString, activePreset, machineType]);

  const currentStep = executionTrace[currentStepIndex] || executionTrace[0] || { state: 'q0' };
  const isFinished = currentStepIndex === executionTrace.length - 1 && currentStepIndex === inputString.length;
  const isAccepted = isFinished && currentStep.isFinal;
  const isRejected = isFinished && !currentStep.isFinal;

  // Last transition taken
  const lastTransition = useMemo(() => {
    if (currentStepIndex <= 0 || currentStepIndex > executionTrace.length - 1) {
      return null;
    }
    return {
      from: executionTrace[currentStepIndex - 1].state,
      to: executionTrace[currentStepIndex].state,
      symbol: executionTrace[currentStepIndex].symbol,
    };
  }, [currentStepIndex, executionTrace]);

  // Playback Auto-Stepper
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < executionTrace.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 750);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, executionTrace.length]);

  const handleInputChange = (rawVal) => {
    const filtered = rawVal
      .trim()
      .split('')
      .filter((c) => activePreset.alphabet.includes(c))
      .join('');
    setInputString(filtered);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handlePresetString = (str) => {
    setInputString(str);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(executionTrace.length - 1, prev + 1));
  };

  const handlePlayToggle = () => {
    if (isFinished) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Reusable Arc Renderer with Circuit Pulse
  const renderArc = (arc) => {
    const { d, from, to, symbol, labelX, labelY, labelText } = arc;
    const isMatch =
      lastTransition &&
      lastTransition.from === from &&
      lastTransition.to === to &&
      (Array.isArray(symbol)
        ? symbol.includes(lastTransition.symbol)
        : symbol === lastTransition.symbol);

    const showPulse = isMatch && isPlaying && !isFinished;

    const displayStr = labelText || (Array.isArray(symbol) ? symbol.join(', ') : symbol);
    const pillWidth = Math.max(20, displayStr.length * 7 + 10);

    return (
      <g key={`${from}-${to}-${Array.isArray(symbol) ? symbol.join('-') : symbol}-${labelX}-${labelY}`}>
        <path
          d={d}
          fill="none"
          stroke={isMatch ? '#fb7185' : '#475569'}
          strokeWidth={isMatch ? 3 : 1.8}
          markerEnd={isMatch ? 'url(#arrow-active)' : 'url(#arrow)'}
          style={{
            filter: isMatch ? 'drop-shadow(0 0 6px rgba(244, 63, 94, 0.75))' : 'none',
            transition: 'stroke 0.2s ease, stroke-width 0.2s ease, filter 0.2s ease',
          }}
        />
        {showPulse && (
          <path
            d={d}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeDasharray="4 6"
            className={styles.wireFlowPulse}
          />
        )}
        <rect
          x={labelX - pillWidth / 2}
          y={labelY - 9}
          width={pillWidth}
          height={18}
          rx={4}
          fill={isMatch ? 'rgba(244, 63, 94, 0.25)' : '#0f172a'}
          stroke={isMatch ? '#fb7185' : '#334155'}
          strokeWidth={isMatch ? 1.5 : 1}
        />
        <text
          x={labelX}
          y={labelY + 4}
          textAnchor="middle"
          className={`${styles.edgeLabel} ${isMatch ? styles.edgeLabelActive : ''}`}
          fill={isMatch ? '#fb7185' : '#94a3b8'}
          fontSize="10"
          fontWeight={isMatch ? '800' : '600'}
        >
          {displayStr}
        </text>
      </g>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            {machineType === 'moore' ? '🏛️' : machineType === 'mealy' ? '⚡' : '🧮'}
          </div>
          <div>
            <div className={styles.titleRow}>
              <span className={styles.title}>{title || `${activePreset.name}`}</span>
              <span className={styles.badge}>{activePreset.badge}</span>
            </div>
            <p className={styles.subtitle}>{subtitle || activePreset.description}</p>
          </div>
        </div>

        {/* Right Info Strip */}
        <div className={styles.headerRight}>
          <div className={styles.metaChip}>
            <span className={styles.metaLabel}>INPUT Σ</span>
            <span className={styles.metaValue}>{'{' + activePreset.alphabet.join(', ') + '}'}</span>
          </div>
          {activePreset.outputAlphabet && (
            <div className={styles.metaChip}>
              <span className={styles.metaLabel}>OUTPUT Δ</span>
              <span className={styles.metaValue}>{'{' + activePreset.outputAlphabet.join(', ') + '}'}</span>
            </div>
          )}
          <div className={styles.metaChip}>
            <span className={styles.metaLabel}>STATES</span>
            <span className={styles.metaValue}>|Q| = {activePreset.states.length}</span>
          </div>
        </div>
      </div>

      {/* Toolbar: Only show if interactive */}
      {interactive && (
        <div className={styles.toolbar}>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>Input String:</span>
            <input
              type="text"
              className={styles.stringInput}
              value={inputString}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`Symbols {${activePreset.alphabet.join(', ')}}`}
            />
            {activePreset.testCases && (
              <div className={styles.testPills}>
                {activePreset.testCases.map((tc) => (
                  <button
                    key={tc}
                    type="button"
                    className={`${styles.testPill} ${inputString === tc ? styles.testPillActive : ''}`}
                    onClick={() => handlePresetString(tc)}
                  >
                    "{tc}"
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.playbackGroup}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleStepBack}
              disabled={currentStepIndex === 0}
              title="Step Backward"
            >
              ◀ Step
            </button>
            <button
              type="button"
              className={`${styles.controlBtn} ${styles.playBtn}`}
              onClick={handlePlayToggle}
            >
              {isPlaying ? '⏸ Pause' : isFinished ? '🔄 Replay' : '▶ Play'}
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleStepForward}
              disabled={isFinished}
              title="Step Forward"
            >
              Step ▶
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReset}
              title="Reset"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}

      {/* Input Tape Head Tracker */}
      {interactive && (
        <div className={styles.tapeBar}>
          <span className={styles.tapeHeadTag}>INPUT TAPE</span>
          <div className={styles.tapeCells}>
            {inputString.split('').map((char, idx) => {
              const isHead = idx === currentStepIndex;
              const isProcessed = idx < currentStepIndex;
              return (
                <div
                  key={idx}
                  className={`${styles.tapeCell} ${isHead ? styles.cellActive : ''} ${
                    isProcessed ? styles.cellProcessed : ''
                  }`}
                >
                  {isHead && <span className={styles.tapePointer}>⬇</span>}
                  <span className={styles.tapeChar}>{char}</span>
                </div>
              );
            })}
            <div
              className={`${styles.tapeCell} ${
                currentStepIndex === inputString.length ? styles.cellActive : ''
              }`}
              style={{ opacity: 0.6 }}
            >
              {currentStepIndex === inputString.length && <span className={styles.tapePointer}>⬇</span>}
              <span className={styles.tapeChar}>$</span>
            </div>
          </div>
        </div>
      )}

      {/* Output Tape Tracker (For Moore & Mealy Transducers) */}
      {interactive && (machineType === 'moore' || machineType === 'mealy') && (
        <div className={styles.outputTapeBar}>
          <span className={styles.outputTapeTag}>OUTPUT STREAM</span>
          <div className={styles.tapeCells}>
            {executionTrace
              .filter((step) => step.output !== null && step.output !== undefined)
              .map((step, idx) => {
                const isCurrent = idx === currentStepIndex - (machineType === 'mealy' ? 1 : 0);
                const isGenerated = idx <= currentStepIndex - (machineType === 'mealy' ? 1 : 0);
                return (
                  <div
                    key={idx}
                    className={`${styles.tapeCell} ${isGenerated ? styles.cellEmitted : ''} ${
                      isCurrent ? styles.cellActive : ''
                    }`}
                  >
                    <span className={styles.tapeChar}>{step.output}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Split Grid: Side-by-Side State Diagram + Transition Table */}
      <div className={styles.splitGrid}>
        {/* Left Card: State Diagram */}
        <div className={styles.schematicCard}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionTitle}>🗺️ State Diagram</span>
            <span className={styles.stateMemoryTag}>
              STATE: <strong>{currentStep.state}</strong>
            </span>
          </div>

          <div className={styles.svgWrapper}>
            <svg viewBox="0 0 380 240" className={styles.circuitSvg}>
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#64748b" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#fb7185" />
                </marker>
              </defs>

              {/* State Nodes */}
              {activePreset.states.map((st) => {
                const isActive = st.id === currentStep.state;
                const isMoore = machineType === 'moore' && st.output !== undefined;
                return (
                  <g key={st.id} transform={`translate(${st.x}, ${st.y})`}>
                    {/* Start Arrow */}
                    {st.isInitial && (
                      <g>
                        <line
                          x1={st.isFinal ? '-62' : '-55'}
                          y1="0"
                          x2={st.isFinal ? '-32' : '-26'}
                          y2="0"
                          stroke="#64748b"
                          strokeWidth="2"
                          markerEnd="url(#arrow)"
                        />
                        <text
                          x={st.isFinal ? '-65' : '-58'}
                          y="-7"
                          fill="#94a3b8"
                          fontSize="10"
                          fontWeight="700"
                        >
                          Start
                        </text>
                      </g>
                    )}

                    {/* Outer Circle for Acceptance / Final States (DFA only) */}
                    {st.isFinal && (
                      <circle
                        r="29"
                        fill="none"
                        stroke={isActive ? '#fb7185' : '#64748b'}
                        strokeWidth="2.2"
                      />
                    )}

                    {/* Main State Circle */}
                    <circle
                      r="24"
                      fill={isActive ? 'rgba(244, 63, 94, 0.22)' : '#1e293b'}
                      stroke={isActive ? '#fb7185' : '#475569'}
                      strokeWidth={isActive ? '3' : '2'}
                      style={{
                        filter: isActive ? 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.55))' : 'none',
                        transition: 'stroke 0.2s ease, fill 0.2s ease',
                      }}
                    />

                    {/* State Text (with output if Moore) */}
                    <text
                      x="0"
                      y={isMoore ? -2 : 4}
                      textAnchor="middle"
                      fill={isActive ? '#ffffff' : '#f8fafc'}
                      fontSize="12"
                      fontWeight="700"
                    >
                      {isMoore ? `${st.label} / ${st.output}` : st.label}
                    </text>

                    {/* Subtext */}
                    {st.subtext && (
                      <text
                        x={st.subtextPos?.x ?? 0}
                        y={st.subtextPos?.y ?? 44}
                        textAnchor={st.subtextPos?.anchor ?? 'middle'}
                        fill="#94a3b8"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {st.subtext}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Transition Arcs */}
              <g fill="none">
                {activePreset.arcs && activePreset.arcs.map(renderArc)}
              </g>
            </svg>
          </div>
        </div>

        {/* Right Card: Transition Table */}
        <div className={styles.tableCard}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionTitle}>📊 Transition Table</span>
            <span className={styles.hintTag}>
              {machineType === 'moore'
                ? 'δ : Q × Σ → Q, λ : Q → Δ'
                : machineType === 'mealy'
                ? 'δ : Q × Σ → Q, λ : Q × Σ → Δ'
                : 'δ : Q × Σ → Q'}
            </span>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>State (Q)</th>
                  {activePreset.alphabet.map((sym) => (
                    <th key={sym} className={styles.th}>
                      Input '{sym}'
                    </th>
                  ))}
                  {machineType === 'moore' && <th className={styles.th}>Output (λ)</th>}
                </tr>
              </thead>
              <tbody>
                {activePreset.states.map((st) => {
                  const isCurrentState = st.id === currentStep.state;
                  return (
                    <tr
                      key={st.id}
                      className={`${styles.tr} ${isCurrentState ? styles.trActive : ''}`}
                    >
                      <td className={styles.tdState}>
                        <div className={styles.stateCellFlex}>
                          {st.isInitial && <span className={styles.startArrowTag}>▶</span>}
                          {st.isFinal ? <strong>(({st.label}))</strong> : <span>{st.label}</span>}
                        </div>
                      </td>
                      {activePreset.alphabet.map((sym) => {
                        const cellTrans = activePreset.transitions[st.id]?.[sym];
                        let targetState = null;
                        let cellOutput = null;

                        if (typeof cellTrans === 'string') {
                          targetState = cellTrans;
                        } else if (cellTrans && typeof cellTrans === 'object') {
                          targetState = cellTrans.next;
                          cellOutput = cellTrans.output;
                        }

                        const isCellSelected =
                          isCurrentState &&
                          currentStepIndex < inputString.length &&
                          inputString[currentStepIndex] === sym;

                        return (
                          <td
                            key={sym}
                            className={`${styles.td} ${isCellSelected ? styles.tdActiveTarget : ''}`}
                          >
                            {targetState ? (
                              <span>
                                {targetState}
                                {cellOutput !== null && cellOutput !== undefined ? (
                                  <span style={{ color: '#10b981', fontWeight: '700' }}>
                                    {' '}
                                    / {cellOutput}
                                  </span>
                                ) : null}
                              </span>
                            ) : (
                              <span style={{ color: '#475569' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                      {machineType === 'moore' && (
                        <td className={styles.td} style={{ color: '#10b981', fontWeight: '700' }}>
                          {st.output ?? '—'}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Educational Trace Box */}
          <div className={styles.traceConsole}>
            <div className={styles.traceHeader}>
              <span>⚡ STEP INTUITION:</span>
              <span className={styles.stepCounterBadge}>
                Step {currentStepIndex} of {inputString.length}
              </span>
            </div>
            <p className={styles.traceMessage}>
              {currentStepIndex === 0 ? (
                <>
                  Initial state <strong>{currentStep.state}</strong>.{' '}
                  {machineType === 'moore' ? (
                    <>
                      At $t=0$, Moore machine unconditionally emits initial output{' '}
                      <strong style={{ color: '#10b981' }}>{currentStep.output}</strong>.
                    </>
                  ) : machineType === 'mealy' ? (
                    <>Mealy machine emits zero output on empty string ε. Ready to read input.</>
                  ) : (
                    <>Ready to read input tape. Click 'Play' or 'Step ▶' to begin simulation.</>
                  )}
                </>
              ) : (
                <>
                  Read input symbol <code>'{executionTrace[currentStepIndex].symbol}'</code>:
                  transitioned <strong>{executionTrace[currentStepIndex - 1].state}</strong> ➔{' '}
                  <strong>{currentStep.state}</strong>.
                  {machineType === 'moore' && (
                    <>
                      {' '}
                      Moore state emits output{' '}
                      <strong style={{ color: '#10b981' }}>{currentStep.output}</strong>.
                    </>
                  )}
                  {machineType === 'mealy' && (
                    <>
                      {' '}
                      Transition emits output{' '}
                      <strong style={{ color: '#10b981' }}>{currentStep.output}</strong>.
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status Banner */}
      {interactive && (
        <div className={styles.statusBanner}>
          {machineType === 'dfa' ? (
            isFinished ? (
              isAccepted ? (
                <div className={`${styles.statusBannerContent} ${styles.bannerAccepted}`}>
                  <span className={styles.bannerIcon}>✅</span>
                  <div>
                    <strong>STRING ACCEPTED!</strong> The machine finished execution in final state{' '}
                    <code>{currentStep.state}</code>.
                  </div>
                </div>
              ) : (
                <div className={`${styles.statusBannerContent} ${styles.bannerRejected}`}>
                  <span className={styles.bannerIcon}>❌</span>
                  <div>
                    <strong>STRING REJECTED!</strong> The machine halted in non-accepting state{' '}
                    <code>{currentStep.state}</code>.
                  </div>
                </div>
              )
            ) : (
              <div className={`${styles.statusBannerContent} ${styles.bannerRunning}`}>
                <span className={styles.bannerIcon}>⚡</span>
                <div>
                  <strong>PROCESSING TAPE:</strong> Current active state: <code>{currentStep.state}</code> (
                  {inputString.length - currentStepIndex} symbols remaining).
                </div>
              </div>
            )
          ) : (
            <div className={`${styles.statusBannerContent} ${styles.bannerAccepted}`}>
              <span className={styles.bannerIcon}>⚡</span>
              <div>
                <strong>
                  {machineType.toUpperCase()} TRANSDUCTION{' '}
                  {isFinished ? 'COMPLETE' : 'IN PROGRESS'}:
                </strong>{' '}
                Total emitted output length ={' '}
                <strong>
                  {
                    executionTrace.filter((s) => s.output !== null && s.output !== undefined)
                      .length
                  }{' '}
                  symbols
                </strong>{' '}
                {machineType === 'moore'
                  ? `(n + 1 = ${inputString.length} + 1)`
                  : `(n = ${inputString.length})`}
                .
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
