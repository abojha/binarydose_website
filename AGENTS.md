# Binary Dose Global Architectural Standards & Agent Guidelines

These standards govern all content, visual systems, and interactive tools across Binary Dose (`coredose`, `coding`, `algodose`, `100-days`). All agents, contributors, and automated processes MUST adhere strictly to these rules.

---

## 1. Mandatory Reusable Platform Components (AlgoDose)
Never duplicate or re-implement standard UI elements. Always import and reuse the shared components from `src/components/AlgoDose/`:
- **`VisualizerConfigCard`**: Primary input box, Apply button, 🎲 Randomize button, validation error alert banner, and secondary input controls (`children`).
- **`CanvasStatusBanner`**: Fixed 42px status pill bar above the canvas.
- **`PatternBlueprintCard`**: Unified header card for pattern dropdown, operation selection, and blueprint details.
- **`CustomDropdown`**: Unified accessible dropdown menu with smooth chevron transitions.
- **`PlayerControls`**: Bottom playback controls with speed selector, scrubber, step forward/backward, and play/pause.
- **`CodeSyncPanel`**: Right column containing synchronized code lines, `Step Intuition` prose, and live variables tracker.

---

## 2. AlgoDose Input Caps & Fluctuating Randomization
- Global visualizer cap is **7 items** (Linked Lists, Arrays, Sorting).
- Every visualizer MUST scale dynamically so that up to 7 items fit inside both mobile (360px–375px) and desktop with ZERO horizontal or vertical scrollbars and ZERO clipped edges.
- Length MUST dynamically fluctuate on randomize:
  ```javascript
  const length = MIN_CAP + Math.floor(Math.random() * (MAX_CAP - MIN_CAP + 1));
  ```
- If user enters `< MIN_CAP` or `> MAX_CAP`, display an explicit warning via `VisualizerConfigCard`'s `error` prop: `"Please enter between 2 and 7 numbers."`

---

## 3. Safe Git Protocol
- **NEVER** run `git commit` or `git push` without explicit user permission.

---

## 4. Testing Protocol & Build Discipline
- **DO NOT waste time re-running `npm start` or `npm run build` repeatedly.** The development server runs persistently in the background, and webpack hot-reloads CSS and MDX changes in ~1.5 seconds.
- **Never run headless browser automation or capture unsolicited screenshots.**
- Validate code and syntax cleanly, then prompt the user to inspect directly on their devices.

---

## 5. Universal Educational Diagram Architecture (Mandatory Platform Standard)

> **CORE PRINCIPLE**: **"Our goal is to provide the absolute best learning experience to our students so they grasp mental models in under 3 seconds."**
> Figures must be visually punchy, self-sufficient, and immediately informative so students understand the concept from the visual alone without reading walls of text.

### Universal Scope
This standard is **ABSOLUTE and MANDATORY** across the entire Binary Dose website — today and in the future:
* **`coredose/`** (Operating Systems, DBMS, Computer Networks, System Design, OOPs, COA, etc.)
* **`blog/`** (Technical deep-dives and engineering articles)
* **`100-days` / `interview/`** (Interview preparation roadmaps and conceptual guides)
* **`pyqs/` & `coding/`** (Problem explanations and architectural walk-throughs)

**RULE**: Static raw Mermaid SVG diagrams for architectural, structural, or conceptual illustrations are **STRICTLY PROHIBITED**. Raw Mermaid SVGs suffer from the *SVG ViewBox Scaling Trap* (narrow charts blow up into giant billboards at 100% zoom; wide charts shrink to unreadable micro-text). You must **ALWAYS** use our modern, responsive pure React educational diagram components.

---

### Global Availability & Zero-Import MDX Support
All educational diagram components are **globally registered in `src/theme/MDXComponents.js`**.
* **Zero MDX Imports**: In any `.mdx` file across the site, you can use `<ArchitectureStack ... />`, `<FlowPipeline ... />`, etc., directly **without writing any `import` statements at the top**.
* **Global Alias Barrel**: In React components or pages, import directly from `@site/src/components/Diagrams`:
  ```jsx
  import { FlowPipeline, ConceptComparison } from '@site/src/components/Diagrams';
  ```
