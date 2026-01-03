---
title: Swim in Rising Water
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

It starts raining, and water gradually rises over time. At time `t`, the water level is `t`, meaning **any** cell with elevation less than equal to `t` is submerged or reachable.

You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return *the minimum time until you can reach the bottom right square* `(n - 1, n - 1)` *if you start at the top left square* `(0, 0)`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2021/06/29/swim1-grid.jpg)
    
    ```
    Input: grid = [[0,2],[1,3]]
    Output: 3
    Explanation:
    At time 0, you are in grid location (0, 0).
    You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
    You cannot reach point (1, 1) until time 3.
    When the depth of water is 3, we can swim anywhere inside the grid.
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2021/06/29/swim2-grid-1.jpg)
    
    ```
    Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
    Output: 16
    Explanation: The final route is shown.
    We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
    
    ```
    

---

---

### ✅ Solution: Dijkstra's Algorithm (Min-Heap Based Path Expansion)

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();

        // visited matrix to avoid revisiting cells
        vector<vector<int>> visited(n, vector<int>(n, 0));

        // Min-heap: {time to reach cell, {row, col}}
        priority_queue<pair<int, pair<int, int>>,
                       vector<pair<int, pair<int, int>>>,
                       greater<>> pq;

        // Start from top-left corner with initial elevation
        pq.push({grid[0][0], {0, 0}});
        visited[0][0] = 1;

        // Direction vectors: right, left, down, up
        int dx[] = {0, 0, 1, -1};
        int dy[] = {1, -1, 0, 0};

        while(!pq.empty()){
            auto it = pq.top(); // get the cell with the lowest required time
            pq.pop();

            int currentTime = it.first;
            int x = it.second.first;
            int y = it.second.second;

            // If we reached bottom-right, return time
            if(x == n - 1 && y == n - 1) return currentTime;

            // Explore 4 adjacent directions
            for(int k = 0; k < 4; k++){
                int newX = x + dx[k];
                int newY = y + dy[k];

                // Check bounds and if not visited
                if(newX >= 0 && newY >= 0 && newX < n && newY < n && visited[newX][newY] == 0){
                    visited[newX][newY] = 1;

                    // Push the cell with max time seen so far
                    pq.push({max(currentTime, grid[newX][newY]), {newX, newY}});
                }
            }
        }

        return -1; // fallback, not expected to hit
    }
};

```

---

## 📝 How It Works

- This problem is a variation of **Dijkstra's Algorithm**.
- You can only move to neighboring cells if your current time is **≥ elevation of that cell**.
- So we use a **min-heap** to always expand the cell with the **least elevation/time** required.
- Each move chooses the path with the **minimum "maximum elevation" encountered**.

---

## 🧩 Key Idea

- Use a priority queue to simulate water rising.
- Track the **max elevation encountered on the path** — it becomes your required time.
- As soon as the bottom-right is reached, return the time.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(N^2 * log N^2)` (each cell pushed once in heap) |
| 💾 Space | `O(N^2)` for visited and heap |

---

## ⚠️ Edge Cases

- Already sorted path → answer is grid[n-1][n-1].
- Max elevation is at the end → must take detours till time catches up.

---

## 🔁 Related Problems

- Leetcode 778: **Swim in Rising Water** ✅
- Leetcode 1631: **Path with Minimum Effort**
- Leetcode 743: **Network Delay Time**
- Leetcode 407: **Trapping Rain Water II**