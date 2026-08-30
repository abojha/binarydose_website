---
title: "Why LIKE '%term' Destroys Database Performance"
day: 22
category: "Databases"
summary: "Leading wildcard queries (LIKE '%term') cannot use sorted B+ Tree indexes because tree traversal requires a known prefix, forcing slow, full-table scans across millions of rows."
tags: ["dbms", "sql", "indexing", "b-tree", "performance", "interview", "binary-dose"]
youtubeId: "A7hoxdWDKqA"
hide_table_of_contents: true
---

## 🎯 The Question

> **"If a table column `name` has a B+ Tree index, why does `WHERE name LIKE 'John%'` execute in 1 ms, but `WHERE name LIKE '%John'` takes 10 seconds and consumes 100% CPU?"**

---

## ⚡ 30-Second Elevator Pitch

Database indexes (B+ Trees) store keys in **strictly sorted alphabetical order** (like a printed telephone directory).

* **Trailing Wildcard (`LIKE 'John%'`)**:
  Because the **prefix is known**, the database performs a fast binary search ($O(\log N)$) to jump directly to the first `"John"`, and scans forward until `"Joho"`.
* **Leading Wildcard (`LIKE '%John'`)**:
  Because the prefix is unknown, the target could be `"Elton John"`, `"Papa John"`, or `"Little John"`. The sorted tree structure is completely useless, forcing the engine to abandon the index and perform a **Full Table Scan ($O(N)$)**, inspecting every single string from disk.

---

## 🧠 The Phonebook Analogy: B-Tree Left-Prefix Matching

```mermaid
flowchart TD
    subgraph Phonebook["Sorted Index: [Alice, Bob, David, Elton John, John Doe, Papa John]"]
        P1["Query: LIKE 'John%' (Known Prefix 'J')"]
        P2["Query: LIKE '%John' (Unknown Prefix '%')"]
    end

    P1 -->|Direct Binary Search O(log N)| Match1["⚡ Fast Index Range Scan: Finds 'John Doe' instantly"]
    P2 -->|Cannot navigate sorted tree| Match2["🐢 Full Table Scan: Must read all 10,000,000 rows"]
```

---

## 🔬 How to Optimize Wildcard Searches in Production

1. **Reverse String Indexing (for suffixes)**:
   - If querying suffixes like `LIKE '%@gmail.com'`, store a generated column `REVERSE(email)` with an index, and search `WHERE reverse_email LIKE 'moc.liamg@%'`.
2. **Trigram Indexes (`pg_trgm` in PostgreSQL)**:
   - Breaks text into 3-letter trigrams (e.g., `"John"` $	o$ `["joh", "ohn"]`) inside a **GIN (Generalized Inverted Index)**.
3. **Full-Text Search Engines**:
   - For arbitrary substring searches across large texts, use dedicated inverted index engines like **Elasticsearch / Meilisearch**.

---

## 📌 Comparison Matrix: SQL Wildcard Query Performance

| SQL Query Pattern | Index Usability | Search Mechanism | Query Complexity |
| :--- | :--- | :--- | :--- |
| `WHERE name = 'John'` | ✅ 100% Index Match | Exact B+ Tree Point Lookup | $O(\log N)$ |
| `WHERE name LIKE 'John%'` | ✅ Index Range Scan | Left-prefix binary search + scan | $O(\log N + K)$ |
| `WHERE name LIKE '%John'` | ❌ Index Abandoned | Full Table Scan (Heap disk read) | $O(N)$ |
| `WHERE name LIKE '%John%'`| ❌ Index Abandoned | Full Table Scan (Unless GIN Trigram) | $O(N)$ |

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"What is the Leftmost Prefix Rule in Composite Indexes?"**
   - *Answer*: For a composite index on `(A, B, C)`, queries filtering on `(A)` or `(A, B)` or `(A, B, C)` can use the index. However, queries filtering on `(B, C)` alone cannot use the index because the leading column `A` is missing, breaking the sorted hierarchy.

2. **"Does `WHERE UPPER(name) LIKE 'JOHN%'` use a standard index on `name`?"**
   - *Answer*: **No.** Applying a function to an indexed column prevents the B+ Tree from matching raw keys. You must create a **Function-Based Index** (e.g. `CREATE INDEX idx ON users (UPPER(name));`) to enable index lookup.

---

:::tip Placement & Interview Takeaway
**Interview Answer**: B+ Tree indexes require a known left prefix to perform binary searches down the tree hierarchy. Leading wildcard queries (`%term`) break left-prefix ordering, forcing the database engine to perform an expensive Full Table Scan across the entire dataset.
:::

---

## 📺 Video Explanation

<YouTubeEmbed 
  id="A7hoxdWDKqA" 
  title="Why LIKE '%term' Destroys Database Performance | Interview Question #22" 
/>
