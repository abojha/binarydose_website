import React, { useState, useMemo, useRef, useEffect } from 'react';
import flowStyles from './FlowDiagram.module.css';
import styles from './ProtocolLadder.module.css';

/**
 * ProtocolLadder
 * Universal Adaptive Space-Time Protocol Ladder & Packet Sequence Engine for Binary Dose.
 * Directly adapts and reuses FlowDiagram styles, tokens, edge animations, cards, and inspector.
 */
export default function ProtocolLadder({
  title,
  subtitle,
  actors = [
    { id: 'sender', label: 'Sender (Host A)', icon: '📡', role: 'Transmitter', color: 'blue' },
    { id: 'receiver', label: 'Receiver (Host B)', icon: '📥', role: 'Receiver', color: 'emerald' },
  ],
  steps: rawSteps = [],
  windowState,
  timeMarkers = [],
  defaultActiveStep = 0,
}) {
  const sandboxRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 0;
  });

  const [currentStepIdx, setCurrentStepIdx] = useState(defaultActiveStep);
  const [hoveredStepId, setHoveredStepId] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);
  const [hoveredActorId, setHoveredActorId] = useState(null);

  // Measure container width in real time via ResizeObserver
  useEffect(() => {
    if (!sandboxRef.current) return;

    const updateWidth = () => {
      if (sandboxRef.current) {
        const measured = sandboxRef.current.clientWidth;
        if (measured > 0) setContainerWidth(measured);
      }
    };

    updateWidth();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const measured = Math.round(entry.contentRect.width);
          if (measured > 0) setContainerWidth(measured);
        }
      });
      ro.observe(sandboxRef.current);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, []);

  const isMobile = containerWidth > 0 && containerWidth < 680;

  // 1. Grid & Coordinates Calculation
  const {
    layoutActors,
    layoutSteps,
    svgWidth,
    svgHeight,
    actorXMap,
  } = useMemo(() => {
    const numActors = Math.max(2, actors.length);
    const availableW = containerWidth > 0 ? containerWidth : 860;
    const mobileBaseWidth = Math.max(760, numActors * 280);
    const targetW = isMobile ? mobileBaseWidth : Math.min(940, Math.max(680, availableW));

    // Dynamic horizontal margins for lifelines
    const sideMargin = numActors === 2 ? 160 : 120;
    const usableW = targetW - 2 * sideMargin;

    const xMap = {};
    const computedActors = actors.map((actor, idx) => {
      let x = sideMargin;
      if (numActors === 2) {
        x = idx === 0 ? sideMargin : targetW - sideMargin;
      } else {
        x = sideMargin + idx * (usableW / (numActors - 1));
      }
      xMap[actor.id] = Math.round(x);
      return {
        ...actor,
        x: Math.round(x),
      };
    });

    // Vertical spacing
    const topPad = 88;
    const stepHeight = 84;
    const slopeDrop = 48;
    const bottomPad = 50;
    const totalH = Math.round(topPad + rawSteps.length * stepHeight + bottomPad);

    // Compute geometry for every step
    const computedSteps = rawSteps.map((step, idx) => {
      const stepId = step.id || `step-${idx}`;
      const yStart = Math.round(topPad + idx * stepHeight + 20);
      const yEnd = Math.round(yStart + slopeDrop);

      if (step.isEvent || step.type === 'event') {
        const actorId = step.actor || 'sender';
        const actorX = xMap[actorId] || xMap['sender'] || 160;
        return {
          ...step,
          id: stepId,
          idx,
          isEvent: true,
          actorX,
          eventY: yStart,
          yStart,
          yEnd,
        };
      }

      const fromId = step.from || 'sender';
      const toId = step.to || 'receiver';
      const fromX = xMap[fromId] || 160;
      const toX = xMap[toId] || (targetW - 160);
      const isToRight = toX > fromX;

      const isLost = step.status === 'lost';
      const isCorrupted = step.status === 'corrupted';

      let targetX = toX;
      let targetY = yEnd;

      if (isLost) {
        targetX = Math.round(fromX + (toX - fromX) * 0.52);
        targetY = Math.round(yStart + (yEnd - yStart) * 0.52);
      }

      const midX = Math.round((fromX + targetX) / 2);
      const midY = Math.round((yStart + targetY) / 2);

      return {
        ...step,
        id: stepId,
        idx,
        fromX,
        toX,
        targetX,
        targetY,
        yStart,
        yEnd,
        midX,
        midY,
        isToRight,
        isLost,
        isCorrupted,
      };
    });

    return {
      layoutActors: computedActors,
      layoutSteps: computedSteps,
      svgWidth: targetW,
      svgHeight: totalH,
      actorXMap: xMap,
    };
  }, [actors, rawSteps, containerWidth, isMobile]);

  // Stepper handlers matching FlowDiagram
  const handlePrevStep = () => {
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setCurrentStepIdx((prev) => Math.min(rawSteps.length - 1, prev + 1));
  };

  const activeStep = layoutSteps[currentStepIdx] || layoutSteps[0];

  // Active details for the constant-height inspector
  const activeDetails = useMemo(() => {
    const targetId = activeStepId || hoveredStepId;
    if (targetId) {
      const found = layoutSteps.find((s) => s.id === targetId);
      if (found) return found;
    }
    return activeStep;
  }, [activeStepId, hoveredStepId, layoutSteps, activeStep]);

  return (
    <div className={flowStyles.container} ref={sandboxRef}>
      {/* Header - Reusing FlowDiagram Header Styles */}
      <div className={flowStyles.header}>
        <div className={flowStyles.headerTopRow}>
          <div className={flowStyles.titleBadge}>Space-Time Protocol Ladder</div>

          {rawSteps.length > 0 && (
            <div className={flowStyles.stepperContainer}>
              <button
                type="button"
                className={flowStyles.stepBtn}
                disabled={currentStepIdx === 0}
                onClick={handlePrevStep}
              >
                ◀ Prev
              </button>
              <span className={flowStyles.stepCounter}>
                Step {currentStepIdx + 1} of {rawSteps.length}
              </span>
              <button
                type="button"
                className={flowStyles.stepBtn}
                disabled={currentStepIdx === rawSteps.length - 1}
                onClick={handleNextStep}
              >
                Next ▶
              </button>
            </div>
          )}
        </div>

        {title && <h3 className={flowStyles.title}>{title}</h3>}
        {subtitle && <p className={flowStyles.subtitle}>{subtitle}</p>}

        <div className={flowStyles.hintText}>
          <span>💡</span>
          <span>Click or hover any packet flight arrow, timer event, or step button to inspect protocol mechanics in real time</span>
        </div>

        {isMobile && (
          <div className={flowStyles.mobileSwipeHint}>
            <span>↔ Swipe horizontally to inspect space-time ladder</span>
          </div>
        )}
      </div>

      {/* Real-Time Sliding Window State Strip (Clean & Non-Overlapping) */}
      {windowState && (
        <div className={styles.windowStrip}>
          <div className={styles.windowStripHeader}>
            <span className={styles.windowStripIcon}>🪟</span>
            <span className={styles.windowStripTitle}>{windowState.title || 'Sliding Window Buffer State'}</span>
            {windowState.subtitle && <span className={styles.windowStripSub}>({windowState.subtitle})</span>}
          </div>

          <div className={styles.windowCardsRow}>
            {windowState.sender && (
              <div className={styles.windowActorCard}>
                <div className={styles.windowActorLabel}>
                  <span className={styles.windowActorDot} style={{ background: '#38bdf8' }} />
                  <strong>{windowState.sender.label || 'Sender Window'}</strong>
                  {windowState.sender.size && (
                    <span className={styles.windowSizeBadge}>W<sub>S</sub> = {windowState.sender.size}</span>
                  )}
                </div>
                <div className={styles.windowSlotsTrack}>
                  {windowState.sender.slots && windowState.sender.slots.map((slot, sIdx) => {
                    const isSlotHighlighted = activeStep?.windowHighlight === slot.seq || (activeStep?.label && activeStep.label.includes(`Frame ${slot.seq}`));
                    return (
                      <div
                        key={sIdx}
                        className={`${styles.windowSlotCell} ${styles['slot_' + (slot.status || 'usable')]} ${isSlotHighlighted ? styles.slotCellActive : ''}`}
                      >
                        <div className={styles.slotFrameLabel}>Frame {slot.seq}</div>
                        <div className={styles.slotStateBadge}>{slot.badge || slot.status}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {windowState.receiver && (
              <div className={styles.windowActorCard}>
                <div className={styles.windowActorLabel}>
                  <span className={styles.windowActorDot} style={{ background: '#10b981' }} />
                  <strong>{windowState.receiver.label || 'Receiver Window'}</strong>
                  {windowState.receiver.size && (
                    <span className={styles.windowSizeBadge}>W<sub>R</sub> = {windowState.receiver.size}</span>
                  )}
                </div>
                <div className={styles.windowSlotsTrack}>
                  {windowState.receiver.slots && windowState.receiver.slots.map((slot, sIdx) => {
                    const isSlotHighlighted = activeStep?.windowHighlight === slot.seq || (activeStep?.label && activeStep.label.includes(`ACK ${slot.seq}`));
                    return (
                      <div
                        key={sIdx}
                        className={`${styles.windowSlotCell} ${styles['slot_' + (slot.status || 'usable')]} ${isSlotHighlighted ? styles.slotCellActive : ''}`}
                      >
                        <div className={styles.slotFrameLabel}>Slot {slot.seq}</div>
                        <div className={styles.slotStateBadge}>{slot.badge || slot.status}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Diagram Scroll Viewport - Reusing FlowDiagram Scroll Styles */}
      <div
        className={`${flowStyles.diagramScrollWrapper} ${isMobile ? flowStyles.scrollWrapperMobilePan : ''}`}
        style={{
          overflowX: isMobile ? 'auto' : 'hidden',
          overflowY: 'hidden',
        }}
      >
        <div
          className={flowStyles.diagramViewport}
          style={{
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
          }}
        >
          {/* Layer 1: SVG Vectors (Lifelines, Slanted Rays, Markers) */}
          <svg
            className={flowStyles.svgLayer}
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cyan Arrowhead Markers (FlowDiagram Standard) */}
              <marker id="ladder-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
              </marker>
              <marker id="ladder-arrow-cyan-glow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8.5" markerHeight="8.5" orient="auto">
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#38bdf8" />
              </marker>

              {/* Emerald Arrowhead Markers (ACKs) */}
              <marker id="ladder-arrow-emerald" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
              </marker>
              <marker id="ladder-arrow-emerald-glow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8.5" markerHeight="8.5" orient="auto">
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#10b981" />
              </marker>

              {/* Amber Arrowhead Markers */}
              <marker id="ladder-arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
              </marker>
              <marker id="ladder-arrow-amber-glow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8.5" markerHeight="8.5" orient="auto">
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#f59e0b" />
              </marker>

              {/* Rose Arrowhead Markers (Lost/Error) */}
              <marker id="ladder-arrow-rose" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
              </marker>
              <marker id="ladder-arrow-rose-glow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8.5" markerHeight="8.5" orient="auto">
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#f43f5e" />
              </marker>

              {/* Purple Arrowhead Markers */}
              <marker id="ladder-arrow-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
              </marker>
              <marker id="ladder-arrow-purple-glow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8.5" markerHeight="8.5" orient="auto">
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#a855f7" />
              </marker>

              {/* Lifeline Rail Gradient */}
              <linearGradient id="ladder-rail-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="20%" stopColor="rgba(148, 163, 184, 0.5)" />
                <stop offset="85%" stopColor="rgba(148, 163, 184, 0.5)" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Time Axis Bar on Left */}
            <g className={styles.timeAxisGroup}>
              <line x1={36} y1={72} x2={36} y2={svgHeight - 24} stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points={`36,${svgHeight - 14} 32,${svgHeight - 24} 40,${svgHeight - 24}`} fill="#94a3b8" />
              <text x={36} y={58} textAnchor="middle" className={styles.timeAxisText}>TIME (t)</text>
              <text x={36} y={svgHeight - 2} textAnchor="middle" className={styles.timeAxisSub}>+∞</text>
            </g>

            {/* Vertical Lifelines */}
            {layoutActors.map((actor) => {
              const isActorHovered = hoveredActorId === actor.id;
              return (
                <g key={actor.id} className={styles.lifelineGroup}>
                  <line
                    x1={actor.x}
                    y1={72}
                    x2={actor.x}
                    y2={svgHeight - 22}
                    className={`${styles.lifelineLine} ${isActorHovered ? styles.lifelineHovered : ''}`}
                    stroke="url(#ladder-rail-gradient)"
                    strokeWidth={isActorHovered ? "3.5" : "2.5"}
                  />
                  <circle cx={actor.x} cy={svgHeight - 22} r="5" fill="#38bdf8" />
                </g>
              );
            })}

            {/* Packet Flights & Event Paths */}
            {layoutSteps.map((step) => {
              const isSteppedCurrent = step.idx === currentStepIdx;
              const isStepActive =
                isSteppedCurrent ||
                hoveredStepId === step.id ||
                activeStepId === step.id ||
                hoveredActorId === step.from ||
                hoveredActorId === step.to ||
                hoveredActorId === step.actor;

              // Color resolution with guaranteed fallback to cyan/blue
              let strokeColor = '#38bdf8';
              let markerColorKey = 'cyan';

              if (step.status === 'lost') {
                strokeColor = '#f43f5e';
                markerColorKey = 'rose';
              } else if (step.color === 'emerald' || step.from === 'receiver') {
                strokeColor = '#10b981';
                markerColorKey = 'emerald';
              } else if (step.color === 'amber') {
                strokeColor = '#f59e0b';
                markerColorKey = 'amber';
              } else if (step.color === 'rose') {
                strokeColor = '#f43f5e';
                markerColorKey = 'rose';
              } else if (step.color === 'purple') {
                strokeColor = '#a855f7';
                markerColorKey = 'purple';
              }

              if (step.isEvent) {
                const isTimeout = step.eventType === 'timeout';
                return (
                  <g
                    key={step.id}
                    className={`${styles.eventSvgGroup} ${isStepActive ? styles.eventActive : ''}`}
                    onMouseEnter={() => setHoveredStepId(step.id)}
                    onMouseLeave={() => setHoveredStepId(null)}
                    onClick={() => {
                      setActiveStepId((prev) => (prev === step.id ? null : step.id));
                      setCurrentStepIdx(step.idx);
                    }}
                  >
                    {/* Timer Span Bracket if present */}
                    {step.spanSteps && (
                      <path
                        d={`M ${step.actorX + 10} ${step.eventY - step.spanSteps * 84} C ${step.actorX + 30} ${step.eventY - (step.spanSteps * 84) / 2}, ${step.actorX + 30} ${step.eventY - (step.spanSteps * 84) / 2}, ${step.actorX + 10} ${step.eventY}`}
                        fill="none"
                        stroke={isTimeout ? '#f43f5e' : '#f59e0b'}
                        strokeWidth="2.2"
                        strokeDasharray="4 3"
                      />
                    )}

                    {/* Event Circle Node on Lifeline */}
                    <circle
                      cx={step.actorX}
                      cy={step.eventY}
                      r={isStepActive ? 7.5 : 5.5}
                      fill={isTimeout ? '#f43f5e' : '#f59e0b'}
                      className={styles.eventMarkerCircle}
                    />
                  </g>
                );
              }

              return (
                <g
                  key={step.id}
                  className={`${flowStyles.edgeGroup} ${isStepActive ? flowStyles.edgeGroupActive : ''}`}
                  onMouseEnter={() => setHoveredStepId(step.id)}
                  onMouseLeave={() => setHoveredStepId(null)}
                  onClick={() => {
                    setActiveStepId((prev) => (prev === step.id ? null : step.id));
                    setCurrentStepIdx(step.idx);
                  }}
                >
                  {/* Invisible wide stroke for easy cursor hover (FlowDiagram edgeHitArea) */}
                  <line
                    x1={step.fromX}
                    y1={step.yStart}
                    x2={step.targetX}
                    y2={step.targetY}
                    className={flowStyles.edgeHitArea}
                  />

                  {/* Origin Dot on Lifeline */}
                  <circle
                    cx={step.fromX}
                    cy={step.yStart}
                    r={isStepActive ? 5.5 : 4}
                    fill={strokeColor}
                    className={styles.originDot}
                  />

                  {/* Visible glowing vector ray path (FlowDiagram edgePath + flowDash pulse) */}
                  <line
                    x1={step.fromX}
                    y1={step.yStart}
                    x2={step.targetX}
                    y2={step.targetY}
                    stroke={strokeColor}
                    className={`${flowStyles.edgePath} ${step.isLost ? flowStyles.edgePathDashed : ''} ${isStepActive ? flowStyles.edgePathActive : ''}`}
                    markerEnd={
                      !step.isLost
                        ? isStepActive
                          ? `url(#ladder-arrow-${markerColorKey}-glow)`
                          : `url(#ladder-arrow-${markerColorKey})`
                        : undefined
                    }
                  />

                  {/* Lost Packet Terminal Burst Marker */}
                  {step.isLost && (
                    <g transform={`translate(${step.targetX}, ${step.targetY})`}>
                      <circle cx="0" cy="0" r="10" fill="#f43f5e" className={styles.lostCircle} />
                      <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="4.5" y1="-4.5" x2="-4.5" y2="4.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                    </g>
                  )}

                  {/* Optional Delay label along slope (e.g. Tp) */}
                  {step.delayNote && (
                    <text
                      x={step.midX}
                      y={step.midY + 22}
                      textAnchor="middle"
                      className={styles.delayNoteText}
                    >
                      {step.delayNote}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Layer 2: HTML Actor Cards at Top - REUSING FlowDiagram cardContainer */}
          <div className={styles.actorsLayer}>
            {layoutActors.map((actor) => {
              const isActorHovered = hoveredActorId === actor.id;
              const colorTheme = flowStyles[actor.color + 'Card'] || flowStyles.blueCard;
              return (
                <div
                  key={actor.id}
                  className={`${flowStyles.cardContainer} ${colorTheme} ${isActorHovered ? flowStyles.cardActive : ''}`}
                  style={{
                    left: `${actor.x}px`,
                    transform: 'translateX(-50%)',
                    width: '170px',
                  }}
                  onMouseEnter={() => setHoveredActorId(actor.id)}
                  onMouseLeave={() => setHoveredActorId(null)}
                >
                  <div className={flowStyles.cardHeader}>
                    {actor.icon && <span className={flowStyles.cardIcon}>{actor.icon}</span>}
                    {actor.role && <span className={flowStyles.cardBadge}>{actor.role}</span>}
                  </div>
                  <div className={flowStyles.cardTitle}>{actor.label}</div>
                  <div className={flowStyles.cardSublabel}>Lifeline Rail (t ↓)</div>
                </div>
              );
            })}
          </div>

          {/* Layer 3: HTML Step Badges - REUSING FlowDiagram edgeBadge & stepPill */}
          <div className={flowStyles.labelsLayer}>
            {layoutSteps.map((step) => {
              const isSteppedCurrent = step.idx === currentStepIdx;
              const isStepActive =
                isSteppedCurrent ||
                hoveredStepId === step.id ||
                activeStepId === step.id ||
                hoveredActorId === step.from ||
                hoveredActorId === step.to ||
                hoveredActorId === step.actor;

              if (step.isEvent) {
                const isTimeout = step.eventType === 'timeout';
                const isRightActor = step.actorX > (svgWidth / 2);
                return (
                  <div
                    key={`event-${step.id}`}
                    className={`${styles.eventTagBadge} ${isRightActor ? styles.eventTagBadge_right : styles.eventTagBadge_left} ${isTimeout ? styles.eventBadge_rose : styles.eventBadge_amber} ${isStepActive ? styles.eventTagActive : ''}`}
                    style={{
                      left: isRightActor ? `${step.actorX - 16}px` : `${step.actorX + 16}px`,
                      top: `${step.eventY - 14}px`,
                    }}
                    onMouseEnter={() => setHoveredStepId(step.id)}
                    onMouseLeave={() => setHoveredStepId(null)}
                    onClick={() => {
                      setActiveStepId((prev) => (prev === step.id ? null : step.id));
                      setCurrentStepIdx(step.idx);
                    }}
                  >
                    <span className={styles.eventIcon}>{step.icon || (isTimeout ? '⏰' : '⚡')}</span>
                    <span className={styles.eventTitle}>{step.label}</span>
                    {step.sublabel && <span className={styles.eventSub}>({step.sublabel})</span>}
                  </div>
                );
              }

              return (
                <div
                  key={`packet-${step.id}`}
                  className={`${flowStyles.edgeBadge} ${isStepActive ? flowStyles.edgeBadgeActive : ''}`}
                  style={{
                    left: `${step.midX}px`,
                    top: `${step.midY - 14}px`,
                  }}
                  onMouseEnter={() => setHoveredStepId(step.id)}
                  onMouseLeave={() => setHoveredStepId(null)}
                  onClick={() => {
                    setActiveStepId((prev) => (prev === step.id ? null : step.id));
                    setCurrentStepIdx(step.idx);
                  }}
                >
                  <span className={flowStyles.stepPill}>{step.idx + 1}</span>
                  <span className={flowStyles.edgeText}>{step.label}</span>
                  {step.status === 'lost' && <span className={styles.miniTagLost}>Lost</span>}
                  {step.status === 'corrupted' && <span className={styles.miniTagCorrupt}>CRC Error</span>}
                  {step.sublabel && <span className={styles.edgeSubText}>({step.sublabel})</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Inspector Strip - REUSING FlowDiagram Inspector Styles */}
      <div className={flowStyles.inspectorStrip}>
        {activeDetails ? (
          <div className={`${flowStyles.inspectorContent} ${flowStyles[activeDetails.color + 'Inspector'] || flowStyles.cyanInspector}`}>
            <div className={flowStyles.inspectorHeader}>
              <div className={flowStyles.inspectorMeta}>
                <span className={flowStyles.inspectorBadge}>Step {activeDetails.idx + 1} of {rawSteps.length}</span>

                {activeDetails.from && activeDetails.to && (
                  <span className={styles.inspectorRoutePill}>
                    {activeDetails.from} ➔ {activeDetails.to}
                  </span>
                )}

                {activeDetails.status === 'lost' && (
                  <span className={styles.inspectorStatusLost}>❌ Packet Lost in Transit</span>
                )}
                {activeDetails.status === 'corrupted' && (
                  <span className={styles.inspectorStatusCorrupt}>⚠️ CRC Error (Discarded)</span>
                )}
                {activeDetails.status === 'success' && (
                  <span className={styles.inspectorStatusOk}>✅ Delivered Successfully</span>
                )}
                {activeDetails.isEvent && (
                  <span className={styles.inspectorStatusEvent}>⏰ {activeDetails.eventType || 'Event'}</span>
                )}

                <span className={flowStyles.inspectorTitle}>{activeDetails.label}</span>
              </div>

              <button
                type="button"
                aria-label="Reset details"
                className={flowStyles.inspectorClose}
                onClick={() => {
                  setActiveStepId(null);
                  setHoveredStepId(null);
                  setHoveredActorId(null);
                }}
              >
                ✕
              </button>
            </div>

            <p className={flowStyles.inspectorBody}>
              {activeDetails.details || activeDetails.description || 'Frame transmitted across physical communication link.'}
            </p>

            {activeDetails.technicalContext && (
              <div className={styles.inspectorContextRow}>
                <span className={styles.contextPrefix}>Protocol Mechanics:</span>
                <span>{activeDetails.technicalContext}</span>
              </div>
            )}
          </div>
        ) : (
          <div className={flowStyles.inspectorPlaceholder}>
            <span className={flowStyles.inspectorHintIcon}>💡</span>
            <span className={flowStyles.inspectorHintText}>
              Click or hover any packet flight arrow, timer event, or step button to inspect protocol mechanics in real time
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
