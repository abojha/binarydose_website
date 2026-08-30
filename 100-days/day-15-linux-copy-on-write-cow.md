---
title: "Why Does Linux Use Copy-on-Write (COW)?"
day: 15
category: "Operating Systems"
summary: "Linux fork() uses Copy-on-Write (COW) to make process creation instantaneous by sharing physical memory pages as read-only, only allocating new frames when a process writes to memory."
tags: ["os", "linux", "fork", "copy-on-write", "virtual-memory", "interview", "binary-dose"]
youtubeId: "i1eO3Awtp2Q"
hide_table_of_contents: true
---

## 🎯 The Question

> **"When a parent process with 8 GB of RAM calls `fork()` in Linux, why doesn't the system duplicate all 8 GB of physical RAM immediately? What is Copy-on-Write (COW)?"**

---

## ⚡ 30-Second Elevator Pitch

If `fork()` made a full physical copy of the parent's memory, creating a child process would take hundreds of milliseconds, waste gigabytes of RAM, and crush performance—especially since 90% of `fork()` calls are immediately followed by `exec()`, which discards all that copied memory anyway.

**Copy-on-Write (COW) optimizes this:**
1. When `fork()` is called, Linux duplicates only the **Page Table pointers**, not the physical RAM pages.
2. All shared pages are marked as **`READ-ONLY`** in both parent and child page tables.
3. If either process attempts to **write** to a page, the CPU MMU raises a minor Page Fault trap.
4. The OS allocates a brand new 4 KB physical frame, copies *only that single page*, marks it writable, and resumes execution.

---

## 🧠 Under-the-Hood: The COW Page Fault Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent Process
    actor Child as Child Process
    participant MMU as MMU / Page Table
    participant RAM as Physical RAM Frame

    Note over Parent,Child: 1. fork() creates Child; both point to shared Frame #5 (Read-Only)
    Parent->>MMU: Write data to Page (e.g. var = 42)
    MMU-->>Parent: Hardware Trap: Page is Read-Only! 🛑
    Note over MMU: OS Kernel COW Handler kicks in
    MMU->>RAM: Allocate new Frame #9 & copy 4KB data from Frame #5
    MMU->>Parent: Map Page to Frame #9 (Set Read/Write)
    Parent->>RAM: Write executed on private Frame #9 ✅
    Note over Child: Child continues reading original Frame #5
```

---

## 🔬 Why COW is Critical for `fork()` + `exec()`

In Unix systems, launching a program requires:
1. `fork()`: Creates an identical child process.
2. `execve()`: Overwrites child memory with a new binary executable.

Without COW, `fork()` would duplicate the entire 8 GB heap, only for `execve()` to wipe it 1 millisecond later. With COW, `fork()` completes in **microseconds** by copying a few kilobytes of page table entries.

---

## 📌 Comparison Matrix: Eager Memory Copy vs. Copy-on-Write

| Property | Naive Eager Copy | Linux Copy-on-Write (COW) |
| :--- | :--- | :--- |
| **`fork()` Latency** | Proportional to memory size (Slow, O(N)) | Constant time (Microseconds, O(Page Tables)) |
| **RAM Consumption** | Doubled immediately ($2\times$ process size) | Zero extra RAM initially (Only shared pages) |
| **Page Table Permissions** | Set to Read/Write | Set to Read-Only (`COW` flag in kernel VMA) |
| **`exec()` Efficiency** | Catastrophic waste of RAM and CPU | Optimal (No wasted page copies) |

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"How does Redis Background Saving (`BGSAVE`) leverage Linux Copy-on-Write?"**
   - *Answer*: When Redis creates an RDB snapshot on disk, it calls `fork()` to create a background child process. The child reads the shared read-only in-memory dataset to write the snapshot to disk, while the main Redis parent thread continues serving live write traffic, creating new COW page copies only for modified keys.

2. **"What is the difference between `fork()` and `vfork()`?"**
   - *Answer*: `vfork()` was created before modern COW page tables. It borrows the parent's address space directly and suspends the parent until the child calls `exec()` or `_exit()`. Today, `vfork()` is largely superseded by fast COW `fork()` and `posix_spawn()`.

---

:::tip Placement & Interview Takeaway
**Interview Answer**: Linux uses Copy-on-Write to make `fork()` instantaneous and memory-efficient. Instead of cloning physical RAM, parent and child share physical pages marked read-only. Memory allocation occurs lazily on a per-page basis only when one of the processes attempts a write.
:::

---

## 📺 Video Explanation

<YouTubeEmbed 
  id="i1eO3Awtp2Q" 
  title="Why Does Linux Use Copy-on-Write (COW)? | Interview Question #15" 
/>
