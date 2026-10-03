import React, { useState, useMemo, useCallback } from 'react';
import styles from './FlowGraph.module.css';

/**
 * FlowGraph: Universal, Generic Educational Flow & Architecture Visualizer for Binary Dose.
 * Designed for ANY subject (OS, DBMS, Networks, Data Structures, System Design, etc.).
 *
 * Capabilities:
 * - Linear pipelines, branching flows, circular state machines, and multi-domain tier architectures.
 * - Automatic reciprocal edge separation: Opposing edges (A -> B and B -> A) automatically curve in
 *   opposite directions with labels at opposite apexes, making overlaps mathematically impossible.
 * - Bidirectional edge support (direction: "bi"): Dual arrowheads (<──────>) for doubly-linked lists.
 * - Dynamic 100% relative container layout: Supports percentage coordinates (x: "20%", y: "40%")
 *   and automatic domain column/lane distribution.
 * - Interactive step player: [◀ Prev] and [Next ▶] stepper with active edge/node glow.
 * - Responsive dual-mode: 📱 Step-by-Step Flow on mobile (360px-768px) and 🗺️ Architecture Map on desktop.
 */

const COLOR_MAP = {
  blue: {
    stroke: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.45)',
    fill: 'rgba(59, 130, 246, 0.08)',
    text: '#93c5fd',
    badgeBg: 'rgba(59, 130, 246, 0.2)',
    badgeBorder: 'rgba(59, 130, 246, 0.4)',
    arrow: '#3b82f6',
  },
  emerald: {
    stroke: '#10b981',
    border: 'rgba(16, 185, 129, 0.45)',
    fill: 'rgba(16, 185, 129, 0.08)',
    text: '#6ee7b7',
    badgeBg: 'rgba(16, 185, 129, 0.2)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    arrow: '#10b981',
  },
  purple: {
    stroke: '#a855f7',
    border: 'rgba(168, 85, 247, 0.45)',
    fill: 'rgba(168, 85, 247, 0.08)',
    text: '#d8b4fe',
    badgeBg: 'rgba(168, 85, 247, 0.2)',
    badgeBorder: 'rgba(168, 85, 247, 0.4)',
    arrow: '#a855f7',
  },
  amber: {
    stroke: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.45)',
    fill: 'rgba(245, 158, 11, 0.08)',
    text: '#fcd34d',
    badgeBg: 'rgba(245, 158, 11, 0.2)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    arrow: '#f59e0b',
  },
  rose: {
    stroke: '#f43f5e',
    border: 'rgba(244, 63, 94, 0.45)',
    fill: 'rgba(244, 63, 94, 0.08)',
    text: '#fda4af',
    badgeBg: 'rgba(244, 63, 94, 0.2)',
    badgeBorder: 'rgba(244, 63, 94, 0.4)',
    arrow: '#f43f5e',
  },
  cyan: {
    stroke: '#06b6d4',
    border: 'rgba(6, 182, 212, 0.45)',
    fill: 'rgba(6, 182, 212, 0.08)',
    text: '#67e8f9',
    badgeBg: 'rgba(6, 182, 212, 0.2)',
    badgeBorder: 'rgba(6, 182, 212, 0.4)',
    arrow: '#06b6d4',
  },
  slate: {
    stroke: '#64748b',
    border: 'rgba(100, 116, 139, 0.4)',
    fill: 'rgba(100, 116, 139, 0.08)',
    text: '#cbd5e1',
    badgeBg: 'rgba(100, 116, 139, 0.2)',
    badgeBorder: 'rgba(100, 116, 139, 0.4)',
    arrow: '#94a3b8',
  },
  default: {
    stroke: '#64748b',
    border: 'rgba(148, 163, 184, 0.3)',
    fill: 'rgba(30, 41, 59, 0.7)',
    text: '#e2e8f0',
    badgeBg: 'rgba(51, 65, 85, 0.6)',
    badgeBorder: 'rgba(100, 116, 139, 0.4)',
    arrow: '#94a3b8',
  },
};

