import React, { useState } from 'react';
import styles from './ProcessMemoryMap.module.css';

const DEFAULT_SECTIONS = [
  {
    id: 'stack',
    name: 'Stack Section',
    badge: 'High Memory',
    color: 'purple',
    growth: 'down',
    growthText: 'Grows Downward ⬇',
    description: 'Stores function activation records: parameters, return addresses, local variables, and saved frame pointers (%rbp). Managed automatically via LIFO discipline.',
    chips: ['Local Variables', 'Return Addresses', 'Function Parameters', 'Stack Pointer %rsp'],
    permissions: 'Read / Write (rw-)',
    manager: 'CPU Hardware (SP Register)',
  },
  {
    id: 'heap',
    name: 'Heap Section',
    badge: 'Runtime Dynamic',
    color: 'amber',
    growth: 'up',
    growthText: 'Grows Upward ⬆',
    description: 'Dynamically requested memory at runtime via malloc(), calloc(), realloc(), or operator new. Managed via brk() / sbrk() syscalls until explicitly freed.',
    chips: ['malloc() / calloc() / new', 'brk() / sbrk() Syscalls', 'Dynamic Arrays & Trees', 'Explicit free()'],
    permissions: 'Read / Write (rw-)',
    manager: 'Programmer / Heap Allocator',
  },
  {
    id: 'data',
    name: 'Data Section',
    badge: 'Static (Fixed)',
    color: 'cyan',
    growth: 'none',
    growthText: 'Fixed Size',
    description: 'Contains global and static variables. Divided into Initialized Data (.data, non-zero values stored in ELF) and BSS (.bss, zero-initialized by OS in RAM).',
    chips: ['Global Variables', 'Static Variables', 'Initialized (.data)', 'Zero-filled (.bss)'],
    permissions: 'Read / Write (rw-)',
    manager: 'Compiler & OS Loader',
  },
  {
    id: 'text',
    name: 'Text Section (Code)',
    badge: 'Low Memory (Base)',
    color: 'emerald',
    growth: 'none',
    growthText: 'Fixed Size',
    description: 'Raw compiled binary machine code (CPU opcodes). Marked Read-Only (r-x) to prevent accidental mutation, and shareable across concurrent processes.',
    chips: ['Machine OpCodes', 'Read-Only (r-x)', 'Shared Physical Frames', 'Program Counter Target'],
    permissions: 'Read + Execute (r-x)',
    manager: 'OS Loader & MMU',
  },
];

/**
 * ProcessMemoryMap: Sleek, interactive virtual address space layout.
 * Strictly 4 solid cards (Stack, Heap, Data, Text) with a slim, subtle unallocated growth gap.
 * Includes interactive inspection for deeper understanding without visual clutter.
 */
export default function ProcessMemoryMap({
  title = "Process Virtual Address Space Architecture",
  subtitle = "Hierarchical memory organization from High Memory (0xFFFFFFFF) down to Low Memory (0x00000000)",
  sections = DEFAULT_SECTIONS,
}) {
  const [activeSectionId, setActiveSectionId] = useState('stack');
  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];

  const stackSec = sections.find((s) => s.id === 'stack') || sections[0];
  const heapSec = sections.find((s) => s.id === 'heap') || sections[1];
  const otherSecs = sections.filter((s) => s.id !== 'stack' && s.id !== 'heap');

  const renderCard = (sec) => {
    const isSelected = activeSection.id === sec.id;
    const colorClass = styles[`color${sec.color ? sec.color.charAt(0).toUpperCase() + sec.color.slice(1) : 'Blue'}`];

    return (
      <div
        key={sec.id}
        className={`${styles.sectionCard} ${colorClass} ${isSelected ? styles.cardSelected : ''}`}
        onClick={() => setActiveSectionId(sec.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveSectionId(sec.id);
          }
        }}
      >
        <div className={styles.cardTopRow}>
          <div className={styles.nameAndBadge}>
            <span className={styles.colorIndicator} />
            <h4 className={styles.sectionName}>{sec.name}</h4>
          </div>
          <span className={styles.growthBadge}>{sec.growthText}</span>
        </div>

        <p className={styles.cardDesc}>{sec.description}</p>

        {sec.chips && sec.chips.length > 0 && (
          <div className={styles.chipRow}>
            {sec.chips.map((chip, idx) => (
              <span key={idx} className={styles.chip}>
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitleBlock}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      {/* Main Body: Memory Address Rail + 4 Section Cards */}
      <div className={styles.body}>
        {/* Address Axis Rail */}
        <div className={styles.addressRail}>
          <div className={styles.addrMarker}>
            <span className={styles.addrHex}>0xFFFFFFFF</span>
            <span className={styles.addrLabel}>High Memory</span>
          </div>
          <div className={styles.railTrack}>
            <div className={styles.railLine} />
            <span className={styles.railDirection}>Addresses Decrease ⬇</span>
          </div>
          <div className={styles.addrMarker}>
            <span className={styles.addrHex}>0x00000000</span>
            <span className={styles.addrLabel}>Low Memory (Base)</span>
          </div>
        </div>

        {/* Section Cards Stack */}
        <div className={styles.stackColumn}>
          {/* 1. Stack Section */}
          {renderCard(stackSec)}

          {/* SLIM UNALLOCATED GROWTH GAP (Compact 38px, NOT a 5th card) */}
          <div className={styles.growthGap}>
            <span className={styles.gapArrowDown}>⬇ Stack expands</span>
            <span className={styles.gapLabel}>Unallocated Virtual Address Space</span>
            <span className={styles.gapArrowUp}>⬆ Heap expands</span>
          </div>

          {/* 2. Heap Section */}
          {renderCard(heapSec)}

          {/* 3. Data & 4. Text Sections */}
          {otherSecs.map((sec) => renderCard(sec))}
        </div>
      </div>

      {/* Interactive Section Inspector Bar */}
      <div className={styles.inspectorBar}>
        <div className={styles.inspectorHeader}>
          <span className={styles.inspectorTag}>Selected: {activeSection.name}</span>
          <span className={styles.inspectorPermissions}>
            🔒 <strong>Access:</strong> {activeSection.permissions}
          </span>
          <span className={styles.inspectorManager}>
            ⚙️ <strong>Governed by:</strong> {activeSection.manager}
          </span>
        </div>
      </div>
    </div>
  );
}
