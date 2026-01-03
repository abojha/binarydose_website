---
title: Number of Enclave
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - hard
---

### Problem Statement:

You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell.

A **move** consists of walking from one land cell to another adjacent (**4-directionally**) land cell or walking off the boundary of the `grid`.

Return *the number of land cells in* `grid` *for which we cannot walk off the boundary of the grid in any number of **moves***.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg)

```
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg)

```
Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: DFS (Depth-First Search)

```cpp
class Solution {
public:
    // DFS function to mark all reachable land cells from boundary
    void dfs(int x, int y, int n, int m, vector<vector<int>> &visited, int dx[], int dy[],
             vector<vector<int>>& grid) {
        visited[x][y] = 1;

        for (int i = 0; i < 4; i++) {
            int newX = x + dx[i];
            int newY = y + dy[i];

            // Explore valid neighbors with land (grid value 1) that are unvisited
            if (newX >= 0 && newX < n && newY >= 0 && newY < m &&
                visited[newX][newY] == 0 && grid[newX][newY] == 1) {
                dfs(newX, newY, n, m, visited, dx, dy, grid);
            }
        }
    }

    int numEnclaves(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> visited(n, vector<int>(m, 0));
        int dx[4] = {0, 0, 1, -1};
        int dy[4] = {1, -1, 0, 0};

        // Mark all land cells connected to boundary using DFS
        for (int j = 0; j < m; j++) {
            if (!visited[0][j] && grid[0][j] == 1) {
                dfs(0, j, n, m, visited, dx, dy, grid);
            }
            if (!visited[n - 1][j] && grid[n - 1][j] == 1) {
                dfs(n - 1, j, n, m, visited, dx, dy, grid);
            }
        }

        for (int i = 0; i < n; i++) {
            if (!visited[i][0] && grid[i][0] == 1) {
                dfs(i, 0, n, m, visited, dx, dy, grid);
            }
            if (!visited[i][m - 1] && grid[i][m - 1] == 1) {
                dfs(i, m - 1, n, m, visited, dx, dy, grid);
            }
        }

        // Count all land cells not connected to boundary
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!visited[i][j] && grid[i][j] == 1) {
                    count++;
                }
            }
        }

        return count;
    }
};

```

---

## 📝 How It Works

- **Problem Goal:** Count the number of land cells (`1`s) that cannot reach the boundary (i.e., are enclosed).
- **Approach:**
    1. Perform DFS from all land cells on the boundary to mark them as visited.
    2. Traverse the entire grid. Count all unvisited land cells — these are the enclaves.
- **Why It Works:**
    
    By marking all reachable land cells from the boundary, we exclude non-enclaved cells from the count.
    

---

## 🧩 Key Formula / Recurrence

- Recurrence relation:
    
    `dfs(x, y) = dfs(x+1, y) + dfs(x-1, y) + dfs(x, y+1) + dfs(x, y-1)`
    
- **No tabulation or DP — pure DFS flood fill.**

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N × M) — Each cell is visited at most once. |
| Space | O(N × M) — For `visited` matrix and recursion stack. |

---

## ⚠️ Edge Cases

- All cells are `0`: Should return `0`.
- All land cells (`1`) are on the boundary: Should return `0`.
- Single row or single column grid: Special cases where there’s no enclosed land.

---

## 💡 Other Approaches

- **BFS** using queue instead of DFS — Similar complexity.
- **Union-Find (DSU)** — More complex to set up but solves the problem without explicit DFS/BFS.
- **In-place grid marking** — If memory optimization is required, use grid value modification (e.g., mark visited land cells as `2` instead of using a separate visited matrix).

---

## 🔁 Related Problems

- LeetCode 1020: Number of Enclaves (exact same problem)
- LeetCode 1254: Number of Closed Islands
- LeetCode 200: Number of Islands
- LeetCode 695: Max Area of Island

---

## 🛠️ Other Notes

- ✅ **Important:** Avoid passing grid or visited arrays by value in recursive DFS calls. Always use references to avoid unnecessary copying and TLE.
- ✅ This type of grid flood fill is also common in image processing tasks like boundary detection or shape detection.