---
title: Bridge in a Graph
description: ""
tags:
  - algorithms
  - graph
  - graphs
  - hard
  - other
---

### Problem Statement:

There are `n` servers numbered from `0` to `n - 1` connected by undirected server-to-server `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between servers `ai` and `bi`. Any server can reach other servers directly or indirectly through the network.

A *critical connection* is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2019/09/03/1537_ex1_2.png)
    
    ```
    Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
    Output: [[1,3]]
    Explanation: [[3,1]] is also accepted.
    
    ```
    
    **Example 2:**
    
    ```
    Input: n = 2, connections = [[0,1]]
    Output: [[0,1]]
    ```
    

---

---

### ✅ Solution: DFS + Tarjan’s Algorithm

```cpp
class Solution {
public:
    void dfs(int node, int parent, vector<vector<int>> &adjList, vector<bool> &vis,
             vector<vector<int>> &bridges, int &timer, vector<int> &low, vector<int> &tin) {

        vis[node] = true;
        tin[node] = low[node] = timer++;

        for(auto neighbor : adjList[node]) {
            if(neighbor == parent) continue; // Skip the parent edge

            if(!vis[neighbor]) {
                dfs(neighbor, node, adjList, vis, bridges, timer, low, tin);

                // After visiting neighbor, update low-link value
                low[node] = min(low[node], low[neighbor]);

                // Check for bridge condition
                if(low[neighbor] > tin[node]) {
                    bridges.push_back({node, neighbor});
                }
            } else {
                // Back-edge case
                low[node] = min(low[node], tin[neighbor]);
            }
        }
    }

    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adjList(n);
        for(auto conn : connections){
            adjList[conn[0]].push_back(conn[1]);
            adjList[conn[1]].push_back(conn[0]);
        }

        int timer = 1;
        vector<bool> vis(n, false);
        vector<int> low(n), tin(n);
        vector<vector<int>> bridges;

        // For disconnected components (though in this problem graph is connected)
        for(int i = 0; i < n; i++) {
            if(!vis[i]) {
                dfs(i, -1, adjList, vis, bridges, timer, low, tin);
            }
        }

        return bridges;
    }
};

```

---

### 📝 How It Works

- We use **Tarjan’s algorithm** to find **bridges** (aka critical connections).
- A bridge is an edge `(u, v)` such that removing it increases the number of connected components.
- We do a DFS traversal and track:
    - `tin[node]`: time of insertion into DFS tree
    - `low[node]`: lowest discovery time reachable from subtree rooted at node
- If `low[neighbor] > tin[node]`, then `(node, neighbor)` is a **bridge**.

---

### 🧩 Key Formula / Condition

- Bridge condition:
    
    ```
    if (low[neigh] > tin[node])
        (node, neigh) is a bridge
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(N + E)` — DFS traversal |
| 💾 Space | `O(N + E)` — adjacency list + tin/low arrays |

---

### ⚠️ Edge Cases

- Disconnected graph: the code handles it via loop on all `i`.
- Multiple components or a tree: still works.

---

### 💡 Other Approaches

| Approach | Time |
| --- | --- |
| Remove each edge and check connectivity | `O(E * (N + E))` ❌ |
| Tarjan’s Algorithm ✅ | `O(N + E)` |

---

### 🔁 Related Problems

- Leetcode 1192: **Critical Connections in a Network** ✅
- Articulation Points in Graph
- Strongly Connected Components (Tarjan / Kosaraju)
- Bridge Tree Construction

---