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

#### 10. `<FlowGraph />` (RETIRED / DEPRECATED — DO NOT USE)
> ⚠️ **STRICTLY RETIRED**: **DO NOT USE `<FlowGraph />` in any new or existing lessons.**  
> `<FlowGraph />` has been completely superseded by **`<FlowDiagram />` (Component #13)**. `<FlowDiagram />` provides the active production standard featuring a dynamic `ResizeObserver` container sandbox engine, dynamic headroom allocation preventing top-arching loop clipping, a constant-height zero-jitter bottom inspector console, multi-port fractional offset routing (`fromPortOffset`, `toPortOffset`), and a native mobile dual-mode HD pan engine. All 2D topologies, state machines, and architecture flows MUST use `<FlowDiagram />`.

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

#### 16. `<ProtocolLadder />` (Interactive Space-Time Protocol Ladder & Packet Sequence Visualizer)
Used across Computer Networks, Web Development, and Distributed Systems for visualizing packet exchange timelines across side-by-side vertical lifelines (Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ, TCP 3-Way Handshake, TCP 4-Way Teardown, Fast Retransmit, HTTP/REST roundtrips, TLS Handshakes).
* **Features**:
  - **Side-by-Side Vertical Lifelines**: Renders 2 or 3 actor columns (Sender/Receiver, Client/Server, Client/Proxy/Server) with vertical time axes ($t \downarrow$).
  - **Slanted Packet Flight Vectors**: Downward diagonal rays capturing physical transmission and propagation delay ($T_t + T_p$) with directional arrowheads, numbered step badges (`#1`, `#2`...), and packet metadata pills.
  - **Loss & Error Diagnostics**: Native support for lost packets (`status: "lost"` terminates at 50% distance with a red `❌ Lost in Transit` marker) and corrupted frames (`status: "corrupted"` arrives with amber `⚠️ CRC Error (Discard)` badge).
  - **Actor Lifeline Events & Timers**: Renders local events on actor timelines, including retransmission timer brackets with clock indicators (`⏰ Timer Expires (2·Tp)`), window sliding transitions, and protocol state changes (`SYN_SENT` $\to$ `ESTABLISHED`).
  - **Integrated Sliding Window Buffer Strip**: Top visual buffer showing sender and receiver window slots (`[0] [1] [2] [3]`) color-coded by state (`acked`, `sent`, `usable`, `blocked`) with active frame synchronization.
  - **Interactive Step Stepper & Inspector**: `[◀ Prev]`, `[Next ▶]`, and Auto-Play with bottom educational console detailing the exact operational mechanics of the selected step.
  - **Dual-Mode Mobile Layout**: Toggles seamlessly between full vector space-time ladder (`🗺️ Ladder`) and mobile-friendly vertical cards (`📱 Steps`).
* **Usage**:
  ```jsx
  <ProtocolLadder
    title="Stop-and-Wait ARQ: Lost Frame & Timeout Retransmission"
    subtitle="Space-time protocol ladder showing transmission delay, propagation delay, timeout timer, and recovery"
    actors={[
      { id: "sender", label: "Sender (Host A)", icon: "📡", role: "Transmitter", color: "blue" },
      { id: "receiver", label: "Receiver (Host B)", icon: "📥", role: "Receiver", color: "emerald" },
    ]}
    windowState={{
      title: "Stop-and-Wait 1-Bit Buffer Window",
      sender: { label: "Sender Window", size: 1, slots: [{ seq: 0, status: "sent", badge: "In Flight" }, { seq: 1, status: "usable" }] },
      receiver: { label: "Receiver Window", size: 1, slots: [{ seq: 0, status: "usable", badge: "Expecting" }, { seq: 1, status: "blocked" }] }
    }}
    steps={[
      {
        from: "sender",
        to: "receiver",
        label: "Frame 0",
        sublabel: "seq=0, Tt=1ms",
        color: "blue",
        status: "lost",
        details: "Sender transmits Frame 0 and starts its local retransmission timer. The frame is dropped in transit due to physical channel noise.",
      },
      {
        actor: "sender",
        isEvent: true,
        eventType: "timeout",
        spanSteps: 1,
        label: "Timer Expires (2·Tp)",
        sublabel: "Retransmit Frame 0",
        color: "rose",
        details: "Sender's retransmission timer expires after waiting 2·Tp without receiving an ACK. The sender initiates automatic retransmission of Frame 0.",
      },
      {
        from: "sender",
        to: "receiver",
        label: "Frame 0 (Retransmit)",
        sublabel: "seq=0 (Duplicate)",
        color: "blue",
        status: "success",
        details: "Sender retransmits Frame 0. Frame arrives intact at the receiver, which verifies the CRC checksum and accepts the data payload.",
      },
      {
        from: "receiver",
        to: "sender",
        label: "ACK 1",
        sublabel: "Expecting Frame 1",
        color: "emerald",
        status: "success",
        details: "Receiver acknowledges receipt of Frame 0 and advertises that it is now expecting Frame 1.",
      },
    ]}
  />
  ```

#### 17. `<ContentionTimeline />` (Medium Access Contention & Channel Timeline)
Used for shared medium access protocols (e.g. Pure ALOHA, Slotted ALOHA, CSMA contention windows, reservation channels).
* **Features**:
  - Multi-station horizontal timeline tracks with station indicators.
  - Mode toggle: `"pure"` (continuous timeline with $2 T_t$ vulnerable window) vs `"slotted"` (synchronized slot columns with $1 T_t$ vulnerable window).
  - Dynamic frame status badges: `💥 Collision` (red) vs `✅ Delivered` (green).
  - Live inspector strip displaying collision diagnostics, bit overlaps, and protocol mechanics.
* **Usage**:
  ```jsx
  <ContentionTimeline
    title="Pure ALOHA Contention Timeline"
    subtitle="Continuous asynchronous transmissions causing frame collisions"
    mode="pure"
    vulnerableWindowLabel="2 × Tt"
    stations={[
      { id: 'S1', label: 'Station 1', color: 'blue' },
      { id: 'S2', label: 'Station 2', color: 'purple' },
    ]}
    frames={[
      { id: 'f1', station: 'S1', start: 1, duration: 1, label: 'Frame 1', status: 'collision', details: 'Collides with Station 2.' },
      { id: 'f2', station: 'S2', start: 1.5, duration: 1, label: 'Frame 2', status: 'collision', details: 'Collides with Station 1.' },
    ]}
  />
  ```

#### 18. `<FrameFormat />` (Hardware Packet & Frame Header Inspector)
Used for data-link and network layer frame/packet headers (e.g. Ethernet IEEE 802.3, Ethernet II, Token Ring, IPv4, TCP).
* **Features**:
  - Horizontal hardware byte sequence strip with clean color coding.
  - Byte sizes, bit patterns (`10101011`), and layer badges.
  - Interactive click and hover to inspect field definitions, RFC rules, and physical mechanics in the live inspector strip.
* **Usage**:
  ```jsx
  <FrameFormat
    title="Standard Ethernet (IEEE 802.3) Frame Format"
    subtitle="Byte structure of an Ethernet MAC frame on the physical wire"
    totalSizeBytes="64 to 1518 Bytes"
    fields={[
      { name: "Preamble", size: "7", unit: "Bytes", color: "gray", bitPattern: "10101010...", description: "Clock synchronization square wave." },
      { name: "SFD", size: "1", unit: "Byte", color: "amber", bitPattern: "10101011", description: "Start Frame Delimiter." },
      { name: "Dest MAC", size: "6", unit: "Bytes", color: "blue", description: "Destination physical hardware address." },
      { name: "Data Payload", size: "46 - 1500", unit: "Bytes", color: "emerald", description: "Encapsulated network layer packet." },
      { name: "CRC-32", size: "4", unit: "Bytes", color: "purple", description: "Frame check sequence." },
    ]}
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
8. **Zero Viewport Bleed & Hard 4-Card Horizontal Cap**:
   - The Docusaurus reading column with sidebar and TOC open is ~750px–850px wide.
   - Any horizontal pipeline (`<FlowPipeline />`) is strictly capped at **maximum 4 nodes** per horizontal row. Placing 5+ nodes in a single row without stages is **STRICTLY PROHIBITED** as it forces horizontal overflow past the viewport margin.
   - When a sequence has 5 or more steps, you MUST either:
     - Group them into labeled semantic stages using the `stages` prop (`stage 1` $\to$ `stage 2`).
     - Use `<ProcessFlow />` (vertical numbered timeline).
     - Use `<ArchitectureStack />` (for vertical hierarchical stacks).
   - All diagram containers must enforce internal overflow protection (`overflow-x: auto`) and responsive stacking at `max-width: 996px` so no card or arrow ever bleeds outside the page.
9. **Systematic Diagram Selection Framework (Strict Multi-Criteria Evaluation — NO FCFS SELECTION)**:
   > **CRITICAL RULE: NEVER USE FCFS (First-Come-First-Served) SELECTION BIAS.**  
   > Never lazily pick the first diagram component that comes to mind or force an architectural concept into an ill-fitting component just because it is familiar.  
   > **MANDATORY PROTOCOL**: Before writing any diagram, you MUST systematically compare the concept's mathematical/topological conditions against **ALL available diagram components** across the platform, evaluating dimensionality (1D vs 2D), time-dependency (space-time vector vs chronological state), actor interaction, and data encapsulation. Only select the component whose native geometry perfectly matches the concept's real-world behavior:
   
   - **2D Topologies, Interconnected Network Graphs & Cyclic Loops**: Use `<FlowDiagram />` (**MANDATORY**).
     * **DO NOT USE `<FlowGraph />`** (`<FlowGraph />` is retired and strictly prohibited).
     * Use `<FlowDiagram />` for all network topologies (Mesh, Star, Bus, Ring, Tree, Hybrid), process lifecycle states (5-state/7-state models), CPU dispatcher loops, and supervisory control topologies (e.g. 5 Data Communication Components with Protocol overseeing Sender/Medium/Receiver). Features dynamic ResizeObserver sandboxing, 86px top headroom allocation preventing loop clipping, constant-height zero-jitter inspector consoles, fractional multi-port offsets (`fromPortOffset`, `toPortOffset`), and mobile HD pan.
   - **Time-Sequence Packet Flights, Handshakes & Sliding Window Protocols**: Use `<ProtocolLadder />` (**MANDATORY**).
     * Use for Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ, TCP 3-Way Handshake, TCP 4-Way Teardown, and Client-Server web handshakes. Displays vertical lifelines with downward-slanted packet vectors ($T_t + T_p$), timeout brackets, packet drop/corruption markers, and synchronized sliding window buffers.
   - **Hardware Packet, Frame & Segment Headers**: Use `<FrameFormat />` (**MANDATORY**).
     * Use for Ethernet (IEEE 802.3 / Ethernet II), Token Ring, IPv4/IPv6 datagrams, TCP/UDP headers, and ARP packets with byte-by-byte visual layouts, bit sequences, and interactive field inspectors.
   - **Shared-Medium Access & Contention Windows**: Use `<ContentionTimeline />` (**MANDATORY**).
     * Use for Pure ALOHA, Slotted ALOHA, CSMA/CD, CSMA/CA, and backoff contention windows with vulnerable time spans ($2 T_t$ vs $1 T_t$) and collision overlap diagnostics.
   - **CPU Scheduling & Real-Time Timelines**: Use `<GanttChart />` (**MANDATORY**).
     * Use for CPU scheduling algorithms (FCFS, SJF, SRTF, Round Robin, Priority, Multilevel Feedback Queue), process execution slots, idle interval diagonal hatching, and turnaround/waiting metric badges.
   - **Storage Arm & Cylinder Trajectories**: Use `<DiskSchedulingChart />` (**MANDATORY**).
     * Use for disk arm head movement across disk cylinders (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK) with seek delta badges and express reversal jumps.
   - **Layered Abstraction & Concentric Physical Cross-Sections**: Use `<ArchitectureStack />` (**MANDATORY**).
     * Use for OSI 7-Layer Model, TCP/IP 4-Layer/5-Layer Model, PDU encapsulation/decapsulation wrappers, and concentric physical cable cross-sections (Coaxial, Twisted Pair, Fiber Optic core/cladding/jacket).
   - **Directional 1D Linear Sequences ($\le 4$ steps)**: Use `<FlowPipeline />`.
     * Strictly for 1-way physical progressions with 4 or fewer cards per row (e.g. Total Internal Reflection ray path, subsea cable repeaters, signal modulation). Any 5+ step sequence must use semantic stages or vertical `<ProcessFlow />`.
   - **Contrasting Trade-Offs (2 or 3 Competing Paradigms)**: Use `<ConceptComparison />`.
     * Use for Simplex vs Half-Duplex vs Full-Duplex, Point-to-Point vs Multipoint, Guided vs Unguided, Single-Mode vs Multi-Mode, and OSI vs TCP/IP.
   - **Entity Taxonomies, Non-Sequential Categories & Evaluation Pillars**: Use `<SubsystemGrid />`.
     * Use for Network Evaluation Criteria (Performance, Reliability, Security), Topologies matrix summary, transmission media taxonomy, and atmospheric propagation modes.
   - **Chronological Milestones & Historical Eras**: Use `<ProcessFlow />`.
     * Use for linear multi-step historical evolutions and numbered execution era timelines.
   - **Process Virtual Memory Layouts**: Use `<ProcessMemoryMap />`.
     * Use strictly for process address space (Stack, Heap, Unallocated growth gap, Data, Text).
   - **Hardware Privilege Boundaries & Mode Switching**: Use `<DualModeDiagram />`.
     * Use for User Mode (Ring 3) vs Kernel Mode (Ring 0), Trap / Syscall / IRET boundary transitions.
   - **Multi-Actor Roundtrip Execution Traces**: Use `<ExecutionBlueprint />`.
     * Use for multi-actor call paths (User App $\to$ C Library $\to$ Trap $\to$ Kernel VFS $\to$ Device Driver $\to$ Hardware and back).
   - **Course Dashboards & Roadmaps**: Use `<CourseCurriculum />` and `<CurriculumRoadmap />`.

   > 🛠️ **FALLBACK & NEW COMPONENT CREATION PROTOCOL (Adaptation Over Reinvention)**:  
   > If after methodically evaluating all diagram components above against the concept's conditions, you determine that **NONE of the existing components can naturally model the concept without distortion, text crowding, or pedagogical compromise**:
   > 1. **You MUST CREATE A NEW SPECIALIZED COMPONENT** in `src/components/CoreDose/Diagrams/`.
   > 2. **Adapt and borrow proven patterns from existing components**: Do not build blindly from scratch. You MUST adapt and reuse the battle-tested engineering features of the platform:
   >    - **ResizeObserver Container Sandbox**: Real-time clientWidth tracking to adaptively calculate geometry and guarantee zero container overflow and zero horizontal scroll traps (borrowed from `FlowDiagram` / `ProtocolLadder`).
   >    - **Global Design Tokens**: Strict usage of CSS variables from `src/css/diagram-tokens.css` (`blue`, `emerald`, `purple`, `amber`, `rose`, `cyan`, `gray`) ensuring 100% flawless light/dark mode adaptation.
   >    - **Constant-Height Zero-Jitter Console**: Fixed-height bottom inspector drawer (e.g. 84px) to prevent vertical Cumulative Layout Shift (CLS) during hover or selection (borrowed from `FlowDiagram` / `FrameFormat`).
   >    - **Dual-Mode Mobile Engine**: Thumb-friendly mobile view with `touch-action: pan-x` and zero touch scroll traps (either vertical card sequence or 1:1 HD pan toggle).
   >    - **Sub-3-Second Mental Model**: Punchy iconography, numbered badges, high-contrast typography, and self-explanatory interactive state chips.
   > 3. **Global Zero-Import Registration**: Immediately export the new component in:
   >    - `src/components/CoreDose/Diagrams/index.js`
   >    - `src/components/Diagrams/index.js`
   >    - `src/theme/MDXComponents.js` (enabling immediate use in any `.mdx` file without imports).
10. **Zero Title Redundancy Between Text and Diagrams**:
    - Never duplicate the markdown section heading inside the diagram's `title` prop. If the markdown section heading is `## 🔬 Field-by-Field Frame Anatomy`, do NOT repeat that title verbatim inside the diagram. Omit the `title` prop on the component or use it to provide a distinct, complementary subtitle.
11. **Lifeline Boundary & Clipping Protection**:
    - In multi-lifeline diagrams (`<ProtocolLadder />`), event badges, retransmission clock pills, and collision markers on the rightmost lifeline must dynamically adjust their alignment (e.g., using `transform: translateX(-100%)` and anchoring leftward) whenever rendered on the right half of the canvas. They must NEVER bleed or clip past the right container margin.

## 6. CoreDose Course & Lesson Architectural Standards
All course lessons in `binary_dose/coredose/` (for OS, DBMS, CN, System Design, OOPs, COA, Compiler) MUST follow this locked standard:

### Source Priority
1. **Priority 1 (HIGHEST - Ground Truth)**: **Images of User's Handwritten Notes** (`Hand Written Notes - <Subject>/IMAGES/` or user's note repository). Sequence modules strictly matching handwritten notes. All definitions, parameter names, mathematical formulations, and conceptual analogies must be prioritized from these notes.
2. **Priority 2**: **Core Computer Science Theory & Standard Academic Syllabi** (Tanenbaum, Kurose-Ross, Stallings, Forouzan, Silberschatz). Used to provide complete derivations, standard RFC specifications, and IEEE architectural foundations.
3. **Priority 3 (LOWEST)**: **AI Supplementary Knowledge** used strictly for modern production context, real-world case studies, and clean code snippets.

