---
title: Number of Distinct Islands
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - hard
---

### Problem Statement:

Given a boolean 2D matrix **grid** of size **n** * **m**. You have to find the number of distinct islands where a group of connected 1s (horizontally or vertically) forms an island. Two islands are considered to be distinct if and only if one island is not equal to another (not rotated or reflected).

- Example:
    
    ```
    Input:
    grid[][] = {{1, 1, 0, 0, 0},
                {1, 1, 0, 0, 0},
                {0, 0, 0, 1, 1},
                {0, 0, 0, 1, 1}}
    Output:
    1
    Explanation:
    grid[][] = {{1, 1, 0, 0, 0}, 
                {1, 1, 0, 0, 0}, 
                {0, 0, 0, 1, 1}, 
                {0, 0, 0, 1, 1}}
    Same colored islands are equal.
    We have 2 equal islands, so we 
    have only 1 distinct island.
    ```
    

---

## ✅ Solution: DFS with Path Encoding — Count Distinct Islands

```cpp
class Solution {
  public:
    void dfs(int row, int col, int n, int m, vector<vector<bool>> &vis, string &path, vector<vector<int>> &grid) {
        vis[row][col] = true;

        int dx[] = {0, 0, 1, -1};  // Directions: Down, Up, Left, Right
        int dy[] = {1, -1, 0, 0};
        string dir = "DULR";  // Encoded directions

        for (int i = 0; i < 4; i++) {
            int nx = row + dx[i];
            int ny = col + dy[i];

            if (nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny] && grid[nx][ny] == 1) {
                path += dir[i];
                dfs(nx, ny, n, m, vis, path, grid);
                path += 'B';  // Backtrack marker
            }
        }
    }

    int countDistinctIslands(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<bool>> visited(n, vector<bool>(m, false));
        set<string> uniquePaths;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    string path = "S";  // Start marker
                    dfs(i, j, n, m, visited, path, grid);
                    uniquePaths.insert(path);
                }
            }
        }

        return uniquePaths.size();
    }
};

```

---

## 📝 How It Works

- **Goal:** Count the number of distinct islands based on shape, not position.
- **Technique:**
    - For every unvisited `1` cell, run DFS.
    - Record the traversal path using a string with direction markers.
    - Store each path in a set to automatically handle uniqueness.
- **Path Encoding Logic:**
    - `D`, `U`, `L`, `R` → Move directions.
    - `B` → Backtracking marker.
    - Ensures two islands are considered the same only if their traversal paths match exactly.

---

## 🧩 Key Formula / Recurrence

- DFS traversal building path string:
    
    ```
    path += direction;
    dfs(next_x, next_y, ...);
    path += 'B';  // backtrack
    
    ```
    
- Set stores unique path strings:
    
    ```
    uniquePaths.insert(path);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| DFS + Set | O(N × M) | O(N × M) |

Where:

- N × M = total grid cells.
- Each cell is visited once in DFS.

---

## ⚠️ Edge Cases

- Grid with all `0`s → Should return `0`.
- Grid with all `1`s → Should return `1` because it’s a single big island.
- Islands that are rotated/reflected versions are counted as different (default behavior in this logic).

---

## 💡 Other Approaches

- **Shape Normalization with Coordinates:**
    
    Store relative coordinates instead of path strings.
    
    Works similarly but uses coordinate sets.
    
- **BFS + String Encoding:**
    
    BFS instead of DFS to encode island shapes.
    

---

## 🔁 Related Problems

- LeetCode 694: Number of Distinct Islands (Exact Problem)
- LeetCode 200: Number of Islands
- LeetCode 695: Max Area of Island
- LeetCode 711: Number of Distinct Islands II (with rotations/reflections)

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Think of recognizing unique island shapes from aerial imagery, ignoring their position but not their orientation.
    
- ✅ Using path strings is memory-efficient and easier to debug than coordinate lists.
- ✅ This is a classic example of **DFS + Set + Path Encoding** pattern in grid problems.