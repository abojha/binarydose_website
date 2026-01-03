---
title: Rotten Oranges
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

You are given an `m x n` `grid` where each cell can have one of three values:

- `0` representing an empty cell,`1` representing a fresh orange, or
- `2` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If *this is impossible, return* `-1`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/02/16/oranges.png)

```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

```

**Example 2:**

```
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

```

**Example 3:**

```
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Rotting Oranges — BFS Approach (Multi-Source BFS)

---

```cpp
// ✅ BFS Solution for Rotting Oranges in C++

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        queue<pair<int, int>> rottenCoord;
        int totalOranges = 0;
        int totalRottenOranges = 0;
        int minutes = 0;

        // Count total oranges and push initial rotten oranges into queue
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] != 0) totalOranges++;
                if (grid[i][j] == 2) rottenCoord.push({i, j});
            }
        }

        int dx[4] = {0, 0, 1, -1};
        int dy[4] = {1, -1, 0, 0};

        while (!rottenCoord.empty()) {
            int k = rottenCoord.size();
            totalRottenOranges += k;

            while (k--) {
                int x = rottenCoord.front().first;
                int y = rottenCoord.front().second;
                rottenCoord.pop();

                for (int i = 0; i < 4; i++) {
                    int nx = x + dx[i];
                    int ny = y + dy[i];

                    if (nx < 0 || ny < 0 || nx >= n || ny >= m || grid[nx][ny] != 1) continue;

                    grid[nx][ny] = 2;
                    rottenCoord.push({nx, ny});
                }
            }

            if (!rottenCoord.empty()) minutes++;
        }

        return totalRottenOranges == totalOranges ? minutes : -1;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Traverse the grid once:
    - Count total oranges (both fresh and rotten).
    - Add all rotten oranges to a queue (multi-source BFS).
- **Step 2:** Standard BFS Loop:
    - Process all rotten oranges currently in the queue.
    - For each, rot its fresh neighbors and add them to the queue.
    - Count time in minutes (increment only if new rotting occurs).
- **Step 3:** If total rotten oranges at the end equal total oranges, return minutes. Otherwise, return `1`.

✅ This handles simultaneous rotting at each minute using BFS level order.

---

## 🧩 Key Formula / Recurrence

- BFS recurrence:
    
    `for each rotten orange → rot all 4 neighbors → push newly rotten to queue`
    
- **Time Count:**
    
    Increment `minutes` after each BFS level.
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N × M) |
| **Space** | O(N × M) |
- **N:** Number of rows.
- **M:** Number of columns.
- Each cell is processed at most once.

---

## ⚠️ Edge Cases

- No fresh oranges → Return `0`.
- No rotten oranges initially → Return `1` if fresh exists.
- Grid fully filled with zeros → Return `0`.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| BFS (Multi-Source) | O(N × M) | Best and standard. |
| DFS | O(N × M) | Not recommended: complex timing logic. |

---

## 🔁 Related Problems

- Number of Islands
- Zombie in Matrix (Multi-Source BFS)
- Shortest Path in Grid with Obstacles
- Fire Spread Simulation

---