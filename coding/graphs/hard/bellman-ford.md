---
title: Bellman Ford
description: ""
tags:
  - graphs
  - hard
  - path
  - shortest
---

### Problem Statement:

Given an weighted graph with **V** vertices numbered from 0 to V-1 and **E** edges, represented by a 2d array **edges[][]**, where **edges[i] = [u, v, w]** represents a direct edge from node **u** to **v** having **w** edge weight. You are also given a source vertex **src**.

Your task is to compute the **shortest distances** from the **source** to all other vertices. If a vertex is unreachable from the source, its distance should be marked as **108**. Additionally, if the graph contains a **negative weight cycle**, return **[-1]** to indicate that shortest paths cannot be reliably computed.

- Example:
    
    **Examples:**
    
    ```
    Input:V = 5, edges[][] = [[1, 3, 2], [4, 3, -1], [2, 4, 1], [1, 2, 1], [0, 1, 5]], src = 0
    
    Output: [0, 5, 6, 6, 7]
    Explanation: Shortest Paths:
    For 0 to 1 minimum distance will be 5. By following path 0 → 1
    For 0 to 2 minimum distance will be 6. By following path 0 → 1  → 2
    For 0 to 3 minimum distance will be 6. By following path 0 → 1  → 2 → 4 → 3
    For 0 to 4 minimum distance will be 7. By following path 0 → 1  → 2 → 4
    
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893096/Web/Other/blobid0_1744455175.jpg)
    
    ```
    Input:V = 4, edges[][] = [[0, 1, 4], [1, 2, -6], [2, 3, 5], [3, 1, -2]], src = 0
    
    Output:[-1]
    Explanation: The graph contains a negative weight cycle formed by the path 1 → 2 → 3 → 1, where the total weight of the cycle is negative.
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893096/Web/Other/blobid1_1744455218.jpg)
    

---

---

## ✅ Solution: Bellman-Ford (Single Source Shortest Path for Graphs with Negative Weights)

```cpp
class Solution {
  public:
    vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
        // Initialize distances from source to all vertices as infinite
        vector<int> dist(V, 1e8);
        dist[src] = 0;

        // Relax all edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (auto it : edges) {
                int u = it[0];
                int v = it[1];
                int wt = it[2];

                // Relax the edge if possible
                if (dist[u] != 1e8 && dist[v] > dist[u] + wt) {
                    dist[v] = dist[u] + wt;
                }
            }
        }

        // Check for negative-weight cycles
        for (auto it : edges) {
            int u = it[0];
            int v = it[1];
            int wt = it[2];

            if (dist[u] != 1e8 && dist[v] > dist[u] + wt) {
                return {-1};  // Negative cycle detected
            }
        }

        return dist;
    }
};

```

---

### 📝 How It Works

- Initialize all distances to ∞ (`1e8` here), except the source which is `0`.
- **Relax all edges V - 1 times**. In each iteration, check if going through `u → v` gives a shorter path than already known.
- After V-1 iterations, perform **one more pass** to detect any **negative-weight cycles** (if relaxation still possible → negative cycle exists).
- Return final shortest distances or `{-1}` if cycle detected.

---

### 🧩 Key Formula / Transition
$$
\text{if } dist[u] + wt < dist[v] \Rightarrow dist[v] = dist[u] + wt
$$
---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(V × E) |
| Space | O(V) |

---

### ⚠️ Edge Cases

- Disconnected vertices will remain `1e8` (i.e., unreachable).
- Negative edge weights are handled safely.
- If a **negative cycle** is reachable from source, return `{-1}`.

---

### 💡 Other Approaches

| Approach | When to Use | Time |
| --- | --- | --- |
| Dijkstra | All weights ≥ 0 | O(E log V) |
| Bellman-Ford | Can handle negatives | O(V × E) |

---

### 🔁 Related Problems

- [Leetcode 743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [GFG: Bellman-Ford Algorithm](https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1)
- [Leetcode 787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
- Detect Negative Weight Cycle

---

### 🛠️ Other Notes

- Bellman-Ford is useful for detecting arbitrage opportunities in finance (i.e., negative cost cycles).
- It's preferred over Dijkstra when **edge weights can be negative**.
- This implementation assumes **0-based indexing** for vertices.