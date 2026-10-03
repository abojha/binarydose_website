# Contributing to CoreDose (Core Computer Science Notes) 🎓

CoreDose is Binary Dose's flagship foundation for university semester exams, GATE CSE preparation, and technical placement rounds. It covers rigorous Computer Science subjects including **Operating Systems (OS)**, **Database Management Systems (DBMS)**, **Computer Networks (CN)**, **Object-Oriented Programming (OOPs)**, **Computer Organization & Architecture (COA)**, and **Compiler Design**.

This guide details the strict pedagogical, editorial, and component standards required for all CoreDose lessons.

---

## 📁 File Structure & Naming Conventions

All CoreDose content lives inside the root `coredose/` directory:

```text
coredose/
├── os/                                # Subject Directory
│   ├── index.mdx                      # Subject Curriculum Hub (CourseCurriculum)
│   ├── chapter-01/                    # Module folder (named chapter-XX on disk)
│   │   ├── 01-topic-slug.mdx          # Individual lesson file
│   │   ├── 02-topic-slug.mdx
│   └── chapter-02/
├── dbms/
└── cn/                                # (Upcoming subject)
```

### File Naming Rules:
* Module folders: `chapter-01`, `chapter-02`, etc.
* Lesson filenames: `01-topic-slug.mdx`, `02-topic-slug.mdx` (always zero-padded 2-digit index prefix).
* Clean URL Slugs: Use descriptive, lowercase, kebab-case names (e.g. `01-what-is-an-operating-system-abstract-view-and-goals.mdx`).

---

## ✍️ Editorial & Quality Standards

1. **Standardized on "Module"**: Always refer to units as **Module** in user-facing text (e.g. `Module 01: Introduction & OS Architecture`). Never use "Chapter" in titles, text, or breadcrumbs.
2. **Timeless & Academic**:
   * **No exam years or marks badges** (e.g., do NOT write "GATE 2019 - 2 Marks" or "Semester Exam Nov 2022").
   * Keep content universally applicable across all university syllabi.
3. **No MCQ / MSQ Option Letters**:
   * Do not write multiple-choice questions with letters `(A), (B), (C), (D)`.
   * Frame all review questions as standard conceptual problems:
     ```markdown
     **Question 1:** Explain why context switching overhead increases as the frequency of system calls increases.
     **Answer:** ...
     ```
4. **Never Leak Internal Meta-Phrases**:
   * Never write "from handwritten notes", "according to my teacher", or "in our notes". The voice must be an authoritative, publication-grade engineering textbook.
5. **Rigorous Math with KaTeX**:
   * Use KaTeX for mathematical formulas and derivations:
     - Inline: `$T_{turnaround} = T_{completion} - T_{arrival}$`
     - Display:
       $$EMAT = \alpha \cdot (t_{TLB} + t_{RAM}) + (1 - \alpha) \cdot (t_{TLB} + 2 \cdot t_{RAM})$$
   * Escape literal dollar signs as `\$`.
6. **Zero Raw Mermaid SVGs**:
   * Use the responsive React diagram components from [`DIAGRAMS.md`](./DIAGRAMS.md) (`<ArchitectureStack />`, `<FlowPipeline />`, `<ConceptComparison />`, etc.).

---

## 📑 The Locked 7-Layer Lesson Blueprint

Every CoreDose lesson file (`.mdx`) MUST follow this exact sequence:

1. **Frontmatter**:
   ```yaml
   ---
   title: "X.Y Lesson Title"
   description: "Crisp 1-2 sentence summary of core concepts covered."
   hide_table_of_contents: true
   ---
   ```
2. **Semantic H1 Heading**: `# X.Y Lesson Title`
3. **Lesson Header**: `<CoreDoseLessonHeader ... />`
4. **`💡 Core Intuition`**:
   * `### 🍳 The Everyday Analogy: ...` (Real-world analogy grounding the abstract concept).
   * `### 💻 Bridging to Computer Science` (Connecting the analogy directly to kernel/database mechanisms).
5. **Inline Navigation**: `<CoreDoseTOC toc={toc} />`
6. **`📚 Core Deep-Dive & Concepts`**: Rigorous definitions, mathematical derivations, step-by-step mechanisms, edge cases.
7. **`📐 Architecture / Visual Blueprint`**: Educational React diagram (`<FlowPipeline />`, `<ArchitectureStack />`, etc.).
8. **`🏭 In The Real World: Production Case Study`**: How this concept operates in Linux, AWS, PostgreSQL, or production distributed systems.
9. **`🎯 Exam & Interview Pitfall Check`**:
   * `:::tip Core Conceptual Questions` (Descriptive exam questions with step-by-step solutions).
   * `:::warning Common Interview Traps` (Frequent misconceptions and corner cases).
