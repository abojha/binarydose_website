---
title: Cycle Detection in Directed Graph
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

Given a Directed Graph with **V** vertices (Numbered from **0** to **V-1**) and **E** edges, check whether it contains any **cycle** or not.The graph is represented as a 2D vector **edges[][]**, where each entry **edges[i] = [u, v]** denotes an edge from verticex **u** to **v.**

**Examples:**

```
Input:V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]
Output: true
Explanation: The diagram clearly shows a cycle 0 → 2 → 0
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700218/Web/Other/blobid0_1744197297.jpg)

```
Input:V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 3]

Output: false
Explanation: no cycle in the graph
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700218/Web/Other/blobid1_1744197327.jpg)

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: DFS with Recursion Stack — Detect Cycle in Directed Graph

```cpp
class Solution {
  public:
    bool dfs(int node, vector<bool> &visited, vector<bool> &recStack, vector<vector<int>> &adj) {
        visited[node] = true;
        recStack[node] = true;

        for (auto neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, visited, recStack, adj)) return true;
            } else if (recStack[neighbor]) {
                return true;  // Cycle detected
            }
        }

        recStack[node] = false;
        return false;
    }

    bool isCyclic(int V, vector<vector<int>> &edges) {
        vector<bool> visited(V, false);
        vector<bool> recStack(V, false);
        vector<vector<int>> adj(V);

        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (dfs(i, visited, recStack, adj)) return true;
            }
        }

        return false;
    }
};

```

---

## 📝 How It Works

- **Objective:** Detect if there is a cycle in a directed graph.
- **Technique:**
    
    Use **DFS** with a recursion stack (`recStack` array):
    
    - `visited[]` tracks visited nodes overall.
    - `recStack[]` tracks nodes in the current DFS call path.
- **Step-by-Step:**
    1. Convert edge list to adjacency list.
    2. For each unvisited node:
        - Run DFS.
        - If we visit a node already in the current path (`recStack`), it means there’s a cycle.
    3. If no cycles found after checking all nodes, return false.
- **Why This Works:**
    - Recursion stack ensures we only detect **back edges** specific to directed graphs.

---

## 🧩 Key Formula / Recurrence

DFS recurrence:

```
if (!visited[neighbor]) {
    dfs(neighbor, visited, recStack, adj)
} else if (recStack[neighbor]) {
    return true;  // Cycle found
}

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
- V = number of vertices
- E = number of edges
- Adjacency list + recursion stack + visited arrays.

---

## ⚠️ Edge Cases

- No edges → No cycle.
- Multiple components → Must check all.
- Self-loop → Immediate cycle.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Kahn’s Algorithm (BFS) | O(V + E) | Topological Sort check. Works for DAG cycle detection. |

---

## 🔁 Related Problems

- LeetCode 207: Course Schedule (Exact Problem)
- LeetCode 210: Course Schedule II
- LeetCode 2360: Longest Cycle in a Graph

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Detecting circular dependencies in build systems or package management (e.g., npm/yarn dependency graphs).
    
- ✅ Works for disconnected graphs since we run DFS from all unvisited nodes.
- ✅ Self-loop and back-edge handling is automatic with `recStack`.