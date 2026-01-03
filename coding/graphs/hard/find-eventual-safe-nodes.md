---
title: Find Eventual Safe Nodes
description: ""
tags:
  - graphs
  - hard
  - sort
  - topo
---

### Problem Statement:

There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a **0-indexed** 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a **terminal node** (or another safe node).

Return *an array containing all the **safe nodes** of the graph*. The answer should be sorted in **ascending** order.

**Example 1:**

![Illustration of graph](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png)

```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
```

**Example 2:**

```
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation:
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Reverse Graph + Kahn’s Algorithm — Eventual Safe States (Topological Sort Approach)

---

### ✅ Solution Code

```cpp
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int v = graph.size();
        vector<vector<int>> revGraph(v);
        vector<int> inDeg(v, 0);

        // Build reverse graph and count in-degrees
        for (int i = 0; i < v; i++) {
            for (auto neighbor : graph[i]) {
                revGraph[neighbor].push_back(i);
                inDeg[i]++;
            }
        }

        queue<int> q;
        for (int i = 0; i < v; i++) {
            if (inDeg[i] == 0) {
                q.push(i);
            }
        }

        vector<int> safeNodes;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            safeNodes.push_back(node);

            for (auto neighbor : revGraph[node]) {
                if (--inDeg[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        sort(safeNodes.begin(), safeNodes.end());
        return safeNodes;
    }
};

```

---

## 📝 How It Works

- **Objective:** Return all nodes where every path from that node eventually leads to a terminal node (no cycles).
- **Technique:**
    
    Use **reverse graph + in-degree count (Kahn’s Algorithm)**:
    
    - Reverse all edges: Instead of `u → v`, make `v → u`.
    - Process nodes with in-degree 0 (terminal nodes in the original graph).
    - Remove nodes as we process them, identifying all nodes that do not participate in cycles.
- **Step-by-Step:**
    1. Build a reverse graph.
    2. Count in-degrees for each node in the original graph.
    3. Apply BFS to nodes with in-degree 0 in the reversed graph.
    4. Collected nodes are the safe nodes.

---

## 🧩 Key Formula / Recurrence

- Reverse graph construction:
    
    ```
    revGraph[neighbor].push_back(i);
    inDeg[i]++;
    
    ```
    
- BFS traversal:
    
    ```
    while (!q.empty()):
        for (neighbor in revGraph[node]):
            inDeg[neighbor]--;
            if (inDeg[neighbor] == 0):
                q.push(neighbor);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

Where:

- V = number of nodes.
- E = number of edges.

---

## ⚠️ Edge Cases

- Empty graph → Return empty list.
- Graph with all terminal nodes → Return all nodes.
- Graph with cycles → Nodes involved in cycles are not in the result.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS with Coloring | O(V + E) | Uses visited + recursion stack coloring. |

---

## 🔁 Related Problems

- LeetCode 802: Find Eventual Safe States (Exact Problem)
- LeetCode 207: Course Schedule
- LeetCode 210: Course Schedule II
- LeetCode 785: Is Graph Bipartite?

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    In a workflow system, identifying tasks that can always finish without getting stuck in a loop.
    
- ✅ Reverse graph + Kahn’s Algorithm is a reliable and intuitive method for detecting **safe states** and **cycle-free nodes** in directed graphs.
- ✅ Safe nodes are always part of the graph's **Directed Acyclic Graph (DAG) components**.

---