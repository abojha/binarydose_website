---
title: Minimum/Maximum Falling Path Sum
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

Given an `n x n` array of integers `matrix`, return *the **minimum sum** of any **falling path** through* `matrix`.

A **falling path** starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position `(row, col)` will be `(row + 1, col - 1)`, `(row + 1, col)`, or `(row + 1, col + 1)`.

- Example:
    
    ```
    Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
    Output: 13
    Explanation: There are two falling paths with a minimum sum as shown.
    ```
    

---

---

### Solution: Memoization

```cpp
class Solution {
public:
    int getMinPath(int i, int j, int n, vector<vector<int>> &mat, vector<vector<int>> &dp){
        // If column is out of bounds, path is invalid
        if(j < 0 || j >= n) return INT_MAX;

        // If we're in the first row, return the value directly
        if(i == 0) return mat[0][j];

        // If already computed, return cached value
        if(dp[i][j] != -1) return dp[i][j];

        // Recursive calls for top, top-left, and top-right
        int up = getMinPath(i - 1, j, n, mat, dp);
        int leftDiag = getMinPath(i - 1, j - 1, n, mat, dp);
        int rightDiag = getMinPath(i - 1, j + 1, n, mat, dp);

        return dp[i][j] = mat[i][j] + min({up, leftDiag, rightDiag});
    }

    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));

        int result = INT_MAX;

        // Try starting from every cell in the last row
        for(int j = 0; j < n; j++){
            int val = getMinPath(n - 1, j, n, matrix, dp);
            result = min(result, val);
        }

        return result;
    }
};

```

---

---

### Solution: Tabulation

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& mat) {
        int n = mat.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));

        // Base row is copied
        for(int j = 0; j < n; j++) {
            dp[0][j] = mat[0][j];
        }

        for(int i = 1; i < n; i++) {
            for(int j = 0; j < n; j++) {
                int up = dp[i - 1][j];
                int leftDiag = (j > 0) ? dp[i - 1][j - 1] : INT_MAX;
                int rightDiag = (j < n - 1) ? dp[i - 1][j + 1] : INT_MAX;

                dp[i][j] = mat[i][j] + min({up, leftDiag, rightDiag});
            }
        }

        return *min_element(dp[n - 1].begin(), dp[n - 1].end());
    }
};

```

---

---

### Solution: Space Optimized

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& mat) {
        int n = mat.size();
        vector<int> prev(n);

        // Base row initialization
        for(int j = 0; j < n; j++) {
            prev[j] = mat[0][j];
        }

        for(int i = 1; i < n; i++) {
            vector<int> temp(n, 0);
            for(int j = 0; j < n; j++) {
                int up = prev[j];
                int leftDiag = (j > 0) ? prev[j - 1] : INT_MAX;
                int rightDiag = (j < n - 1) ? prev[j + 1] : INT_MAX;

                temp[j] = mat[i][j] + min({up, leftDiag, rightDiag});
            }
            prev = temp;
        }

        return *min_element(prev.begin(), prev.end());
    }
};

```

---

### ✅ **How It Works**

- You're given an **n x n matrix**.
- Start from any element in the **first row**, and at each step move to:
    - the element directly **below**,
    - the **left-diagonal** (i+1, j-1), or
    - the **right-diagonal** (i+1, j+1).
- Your goal is to find the **minimum falling path sum**, ending at any element in the **last row**.
- Use **Dynamic Programming** to store intermediate results and avoid recomputation.

---

### 🧩 **Key Formula**

- `dp[i][j] = matrix[i][j] + min(dp[i-1][j], dp[i-1][j-1], dp[i-1][j+1])`
- For the base case: `dp[0][j] = matrix[0][j]` for all `j`

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization (Top-Down) | O(n²) | O(n²) |
| Tabulation (Bottom-Up) | O(n²) | O(n²) |
| Space Optimized ✅ | O(n²) | O(n) |

---

### ⚠️ **Edge Cases**

- If matrix has only one row, return the minimum element of that row.
- If all elements are the same, multiple paths will yield the same result.
- Negative numbers in matrix — your algorithm must handle them correctly.

---

### 💡 **Other Approaches**

| Approach | Description |
| --- | --- |
| Recursion Only ❌ | Exponential time — too slow. |
| Memoization ✅ | Top-down with cache. |
| Tabulation ✅ | Bottom-up filling. |
| Space Optimized ✅ | Keep only one row in memory. |

---

### 🔁 **Related Problems**

- Minimum Path Sum (Grid)
- Triangle Minimum Path Sum
- Unique Paths with Obstacles
- Gold Mine Problem
- Maximum Path Sum in a Matrix