10. **Bottom Navigation**: `<CoreDoseNav ... />`

---

## 📋 Copy-Paste Lesson Template

Use this starter template when creating a new lesson:

```mdx
---
title: "1.1 What is an OS? Definition, Abstract View & Core Goals"
description: "Foundational concepts of Operating Systems, primary goals, resource abstractions, and the dual-mode kernel architecture."
hide_table_of_contents: true
---

# 1.1 What is an OS? Definition, Abstract View & Core Goals

<CoreDoseLessonHeader
  module="Module 01: Introduction & OS Architecture"
  topic="Topic 1.1"
  courseUrl="/coredose/os"
  readTime="7 min read"
  relevance="Semester Exams • GATE CSE • Placement Technical Rounds"
/>

## 💡 Core Intuition

### 🍳 The Everyday Analogy: The Restaurant Head Chef
Explain a vivid real-world analogy here that makes the concept instantly understandable to a complete beginner.

### 💻 Bridging to Computer Science
Connect the analogy directly to the computer science mechanism.

<FlowPipeline
  title="Resource Abstraction Pipeline"
  subtitle="How abstraction layers decouple software from physical hardware"
  steps={[
    {
      icon: "👤",
      role: "User Space",
      title: "Application Process",
      description: "Executes standard CPU instructions in user mode.",
      actionText: "Issues System Call Trap",
      color: "purple",
    },
    {
      icon: "⚙️",
      role: "Kernel Space",
      title: "Operating System Kernel",
      description: "Validates parameters and switches hardware to supervisor mode.",
      actionText: "Executes Privileged Routine",
      color: "blue",
    },
    {
      icon: "💾",
      role: "Hardware",
      title: "Physical RAM & Disk",
      description: "Performs physical read/write cycle.",
      color: "emerald",
    },
  ]}
/>

<CoreDoseTOC toc={toc} />

---

## 📚 Core Deep-Dive & Concepts

### 1. Formal Definition & Abstraction Layers
Formal mathematical and theoretical explanations.

### 2. Derivations & Mechanisms
Detailed step-by-step mechanics.

---

## 🏭 In The Real World: Production Case Study
Explain how Linux, Windows, or Cloud infrastructure implements this in production.

---

## 🎯 Exam & Interview Pitfall Check

:::tip Core Conceptual Questions
**Question 1:** Why is the operating system described as both an extended machine and a resource manager?
**Answer:** Detailed, bulleted explanation providing full marks in semester/GATE evaluations.
:::

:::warning Common Interview Traps
* **Trap:** Confusing User Mode vs Kernel Mode switching with Process Context Switching.
* **Reality:** A mode switch changes hardware privilege level within the same process context without changing the active memory address space.
:::

---

<CoreDoseNav
  prev={{ label: "Previous Topic Title", url: "/coredose/os/chapter-01/previous-topic" }}
  next={{ label: "Next Topic Title", url: "/coredose/os/chapter-01/next-topic" }}
  courseUrl="/coredose/os"
/>
```

---

## ✅ Pre-Submission Verification Checklist

Before opening a Pull Request for a CoreDose lesson, verify:

- [ ] File follows the **7-Layer Lesson Blueprint** in the exact order listed above.
- [ ] Frontmatter includes `title`, `description`, and `hide_table_of_contents: true`.
- [ ] Uses `<CoreDoseLessonHeader />` with correct `module`, `topic`, `courseUrl`, and `relevance` props.
- [ ] All visual diagrams use React components from [`DIAGRAMS.md`](./DIAGRAMS.md) — zero raw Mermaid SVGs.
- [ ] Mathematical formulas use KaTeX (`$...$` inline, `$$...$$` display).
- [ ] No MCQ option letters `(A) (B) (C) (D)` — only descriptive questions and answers.
- [ ] No meta-phrases like "from my notes" or "according to handwritten notes".
- [ ] Uses "Module" everywhere, never "Chapter" in user-facing text.
- [ ] Terminates with `<CoreDoseNav />` linking to the correct prior and next topic URLs.
- [ ] Runs cleanly on `npm run start` with zero console errors.

