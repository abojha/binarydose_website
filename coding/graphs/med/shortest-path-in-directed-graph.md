---
title: Shortest Path in Directed Graph
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

Given a Directed Acyclic Graph of V vertices from 0 to n-1 and a 2D Integer array(or vector) edges[ ][ ] of length E, where there is a directed edge from edge[i][0] to edge[i][1] with a distance of edge[i][2] for all i.

Find the **shortest** path from **src(0)** vertex to all the vertices and if it is impossible to reach any vertex, then return **-1** for that vertex.

- Example:
    
    ```
    Examples :
    
    Input: V = 4, E = 2, edges = [[0,1,2], [0,2,1]]
    Output: [0, 2, 1, -1]
    Explanation: Shortest path from 0 to 1 is 0->1 with edge weight 2. Shortest path from 0 to 2 is 0->2 with edge weight 1. There is no way we can reach 3, so it's -1 for 3.
    Input: V = 6, E = 7, edges = [[0,1,2], [0,4,1], [4,5,4], [4,2,2], [1,2,3], [2,3,6], [5,3,1]]
    Output: [0, 2, 3, 6, 1, 5]
    Explanation: Shortest path from 0 to 1 is 0->1 with edge weight 2. Shortest path from 0 to 2 is 0->4->2 with edge weight 1+2=3. Shortest path from 0 to 3 is 0->4->5->3 with edge weight 1+4+1=6. Shortest path from 0 to 4 is 0->4 with edge weight 1.Shortest path from 0 to 5 is 0->4->5 with edge weight 1+4=5.
    ```
    

---

## ✅ Solution: Topological Sort + Relaxation (Shortest Path in Directed Acyclic Graph - DAG)

---

### Solution: Topological Sort + Single Pass Relaxation

```cpp
class Solution {
  public:
    void dfs(int node, vector<vector<pair<int, int>>>& graph, vector<int>& vis, stack<int>& st) {
        vis[node] = true;
        for (auto it : graph[node]) {
            if (!vis[it.first]) {
                dfs(it.first, graph, vis, st);
            }
        }
        st.push(node);
    }

    vector<int> shortestPath(int V, int E, vector<vector<int>>& edges) {
        vector<vector<pair<int, int>>> graph(V);
        for (auto it : edges) {
            graph[it[0]].push_back({it[1], it[2]});  // Directed graph with weights
        }

        vector<int> vis(V, 0);
        stack<int> st;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, graph, vis, st);  // Perform DFS-based topological sort
            }
        }

        vector<int> dist(V, 1e9);
        dist[0] = 0;  // Assuming source is node 0

        while (!st.empty()) {
            int node = st.top();
            st.pop();

            if (dist[node] != 1e9) {  // Only relax if node is reachable
                for (auto it : graph[node]) {
                    if (dist[it.first] > dist[node] + it.second) {
                        dist[it.first] = dist[node] + it.second;
                    }
                }
            }
        }

        vector<int> ans(V, -1);
        for (int i = 0; i < V; i++) {
            if (dist[i] != 1e9) {
                ans[i] = dist[i];
            }
        }
        return ans;
    }
};

```

---

## 📝 How It Works

- **Goal:** Find the shortest path from the source node (node 0) in a **Directed Acyclic Graph (DAG)**.
- **Step 1:** Build the graph using adjacency lists storing `{neighbor, weight}`.
- **Step 2:** Perform **Topological Sort** using DFS:
    - Push nodes onto a stack after all their neighbors have been visited.
- **Step 3:** Relax the edges following the topological order:
    - Initialize `dist[0] = 0` and other distances as `∞ (1e9)`.
    - Process nodes in stack order, updating `dist[]` if a shorter path is found.
- **Step 4:** Post-process distances:
    - Convert all `∞` values into `1` for unreachable nodes.

---

## 🧩 Key Formula / Recurrence

- **Relaxation Formula:**
    
    ```
    if (dist[neighbor] > dist[node] + weight):
        dist[neighbor] = dist[node] + weight
    
    ```
    
- **Topological Sort Condition:**
    - DFS used to generate valid node ordering for DAG relaxation.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(V + E) — DFS + Relaxation pass |
| **Space Complexity** | O(V + E) — Graph storage + auxiliary space |

---

## ⚠️ Edge Cases

- Disconnected graph → Some nodes remain at `1` in final answer.
- Multiple edges between same nodes → Only shortest one is considered through relaxation.
- Source node has no outgoing edges → Valid, only source node distance = 0.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Dijkstra’s | O((V + E) log V) | For graphs with cycles or weights ≥ 0. |
| Topological Sort ✅ | O(V + E) | Optimal for DAG, no cycles. |

---

## 🔁 Related Problems

- GFG: Shortest Path in Directed Acyclic Graph ✅
- LeetCode 743: Network Delay Time
- LeetCode 787: Cheapest Flights Within K Stops
- LeetCode 269: Alien Dictionary (Topological Sort)

---

## 🛠️ Other Notes (Optional)

- ✅ Real-world analogy: Scheduling tasks with dependencies where each task takes time (weighted edges).
- ✅ Works only for **DAG**. Does not handle graphs with negative-weight cycles (Bellman-Ford would be required for that).