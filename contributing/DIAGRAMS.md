# Universal React Educational Diagrams Specification 📐

> **CORE PRINCIPLE**: *"Our goal is to provide the absolute best learning experience to our students so they grasp mental models in under 3 seconds."*

This document defines the **universal visual diagram standards** across the **entire Binary Dose platform**. All diagram components are pure React components, responsive, dark-mode synchronized, and globally accessible.

---

## 🚫 The Ban on Raw Mermaid SVGs

**Raw Mermaid diagrams are strictly prohibited for architectural, structural, or conceptual illustrations across all doses.**

### Why Raw Mermaid is Banned (The SVG ViewBox Trap):
1. **Unusable on Mobile**: Wide Mermaid diagrams scale down to unreadable micro-text on phone screens (360px–412px).
2. **Billboard Trap on Desktop**: Narrow Mermaid diagrams scale up into massive, blurry billboards on wide screens.
3. **No Interactive Polish**: Mermaid SVGs cannot host custom badges, syntax-highlighted labels, or responsive CSS grid cards.
4. **Theme Inconsistencies**: Raw SVG lines often clash with dark/light theme switching.

---

## 🌐 Universal Availability (Zero MDX Imports)

All 7 educational diagram components are **globally registered in `src/theme/MDXComponents.js`**.

* **In `.mdx` files**: You can use `<ArchitectureStack ... />`, `<FlowPipeline ... />`, etc., **without writing any `import` statement at the top of the file**.
* **In React `.jsx` files**: Import from the global diagram barrel:
  ```jsx
  import { ArchitectureStack, FlowPipeline, ConceptComparison } from '@site/src/components/Diagrams';
  ```
* **Universal Color Palette**: Components support semantic theme tokens via the `color` prop:
  `"purple"` | `"blue"` | `"cyan"` | `"emerald"` | `"amber"` | `"rose"`

---

## 🧰 The 7 Universal Diagram Components

### 1. `<ArchitectureStack />` (Layered Hierarchy)
**Best for**: Layered systems, OSI / TCP-IP network models, OS kernel abstraction layers, database storage engines, 3-tier system design architectures.

```jsx
<ArchitectureStack
  title="3-Tier Web Application Architecture"
  subtitle="Separation of concerns between presentation, business logic, and persistence"
  layers={[
    {
      badge: "Tier 1",
      title: "Client Presentation Layer",
      icon: "🌐",
      color: "purple",
      description: "React SPA and mobile clients executing clientside logic.",
      items: ["Browser DOM", "Client Cache", "TLS Encryption"],
      connectorText: "HTTPS / REST / WebSocket",
    },
    {
      badge: "Tier 2",
      title: "Application Server Layer",
      icon: "⚙️",
      color: "blue",
      description: "Stateless API workers handling authentication, business logic, and rate limiting.",
      items: ["Node.js / Go Workers", "Session Validation", "Message Queue Producer"],
      connectorText: "TCP Connection Pool",
    },
    {
      badge: "Tier 3",
      title: "Persistence & Storage Layer",
      icon: "🗄️",
      color: "emerald",
      description: "ACID relational databases and caching clusters.",
      items: ["PostgreSQL (Primary/Replica)", "Redis In-Memory Cache"],
    },
  ]}
/>
```

---

### 2. `<FlowPipeline />` (Step-by-Step Data & Control Pipelines)
**Best for**: Analogies, data pipelines, stage-by-stage request flows, execution lifecycles, Kafka event streaming pipelines. Responsive: horizontal on desktop, vertical on mobile.

```jsx
<FlowPipeline
  title="Request Execution Pipeline"
  subtitle="End-to-end traversal of a client read request"
  steps={[
    {
      icon: "👤",
      role: "Client",
      title: "Web Browser",
      description: "Issues GET /api/v1/user/42 to edge gateway.",
      actionText: "Sends HTTP Request",
      color: "purple",
    },
    {
      icon: "🛡️",
      role: "Edge",
      title: "API Gateway / Nginx",
      description: "Terminates TLS, validates JWT tokens, checks token bucket rate limit.",
      actionText: "Routes to Microservice",
      color: "blue",
    },
    {
      icon: "⚡",
      role: "Cache",
      title: "Redis Cluster",
      description: "Performs O(1) in-memory key lookup for cached profile.",
      actionText: "Cache Hit: Returns JSON",
      color: "emerald",
    },
  ]}
/>
```

---

### 3. `<ConceptComparison />` (Side-by-Side Architectural Trade-offs)
**Best for**: Comparing two concepts: Process vs Thread, SQL vs NoSQL, Monolith vs Microservices, TCP vs UDP, Mutex vs Semaphore.

