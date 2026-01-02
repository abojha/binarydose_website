---
title: "Page faults don’t always mean disk access"
tags: [operating-systems, memory]
authors: [binarydose]
---

A very common misconception in Operating Systems is that **every page fault means the OS must access the disk**.  
That is **not always true**.

A page fault simply means that the required page is **not usable in the current context**.  
This can happen for multiple reasons.

In many cases, the page is **already present in main memory**, but:

<!-- truncate -->
- the access permission is missing, or  
- the page table entry is marked invalid temporarily.

In such situations, the operating system:
1. Updates the page table entry  
2. Fixes the permission or state  
3. Resumes execution  

➡️ **No disk access happens here.**

Disk access occurs only during a **major page fault**, when the page is truly absent from memory.

Understanding this distinction is important for:
- Performance analysis  
- OS internals  
- Interview questions related to virtual memory  

This detail often separates a surface-level answer from a strong conceptual one.
