import React, { useState, useMemo } from 'react';
import flowStyles from './FlowDiagram.module.css';
import styles from './ContentionTimeline.module.css';

/**
 * ContentionTimeline
 * Universal Medium Access Contention & Channel Timeline Engine for Binary Dose.
 * Visualizes Pure ALOHA, Slotted ALOHA, CSMA contention windows, and reservation channels.
 * Directly adapts FlowDiagram styling, tokens, and live inspector strip.
 */
export default function ContentionTimeline({
  title = "Medium Access Contention Timeline",
  subtitle,
  mode = "pure", // "pure" | "slotted" | "reservation"
  slotDurationLabel = "Tt",
  vulnerableWindowLabel = "2 × Tt",
  vulnerableTimeRange = { start: 1, end: 3, label: "Vulnerable Time (2 × Tt) around Frame A" },
  stations = [
    { id: 'S1', label: 'Station 1', color: 'blue' },
    { id: 'S2', label: 'Station 2', color: 'purple' },
    { id: 'S3', label: 'Station 3', color: 'emerald' },
    { id: 'S4', label: 'Station 4', color: 'amber' },
  ],
  slots = [], // For slotted mode: [{ id: 1, label: 'Slot 1' }, ...]
  frames = [], // Array of frame objects: { id, station, start, duration, label, status: 'success'|'collision'|'idle', details }
  timeMarkers = [], // Array of time markers along axis: [{ time: 0, label: 't0 - Tt' }, ...]
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [hoveredFrameId, setHoveredFrameId] = useState(null);
  const [activeFrameId, setActiveFrameId] = useState(null);

  // Stepper handlers
  const handlePrevStep = () => {
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setCurrentStepIdx((prev) => Math.min(frames.length - 1, prev + 1));
  };

  // Determine active item for inspector
  const activeFrame = useMemo(() => {
    if (activeFrameId) return frames.find((f) => f.id === activeFrameId);
    if (hoveredFrameId) return frames.find((f) => f.id === hoveredFrameId);
    return frames[currentStepIdx] || frames[0];
  }, [activeFrameId, hoveredFrameId, currentStepIdx, frames]);

  // Total timeline units
  const totalUnits = useMemo(() => {
    if (slots && slots.length > 0) return slots.length;
    let maxT = 0;
    frames.forEach((f) => {
      const end = (f.start || 0) + (f.duration || 1);
      if (end > maxT) maxT = end;
    });
    return Math.max(maxT + 0.5, 6);
  }, [slots, frames]);

  const isSlotted = mode === 'slotted';

  return (
    <div className={flowStyles.container}>
      {/* Header */}
      <div className={flowStyles.header}>
        <div className={flowStyles.headerTopRow}>
          <span className={flowStyles.titleBadge}>
            {isSlotted ? 'Slotted Channel (Synchronous)' : 'Random Access Contention (Asynchronous)'}
          </span>

          {frames.length > 0 && (
            <div className={flowStyles.stepperContainer}>
              <button
                type="button"
                className={flowStyles.stepBtn}
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                aria-label="Previous frame event"
              >
                ◀ Prev
              </button>
              <span className={flowStyles.stepCounter}>
                Frame {currentStepIdx + 1} of {frames.length}
              </span>
              <button
                type="button"
                className={flowStyles.stepBtn}
                onClick={handleNextStep}
                disabled={currentStepIdx === frames.length - 1}
                aria-label="Next frame event"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>

        {title && <h3 className={flowStyles.title}>{title}</h3>}
        {subtitle && <p className={flowStyles.subtitle}>{subtitle}</p>}
      </div>

      {/* Main Timeline Viewport */}
      <div className={flowStyles.diagramScrollWrapper}>
        <div className={styles.timelineCanvas}>
          {/* Top Info Banner: Vulnerable Period Indicator */}
          {vulnerableWindowLabel && (
            <div className={styles.vulnerableBanner}>
              <span className={styles.vulnerableBadge}>⚡ Vulnerable Window: {vulnerableWindowLabel}</span>
              <span className={styles.vulnerableText}>
                {isSlotted
                  ? 'Collisions occur only if multiple stations transmit at the exact same discrete slot boundary.'
                  : 'Collisions occur if any other station transmits between (t0 - Tt) and (t0 + Tt).'}
              </span>
            </div>
          )}

          {/* Grid Layout: Stations on Left, Tracks on Right */}
          <div className={styles.tracksContainer}>
            {/* Background Slot Columns for Slotted Mode */}
            {isSlotted && slots.length > 0 && (
              <div className={styles.slotsBackgroundLayer}>
                {slots.map((slot, idx) => (
                  <div key={slot.id || idx} className={styles.slotColumn}>
                    <div className={styles.slotColHeader}>
                      <span className={styles.slotColLabel}>{slot.label || `Slot ${idx + 1}`}</span>
                      <span className={styles.slotColDuration}>({slotDurationLabel})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Station Rows */}
            {stations.map((station) => (
              <div key={station.id} className={styles.stationRow}>
                <div className={styles.stationLabelCol}>
                  <span className={styles.stationDot} data-color={station.color || 'blue'} />
                  <span className={styles.stationName}>{station.label}</span>
                </div>

                <div className={styles.stationTrack}>
                  {/* Guideline line */}
                  <div className={styles.trackGuideLine} />

                  {/* Render Station Frames */}
                  {frames
                    .filter((f) => f.station === station.id)
                    .map((frame) => {
                      const leftPercent = ((frame.start || 0) / totalUnits) * 100;
                      const widthPercent = ((frame.duration || 1) / totalUnits) * 100;
                      const isCurrent = activeFrame && activeFrame.id === frame.id;
                      const isCollision = frame.status === 'collision';

                      return (
                        <div
                          key={frame.id}
                          className={`${styles.frameBlock} ${isCollision ? styles.frameCollision : styles.frameSuccess} ${isCurrent ? styles.frameActive : ''}`}
                          style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`,
                          }}
                          onMouseEnter={() => setHoveredFrameId(frame.id)}
                          onMouseLeave={() => setHoveredFrameId(null)}
                          onClick={() => {
                            setActiveFrameId((prev) => (prev === frame.id ? null : frame.id));
                            const idx = frames.findIndex((f) => f.id === frame.id);
                            if (idx >= 0) setCurrentStepIdx(idx);
                          }}
                        >
                          <div className={styles.frameHeaderRow}>
                            <span className={styles.frameTag}>{frame.label}</span>
                            <span className={styles.frameStatusBadge}>
                              {isCollision ? '💥 Collision' : '✅ Delivered'}
                            </span>
                          </div>
                          {frame.sublabel && <span className={styles.frameSub}>{frame.sublabel}</span>}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Time Axis */}
          <div className={styles.timeAxisRow}>
            <div className={styles.axisOriginPad}>Time (t) ➔</div>
            <div className={styles.axisTicksTrack}>
              {timeMarkers.length > 0
                ? timeMarkers.map((marker, idx) => (
                    <div
                      key={idx}
                      className={styles.timeTick}
                      style={{ left: `${(marker.time / totalUnits) * 100}%` }}
                    >
                      <div className={styles.tickLine} />
                      <span className={styles.tickLabel}>{marker.label}</span>
                    </div>
                  ))
                : Array.from({ length: Math.floor(totalUnits) + 1 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={styles.timeTick}
                      style={{ left: `${(idx / totalUnits) * 100}%` }}
                    >
                      <div className={styles.tickLine} />
                      <span className={styles.tickLabel}>t = {idx}</span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Inspector Strip */}
      <div className={flowStyles.inspectorStrip}>
        {activeFrame ? (
          <div
            className={`${flowStyles.inspectorContent} ${activeFrame.status === 'collision' ? flowStyles.roseInspector : flowStyles.emeraldInspector}`}
          >
            <div className={flowStyles.inspectorHeader}>
              <div className={flowStyles.inspectorMeta}>
                <span className={flowStyles.inspectorBadge}>{activeFrame.label}</span>
                <span className={styles.stationBadge}>{activeFrame.station}</span>
                {activeFrame.status === 'collision' ? (
                  <span className={styles.collisionStatusPill}>💥 Signal Collision Detected</span>
                ) : (
                  <span className={styles.successStatusPill}>✅ Clean Transmission</span>
                )}
                <span className={flowStyles.inspectorTitle}>
                  {activeFrame.title || (activeFrame.status === 'collision' ? 'Collision Window Overlap' : 'Successful Channel Capture')}
                </span>
              </div>

              <button
                type="button"
                className={flowStyles.inspectorClose}
                onClick={() => {
                  setActiveFrameId(null);
                  setHoveredFrameId(null);
                }}
                aria-label="Clear active inspection"
              >
                ✕
              </button>
            </div>

            <p className={flowStyles.inspectorBody}>
              {activeFrame.details ||
                (activeFrame.status === 'collision'
                  ? 'Transmitted bits overlap in time with another station, creating destructive electrical/radio interference. CRC checksum fails at receiver.'
                  : 'Frame transmitted with zero overlapping signals during the vulnerable window. Receiver successfully computes valid CRC and dispatches ACK.')}
            </p>
          </div>
        ) : (
          <div className={flowStyles.inspectorPlaceholder}>
            <span className={flowStyles.inspectorHintIcon}>💡</span>
            <span className={flowStyles.inspectorHintText}>
              Hover or click any frame transmission or use ◀ Prev / Next ▶ to inspect contention mechanics and collision overlap in real time.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