// Helper: parse relative percentage or pixel number
function parseCoord(val, total) {
  if (typeof val === 'string' && val.endsWith('%')) {
    return (parseFloat(val) / 100) * total;
  }
  return typeof val === 'number' ? val : 0;
}

export default function FlowGraph({
  title,
  subtitle,
  width = 960,
  height = 380,
  domains = [],
  groups = [],
  nodes = [],
  edges = [],
  legend = [],
}) {
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mobileViewMode, setMobileViewMode] = useState('steps'); // 'steps' | 'map'

  // Sort edges by step number for chronological stepping
  const sortedEdges = useMemo(() => {
    return [...edges].sort((a, b) => {
      const stepA = parseFloat(a.step) || 999;
      const stepB = parseFloat(b.step) || 999;
      return stepA - stepB;
    });
  }, [edges]);

  // Step control handlers
  const handlePrevStep = useCallback(() => {
    if (sortedEdges.length === 0) return;
    setActiveNodeId(null);
    if (activeStepIndex === null || activeStepIndex <= 0) {
      setActiveStepIndex(sortedEdges.length - 1);
    } else {
      setActiveStepIndex(activeStepIndex - 1);
    }
  }, [activeStepIndex, sortedEdges]);

  const handleNextStep = useCallback(() => {
    if (sortedEdges.length === 0) return;
    setActiveNodeId(null);
    if (activeStepIndex === null || activeStepIndex >= sortedEdges.length - 1) {
      setActiveStepIndex(0);
    } else {
      setActiveStepIndex(activeStepIndex + 1);
    }
  }, [activeStepIndex, sortedEdges]);

  // 1. Process Domains & Groups with Relative/Dynamic Coordinates
  const processedDomains = useMemo(() => {
    const rawList = [...domains, ...groups];
    if (rawList.length === 0) return [];

    const hasExplicitCoords = rawList.some((d) => d.x !== undefined || d.y !== undefined);

    if (hasExplicitCoords) {
      return rawList.map((d) => ({
        ...d,
        x: parseCoord(d.x, width),
        y: parseCoord(d.y, height),
        width: parseCoord(d.width, width),
        height: parseCoord(d.height, height),
      }));
    }

    // Auto-distribute domains horizontally across available width
    const domMarginX = 18;
    const domCount = rawList.length;
    const totalAvailW = width - domMarginX * 2 - (domCount - 1) * 16;
    const domWidth = totalAvailW / domCount;
    const domHeight = height - 36;

    return rawList.map((d, idx) => ({
      ...d,
      x: domMarginX + idx * (domWidth + 16),
      y: 18,
      width: domWidth,
      height: domHeight,
    }));
  }, [domains, groups, width, height]);

  // 2. Process Nodes with Dynamic Slot Calculation & Relative Percentages
  const processedNodes = useMemo(() => {
    const allRawNodes = [...nodes];
    processedDomains.forEach((d) => {
      if (Array.isArray(d.nodes)) {
        d.nodes.forEach((dn) => {
          allRawNodes.push({ ...dn, domain: d.id });
        });
      }
    });

    const domainNodesMap = {};
    allRawNodes.forEach((n) => {
      const domId = n.domain || 'default';
      if (!domainNodesMap[domId]) domainNodesMap[domId] = [];
      domainNodesMap[domId].push(n);
    });

    const resultMap = {};

    processedDomains.forEach((dom) => {
      const dNodes = domainNodesMap[dom.id] || [];
      if (dNodes.length === 0) return;

      const needsAutoSlot = dNodes.some((n) => n.x === undefined && n.y === undefined);

      if (needsAutoSlot) {
        // Auto-distribute inside domain vertically or horizontally
        const isWideDomain = dom.width > dom.height * 1.4;
        const count = dNodes.length;

        if (isWideDomain) {
          // Horizontal row of nodes
          const padX = 20;
          const slotW = (dom.width - padX * 2) / count;
          const centerY = dom.y + dom.height / 2;

          dNodes.forEach((n, idx) => {
            const w = n.width || Math.min(145, slotW - 24);
            const h = n.height || 74;
            const x = dom.x + padX + (idx + 0.5) * slotW;
            resultMap[n.id] = { ...n, x, y: centerY, w, h };
          });
        } else {
          // Vertical column of nodes
          const padY = 32;
          const slotH = (dom.height - padY * 2) / count;
          const centerX = dom.x + dom.width / 2;

          dNodes.forEach((n, idx) => {
            const w = n.width || Math.min(150, dom.width - 32);
            const h = n.height || 74;
            const y = dom.y + padY + (idx + 0.5) * slotH;
            resultMap[n.id] = { ...n, x: centerX, y, w, h };
          });
        }
      } else {
        dNodes.forEach((n) => {
          const w = n.width || 145;
          const h = n.height || 74;
          resultMap[n.id] = {
            ...n,
            x: parseCoord(n.x, width),
            y: parseCoord(n.y, height),
            w,
            h,
          };
        });
      }
    });

    // Top-level unattached nodes
    allRawNodes.forEach((n) => {
      if (!resultMap[n.id]) {
        const w = n.width || 145;
        const h = n.height || 74;
        resultMap[n.id] = {
          ...n,
          x: parseCoord(n.x, width),
          y: parseCoord(n.y, height),
          w,
          h,
        };
      }
    });

    // Handle alignWith references
    Object.values(resultMap).forEach((n) => {
      if (n.alignWith && resultMap[n.alignWith]) {
        n.x = resultMap[n.alignWith].x;
      }
    });

    return resultMap;
  }, [nodes, processedDomains, width, height]);

  const nodeList = useMemo(() => Object.values(processedNodes), [processedNodes]);

  // 3. Dynamic Bounding Box (Guarantees zero canvas clipping)
  const bounds = useMemo(() => {
    let minX = 0;
    let minY = 0;
    let maxX = width;
    let maxY = height;

    nodeList.forEach((n) => {
      const hw = n.w / 2;
      const hh = n.h / 2;
      if (n.x - hw - 20 < minX) minX = n.x - hw - 20;
      if (n.y - hh - 20 < minY) minY = n.y - hh - 20;
      if (n.x + hw + 20 > maxX) maxX = n.x + hw + 20;
      if (n.y + hh + 20 > maxY) maxY = n.y + hh + 20;
    });

    processedDomains.forEach((d) => {
      if (d.x - 14 < minX) minX = d.x - 14;
      if (d.y - 14 < minY) minY = d.y - 14;
      if (d.x + d.width + 14 > maxX) maxX = d.x + d.width + 14;
      if (d.y + d.height + 14 > maxY) maxY = d.y + d.height + 14;
    });

    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
    };
  }, [nodeList, processedDomains, width, height]);

  // Port calculation helper: smart directional detection
  const getPortCoord = (fromNode, toNode, explicitPort, portOffset = 0) => {
    const hw = fromNode.w / 2;
    const hh = fromNode.h / 2;

    if (explicitPort === 'top') return { x: fromNode.x + portOffset, y: fromNode.y - hh };
    if (explicitPort === 'bottom') return { x: fromNode.x + portOffset, y: fromNode.y + hh };
    if (explicitPort === 'left') return { x: fromNode.x - hw, y: fromNode.y + portOffset };
    if (explicitPort === 'right') return { x: fromNode.x + hw, y: fromNode.y + portOffset };

    if (explicitPort === 'top-left') return { x: fromNode.x - hw * 0.65 + portOffset, y: fromNode.y - hh };
    if (explicitPort === 'top-right') return { x: fromNode.x + hw * 0.65 + portOffset, y: fromNode.y - hh };
    if (explicitPort === 'bottom-left') return { x: fromNode.x - hw * 0.65 + portOffset, y: fromNode.y + hh };
    if (explicitPort === 'bottom-right') return { x: fromNode.x + hw * 0.65 + portOffset, y: fromNode.y + hh };

    // Auto-calculate port based on relative vector
    const dx = toNode ? toNode.x - fromNode.x : 0;
    const dy = toNode ? toNode.y - fromNode.y : 0;

    if (Math.abs(dx) >= Math.abs(dy)) {
      return dx > 0 ? { x: fromNode.x + hw, y: fromNode.y } : { x: fromNode.x - hw, y: fromNode.y };
    }
    return dy > 0 ? { x: fromNode.x, y: fromNode.y + hh } : { x: fromNode.x, y: fromNode.y - hh };
  };

  // 4. Index reciprocal edges to guarantee zero label collisions
  const edgePairMap = useMemo(() => {
    const map = {};
    edges.forEach((e, idx) => {
      const key = `${e.from}__${e.to}`;
      const revKey = `${e.to}__${e.from}`;
      if (!map[key]) map[key] = [];
      map[key].push({ ...e, originalIndex: idx });

      // Check if there's a reverse edge
      if (revKey in map) {
        // Tag both as reciprocal
        map[key].hasReciprocal = true;
        map[revKey].hasReciprocal = true;
      }
    });
    return map;
  }, [edges]);

  // Current active details object for console
  const activeDetails = useMemo(() => {
    if (activeStepIndex !== null && sortedEdges[activeStepIndex]) {
      const e = sortedEdges[activeStepIndex];
      const fromN = processedNodes[e.from];
      const toN = processedNodes[e.to];
      return {
        type: 'step',
        step: e.step,
        title: e.label || `Transition`,
        from: fromN?.label || e.from,
        to: toN?.label || e.to,
        description: e.detail || e.details || `Execution advances from ${fromN?.label || e.from} to ${toN?.label || e.to}.`,
      };
    }
    if (activeNodeId && processedNodes[activeNodeId]) {
      const n = processedNodes[activeNodeId];
      return {
        type: 'node',
        title: n.label,
        badge: n.badge,
        description: n.details || n.desc || n.sublabel || `System entity registered in ${n.domain || 'active domain'}.`,
      };
    }
    return null;
  }, [activeStepIndex, activeNodeId, sortedEdges, processedNodes]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* View Toggle on Mobile */}
        <div className={styles.mobileToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${mobileViewMode === 'steps' ? styles.toggleActive : ''}`}
            onClick={() => setMobileViewMode('steps')}
          >
            📱 Steps
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${mobileViewMode === 'map' ? styles.toggleActive : ''}`}
            onClick={() => setMobileViewMode('map')}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. MOBILE STEP-BY-STEP VERTICAL FLOW (Optimized for Phones)     */}
      {/* ============================================================== */}
      <div
        className={`${styles.mobileStepContainer} ${
          mobileViewMode === 'steps' ? styles.showOnMobile : styles.hideOnMobile
        }`}
      >
        <div className={styles.stepList}>
          {sortedEdges.map((edge, idx) => {
            const fromNode = processedNodes[edge.from];
            const toNode = processedNodes[edge.to];
            const edgeCol = COLOR_MAP[edge.variant || edge.color] || COLOR_MAP.default;
            const isCurrent = activeStepIndex === idx;

            return (
              <div
                key={`mobile-step-${idx}`}
                className={`${styles.stepCard} ${isCurrent ? styles.stepCardActive : ''}`}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setActiveNodeId(null);
                }}
              >
                <div className={styles.stepTopRow}>
                  {edge.step && (
                    <span
                      className={styles.stepNumberBadge}
                      style={{ backgroundColor: edgeCol.stroke }}
                    >
                      {edge.step}
                    </span>
                  )}
                  <span className={styles.stepActionLabel} style={{ color: edgeCol.text }}>
                    {edge.label}
                  </span>
                </div>

                <div className={styles.stepNodeFlow}>
                  <span className={styles.stepFromBadge}>{fromNode?.label || edge.from}</span>
                  <span className={styles.stepArrow} style={{ color: edgeCol.stroke }}>
                    {edge.direction === 'bi' ? '⇄' : '→'}
                  </span>
                  <span className={styles.stepToBadge}>{toNode?.label || edge.to}</span>
                </div>

                {(edge.detail || edge.details) && (
                  <p className={styles.stepDetailText}>{edge.detail || edge.details}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. 2D ARCHITECTURE SVG CANVAS (Desktop & Map Mode)             */}
      {/* ============================================================== */}
      <div
        className={`${styles.canvasContainer} ${
          mobileViewMode === 'map' ? styles.showOnMobile : styles.hideOnMobile
        }`}
      >
        <svg
          viewBox={`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`}
          className={styles.svgCanvas}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="blueprint-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="rgba(148, 163, 184, 0.12)" />
            </pattern>

            {/* Reusable Arrow Markers */}
            {Object.entries(COLOR_MAP).map(([key, col]) => (
              <React.Fragment key={key}>
                <marker
                  id={`fg-arrow-end-${key}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 1 2 L 9 5 L 1 8 z" fill={col.arrow} />
                </marker>
                <marker
                  id={`fg-arrow-start-${key}`}
                  viewBox="0 0 10 10"
                  refX="2"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 9 2 L 1 5 L 9 8 z" fill={col.arrow} />
                </marker>
              </React.Fragment>
            ))}
          </defs>

          {/* Grid Background */}
          <rect
            x={bounds.x}
            y={bounds.y}
            width={bounds.w}
            height={bounds.h}
            rx="12"
            fill="url(#blueprint-dots)"
          />

          {/* Domains / Zones */}
          {processedDomains.map((g) => {
            const gCol = COLOR_MAP[g.variant || g.color] || COLOR_MAP.slate;
            return (
              <g key={g.id} className={styles.groupZone}>
                <rect
                  x={g.x}
                  y={g.y}
                  width={g.width}
                  height={g.height}
                  rx="14"
                  fill={gCol.fill}
                  stroke={gCol.border}
                  strokeWidth="1.2"
                  strokeDasharray={g.dashed ? '6 4' : undefined}
                />
                {(g.title || g.label) && (
                  <text
                    x={g.x + 16}
                    y={g.y + 24}
                    className={styles.groupLabel}
                    fill={gCol.text}
                  >
                    {g.title || g.label}
                  </text>
                )}
                {g.subtitle && (
                  <text
                    x={g.x + 16}
                    y={g.y + 39}
                    className={styles.groupSublabel}
                    fill="rgba(148, 163, 184, 0.65)"
                  >
                    {g.subtitle}
                  </text>
                )}
              </g>
            );
          })}

          {/* Edges / Connections with Collision-Free Geometry */}
          {edges.map((edge, idx) => {
            const fromNode = processedNodes[edge.from];
            const toNode = processedNodes[edge.to];
            if (!fromNode || !toNode) return null;

            const edgeCol = COLOR_MAP[edge.variant || edge.color] || COLOR_MAP.default;
            const markerKey = edge.variant || edge.color || 'default';

            // Check if there is an opposing reciprocal edge
            const revKey = `${edge.to}__${edge.from}`;
            const hasReciprocal = revKey in edgePairMap;
            const isReverseEdge = edge.from > edge.to; // Arbitrary stable tie-breaker

            // Compute Ports
            let explicitFromPort = edge.fromPort;
            let explicitToPort = edge.toPort;

            // Automatic opposing arc assignment if ports weren't manually locked
            if (hasReciprocal && !explicitFromPort && !explicitToPort) {
              const isHorizontal = Math.abs(toNode.x - fromNode.x) > Math.abs(toNode.y - fromNode.y);
              if (isHorizontal) {
                if (!isReverseEdge) {
                  explicitFromPort = 'top-right';
                  explicitToPort = 'top-left';
                } else {
                  explicitFromPort = 'bottom-left';
                  explicitToPort = 'bottom-right';
                }
              } else {
                if (!isReverseEdge) {
                  explicitFromPort = 'bottom-left';
                  explicitToPort = 'top-left';
                } else {
                  explicitFromPort = 'top-right';
                  explicitToPort = 'bottom-right';
                }
              }
            }

            const start = getPortCoord(fromNode, toNode, explicitFromPort, edge.fromPortOffset || 0);
            const end = getPortCoord(toNode, fromNode, explicitToPort, edge.toPortOffset || 0);

            // Curve calculations
            let curve = edge.curve || (hasReciprocal ? (isReverseEdge ? 'arc-down' : 'arc-up') : 'straight');
            const offY = edge.offsetY || 0;
            const offX = edge.offsetX || 0;

            let pathD = '';
            let labelX = (start.x + end.x) / 2;
            let labelY = (start.y + end.y) / 2;

            const isArc = curve === 'smooth' || curve === 'arc-up' || curve === 'arc-down' || offY !== 0 || offX !== 0;

            if (isArc) {
              const midX = (start.x + end.x) / 2;
              const midY = (start.y + end.y) / 2;
              let defaultBow = curve === 'arc-up' ? -38 : curve === 'arc-down' ? 38 : 0;
              if (curve === 'smooth' && !offY && !offX) {
                // If moving diagonally or vertically, bow horizontally
                defaultBow = Math.abs(end.y - start.y) > Math.abs(end.x - start.x) ? -42 : -32;
              }

              const ctrlX = midX + offX;
              const ctrlY = midY + (offY || defaultBow);

              pathD = `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${end.x} ${end.y}`;
              labelX = 0.25 * start.x + 0.5 * ctrlX + 0.25 * end.x;
              labelY = 0.25 * start.y + 0.5 * ctrlY + 0.25 * end.y;
            } else {
              pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
            }

            // Label formatting & Anti-Collision Offsets
            const stepPrefix = edge.step ? `${edge.step} ` : '';
            const isBidirectional = edge.direction === 'bi';
            const displayLabel = isBidirectional && edge.label === 'next / prev'
              ? '◀ prev  •  next ▶'
              : `${stepPrefix}${edge.label || ''}`;

            const pillWidth = displayLabel ? Math.max(displayLabel.length * 6.5 + 20, 52) : 0;
            const gapDist = Math.hypot(end.x - start.x, end.y - start.y);

            // If gap is tight, shift label safely above or below line
            let smartOffsetY = 0;
            if (gapDist < pillWidth + 30 && !isArc) {
              smartOffsetY = -16;
            }

            labelX += edge.labelOffsetX || 0;
            labelY += (edge.labelOffsetY !== undefined ? edge.labelOffsetY : smartOffsetY);

            const markerEnd = edge.direction === 'none' || edge.direction === 'backward'
              ? undefined
              : `url(#fg-arrow-end-${markerKey})`;
            const markerStart = edge.direction === 'backward' || edge.direction === 'bi'
              ? `url(#fg-arrow-start-${markerKey})`
              : undefined;

            const isCurrentStep = activeStepIndex !== null && sortedEdges[activeStepIndex]?.step === edge.step;

            return (
              <g
                key={`edge-${idx}`}
                className={`${styles.edgeGroup} ${isCurrentStep ? styles.edgeHighlighted : ''}`}
                onClick={() => {
                  const sortedIdx = sortedEdges.findIndex((se) => se.step === edge.step && se.from === edge.from);
                  setActiveStepIndex(sortedIdx >= 0 ? sortedIdx : null);
                  setActiveNodeId(null);
                }}
              >
                {/* Hitbox */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="22"
                  className={styles.hitbox}
                />

                {/* Visible Edge Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={edgeCol.stroke}
                  strokeWidth={isCurrentStep ? 2.8 : edge.width || 1.8}
                  strokeDasharray={edge.style === 'dashed' ? '5 4' : edge.style === 'dotted' ? '2 3' : undefined}
                  markerEnd={markerEnd}
                  markerStart={markerStart}
                  className={styles.edgePath}
                />

                {/* Edge Label Pill */}
                {edge.label && (
                  <g className={styles.edgeLabelGroup} transform={`translate(${labelX}, ${labelY})`}>
                    <rect
                      x={-pillWidth / 2}
                      y={-11}
                      width={pillWidth}
                      height={22}
                      rx={6}
                      fill="#0b1329"
                      stroke={edgeCol.stroke}
                      strokeWidth={isCurrentStep ? 2 : 1.2}
                      className={styles.edgeLabelBg}
                    />
                    <text
                      x={0}
                      y={3.5}
                      textAnchor="middle"
                      fill={edgeCol.text}
                      className={styles.edgeLabelText}
                    >
                      {displayLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes (Rendered as Crisp HTML Cards via foreignObject) */}
          {nodeList.map((n) => {
            const col = COLOR_MAP[n.variant || n.color] || COLOR_MAP.default;
            const isSelectedNode = activeNodeId === n.id;
            const isConnectedToStep = activeStepIndex !== null &&
              (sortedEdges[activeStepIndex]?.from === n.id || sortedEdges[activeStepIndex]?.to === n.id);

            return (
              <foreignObject
                key={n.id}
                x={n.x - n.w / 2}
                y={n.y - n.h / 2}
                width={n.w}
                height={n.h}
                className={styles.foreignObj}
              >
                <div
                  className={`${styles.nodeCard} ${isSelectedNode || isConnectedToStep ? styles.nodeCardActive : ''}`}
                  style={{
                    backgroundColor: col.fill,
                    borderColor: isSelectedNode || isConnectedToStep ? '#38bdf8' : col.border,
                  }}
                  onClick={() => {
                    setActiveNodeId(n.id);
                    setActiveStepIndex(null);
                  }}
                >
                  <div className={styles.cardHeader}>
                    {n.icon && <span className={styles.cardIcon}>{n.icon}</span>}
                    {n.badge && (
                      <span
                        className={styles.cardBadge}
                        style={{
                          background: col.badgeBg,
                          borderColor: col.badgeBorder,
                          color: col.text,
                        }}
                      >
                        {n.badge}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardTitle} style={{ color: col.text }}>
                    {n.label}
                  </div>

                  {n.sublabel && (
                    <div className={styles.cardSublabel}>
                      {n.sublabel}
                    </div>
                  )}
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 3. STEPPER & EDUCATIONAL CONSOLE (Zero Layout Shift)           */}
      {/* ============================================================== */}
      <div className={styles.interactiveConsole}>
        {/* Step Controls */}
        <div className={styles.consoleControls}>
          <button
            type="button"
            className={styles.consoleNavBtn}
            onClick={handlePrevStep}
            disabled={sortedEdges.length === 0}
            title="Previous Step"
          >
            ◀ Prev
          </button>
          <span className={styles.consoleStepIndicator}>
            {activeStepIndex !== null
              ? `Step ${activeStepIndex + 1} of ${sortedEdges.length}`
              : `Flow Steps (${sortedEdges.length})`}
          </span>
          <button
            type="button"
            className={styles.consoleNavBtn}
            onClick={handleNextStep}
            disabled={sortedEdges.length === 0}
            title="Next Step"
          >
            Next ▶
          </button>
        </div>

        {/* Detailed Explanation */}
        <div className={styles.consoleDetailsArea}>
          {activeDetails ? (
            <div className={styles.activeConsoleRow}>
              {activeDetails.step && (
                <span className={styles.activeStepBadge}>
                  {activeDetails.type === 'node' ? '📦 Node' : `Step ${activeDetails.step}`}
                </span>
              )}
              <strong className={styles.activeStepName}>{activeDetails.title}</strong>
              <span className={styles.activeStepDivider}>—</span>
              <span className={styles.activeStepDetails}>{activeDetails.description}</span>
              <button
                className={styles.consoleClearBtn}
                onClick={() => {
                  setActiveStepIndex(null);
                  setActiveNodeId(null);
                }}
                type="button"
                aria-label="Clear active selection"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className={styles.idleConsoleRow}>
              <span className={styles.idleIcon}>💡</span>
              <span>Click <strong>Next ▶</strong> or tap any step / node to inspect the system transition mechanics</span>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      {legend && legend.length > 0 && (
        <div className={styles.legendContainer}>
          <span className={styles.legendTitle}>Key:</span>
          {legend.map((item, idx) => {
            const itemCol = COLOR_MAP[item.variant || item.color] || COLOR_MAP.default;
            return (
              <div key={idx} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{
                    backgroundColor: itemCol.stroke,
                    borderStyle: item.style === 'dashed' ? 'dashed' : 'solid',
                  }}
                />
                <span className={styles.legendLabel}>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
