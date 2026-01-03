---
title: Topological Sort (Kahn’s Algo)
description: ""
tags:
  - graphs
  - hard
  - sort
  - topo
---

### Problem Statement:

Given a **Directed Acyclic Graph (DAG)** of **V** (0 to V-1) vertices and **E** edges represented as a 2D list of **edges[][]**, where each entry **edges[i] = [u, v]** denotes a directed ****edge u -> v. Return the **topological sort** for the given graph.

**Note:** As there are multiple Topological orders possible, you may return any of them. If your returned Topological sort is correct then the output will be **true** else **false**.

**Examples:**

```
Input: V = 4, E = 3, edges[][] = [[3, 0], [1, 0], [2, 0]]

Output:true
Explanation: The output true denotes that the order is valid. Few valid Topological orders for the given graph are:
[3, 2, 1, 0]
[1, 2, 3, 0]
[2, 3, 1, 0]
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700255/Web/Other/blobid0_1744196747.jpg)

```
Input:V = 6, E = 6, edges[][] = [[1, 3], [2, 3], [4, 1], [4, 0], [5, 0], [5,2]]

Output:true
Explanation:The output true denotes that the order is valid. Few valid Topological orders for the graph are:
[4, 5, 0, 1, 2, 3]
[5, 2, 4, 0, 1, 3]
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700255/Web/Other/blobid1_1744196789.jpg)

- Example:
    
    ```
    
    ```
    

---

---

---

## ✅ Solution: Kahn's Algorithm (BFS) — Topological Sort Using In-Degree

```cpp
class Solution {
  public:
    vector<int> topoSort(int V, vector<vector<int>>& edges) {
        vector<vector<int>> adj(V);
        vector<int> inDegree(V, 0);

        // Build adjacency list and calculate in-degrees
        for (auto &it : edges) {
            adj[it[0]].push_back(it[1]);
            inDegree[it[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }

        vector<int> ans;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            ans.push_back(node);

            for (auto neigh : adj[node]) {
                inDegree[neigh]--;
                if (inDegree[neigh] == 0) {
                    q.push(neigh);
                }
            }
        }

        return ans;
    }
};

```

---

## 📝 How It Works

- **Objective:** Return a valid topological ordering of a Directed Acyclic Graph (DAG).
- **Technique:**
    - Build an adjacency list from edges.
    - Calculate **in-degree** of each node.
    - Use a queue to process nodes with in-degree `0`.
    - Remove processed nodes, updating in-degrees of neighbors.
- **Why It Works:**
    
    Removing nodes with `in-degree == 0` one by one ensures all prerequisite dependencies are handled.
    

---

## 🧩 Key Formula

- Initial setup:
    
    ```
    for each edge [u, v]:
        inDegree[v]++;
    
    ```
    
- Main loop:
    
    ```
    while (!q.empty()):
        node = q.front();
        for (neighbor in adj[node]):
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0):
                q.push(neighbor);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
- V = number of vertices.
- E = number of edges.

---

## ⚠️ Edge Cases

- Disconnected graph → Processes all components.
- Cyclic graph → Will not return full list of V elements (length check reveals cycle).
- Multiple nodes with zero in-degree initially.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS + Stack | O(V + E) | Uses post-order traversal. |

---

## 🔁 Related Problems

- LeetCode 210: Course Schedule II
- LeetCode 207: Course Schedule
- LeetCode 133: Clone Graph (graph concepts)

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Task scheduling with dependencies, such as build orders or course prerequisites.
    
- ✅ Bonus Check:
    
    If `ans.size() < V`, the graph contains a cycle.
    
- ✅ Kahn’s Algorithm is preferred for **iterative topological sorting** compared to DFS stack when clarity is needed in level-wise node processing.