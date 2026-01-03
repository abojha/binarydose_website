---
title: Path with Minimum Effort
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`. You are situated in the top-left cell, `(0, 0)`, and you hope to travel to the bottom-right cell, `(rows-1, columns-1)` (i.e., **0-indexed**). You can move **up**, **down**, **left**, or **right**, and you wish to find a route that requires the minimum **effort**.

A route's **effort** is the **maximum absolute difference** in heights between two consecutive cells of the route.

Return *the minimum **effort** required to travel from the top-left cell to the bottom-right cell.*

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/04/ex1.png)
    
    ```
    Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
    Output: 2
    Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
    This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/04/ex2.png)
    
    ```
    Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
    Output: 1
    Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
    
    ```
    
    **Example 3:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/04/ex3.png)
    
    ```
    Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
    Output: 0
    Explanation: This route does not require any effort.
    ```
    

---

---

## ✅ Solution: Dijkstra's Algorithm for Grid with Min-Max Edge Weights

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int rows = heights.size(), cols = heights[0].size();
        pair<int, int> source = {0, 0};
        pair<int, int> destination = {rows - 1, cols - 1};

        // Min-heap: {effort, {x, y}}
        priority_queue<
            pair<int, pair<int, int>>,
            vector<pair<int, pair<int, int>>>,
            greater<pair<int, pair<int, int>>>
        > minHeap;

        // Distance matrix: minimum effort to reach each cell
        vector<vector<int>> effort(rows, vector<int>(cols, 1e9));
        effort[0][0] = 0;
        minHeap.push({0, {0, 0}});

        // 4-directional movement: right, left, down, up
        int dx[] = {0, 0, 1, -1};
        int dy[] = {1, -1, 0, 0};

        while (!minHeap.empty()) {
            auto top = minHeap.top();
            minHeap.pop();

            int currEffort = top.first;
            int x = top.second.first;
            int y = top.second.second;

            // If destination reached, return the minimum effort
            if (x == destination.first && y == destination.second)
                return currEffort;

            // Explore neighbors
            for (int i = 0; i < 4; i++) {
                int newX = x + dx[i];
                int newY = y + dy[i];

                // Check bounds
                if (newX >= 0 && newY >= 0 && newX < rows && newY < cols) {
                    int stepEffort = abs(heights[newX][newY] - heights[x][y]);
                    int maxEffort = max(currEffort, stepEffort);

                    // If new effort is less than recorded, update and push to heap
                    if (maxEffort < effort[newX][newY]) {
                        effort[newX][newY] = maxEffort;
                        minHeap.push({maxEffort, {newX, newY}});
                    }
                }
            }
        }

        return 0; // Only happens if grid is 1x1
    }
};

```

---

### 📝 How It Works

- The grid is a graph where each cell is a node and the edge cost is the **absolute height difference** between adjacent cells.
- We use **Dijkstra’s algorithm** to minimize the **maximum height difference** (effort) along any path from `(0,0)` to `(n-1,m-1)`.
- We use a **min-heap priority queue** to always explore the path with the current minimum effort.
- For every neighbor, calculate the effort (`max(current effort, abs diff)`) and push it if it's better.

---

### 🧩 Key Formula / Transition

- `newEffort = max(currentEffort, abs(heights[newX][newY] - heights[x][y]))`
- Dijkstra is applied on this modified "cost" — instead of summing, we take the max.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N × M × log(N×M)) |
| Space | O(N × M) |
- Each cell can be visited once (or a few times) and heap operations take log(N×M).
- Space for `effort` matrix and priority queue.

---

### ⚠️ Edge Cases

- 1×1 grid → effort is 0
- Flat grid (all values equal) → effort is always 0
- Steep walls around the path → effort might spike at just one step

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| DFS + Binary Search | O(N×M × log(maxH)) | O(N×M) | Works but slower |
| Dijkstra ✅ | O(N×M log N×M) | O(N×M) | Optimal for variable weights |

---

### 🔁 Related Problems

- [LC 1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
- [LC 778. Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)
- [LC 743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [LC 787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

---

### 🛠️ Other Notes

- This is **Dijkstra on max edge cost**, instead of sum.
- Real-world analogy: Think of a robot trying to move across uneven terrain — it wants to **minimize the steepest slope** it must climb.