import React, { useState } from 'react';
import flowStyles from './FlowDiagram.module.css';
import styles from './PacketHeaderGrid.module.css';

/**
 * PacketHeaderGrid
 * High-fidelity 32-bit Word Grid for Network Packet & Datagram Headers (IPv4, IPv6, TCP, UDP).
 * Replicates standard textbook packet figures with proportional bit fields,
 * 32-bit alignment bit ruler, whole-packet payload visualization, and unconstrained live hardware inspector.
 */
export default function PacketHeaderGrid({
  title = "Packet Header Architecture",
  subtitle = "Interactive 32-bit word grid with proportional bit fields and hardware inspector",
  standardBadge = "Network Layer Protocol",
  totalSizeBytes = "20 to 60 Bytes",
  bitsPerRow = 32,
  showBitRuler = true,
  rows = [],
  payload = null,
  defaultActiveField = null,
}) {
  // Flatten all fields to support active indexing
  const allFields = [];
  rows.forEach((row, rIdx) => {
    const rowFields = Array.isArray(row) ? row : row.fields || [];
    rowFields.forEach((f, fIdx) => {
      allFields.push({
        ...f,
        _id: f.id || `${rIdx}-${fIdx}`,
        _rowIdx: rIdx,
      });
    });
  });

  if (payload) {
    allFields.push({
      ...payload,
      _id: 'payload-block',
      isPayload: true,
      color: payload.color || 'indigo',
    });
  }

  const [activeFieldId, setActiveFieldId] = useState(
    defaultActiveField || (allFields.length > 0 ? allFields[0]._id : null)
  );
  const [hoveredFieldId, setHoveredFieldId] = useState(null);

  const selectedField =
    allFields.find((f) => f._id === (hoveredFieldId || activeFieldId)) || allFields[0];

  const colorMap = {
    blue: styles.field_blue,
    purple: styles.field_purple,
    cyan: styles.field_cyan,
    emerald: styles.field_emerald,
    amber: styles.field_amber,
    rose: styles.field_rose,
    gray: styles.field_gray,
    indigo: styles.field_indigo,
  };

  return (
    <div className={flowStyles.container}>
      {/* Header */}
      <div className={flowStyles.header}>
        <div className={flowStyles.headerTopRow}>
          <span className={flowStyles.titleBadge}>{standardBadge}</span>
          {totalSizeBytes && (
            <span className={styles.totalSizePill}>Total Packet: {totalSizeBytes}</span>
          )}
        </div>
        {title && <h3 className={flowStyles.title}>{title}</h3>}
        {subtitle && <p className={flowStyles.subtitle}>{subtitle}</p>}
      </div>

      {/* Grid Viewport */}
      <div className={styles.gridScrollTrack}>
        <div className={styles.gridContent}>
          {/* 32-Bit Bit Ruler (0 to 31) */}
          {showBitRuler && (
            <div className={styles.bitRulerRow}>
              <div className={styles.rulerLabelSpacer} />
              <div className={styles.rulerTrack}>
                <div className={styles.rulerByteRow}>
                  <span className={styles.byteIndicator}>Byte 0 (Bits 0–7)</span>
                  <span className={styles.byteIndicator}>Byte 1 (Bits 8–15)</span>
                  <span className={styles.byteIndicator}>Byte 2 (Bits 16–23)</span>
                  <span className={styles.byteIndicator}>Byte 3 (Bits 24–31)</span>
                </div>
                <div className={styles.rulerTickRow}>
                  <span>0</span>
                  <span>4</span>
                  <span>8</span>
                  <span>12</span>
                  <span>16</span>
                  <span>20</span>
                  <span>24</span>
                  <span>28</span>
                  <span>31</span>
                </div>
              </div>
            </div>
          )}

          {/* Word Rows */}
          {rows.map((row, rIdx) => {
            const rowFields = Array.isArray(row) ? row : row.fields || [];
            const rowLabel = row.label || `Word ${rIdx}`;
            const rowOffset = row.offset || `Bytes ${rIdx * 4}–${rIdx * 4 + 3}`;

            return (
              <div key={rIdx} className={styles.wordRow}>
                <div className={styles.rowLabel}>
                  <span>{rowLabel}</span>
                  <span className={styles.rowOffset}>{rowOffset}</span>
                </div>

                <div className={styles.rowFieldsTrack}>
                  {rowFields.map((field, fIdx) => {
                    const fieldId = field.id || `${rIdx}-${fIdx}`;
                    const isSelected = activeFieldId === fieldId;
                    const isHovered = hoveredFieldId === fieldId;
                    const isActive = isSelected || isHovered;
                    const colorClass = colorMap[field.color] || styles.field_blue;
                    const bits = field.bits || 8;
                    const showPatternInCell = bits >= 8 && field.bitPattern;

                    return (
                      <div
                        key={fieldId}
                        className={`${styles.fieldCell} ${colorClass} ${
                          isActive ? styles.fieldActive : ''
                        }`}
                        style={{
                          flex: bits,
                          flexBasis: `${(bits / bitsPerRow) * 100}%`,
                        }}
                        onMouseEnter={() => setHoveredFieldId(fieldId)}
                        onMouseLeave={() => setHoveredFieldId(null)}
                        onClick={() => setActiveFieldId(fieldId)}
                      >
                        <div className={styles.fieldTopLine}>
                          <span className={styles.fieldName} title={field.name}>
                            {field.name}
                          </span>
                          <span className={styles.fieldBitsBadge}>
                            {field.bits ? `${field.bits}b` : ''}
                          </span>
                        </div>

                        <div className={styles.fieldBottomLine}>
                          {field.bitRange && (
                            <span className={styles.fieldBitRange}>
                              [{field.bitRange}]
                            </span>
                          )}
                          {showPatternInCell && (
                            <span className={styles.fieldBitPattern}>
                              {field.bitPattern}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Whole Packet View: Connected Data Payload */}
          {payload && (
            <>
              <div className={styles.payloadDivider}>
                <div className={styles.payloadDividerLine} />
                <span className={styles.payloadDividerText}>
                  Whole Packet Encapsulation
                </span>
                <div className={styles.payloadDividerLine} />
              </div>

              <div
                className={`${styles.payloadBlock} ${
                  hoveredFieldId === 'payload-block' ||
                  activeFieldId === 'payload-block'
                    ? styles.payloadActive
                    : ''
                }`}
                onMouseEnter={() => setHoveredFieldId('payload-block')}
                onMouseLeave={() => setHoveredFieldId(null)}
                onClick={() => setActiveFieldId('payload-block')}
              >
                <div className={styles.payloadLeft}>
                  <span className={styles.payloadIcon}>📦</span>
                  <div className={styles.payloadTitleCol}>
                    <span className={styles.payloadTitle}>
                      {payload.title || 'Data Payload (Transport Layer Segment)'}
                    </span>
                    <span className={styles.payloadSubtitle}>
                      {payload.subtitle ||
                        'Encapsulates TCP Segment / UDP Datagram / ICMP Message'}
                    </span>
                  </div>
                </div>

                <div className={styles.payloadRight}>
                  <span>{payload.size || 'Variable Length (up to 65,515 Bytes)'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Live Inspector (Unconstrained Height: Zero Text Clipping) */}
      <div className={styles.inspectorStrip}>
        {selectedField ? (
          <div
            className={`${styles.inspectorContent} ${
              flowStyles[selectedField.color + 'Inspector'] || ''
            }`}
          >
            <div className={styles.inspectorHeader}>
              <span className={styles.inspectorBitTag}>
                {selectedField.bits
                  ? `${selectedField.bits} Bits`
                  : selectedField.size || 'Variable'}
              </span>
              {selectedField.bitRange && (
                <span className={styles.inspectorBitTag}>
                  Bits [{selectedField.bitRange}]
                </span>
              )}
              {selectedField.bitPattern && (
                <span className={styles.inspectorPatternTag}>
                  Pattern: {selectedField.bitPattern}
                </span>
              )}
              <span className={styles.inspectorTitle}>
                {selectedField.name || selectedField.title}
              </span>
            </div>

            <p className={styles.inspectorBody}>
              {selectedField.description ||
                selectedField.desc ||
                (typeof selectedField.details === 'string' ? selectedField.details : null) ||
                'Packet header field.'}
            </p>

            {Array.isArray(selectedField.details) && selectedField.details.length > 0 && (
              <div className={styles.detailsGrid}>
                {selectedField.details.map((d, idx) => (
                  <div key={idx} className={styles.detailRow}>
                    <span className={styles.detailLabel}>{d.label || d.name || 'Property'}:</span>
                    <span className={styles.detailValue}>{d.value || d.desc || ''}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedField.technicalNote && (
              <div className={styles.technicalNoteRow}>
                <span className={styles.technicalPrefix}>Hardware Rule:</span>
                <span>{selectedField.technicalNote}</span>
              </div>
            )}
          </div>
        ) : (
          <div className={flowStyles.inspectorPlaceholder}>
            <span className={flowStyles.inspectorHintIcon}>💡</span>
            <span className={flowStyles.inspectorHintText}>
              Click or hover any 32-bit field or the data payload above to inspect its bit structure, hardware purpose, and RFC scaling factors.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
