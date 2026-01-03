---
title: Matrix Chain Multiplication
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - mcm
---

### Problem Statement:

Given an array **arr[]** which represents **the** dimensions of a sequence of matrices where the **ith** matrix has the dimensions **(arr[i-1] x arr[i])** for i>=1, find the most efficient way to multiply these matrices together. The efficient way is the one that involves the least number of multiplications.

- Example:
    
    ```
    Input: arr[] = [2, 1, 3, 4]
    Output: 20
    Explanation: There are 3 matrices of dimensions 2 × 1, 1 × 3, and 3 × 4, Let this 3 input matrices be M1, M2, and M3. There are two ways to multiply: ((M1 x M2) x M3) and (M1 x (M2 x M3)), note that the result of (M1 x M2) is a 2 x 3 matrix and result of (M2 x M3) is a 1 x 4 matrix. 
    ((M1 x M2) x M3)  requires (2 x 1 x 3) + (2 x 3 x 4) = 30 
    (M1 x (M2 x M3))  requires (1 x 3 x 4) + (2 x 1 x 4) = 20. 
    The minimum of these two is 20
    ```
    

---

---

## ✅ Solution: Memoization (Top-Down)

```cpp
class Solution {
public:
    // Recursive DP function to compute minimum multiplication cost
    int solve(int i, int j, vector<int> &arr, vector<vector<int>> &dp){
        if(i == j) return 0;  // Only one matrix — no multiplication needed

        if(dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;

        // Try all possible positions to split the chain
        for(int k = i; k <= j - 1; k++){
            // Cost = cost of multiplying left part + right part + cost of merging both
            int steps = arr[i - 1] * arr[k] * arr[j]
                      + solve(i, k, arr, dp)
                      + solve(k + 1, j, arr, dp);

            mini = min(mini, steps);
        }

        return dp[i][j] = mini;
    }

    int matrixMultiplication(vector<int> &arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int> (n, -1));
        return solve(1, n - 1, arr, dp);  // We start from index 1 because i-1 is used
    }
};

```

---

## 📝 How It Works

- Given dimensions of `n` matrices stored as an array `arr` of size `n`, where matrix `i` is of size `arr[i-1] x arr[i]`.
- We need to find the **optimal way to parenthesize** the chain of matrices to **minimize the number of scalar multiplications**.
- At each step, we try splitting between `i` and `j` and calculate:
    - Cost of left multiplication
    - Cost of right multiplication
    - Cost to multiply both parts together: `arr[i-1] * arr[k] * arr[j]`
- Use memoization with `dp[i][j]` to store the result of minimum cost from matrix `i` to `j`.

---

## 🧩 Key Formula / Recurrence

```
dp[i][j] = min over all k in [i, j-1] of:
           dp[i][k] + dp[k+1][j] + arr[i-1]*arr[k]*arr[j]

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N³) ✅ |
| Space | O(N²) ✅ |
| N = # matrices | `arr.size() - 1` |

---

## ⚠️ Edge Cases

- Single matrix → cost is 0 (no multiplication)
- Arrays of size ≤ 2 → direct return without recursion
- Very large dimensions → make sure `int` doesn't overflow (consider using `long long`)

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Memoization | O(N³) ✅ | O(N²) | Top-down recursion |
| Tabulation | O(N³) ✅ | O(N²) | Bottom-up DP (recommended) |
| Brute Force | Exponential ❌ | ❌ | Not practical |

---

## 🔁 Related Problems

- [Burst Balloons](https://leetcode.com/problems/burst-balloons/)
- [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/)
- [Boolean Parenthesization](https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/)
- [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/)

---