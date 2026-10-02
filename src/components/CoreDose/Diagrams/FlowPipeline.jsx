import React, { useState } from 'react';
import styles from './FlowPipeline.module.css';

/**
 * Individual Interactive Pipeline Node Card
 */
function PipelineNodeCard({ step }) {
  const [isOpen, setIsOpen] = useState(false);
  const themeMap = {
    purple: styles.purpleTheme,
    blue: styles.blueTheme,
    amber: styles.amberTheme,
    emerald: styles.emeraldTheme,
    cyan: styles.cyanTheme,
    rose: styles.roseTheme,
  };
  const themeClass = themeMap[step.color] || styles.blueTheme;
  const details = step.details || step.detail;
  const roleText = step.badge || step.role;

  return (
    <div
      className={`${styles.nodeCard} ${themeClass} ${isOpen ? styles.cardActive : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Header: Icon & Role Badge */}
      <div className={styles.cardHeader}>
        {step.icon && <span className={styles.nodeIcon}>{step.icon}</span>}
        {roleText && <span className={styles.nodeRole}>{roleText}</span>}
      </div>

      {/* Title */}
      <h4 className={styles.nodeTitle}>{step.title}</h4>

      {/* Sublabel */}
      {step.sublabel && <div className={styles.nodeSublabel}>{step.sublabel}</div>}

      {/* Description */}
      {step.description && <p className={styles.nodeDesc}>{step.description}</p>}

      {/* Floating Tooltip Beside / Above the Card */}
      {details && isOpen && (
        <div
          className={styles.floatingTooltip}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipBadge}>{roleText || 'Details'}</span>
            <button
              type="button"
              aria-label="Close"
              className={styles.tooltipClose}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              ✕
            </button>
          </div>
          <p className={styles.tooltipBody}>{details}</p>
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}

/**
 * Connector between steps within the same stage
 */
function PipelineConnector({ step, index }) {
  const stepNumber = step.step || index + 1;
  const actionText = step.actionText || step.label || step.connectorLabel;

  return (
    <div className={styles.connector}>
      {step.step ? (
        <div className={styles.arrowPill}>
          <span className={styles.stepNum}>{step.step}</span>
        </div>
      ) : (
        <div className={styles.arrowPill}>→</div>
      )}
      {actionText && <span className={styles.connectorText}>{actionText}</span>}
    </div>
  );
}

/**
 * Transition between two stages
 */
function StageTransition({ transition }) {
  if (!transition) return null;
  const label = typeof transition === 'string' ? transition : transition.label || transition.text;
  const badge = typeof transition === 'object' ? transition.badge : null;

  return (
    <div className={styles.stageTransition}>
      <div className={styles.stageTransitionLine} />
      <div className={styles.stageTransitionPill}>
        <span className={styles.stageTransitionArrow}>↓</span>
        {badge && <span className={styles.stageTransitionBadge}>{badge}</span>}
        <span className={styles.stageTransitionLabel}>{label}</span>
      </div>
      <div className={styles.stageTransitionLine} />
    </div>
  );
}

/**
 * FlowPipeline: Modern multi-stage interactive architecture visualizer.
 * 100% native Flexbox layout: Zero canvas, zero overlapping, seamless dark/light mode.
 */
export default function FlowPipeline({
  title,
  subtitle,
  stages = [],
  steps = [],
  nodes = [],
  legend = [],
}) {
  const resolvedSteps = steps && steps.length > 0 ? steps : nodes;
  // If stages are passed, render multi-stage architecture
  const hasStages = stages && stages.length > 0;
  const effectiveStages = hasStages
    ? stages
    : resolvedSteps && resolvedSteps.length > 0
    ? [{ id: 'default', steps: resolvedSteps }]
    : [];

  if (effectiveStages.length === 0) return null;

  const hasAnyDetails = effectiveStages.some((stage) =>
    (stage.steps || []).some((s) => s.details || s.detail)
  );

  return (
    <div className={styles.container}>
      {/* Blueprint Header */}
      {(title || subtitle) && (
        <div className={styles.header}>
          <div className={styles.titleBadge}>Architecture Flow</div>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {hasAnyDetails && (
            <div className={styles.hintText}>
              💡 Hover or click any card for deep-dive operational details
            </div>
          )}
        </div>
      )}

      {/* Stages Flow */}
      <div className={styles.stagesWrapper}>
        {effectiveStages.map((stage, stageIdx) => {
          const isLastStage = stageIdx === effectiveStages.length - 1;
          const stageThemeClass = styles[stage.color + 'Stage'] || '';

          return (
            <React.Fragment key={stage.id || stage.title || stageIdx}>
              {/* Stage Container */}
              <div className={`${styles.stageCard} ${stageThemeClass}`}>
                {/* Stage Header */}
                {(stage.title || stage.badge) && (
                  <div className={styles.stageHeader}>
                    {stage.icon && <span className={styles.stageIcon}>{stage.icon}</span>}
                    {stage.badge && <span className={styles.stageBadge}>{stage.badge}</span>}
                    {stage.title && <h4 className={styles.stageTitle}>{stage.title}</h4>}
                  </div>
                )}

                {/* Steps Pipeline inside Stage */}
                <div className={styles.pipeline}>
                  {(stage.steps || []).map((step, stepIdx) => {
                    const isLastStep = stepIdx === stage.steps.length - 1;
                    return (
                      <React.Fragment key={step.title || step.id || stepIdx}>
                        <PipelineNodeCard step={step} />
                        {!isLastStep && (
                          <PipelineConnector step={step} index={stepIdx} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Transition to next stage */}
              {!isLastStage && (
                <StageTransition transition={stage.transition} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Legend */}
      {legend && legend.length > 0 && (
        <div className={styles.legendContainer}>
          <span className={styles.legendTitle}>Key:</span>
          {legend.map((item, idx) => (
            <div key={idx} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: item.color || '#38bdf8' }}
              />
              <span className={styles.legendLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
