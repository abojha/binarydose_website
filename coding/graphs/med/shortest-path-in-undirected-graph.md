---
title: Shortest Path in Undirected Graph
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

You are given an adjacency list, **adj** of **Undirected Graph** having **unit weight** of the edges, find the shortest path ****from **src** to all the vertex and if it is **unreachable** to reach any vertex, then return **-1** for that vertex.

**Examples :**

```
Input:adj[][] = [[1, 3], [0, 2], [1, 6], [0, 4], [3, 5], [4, 6], [2, 5, 7, 8], [6, 8], [7, 6]], src=0
Output:[0, 1, 2, 1, 2, 3, 3, 4, 4]

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/711976/Web/Other/blobid0_1745302423.jpg)

```
Input:adj[][]= [[3], [3], [], [0, 1]], src=3
Output:[1, 1, -1, 0]

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/711976/Web/Other/blobid0_1747111194.webp)

```
Input:adj[][]= [[], [], [], [4], [3], [], []], src=1
Output:[-1, 0, -1, -1, -1, -1, -1]
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Breadth-First Search (BFS) for Shortest Path in Unweighted Graph

---

### Solution: BFS-Based Single Source Shortest Path (Unweighted Graph)

```cpp
class Solution {
  public:
    // Function to find the shortest path from source to all other nodes
    vector<int> shortestPath(vector<vector<int>>& adj, int src) {
        int V = adj.size();
        vector<int> dis(V, 1e9);  // Initialize distances to "infinity"

        queue<int> q;
        q.push(src);
        dis[src] = 0;  // Distance to source is zero

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (auto it : adj[node]) {
                if (dis[it] > dis[node] + 1) {
                    dis[it] = dis[node] + 1;  // Update shorter distance
                    q.push(it);
                }
            }
        }

        vector<int> res(V, -1);  // Convert unreachable nodes to -1
        for (int i = 0; i < V; i++) {
            if (dis[i] != 1e9) {
                res[i] = dis[i];
            }
        }
        return res;
    }
};

```

---

## 📝 How It Works

- **Goal:** Find the shortest path from `src` to all nodes in an **unweighted undirected/directed graph**.
- **Technique Used:** **Breadth-First Search (BFS)** ensures shortest path discovery in unweighted graphs.
- **Steps:**
    1. Initialize distance array with large values (`1e9` treated as "infinity").
    2. Set `dis[src] = 0` because the distance from source to itself is 0.
    3. Run BFS:
        - For every popped node, check its neighbors.
        - If a shorter path is found, update distance and push the neighbor into the queue.
    4. Post-process distances:
        - Any node still marked as `1e9` means it’s unreachable. Set that to `1` in the result.

---

## 🧩 Key Formula / Recurrence

- **Relaxation Step:**
    
    `if (dis[it] > dis[node] + 1)`
    
    This ensures we only update if a shorter path is found.
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(V + E) — Standard BFS traversal. |
| **Space Complexity** | O(V) — For distance array and queue. |

Where:

- V = number of vertices
- E = number of edges

---

## ⚠️ Edge Cases

- Disconnected graph: Some nodes may never get visited.
- Self-loops or multiple edges: BFS handles these naturally, but unnecessary visits are avoided via distance checks.
- Graph size = 0 or 1.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Dijkstra’s Algorithm | O((V + E) log V) | For weighted graphs only. |
| BFS (used here) ✅ | O(V + E) | Best for unweighted graphs. |

---

## 🔁 Related Problems

- LeetCode 1091: Shortest Path in Binary Matrix
- LeetCode 286: Walls and Gates (Multi-source BFS)
- LeetCode 542: 01 Matrix
- GFG: Shortest path in an unweighted graph

---

## 🛠️ Other Notes (Optional)

- ✅ Works for both directed and undirected graphs, provided `adj` is properly built.
- ✅ Real-world analogy: Like exploring all reachable metro stations from a starting point using the shortest route in terms of number of stops.