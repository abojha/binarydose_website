import React, { useState } from 'react';
import styles from './StateTransitionDiagram.module.css';

const FIVE_STATES = [
  {
    id: 'new',
    name: 'New',
    subtext: 'Process Created',
    badge: 'Secondary Disk / RAM Entry',
    badgeColor: 'purple',
    location: 'Disk / RAM Boundary',
    cpu: 'Not Allocated',
    scheduler: 'Long-Term Scheduler (Job Scheduler)',
    desc: 'The process is being created and its Process Control Block (PCB) is allocated. It is not yet admitted to the Ready queue.',
    incoming: ['User executes program or fork() syscall'],
    outgoing: ['Admitted to Ready Queue by Long-Term Scheduler'],
  },
  {
    id: 'ready',
    name: 'Ready',
    subtext: 'Waiting for CPU',
    badge: 'Primary RAM',
    badgeColor: 'blue',
    location: 'Main Memory (Ready Queue)',
    cpu: 'Ready to Execute (0% CPU)',
    scheduler: 'Short-Term Scheduler (CPU Scheduler)',
    desc: 'The process is fully loaded in RAM with all required resources except the CPU. It is waiting for the CPU scheduler to dispatch it.',
    incoming: [
      'Admitted from New',
      'Preempted from Running (Time Quantum expired / Interrupt)',
      'I/O Completion from Waiting',
      'Swapped in from Ready-Suspended (7-state)',
    ],
    outgoing: ['Dispatched to Running by CPU Scheduler'],
  },
  {
    id: 'running',
    name: 'Running',
    subtext: 'Executing on CPU',
    badge: 'CPU Core',
    badgeColor: 'emerald',
    location: 'CPU Registers & RAM',
    cpu: 'Actively Executing Instructions (100% CPU)',
    scheduler: 'CPU Dispatcher',
    desc: 'Instructions are actively being fetched, decoded, and executed on a physical CPU core. Only one process per core can be in this state at any instant.',
    incoming: ['Dispatched from Ready state by Short-Term Scheduler'],
    outgoing: [
      'Preempted to Ready (Timer interrupt / higher priority arrival)',
      'Blocked to Waiting (I/O request / wait() syscall)',
      'Terminated (Program finishes or exit() syscall)',
    ],
  },
  {
    id: 'waiting',
    name: 'Waiting / Blocked',
    subtext: 'Waiting for I/O or Event',
    badge: 'Primary RAM (Device Queue)',
    badgeColor: 'amber',
    location: 'Main Memory (Device Wait Queues)',
    cpu: 'Relinquished CPU (0% CPU)',
    scheduler: 'I/O Device Driver & Interrupt Handler',
    desc: 'The process cannot run even if CPU is completely free because it is waiting for an external event (disk read, keyboard input, network packet, lock).',
    incoming: ['System call from Running state (read, write, sleep, lock)'],
    outgoing: [
      'I/O completion hardware interrupt → Moves to Ready',
      'Suspended to Blocked-Suspended by Medium-Term Scheduler (7-state)',
    ],
  },
  {
    id: 'terminated',
    name: 'Terminated',
    subtext: 'Execution Finished',
    badge: 'RAM Deallocation',
    badgeColor: 'rose',
    location: 'Zombie / Deallocated',
    cpu: 'Execution Halted',
    scheduler: 'OS Process Repear (waitpid)',
    desc: 'The process has finished execution or was killed. Memory, files, and registers are freed; PCB entry remains temporarily as a Zombie until the parent reads exit status.',
    incoming: ['exit() system call or uncaught termination signal (SIGKILL)'],
    outgoing: ['PCB destroyed and PID freed after parent calls wait()'],
  },
];

const SEVEN_STATES = [
  ...FIVE_STATES,
  {
    id: 'blocked_suspended',
    name: 'Blocked Suspended',
    subtext: 'Waiting on Disk',
    badge: 'Disk / Swap Space',
    badgeColor: 'amber',
    location: 'Secondary Storage (Swap Area)',
    cpu: '0% CPU (Swapped Out)',
    scheduler: 'Medium-Term Scheduler (Swapper)',
    desc: 'The process was Waiting in RAM, but severe memory pressure forced the OS to swap its address space to disk. Still waiting for its I/O event.',
    incoming: ['Swapped out from Blocked state when RAM is full'],
    outgoing: [
      'I/O event completes on disk → Moves to Ready-Suspended',
      'Swapped back into RAM before event completes → Moves to Blocked',
    ],
  },
  {
    id: 'ready_suspended',
    name: 'Ready Suspended',
    subtext: 'Ready on Disk',
    badge: 'Disk / Swap Space',
    badgeColor: 'cyan',
    location: 'Secondary Storage (Swap Area)',
    cpu: 'Ready but Swapped Out',
    scheduler: 'Medium-Term Scheduler (Swapper)',
    desc: 'The process has all resources and its I/O is complete, but it is stored on disk. It only needs to be swapped back into RAM to enter the Ready queue.',
    incoming: [
      'I/O completes while in Blocked-Suspended state',
      'Swapped out directly from Ready state under severe RAM pressure',
    ],
    outgoing: ['Swapped in (activated) to Ready state when RAM frees up'],
  },
];

