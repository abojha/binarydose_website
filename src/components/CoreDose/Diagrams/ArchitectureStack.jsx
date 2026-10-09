import React from 'react';
import styles from './ArchitectureStack.module.css';

/**
 * ArchitectureStack: Renders a modern, responsive, multi-tier architectural stack.
 * Ideal for OS 4-Layer system, OSI 7-Layer model, TCP/IP stack, storage engine hierarchies.
 */
export default function ArchitectureStack({ title, subtitle, layers = [], showConnectors = true }) {
  if (!layers || layers.length === 0) return null;

  const colorMap = {
    purple: styles.colorPurple,
    cyan: styles.colorCyan,
    blue: styles.colorBlue,
    emerald: styles.colorEmerald,
    amber: styles.colorAmber,
    rose: styles.colorRose,
  };

  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.stack}>
        {layers.map((layer, index) => {
          const colorClass = colorMap[layer.color] || styles.colorBlue;
          const isLast = index === layers.length - 1;
          const renderConnector = showConnectors && layer.connectorText !== false && !isLast;

          const cardTitle = layer.title || layer.name;
          const cardDesc = layer.description || layer.role;
          const cardItems = layer.items || (Array.isArray(layer.components) ? layer.components.map(c => typeof c === 'string' ? c : `${c.name || ''}${c.desc ? ` (${c.desc})` : ''}`) : []);

          return (
            <React.Fragment key={layer.badge || cardTitle || index}>
              <div className={`${styles.layerCard} ${colorClass}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.badgeAndTitle}>
                    {layer.badge && <span className={styles.badge}>{layer.badge}</span>}
                    <h4 className={styles.cardTitle}>{cardTitle}</h4>
                  </div>
                  {layer.icon && <span className={styles.cardIcon}>{layer.icon}</span>}
                </div>

                {cardDesc && (
                  <p className={styles.cardDescription}>{cardDesc}</p>
                )}

                {cardItems && cardItems.length > 0 && (
                  <div className={styles.itemsRow}>
                    {cardItems.map((item, idx) => (
                      <span key={idx} className={styles.chip}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {renderConnector && (
                <div className={styles.connectorWrapper}>
                  <div className={styles.connectorLine} />
                  {layer.connectorText ? (
                    <div className={styles.connectorBadge}>
                      <span className={styles.connectorArrow}>↓</span>
                      <span>{layer.connectorText}</span>
                    </div>
                  ) : (
                    <div className={styles.connectorBadge}>
                      <span className={styles.connectorArrow}>↓</span>
                    </div>
                  )}
                  <div className={styles.connectorLine} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
