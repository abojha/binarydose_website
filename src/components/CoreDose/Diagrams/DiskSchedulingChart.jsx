import React, { useState } from 'react';
import styles from './DiskSchedulingChart.module.css';

/**
 * DiskSchedulingChart: Interactive and responsive Actuator Arm
 * Trajectory Visualizer for Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK).
 *
 * Stability Features:
 * - Zero Layout Shifts: Inspector console is positioned BELOW the SVG canvas with permanent fixed height.
 * - Stable Hover Targets: Generous transparent hitboxes prevent pointer-flicker loops.
 * - Interactive Stepper: [Prev], [Next], and [Full Path] controls with live step telemetry.
 * - Dynamic Top Axis: Auto-sorted cylinder ticks with active guidelines.
 * - Full Dark/Light Theme Synchronization and Mobile Pan-Safety.
 */
export default function DiskSchedulingChart({
  title,
  subtitle,
  minCylinder = 0,
  maxCylinder = 199,
  color = 'blue',
  sequence = [],
  metrics,
  includeJumpInTotal = true,
}) {
  const [activeStepIndex, setActiveStepIndex] = useState(null); // null = show all
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!sequence || sequence.length === 0) return null;

  // Normalize sequence into structured step objects
  let cumulative = 0;
  const steps = sequence.map((item, idx) => {
    const raw = typeof item === 'number' ? { cylinder: item } : item;
    const isStart = raw.isStart ?? idx === 0;
    const isBoundary = raw.isBoundary ?? (raw.cylinder === minCylinder || raw.cylinder === maxCylinder);
    const isJump = !!raw.isJump;
    
    let dist = 0;
    if (idx > 0) {
      const prevCyl = typeof sequence[idx - 1] === 'number' ? sequence[idx - 1] : sequence[idx - 1].cylinder;
      dist = Math.abs(raw.cylinder - prevCyl);
      if (!isJump || includeJumpInTotal) {
        cumulative += dist;
      }
    }

    return {
      index: idx,
      cylinder: raw.cylinder,
      isStart,
      isBoundary,
      isJump,
      distanceFromPrev: dist,
      cumulativeDistance: cumulative,
      label: raw.label || (isStart ? `Start (${raw.cylinder})` : `${raw.cylinder}`),
    };
  });

  const totalCalculatedMovement = cumulative;

  // Build segments between consecutive steps
  const segments = [];
  for (let i = 1; i < steps.length; i++) {
    const prev = steps[i - 1];
    const curr = steps[i];
    segments.push({
      index: i,
      fromIndex: i - 1,
      toIndex: i,
      fromCylinder: prev.cylinder,
      toCylinder: curr.cylinder,
      distance: curr.distanceFromPrev,
      cumulative: curr.cumulativeDistance,
      isJump: curr.isJump,
    });
  }

  // Find all unique cylinders visited for the top ruler
  const uniqueCylinders = Array.from(
    new Set([minCylinder, maxCylinder, ...steps.map((s) => s.cylinder)])
  ).sort((a, b) => a - b);

  // SVG Coordinate Geometry
  const svgWidth = 840;
  const marginX = 48;
  const usableWidth = svgWidth - 2 * marginX;
  const axisY = 46;
  const stepHeight = 44;
  const startY = axisY + 40;
  const svgHeight = startY + (steps.length - 1) * stepHeight + 36;

  const getX = (cylinder) => {
    const ratio = (cylinder - minCylinder) / (maxCylinder - minCylinder);
    return marginX + ratio * usableWidth;
  };

  const getY = (index) => startY + index * stepHeight;

  // Color configurations based on theme tokens
  const themeColors = {
    blue: { stroke: '#2563eb', fill: '#3b82f6', bg: '#eff6ff' },
    emerald: { stroke: '#059669', fill: '#10b981', bg: '#ecfdf5' },
    purple: { stroke: '#9333ea', fill: '#a855f7', bg: '#faf5ff' },
    amber: { stroke: '#d97706', fill: '#f59e0b', bg: '#fffbeb' },
    rose: { stroke: '#e11d48', fill: '#f43f5e', bg: '#fff1f2' },
    cyan: { stroke: '#0891b2', fill: '#06b6d4', bg: '#ecfeff' },
  };

  const currentTheme = themeColors[color] || themeColors.blue;

  // Active step for inspection (stepper takes precedence, fallback to hover)
  const inspectedStepIndex = activeStepIndex !== null ? activeStepIndex : hoveredIndex;
  const currentStep = inspectedStepIndex !== null ? steps[inspectedStepIndex] : null;

  // Stepper handlers
  const handlePrev = () => {
    if (activeStepIndex === null) {
      setActiveStepIndex(steps.length - 1);
    } else if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeStepIndex === null) {
      setActiveStepIndex(1);
    } else if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handleShowAll = () => {
    setActiveStepIndex(null);
    setHoveredIndex(null);
  };

  // Build default metrics if not explicitly passed
  const displayMetrics = metrics || [
    { label: 'Total Head Movement', value: `${totalCalculatedMovement} Cylinders` },
    { label: 'Initial Position', value: `Cylinder ${steps[0].cylinder}` },
    { label: 'Requests Serviced', value: `${steps.filter((s) => !s.isStart && !s.isBoundary && !s.isJump).length} Requests` },
    {
      label: 'Avg Seek / Request',
      value: `${(totalCalculatedMovement / Math.max(1, steps.length - 1)).toFixed(1)} Cylinders`,
    },
  ];

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.chartIcon}>💽</span>
            <div>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Stepper Toolbar */}
      <div className={styles.stepperToolbar}>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.stepButton} ${activeStepIndex === 0 ? styles.disabledBtn : ''}`}
            onClick={handlePrev}
            disabled={activeStepIndex === 0}
            title="Previous Seek Step"
          >
            ◀ Prev Step
          </button>
          <button
            type="button"
            className={`${styles.stepButton} ${activeStepIndex === steps.length - 1 ? styles.disabledBtn : ''}`}
            onClick={handleNext}
            disabled={activeStepIndex === steps.length - 1}
            title="Next Seek Step"
          >
            Next Step ▶
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${activeStepIndex === null ? styles.activeToggle : ''}`}
            onClick={handleShowAll}
          >
            🗺️ Full Path
          </button>
        </div>

        <div className={styles.stepperStatus}>
          {activeStepIndex === null ? (
            <span className={styles.statusBadge}>Showing All {steps.length - 1} Traversal Legs</span>
          ) : (
            <span className={styles.statusBadgeActive}>
              Step {activeStepIndex} of {steps.length - 1}: Head at Cylinder{' '}
              <strong>{steps[activeStepIndex].cylinder}</strong>
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas Container (Completely decoupled from dynamic height changes) */}
      <div className={styles.canvasWrapper}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className={styles.svgCanvas}
          aria-label={title || 'Disk Scheduling Trajectory Chart'}
        >
          <defs>
            {/* Arrowhead marker for normal steps */}
            <marker
              id={`arrow-${color}`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={currentTheme.stroke} />
            </marker>

            {/* Arrowhead marker for jumps */}
            <marker
              id="arrow-jump"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
            </marker>
          </defs>

          {/* Background Vertical Guidelines for each visited cylinder */}
          <g className={styles.guidelinesGroup}>
            {uniqueCylinders.map((cyl) => {
              const x = getX(cyl);
              const isBoundary = cyl === minCylinder || cyl === maxCylinder;
              const isCurrentCyl = currentStep && currentStep.cylinder === cyl;
              return (
                <line
                  key={`guide-${cyl}`}
                  x1={x}
                  y1={axisY}
                  x2={x}
                  y2={svgHeight - 16}
                  className={`${
                    isBoundary ? styles.boundaryGuideLine : styles.guideLine
                  } ${isCurrentCyl ? styles.activeGuideLine : ''}`}
                />
              );
            })}
          </g>

          {/* Top Axis Baseline Ruler */}
          <line
            x1={marginX - 10}
            y1={axisY}
            x2={svgWidth - marginX + 10}
            y2={axisY}
            className={styles.axisBaseline}
          />

          {/* Top Axis Cylinder Ticks & Labels */}
          <g className={styles.axisTicksGroup}>
            {uniqueCylinders.map((cyl) => {
              const x = getX(cyl);
              const isBoundary = cyl === minCylinder || cyl === maxCylinder;
              const isStart = cyl === steps[0].cylinder;
              const isCurrentCyl = currentStep && currentStep.cylinder === cyl;

              return (
                <g key={`tick-${cyl}`} className={styles.tickGroup}>
                  <line
                    x1={x}
                    y1={axisY - 6}
                    x2={x}
                    y2={axisY + 6}
                    className={`${isBoundary ? styles.boundaryTick : styles.tick} ${
                      isCurrentCyl ? styles.activeTick : ''
                    }`}
                  />
                  <text
                    x={x}
                    y={axisY - 12}
                    textAnchor="middle"
                    className={`${
                      isBoundary
                        ? styles.boundaryTickLabel
                        : isStart
                        ? styles.startTickLabel
                        : styles.tickLabel
                    } ${isCurrentCyl ? styles.activeTickLabel : ''}`}
                  >
                    {cyl}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Connecting Trajectory Segments */}
          <g className={styles.segmentsGroup}>
            {segments.map((seg, idx) => {
              const x1 = getX(seg.fromCylinder);
              const y1 = getY(seg.fromIndex);
              const x2 = getX(seg.toCylinder);
              const y2 = getY(seg.toIndex);
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              // Opacity logic for Stepper mode
              const isPastOrActive = activeStepIndex === null || seg.toIndex <= activeStepIndex;
              const isSegmentActive =
                (activeStepIndex !== null && activeStepIndex === seg.toIndex) ||
                hoveredIndex === seg.toIndex;
              const segOpacity = isPastOrActive ? 1 : 0.15;

              if (seg.isJump) {
                return (
                  <g
                    key={`seg-${idx}`}
                    className={`${styles.jumpSegment} ${isSegmentActive ? styles.segmentHovered : ''}`}
                    style={{ opacity: segOpacity }}
                  >
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      className={styles.jumpLine}
                      markerEnd="url(#arrow-jump)"
                    />
                    {/* Jump Badge */}
                    <rect
                      x={midX - 65}
                      y={midY - 11}
                      width={130}
                      height={22}
                      rx={11}
                      className={styles.jumpBadgeBg}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      className={styles.jumpBadgeText}
                    >
                      ⚡ Express Return (Δ {seg.distance})
                    </text>
                  </g>
                );
              }

              return (
                <g
                  key={`seg-${idx}`}
                  className={`${styles.trajectorySegment} ${
                    isSegmentActive ? styles.segmentHovered : ''
                  }`}
                  style={{ opacity: segOpacity }}
                >
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={styles.trajectoryLine}
                    stroke={currentTheme.stroke}
                    strokeWidth={isSegmentActive ? 3.5 : 2.5}
                    markerEnd={`url(#arrow-${color})`}
                  />
                  {/* Distance Pill at Midpoint showing Δ */}
                  <rect
                    x={midX - 26}
                    y={midY - 10}
                    width={52}
                    height={20}
                    rx={10}
                    className={`${styles.deltaBadgeBg} ${
                      isSegmentActive ? styles.deltaBadgeActive : ''
                    }`}
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    className={styles.deltaBadgeText}
                  >
                    Δ {seg.distance}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Trajectory Nodes (Step Circles & Badges) */}
          <g className={styles.nodesGroup}>
            {steps.map((st, idx) => {
              const cx = getX(st.cylinder);
              const cy = getY(idx);
              const isPastOrActive = activeStepIndex === null || idx <= activeStepIndex;
              const isCurrent =
                (activeStepIndex !== null && activeStepIndex === idx) || hoveredIndex === idx;
              const nodeOpacity = isPastOrActive ? 1 : 0.18;

              if (st.isStart) {
                return (
                  <g
                    key={`node-${idx}`}
                    className={`${styles.nodeGroup} ${isCurrent ? styles.nodeCurrent : ''}`}
                    style={{ opacity: nodeOpacity }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    {/* Generous Invisible Hover Hitbox */}
                    <circle cx={cx} cy={cy} r={20} fill="transparent" />

                    {/* Outer Focus Ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={13}
                      className={styles.startOuterRing}
                      stroke={currentTheme.stroke}
                    />
                    {/* Solid Inner Node */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6.5}
                      className={styles.startNode}
                      fill={currentTheme.stroke}
                    />
                    {/* Start Tooltip / Tag */}
                    <rect
                      x={cx + 14}
                      y={cy - 12}
                      width={92}
                      height={24}
                      rx={6}
                      className={styles.startTagBg}
                      stroke={currentTheme.stroke}
                    />
                    <text
                      x={cx + 60}
                      y={cy + 4}
                      textAnchor="middle"
                      className={styles.startTagText}
                    >
                      Start: {st.cylinder}
                    </text>
                  </g>
                );
              }

              if (st.isBoundary) {
                return (
                  <g
                    key={`node-${idx}`}
                    className={`${styles.nodeGroup} ${isCurrent ? styles.nodeCurrent : ''}`}
                    style={{ opacity: nodeOpacity }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    {/* Generous Invisible Hover Hitbox */}
                    <circle cx={cx} cy={cy} r={20} fill="transparent" />

                    {/* Diamond Marker for Physical Boundary */}
                    <rect
                      x={cx - 7}
                      y={cy - 7}
                      width={14}
                      height={14}
                      transform={`rotate(45 ${cx} ${cy})`}
                      className={styles.boundaryNode}
                    />
                    <circle cx={cx} cy={cy} r={2.5} fill="#ffffff" />
                    {/* Boundary Label Tag */}
                    <rect
                      x={cx > 400 ? cx - 114 : cx + 14}
                      y={cy - 11}
                      width={100}
                      height={22}
                      rx={6}
                      className={styles.boundaryTagBg}
                    />
                    <text
                      x={cx > 400 ? cx - 64 : cx + 64}
                      y={cy + 4}
                      textAnchor="middle"
                      className={styles.boundaryTagText}
                    >
                      Boundary ({st.cylinder})
                    </text>
                  </g>
                );
              }

              // Standard Serviced Request Node
              const labelOnLeft = cx > 700;
              return (
                <g
                  key={`node-${idx}`}
                  className={`${styles.nodeGroup} ${isCurrent ? styles.nodeCurrent : ''}`}
                  style={{ opacity: nodeOpacity }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  {/* Generous Invisible Hover Hitbox */}
                  <circle cx={cx} cy={cy} r={20} fill="transparent" />

                  {isCurrent && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={12}
                      className={styles.activeGlowRing}
                      stroke={currentTheme.stroke}
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isCurrent ? 7.5 : 6}
                    className={styles.standardNode}
                    fill={currentTheme.stroke}
                  />
                  {/* Step Chip Tag */}
                  <rect
                    x={labelOnLeft ? cx - 62 : cx + 12}
                    y={cy - 10}
                    width={50}
                    height={20}
                    rx={6}
                    className={styles.stepTagBg}
                  />
                  <text
                    x={labelOnLeft ? cx - 37 : cx + 37}
                    y={cy + 4}
                    textAnchor="middle"
                    className={styles.stepTagText}
                  >
                    #{idx} ({st.cylinder})
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Permanent Fixed-Height Live Inspector Console (Placed BELOW the SVG to eliminate layout shifts) */}
      <div className={styles.inspectorContainer}>
        {currentStep && currentStep.index > 0 ? (
          <div className={styles.inspectorBanner}>
            <div className={styles.inspectorItem}>
              <span className={styles.inspectorLabel}>From Head</span>
              <span className={styles.inspectorValue}>
                Cylinder {steps[currentStep.index - 1].cylinder}
              </span>
            </div>
            <div className={styles.inspectorArrow}>⟶</div>
            <div className={styles.inspectorItem}>
              <span className={styles.inspectorLabel}>To Target</span>
              <span className={styles.inspectorValue}>Cylinder {currentStep.cylinder}</span>
            </div>
            <div className={styles.inspectorDivider} />
            <div className={styles.inspectorItem}>
              <span className={styles.inspectorLabel}>Seek Displacement (Δ)</span>
              <span className={styles.inspectorHighlight}>
                {currentStep.isJump ? (
                  <span className={styles.jumpText}>Express Return (Δ {currentStep.distanceFromPrev})</span>
                ) : (
                  `${currentStep.distanceFromPrev} Cylinders`
                )}
              </span>
            </div>
            <div className={styles.inspectorDivider} />
            <div className={styles.inspectorItem}>
              <span className={styles.inspectorLabel}>Cumulative Seek (Σ)</span>
              <span className={styles.inspectorTotal}>
                {currentStep.cumulativeDistance} Cylinders
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.inspectorIdle}>
            <span className={styles.inspectorHintIcon}>💡</span>
            <span className={styles.inspectorHintText}>
              Hover over any node or click <strong>[Next Step ▶]</strong> to inspect seek displacement (Δ) and cumulative travel (Σ).
            </span>
          </div>
        )}
      </div>

      {/* Summary Metrics Strip */}
      {displayMetrics && displayMetrics.length > 0 && (
        <div className={styles.metricsStrip}>
          {displayMetrics.map((metric, mIdx) => (
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
