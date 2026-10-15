import React, { useState, useMemo } from 'react';
import styles from './KMapDiagram.module.css';

/**
 * Color map for subcube groups
 */
const COLOR_MAP = {
  emerald: {
    badge: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.6)',
    glow: 'rgba(16, 185, 129, 0.35)',
    text: '#34d399',
  },
  blue: {
    badge: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.6)',
    glow: 'rgba(59, 130, 246, 0.35)',
    text: '#60a5fa',
  },
  purple: {
    badge: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.6)',
    glow: 'rgba(168, 85, 247, 0.35)',
    text: '#c084fc',
  },
  amber: {
    badge: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.6)',
    glow: 'rgba(245, 158, 11, 0.35)',
    text: '#fbbf24',
  },
  rose: {
    badge: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.15)',
    border: 'rgba(244, 63, 94, 0.6)',
    glow: 'rgba(244, 63, 94, 0.35)',
    text: '#fb7185',
  },
  cyan: {
    badge: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.6)',
    glow: 'rgba(6, 182, 212, 0.35)',
    text: '#22d3ee',
  },
};

/**
 * Grid geometries
 */
const GRAY_2 = ['0', '1'];
const GRAY_4 = ['00', '01', '11', '10'];

const ROW_OFFSET_4 = { '00': 0, '01': 4, '11': 12, '10': 8 };
const COL_OFFSET_4 = { '00': 0, '01': 1, '11': 3, '10': 2 };

