---
title: Cycle Detection in Undirected Graph (BFS)
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

Given an **undirected graph** with **V** vertices and **E** edges, represented as a 2D vector **edges[][]** , where each entry **edges[i] = [u, v]** denotes an edge between vertices **u** and **v** , determine whether the graph contains a **cycle** or not.

**Examples:**

```
Input:V = 4, E = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 3]]
Output:true
Explanation:
1 -> 2 -> 0 -> 1 is a cycle.

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/891735/Web/Other/blobid1_1743510240.jpg)

```
Input:V = 4, E = 3, edges[][] = [[0, 1], [1, 2], [2, 3]]
Output:false
Explanation:

No cycle in the graph.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/891735/Web/Other/blobid2_1743510254.jpg)

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Detect Cycle in Undirected Graph — BFS Approach (Using Parent Tracking)

---

```cpp
// ✅ Cycle Detection in Undirected Graph Using BFS (C++)

class Solution {
  public:
    bool detect(int src, vector<bool> &visited, vector<vector<int>> &adj) {
        queue<pair<int, int>> q;  // {current node, parent}
        q.push({src, -1});
        visited[src] = true;

        while (!q.empty()) {
            int node = q.front().first;
            int parent = q.front().second;
            q.pop();

            for (auto adjNode : adj[node]) {
                if (!visited[adjNode]) {
                    visited[adjNode] = true;
                    q.push({adjNode, node});
                }
                else if (adjNode != parent) {
                    // Found a back-edge
                    return true;
                }
            }
        }
        return false;
    }

    bool isCycle(int V, vector<vector<int>>& edges) {
        vector<vector<int>> adj(V);

        // Build adjacency list from edge list
        for (auto edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<bool> visited(V, false);

        // Check all components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (detect(i, visited, adj)) return true;
            }
        }

        return false;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Convert the edge list into an adjacency list.
- **Step 2:** Use BFS from every unvisited node:
    - Track parent alongside each node in the queue.
    - If visiting an already visited node that is not the parent → cycle detected.
- **Step 3:** If no cycle found in any component, return false.

✅ Parent tracking prevents falsely detecting the edge we just came from as a cycle.

---

## 🧩 Key Formula / Recurrence

- **Cycle Check Rule:**
    
    `if (adjNode is visited && adjNode != parent) → return true`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(V + E) |
| **Space** | O(V + E) |
- **V** = Number of vertices.
- **E** = Number of edges.
- BFS visits each node and edge at most once.

---

## ⚠️ Edge Cases

- Disconnected graph → Handled using `for` loop over all vertices.
- Graph with no edges → No cycle.
- Graph with one edge → No cycle.
- Self-loop → Cycle detected immediately.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS Cycle Detection | O(V + E) | Works similarly but uses recursion stack. |
| Union-Find (Disjoint Set) | O(E log V) | Best for offline queries and dynamic graphs. |

---

## 🔁 Related Problems

- Detect Cycle in Directed Graph
- Number of Connected Components in Undirected Graph
- Minimum Spanning Tree Algorithms (Cycle Checking with Union-Find)
- Redundant Connection Problem

---