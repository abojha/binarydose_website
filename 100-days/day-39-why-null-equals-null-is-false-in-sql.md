---
title: "Why NULL = NULL is FALSE in SQL"
day: 39
category: "Databases"
summary: "In SQL Three-Valued Logic (3VL), NULL represents an unknown value rather than an empty value; comparing two unknowns yields UNKNOWN, which evaluates to FALSE in WHERE clauses."
tags: ["dbms", "sql", "null", "three-valued-logic", "interview", "binary-dose"]
youtubeId: "mLa_yLBSyag"
hide_table_of_contents: true
---

## 🎯 The Question

> **"If you execute `SELECT * FROM users WHERE bonus = NULL;` in SQL, why does it return 0 rows even when rows with NULL bonuses exist? Why is `NULL = NULL` not TRUE?"**

---

## ⚡ 30-Second Elevator Pitch

In SQL, `NULL` does **not** mean zero, empty string `""`, or a specific value. `NULL` represents **"Unknown" or "Missing Information"**.

Consider this real-world analogy:
* We don't know Alice's salary (`NULL`).
* We don't know Bob's salary (`NULL`).
* **Is Alice's salary equal to Bob's salary?** We cannot say "Yes" ($TRUE$) or "No" ($FALSE$). The only correct answer is **"We don't know" (`UNKNOWN`)**.

Because SQL `WHERE` clauses only return rows where conditions evaluate strictly to **`TRUE`**, any comparison with `NULL` using `=`, `!=`, or `<>` produces **`UNKNOWN`** (which filters out the row).

---

## 🧠 Under-the-Hood: Three-Valued Logic (3VL) Truth Table

SQL uses **Three-Valued Logic (3VL)**: `TRUE`, `FALSE`, and `UNKNOWN`:

```mermaid
flowchart TD
    subgraph ThreeVL["SQL Three-Valued Logic (3VL)"]
        C1["Condition: bonus = NULL"] --> R1["Evaluates to: UNKNOWN"]
        R1 --> W{"WHERE filter check: Is result TRUE?"}
        W -->|No (UNKNOWN is not TRUE)| D["❌ Row Filtered Out (0 rows returned)"]
    end
```

---

## 🔬 Truth Tables for `UNKNOWN`

| Expression | Evaluates To | Behavior in `WHERE` Clause |
| :--- | :--- | :--- |
| `NULL = NULL` | **UNKNOWN** | Filtered out (Treated as False) |
| `NULL != NULL` | **UNKNOWN** | Filtered out |
| `NULL = 10` | **UNKNOWN** | Filtered out |
| `TRUE AND UNKNOWN` | **UNKNOWN** | Filtered out |
| `FALSE AND UNKNOWN` | **FALSE** | Filtered out |
| `TRUE OR UNKNOWN` | **TRUE** ✅ | Included |
| `val IS NULL` | **TRUE** (if val is null) ✅ | Included |

---

## 📌 The Correct Syntax: `IS NULL` and `IS NOT DISTINCT FROM`

To check for null values in SQL:
```sql
-- ❌ WRONG: Returns 0 rows
SELECT * FROM users WHERE bonus = NULL;

-- ✅ CORRECT: Uses SQL IS predicate
SELECT * FROM users WHERE bonus IS NULL;

-- ✅ PostgreSQL / Modern SQL: Null-safe equality
SELECT * FROM users WHERE bonus IS NOT DISTINCT FROM NULL;
```

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"What is the trap with `WHERE id NOT IN (SELECT manager_id FROM employees)` when the subquery contains a single NULL?"**
   - *Answer*: **The query returns ZERO rows!** `NOT IN (1, 2, NULL)` expands to `id != 1 AND id != 2 AND id != NULL`. Since `id != NULL` is `UNKNOWN`, the entire `AND` expression evaluates to `UNKNOWN` or `FALSE` for every single row, breaking the query. **Fix**: Use `NOT EXISTS` or filter `WHERE manager_id IS NOT NULL`.

2. **"How does `COUNT(*)` differ from `COUNT(column_name)` with NULL values?"**
   - *Answer*: `COUNT(*)` counts the total number of rows in the table (including rows with nulls). `COUNT(column_name)` counts only rows where `column_name` is **non-NULL**, completely ignoring null entries.

---

:::tip Placement & Interview Takeaway
**Interview Answer**: `NULL = NULL` is not TRUE because SQL follows Three-Valued Logic where NULL represents an unknown value. Comparing two unknown values yields `UNKNOWN`, which evaluates to false in `WHERE` filters. You must always use the `IS NULL` predicate for null checks.
:::

---

## 📺 Video Explanation

<YouTubeEmbed 
  id="mLa_yLBSyag" 
  title="Why NULL = NULL is FALSE in SQL | Interview Question #39" 
/>
