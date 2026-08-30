---
title: "Non-Repeatable Read vs Phantom Read"
day: 43
category: "Databases"
summary: "Non-Repeatable Reads occur when an existing row is modified or deleted by another transaction; Phantom Reads occur when new rows matching a query range are inserted."
tags: ["dbms", "sql", "isolation-levels", "transactions", "mvcc", "phantom-read", "interview", "binary-dose"]
youtubeId: "OfjCtH-lGP4"
hide_table_of_contents: true
---

## 🎯 The Question

> **"What is the exact technical difference between a Non-Repeatable Read and a Phantom Read in database isolation levels? Why doesn't Repeatable Read isolation prevent Phantom Reads in standard SQL-92?"**

---

## ⚡ 30-Second Elevator Pitch

Both concurrency anomalies occur when Transaction $A$ runs the same query twice inside a transaction and gets different results because of Transaction $B$:

* **Non-Repeatable Read (Row-Level Mutation / UPDATE)**:
  - Transaction $A$ reads a specific row (`WHERE id = 10` $\to$ Balance: \$100).
  - Transaction $B$ **modifies (UPDATES or DELETES)** that exact row and commits.
  - Transaction $A$ reads row 10 again and sees altered data (Balance: \$50).
* **Phantom Read (Range-Level Insertion / INSERT)**:
  - Transaction $A$ queries a range (`WHERE age > 30` $\to$ returns 5 rows).
  - Transaction $B$ **inserts a BRAND NEW row** (`age = 35`) and commits.
  - Transaction $A$ runs the range query again and discovers a new "phantom" row (returns 6 rows).

---

## 🧠 Under-the-Hood: Row Locks vs. Gap Locks

```mermaid
sequenceDiagram
    autonumber
    actor T1 as Transaction 1
    actor T2 as Transaction 2
    participant DB as Database Engine

    Note over T1,T2: Scenario 1: Non-Repeatable Read (Row UPDATE)
    T1->>DB: SELECT salary FROM emp WHERE id = 1 (Returns $1000)
    T2->>DB: UPDATE emp SET salary = 2000 WHERE id = 1; COMMIT;
    T1->>DB: SELECT salary FROM emp WHERE id = 1 (Returns $2000! ❌ Value changed)

    Note over T1,T2: Scenario 2: Phantom Read (Range INSERT)
    T1->>DB: SELECT * FROM emp WHERE dept = 'Sales' (Returns 3 rows)
    T2->>DB: INSERT INTO emp (id, dept) VALUES (99, 'Sales'); COMMIT;
    T1->>DB: SELECT * FROM emp WHERE dept = 'Sales' (Returns 4 rows! 👻 Phantom appeared)
```

---

## 🔬 Why Locking Existing Rows Cannot Stop Phantoms

* To prevent **Non-Repeatable Reads**, the database engine places shared read locks (`S-locks`) on **existing records**.
* To prevent **Phantom Reads**, locking existing rows is useless because the phantom row *does not exist yet*. The database must lock the **gaps between rows** using **Next-Key Locks (Index Record Lock + Gap Lock)** or **Serializable Isolation**.

---

## 📌 SQL-92 Isolation Levels Matrix

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Mechanism Used |
| :--- | :--- | :--- | :--- | :--- |
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed | No read locks / Dirty reads |
| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed | Short-lived read locks / MVCC statement snapshots |
| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed (SQL-92 Standard) | Transaction-level MVCC snapshot / Shared row locks |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented | Next-Key locks / 2-Phase Locking / SSI |

*(Note: In InnoDB/MySQL, Repeatable Read also prevents Phantom Reads in consistent reads via MVCC snapshots, and in locking reads via Next-Key locking).*

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"How does MVCC (Multi-Version Concurrency Control) in PostgreSQL handle Repeatable Read?"**
   - *Answer*: Under PostgreSQL MVCC, when a transaction starts, it takes a transaction snapshot. All subsequent reads see the consistent state of the database at that snapshot timestamp. Any rows inserted or updated by concurrent transactions are invisible, preventing both non-repeatable reads and phantom reads during non-locking `SELECT` queries.

2. **"What is a Write Skew anomaly in Repeatable Read?"**
   - *Answer*: Write Skew occurs when two concurrent transactions read overlapping data sets, satisfy an integrity constraint based on those reads, and then perform disjoint updates that together violate the constraint (e.g. two doctors concurrently on-call both reading that 2 doctors are on duty, and both checking out simultaneously). Only **Serializable isolation** prevents write skew.

---

:::tip Placement & Interview Takeaway
**Interview Answer**: Non-repeatable reads occur when concurrent transactions modify or delete existing rows, changing row values between reads. Phantom reads occur when concurrent transactions insert new rows matching a range query filter. Repeatable read locks existing rows, whereas preventing phantom reads requires Next-Key gap locks or Serializable isolation.
:::

---

## 📺 Video Explanation

<YouTubeEmbed 
  id="OfjCtH-lGP4" 
  title="Non-Repeatable Read vs Phantom Read | DBMS Interview #43" 
/>
