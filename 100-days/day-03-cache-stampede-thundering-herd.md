---
title: "What is a Cache Stampede (Thundering Herd Problem) & How to Prevent It?"
day: 3
category: "System Design"
summary: "When a heavily-accessed cache key expires, thousands of simultaneous requests bypass cache and crush the database."
tags: ["system-design", "caching", "redis", "scalability"]
---

## 🎯 The Question

> **"In a high-throughput distributed system, what happens when a hot cached key suddenly expires, and how do you prevent the database from crashing?"**

---

## ⚡ 30-Second Elevator Pitch

A **Cache Stampede** (also known as the *Thundering Herd* or *Dog-Piling* problem) happens when a heavily-requested key (like the homepage product catalog or trending tweet) expires from Redis/Memcached. 

At that exact millisecond, **thousands of concurrent requests experience a Cache Miss** and simultaneously query the database to recompute the data, causing CPU spikes, DB connection exhaustion, and catastrophic cascading outages.

---

## 🧠 Prevention Strategies

### 1. Mutex / Distributed Lock (Single Flight)
When a cache miss occurs, the first thread acquires a distributed lock (e.g. via `SETNX` in Redis) to query the DB and update the cache. All other threads wait or return a fallback value until the cache is warm.

### 2. Probabilistic Early Expiration (XFetch Algorithm)
Instead of waiting for TTL to reach zero, background workers probabilistically refresh the cache *before* it expires based on compute time and read traffic.

### 3. Background Cron Refresh / Permanent Warm Cache
For critical hot keys, never set a hard TTL. Instead, use a background worker queue (e.g. Celery / Kafka) to proactively recompute and refresh the cache before it goes stale.

---

## 📌 Summary Cheatsheet

| Solution | Mechanism | Tradeoff |
| :--- | :--- | :--- |
| **Distributed Lock** | Only 1 worker hits DB on miss | Other requests wait briefly |
| **Probabilistic Refresh** | Refreshes key before TTL hits 0 | Slightly higher background writes |
| **Permanent Cache + Worker** | Background job constantly updates | Data may lag by few seconds |
