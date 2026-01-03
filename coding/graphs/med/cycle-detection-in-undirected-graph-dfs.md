---
title: Cycle Detection in Undirected Graph (DFS)
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

## ✅ Solution: Detect Cycle in Undirected Graph Using DFS (With Parent Tracking)

---

```cpp
// ✅ Cycle Detection in Undirected Graph Using DFS (C++) - Parent Tracking

class Solution {
  public:
    bool detect(int node, int parent, vector<bool>& visited, vector<vector<int>>& adj) {
        visited[node] = true;

        for (auto adjNode : adj[node]) {
            if (!visited[adjNode]) {
                if (detect(adjNode, node, visited, adj)) return true;
            }
            else if (adjNode != parent) {
                // If already visited and not the parent, it's a cycle
                return true;
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

        // Check each component
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (detect(i, -1, visited, adj)) return true;
            }
        }

        return false;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Convert edge list to adjacency list.
- **Step 2:** Run DFS on each unvisited node:
    - Mark node as visited.
    - If an already visited neighbor is found that is not the parent, it’s a cycle.
- **Step 3:** If DFS finds any cycle, return true; otherwise false.

✅ It checks each connected component using standard DFS with parent check.

---

## 🧩 Key Formula / Recurrence

- **DFS Cycle Formula:**
    
    `if (visited[adjNode] && adjNode != parent) → cycle exists`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(V + E) |
| **Space** | O(V + E) |

Where:

- **V** is number of vertices.
- **E** is number of edges.

---

## ⚠️ Edge Cases

- Self-loop → Cycle detected.
- Disconnected components → Handled by running DFS from all nodes.
- No edges → Returns false.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| BFS with Parent Tracking | O(V + E) | Works similarly, uses a queue. |
| Union-Find (Disjoint Set) | O(E log V) | Fast for dynamic edge addition queries. |

---

## 🔁 Related Problems

- Detect Cycle in Directed Graph
- Redundant Connection
- Connected Components Counting
- Spanning Tree Validation

---