---
title: Count Unique Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

Given an integer `n`, return *the number of structurally unique **BST'**s (binary search trees) which has exactly* `n` *nodes of unique values from* `1` *to* `n`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg)
    
    ```
    Input: n = 3
    Output: 5
    
    ```
    
    **Example 2:**
    
    ```
    Input: n = 1
    Output: 1
    ```
    

---

## Solution: Memoization (Top‑Down DP)

```cpp
class Solution {
public:
    long long solve(int n, vector<long long> &dp){
        // Base cases: empty tree and single-node tree
        if(n <= 1) return 1;

        if(dp[n] != -1) return dp[n];

        long long ways = 0;
        // Choose each i as root; left has (i-1) nodes, right has (n-i) nodes
        for(int i = 1; i <= n; i++){
            ways += solve(i - 1, dp) * solve(n - i, dp);
        }
        return dp[n] = ways; // memoize and return
    }

    int numTrees(int n) {
        vector<long long> dp(n + 1, -1);
        return (int)solve(n, dp); // fits in 32-bit for constraints
    }
};

```

---

## Solution: Tabulation (Bottom‑Up DP)

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<long long> dp(n + 1, 0);
        dp[0] = 1;             // empty tree
        dp[1] = 1;             // single-node tree

        // Build up from 2 ... n
        for(int m = 2; m <= n; m++){
            long long ways = 0;
            for(int i = 1; i <= m; i++){
                // i as root: left size = i-1, right size = m-i
                ways += dp[i - 1] * dp[m - i];
            }
            dp[m] = ways;
        }
        return (int)dp[n];
    }
};

```

---

## 📝 How It Works

Think of placing each value `i` (1..n) as the **root** of the BST.

- Values `< i` must go to the *left* subtree (and there are `i-1` of them).
- Values `> i` must go to the *right* subtree (and there are `n-i` of them).

If `f(k)` = number of unique BSTs with `k` nodes, then for root `i` we can independently choose any valid left tree and any valid right tree, so we **multiply** the counts and **sum** over all choices of `i`.

Memoization caches `f(k)` to avoid recomputing, while tabulation fills `dp[0..n]` iteratively.

A good analogy: arranging `n` distinct keys into BSTs is like counting how many valid “shapes” of balanced parentheses of length `2n` exist—both are **Catalan numbers** built by pairing independent left/right parts.

---

## 🧩 Key Formula / Recurrence

This is the classic **Catalan** recurrence:
$$
f(n) \;=\; \sum_{i=1}^{n} f(i-1)\cdot f(n-i),
\quad f(0)=1,\; f(1)=1
$$

(Equivalently 
$$
C_n = \sum_{k=0}^{n-1} C_k\,C_{n-1-k}.
$$

)

---

## ⏱️ Time & Space Complexity

- **Memoization / Tabulation Time:** O(n^2) — double loop over `m` and `i`.
- **Memoization Space:** O(n) for the memo table + recursion stack up to O(n).
- **Tabulation Space:** O(n).

---

## ⚠️ Edge Cases

- *n = 0* → 1 tree (the empty tree).
- *n = 1* → 1 tree.
- *Integer overflow in intermediates:** use `long long` for DP/multiplications; final answer for `n ≤ 19` fits in 32‑bit `int` (LeetCode #96).

---

## 💡 Other Approaches

- **Closed-form Catalan:** $$C_n = \frac{1}{n+1}\binom{2n}{n}.$$
    - **Pros:** $O(1)$ loops with big-integer arithmetic.
    - **Cons:** Risk of overflow without big-int; careful with intermediate precision.
- **Divide & Conquer without memo:** Exponential — not recommended.

---

## 🔁 Related Problems

- LeetCode **95. Unique Binary Search Trees II** (construct all trees; same Catalan counting).
- LeetCode **22. Generate Parentheses** (Catalan structure).
- GFG/LC variations: **Number of ways to triangulate a polygon** (Catalan).