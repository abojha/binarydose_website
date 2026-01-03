---
title: Matrix Chain Multiplication (Tabulation)
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

---

## ✅ Solution: Tabulation (Bottom-Up DP)

```cpp
class Solution {
  public:
    int matrixMultiplication(vector<int> &arr) {
        int n = arr.size();
        // dp[i][j] = min number of multiplications needed to multiply matrices from i to j
        vector<vector<int>> dp(n, vector<int> (n, 0));

        // i goes from n-1 to 1 (as we want smaller lengths first)
        for(int i = n - 1; i >= 1; i--){
            for(int j = i + 1; j <= n - 1; j++){
                int mini = INT_MAX;

                // Try all possible partitions k
                for(int k = i; k <= j - 1; k++){
                    // Cost = cost of left * cost of right * cost of multiplying the result
                    int steps = arr[i - 1] * arr[k] * arr[j] + dp[i][k] + dp[k + 1][j];
                    mini = min(mini, steps);
                }

                dp[i][j] = mini;  // Store the minimum cost
            }
        }

        return dp[1][n - 1];  // Answer is from matrix 1 to n-1
    }
};

```

---

## 📝 How It Works

- We convert the recursive relation into a **bottom-up** iterative process.
- Instead of computing `dp[i][j]` recursively, we build it from smaller subproblems.
- For each chain length, we calculate the cost of multiplying matrices from `i` to `j` using all possible partitions.
- The main idea: **minimize scalar multiplications** by trying every partition point `k`.

---

## 🧩 Key Formula / Transition

```
dp[i][j] = min(dp[i][k] + dp[k+1][j] + arr[i-1] * arr[k] * arr[j]) for all k ∈ [i, j-1]

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N³) ✅ |
| Space | O(N²) ✅ |
| N | `arr.size()` |

---

## ⚠️ Edge Cases

- Only 1 matrix → no multiplication needed → cost = 0
- Very large dimensions → avoid overflow (use `long long` if needed)
- Non-optimal parenthesization leads to huge cost difference

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Memoization | O(N³) ✅ | O(N²) | Top-down with recursion |
| Tabulation | O(N³) ✅ | O(N²) | Bottom-up (more intuitive) |
| Brute Force | ❌ Exp | ❌ | Too slow |

---

## 🔁 Related Problems

- [Burst Balloons](https://leetcode.com/problems/burst-balloons/)
- [Boolean Parenthesization](https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/)
- [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/)
- [Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/)

---