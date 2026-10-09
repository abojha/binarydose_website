import React, { useState, useMemo, useRef, useEffect } from 'react';
import styles from './FlowDiagram.module.css';

/**
 * Universal Adaptive TikZ-Inspired Declarative Diagram Engine for Binary Dose.
 * Pure React + Native SVG (Zero Canvas, Zero Whiteboard Dots, Zero Watermark).
 * 
 * Features:
 * - Dynamic Container Sandbox Engine: Real-time ResizeObserver measures container width
 *   and adaptively calculates card lengths, column gaps, and coordinates so diagrams
 *   fit 100% natively on laptops/desktops with zero edge clipping and zero horizontal scrolling.
 * - Dynamic Headroom Architecture: Automatically allocates 86px top padding whenever
 *   top-arching return loops exist, permanently preventing top-curve clipping.
 * - Constant-Height Zero-Jitter Inspector Console: Locked to a fixed height (84px) so
 *   hovering/unhovering cards or arrows NEVER causes vertical layout shift.
 * - Dual-Mode Mobile Engine: Auto-scales on mobile viewports for a complete bird's-eye
 *   view with zero horizontal scrollbar, plus an interactive "Fit All / HD Pan" toggle.
 * - Interactive Neon Cyan Glowing Arrows with animated flowDash pulses.
 * - Bidirectional Node-Edge Highlighting.
 */
