---
title: The celebrity Problem
description: ""
tags:
  - implementation
  - med
  - problem
  - stack-queue
---

Link: https://www.geeksforgeeks.org/problems/the-celebrity-problem/1
Summary: Use two pointer appraoach

### Problem Statement:

A celebrity is a person who is known to all but **does not know** anyone at a party. A party is being organized by some people. A square matrix **mat[][]** (n*n) is used to represent people at the party such that if an element of **row i and column j is set to 1** it means **ith person knows jth person**. You need to return the **index of the celebrity** in the party, if the celebrity does not exist, return **-1**.

**Note:** Follow **0-based** indexing.

```
Input: mat[][] = [[1, 1, 0], [0, 1, 0], [0, 1, 1]]
Output: 1
Explanation: 0th and 2nd person both know 1st person. Therefore, 1 is the celebrity person. 
```

### Solution:

## ✅ Solution: Two-Pointer Elimination + Verification — Celebrity Problem

```cpp
int celebrity(vector<vector<int>>& M) {
    int n = M.size();
    int i = 0, j = n - 1;

    // Step 1: Find the candidate by eliminating non-celebrities
    while (i < j) {
        if (M[i][j] == 1) {
            i++;  // i knows j => i is not a celebrity
        } else {
            j--;  // i doesn't know j => j is not a celebrity
        }
    }

    int candidate = i;

    // Step 2: Verify the candidate
    for (int k = 0; k < n; k++) {
        if (k != candidate) {
            if (M[candidate][k] == 1 || M[k][candidate] == 0) {
                return -1;  // Candidate knows someone, or someone doesn't know candidate
            }
        }
    }

    return candidate;
}

```

---

## 📝 How It Works

- **Objective:**
    
    Find the celebrity in a party where:
    
    1. Celebrity knows no one.
    2. Everyone knows the celebrity.
- **Step 1: Candidate Selection**
    - Use two pointers `i` and `j`:
        - If `M[i][j] == 1`, eliminate `i`.
        - If `M[i][j] == 0`, eliminate `j`.
    - By the end, `i == j` points to a potential candidate.
- **Step 2: Verification**
    - For all `k != candidate`:
        - Ensure `M[candidate][k] == 0`.
        - Ensure `M[k][candidate] == 1`.
    - If both conditions hold for all `k`, return `candidate`. Otherwise, return `1`.

---

## 🧩 Key Formula

- Elimination logic:
    
    ```
    M[i][j] == 1 → i cannot be a celebrity
    M[i][j] == 0 → j cannot be a celebrity
    
    ```
    
- Verification condition for `candidate`:
    
    ```
    ∀k ≠ candidate:
        M[candidate][k] == 0 AND M[k][candidate] == 1
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Step | Time Complexity | Space Complexity |
| --- | --- | --- |
| Candidate Selection | O(N) | O(1) |
| Verification | O(N) | O(1) |
| **Total** | O(N) | O(1) |

---

## ⚠️ Edge Cases

- No celebrity exists → Should return `1`.
- Single person (n = 1) → That person is trivially a celebrity.
- All rows and columns contain `1`s → No celebrity.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Check all rows and columns manually. |

---

## 🔁 Related Problems

- LeetCode 277: Find the Celebrity
- LeetCode 997: Find the Town Judge (variation of this problem)
- LeetCode 2178: Maximum Split of Positive Even Integers (different topic but similar elimination logic)

---

## 🛠️ Other Notes

- ✅ Real-world analogy:
    
    Finding a "VIP guest" in a party who is known by everyone but interacts with no one.
    
- ✅ This problem is a classic **two-pointer elimination + verification** pattern.
- ✅ Works efficiently with **O(N)** time without using extra space or graph data structures.