```jsx
<ConceptComparison
  title="Architectural Showdown: TCP vs UDP"
  subtitle="Comparing transport protocol reliability and latency profiles"
  left={{
    title: "TCP (Transmission Control Protocol)",
    badge: "Reliable & Ordered",
    color: "blue",
    points: [
      "Connection-oriented (Requires 3-way handshake SYN-SYNACK-ACK).",
      "Guarantees byte-stream ordering and zero packet loss via ACK/retransmission.",
      "Built-in congestion control and sliding window flow control.",
      "Higher packet overhead (20-60 byte header, latency penalty).",
    ],
  }}
  right={{
    title: "UDP (User Datagram Protocol)",
    badge: "Fast & Lightweight",
    color: "amber",
    points: [
      "Connectionless (Packets fire immediately with zero handshake).",
      "No delivery guarantee, no packet ordering, and no retransmission.",
      "Minimal 8-byte header overhead with near-zero latency.",
      "Ideal for live video streaming, DNS lookups, and multiplayer gaming.",
    ],
  }}
/>
```

---

### 4. `<StateLifecycle />` (State Machine & Transitions)
**Best for**: Operating system process states (New $\rightarrow$ Ready $\rightarrow$ Running $\rightarrow$ Waiting $\rightarrow$ Terminated), TCP connection states (LISTEN $\rightarrow$ SYN_SENT $\rightarrow$ ESTABLISHED), database transaction states.

```jsx
<StateLifecycle
  title="The 5-State Process Lifecycle"
  subtitle="State machine transitions managed by the kernel dispatcher and CPU schedulers"
  states={[
    {
      name: "New",
      badge: "Created",
      color: "purple",
      desc: "Process is created by fork() but not yet admitted to RAM.",
    },
    {
      name: "Ready",
      badge: "In Memory",
      color: "blue",
      desc: "Process resides in Ready Queue waiting for CPU time slice.",
    },
    {
      name: "Running",
      badge: "On CPU",
      color: "emerald",
      desc: "Process instructions are actively executing on CPU core.",
    },
    {
      name: "Waiting",
      badge: "Blocked",
      color: "amber",
      desc: "Blocked on I/O completion, disk read, or semaphore lock.",
    },
    {
      name: "Terminated",
      badge: "Exit",
      color: "rose",
      desc: "Execution finished; PCB awaits parent wait() harvest.",
    },
  ]}
/>
```

---

### 5. `<HierarchyTree />` (Tree & Process Hierarchies)
**Best for**: Linux process trees (`systemd` $\rightarrow$ children), file system directory trees, B+ tree node splits, DOM hierarchies.

```jsx
<HierarchyTree
  title="Linux Process Tree Hierarchy"
  subtitle="Parent-child ownership rooted at systemd (PID 1)"
  root={{
    label: "systemd (PID 1)",
    badge: "Root Process",
    color: "purple",
    children: [
      {
        label: "sshd (PID 1024)",
        badge: "SSH Daemon",
        color: "blue",
        children: [
          { label: "bash (PID 2048)", badge: "User Shell", color: "cyan" },
        ],
      },
      {
        label: "nginx (PID 1050)",
        badge: "Web Server Master",
        color: "emerald",
        children: [
          { label: "nginx worker (PID 1051)", badge: "Worker 1", color: "emerald" },
          { label: "nginx worker (PID 1052)", badge: "Worker 2", color: "emerald" },
        ],
      },
    ],
  }}
/>
```

---

### 6. `<MemoryGrid />` (Physical & Virtual Memory Representations)
**Best for**: Contiguous memory partitions, paging frames, fragmentation visualizers, stack vs heap layouts.

```jsx
<MemoryGrid
  title="Physical RAM Frame Allocation"
  subtitle="Page frames showing allocated, operating system, and free blocks"
  blocks={[
    { label: "Kernel Space (0x0000 - 0x3FFF)", size: "16 KB", status: "reserved", color: "rose" },
    { label: "Process A: Page 0 (0x4000)", size: "4 KB", status: "allocated", color: "blue" },
    { label: "Process B: Page 0 (0x5000)", size: "4 KB", status: "allocated", color: "purple" },
    { label: "Free Frame 2 (0x6000)", size: "4 KB", status: "free", color: "emerald" },
  ]}
/>
```

---

### 7. `<ProcessTransition />` (Detailed Transition Tables & Flow)
**Best for**: Showing exact trigger actions between states (e.g., Timer Interrupt $\rightarrow$ Context Switch, I/O Request $\rightarrow$ Block).

---

## 📐 Component Selection & Authoring Guidelines

When adding diagrams to any markdown or MDX file on Binary Dose:
1. **Never use raw `mermaid` codeblocks** for architectural or conceptual illustrations.
2. **Select the appropriate component for your concept**:
   - Layered architecture $\rightarrow$ `<ArchitectureStack />`
   - Flow / Analogy / Request Traversal $\rightarrow$ `<FlowPipeline />`
   - Side-by-side comparison $\rightarrow$ `<ConceptComparison />`
   - State machines / Phases $\rightarrow$ `<StateLifecycle />`
   - Tree / Process hierarchies $\rightarrow$ `<HierarchyTree />`
   - Memory layout & Partitioning $\rightarrow$ `<MemoryGrid />`
3. **Zero MDX Imports**: Do not add import statements for these 7 components in `.mdx` files; they are globally registered.
4. **Always provide meaningful `title` and `subtitle` props** to ensure every diagram is self-explanatory.
