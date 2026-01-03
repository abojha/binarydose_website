---
title: Unique Paths
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The test cases are generated so that the answer will be less than or equal to `2 * 109`.

- Example:
    
    ```
    Input: m = 3, n = 7
    Output: 28
    Example 2:
    
    Input: m = 3, n = 2
    Output: 3
    Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Down -> Down
    2. Down -> Down -> Right
    3. Down -> Right -> Down
    ```
    

---

---

### Solution: Memoization  (Top Down)

```cpp
class Solution {
public:
    // Recursive function to count unique paths from (0,0) to (i,j)
    int generateAllPaths(int i, int j, vector<vector<int>> &dp) {
        // Base case: reached starting point
        if(i == 0 && j == 0) return 1;

        // Invalid cell (out of bounds)
        if(i < 0 || j < 0) return 0;

        // If already computed, return memoized value
        if(dp[i][j] != -1)
            return dp[i][j];

        // Move up and left recursively
        int up = generateAllPaths(i - 1, j, dp);
        int left = generateAllPaths(i, j - 1, dp);

        // Store the result in dp and return
        return dp[i][j] = up + left;
    }

    int uniquePaths(int m, int n) {
        // Initialize memoization table with -1
        vector<vector<int>> dp(m, vector<int>(n, -1));

        // Start from (m-1, n-1) down to (0, 0)
        return generateAllPaths(m - 1, n - 1, dp);
    }
};

```

---

---

### Solution: Tabulation

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        // Initialize a 2D dp table of size m x n
        vector<vector<int>> dp(m, vector<int>(n, -1));

        // Traverse the grid row-wise
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {

                // Starting cell has 1 unique path
                if(i == 0 && j == 0) {
                    dp[i][j] = 1;
                    continue;
                }

                int up = 0;
                int left = 0;

                // If moving from top is valid
                if(i > 0) {
                    up = dp[i - 1][j];
                }

                // If moving from left is valid
                if(j > 0) {
                    left = dp[i][j - 1];
                }

                // Total paths = paths from top + paths from left
                dp[i][j] = up + left;
            }
        }

        // Return result from bottom-right cell
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
    int uniquePaths(int m, int n) {
        // Initialize 1D dp array for previous row
        vector<int> prev(n, 0);

        // Loop through all rows
        for(int i = 0; i < m; i++) {
            // Temp array to store current row
            vector<int> temp(n, 0);

            // Loop through each column
            for(int j = 0; j < n; j++) {

                // Base case: starting cell
                if(i == 0 && j == 0) {
                    temp[j] = 1;
                    continue;
                }

                int up = 0;
                int left = 0;

                // Get paths from top cell
                if(i > 0) {
                    up = prev[j];
                }

                // Get paths from left cell
                if(j > 0) {
                    left = temp[j - 1];
                }

                // Total paths = from top + from left
                temp[j] = up + left;
            }

            // Update prev row with current row
            prev = temp;
        }

        // Final answer is at last cell of last row
        return prev[n - 1];
    }
};

```

---

### ✅ **How It Works**

- You're on a `m x n` grid.
- You can **only move right or down**.
- Start at top-left `(0,0)` and end at bottom-right `(m-1, n-1)`.
- Find total number of **unique paths**.

The problem has **overlapping subproblems** and can be solved using **Dynamic Programming**.

---

### 🧠 **Key DP Formula**

- `dp[i][j] = dp[i-1][j] + dp[i][j-1]`
    - Move from top → `dp[i-1][j]`
    - Move from left → `dp[i][j-1]`
- Base case: `dp[0][0] = 1`

### ⏱️ **Time & Space Complexity**

| Version | Time | Space |
| --- | --- | --- |
| Memoization | O(m·n) | O(m·n) (stack + dp) |
| Tabulation | O(m·n) | O(m·n) |
| Space Optimized ✅ | O(m·n) | O(n) |

---

### ⚠️ **Edge Cases**

- `m = 1` or `n = 1` → Only 1 path (all right or all down)
- `m = 0` or `n = 0` → Return 0 (grid doesn’t exist)

---

### 🔁 **Related Problems**

| Problem | Description |
| --- | --- |
| 🔸 Unique Paths II | Grid has obstacles |
| 🔸 Minimum Path Sum | Find path with minimal cost |
| 🔸 Robot in a Grid | Pathfinding with restrictions |
| 🔸 Number of Paths in a Matrix with K Coins | Add value constraint |
| 🔸 Word Search | DFS in grid |
| 🔸 [Maze Path Backtracking] | Explore all grid paths with constraints |