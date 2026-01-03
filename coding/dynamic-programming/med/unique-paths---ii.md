---
title: Unique Paths - II
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

You are given an `m x n` integer array `grid`. There is a robot initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

An obstacle and space are marked as `1` or `0` respectively in `grid`. A path that the robot takes cannot include **any** square that is an obstacle.

Return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The testcases are generated so that the answer will be less than or equal to `2 * 109`.

- Example:
    
    ```
    Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
    Output: 2
    Explanation: There is one obstacle in the middle of the 3x3 grid above.
    There are two ways to reach the bottom-right corner:
    1. Right -> Right -> Down -> Down
    2. Down -> Down -> Right -> Right
    ```
    

---

---

### Solution: Memoization

```cpp
class Solution {
public:
    // Recursive function to count unique paths from (0,0) to (i,j)
    int generateAllPaths(int i, int j, vector<vector<int>> &mat, vector<vector<int>> &dp) {
        // Out of bounds
        if(i < 0 || j < 0) return 0;

        // Blocked cell due to obstacle
        if(mat[i][j] == 1) return 0;

        // Starting cell has 1 way
        if(i == 0 && j == 0) return 1;

        // Return cached value if already calculated
        if(dp[i][j] != -1) return dp[i][j];

        // Move up and left recursively
        int up = generateAllPaths(i - 1, j, mat, dp);
        int left = generateAllPaths(i, j - 1, mat, dp);

        // Store and return the total number of paths
        return dp[i][j] = up + left;
    }

    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();        // Number of rows
        int n = obstacleGrid[0].size();     // Number of columns

        // Initialize memoization table with -1
        vector<vector<int>> dp(m,  vector<int>(n, -1));

        // Start recursion from destination cell (m-1, n-1)
        return generateAllPaths(m - 1, n - 1, obstacleGrid, dp);
    }
};

```

---

---

### Solution: Tabulation

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();        // Number of rows
        int n = obstacleGrid[0].size();     // Number of columns

        // Initialize 2D DP table
        vector<vector<int>> dp(m, vector<int>(n, -1));

        // Fill DP table from top-left to bottom-right
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {

                // If current cell has an obstacle, no paths to it
                if(obstacleGrid[i][j] == 1) {
                    dp[i][j] = 0;
                    continue;
                }

                // Base case: starting cell
                if(i == 0 && j == 0) {
                    dp[i][j] = 1;
                    continue;
                }

                int up = 0;
                int left = 0;

                // Get paths from above
                if(i > 0) {
                    up = dp[i - 1][j];
                }

                // Get paths from left
                if(j > 0) {
                    left = dp[i][j - 1];
                }

                // Total paths to this cell = up + left
                dp[i][j] = up + left;
            }
        }

        // Final answer is in bottom-right cell
        return dp[m - 1][n - 1];
    }
};

```

---

---

### Solution: Space Optimized

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();        // Number of rows
        int n = obstacleGrid[0].size();     // Number of columns

        // DP array for previous row
        vector<int> prev(n, 0);

        for(int i = 0; i < m; i++) {
            vector<int> temp(n, 0);  // DP array for current row

            for(int j = 0; j < n; j++) {

                // If current cell is blocked, no path
                if(obstacleGrid[i][j] == 1) {
                    temp[j] = 0;
                    continue;
                }

                // Base case: starting cell
                if(i == 0 && j == 0) {
                    temp[j] = 1;
                    continue;
                }

                int up = 0;
                int left = 0;

                // Get path count from top
                if(i > 0) {
                    up = prev[j];
                }

                // Get path count from left
                if(j > 0) {
                    left = temp[j - 1];
                }

                // Total paths = up + left
                temp[j] = up + left;
            }

            // Update previous row
            prev = temp;
        }

        // Final result is in the last column of last row
        return prev[n - 1];
    }
};

```

---

### ✅ **How It Works**

- You're on a grid where `0 = free cell` and `1 = obstacle`.
- You can move only **right** or **down**.
- Goal: count **number of ways** to go from **top-left** to **bottom-right** **without stepping on obstacles**.

---

### 🧠 **Key Concepts**

- If a cell is blocked (`grid[i][j] == 1`), **no path passes through it**.
- Use **DP** to store number of paths to reach each cell.
- Three variants:
    - Memoization: Top-down recursive with caching
    - Tabulation: Bottom-up filling the grid
    - Space Optimized: Use only 1D arrays to save space

---

### ⏱️ **Time & Space Complexity**

| Version | Time | Space |
| --- | --- | --- |
| Memoization | O(m·n) | O(m·n) |
| Tabulation | O(m·n) | O(m·n) |
| Space Optimized ✅ | O(m·n) | O(n) |

---

### ⚠️ **Edge Cases**

- `grid[0][0] == 1` → return `0` (start is blocked)
- `grid[m-1][n-1] == 1` → return `0` (end is blocked)
- Entire row or column blocked → return `0`

---

### 🔁 **Related Problems**

| Problem | Description |
| --- | --- |
| 🔸 Unique Paths I | No obstacles — classic version |
| 🔸 Minimum Path Sum | Find path with minimum cost |
| 🔸 Word Search | DFS on grid to form words |
| 🔸 Maze Path | Recursive DFS/backtracking on blocked grids |