---
title: "Mutex vs Spinlock: When Should You Use Which?"
day: 2
category: "Operating Systems"
summary: "Mutex puts waiting threads to sleep (context switch), while Spinlock busy-waits in a CPU loop for ultra-short lock holds."
tags: ["os", "concurrency", "multithreading", "locks"]
---

## 🎯 The Question

> **"Both Mutexes and Spinlocks provide mutual exclusion. What is the fundamental difference in how they handle thread contention, and when would you choose one over the other?"**

---

## ⚡ 30-Second Elevator Pitch

- A **Mutex (Mutual Exclusion)** puts a waiting thread to **sleep** if the lock is held. The OS context-switches to another thread, freeing the CPU core.
- A **Spinlock** makes the waiting thread **busy-wait (spin in a tight `while` loop)** on the CPU until the lock becomes available.

👉 **Rule of Thumb**: Use a **Spinlock** if the critical section is *extremely short* (e.g. updating a counter or in kernel interrupt handlers) because a context switch overhead (~2,000–5,000 CPU cycles) is costlier than a few spinning cycles. Use a **Mutex** if the lock might be held for any meaningful duration or if I/O is involved.

---

## 🧠 Deep Dive: Context Switch vs Busy-Waiting

### 1. Mutex Lifecycle (Sleep & Wakeup)
1. Thread A acquires `mutex`.
2. Thread B attempts to acquire `mutex` $\rightarrow$ fails.
3. Thread B yields the CPU, OS transitions Thread B to `BLOCKED/WAITING` state.
4. OS performs a **Context Switch** to run another thread.
5. Thread A unlocks $\rightarrow$ OS wakes up Thread B via system call.

### 2. Spinlock Lifecycle (Spin Loop)
1. Thread A acquires `spinlock`.
2. Thread B attempts to acquire `spinlock` $\rightarrow$ fails.
3. Thread B remains in `RUNNING` state, executing a tight atomic loop:
   ```c
   while (atomic_flag_test_and_set(&lock)) {
       // CPU spins at 100% core usage
   }
   ```
4. Thread A unlocks $\rightarrow$ Thread B instantly acquires it on the next instruction cycle with **zero context switch latency**.

---

## ⚠️ Important Pitfalls & Interview Traps

> [!WARNING]
> **Never use a Spinlock on a Single-Core CPU without preemptive scheduling!**
> If there is only 1 CPU core and Thread B is spinning, Thread A (the lock holder) will never get CPU time to finish and release the lock, causing a complete deadlock.

> [!CAUTION]
> **Never perform I/O (Disk, Network, `printf`) inside a Spinlock!**
> I/O takes milliseconds, causing spinning threads to waste millions of CPU cycles doing nothing.

---

## 📌 Quick Comparison

| Feature | Mutex | Spinlock |
| :--- | :--- | :--- |
| **Waiting Behavior** | Puts thread to sleep (Blocked) | Busy-waits in a CPU loop (Active) |
| **CPU Usage While Waiting** | 0% (Yields core) | 100% on the core |
| **Best For** | Medium/long critical sections, I/O | Ultra-short critical sections, Kernel/drivers |
| **Overhead** | Context switch cost (~2–5 µs) | Zero context switch, but burns CPU power |
