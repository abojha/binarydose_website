---
title: "Why `volatile` is not thread-safe in C/C++"
tags: [c++, concurrency, operating-systems]
authors: [abhay]
---

A very common misunderstanding in C and C++ is assuming that the `volatile` keyword makes code **thread-safe**.  
It does **not**.....

<!-- truncate -->

The purpose of `volatile` is to tell the compiler **not to optimize away memory accesses**.  
It ensures that every read or write actually happens in memory.

However, `volatile` does **not** provide:
- Atomicity  
- Mutual exclusion  
- Synchronization between threads  

This means that multiple threads can still:
- Read stale values  
- Overwrite each other’s updates  
- Cause race conditions  

Thread safety requires proper synchronization mechanisms such as:
- Mutexes  
- Locks  
- Atomic operations  

This distinction is especially important in:
- Multithreaded programming  
- OS and concurrency concepts  
- Technical interviews  

Using `volatile` for thread safety is a subtle mistake that often leads to incorrect reasoning about concurrent code.
