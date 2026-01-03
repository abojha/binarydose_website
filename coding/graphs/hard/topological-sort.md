---
title: Topological Sort
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

## ✅ Solution: DFS-Based Topological Sort (Using Stack)

```cpp
class Solution {
  public:
    void dfs(int node, vector<vector<int>> &adj, vector<bool> &vis, stack<int> &st) {
        vis[node] = true;

        for (auto neigh : adj[node]) {
            if (!vis[neigh]) {
                dfs(neigh, adj, vis, st);
            }
        }
        st.push(node);
    }

    vector<int> topoSort(int V, vector<vector<int>> &edges) {
        vector<vector<int>> adj(V);

        for (auto &it : edges) {
            adj[it[0]].push_back(it[1]);
        }

        vector<bool> vis(V, false);
        stack<int> s;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, adj, vis, s);
            }
        }

        vector<int> res;
        while (!s.empty()) {
            res.push_back(s.top());
            s.pop();
        }

        return res;
    }
};

```

---

---

## 📝 How It Works

- **Objective:**
    
    Perform topological sorting for a Directed Acyclic Graph (DAG).
    
- **Technique:**
    
    Use **DFS + Stack**:
    
    - For each node, visit all neighbors recursively.
    - After visiting all neighbors, push the node onto the stack.
    - Finally, pop nodes from the stack to get the topological order.

---

## 🧩 Key Formula / Recurrence

DFS recurrence for Topo Sort:

```
for (neighbor in adj[node]):
    if (!visited[neighbor]):
        dfs(neighbor)
stack.push(node);

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
- V = number of vertices.
- E = number of edges.
- Uses adjacency list, visited array, and recursion stack.

---

## ⚠️ Edge Cases

- Multiple disconnected components → Handled.
- Single node graph.
- Empty edge list.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Kahn's Algorithm (BFS + In-degree) | O(V + E) | Iterative alternative using queue |

---

## 🔁 Related Problems

- LeetCode 210: Course Schedule II
- LeetCode 207: Course Schedule
- LeetCode 133: Clone Graph (graph traversal concepts)

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Scheduling tasks with dependency constraints like course prerequisites or build systems.
    
- ✅ DFS + Stack is a common interview question pattern for topological sort on DAGs.
- ✅ Be careful of duplicated edges or incorrect adjacency list construction in implementation.