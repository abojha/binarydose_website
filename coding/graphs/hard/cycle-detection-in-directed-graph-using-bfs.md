---
title: Cycle Detection in Directed Graph  using BFS
description: ""
tags:
  - graphs
  - hard
  - sort
  - topo
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

## ✅ Solution: Kahn's Algorithm (BFS + In-Degree) — Detect Cycle in Directed Graph

```cpp
class Solution {
  public:
    bool isCyclic(int V, vector<vector<int>> &edges) {
        vector<vector<int>> adj(V);
        vector<int> indeg(V, 0);

        // Build adjacency list and compute in-degrees
        for (auto &it : edges) {
            adj[it[0]].push_back(it[1]);
            indeg[it[1]]++;
        }

        queue<int> q;

        // Push nodes with in-degree 0
        for (int i = 0; i < V; i++) {
            if (indeg[i] == 0) {
                q.push(i);
            }
        }

        int count = 0;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            count++;

            for (auto neigh : adj[node]) {
                if (--indeg[neigh] == 0) {
                    q.push(neigh);
                }
            }
        }

        return count != V;
    }
};

```

---

## 📝 How It Works

- **Objective:** Detect if a directed graph contains a cycle.
- **Technique:**
    
    Use **Kahn's Algorithm** (Topological Sort using In-Degree).
    
- **Logic:**
    - If all nodes can be removed using in-degree reduction, no cycle exists.
    - If not all nodes are processed (`count != V`), there's a cycle.

---

## 🧩 Key Formula

- For each edge:
    
    ```
    indeg[it[1]]++;
    
    ```
    
- Process nodes with in-degree 0:
    
    ```
    if (indeg[i] == 0) q.push(i);
    while (!q.empty()) {
        for (neigh in adj[node]) {
            indeg[neigh]--;
            if (indeg[neigh] == 0) q.push(neigh);
        }
    }
    
    ```
    
- **Cycle Check:**
    
    If all nodes are processed → No cycle
    
    If some nodes remain → Cycle present
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

---

## ⚠️ Edge Cases

- Empty graph → No cycle.
- Graph with self-loop → Cycle detected.
- Multiple disconnected components → Handled correctly.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS + Recursion Stack | O(V + E) | Uses back edge detection. |

---

## 🔁 Related Problems

- LeetCode 207: Course Schedule (Cycle detection in a DAG)
- LeetCode 210: Course Schedule II (Topological sort with cycle check)

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Detecting circular dependencies in build systems, task schedulers, or course prerequisites.
    
- ✅ Kahn’s Algorithm is simple and effective for detecting cycles in DAGs via BFS without recursion.
- ✅ Remember:
    
    Cycle exists ⇔ Not all nodes get processed in topological order.