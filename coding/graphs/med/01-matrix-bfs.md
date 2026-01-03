---
title: 0/1 Matrix (BFS)
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

Given an `m x n` binary matrix `mat`, return *the distance of the nearest* `0` *for each cell*.

The distance between two cells sharing a common edge is `1`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg)

```
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg)

```
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]

```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: 01 Matrix — Multi-Source BFS Approach

---

```cpp
// ✅ Update Matrix Using Multi-Source BFS (Shortest Distance from 0)

class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int n = mat.size();
        int m = mat[0].size();

        queue<pair<pair<int, int>, int>> q;
        vector<vector<int>> dis(n, vector<int>(m, 0));
        vector<vector<int>> vis(n, vector<int>(m, 0));

        // Step 1: Push all 0 cells into the queue
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 0) {
                    vis[i][j] = 1;
                    q.push({{i, j}, 0});
                }
            }
        }

        int dx[4] = {0, 0, 1, -1};
        int dy[4] = {1, -1, 0, 0};

        // Step 2: BFS Traversal
        while (!q.empty()) {
            int x = q.front().first.first;
            int y = q.front().first.second;
            int steps = q.front().second;
            q.pop();

            dis[x][y] = steps;

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];

                if (nx >= 0 && nx < n && ny >= 0 && ny < m && vis[nx][ny] == 0) {
                    vis[nx][ny] = 1;
                    q.push({{nx, ny}, steps + 1});
                }
            }
        }

        return dis;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Add all `0` cells to the queue and mark them as visited.
- **Step 2:** Perform BFS from all `0`s simultaneously (Multi-Source BFS):
    - Each step from the queue gives the distance to the nearest `0`.
    - Mark cells as visited as soon as they are enqueued.
- **Step 3:** Return the distance matrix.

✅ Why Multi-Source BFS?

Because the shortest distance to a `0` for each cell is equivalent to the level at which it’s reached in BFS.

---

## 🧩 Key Formula / Recurrence

- **BFS Formula:**
    
    `distance[cell] = steps when cell is first visited from queue.`
    
- **4 Direction Movement:**
    
    `dx = {0, 0, 1, -1}`
    
    `dy = {1, -1, 0, 0}`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N × M) |
| **Space** | O(N × M) |

Where:

- **N** = Number of rows.
- **M** = Number of columns.

✅ Every cell is visited exactly once.

---

## ⚠️ Edge Cases

- All `0`s → Distance matrix stays all `0`.
- All `1`s → Not valid as per problem constraints; assumes at least one `0`.
- Single cell grid.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Dynamic Programming | O(N × M) | 2 passes (top-left to bottom-right, then reverse). |
| BFS (Multi-Source) | O(N × M) | Preferred for clarity and simplicity. |

---

## 🔁 Related Problems

- Rotting Oranges (Multi-Source BFS)
- Shortest Path in Grid with Obstacles
- Maze Solving Using BFS
- Flood Fill

---