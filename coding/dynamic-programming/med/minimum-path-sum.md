---
title: Minimum Path Sum
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

- Example:
    
    ```
    Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
    Output: 7
    Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
    Example 2:
    
    Input: grid = [[1,2,3],[4,5,6]]
    Output: 12
    ```
    

---

---

### Solution: Memoization

```cpp
class Solution {
public:
    // Recursive function with memoization to find min path sum to cell (i, j)
    int minPath(int i, int j, vector<vector<int>> &mat, vector<vector<int>> &dp) {
        // Base case: starting cell
        if(i == 0 && j == 0) return mat[i][j];

        // If out of bounds, return max to avoid considering this path
        if(i < 0 || j < 0) return INT_MAX;

        // Return previously computed value if exists
        if(dp[i][j] != -1) return dp[i][j];

        // Recursive calls to top and left cells
        int up = minPath(i - 1, j, mat, dp);
        int left = minPath(i, j - 1, mat, dp);

        // Store the result in dp and return
        return dp[i][j] = mat[i][j] + min(up, left);
    }

    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();      // Number of rows
        int n = grid[0].size();   // Number of columns

        // Initialize memoization table with -1
        vector<vector<int>> dp(m, vector<int>(n, -1));

        // Start from bottom-right and compute recursively
        return minPath(m - 1, n - 1, grid, dp);
    }
};

```

---

---

### Solution:

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();      // Number of rows
        int n = grid[0].size();   // Number of columns

        // Initialize DP table
        vector<vector<int>> dp(m, vector<int>(n, -1));

        // Fill the table from top-left to bottom-right
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {

                // Starting cell
                if(i == 0 && j == 0) {
                    dp[i][j] = grid[i][j];
                    continue;
                }

                int up = INT_MAX;
                int left = INT_MAX;

                // Get value from the top cell
                if(i > 0) {
                    up = dp[i - 1][j];
                }

                // Get value from the left cell
                if(j > 0) {
                    left = dp[i][j - 1];
                }

                // Current cell = grid value + min(up, left)
                dp[i][j] = grid[i][j] + min(up, left);
            }
        }

        // Return the value from bottom-right cell
        return dp[m - 1][n - 1];
    }
};

```

---

---

### Solution:

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();      // Number of rows
        int n = grid[0].size();   // Number of columns

        // DP array to store previous row
        vector<int> prev(n, 0);

        // Traverse each row
        for(int i = 0; i < m; i++) {
            // Temporary array to store current row values
            vector<int> temp(n, 0);

            for(int j = 0; j < n; j++) {

                // Starting cell
                if(i == 0 && j == 0) {
                    temp[j] = grid[i][j];
                    continue;
                }

                int up = INT_MAX;
                int left = INT_MAX;

                // Get value from top cell
                if(i > 0) {
                    up = prev[j];
                }

                // Get value from left cell
                if(j > 0) {
                    left = temp[j - 1];
                }

                // Compute min path sum for this cell
                temp[j] = grid[i][j] + min(up, left);
            }

            // Update prev row for next iteration
            prev = temp;
        }

        // Final result in last cell of last row
        return prev[n - 1];
    }
};

```

---

### ✅ **How It Works**

- Move only **right** or **down** in a `m x n` grid.
- Each cell has a cost; find a path from **(0, 0)** to **(m-1, n-1)** with **minimum total cost**.
- Use **DP** to store minimum cost to reach each cell.

---

### 🧠 **Key Formula**

- `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`
    - From **top** or **left**, whichever is smaller
- Base case: `dp[0][0] = grid[0][0]`

---

### ⏱️ **Time & Space Complexity**

| Version | Time | Space |
| --- | --- | --- |
| Memoization | O(m·n) | O(m·n) |
| Tabulation | O(m·n) | O(m·n) |
| Space Optimized ✅ | O(m·n) | O(n) |

---

### ⚠️ **Edge Cases**

- Single row or column → straight-line path
- Large values → no overflow due to `INT_MAX` guard
- Empty grid → not valid input in constraints

---

### 🔁 **Related Problems**

| Problem | Description |
| --- | --- |
| 🔸 Unique Paths | Count all paths with no weights |
| 🔸 Minimum Falling Path Sum | Can move down, left-diagonal, or right-diagonal |
| 🔸 Cherry Pickup | Advanced pathfinding |
| 🔸 Triangle Minimum Path Sum | DP on triangular grid |