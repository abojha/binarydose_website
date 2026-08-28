---
title: "Why is Array Traversal Faster Than Linked List? (CPU Cache Lines)"
day: 1
category: "DSA & Memory"
summary: "Arrays leverage contiguous memory and spatial locality in CPU L1/L2 cache lines, avoiding pointer-chasing latency."
tags: ["dsa", "memory", "cpu-cache", "interview"]
---

## 🎯 The Question

> **"Both iterating through an Array and traversing a Linked List have $O(N)$ time complexity. Why is Array iteration 5x to 10x faster in practice?"**

---

## ⚡ 30-Second Elevator Pitch

While both have identical theoretical $O(N)$ time complexity, **Arrays are stored in contiguous memory**, while **Linked List nodes are scattered across the heap**.

When the CPU accesses an array element, the hardware **prefetches the entire 64-byte Cache Line** into fast L1/L2 CPU cache. For Linked Lists, each `node->next` requires dereferencing an arbitrary memory address, causing constant **CPU Cache Misses** and expensive roundtrips to main RAM (~50–100ns each).

---

## 🧠 Deep Dive: Hardware & Memory Hierarchy

### 1. Spatial Locality & Cache Lines
Modern CPUs do not fetch memory 1 byte or 1 integer at a time. They fetch in chunks called **Cache Lines (typically 64 bytes)**.

- **For an Integer Array (4 bytes per int)**:
  Fetching `arr[0]` automatically pulls `arr[1]` through `arr[15]` into the L1 CPU cache for free. The next 15 loop iterations take **~1 cycle (sub-nanosecond)**.

- **For a Linked List**:
  Each node is allocated on the heap at a different time via `malloc`/`new`. Accessing `node->next` almost always points to a memory address not in the cache, resulting in a **Cache Miss**:

```
Array (Contiguous RAM):
[ 10 | 20 | 30 | 40 | 50 | 60 ]  ---> Loaded in ONE 64-byte Cache Line ✅

Linked List (Scattered Heap):
[Node 1 (0x1000)] -> [Node 2 (0x7420)] -> [Node 3 (0x2150)]  ---> 3 Separate RAM Fetches ❌
```

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"What if the Linked List nodes are allocated inside a custom contiguous pool/arena allocator?"**
   - *Answer*: Traversal speed improves significantly because nodes reside in adjacent memory, though pointer overhead still reduces cache line utilization compared to a raw array.
2. **"When would you still prefer a Linked List over an Array?"**
   - *Answer*: When frequent $O(1)$ insertions/deletions are required at arbitrary positions where an iterator/pointer is already known, or when memory fragmentation prohibits allocating a large contiguous block.

---

## 📌 Summary Cheatsheet

| Metric | Array | Linked List |
| :--- | :--- | :--- |
| **Time Complexity** | $O(N)$ | $O(N)$ |
| **Memory Layout** | Contiguous | Dispersed (Heap) |
| **Cache Friendly?** | ⭐️ Yes (High Spatial Locality) | ❌ No (Frequent Cache Misses) |
| **Hardware Prefetching** | ✅ Predictable stride | ❌ Non-contiguous pointer chasing |