const TRANSITIONS_5 = [
  { from: 'New', to: 'Ready', trigger: 'Admit', by: 'Long-Term Scheduler', desc: 'OS admits new job into memory and adds it to the Ready Queue.' },
  { from: 'Ready', to: 'Running', trigger: 'Dispatch', by: 'Short-Term Scheduler', desc: 'CPU scheduler selects process and dispatcher performs context switch.' },
  { from: 'Running', to: 'Ready', trigger: 'Preemption / Interrupt', by: 'Timer Interrupt / OS', desc: 'Time quantum expires or a higher-priority process arrives.' },
  { from: 'Running', to: 'Waiting', trigger: 'I/O or Event Wait', by: 'Process System Call', desc: 'Process requests disk I/O, network read, or waits on semaphore.' },
  { from: 'Waiting', to: 'Ready', trigger: 'I/O Completion', by: 'Hardware Interrupt', desc: 'Device signals completion via interrupt; OS moves process back to Ready.' },
  { from: 'Running', to: 'Terminated', trigger: 'Exit / Terminate', by: 'exit() / Signal', desc: 'Program reaches end of main() or receives fatal signal (SIGTERM/SIGKILL).' },
];

const TRANSITIONS_7 = [
  ...TRANSITIONS_5,
  { from: 'Waiting', to: 'Blocked Suspended', trigger: 'Suspend (Swap Out)', by: 'Medium-Term Scheduler', desc: 'Process address space swapped to disk to relieve RAM pressure.' },
  { from: 'Blocked Suspended', to: 'Ready Suspended', trigger: 'I/O Completion on Disk', by: 'Interrupt Handler', desc: 'Device finishes I/O while process is on disk; process now ready to execute.' },
  { from: 'Ready Suspended', to: 'Ready', trigger: 'Activate (Swap In)', by: 'Medium-Term Scheduler', desc: 'RAM space becomes available; process swapped back into memory.' },
  { from: 'Ready', to: 'Ready Suspended', trigger: 'Suspend (Swap Out)', by: 'Medium-Term Scheduler', desc: 'OS swaps a ready process to disk under critical memory starvation.' },
];

