---
title: Minimum path sum in Triangular Grid
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

Given a `triangle` array, return *the minimum path sum from top to bottom*.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.

- Example:
    
    ```
    Example 1:
    
    Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
    Output: 11
    Explanation: The triangle looks like:
       2
      3 4
     6 5 7
    4 1 8 3
    The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
    Example 2:
    
    Input: triangle = [[-10]]
    Output: -10
     
    ```
    

---

---

### Solution: Memoization

```cpp
class Solution {
public:
    // Recursive function to calculate minimum path sum from (i, j) to bottom
    int minTot(int i, int j, int n, vector<vector<int>> &triangle, vector<vector<int>> &dp) {
        // Base case: last row, just return value
        if(i == n - 1) return triangle[i][j];

        // If already calculated, return stored result
        if(dp[i][j] != -1) return dp[i][j];

        // Recursive call: move down
        int down = minTot(i + 1, j, n, triangle, dp);
        
        // Recursive call: move diagonal
        int diagonal = minTot(i + 1, j + 1, n, triangle, dp);

        // Store and return minimum of the two paths
        return dp[i][j] = triangle[i][j] + min(down, diagonal);
    }

    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();

        // Memoization table
        vector<vector<int>> dp(n, vector<int>(n, -1));

        return minTot(0, 0, n, triangle, dp);
    }
};

```

---

---

### Solution: Tabulation

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();

        // DP table initialized with -1
        vector<vector<int>> dp(n, vector<int>(n, -1));

        // Fill the last row with triangle values
        for(int j = 0; j < n; j++) {
            dp[n - 1][j] = triangle[n - 1][j];
        }

        // Bottom-up calculation from second-last row upwards
        for(int i = n - 2; i >= 0; i--) {
            for(int j = i; j >= 0; j--) {
                int down = dp[i + 1][j];
                int diagonal = dp[i + 1][j + 1];

                dp[i][j] = triangle[i][j] + min(down, diagonal);
            }
        }

        // Final result at the top of the triangle
        return dp[0][0];
    }
};

```

---

---

### Solution: Space Optimized

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();

        // One array to hold next row
        vector<int> nex(n, -1);

        // Initialize with last row of triangle
        for(int j = 0; j < n; j++) {
            nex[j] = triangle[n - 1][j];
        }

        // Traverse triangle from bottom-2 row to top
        for(int i = n - 2; i >= 0; i--) {
            vector<int> temp(n, -1); // Temporary row storage

            for(int j = i; j >= 0; j--) {
                int down = nex[j];
                int diagonal = nex[j + 1];

                temp[j] = triangle[i][j] + min(down, diagonal);
            }

            // Update next row
            nex = temp;
        }

        // Final answer at top
        return nex[0];
    }
};

```

---

### ✅ **How It Works**

- You're given a **triangle**, and you need to reach the bottom from the top with the **minimum total path sum**.
- At each step, you can only move to the adjacent numbers **below** or **diagonally below-right**.
- Use **DP** to avoid recalculating overlapping subproblems.

---

### 🧩 **Key Formula**

- `dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])`

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization (Top-Down) | O(n²) | O(n²) |
| Tabulation (Bottom-Up) | O(n²) | O(n²) |
| Space Optimized ✅ | O(n²) | O(n) |

---

### ⚠️ **Edge Cases**

- All values in triangle are negative.
- Triangle with just one row.
- Multiple paths give same minimum sum.

---

### 💡 **Other Approaches**

| Approach | Time |
| --- | --- |
| Recursion only | Exponential ❌ |
| Recursion + Memoization ✅ | O(n²) |
| Tabulation ✅ | O(n²) |
| Space Optimized ✅ | O(n²) |

---

### 🔁 **Related Problems**

- Minimum Path Sum in Grid
- Maximum Path Sum in Triangle
- [Triangle to Square Matrix DP Problems]
- Minimum Falling Path Sum