### Strict Universal Editorial Rules
- **Standardized on "Module"**: Always use **Module** (e.g. `Module 01`, `Module 02`). Never use "Chapter" in titles, roadmap cards, or breadcrumbs.
- **Generic & Timeless**: No exam names, specific years, PYQ tags, or marks badges (no "GATE-2018", "7 Marks", "ISRO", "BARC").
- **No MCQs / MSQs with Option Letters**: All questions must be standard university semester descriptive questions:
  ```markdown
  **Question 1:** ...
  **Answer:** ...
  ```
- **Semantic H1**: Every `.mdx` lesson MUST have an explicit Markdown `# X.Y {Lesson Title}` heading placed directly above `<CoreDoseLessonHeader />`.
- **Never Leak Internal Meta-Phrases**: Never use phrases like "handwritten notes", "from my notes", "as seen in the notes", or "according to handwritten notes" in student-facing titles, admonitions, or body copy. The platform must read as an authoritative, timeless, professional computer science publication.
- **Zero Raw ASCII Diagrams & Box Art (STRICTLY BANNED)**:
  - Plain text or ASCII art diagrams (` ``` `, ` ```text `, ` ```ascii `) using ASCII borders (`+---+`, `|`, `+-+-+`), arrows (`-->`, `<==>`), trees, or text boxes are **STRICTLY PROHIBITED** across all subjects and lessons.
  - **Permitted Use of Code Blocks**: Monospace code blocks are permitted **ONLY** for:
    1. Genuine programming code (`c`, `cpp`, `python`, `javascript`, etc.).
    2. Genuine terminal/CLI shell commands and terminal outputs (`bash`, `shell`, `powershell`, e.g., `ping`, `traceroute`, `ip addr show`, `tcpdump`, Linux kernel log outputs).
  - **How to Render Architectural, Structural & Process Information**:
    1. **Architectures, Workflows, State Machines & Network Protocols**: MUST be rendered using our pure React vector diagram components (`<FlowDiagram />` [never `<FlowGraph />`], `<ProtocolLadder />`, `<FrameFormat />`, `<ContentionTimeline />`, `<FlowPipeline />`, `<ProcessFlow />`, `<ConceptComparison />`, `<SubsystemGrid />`, `<GanttChart />`, `<DiskSchedulingChart />`, `<ArchitectureStack />`).
    2. **Multi-Step Algorithms & Methodologies**: Use clean numbered steps, callout admonitions (`:::tip`, `:::note`, `:::info`), or `<ProcessFlow />`.
    3. **Structural Fields, Bit Allocations & Parameter Comparisons**: Use clean GitHub Flavored Markdown tables (`| Field | Bits | Description |`) or `<SubsystemGrid />`.
    4. **Bitwise Logic & Mathematical Proofs**: Use KaTeX equations (`$$ ... $$`).
  - **NEVER draw a fake box, table, pipeline, frame layout, or flowchart using ASCII characters in a code block.**
- **Zero Title & Content Redundancy**:
  - Never place a redundant Markdown heading above a diagram if the diagram's internal `title` repeats the section title.
  - Never repeat explanatory paragraphs in markdown text if an interactive diagram's step cards already explain that exact mechanism.
  - Prioritize handwritten notes explanations in the prose, letting the interactive diagram serve as the visual proof.
- **Strict KaTeX Math Escaping**:
  - Never write unescaped `&` characters inside `\text{}` blocks in LaTeX (e.g. `\text{Header & Trailer}` causes KaTeX parsing errors; always write `\text{Header and Trailer}` or `\text{Header \& Trailer}`).
  - Format matrices, vectors, and Walsh codes cleanly using `\begin{pmatrix} ... \end{pmatrix}`.
- **Navigation Robustness**: Always terminate lessons with `<CoreDoseNav prev={...} next={...} courseUrl="/coredose/<subject>" />`. `<CoreDoseNav />` supports both `prev` and `previous`, and `next`. It must ALWAYS link backward to the exact chronological prior topic (e.g. 2.4 links to 2.3, 2.3 to 2.2, 2.2 to 2.1) and forward to the next topic, and never fall back to the Master Index when a valid prior lesson exists.

### Active Curriculum Progress Tracking
- **Operating Systems Full Curriculum (Modules 01 - 10)**: `100% COMPLETED` 🎉
  - Module 01: Introduction & OS Architecture (Topics 1.1 - 1.4) — `COMPLETED`
  - Module 02: Process Management & PCB (Topics 2.1 - 2.4) — `COMPLETED`
  - Module 03: CPU Scheduling Algorithms (Topics 3.1 - 3.6) — `COMPLETED`
  - Module 04: Process Synchronization & Concurrency (Topics 4.1 - 4.7) — `COMPLETED`
  - Module 05: Deadlocks: Detection, Prevention & Avoidance (Topics 5.1 - 5.5) — `COMPLETED`
  - Module 06: UNIX System Calls & Fork Mechanics (Topics 6.1 - 6.5) — `COMPLETED`
  - Module 07: Main Memory Management (Topics 7.1 - 7.7) — `COMPLETED`
  - Module 08: Virtual Memory & Page Replacement (Topics 8.1 - 8.5) — `COMPLETED`
  - Module 09: Storage & Disk Scheduling (Topics 9.1 - 9.4) — `COMPLETED`
  - Module 10: File Systems & Inodes (Topics 10.1 - 10.4) — `COMPLETED`
- **Computer Networks Curriculum (Modules 01 - 10)**: `100% COMPLETED` 🎉
  - Module 01: Introduction & Network Architectures (Topics 1.1 - 1.4) — `COMPLETED`
  - Module 02: Data Link Layer: Framing, Error Detection & Flow Control (Topics 2.1 - 2.5) — `COMPLETED`
  - Module 03: Data Link Layer: MAC Sublayer & Ethernet (Topics 3.1 - 3.5) — `COMPLETED`
  - Module 04: Network Layer: IPv4/IPv6 Addressing & Subnetting (Topics 4.1 - 4.6) — `COMPLETED`
  - Module 05: Network Layer: Routing Protocols & Control Plane (Topics 5.1 - 5.6) — `COMPLETED`
  - Module 06: Transport Layer: UDP, TCP & Connection Flow (Topics 6.1 - 6.5) — `COMPLETED`
  - Module 07: Transport Layer: Congestion Control & Reliability (Topics 7.1 - 7.5) — `COMPLETED`
  - Module 08: Application Layer Protocols (Topics 8.1 - 8.5) — `COMPLETED`
  - Module 09: Network Security & Cryptography (Topics 9.1 - 9.6) — `COMPLETED`
  - Module 10: Physical Layer Devices & Wireless Networks (Topics 10.1 - 10.4) — `COMPLETED`

---

## 7. The Locked 11-Part Lesson Structure
Every `.mdx` lesson in CoreDose across ANY subject (OS, DBMS, CN, System Design) MUST strictly follow this exact 11-part architectural template in order:

### 1. Frontmatter
Must include `title`, `description` (crisp 1-2 sentence overview of core concepts, mathematical outcomes, and architectural principles), and `hide_table_of_contents: true` (disabling Docusaurus's default right sidebar to activate our dynamic inline `<CoreDoseTOC />`):
```yaml
---
title: "X.Y {Lesson Title}"
description: "Foundational concepts, derivations, and mathematical proofs..."
hide_table_of_contents: true
---
```

### 2. Semantic H1 Heading
Every lesson must begin with an explicit top-level Markdown `#` heading matching the lesson slug and title:
```markdown
# X.Y {Lesson Title}
```

### 3. Lesson Header Component (`<CoreDoseLessonHeader />`)
Renders the standardized top metadata strip:
```jsx
<CoreDoseLessonHeader
  module="Module XX: {Module Title}"
  topic="Topic X.Y"
  courseUrl="/coredose/{subject}"
  readTime="12 min read"
  relevance="Semester Exams (All Universities) • Placement Technical Rounds • Engineering Foundations"
/>
```

### 4. `## 💡 Core Intuition: {Everyday Analogy Title}`
Every lesson MUST start with a memorable, relatable physical mental model before throwing technical jargon at the student:
* `### 🍳 The Everyday Analogy: {Analogy Title}`: Concrete physical metaphor from daily human life (e.g. shipping containers, unmoderated dinner tables, certified postal envelopes, international conferences, traffic intersections).
* `### 💻 Bridging to Computer Science`: Seamlessly connects the analogy to physical layer signals, bits, packet headers, hardware registers, and operating system / protocol state machines.

### 5. Dynamic Inline Table of Contents (`<CoreDoseTOC toc={toc} />`)
Wrapped cleanly with horizontal rules (`---`):
```markdown
---

<CoreDoseTOC toc={toc} />

---
```
* **CRITICAL RULE**: **STRICTLY NO outer Markdown heading** (NEVER write `## 🗂️ Inline Navigation` or `## Table of Contents`). The component renders its own interactive header card with item counts. An outer heading creates duplicate entries in the navigation tree.
* Injects Docusaurus's live `toc` heading tree dynamically.

### 6. Core Deep-Dive & Concepts (Thematic Icon-Accented H2s)
The main technical core of the lesson:
* **STRICT RULE: NO rigid textbook numbers** (`## 1.`, `## 2.`, `## 3.`... are **STRICTLY PROHIBITED**).
* Use thematic, icon-accented Markdown headings matching our visual design system (e.g., `## 🔀 ...`, `## 🔬 ...`, `## ⚡ ...`, `## 📏 ...`, `## 📦 ...`, `## 🏷️ ...`).
* Prioritize handwritten notes order, definitions, and derivations.
* Include rigorous mathematical derivations using KaTeX (Poisson arrival models, vulnerable window proofs, efficiency equations, inner products, Walsh matrices).

### 7. Flagship Visual Blueprint / Interactive Diagram
At least one (and often two) interactive pure React educational diagram components:
* Selected using our Generic Diagram Selection Framework:
  - `<ProtocolLadder />`: Space-time packet vectors ($T_t + T_p$), sliding windows, timeouts, and loss recovery.
  - `<FrameFormat />`: Hardware byte inspector, bit patterns, and RFC field definitions.
  - `<ContentionTimeline />`: Shared medium access (Pure ALOHA vs Slotted ALOHA vs CSMA) with collision windows.
  - `<FlowDiagram />`: 2D network topologies, rings, mesh networks, process state machines, and supervisory loops (do NOT use `<FlowGraph />`).
  - `<ConceptComparison />`: 2-way or 3-way architectural trade-offs.
  - `<FlowPipeline />`: 1-way physical stages ($\le 4$ cards per row).
  - `<SubsystemGrid />`: Entity matrices and architectural pillars.
* Must enforce 100% theme synchronization, responsive stacking, zero text clipping, and sub-3-second clarity.

### 8. `## 🏭 Real-World Production Context: {Specific Production Case}`
**MANDATORY in every single lesson without exception.**
* Never leave lessons in pure academic abstraction.
* Connect the topic directly to high-scale production systems:
  - How Linux kernel network stack, eBPF, and DPDK handle packets.
  - How hyper-scale cloud data centers (AWS, Google Cloud, Meta) deploy Leaf-Spine architectures and Jumbo Frames.
  - How mission-critical automotive CAN buses eliminate collisions with non-destructive bitwise arbitration.
  - How GPS satellite constellations broadcast simultaneously on a single frequency using 1023-bit Gold Codes.
  - How geostationary satellites and LoRaWAN IoT sensors adapt ALOHA for low-power and high-latency channels.

### 9. `## 📐 Numerical Applications & Worked Examples`
**Standardized heading across all lessons.**
* Contains 3 to 5 comprehensive, step-by-step engineering problems.
* Format each problem with clear problem statements and numbered mathematical steps:
  ```markdown
  ### Example 1: {Problem Focus Title}
  **Problem Statement:** ...
  
  **Step-by-Step Solution:**
  1. **Identify Given Parameters:** ...
  2. **Apply Theoretical Constraint:** ...
  3. **Calculate Final Result:** ...
  ```
* **STRICT RULE**: Zero exam names (No GATE, ESE, ISRO), zero marks badges, and zero MCQ option letters `(A), (B), (C), (D)`. Keep questions timeless and university semester caliber.

### 10. `## 🎯 Exam & Interview Pitfall Check`
**Standardized heading across all lessons.**
Contains exactly two distinct callout admonitions:
```markdown
:::tip Core Conceptual Questions
* **{High-Yield Conceptual Question 1}**: {Comprehensive, first-principles technical answer explaining the 'why' behind the mechanism.}
* **{High-Yield Conceptual Question 2}**: {Detailed explanation contrasting subtle nuances.}
:::

:::warning Common Interview Traps
* **Trap: {Common Misconception or Mathematical Pitfall}**: {Direct explanation of why candidates get this wrong and how to solve it correctly.}
* **Trap: {Bit vs Byte Confusion / Legacy vs Modern Nuance}**: {Clear distinction debunking the trap.}
:::
```

### 11. Navigation Component (`<CoreDoseNav />`)
Terminates every lesson with seamless forward and backward transitions:
```jsx
---

<CoreDoseNav
  prev={{
    title: "X.(Y-1) {Previous Topic Title}",
    url: "/coredose/{subject}/{previous-topic-slug}",
  }}
  next={{
    title: "X.(Y+1) {Next Topic Title}",
    url: "/coredose/{subject}/{next-topic-slug}",
  }}
  courseUrl="/coredose/{subject}"
/>
```

---

## 8. Dynamic File-Driven Architecture & Automated Content Discovery (Mandatory Platform Standard)

To maintain infinite scalability across Binary Dose (`coredose`, `coding`, `algodose`, `100-days`), the platform enforces automated, file-driven metrics and dynamic component discovery:

### 1. Zero Hardcoded Topic / Module Counts
* **Never hardcode static numbers** like `"10 Modules • 46 Topics"` or `"391 Problems"` into component markup, hero subtitles, or card descriptions.
* All content counts must be computed dynamically at build/startup time by `src/utils/getSiteStats.js` and injected into `siteConfig.customFields.stats`.
### 2. Dynamic Course & Content Discovery
* **Never render large static dummy cards with disabled buttons** for upcoming or empty courses (e.g. "Notes in Production"). This dilutes site authority and degrades the user experience.
* Course hubs (`/coredose`, `/coding`) must dynamically filter and render active cards based on filesystem presence (`topics > 0`).
* When a new subject or module directory is added (e.g. `coredose/cn/chapter-01/`), the platform must automatically discover it, compute its metrics, and publish its card to the active grid without requiring manual edits to hub components.
* Upcoming or unlaunched tracks must be displayed in a clean, compact, non-intrusive roadmap format (e.g. 1-line roadmap pill strip) rather than dominating the primary view with disabled cards.

### 3. Universal Site Stats Hook (`useSiteStats`)
* All components needing content statistics must import and call `useSiteStats()` from `@site/src/hooks/useSiteStats`.
* This hook automatically blends live `siteConfig.customFields.stats` with precomputed fallback data (`siteStats.json`), ensuring numbers never render as `undefined` or `0` even during local dev-server restarts.

### 4. Universal Hero Header & Stats Ribbon Standard (`HeroHeader`, `StatsRibbon`)
* **Never duplicate hero markup or styles** across hubs. Every section hub (Homepage, AlgoDose, CoreDose, 100-Days Interview Hub) must use the universal component:
  ```jsx
  import HeroHeader from "@site/src/components/Common/HeroHeader";

  <HeroHeader
    badge={{ icon: "🎓", text: "Hub Badge Text" }}
    title="Main Title"
    gradient="Gradient Word"
    subtitle="Crisp, executive summary of the hub's learning outcomes."
    stats={optionalStatsArray}
  >
    {/* Optional CTA buttons or search controls */}
  </HeroHeader>
  ```
* All stats numbers ribbons must use `<StatsRibbon />` from `@site/src/components/Common/StatsRibbon` to maintain consistent typography, letter-spacing, and responsive scaling across the platform.
* Any changes to hero visual language, badge padding, or typography must be made in `src/components/Common/HeroHeader.module.css` so all site sections remain strictly aligned.

---

## 9. Universal Component Governance (`src/components/Common/`)

To prevent fragmented styling and duplicate UI logic, all hubs, courses, and tracks must reuse the platform's core components:

* **`HeroHeader`** (`src/components/Common/HeroHeader.jsx`): Unified header with responsive badges, gradients, subtitles, action slots, and animated stats ribbons.
* **`StatsRibbon`** (`src/components/Common/StatsRibbon.jsx`): IntersectionObserver-driven smooth count-up ticker animation (SSR safe, respects `prefers-reduced-motion`).
* **`SearchBar`** (`src/components/Common/SearchBar.jsx`): Reusable search input with magnifying glass icon, keyboard shortcuts, clear button, and accessible ARIA attributes. Used in CoreDoseHub, CodeDoseHub, DevDoseHub, and CourseCurriculum.
* **`DoseCard`** (`src/components/Common/DoseCard.jsx`): Standard card for courses, tracks, and learning modules with icons, badges, titles, descriptions, and CTA links.
* **`BackNav`** (`src/components/Common/BackNav.jsx`): Universal breadcrumb / back-navigation bar with chevron icon and semantic route targets.
* **`NumberBadge`** (`src/components/Common/NumberBadge.jsx`): Consistent pill badge for sequence numbers and counts.

---

## 10. Zero-Clutter UI & Hub Layout Standards

* **Active Tracks vs Upcoming Roadmap**:
  - Active tracks (`topics > 0`) render as rich interactive `<DoseCard />` elements in the primary grid.
  - Upcoming / planned tracks MUST NOT render as disabled or placeholder cards. They must be placed in a single-bar **Curriculum Roadmap Strip** below the active grid with dashed borders, muted badges, and topic pills.
* **Zero Redundant Arrows**:
  - Never combine text arrows (`&rarr;` or `→`) with CSS pseudo-element icons (`::after`). Ensure clean, single-arrow hover cues.
* **No Link Underline Leaks**:
  - Card wrappers and CTA buttons must enforce `text-decoration: none !important;` to prevent browser default underlines on hover.

---

## 11. DevDose Architecture & SEO Permalink Continuity

* **Permalinks Are Sacred**:
  - The flagship **100 Days of Tech Interview** track MUST preserve its `/100-days` route and permalinks (`/100-days/day-01`, etc.) because it is already indexed and ranking on search engines.
* **DevDose Hub Pattern**:
  - `/devdose` serves as the umbrella engineering hub.
  - It follows the identical design pattern of `/coredose`: HeroHeader on top, active tracks rendered with `<DoseCard />`, and an upcoming roadmap strip below.
  - Future applied engineering tracks (e.g. Modern C++, AI/LLM Engineering) will live under `devdose/<track>` as separate docs plugins when authored.

---

## 12. In-Page Curriculum Search Architecture

For courses with extensive syllabi (e.g. Operating Systems with 51 topics across 10 modules, DBMS with 48 topics):
* `<CourseCurriculum />` includes an integrated `<SearchBar />` for instant topic filtering.
* Filtering matches across topic titles, lesson slugs, and module titles.
* Shows real-time feedback: `"Found X topics across Y modules matching '...'"` with a quick reset button.
* Renders a graceful empty state when no topics match the search query.

---

## 13. Two-Tier Contribution Governance

* **Tier 1: Blog (Open Contribution)**:
  - Technical articles, interview round experiences, and engineering deep-dives.
  - **Creative Freedom**: Contributors choose their own structure and writing style.
  - Required elements are strictly structural: frontmatter, `<!-- truncate -->` marker, `TOCInline` collapsible table of contents, and `blog/authors.yml` profile.
* **Tier 2: Learning Platform (Guided Contribution)**:
  - CoreDose, CodeDose, DevDose, and AlgoDose.
  - Strict architectural blueprints, mandatory React diagram components (zero raw Mermaid SVGs), and platform component reuse.
  - **Reach-out Requirement**: Contributors must discuss scope, components, and conventions with the maintainer first before starting work.
* **Git Protocol**:
  - **NEVER** push directly to `main`. All contributions must be submitted via dedicated feature branches from forks.


