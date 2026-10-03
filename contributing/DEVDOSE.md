# Contributing to DevDose (Applied Tech & Interview Series) 🛠️

DevDose is Binary Dose's hub for **applied software engineering, system design architectures, production language deep-dives**, and the flagship **100 Days of Tech Interview** series.

This guide details how to contribute high-yield interview questions and engineering tracks to DevDose while maintaining 100% architectural and pedagogical consistency.

---

## 🎯 The Two Ways to Contribute to DevDose

### 1. The 100 Days of Tech Interview Series (`100-days/`)
Curated, high-yield conceptual interview questions asked at top product firms (Google, Microsoft, Amazon, Meta, Intel, etc.) covering Operating Systems, Databases, Concurrency, Networking, and Low-Level Design.

* **Folder Location**: Root `100-days/` directory (e.g. `100-days/operating-systems/`, `100-days/database-systems/`).
* **Preserving Permalinks**: Existing URLs under `/100-days` are indexed by search engines. Always keep clean, descriptive kebab-case file names (e.g., `why-process-creation-is-heavyweight.mdx`).

### 2. Applied Engineering Tracks (`devdose/`)
Comprehensive multi-chapter engineering guides:
* **System Design & Distributed Systems** (HLD, LLD, Rate Limiting, Sharding, Event-Driven Architecture)
* **Python for Software Engineers** (Asyncio, GIL Internals, Memory Management, FastAPI)
* **Modern C++ (C++17/20) & Systems Programming** (Smart Pointers, RAII, Move Semantics, Concurrency)
* **Applied AI & LLM Engineering** (RAG, Vector DBs, Embeddings, Autonomous Agents)

---

## 📐 Pedagogical Structure for a 100-Days Interview Dose

Every interview question in the 100-Days series must follow this focused, high-clarity structure:

1. **Frontmatter**:
   ```yaml
   ---
   title: "Day XX: [Clear, High-Yield Question Title]"
   description: "One or two sentence summary answering the core interview question."
   hide_table_of_contents: true
   ---
   ```
2. **Back Navigation & Breadcrumbs**:
   ```mdx
   <BackNav
     backUrl="/100-days"
     backLabel="Back to 100 Days Hub"
     breadcrumbs={[
       { label: "DevDose", url: "/devdose" },
       { label: "100 Days", url: "/100-days" },
       { label: "Question Title" },
     ]}
   />
   ```
3. **The Executive 30-Second Answer**:
   * A concise, bulleted answer suitable for an initial interview elevator pitch.
4. **Visual Mental Model (React Diagram)**:
   * Mandatory: Use `<ArchitectureStack />`, `<FlowPipeline />`, or `<ConceptComparison />` from [`DIAGRAMS.md`](./DIAGRAMS.md). **Zero raw Mermaid SVGs.**
5. **Architectural Deep-Dive**:
   * What happens under the hood (memory, kernel traps, network packets, cache lines).
6. **Real-World Production War Story**:
   * A concrete real-world scenario (e.g., how an improperly closed socket caused file descriptor exhaustion in a production microservice).
7. **Key Interview Takeaways**:
   * 3–4 bullet points the candidate can recite with confidence.

---

## 📋 Copy-Paste 100-Days Question Template

```mdx
---
title: "Why is Fork-Exec Separated in UNIX Instead of a Single Spawn Call?"
description: "Understanding the architectural decoupling between process duplication (fork) and address space replacement (execve), and why it enables powerful shell I/O redirection."
hide_table_of_contents: true
---

<BackNav
  backUrl="/100-days"
  backLabel="Back to 100 Days Series"
  breadcrumbs={[
    { label: "DevDose", url: "/devdose" },
    { label: "100 Days", url: "/100-days" },
    { label: "Fork vs Exec Decoupling" },
  ]}
/>

# Why is Fork-Exec Separated in UNIX?

## ⏱️ The 30-Second Interview Answer
In UNIX, process creation is deliberately split into two distinct system calls:
1. **`fork()`**: Clones the current process (state, file descriptors, environment) with Copy-on-Write memory semantics.
2. **`execve()`**: Replaces the calling process address space with a new executable image.

**The Architectural Rationale**: Decoupling them allows the shell or parent process to manipulate file descriptors, set up pipes, redirect standard I/O (`stdin`, `stdout`), and drop privileges **in the window between `fork()` and `execve()`** without altering the parent process.

---

## 📐 Visual Architecture: The Fork-Exec Window

<FlowPipeline
  title="The Decoupled Process Spawning Lifecycle"
  subtitle="The critical configuration window between process cloning and binary execution"
  steps={[
    {
      icon: "👥",
      role: "Parent",
      title: "Shell Process (PID 100)",
      description: "Invokes fork() system call to request kernel duplication.",
      actionText: "fork() Trap",
      color: "purple",
    },
    {
      icon: "🪞",
      role: "Child",
      title: "Child Clone (PID 101)",
      description: "Identical replica running in the configuration window.",
      actionText: "Manipulates FDs (e.g. dup2)",
      color: "blue",
    },
    {
      icon: "⚡",
      role: "Execution",
      title: "New Binary (e.g. /bin/ls)",
      description: "execve() overwrites address space while preserving redirected FDs.",
      actionText: "Runs New Executable",
      color: "emerald",
    },
  ]}
/>

---

## 📚 Deep-Dive: What Makes This Design Superior?

### 1. I/O Redirection & Pipelines
Consider running `ls | grep notes > output.txt`. Because `fork()` duplicates file descriptor tables, the shell child can:
* Call `dup2()` to redirect standard output to a file descriptor.
* Wire pipes between sibling processes.
* Call `execve("ls", ...)` without the `ls` program ever needing special command-line flags for file output.

### 2. Copy-On-Write (COW) Performance
Early UNIX systems duplicated the entire physical RAM, making `fork()` slow. Modern operating systems mark memory pages as read-only and share them between parent and child. Physical duplication occurs only when either process writes to a page.

---

## 🏭 Production Engineering Pitfall
:::warning The Deadlock Trap with Multithreading
If a multi-threaded application calls `fork()`, only the calling thread is duplicated in the child process. Any mutex locks held by other threads in the parent process will remain permanently locked in the child, causing immediate deadlocks if the child attempts to acquire them before calling `execve()`.
:::

---

## 🎯 Key Interview Takeaways
* `fork()` provides inheritance; `execve()` provides transformation.
* The gap between them provides an unmatched customization hook for shells and container runtimes (Docker, runc).
* Modern systems mitigate memory overhead using Copy-On-Write (COW) and `vfork()`.
```

---

## ✅ Pre-Submission Verification Checklist

Before opening a Pull Request for DevDose content, verify:

- [ ] Frontmatter includes `title`, `description`, and `hide_table_of_contents: true`.
- [ ] Uses `<BackNav />` with proper breadcrumbs linking to DevDose and 100 Days hubs.
- [ ] Includes a concise **30-Second Executive Answer** suitable for interview elevator pitches.
- [ ] Contains at least one visual diagram from [`DIAGRAMS.md`](./DIAGRAMS.md) — zero raw Mermaid SVGs.
- [ ] Provides a **Production Engineering** context or real-world war story.
- [ ] Includes clear **Key Interview Takeaways** (3–4 bullet points).
- [ ] Code examples use meaningful variable names, error handling, and inline comments.
- [ ] All internal links resolve to valid routes (verify on `http://localhost:3000`).
- [ ] Runs cleanly on `npm run start` with zero console errors.