export default function KMapDiagram({
  title,
  subtitle,
  numVariables = 4, // 2, 3, or 4
  variables = ['A', 'B', 'C', 'D'],
  variant = 'minimization', // 'minimization' or 'topology'
  mode = 'SOP', // 'SOP' or 'POS'
  minterms = [],
  maxterms = [],
  dontCares = [],
  groups = [], // array of { name: 'BD', type: 'EPI', cells: [5, 7, 13, 15], color: 'emerald', detail: '...' }
  expression = '',
}) {
  const isPOS = mode === 'POS' || (maxterms && maxterms.length > 0);
  const isTopology = variant === 'topology';

  // Normalize variable names
  const vars = useMemo(() => {
    if (numVariables === 2) return variables.slice(0, 2);
    if (numVariables === 3) return variables.slice(0, 3);
    return variables.slice(0, 4);
  }, [numVariables, variables]);

  // Compute total cells
  const totalCells = Math.pow(2, numVariables);

  // Cell values mapped from minterms/maxterms and dontCares
  const cellValues = useMemo(() => {
    const map = {};
    for (let i = 0; i < totalCells; i++) {
      if (isPOS) {
        if (maxterms.includes(i)) map[i] = 0;
        else if (dontCares.includes(i)) map[i] = 'd';
        else map[i] = 1;
      } else {
        if (minterms.includes(i)) map[i] = 1;
        else if (dontCares.includes(i)) map[i] = 'd';
        else map[i] = 0;
      }
    }
    return map;
  }, [totalCells, minterms, maxterms, dontCares, isPOS]);

  // Group lock & hover state (supports hover preview + single/double click/tap to lock)
  const [hoveredGroupIndex, setHoveredGroupIndex] = useState(null);
  const [pinnedGroupIndex, setPinnedGroupIndex] = useState(null);
  const [selectedTopologyCell, setSelectedTopologyCell] = useState(null);

  const activeGroupIndex = hoveredGroupIndex !== null ? hoveredGroupIndex : pinnedGroupIndex;
  const isPinned = pinnedGroupIndex !== null;

  const handleTogglePin = (idx) => {
    if (pinnedGroupIndex === idx) {
      setPinnedGroupIndex(null);
      setHoveredGroupIndex(null);
    } else {
      setPinnedGroupIndex(idx);
      setHoveredGroupIndex(idx);
    }
  };

  // Build grid layout metadata
  const gridStructure = useMemo(() => {
    if (numVariables === 2) {
      return {
        rowVars: vars[0],
        colVars: vars[1],
        rowVarList: [vars[0]],
        colVarList: [vars[1]],
        rows: GRAY_2,
        cols: GRAY_2,
        getCellIndex: (r, c) => parseInt(r, 2) * 2 + parseInt(c, 2),
      };
    }
    if (numVariables === 3) {
      return {
        rowVars: vars[0],
        colVars: `${vars[1]}${vars[2]}`,
        rowVarList: [vars[0]],
        colVarList: [vars[1], vars[2]],
        rows: GRAY_2,
        cols: GRAY_4,
        getCellIndex: (r, c) => (r === '1' ? 4 : 0) + COL_OFFSET_4[c],
      };
    }
    // 4 variables
    return {
      rowVars: `${vars[0]}${vars[1]}`,
      colVars: `${vars[2]}${vars[3]}`,
      rowVarList: [vars[0], vars[1]],
      colVarList: [vars[2], vars[3]],
      rows: GRAY_4,
      cols: GRAY_4,
      getCellIndex: (r, c) => ROW_OFFSET_4[r] + COL_OFFSET_4[c],
    };
  }, [numVariables, vars]);

  // Active highlighted cells from groups or selected topology cell
  const activeCells = useMemo(() => {
    if (isTopology) {
      return selectedTopologyCell !== null ? new Set([selectedTopologyCell]) : null;
    }
    if (activeGroupIndex === null || !groups[activeGroupIndex]) return null;
    return new Set(groups[activeGroupIndex].cells);
  }, [isTopology, selectedTopologyCell, activeGroupIndex, groups]);

  const activeGroup = activeGroupIndex !== null ? groups[activeGroupIndex] : null;

  // Active row and col codes for axis lighting
  const { activeRowCodes, activeColCodes } = useMemo(() => {
    const rowCodes = new Set();
    const colCodes = new Set();

    if (isTopology && selectedTopologyCell !== null) {
      gridStructure.rows.forEach((r) => {
        gridStructure.cols.forEach((c) => {
          if (gridStructure.getCellIndex(r, c) === selectedTopologyCell) {
            rowCodes.add(r);
            colCodes.add(c);
          }
        });
      });
      return { activeRowCodes: rowCodes, activeColCodes: colCodes };
    }

    if (!activeGroup) return { activeRowCodes: rowCodes, activeColCodes: colCodes };

    gridStructure.rows.forEach((r) => {
      gridStructure.cols.forEach((c) => {
        const idx = gridStructure.getCellIndex(r, c);
        if (activeGroup.cells.includes(idx)) {
          rowCodes.add(r);
          colCodes.add(c);
        }
      });
    });
    return { activeRowCodes: rowCodes, activeColCodes: colCodes };
  }, [isTopology, selectedTopologyCell, activeGroup, gridStructure]);

  // Helper to render variable literal representation
  const renderLiterals = (code, varList) => {
    return (
      <span className={styles.literalSeq}>
        {code.split('').map((bit, idx) => {
          const varName = varList[idx] || '';
          const isNegated = isPOS ? bit === '1' : bit === '0';
          return (
            <span
              key={idx}
              className={isNegated ? styles.varBar : styles.varNormal}
              title={`${varName}${isNegated ? ' (complemented)' : ' (uncomplemented)'}`}
            >
              {varName}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header bar */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>🗺️</span>
          <div>
            <h4 className={styles.title}>{title || `${numVariables}-Variable Karnaugh Map Visualizer`}</h4>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.modeBadge}>
            {numVariables}-Var {isPOS ? 'POS' : 'SOP'} Toroidal Grid
          </span>
        </div>
      </div>

      {/* Main interactive stage */}
      <div className={styles.stage}>
        {/* K-Map Table Wrapper */}
        <div className={styles.kmapScroll}>
          <table className={styles.kmapTable}>
            <thead>
              <tr>
                {/* Diagonal Axis Header */}
                <th className={styles.cornerHeader}>
                  <div className={styles.colVarLabel}>
                    <span>{gridStructure.colVars}</span>
                    <span className={styles.cornerArrow}> ➔</span>
                  </div>
                  <div className={styles.rowVarLabel}>
                    <span className={styles.cornerArrow}>⬇ </span>
                    <span>{gridStructure.rowVars}</span>
                  </div>
                </th>
                {gridStructure.cols.map((colCode) => {
                  const isColActive = activeColCodes.has(colCode);
                  const activeColorTheme = activeGroup
                    ? COLOR_MAP[activeGroup.color] || COLOR_MAP.emerald
                    : null;

                  return (
                    <th
                      key={colCode}
                      className={`${styles.colHeader} ${isColActive ? styles.colHeaderActive : ''}`}
                      style={
                        isColActive && activeColorTheme
                          ? {
                              borderColor: activeColorTheme.border,
                              backgroundColor: activeColorTheme.bg,
                              boxShadow: `0 0 10px ${activeColorTheme.glow}`,
                            }
                          : {}
                      }
                    >
                      <div className={styles.headerStack}>
                        <span className={styles.codeMono}>{colCode}</span>
                        <span
                          className={styles.literalSub}
                          style={isColActive && activeColorTheme ? { color: activeColorTheme.text } : {}}
                        >
                          {renderLiterals(colCode, gridStructure.colVarList)}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {gridStructure.rows.map((rowCode) => {
                const isRowActive = activeRowCodes.has(rowCode);
                const activeColorTheme = activeGroup
                  ? COLOR_MAP[activeGroup.color] || COLOR_MAP.emerald
                  : null;

                return (
                  <tr key={rowCode}>
                    <th
                      className={`${styles.rowHeader} ${isRowActive ? styles.rowHeaderActive : ''}`}
                      style={
                        isRowActive && activeColorTheme
                          ? {
                              borderColor: activeColorTheme.border,
                              backgroundColor: activeColorTheme.bg,
                              boxShadow: `0 0 10px ${activeColorTheme.glow}`,
                            }
                          : {}
                      }
                    >
                      <div className={styles.headerStack}>
                        <span className={styles.codeMono}>{rowCode}</span>
                        <span
                          className={styles.literalSub}
                          style={isRowActive && activeColorTheme ? { color: activeColorTheme.text } : {}}
                        >
                          {renderLiterals(rowCode, gridStructure.rowVarList)}
                        </span>
                      </div>
                    </th>
                    {gridStructure.cols.map((colCode) => {
                      const cellIdx = gridStructure.getCellIndex(rowCode, colCode);
                      const val = cellValues[cellIdx];
                      const isCellActive = activeCells && activeCells.has(cellIdx);
                      const isSelectedCell = isTopology && selectedTopologyCell === cellIdx;
                      const cellGroups = groups.filter((g) => g.cells.includes(cellIdx));
                      const isTargetVal = isPOS ? val === 0 : val === 1;

                      return (
                        <td
                          key={cellIdx}
                          className={`${styles.cell} ${isTopology ? styles.topologyCell : ''} ${
                            isTargetVal && !isTopology ? styles.cellHigh : ''
                          } ${val === 'd' && !isTopology ? styles.cellDontCare : ''} ${
                            isCellActive || isSelectedCell ? styles.cellActiveGroup : ''
                          }`}
                          onClick={() => {
                            if (isTopology) {
                              setSelectedTopologyCell(selectedTopologyCell === cellIdx ? null : cellIdx);
                            }
                          }}
                          style={
                            (isCellActive || isSelectedCell) && (activeColorTheme || isTopology)
                              ? {
                                  borderColor: activeColorTheme?.border || '#38bdf8',
                                  backgroundColor: activeColorTheme?.bg || 'rgba(56, 189, 248, 0.15)',
                                  boxShadow: `0 0 12px ${activeColorTheme?.glow || 'rgba(56, 189, 248, 0.4)'}`,
                                }
                              : {}
                          }
                          title={`Minterm m${cellIdx} (${rowCode}${colCode})`}
                        >
                          {isTopology ? (
                            <div className={styles.topologyCellContent}>
                              <span className={styles.topologyMinterm}>m{cellIdx}</span>
                              <span className={styles.topologyBinary}>({rowCode}{colCode})</span>
                            </div>
                          ) : (
                            <>
                              {/* Decimal index badge */}
                              <span className={styles.subIndex}>{isPOS ? `M${cellIdx}` : `m${cellIdx}`}</span>

                              {/* Cell Value */}
                              <span
                                className={`${styles.cellValue} ${
                                  val === 1 ? styles.valOne : val === 'd' ? styles.valD : styles.valZero
                                }`}
                              >
                                {val}
                              </span>

                              {/* Group indicators dots on bottom */}
                              <div className={styles.groupDots}>
                                {cellGroups.map((g, idx) => {
                                  const cTheme = COLOR_MAP[g.color] || COLOR_MAP.emerald;
                                  return (
                                    <span
                                      key={idx}
                                      className={styles.dot}
                                      style={{ backgroundColor: cTheme.badge }}
                                      title={`Group ${g.name}`}
                                    />
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Group Inspector Strip */}
        {groups.length > 0 && !isTopology && (
          <div className={styles.groupInspector}>
            <div className={styles.groupInspectorTitle}>
              <span>Subcube Groups & Prime Implicants</span>
              <span className={styles.groupHint}>Hover or tap to inspect group coverage</span>
            </div>
            <div className={styles.groupPills}>
              {groups.map((group, idx) => {
                const cTheme = COLOR_MAP[group.color] || COLOR_MAP.emerald;
                const isSelected = activeGroupIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.groupPill} ${isSelected ? styles.groupPillActive : ''}`}
                    style={{
                      borderColor: isSelected ? cTheme.border : 'var(--diagram-border, #334155)',
                      backgroundColor: isSelected ? cTheme.bg : 'var(--diagram-surface, #1e293b)',
                    }}
                    onMouseEnter={() => setHoveredGroupIndex(idx)}
                    onMouseLeave={() => setHoveredGroupIndex(null)}
                    onClick={() => handleTogglePin(idx)}
                    title={`Group ${group.name} (${group.type || 'PI'})`}
                  >
                    <span className={styles.pillBadge} style={{ backgroundColor: cTheme.badge }}>
                      {group.type || 'PI'}
                    </span>
                    <span className={styles.pillName} style={{ color: cTheme.text }}>
                      {group.name}
                    </span>
                    <span className={styles.pillCells}>
                      [{group.cells.map((c) => (isPOS ? `M${c}` : `m${c}`)).join(', ')}]
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Group Details Bar */}
            {activeGroup && (
              <div className={styles.groupDetailCard}>
                <span className={styles.detailIcon}>🔍</span>
                <span className={styles.detailText}>
                  <strong>{activeGroup.name} ({activeGroup.type}):</strong> covers{' '}
                  {activeGroup.cells.length} cells [{activeGroup.cells.map((c) => (isPOS ? `M${c}` : `m${c}`)).join(', ')}].{' '}
                  {activeGroup.detail || ''}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Topology Cell Inspector */}
        {isTopology && (
          <div className={styles.groupInspector}>
            <div className={styles.groupInspectorTitle}>
              <span>Coordinate & Cell Addressing Inspector</span>
              <span className={styles.groupHint}>Click or tap any cell to inspect its binary coordinate</span>
            </div>
            {selectedTopologyCell !== null ? (
              <div className={styles.groupDetailCard}>
                <span className={styles.detailIcon}>📍</span>
                <span className={styles.detailText}>
                  <strong>Cell m{selectedTopologyCell}:</strong> Row{' '}
                  <strong>{gridStructure.rowVars}</strong> and Column{' '}
                  <strong>{gridStructure.colVars}</strong> are highlighted on axes.
                </span>
              </div>
            ) : (
              <div className={styles.topologyHintBar}>
                💡 Notice how column 3 (`11`) and column 4 (`10`) swap to preserve Gray code Hamming distance = 1.
              </div>
            )}
          </div>
        )}

        {/* Final Minimized Expression Box */}
        {expression && !isTopology && (
          <div className={styles.expressionBox}>
            <span className={styles.expressionLabel}>Minimized Boolean Expression:</span>
            <code className={styles.expressionCode}>F = {expression}</code>
          </div>
        )}
      </div>
    </div>
  );
}
