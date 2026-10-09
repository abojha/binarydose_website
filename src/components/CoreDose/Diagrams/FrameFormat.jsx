import React, { useState } from 'react';
import flowStyles from './FlowDiagram.module.css';
import styles from './FrameFormat.module.css';

/**
 * FrameFormat
 * Universal Hardware Packet & Frame Format Strip Inspector for Binary Dose.
 * Replaces all ASCII frame tables and raw blocks across Ethernet, IP, TCP, and Token Ring.
 * Directly adapts FlowDiagram styling and interactive inspector strip.
 */
export default function FrameFormat({
  title = "Frame Format Anatomy",
  subtitle,
  standardBadge = "IEEE 802.3 Standard",
  totalSizeBytes = "64 to 1518 Bytes",
  fields = [],
  defaultActiveField = 0,
}) {
  const [activeFieldIdx, setActiveFieldIdx] = useState(defaultActiveField);
  const [hoveredFieldIdx, setHoveredFieldIdx] = useState(null);

  const currentField =
    hoveredFieldIdx !== null
      ? fields[hoveredFieldIdx]
      : fields[activeFieldIdx] || fields[0];

  const colorMap = {
    blue: styles.field_blue,
    purple: styles.field_purple,
    cyan: styles.field_cyan,
    emerald: styles.field_emerald,
    amber: styles.field_amber,
    rose: styles.field_rose,
    gray: styles.field_gray,
  };

  return (
    <div className={flowStyles.container}>
      {/* Header */}
      <div className={flowStyles.header}>
        <div className={flowStyles.headerTopRow}>
          <span className={flowStyles.titleBadge}>{standardBadge}</span>
          {totalSizeBytes && (
            <span className={styles.totalSizePill}>Total Frame: {totalSizeBytes}</span>
          )}
        </div>
        {title && <h3 className={flowStyles.title}>{title}</h3>}
        {subtitle && <p className={flowStyles.subtitle}>{subtitle}</p>}
      </div>

      {/* Frame Strip Viewport */}
      <div className={flowStyles.diagramScrollWrapper}>
        <div className={styles.frameScrollTrack}>
          <div className={styles.fieldsSequence}>
            {fields.map((field, idx) => {
              const isSelected = activeFieldIdx === idx;
              const isHovered = hoveredFieldIdx === idx;
              const isActive = isSelected || isHovered;
              const colorClass = colorMap[field.color] || styles.field_blue;

              return (
                <div
                  key={field.name || idx}
                  className={`${styles.fieldBlock} ${colorClass} ${isActive ? styles.fieldActive : ''}`}
                  style={{ flex: field.flex || 1, minWidth: field.minWidth || '105px' }}
                  onMouseEnter={() => setHoveredFieldIdx(idx)}
                  onMouseLeave={() => setHoveredFieldIdx(null)}
                  onClick={() => setActiveFieldIdx(idx)}
                >
                  <div className={styles.fieldTopRow}>
                    <span className={styles.fieldName}>{field.name}</span>
                    {field.layer && <span className={styles.layerMiniBadge}>{field.layer}</span>}
                  </div>

                  <div className={styles.fieldSizeBadge}>
                    {field.size} {field.unit || 'Bytes'}
                  </div>

                  {field.bitPattern && (
                    <div className={styles.bitPatternCode}>{field.bitPattern}</div>
                  )}

                  {field.sublabel && (
                    <div className={styles.fieldSublabel}>{field.sublabel}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Live Inspector */}
      <div className={flowStyles.inspectorStrip}>
        {currentField ? (
          <div
            className={`${flowStyles.inspectorContent} ${flowStyles[currentField.color + 'Inspector'] || flowStyles.cyanInspector}`}
          >
            <div className={flowStyles.inspectorHeader}>
              <div className={flowStyles.inspectorMeta}>
                <span className={flowStyles.inspectorBadge}>
                  {currentField.size} {currentField.unit || 'Bytes'}
                </span>
                {currentField.layer && (
                  <span className={styles.layerPill}>{currentField.layer} Sublayer</span>
                )}
                {currentField.bitPattern && (
                  <span className={styles.bitPatternPill}>{currentField.bitPattern}</span>
                )}
                <span className={flowStyles.inspectorTitle}>{currentField.name}</span>
              </div>
            </div>

            <p className={flowStyles.inspectorBody}>
              {currentField.description ||
                currentField.desc ||
                (typeof currentField.details === 'string' ? currentField.details : null) ||
                'Standard frame header field.'}
            </p>

            {Array.isArray(currentField.details) && currentField.details.length > 0 && (
              <div className={styles.detailsGrid}>
                {currentField.details.map((d, idx) => (
                  <div key={idx} className={styles.detailRow}>
                    <span className={styles.detailLabel}>{d.label || d.name || 'Property'}:</span>
                    <span className={styles.detailValue}>{d.value || d.desc || ''}</span>
                  </div>
                ))}
              </div>
            )}

            {currentField.technicalNote && (
              <div className={styles.technicalNoteRow}>
                <span className={styles.technicalPrefix}>Hardware Rule:</span>
                <span>{currentField.technicalNote}</span>
              </div>
            )}
          </div>
        ) : (
          <div className={flowStyles.inspectorPlaceholder}>
            <span className={flowStyles.inspectorHintIcon}>💡</span>
            <span className={flowStyles.inspectorHintText}>
              Click or hover any frame field above to inspect its byte structure, hardware purpose, and physical bit pattern.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
