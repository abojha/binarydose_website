---
title: Count Square Submatrices with All Ones
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - squares
---

### Problem Statement:

Given a `m * n` matrix of ones and zeros, return how many **square** submatrices have all ones.

- Example:
    
    ```
    Input: matrix =
    [
      [0,1,1,1],
      [1,1,1,1],
      [0,1,1,1]
    ]
    Output: 15
    Explanation: 
    There are 10 squares of side 1.
    There are 4 squares of side 2.
    There is  1 square of side 3.
    Total number of squares = 10 + 4 + 1 = 1
    ```
    

---

---

## ✅ Solution: Tabulation (Bottom-Up DP)

```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int rows = matrix.size();
        int cols = matrix[0].size();

        // DP table to store max square length ending at (i, j)
        vector<vector<int>> dp(rows, vector<int>(cols, 0));

        // Initialize first row and column
        for(int i = 0; i < rows; i++) dp[i][0] = matrix[i][0];
        for(int j = 0; j < cols; j++) dp[0][j] = matrix[0][j];

        // Fill DP table
        for(int i = 1; i < rows; i++) {
            for(int j = 1; j < cols; j++) {
                if (matrix[i][j] != 0) {
                    dp[i][j] = min({dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]}) + 1;
                } else {
                    dp[i][j] = 0;
                }
            }
        }

        // Sum up all squares
        int sum = 0;
        for(int i = 0; i < rows; i++) {
            for(int j = 0; j < cols; j++) {
                sum += dp[i][j];
            }
        }

        return sum;
    }
};

```

---

## 📝 How It Works

- Each cell `dp[i][j]` represents the **largest square submatrix with all 1s** ending at `(i, j)`.
- If `matrix[i][j] == 1`, then:
    - It contributes a square of size 1 at least.
    - We can extend a square from `top`, `left`, and `diagonal` if they all support a square of side ≥ 1.
- So we take the **minimum of the 3 directions** and add 1.
- We sum all the `dp[i][j]` values because:
    - `dp[i][j] = k` implies there are `k` squares ending at `(i,j)` of sizes `1x1` to `kxk`.

---

## 🧩 Key Formula

```cpp
dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if matrix[i][j] == 1

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N * M) |
| Space | O(N * M) |

You can optimize space to O(M) if needed using two 1D arrays (`prev` and `curr`).

---

## ⚠️ Edge Cases

- Matrix full of 0’s → return 0
- Matrix full of 1’s → return sum of first N natural numbers across all square sizes
- Single row or column → works since base case is handled

---

## 💡 Other Approaches

| Approach | Time | Space | Note |
| --- | --- | --- | --- |
| Brute Force | O(N³) ❌ | O(1) | Too slow for large grid |
| Tabulation | O(N*M) ✅ | O(N*M) | Efficient |
| Space Opt. | O(N*M) | O(M) ✅ | Further optimizable |

---

## 🔁 Related Problems

- [Leetcode 221 – Maximal Square](https://leetcode.com/problems/maximal-square/)
- [Leetcode 85 – Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- [Leetcode 1277 – Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)

---