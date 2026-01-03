---
title: Bipartite Graph
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

There is an **undirected** graph with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to. More formally, for each `v` in `graph[u]`, there is an undirected edge between node `u` and node `v`. The graph has the following properties:

- There are no self-edges (`graph[u]` does not contain `u`).
- There are no parallel edges (`graph[u]` does not contain duplicate values).
- If `v` is in `graph[u]`, then `u` is in `graph[v]` (the graph is undirected).
- The graph may not be connected, meaning there may be two nodes `u` and `v` such that there is no path between them.

A graph is **bipartite** if the nodes can be partitioned into two independent sets `A` and `B` such that **every** edge in the graph connects a node in set `A` and a node in set `B`.

Return `true` *if and only if it is **bipartite***.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/21/bi2.jpg)

```
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/21/bi1.jpg)

```
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: DFS Coloring — Check if Graph is Bipartite

```cpp
class Solution {
public:
    bool dfs(int node, int col, vector<int> &color, vector<vector<int>> &graph) {
        color[node] = col;

        for (auto neighbor : graph[node]) {
            if (color[neighbor] == -1) {
                if (!dfs(neighbor, !col, color, graph)) return false;
            } else if (color[neighbor] == col) {
                return false;  // Conflict: same color as current node
            }
        }
        return true;
    }

    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);  // -1 = unvisited, 0 and 1 = two colors

        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, color, graph)) return false;
            }
        }
        return true;
    }
};

```

---

## 📝 How It Works

- **Goal:** Check if the graph can be colored using 2 colors such that no two adjacent nodes have the same color.
- **Approach:**
    - Use **DFS** to assign colors alternately.
    - Maintain a `color` array: `1` means unvisited, `0` and `1` are the two colors.
    - If a conflict is found during DFS (neighbor has same color as current), return false.
- **Why It Works:**
    - A graph is bipartite if it contains **no odd-length cycles**.
    - Alternating colors while traversing is equivalent to partitioning into two sets.

---

## 🧩 Key Formula

- DFS coloring recurrence:
    
    ```
    color[node] = col;
    for (neighbor in graph[node]):
        if (color[neighbor] == -1):
            dfs(neighbor, !col)
        else if (color[neighbor] == col):
            return false;
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
- V = number of nodes
- E = number of edges
- Standard DFS traversal complexity.

---

## ⚠️ Edge Cases

- Empty graph → Considered bipartite.
- Disconnected graph → Must check all components.
- Complete bipartite graph → Valid bipartite.
- Graph with odd-length cycle → Not bipartite.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| BFS Coloring | O(V + E) | Uses a queue instead of recursion. |

---

## 🔁 Related Problems

- LeetCode 785: Is Graph Bipartite? (Exact Problem)
- LeetCode 886: Possible Bipartition
- LeetCode 997: Find the Town Judge (Related via graph concepts)

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Assigning two alternating tasks or shifts to people without conflict (e.g., team A vs. team B).
    
- ✅ Useful property in problems related to **2-coloring, partitioning, and scheduling**.
- ✅ Works for both connected and disconnected graphs by looping through all nodes.