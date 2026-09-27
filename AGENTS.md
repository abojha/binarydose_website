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

---

### Protocol for Creating New Diagram Component Styles
If at any point you encounter a complex architectural concept, algorithm, or data structure whose requirements **cannot be cleanly or beautifully expressed** by the existing 9 components:

> **YOU ARE FULLY EMPOWERED AND REQUIRED TO CREATE A NEW DIAGRAM COMPONENT STYLE.**
> Do NOT compromise student learning or fall back to messy raw Mermaid diagrams. Build the exact visual tool the student needs.

#### Mandatory 5-Step Process for New Diagram Components:
1. **Create Component & CSS Module**:
   - Location: `src/components/CoreDose/Diagrams/<NewComponentName>.jsx`
   - Styles: `src/components/CoreDose/Diagrams/<NewComponentName>.module.css`
2. **Hook to Central Design Tokens**:
   - MUST use CSS variables from `src/css/diagram-tokens.css` for dimensions (`--diagram-card-radius`, `--diagram-chip-radius`, `--diagram-pill-radius`, `--diagram-transition`) and colors (`--diagram-<color>-bg`, `--diagram-<color>-border`, `--diagram-<color>-accent`, `--diagram-<color>-text`).
   - If a new global token is needed (e.g. `--diagram-max-w-tree: 1040px;`), declare it inside `src/css/diagram-tokens.css`.
3. **Export Universally**:
   - Export from `src/components/CoreDose/Diagrams/index.js`
   - Export from `src/components/Diagrams/index.js`
4. **Auto-Register Globally in MDX**:
   - Register the new component in `src/theme/MDXComponents.js` so it can be used across any markdown/MDX file immediately without import statements.
5. **Document in `AGENTS.md`**:
   - Add the new component to this list in `AGENTS.md` with its purpose, props schema, and an example JSX usage snippet so all future agents and contributors know when and how to use it.

---

### "Less Text, Maximum Visual Punch" Design Rules
Every diagram component (existing or newly created) MUST adhere to these rules:
1. **Sub-3-Second Mental Model**: The student must understand the core concept just by scanning the figure.
2. **Micro-Labels Only**: No walls of text or paragraphs inside diagram cards. Use punchy titles (2–5 words), 1-line micro-labels, and keyword chips.
3. **100% Responsive**: Must look beautiful at 100% zoom on mobile (360px–375px) without clipping and cap cleanly on ultra-wide desktop monitors without blowing up.
4. **Theme Synchronized**: Never hardcode colors that break in Dark Mode. All text and background colors must seamlessly adapt to Docusaurus `[data-theme='dark']`.

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
- **Bullet Lists**: Use bullet lists (`*` or `-`) ONLY for true multi-item lists. Standalone definitions or notes MUST NEVER be prefixed with a bullet dot.
- **Navigation**: Always terminate with `<CoreDoseNav prev={...} next={...} courseUrl="/coredose/<subject>" />` using exact clean permalinks.

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