* **Global Design Tokens**: All sizing, radiuses, transitions, and semantic light/dark mode color palettes (`blue`, `purple`, `cyan`, `amber`, `emerald`, `rose`) are governed centrally by `src/css/diagram-tokens.css` (imported into `src/css/custom.css`).

---

### The 7 Standard Diagram Components

#### 1. `<ArchitectureStack />` (Layered Hierarchy Component)
Used for all layered architectures (e.g. 4-Layer Computer System, Dijkstra's Layered OS, OSI 7-Layer Model, TCP/IP Stack, Database Engine Architecture).
* **Features**: Auto-height cards, max-width 760px, layer badges, color accents, icon, 1-line description, keyword chips, and interface transition badges (`connectorText`).
* **Usage**:
  ```jsx
  <ArchitectureStack
    title="The 4 Architectural Layers of a Computer System"
    subtitle="Hierarchical abstraction stack showing separation of concerns"
    layers={[
      {
        badge: "Layer 4",
        title: "End Users",
        icon: "👥",
        color: "purple",
        description: "Humans, automated tasks, and network clients.",
        items: ["Software Engineers", "CLI Operators", "GUI End-Users"],
        connectorText: "User Commands & Shell Scripts",
      },
    ]}
  />
  ```

#### 2. `<FlowPipeline />` (Horizontal-to-Vertical Node Pipeline)
Used for analogies, end-to-end data/control pipelines, stage-by-stage workflows, and batch transformations (e.g. Car Driving Analogy, Spooling Buffer Pipeline, Batch System Bundling, Distributed OS Cluster).
* **Features**: Responsive flex-wrap pipeline (horizontal on desktop, vertical on mobile), node badges, icons, punchy titles, 1-line micro-labels, and connecting directional arrows with optional labels (`connectorLabel`).
* **Usage**:
  ```jsx
  <FlowPipeline
    title="The Spooling Workflow Pipeline"
    subtitle="Decoupling fast CPUs from slow electromechanical peripherals via disk buffers"
    nodes={[
      {
        badge: "Input Devices",
        title: "Card Readers / Sockets",
        icon: "📥",
        color: "blue",
        description: "Concurrent data capture at device line-rate.",
        connectorLabel: "DMA Transfer",
      },
      {
        badge: "Intermediate",
        title: "Magnetic Disk Spool",
        icon: "💽",
        color: "purple",
        description: "High-speed circular FIFO queue on storage.",
        connectorLabel: "Batch Read",
      },
      {
        badge: "Processing",
        title: "CPU Execution Core",
        icon: "⚡",
        color: "emerald",
        description: "Continuous job processing without I/O wait stalls.",
      },
    ]}
  />
  ```

#### 3. `<ConceptComparison />` (Comparative Trade-Off Dual-Card)
Used for comparing two contrasting paradigms, hardware designs, or architectural trade-offs (e.g. Convenience vs Efficiency, Uniprogramming vs Multiprogramming, Monolithic vs Microkernel, SMP vs AMP, Hard RTOS vs Soft RTOS, Syscall vs eBPF).
* **Features**: Side-by-side auto-fit cards, badges, domain tags, bullet points with theme markers, and bottom philosophy quote blocks.
* **Usage**:
  ```jsx
  <ConceptComparison
    title="Monolithic Kernel vs Microkernel: Architectural Tradeoff"
    subtitle="The fundamental tension between monolithic speed and microkernel fault-isolation"
    concepts={[
      {
        badge: "Monolithic",
        title: "Monolithic Kernel (Linux)",
        icon: "🚀",
        color: "blue",
        domain: "General-Purpose OS (Linux, Windows)",
        points: ["All core subsystems run inside Ring 0", "Blazing-fast direct C function calls"],
        quote: "Raw execution speed outweighs theoretical modular isolation.",
      },
      {
        badge: "Microkernel",
        title: "Microkernel (Mach / QNX)",
        icon: "🛡️",
        color: "emerald",
        domain: "Mission-Critical Systems (Automotive, Aerospace)",
        points: ["Kernel stripped to bare essentials: IPC, Scheduling, Memory", "Drivers run in user space"],
        quote: "Formal correctness and zero downtime outweigh raw throughput.",
      },
    ]}
  />
  ```

#### 4. `<SubsystemGrid />` (Multi-Entity Subsystem Matrix)
Used for presenting 4 to 8 architectural subsystems, functional pillars, or engines (e.g. The 6 Core OS Subsystems: Process, Memory, File, I/O, Storage, Protection).
* **Features**: Responsive auto-fit grid (`repeat(auto-fit, minmax(280px, 1fr))`), icon badges, category tags, responsibility bullets, and monospace key API chips (`fork()`, `mmap()`, `open()`).
* **Usage**:
  ```jsx
  <SubsystemGrid
    title="The 6 Core Operating System Subsystems"
    subtitle="The essential functional pillars implemented by modern operating systems"
    items={[
      {
        icon: "⚡",
        title: "Process Management",
        tag: "CPU Virtualization",
        color: "blue",
        points: ["Creates, schedules, and terminates processes and threads."],
        syscalls: ["fork()", "execve()", "waitpid()"],
      },
    ]}
  />
  ```

#### 5. `<DualModeDiagram />` (Interactive State & Mode Switcher)
Used for hardware privilege boundaries (User Mode Ring 3 vs Kernel Mode Ring 0), mode bit toggling, and trap/system call transitions.
* **Features**: Interactive phase selector pills (Full Overview, Phase 1 to Phase 4), User Space (Mode Bit = 1) vs Kernel Space (Mode Bit = 0) cards, and non-crossing Trap and IRET return paths.
* **Usage**:
  ```jsx
  <DualModeDiagram
    title="CPU Dual-Mode Operation & Privilege Boundary"
    subtitle="Interactive state visualization: trace how the hardware mode bit protects system integrity"
  />
  ```

#### 6. `<ProcessFlow />` (Sequential Numbered Timeline)
Used for linear chronological workflows, historical evolution eras, and multi-step execution lifecycles.
* **Features**: Numbered circular step pills connected by vertical timeline lines, category tags, descriptions, and optional code snippets.
* **Usage**:
  ```jsx
  <ProcessFlow
    title="The 4 Eras of Operating System Evolution"
    subtitle="How architectural bottlenecks drove the transition across computing generations"
    steps={[
      {
        number: 1,
        title: "Serial Processing (1940s - 1950s)",
        tag: "Bare Metal Era",
        description: "Single user signed up for physical console time. Zero OS abstraction.",
      },
    ]}
  />
  ```

#### 7. `<ExecutionBlueprint />` (Actor-to-Actor Roundtrip Execution Trace)
Used for multi-actor execution roundtrips and call paths (e.g. User App $\to$ C Library $\to$ Trap $\to$ Kernel VFS $\to$ Device Driver $\to$ Hardware Controller and back).
* **Features**: Top actor pill bar with color-coded dot badges, step-by-step card stack showing `From -> To` routing, action titles, and 1-line operation details.
* **Usage**:
  ```jsx
  <ExecutionBlueprint
    title="Deep-Dive Execution Trace: printf('Hello, World!')"
    subtitle="Tracing the round-trip lifecycle of a standard library write call down to the physical screen"
    actors={[
      { name: "User Application", color: "#9333ea" },
      { name: "C Standard Library (glibc)", color: "#2563eb" },
      { name: "Kernel Syscall Handler", color: "#d97706" },
      { name: "Display Device Driver", color: "#059669" },
      { name: "GPU / Hardware Controller", color: "#dc2626" },
    ]}
    steps={[
      {
        step: 1,
        from: "User Application",
        to: "C Standard Library (glibc)",
        action: "printf() Invocation & User-Space Buffering",
        detail: "Formats strings into stdout line buffer without entering kernel space.",
      },
    ]}
  />
  ```

#### 8. `<CurriculumRoadmap />` (Sequential Multi-Phase Curriculum Tracker)
Used for course index roadmaps, learning tracks, and certification milestones (e.g. The 10-Module OS Roadmap, DBMS 4-Phase Roadmap, System Design Journey).
* **Features**: Responsive auto-fit phase cards (`Phase 1 of 4`), step indicators, module chip lists with `M01` badges and active link arrows, and bottom transition indicators (`Next: CPU Scheduling →`).
* **Usage**:
  ```jsx
  <CurriculumRoadmap
    title="The 10-Module Master Roadmap"
    subtitle="Progressive engineering track from bare-metal abstractions up to high-concurrency production kernels"
    phases={[
      {
        phase: "Phase 1",
        title: "Foundations & Architecture",
        icon: "🏗️",
        color: "purple",
        description: "Hardware abstractions and process foundations",
        modules: [
          { num: "01", title: "OS Architecture & Goals", url: "/coredose/os/chapter-01/what-is-an-operating-system-abstract-view-and-goals" },
          { num: "02", title: "Process Management & PCB" }
        ],
        connectorLabel: "CPU Scheduling",
      },
    ]}
  />
  ```

#### 9. `<CourseCurriculum />` (Unified Course Dashboard & Curriculum Explorer)
Used as the master entry-point dashboard for course landing pages (e.g. `coredose/os/index.mdx`, `coredose/dbms/index.mdx`).
* **Features**:
  - Timeless curriculum metadata strip (Modules count and Total Topics count).
  - Balanced 2-column responsive module card grid (`repeat(auto-fit, minmax(350px, 1fr))`).
  - Color-accented module headers, icons, and clean topic rows with active link indicators (`→`).
  - 100% future-proof: completely unbound by artificial phases or temporary "Live Now" development badges.
* **Usage**:
  ```jsx
  <CourseCurriculum
    subtitle="Comprehensive topic-by-topic curriculum covering all foundational principles and production kernel internals"
    modules={[
      {
        num: "01",
        title: "Introduction & OS Architecture",
        icon: "🏗️",
        color: "purple",
        description: "Core abstraction layers, dual-mode operations, and system call traps.",
        topics: [
          { num: "1.1", title: "What is an OS? Definition, Abstract View & Core Goals", url: "/coredose/os/chapter-01/what-is-an-operating-system-abstract-view-and-goals" },
          { num: "1.2", title: "Evolution of Operating Systems: Batch, Spooling & Multiprogramming", url: "/coredose/os/chapter-01/evolution-of-operating-systems-batch-spooling-multiprogramming" },
        ],
      },
    ]}
  />
  ```

#### 10. `<FlowGraph />` (Universal Generic Architecture & Multi-Domain Flow Visualizer)
The flagship, 100% generic diagram component for Binary Dose across ANY subject (OS, DBMS, Computer Networks, System Design, Data Structures).
* **Features**:
  - **Universal Geometry**: Supports horizontal, vertical, and multi-tier grid layouts with percentage positioning (`x: "20%"`, `y: "40%"`) or automatic lane/column distribution.
  - **Collision-Free Reciprocal Edge Geometry**: Opposing edges ($A \to B$ and $B \to A$) automatically curve in opposite directions with labels placed at opposing apexes, guaranteeing zero label or card collisions.
  - **Bidirectional Links (`direction: "bi"`)**: Native dual-arrowhead support (`<────────>`) with clean label formatting (`◀ prev • next ▶`) for Doubly-Linked Lists and symmetric interfaces.
  - **Interactive Step Player & Stepper**: `[◀ Prev]` and `[Next ▶]` controls allow students to step through complex workflows chronologically with glowing active highlights.
  - **Dual-Mode Mobile Layout**: On mobile ($\le 768\text{px}$), defaults to a thumb-friendly vertical **📱 Steps** card sequence with an instant toggle to the full **🗺️ Map**.
  - **HTML `<foreignObject>` Cards**: High-DPI text cards with icons, badges, titles, and sublabels that seamlessly adapt to dark/light themes.

#### 11. `<StateTransitionDiagram />` (Interactive State & Transition Matrix Explorer)
Used for process lifecycle states, multiprogramming transitions, and virtual memory swapping models (e.g. 5-State Multiprogramming Model, 7-State Swapping Model with Blocked-Suspended and Ready-Suspended).
* **Features**:
  - Interactive tabs switching between standard 5-State and 7-State Swapping models.
  - Interactive state card inspector: Clicking any state highlights its exact RAM/Disk residency, CPU dispatch status, governing scheduler (LTS, STS, MTS), and permissible forward transitions.
  - Comprehensive Transition Matrix table detailing exact transition triggers, system calls, and interrupt handlers.

#### 12. `<ProcessMemoryMap />` (Strict 4-Section Virtual Address Space Map)
Used exclusively for process virtual memory layout, stack vs. heap expansion, and memory management architectures.
* **Features**:
  - **Memory Address Axis**: Visual vertical rail from `0xFFFFFFFF` (High Memory) down to `0x00000000` (Low Memory / Base).
  - **Strict Rule of 4 Sections**: Displays the **4 official sections** (`Stack`, `Heap`, `Data`, `Text`).
  - **Unallocated Growth Buffer (Not a Fake 5th Section)**: The space between Stack and Heap is visually rendered as a slim unallocated buffer with opposing directional indicators (`Stack grows Downward ⬇` vs `⬆ Heap grows Upward`).
  - **Zero Vague Connectors**: No meaningless "Interacts with" labels.
* **Usage**:
  ```jsx
  <ProcessMemoryMap
    title="Process Virtual Address Space Architecture"
    subtitle="Standard 4-Section Memory Organization from High Memory (0xFFFFFFFF) to Low Memory (0x00000000)"
  />
  ```

#### 13. `<FlowDiagram />` (Interactive Architecture & Pipeline State Diagram)
Used across Operating Systems (and other CoreDose subjects) for process lifecycle flows, memory-to-CPU dispatch pipelines, PCB organization, and scheduler interaction architectures.
* **Features**:
  - **Dynamic Subgraph Domains**: Supports grouping nodes into visual domains (e.g. `Secondary Storage`, `Main Memory (RAM)`, `CPU Core`) with configurable header placement (`position: "top"` or `position: "bottom"`). Bottom domain headers automatically receive safety headroom (`54px+`) to prevent collision with cards.
  - **Dual-Lane & Multi-Port Routing**: Supports fractional port offsets (`fromPortOffset`, `toPortOffset` from `0.0` to `1.0`) so opposing edges (e.g. `STS Dispatch` vs `Timer Preempt`) travel along clean, non-colliding parallel lanes into different sections of a node card.
  - **Native HD Pan on Mobile**: Defaults strictly to a 1:1 unscaled native resolution view on phones with silky-smooth horizontal swiping. Eliminates font shrinkage, unreadable text, and tiny tap targets.
  - **Strict Zero-Vertical-Scrollbar Rule**: Built with `overflow-y: hidden !important` and `touch-action: pan-x` so vertical finger swipes pass directly to page scrolling without trapping the user's thumb.
  - **Interactive Node & Edge Inspector**: Hovering or tapping any card or numbered transition arrow opens the dedicated bottom inspector console displaying operational mechanics, system calls, and register state transitions.
* **Usage**:
  ```jsx
  <FlowDiagram
    title="The Standard 5-State Process Lifecycle Model"
    subtitle="End-to-end execution flow, timer preemption loop, and asynchronous I/O wait queues"
    domains={[
      { id: "storage", title: "Secondary Storage", color: "purple", icon: "💾", position: "bottom" },
      { id: "ram_cpu", title: "Main Memory & CPU Core", color: "emerald", icon: "⚡", position: "bottom" }
    ]}
    nodes={[
      { id: "new", domain: "storage", col: 0, row: 0, title: "New State", sublabel: "Process Created", badge: "Job Pool", icon: "💾", color: "purple" }
    ]}
    edges={[
      { from: "new", to: "ready", fromPort: "right", toPort: "left", step: "1", label: "Admit (LTS)" }
    ]}
  />
  ```

#### 14. `<GanttChart />` (Interactive CPU Scheduling Gantt Timeline)
Used across CPU Scheduling (and real-time systems) for visualizing process execution timelines, context-switching points, and idle intervals.
* **Features**:
  - Proportional duration time slots with automatic or custom color assignment (`blue`, `emerald`, `amber`, `purple`, `rose`, `cyan`, `gray`).
  - Native idle interval support (`isIdle: true`) rendering accessible hatched diagonal stripes.
  - Boundary time ticks cleanly aligned to slot start/end points.
  - Optional summary metric pills strip (Average TAT, Average WT, Throughput, CPU Utilization).
  - Mobile-responsive horizontal track with zero text clipping.
* **Usage**:
  ```jsx
  <GanttChart
    title="CPU Execution Gantt Chart"
    subtitle="Timeline showing non-preemptive execution from t = 0 to t = 12 ms"
    slots={[
      { process: "P1", start: 0, end: 4, color: "blue", sublabel: "Burst: 4ms" },
      { process: "P2", start: 4, end: 7, color: "emerald", sublabel: "Burst: 3ms" },
      { process: "P3", start: 7, end: 12, color: "purple", sublabel: "Burst: 5ms" },
    ]}
    metrics={[
      { label: "Avg TAT", value: "6.67 ms" },
      { label: "Avg WT", value: "2.67 ms" },
      { label: "Throughput", value: "0.25 jobs/ms" },
      { label: "CPU Utilization", value: "100%" },
    ]}
  />
  ```

#### 15. `<DiskSchedulingChart />` (Interactive Disk Actuator Arm Trajectory Visualizer)
Used across Storage & Disk Scheduling for visualizing head movement trajectories across disk cylinders (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK).
* **Features**:
  - Horizontal cylinder ruler with auto-sorted tick marks, boundary limits, and vertical guideline columns.
  - Step-by-step vector trajectory with directional arrowheads, seek distance delta badges (`Δ 45`, `Δ 85`), and boundary reversal markers.
  - Express Return support (`isJump: true`) rendering dashed return flights with separate return distance badges.
  - Summary metric pills (Total Head Movement, Average Seek Distance, Requests Serviced, Traversal Direction).
* **Usage**:
  ```jsx
  <DiskSchedulingChart
    title="FCFS Disk Head Trajectory"
    subtitle="Erratic head oscillations across disk cylinders"
    color="blue"
    minCylinder={0}
    maxCylinder={199}
    sequence={[53, 98, 183, 37, 122, 14, 124, 65, 67]}
  />
  ```

---

### "Self-Explanatory & Zero Confusion" Pedagogical Diagram Rules
Every diagram component (existing or newly created) MUST adhere strictly to these rules:
1. **Never Use Vague Connector Labels (No "Interacts with")**: Every edge or connector arrow MUST state the concrete action, system call, hardware interrupt, or transition trigger (e.g. `Admit (LTS)`, `execve()`, `Timer Preempt`, `I/O Complete`). Never default to or write generic phrases like "Interacts with". If items are side-by-side or non-interactive peers, use `<SubsystemGrid />` or set `showConnectors={false}`.
2. **Sub-3-Second Mental Model**: The student must understand the core concept just by scanning the figure.
3. **Numbered Step Badges on Flows**: Any diagram showing a sequence, lifecycle, or multi-step execution MUST number its transitions (`1`, `2`, `3`...). Readers must never be left guessing where the flow begins.
4. **Strict 4 Sections for Process Address Space**: A process has strictly 4 sections: `Text`, `Data`, `Heap`, and `Stack`. Never render the unallocated growth gap as an active section card.
5. **No Looping GIFs (Vector Code Exclusively)**: Never use raw raster GIF animations. GIFs cause loop fatigue, destroy LCP page performance, clash with dark/light themes, and cannot be paused or inspected. Pure SVG/React vector components provide crisp rendering at 0.01s load times.
6. **100% Mobile Readability**: Diagrams must default to a clean vertical card sequence on mobile ($\le 768\text{px}$) with 14px+ typography, zero text truncation, and zero horizontal scroll traps.
7. **Theme Synchronized**: Never hardcode colors that break in Dark Mode. All text, borders, and fills must seamlessly adapt to Docusaurus `[data-theme='dark']`.

## 6. CoreDose Course & Lesson Architectural Standards
All course lessons in `binary_dose/coredose/` (for OS, DBMS, CN, System Design, OOPs, COA, Compiler) MUST follow this locked standard:

### Source Priority
1. **Priority 1 (HIGHEST - Ground Truth)**: **Images of User's Handwritten Notes** (`Hand Written Notes - <Subject>/IMAGES/` or user's note repository). Sequence modules strictly matching handwritten notes.
2. **Priority 2**: **Core Computer Science Theory & Standard Academic Syllabi** (Silberschatz, Galvin, Kurose-Ross, Tanenbaum).
3. **Priority 3 (LOWEST)**: **AI Supplementary Knowledge** used strictly for modern production context and clean code snippets.

