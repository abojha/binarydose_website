import React, { useState } from 'react';
import styles from './DualModeDiagram.module.css';

/**
 * DualModeDiagram: Interactive architectural visualization of CPU Dual-Mode Operation
 * (User Mode Ring 3 vs Kernel Mode Ring 0) and the System Call Trap boundary.
 */
export default function DualModeDiagram({
  title = 'CPU Dual-Mode Operation & System Call Lifecycle',
  subtitle = 'Click each phase below to trace how the hardware mode bit protects system integrity during a system call.',
}) {
  const [activeStep, setActiveStep] = useState(0); // 0 = all / overview

  const steps = [
    { id: 0, label: 'Full Overview' },
    { id: 1, label: '1. User Space Call' },
    { id: 2, label: '2. Trap & Mode Switch' },
    { id: 3, label: '3. Kernel Execution' },
    { id: 4, label: '4. IRET & Return' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* Step Selection Controls */}
      <div className={styles.stepControls}>
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.stepButton} ${activeStep === s.id ? styles.stepButtonActive : ''}`}
            onClick={() => setActiveStep(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.diagramBox}>
        {/* ================= USER SPACE (RING 3) ================= */}
        <div className={styles.userSpace}>
          <div className={styles.modeHeader}>
            <div className={styles.modeTitleGroup}>
              <span className={styles.userBadge}>Ring 3</span>
              <h4 className={styles.modeTitle}>User Mode Space</h4>
            </div>
            <span className={styles.bitStatus}>Hardware Mode Bit = 1 (Unprivileged)</span>
          </div>

          {/* Action 1: User Application */}
          <div
            className={`${styles.actionCard} ${
              activeStep === 1 || activeStep === 0 ? styles.actionCardActive : ''
            }`}
          >
            <div className={styles.actionCardHeader}>
              <h5 className={styles.actionCardTitle}>1. User Application Execution</h5>
              <span className={styles.actionStepTag}>Phase 1</span>
            </div>
            <p className={styles.actionCardDesc}>
              Application runs unprivileged code (e.g. <code>fopen()</code>, <code>write()</code>).
              Hardware restricts access: direct I/O and raw physical memory modifications are strictly forbidden.
            </p>
          </div>

          {/* Action 4: User Resume */}
          <div
            className={`${styles.actionCard} ${
              activeStep === 4 || activeStep === 0 ? styles.actionCardActive : ''
            }`}
          >
            <div className={styles.actionCardHeader}>
              <h5 className={styles.actionCardTitle}>4. Resume User Application</h5>
              <span className={styles.actionStepTag}>Phase 4</span>
            </div>
            <p className={styles.actionCardDesc}>
              CPU restores user registers and Program Counter (PC). User code seamlessly resumes execution
              at the instruction immediately following the system call.
            </p>
          </div>
        </div>

        {/* ================= THE TRANSITION BOUNDARY ================= */}
        <div className={styles.transitionBoundary}>
          <div
            className={`${styles.flowPipe} ${styles.pipeDown} ${
              activeStep === 2 ? styles.actionCardActive : ''
            }`}
          >
            <span className={styles.pipeIcon}>↓</span>
            <span>Trap / System Call (CPU flips Bit 1 → 0)</span>
          </div>

          <div
            className={`${styles.flowPipe} ${styles.pipeUp} ${
              activeStep === 4 ? styles.actionCardActive : ''
            }`}
          >
            <span className={styles.pipeIcon}>↑</span>
            <span>IRET / SYSRET Return (CPU flips Bit 0 → 1)</span>
          </div>
        </div>

        {/* ================= KERNEL SPACE (RING 0) ================= */}
        <div className={styles.kernelSpace}>
          <div className={styles.modeHeader}>
            <div className={styles.modeTitleGroup}>
              <span className={styles.kernelBadge}>Ring 0</span>
              <h4 className={styles.modeTitle}>Kernel Mode Space</h4>
            </div>
            <span className={styles.bitStatus}>Hardware Mode Bit = 0 (Privileged)</span>
          </div>

          {/* Action 2: Trap Handler */}
          <div
            className={`${styles.actionCard} ${
              activeStep === 2 || activeStep === 0 ? styles.actionCardActive : ''
            }`}
          >
            <div className={styles.actionCardHeader}>
              <h5 className={styles.actionCardTitle}>2. Hardware Trap & Context Save</h5>
              <span className={styles.actionStepTag}>Phase 2</span>
            </div>
            <p className={styles.actionCardDesc}>
              Hardware generates a software interrupt (trap), switches Mode Bit to 0, saves the user state
              on the kernel stack, and looks up the Interrupt Descriptor Table (IDT).
            </p>
          </div>

          {/* Action 3: Kernel Service */}
          <div
            className={`${styles.actionCard} ${
              activeStep === 3 || activeStep === 0 ? styles.actionCardActive : ''
            }`}
          >
            <div className={styles.actionCardHeader}>
              <h5 className={styles.actionCardTitle}>3. Privileged Kernel Service Routine</h5>
              <span className={styles.actionStepTag}>Phase 3</span>
            </div>
            <p className={styles.actionCardDesc}>
              Kernel executes the privileged service routine: validates parameters, reads/writes secondary
              storage, transfers data via DMA, and finishes the requested operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
