import React from 'react';
import styles from './GanttChart.module.css';

/**
 * GanttChart: Responsive, accessible, and high-impact CPU Scheduling
 * timeline visualizer for Operating Systems and real-time systems.
 * 
 * Props:
 * - title: string (optional)
 * - subtitle: string (optional)
 * - slots: Array<{
 *     process: string,       // e.g. "P1", "P2", "CPU Idle"
 *     start: number,         // start time, e.g. 0
 *     end: number,           // end time, e.g. 4
 *     color?: string,        // "blue" | "emerald" | "amber" | "purple" | "rose" | "cyan" | "gray"
 *     isIdle?: boolean,      // renders hatched pattern for idle intervals
 *     sublabel?: string,     // e.g. "Burst: 4ms"
 *   }>
 * - metrics?: Array<{
 *     label: string,         // e.g. "Avg Waiting Time"
 *     value: string,         // e.g. "2.67 ms"
 *     color?: string,
 *   }>
 */
export default function GanttChart({
  title = "CPU Execution Gantt Chart",
  subtitle,
  slots = [],
  metrics = [],
}) {
  if (!slots || slots.length === 0) return null;

  const totalDuration = slots[slots.length - 1].end - slots[0].start;

  const colorMap = {
    blue: styles.slotBlue,
    emerald: styles.slotEmerald,
    amber: styles.slotAmber,
    purple: styles.slotPurple,
    rose: styles.slotRose,
    cyan: styles.slotCyan,
    gray: styles.slotGray,
  };

  const autoColors = ['blue', 'emerald', 'amber', 'purple', 'rose', 'cyan'];

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.chartIcon}>⏱️</span>
            <div>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Main Gantt Track Container */}
      <div className={styles.trackWrapper}>
        <div className={styles.timelineBar}>
          {slots.map((slot, idx) => {
            const duration = slot.end - slot.start;
            const flexRatio = totalDuration > 0 ? duration : 1;
            const assignedColor =
              slot.color || (slot.isIdle ? 'gray' : autoColors[idx % autoColors.length]);
            const colorClass = colorMap[assignedColor] || styles.slotBlue;
            const isIdleClass = slot.isIdle ? styles.slotIdle : '';

            return (
              <div
                key={`${slot.process}-${idx}`}
                className={`${styles.slotBlock} ${colorClass} ${isIdleClass}`}
                style={{ flex: `${flexRatio} 0 0` }}
                title={`${slot.process}: ${slot.start} to ${slot.end} (${duration} ms)`}
              >
                <div className={styles.slotContent}>
                  <span className={styles.processName}>{slot.process}</span>
                  {slot.sublabel ? (
                    <span className={styles.slotSublabel}>{slot.sublabel}</span>
                  ) : (
                    <span className={styles.slotDuration}>Δ {duration}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Boundary Time Ticks Row */}
        <div className={styles.timeAxis}>
          {slots.map((slot, idx) => {
            const duration = slot.end - slot.start;
            const flexRatio = totalDuration > 0 ? duration : 1;

            return (
              <div
                key={`tick-${idx}`}
                className={styles.tickSegment}
                style={{ flex: `${flexRatio} 0 0` }}
              >
                {/* Left tick on the first slot */}
                {idx === 0 && (
                  <span className={`${styles.tickLabel} ${styles.tickStart}`}>
                    {slot.start}
                  </span>
                )}
                {/* Right tick for current slot end */}
                <span className={`${styles.tickLabel} ${styles.tickEnd}`}>
                  {slot.end}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Performance Metrics Strip */}
      {metrics && metrics.length > 0 && (
        <div className={styles.metricsStrip}>
          {metrics.map((metric, mIdx) => (
            <div key={mIdx} className={styles.metricCard}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={styles.metricValue}>{metric.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