export default function FlowDiagram({
  title,
  subtitle,
  domains = [],
  nodes: rawNodes = [],
  edges: rawEdges = [],
  legend = [],
  direction = 'LR',
  width,
  height,
}) {
  const sandboxRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState(null);
  const [activeEdgeId, setActiveEdgeId] = useState(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Measure container sandbox width in real-time
  useEffect(() => {
    if (!sandboxRef.current) return;

    const updateWidth = () => {
      if (sandboxRef.current) {
        const measured = sandboxRef.current.clientWidth;
        if (measured > 0) {
          setContainerWidth(measured);
        }
      }
    };

    updateWidth();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const measured = Math.round(entry.contentRect.width);
          if (measured > 0) {
            setContainerWidth(measured);
          }
        }
      });
      ro.observe(sandboxRef.current);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, []);

  const isMobile = containerWidth > 0 && containerWidth < 660;

  // 1. Calculate Grid Coordinates and Adaptive Sandbox Layout
  const {
    layoutNodes,
    layoutDomains,
    svgWidth,
    svgHeight,
    isCompact,
    scaleFactor,
  } = useMemo(() => {
    let assignedNodes = [];
    let maxCol = 0;
    let maxRow = 0;

    // Check if any edge arches across top, bottom, or outer sides
    const hasTopArches = rawEdges.some(
      (e) => e.bend === 'top' || (e.fromPort === 'top' && e.toPort === 'top')
    );
    const hasBottomArches = rawEdges.some(
      (e) => e.bend === 'bottom' || (e.fromPort === 'bottom' && e.toPort === 'bottom')
    );
    const hasOuterLeft = rawEdges.some(
      (e) => (e.fromPort === 'left' && (e.toPort === 'left' || e.toPort === 'top')) || e.bend === 'left'
    );
    const hasOuterRight = rawEdges.some(
      (e) => (e.fromPort === 'right' && (e.toPort === 'right' || e.toPort === 'top')) || e.bend === 'right'
    );

    // Dynamic padding:
    const hasTopHeaders = (domains || []).some((d) => d.position !== 'bottom');
    const hasBottomHeaders = (domains || []).some((d) => d.position === 'bottom');
    const topPad = hasTopArches ? 92 : (hasTopHeaders ? 84 : 52);
    const bottomPad = hasBottomHeaders ? 76 : (hasBottomArches ? 64 : 44);
    const leftPad = hasOuterLeft ? 52 : 28;
    const rightPad = hasOuterRight ? 52 : 28;
    const cardH = 78; // 78px for abundant vertical text breathing room
    const rowGap = 96; // 96px generous vertical gap between rows

    const hasExplicitGrid = rawNodes.some((n) => typeof n.col === 'number');
    const hasDomains = domains && domains.length > 0;

    if (hasExplicitGrid) {
      rawNodes.forEach((n) => {
        const col = typeof n.col === 'number' ? n.col : 0;
        const row = typeof n.row === 'number' ? n.row : 0;
        if (col > maxCol) maxCol = Math.ceil(col);
        if (row > maxRow) maxRow = Math.ceil(row);
      });
    } else if (hasDomains && domains.length === 2) {
      maxRow = 1;
      domains.forEach((dom) => {
        const domNodes = rawNodes.filter(
          (n) => dom.nodeIds?.includes(n.id) || n.domain === dom.id
        );
        if (domNodes.length - 1 > maxCol) maxCol = domNodes.length - 1;
      });
    } else {
      maxCol = Math.max(0, rawNodes.length - 1);
    }

    const numCols = maxCol + 1;
    const numGaps = Math.max(1, maxCol);

    // Sandbox Width Calculation:
    // On desktop/laptop: available container width measured via ResizeObserver (default 800 on SSR)
    const availableW = width || (containerWidth > 0 ? containerWidth : 800);

    // Mobile Base Width (unscaled target for phone screens)
    // Ensures every column gets comfortable space for both a 120-175px card AND a 115-125px transition gap
    const mobileBaseWidth = Math.max(860, numCols * 225);
    const isMobileViewport = containerWidth > 0 && containerWidth < 660;

    // Use mobile base width on mobile, or available container width on desktop/laptop
    const targetW = isMobileViewport ? mobileBaseWidth : availableW;

    // Usable width strictly between left and right padding
    const usableW = Math.max(targetW - (leftPad + rightPad), 280);

    // Dynamically solve for cardW and colGap so total width matches targetW 100%
    let cardW = 145;
    let colGap = 110;

    if (numCols > 1) {
      // Allocate ~48% of usable space to cards, ~52% to transition gaps
      const idealCardW = (usableW * 0.48) / numCols;
      // Clamp cardW to comfortable bounds [120px, 175px]
      cardW = Math.round(Math.min(175, Math.max(120, idealCardW)));
      const remainingForGaps = usableW - (numCols * cardW);
      colGap = remainingForGaps / numGaps;
    } else {
      cardW = Math.min(220, usableW);
      colGap = 0;
    }

    const totalW = width || Math.round(leftPad + (numCols * cardW) + (numGaps * colGap) + rightPad);
    const totalH = height || Math.round(topPad + (maxRow + 1) * cardH + maxRow * rowGap + bottomPad);

    // Mobile scale factor calculation
    let scale = 1;
    if (isMobileViewport && containerWidth > 0) {
      scale = Math.min(1, Math.max(0.42, (containerWidth - 20) / totalW));
    }

    // Map nodes with exact coordinates
    if (hasExplicitGrid) {
      assignedNodes = rawNodes.map((n) => {
        const col = typeof n.col === 'number' ? n.col : 0;
        const row = typeof n.row === 'number' ? n.row : 0;
        return {
          ...n,
          col,
          row,
          x: Math.round(leftPad + col * (cardW + colGap)),
          y: Math.round(topPad + row * (cardH + rowGap)),
          w: cardW,
          h: cardH,
        };
      });
    } else if (hasDomains && domains.length === 2) {
      domains.forEach((dom, domIdx) => {
        const domNodes = rawNodes.filter(
          (n) => dom.nodeIds?.includes(n.id) || n.domain === dom.id
        );
        domNodes.forEach((node, idx) => {
          assignedNodes.push({
            ...node,
            col: idx,
            row: domIdx,
            x: Math.round(leftPad + idx * (cardW + colGap)),
            y: Math.round(topPad + domIdx * (cardH + rowGap)),
            w: cardW,
            h: cardH,
          });
        });
      });
    } else {
      assignedNodes = rawNodes.map((node, idx) => {
        return {
          ...node,
          col: idx,
          row: 0,
          x: Math.round(leftPad + idx * (cardW + colGap)),
          y: Math.round(topPad),
          w: cardW,
          h: cardH,
        };
      });
    }

    // Calculate domain bounding boxes with safety margins
    const computedDomains = (domains || []).map((dom) => {
      const domNodes = assignedNodes.filter(
        (n) => (dom.nodeIds && dom.nodeIds.includes(n.id)) || n.domain === dom.id
      );
      if (domNodes.length === 0) return null;

      const minX = Math.min(...domNodes.map((n) => n.x)) - 10;
      const maxX = Math.max(...domNodes.map((n) => n.x + n.w)) + 10;
      const domMinY = Math.min(...domNodes.map((n) => n.y));
      const domTopMargin = dom.position === 'bottom' ? 14 : 46;
      const minY = Math.max(10, domMinY - domTopMargin);
      const domBottomMargin = dom.position === 'bottom' ? 54 : 14;
      const maxY = Math.max(...domNodes.map((n) => n.y + n.h)) + domBottomMargin;

      return {
        ...dom,
        x: Math.max(8, minX),
        y: minY,
        w: maxX - minX,
        h: maxY - minY,
      };
    }).filter(Boolean);

    return {
      layoutNodes: assignedNodes,
      layoutDomains: computedDomains,
      svgWidth: totalW,
      svgHeight: totalH,
      isCompact: cardW < 134,
      scaleFactor: scale,
    };
  }, [rawNodes, rawEdges, domains, width, height, containerWidth]);

  // Fast node lookup
  const nodeMap = useMemo(() => {
    const map = {};
    layoutNodes.forEach((n) => {
      map[n.id] = n;
    });
    return map;
  }, [layoutNodes]);

  // 2. TikZ Parametric Curve Math for Every Edge
  const layoutEdges = useMemo(() => {
    return rawEdges.map((edge, idx) => {
      const sourceId = edge.from || edge.source;
      const targetId = edge.to || edge.target;
      const source = nodeMap[sourceId];
      const target = nodeMap[targetId];
      if (!source || !target) return null;

      const bend = edge.bend;
      let fromPort = edge.fromPort;
      let toPort = edge.toPort;

      // Smart port determination
      if (!fromPort || !toPort) {
        if (bend === 'top' || (typeof bend === 'number' && bend < 0)) {
          fromPort = 'top';
          toPort = 'top';
        } else if (bend === 'bottom' || (typeof bend === 'number' && bend > 0)) {
          fromPort = 'bottom';
          toPort = 'bottom';
        } else if (source.row === target.row) {
          if (source.col < target.col) {
            fromPort = 'right';
            toPort = 'left';
          } else {
            fromPort = 'top';
            toPort = 'top';
          }
        } else if (source.row < target.row) {
          fromPort = 'bottom';
          toPort = 'top';
        } else {
          fromPort = 'top';
          toPort = 'bottom';
        }
      }

      // Compute physical anchor coordinates with customizable offsetRatio (0.0 to 1.0)
      const getAnchor = (node, port, isTarget = false, offsetRatio = 0.5) => {
        const offset = isTarget ? 6 : 0;
        const ratio = typeof offsetRatio === 'number' ? Math.max(0, Math.min(1, offsetRatio)) : 0.5;
        switch (port) {
          case 'left':
            return { x: node.x - offset, y: node.y + node.h * ratio };
          case 'right':
            return { x: node.x + node.w + (isTarget ? -offset : 0), y: node.y + node.h * ratio };
          case 'top':
            return { x: node.x + node.w * ratio, y: node.y - offset };
          case 'bottom':
            return { x: node.x + node.w * ratio, y: node.y + node.h + (isTarget ? -offset : 0) };
          default:
            return { x: node.x + node.w, y: node.y + node.h * ratio };
        }
      };

      const fromRatio = typeof edge.fromPortOffset === 'number' ? edge.fromPortOffset : 0.5;
      const toRatio = typeof edge.toPortOffset === 'number' ? edge.toPortOffset : 0.5;

      const start = getAnchor(source, fromPort, false, fromRatio);
      const end = getAnchor(target, toPort, true, toRatio);

      let pathD = '';
      let labelX = (start.x + end.x) / 2;
      let labelY = (start.y + end.y) / 2;

      // Generate TikZ Path & Label Coordinate based on Route Type
      if (fromPort === 'top' && toPort === 'top') {
        const archHeight = typeof bend === 'number' ? Math.abs(bend) : 38;
        const apexY = Math.min(start.y, end.y) - archHeight;
        pathD = `M ${start.x} ${start.y} C ${start.x} ${apexY}, ${end.x} ${apexY}, ${end.x} ${end.y}`;
        labelX = (start.x + end.x) / 2;
        labelY = apexY - 14;
      } else if (fromPort === 'bottom' && toPort === 'bottom') {
        const archHeight = typeof bend === 'number' ? Math.abs(bend) : 46;
        const troughY = Math.max(start.y, end.y) + archHeight;
        pathD = `M ${start.x} ${start.y} C ${start.x} ${troughY}, ${end.x} ${troughY}, ${end.x} ${end.y}`;
        labelX = (start.x + end.x) / 2;
        labelY = troughY + 14;
      } else if (fromPort === 'bottom' && toPort === 'top') {
        if (Math.abs(start.x - end.x) < 5) {
          pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          const isRightHalf = start.x > (svgWidth / 2);
          labelX = isRightHalf ? start.x - 48 : start.x + 48;
          labelY = (start.y + end.y) / 2;
        } else {
          const midY = (start.y + end.y) / 2;
          pathD = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
          labelX = (start.x + end.x) / 2;
          labelY = midY;
        }
      } else if (fromPort === 'top' && toPort === 'bottom') {
        if (Math.abs(start.x - end.x) < 5) {
          pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          const isRightHalf = start.x > (svgWidth / 2);
          labelX = isRightHalf ? start.x - 48 : start.x + 48;
          labelY = (start.y + end.y) / 2;
        } else {
          const midY = (start.y + end.y) / 2;
          pathD = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
          labelX = (start.x + end.x) / 2;
          labelY = midY;
        }
      } else if (fromPort === 'bottom' && toPort === 'right') {
        const midY = (start.y + end.y) / 2;
        pathD = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
        labelX = (start.x + end.x) / 2;
        labelY = midY;
      } else if (fromPort === 'bottom' && toPort === 'left') {
        pathD = `M ${start.x} ${start.y} C ${start.x} ${end.y}, ${start.x} ${end.y}, ${end.x} ${end.y}`;
        labelX = (start.x + end.x) / 2;
        labelY = (start.y + end.y) / 2;
      } else if (fromPort === 'left' && toPort === 'right') {
        if (Math.abs(start.y - end.y) < 5) {
          pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          labelX = (start.x + end.x) / 2;
          labelY = start.y - 18;
        } else {
          const midX = (start.x + end.x) / 2;
          pathD = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
          labelX = midX;
          labelY = (start.y + end.y) / 2 - 18;
        }
      } else if (fromPort === 'left' && toPort === 'bottom') {
        pathD = `M ${start.x} ${start.y} C ${end.x} ${start.y}, ${end.x} ${start.y}, ${end.x} ${end.y}`;
        labelX = end.x - 8;
        labelY = (start.y + end.y) / 2;
      } else if (fromPort === 'top' && toPort === 'left') {
        pathD = `M ${start.x} ${start.y} C ${start.x} ${end.y}, ${start.x} ${end.y}, ${end.x} ${end.y}`;
        labelX = start.x + 10;
        labelY = (start.y + end.y) / 2;
      } else if (fromPort === 'right' && toPort === 'bottom') {
        pathD = `M ${start.x} ${start.y} C ${end.x} ${start.y}, ${end.x} ${start.y}, ${end.x} ${end.y}`;
        labelX = end.x + 12;
        labelY = (start.y + end.y) / 2;
      } else if (fromPort === 'right' && toPort === 'left') {
        // Straight Horizontal Line: label elevated 18px ABOVE line
        if (Math.abs(start.y - end.y) < 5) {
          pathD = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          labelX = (start.x + end.x) / 2;
          labelY = start.y - 18;
        } else {
          const midX = (start.x + end.x) / 2;
          pathD = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
          labelX = midX;
          labelY = (start.y + end.y) / 2 - 18;
        }
      } else if (fromPort === 'left' && toPort === 'top') {
        const outerOffset = typeof edge.gutterOffset === 'number' ? edge.gutterOffset : 28;
        const gutterX = Math.min(start.x, end.x) - outerOffset;
        pathD = `M ${start.x} ${start.y} C ${gutterX} ${start.y}, ${gutterX} ${end.y - 24}, ${end.x} ${end.y}`;
        labelX = Math.round((gutterX + end.x) / 2);
        labelY = Math.round(end.y + 90);
      } else if (fromPort === 'right' && toPort === 'top') {
        const outerOffset = typeof edge.gutterOffset === 'number' ? edge.gutterOffset : 28;
        const gutterX = Math.max(start.x, end.x) + outerOffset;
        pathD = `M ${start.x} ${start.y} C ${gutterX} ${start.y}, ${gutterX} ${end.y - 24}, ${end.x} ${end.y}`;
        labelX = Math.round((end.x + gutterX) / 2);
        labelY = Math.round(end.y + 90);
      } else if (fromPort === 'left' && toPort === 'left') {
        const archWidth = typeof edge.bend === 'number' ? Math.abs(edge.bend) : 38;
        const gutterX = Math.min(start.x, end.x) - archWidth;
        pathD = `M ${start.x} ${start.y} C ${gutterX} ${start.y}, ${gutterX} ${end.y}, ${end.x} ${end.y}`;
        labelX = gutterX - 12;
        labelY = (start.y + end.y) / 2;
      } else if (fromPort === 'right' && toPort === 'right') {
        const archWidth = typeof edge.bend === 'number' ? Math.abs(edge.bend) : 38;
        const gutterX = Math.max(start.x, end.x) + archWidth;
        pathD = `M ${start.x} ${start.y} C ${gutterX} ${start.y}, ${gutterX} ${end.y}, ${end.x} ${end.y}`;
        labelX = gutterX + 12;
        labelY = (start.y + end.y) / 2;
      } else {
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        pathD = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
        labelX = midX;
        labelY = midY - 14;
      }

      if (edge.pathD) {
        pathD = edge.pathD;
      }
      const finalLabelX = typeof edge.labelX === 'number' ? edge.labelX : labelX;
      const finalLabelY = typeof edge.labelY === 'number' ? edge.labelY : labelY;

      // Content-aware boundary clamping so NO edge badge can ever bleed past viewport edges:
      const labelText = edge.label || '';
      const badgeHalfWidth = Math.max(48, Math.round((labelText.length * 7.5) / 2) + 16);
      const minSafeX = badgeHalfWidth + 12;
      const maxSafeX = Math.max(minSafeX, svgWidth - badgeHalfWidth - 12);

      const rawBadgeX = Math.round(finalLabelX + (edge.labelOffsetX || 0));
      const safeBadgeX = Math.max(minSafeX, Math.min(maxSafeX, rawBadgeX));
      const rawBadgeY = Math.round(finalLabelY + (edge.labelOffsetY || 0));
      const safeBadgeY = Math.max(16, Math.min(svgHeight - 16, rawBadgeY));

      return {
        id: `e-${idx}`,
        from: sourceId,
        to: targetId,
        ...edge,
        pathD,
        labelX: safeBadgeX,
        labelY: safeBadgeY,
      };
    }).filter(Boolean);
  }, [rawEdges, nodeMap, svgWidth, svgHeight]);

  // Active details calculation for the dedicated inspector console strip below
  const activeDetails = useMemo(() => {
    const selectedNode = nodeMap[activeNodeId || hoveredNodeId];
    if (selectedNode) {
      return {
        type: 'node',
        icon: selectedNode.icon || '📌',
        badge: selectedNode.badge || 'Component Details',
        title: selectedNode.title || selectedNode.label,
        sublabel: selectedNode.sublabel,
        color: selectedNode.color,
        details: selectedNode.details || selectedNode.detail,
      };
    }

    const selectedEdge = layoutEdges.find((e) => e.id === (activeEdgeId || hoveredEdgeId));
    if (selectedEdge) {
      const srcName = nodeMap[selectedEdge.from]?.title || nodeMap[selectedEdge.from]?.label || selectedEdge.from;
      const tgtName = nodeMap[selectedEdge.to]?.title || nodeMap[selectedEdge.to]?.label || selectedEdge.to;
      return {
        type: 'edge',
        icon: '⚡',
        badge: selectedEdge.step ? `Step ${selectedEdge.step}` : 'State Transition',
        title: selectedEdge.label,
        sublabel: `${srcName} → ${tgtName}`,
        color: 'cyan',
        details: selectedEdge.detail || selectedEdge.details || `Execution transition from ${srcName} into ${tgtName}.`,
      };
    }

    return null;
  }, [activeNodeId, hoveredNodeId, activeEdgeId, hoveredEdgeId, nodeMap, layoutEdges]);

  // Step-by-step edge sequencing if edges have a step property
  const steppedEdges = useMemo(() => {
    return layoutEdges
      .filter((e) => typeof e.step === 'number' || (typeof e.step === 'string' && e.step.trim() !== ''))
      .sort((a, b) => {
        const numA = parseFloat(a.step);
        const numB = parseFloat(b.step);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return String(a.step).localeCompare(String(b.step));
      });
  }, [layoutEdges]);

  const handlePrevStep = () => {
    const nextIdx = Math.max(0, currentStepIdx - 1);
    setCurrentStepIdx(nextIdx);
    if (steppedEdges[nextIdx]) {
      setActiveEdgeId(steppedEdges[nextIdx].id);
      setActiveNodeId(null);
    }
  };

  const handleNextStep = () => {
    const nextIdx = Math.min(steppedEdges.length - 1, currentStepIdx + 1);
    setCurrentStepIdx(nextIdx);
    if (steppedEdges[nextIdx]) {
      setActiveEdgeId(steppedEdges[nextIdx].id);
      setActiveNodeId(null);
    }
  };

  return (
    <div className={styles.container} ref={sandboxRef}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTopRow}>
          <div className={styles.titleBadge}>Architecture Flow</div>
          {steppedEdges.length > 0 && (
            <div className={styles.stepperContainer}>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={currentStepIdx === 0}
                onClick={handlePrevStep}
              >
                ◀ Prev
              </button>
              <span className={styles.stepCounter}>
                Step {currentStepIdx + 1} of {steppedEdges.length}
              </span>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={currentStepIdx === steppedEdges.length - 1}
                onClick={handleNextStep}
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* Diagram Scroll Wrapper: Always smooth native horizontal pan on mobile, zero vertical scrollbar */}
      <div
        className={`${styles.diagramScrollWrapper} ${isMobile ? styles.scrollWrapperMobilePan : ''}`}
        style={{
          overflowX: isMobile ? 'auto' : 'hidden',
          overflowY: 'hidden',
        }}
      >
        <div
          className={styles.diagramViewport}
          style={{
            width: `${svgWidth}px`,
            height: `${svgHeight}px`,
          }}
        >
          {/* Layer 1: Domain Subgraph Containers (z-index: 1) */}
          {layoutDomains.map((dom) => {
            const isBottom = dom.position === 'bottom';
            return (
              <div
                key={dom.id}
                className={`${styles.domainBox} ${styles[dom.color + 'Domain'] || ''}`}
                style={{
                  left: `${dom.x}px`,
                  top: `${dom.y}px`,
                  width: `${dom.w}px`,
                  height: `${dom.h}px`,
                }}
              >
                <div
                  className={`${styles.domainHeader} ${isBottom ? styles.domainHeaderBottom : ''}`}
                  style={
                    dom.align === 'right'
                      ? { left: 'auto', right: '14px', transform: 'none' }
                      : dom.align === 'left'
                      ? { left: '14px', right: 'auto', transform: 'none' }
                      : {}
                  }
                >
                  <span>{dom.icon || '🏷️'}</span>
                  <span>{dom.title}</span>
                </div>
              </div>
            );
          })}

          {/* Layer 2: SVG Arrow Layer (z-index: 10) */}
          <svg
            className={styles.svgLayer}
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Default Sharp Arrowhead Marker */}
              <marker
                id="arrowhead-cyan"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
              </marker>

              {/* Glowing High-Intensity Arrowhead Marker on Hover */}
              <marker
                id="arrowhead-cyan-glow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="8.5"
                markerHeight="8.5"
                orient="auto"
              >
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#38bdf8" />
              </marker>

              {/* Bidirectional Arrowhead Markers (Start) */}
              <marker
                id="arrowhead-cyan-start"
                viewBox="0 0 10 10"
                refX="3"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
              </marker>
              <marker
                id="arrowhead-cyan-start-glow"
                viewBox="0 0 10 10"
                refX="3"
                refY="5"
                markerWidth="8.5"
                markerHeight="8.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.2 L 9 5 L 0 8.8 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Edge Paths with Interactive Hover Hit-Area & Animated Pulse */}
            {layoutEdges.map((edge) => {
              const isSteppedCurrent = steppedEdges.length > 0 && steppedEdges[currentStepIdx]?.id === edge.id;
              const isEdgeActive =
                isSteppedCurrent ||
                hoveredEdgeId === edge.id ||
                activeEdgeId === edge.id ||
                hoveredNodeId === edge.from ||
                hoveredNodeId === edge.to ||
                activeNodeId === edge.from ||
                activeNodeId === edge.to;

              const isUndirected = edge.direction === 'none' || edge.direction === 'undirected';
              const isBidirectional = edge.direction === 'bi';

              return (
                <g
                  key={edge.id}
                  className={`${styles.edgeGroup} ${isEdgeActive ? styles.edgeGroupActive : ''}`}
                  onMouseEnter={() => setHoveredEdgeId(edge.id)}
                  onMouseLeave={() => setHoveredEdgeId(null)}
                  onClick={() => setActiveEdgeId((prev) => (prev === edge.id ? null : edge.id))}
                >
                  {/* Invisible wide stroke for easy cursor hover */}
                  <path d={edge.pathD} className={styles.edgeHitArea} />

                  {/* Visible glowing path */}
                  <path
                    d={edge.pathD}
                    className={`${styles.edgePath} ${edge.style === 'dashed' ? styles.edgePathDashed : ''} ${isEdgeActive ? styles.edgePathActive : ''}`}
                    markerStart={
                      isBidirectional
                        ? isEdgeActive
                          ? 'url(#arrowhead-cyan-start-glow)'
                          : 'url(#arrowhead-cyan-start)'
                        : undefined
                    }
                    markerEnd={
                      isUndirected
                        ? undefined
                        : isEdgeActive
                        ? 'url(#arrowhead-cyan-glow)'
                        : 'url(#arrowhead-cyan)'
                    }
                  />
                </g>
              );
            })}
          </svg>

          {/* Layer 3: Native HTML Edge Label Badges (z-index: 15) */}
          <div className={styles.labelsLayer}>
            {layoutEdges.map((edge) => {
              const labelText = edge.label;
              if (!labelText) return null;

              const isSteppedCurrent = steppedEdges.length > 0 && steppedEdges[currentStepIdx]?.id === edge.id;
              const isEdgeActive =
                isSteppedCurrent ||
                hoveredEdgeId === edge.id ||
                activeEdgeId === edge.id ||
                hoveredNodeId === edge.from ||
                hoveredNodeId === edge.to ||
                activeNodeId === edge.from ||
                activeNodeId === edge.to;

              return (
                <div
                  key={`label-${edge.id}`}
                  className={`${styles.edgeBadge} ${isCompact ? styles.compactBadge : ''} ${isEdgeActive ? styles.edgeBadgeActive : ''}`}
                  style={{
                    left: `${edge.labelX}px`,
                    top: `${edge.labelY}px`,
                  }}
                  onMouseEnter={() => setHoveredEdgeId(edge.id)}
                  onMouseLeave={() => setHoveredEdgeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEdgeId((prev) => (prev === edge.id ? null : edge.id));
                  }}
                >
                  {edge.step && <span className={styles.stepPill}>{edge.step}</span>}
                  <span className={styles.edgeText}>{labelText}</span>
                </div>
              );
            })}
          </div>

          {/* Layer 4: HTML Node Cards Layer (z-index: 20) */}
          <div className={styles.nodesLayer}>
            {layoutNodes.map((node) => {
              const isHovered = hoveredNodeId === node.id;
              const isClicked = activeNodeId === node.id;
              const isConnectedToActiveEdge =
                (hoveredEdgeId && (nodeMap[hoveredEdgeId]?.from === node.id || nodeMap[hoveredEdgeId]?.to === node.id)) ||
                (activeEdgeId && (nodeMap[activeEdgeId]?.from === node.id || nodeMap[activeEdgeId]?.to === node.id));
              const isNodeHighlighted = isHovered || isClicked || isConnectedToActiveEdge;
              const colorTheme = styles[node.color + 'Card'] || styles.blueCard;

              return (
                <div
                  key={node.id}
                  className={`${styles.cardContainer} ${colorTheme} ${isCompact ? styles.compactCard : ''} ${isNodeHighlighted ? styles.cardActive : ''}`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.w}px`,
                    height: `${node.h}px`,
                  }}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveNodeId((prev) => (prev === node.id ? null : node.id));
                  }}
                >
                  {/* Card Header: Icon & Badge */}
                  <div className={styles.cardHeader}>
                    {node.icon && <span className={styles.cardIcon}>{node.icon}</span>}
                    {node.badge && <span className={styles.cardBadge}>{node.badge}</span>}
                  </div>

                  {/* Card Title */}
                  <div className={styles.cardTitle}>{node.title || node.label}</div>

                  {/* Card Sublabel */}
                  {node.sublabel && <div className={styles.cardSublabel}>{node.sublabel}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Inspector Strip: CONSTANT 84px HEIGHT — 100% Zero Vertical Shift */}
      <div className={styles.inspectorStrip}>
        {activeDetails ? (
          <div className={`${styles.inspectorContent} ${styles[activeDetails.color + 'Inspector'] || ''}`}>
            <div className={styles.inspectorHeader}>
              <div className={styles.inspectorMeta}>
                {activeDetails.icon && <span className={styles.inspectorIcon}>{activeDetails.icon}</span>}
                <span className={styles.inspectorBadge}>{activeDetails.badge}</span>
                <span className={styles.inspectorTitle}>{activeDetails.title}</span>
                {activeDetails.sublabel && (
                  <span className={styles.inspectorSublabel}>({activeDetails.sublabel})</span>
                )}
              </div>
              <button
                type="button"
                aria-label="Reset details"
                className={styles.inspectorClose}
                onClick={() => {
                  setActiveNodeId(null);
                  setHoveredNodeId(null);
                  setActiveEdgeId(null);
                  setHoveredEdgeId(null);
                }}
              >
                ✕
              </button>
            </div>
            <p className={styles.inspectorBody}>{activeDetails.details}</p>
          </div>
        ) : (
          <div className={styles.inspectorPlaceholder}>
            <span className={styles.inspectorHintIcon}>💡</span>
            <span className={styles.inspectorHintText}>
              Click or hover any card or transition arrow above to inspect deep-dive operational mechanics
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