### Strict Universal Editorial Rules
- **Standardized on "Module"**: Always use **Module** (e.g. `Module 01`, `Module 02`). Never use "Chapter" in titles, roadmap cards, or breadcrumbs.
- **Generic & Timeless**: No exam names, specific years, PYQ tags, or marks badges (no "GATE-2018", "7 Marks").
- **No MCQs / MSQs with Option Letters**: All questions must be standard university semester descriptive questions:
  ```markdown
  **Question 1:** ...
  **Answer:** ...
  ```
- **Semantic H1**: Every `.mdx` lesson MUST have an explicit Markdown `# Title` heading placed directly above `<CoreDoseLessonHeader />`.
- **Never Leak Internal Meta-Phrases**: Never use phrases like "handwritten notes", "from my notes", or "according to handwritten notes" in student-facing titles, admonitions, or body copy. The platform must read as an authoritative, timeless, professional computer science publication.
- **Navigation**: Always terminate with `<CoreDoseNav prev={...} next={...} courseUrl="/coredose/<subject>" />` using exact clean permalinks.
- **Navigation Robustness**: `<CoreDoseNav />` supports both `prev` and `previous`, and `next`. It must ALWAYS link backward to the exact chronological prior topic (e.g. 2.4 links to 2.3, 2.3 to 2.2, 2.2 to 2.1) and never fall back to the Master Index when a valid prior lesson exists.
- **Operating Systems Course Progress**:
  - **Module 01: Introduction & OS Architecture** (Topics 1.1, 1.2, 1.3, 1.4) — `COMPLETED`
  - **Module 02: Process Management & PCB** (Topics 2.1, 2.2, 2.3, 2.4) — `COMPLETED`
  - **Module 03: CPU Scheduling Algorithms** (Topics 3.1, 3.2, 3.3, 3.4, 3.5, 3.6) — `COMPLETED`
  - **Module 04: Process Synchronization & Concurrency** (Topics 4.1 to 4.7) — `COMPLETED`
  - **Module 05: Deadlocks: Detection, Prevention & Avoidance** (Topics 5.1 to 5.5) — `COMPLETED`
  - **Module 06: UNIX System Calls & Fork Mechanics** (Topics 6.1 to 6.5) — `COMPLETED`
  - **Module 07: Main Memory Management** (Topics 7.1 to 7.7) — `COMPLETED`
  - **Module 08: Virtual Memory & Page Replacement** (Topics 8.1 to 8.5) — `COMPLETED`
  - **Module 09: Storage & Disk Scheduling** (Topics 9.1 to 9.4) — `COMPLETED`
  - **Module 10: File Systems & Inodes** (Topics 10.1 to 10.4) — `COMPLETED`
  - **Operating Systems Full Curriculum (Modules 01 - 10)**: `100% COMPLETED` 🎉

---

## 7. Locked Lesson Structure
1. **Frontmatter**: `title`, `description`, `hide_table_of_contents: true`.
2. **Semantic H1 Heading**: `# {Lesson Title}`
3. **Lesson Header**: `<CoreDoseLessonHeader module="Module XX: ..." topic="Topic X.Y" ... />`
4. **`💡 Core Intuition`**:
   - `### 🍳 The Everyday Analogy: ...`
   - `### 💻 Bridging to Computer Science`
5. **`Inline Navigation (<CoreDoseTOC toc={toc} />)`**
6. **`📚 Core Deep-Dive & Concepts`** (Handwritten notes first, rigorous derivations, KaTeX math).
7. **`📐 Architecture / Visual Blueprint`** (Using our Modern React Diagram Components or clean sequence diagrams).
8. **`🏭 In The Real World: Production Case Study`** (Real-world cloud/systems engineering context).
9. **`🎯 Exam & Interview Pitfall Check`** (`:::tip Core Conceptual Questions` + `:::warning Common Interview Traps`).
10. **`Navigation Component`**: `<CoreDoseNav ... />`