export default function StateTransitionDiagram({
  title = "Process Lifecycle & State Transition Models",
  subtitle = "Interactive blueprint comparing the standard 5-state process execution model with the 7-state virtual memory swapping model",
}) {
  const [modelType, setModelType] = useState('5-state');
  const [selectedStateId, setSelectedStateId] = useState('running');

  const states = modelType === '5-state' ? FIVE_STATES : SEVEN_STATES;
  const transitions = modelType === '5-state' ? TRANSITIONS_5 : TRANSITIONS_7;
  const activeState = states.find((s) => s.id === selectedStateId) || states[0];

  return (
    <div className={styles.container}>
      {/* Header & Controls */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* Model Switcher Tabs */}
        <div className={styles.switcher}>
          <button
            type="button"
            className={`${styles.switchBtn} ${modelType === '5-state' ? styles.activeSwitch : ''}`}
            onClick={() => {
              setModelType('5-state');
              if (selectedStateId === 'blocked_suspended' || selectedStateId === 'ready_suspended') {
                setSelectedStateId('running');
              }
            }}
          >
            <span className={styles.switchIcon}>⚡</span>
            5-State Core Model
          </button>
          <button
            type="button"
            className={`${styles.switchBtn} ${modelType === '7-state' ? styles.activeSwitch : ''}`}
            onClick={() => setModelType('7-state')}
          >
            <span className={styles.switchIcon}>💽</span>
            7-State Swapping Model
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas */}
      <div className={styles.canvas}>
        <div className={styles.canvasHeader}>
          <span className={styles.canvasTag}>
            {modelType === '5-state' ? 'Standard 5-State Multiprogramming Model' : '7-State Model with Disk Swapping & Suspension'}
          </span>
          <span className={styles.canvasTip}>Click any state below to inspect internals</span>
        </div>

        {/* States Flow Map */}
        <div className={styles.statesMap}>
          {modelType === '7-state' && (
            <div className={styles.memoryZoneLabel}>
              <span className={styles.zoneIcon}>🧠</span> Main Memory (RAM)
            </div>
          )}

          {/* Primary RAM States Row */}
          <div className={styles.primaryRow}>
            {FIVE_STATES.map((st) => {
              const isSelected = activeState.id === st.id;
              const colorClass = styles[`color${st.badgeColor ? st.badgeColor.charAt(0).toUpperCase() + st.badgeColor.slice(1) : 'Blue'}`];

              return (
                <button
                  key={st.id}
                  type="button"
                  className={`${styles.stateNode} ${colorClass} ${isSelected ? styles.stateNodeSelected : ''}`}
                  onClick={() => setSelectedStateId(st.id)}
                >
                  <div className={styles.nodeHeader}>
                    <span className={styles.nodeDot} />
                    <span className={styles.nodeName}>{st.name}</span>
                  </div>
                  <span className={styles.nodeSubtext}>{st.subtext}</span>
                  <span className={styles.nodeLocationBadge}>{st.badge}</span>
                </button>
              );
            })}
          </div>

          {/* 7-State Suspended Storage Row */}
          {modelType === '7-state' && (
            <div className={styles.suspendedZone}>
              <div className={styles.swapDivider}>
                <span className={styles.swapDividerLabel}>
                  <span className={styles.zoneIcon}>💽</span> Secondary Storage (Swap Area / Disk) • Swapped by Medium-Term Scheduler
                </span>
              </div>

              <div className={styles.suspendedRow}>
                {SEVEN_STATES.filter((s) => s.id === 'ready_suspended' || s.id === 'blocked_suspended').map((st) => {
                  const isSelected = activeState.id === st.id;
                  const colorClass = styles[`color${st.badgeColor ? st.badgeColor.charAt(0).toUpperCase() + st.badgeColor.slice(1) : 'Cyan'}`];

                  return (
                    <button
                      key={st.id}
                      type="button"
                      className={`${styles.stateNode} ${styles.suspendedNode} ${colorClass} ${isSelected ? styles.stateNodeSelected : ''}`}
                      onClick={() => setSelectedStateId(st.id)}
                    >
                      <div className={styles.nodeHeader}>
                        <span className={styles.nodeDot} />
                        <span className={styles.nodeName}>{st.name}</span>
                      </div>
                      <span className={styles.nodeSubtext}>{st.subtext}</span>
                      <span className={styles.nodeLocationBadge}>{st.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* State Inspector Card */}
        <div className={styles.inspectorCard}>
          <div className={styles.inspectorHeader}>
            <div className={styles.inspectorTitleBlock}>
              <span className={styles.inspectorBadge}>State Inspector</span>
              <h4 className={styles.inspectorStateName}>{activeState.name} State</h4>
            </div>
            <span className={styles.inspectorLocation}>
              📍 <strong>Location:</strong> {activeState.location}
            </span>
          </div>

          <p className={styles.inspectorDesc}>{activeState.desc}</p>

          <div className={styles.inspectorMetaGrid}>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>CPU Utilization</span>
              <span className={styles.metaVal}>{activeState.cpu}</span>
            </div>
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Governing Scheduler</span>
              <span className={styles.metaVal}>{activeState.scheduler}</span>
            </div>
          </div>

          <div className={styles.transitionPillsRow}>
            <div className={styles.pillGroup}>
              <span className={styles.pillGroupLabel}>📥 Incoming Triggers:</span>
              <div className={styles.pillsList}>
                {activeState.incoming.map((inc, i) => (
                  <span key={i} className={styles.incomingPill}>{inc}</span>
                ))}
              </div>
            </div>

            <div className={styles.pillGroup}>
              <span className={styles.pillGroupLabel}>📤 Outgoing Transitions:</span>
              <div className={styles.pillsList}>
                {activeState.outgoing.map((out, i) => (
                  <span key={i} className={styles.outgoingPill}>{out}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Reference Matrix */}
      <div className={styles.matrixContainer}>
        <div className={styles.matrixHeader}>
          <span className={styles.matrixIcon}>📋</span>
          <h4 className={styles.matrixTitle}>
            {modelType === '5-state' ? 'Core 5-State Transition Triggers' : 'Full 7-State Transition Triggers & Swap Operations'}
          </h4>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Trigger Event</th>
                <th>Initiated By</th>
                <th>Operating System Action</th>
              </tr>
            </thead>
            <tbody>
              {transitions.map((t, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={styles.tableStateChip}>{t.from}</span>
                  </td>
                  <td>
                    <span className={styles.tableStateChip}>{t.to}</span>
                  </td>
                  <td>
                    <strong className={styles.triggerName}>{t.trigger}</strong>
                  </td>
                  <td>
                    <span className={styles.agentBadge}>{t.by}</span>
                  </td>
                  <td className={styles.tableDesc}>{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
