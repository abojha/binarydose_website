---
title: Articulation Point
description: ""
tags:
  - algorithms
  - graph
  - graphs
  - hard
  - other
---

### Problem Statement:

Given an undirected connected graph with **V** vertices and adjacency list **adj**

. You are required to find all the vertices removing which (and edges through it) disconnects the graph into 2 or more components and return it in sorted manner.

**Note:**

Indexing is zero-based i.e nodes numbering from (0 to V-1). There might be loops present in the graph.

- Example:
    
    **Example 1:**
    
    ```
    Input:
    Output:{1,4}
    Explanation:Removing the vertex 1 will
    discconect the graph as-
    
    Removing the vertex 4 will disconnect the
    graph as-
    
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/PROD/addEditProblem/708502/Web/Other/a27f9040-9783-4386-92f9-b8684c75db07_1685087852.png)
    
    ![](https://media.geeksforgeeks.org/img-practice/PROD/addEditProblem/708502/Web/Other/7e12629a-ba31-411e-b6ac-ccf5a8baa6a3_1685087852.png)
    
    ![](https://media.geeksforgeeks.org/img-practice/PROD/addEditProblem/708502/Web/Other/fb781bda-91d6-4920-96a8-c976412c3ada_1685087852.png)
    

---

---

### ✅ Solution: Tarjan’s Algorithm for Articulation Points

```cpp
// User function Template for C++

class Solution {
  public:
    void dfs(int node, int parent, vector<int> adj[], vector<bool> &vis,
             vector<int> &isArticulation, int &timer,
             vector<int> &low, vector<int> &tin) {

        vis[node] = true;
        tin[node] = low[node] = timer++;
        int children = 0;

        for(auto neighbor : adj[node]){
            if(neighbor == parent) continue;

            if(!vis[neighbor]){
                dfs(neighbor, node, adj, vis, isArticulation, timer, low, tin);
                low[node] = min(low[node], low[neighbor]);

                // Articulation point condition for non-root node
                if(low[neighbor] >= tin[node] && parent != -1){
                    isArticulation[node] = 1;
                }

                children++;
            }
            else {
                // Back edge
                low[node] = min(low[node], tin[neighbor]);
            }
        }

        // Articulation point condition for root node
        if(parent == -1 && children > 1){
            isArticulation[node] = 1;
        }
    }

    vector<int> articulationPoints(int V, vector<int> adj[]) {
        int timer = 0;
        vector<bool> vis(V, false);
        vector<int> low(V), tin(V), isArticulation(V, 0);

        for(int i = 0; i < V; i++){
            if(!vis[i]){
                dfs(i, -1, adj, vis, isArticulation, timer, low, tin);
            }
        }

        vector<int> res;
        for(int i = 0; i < V; i++){
            if(isArticulation[i]) res.push_back(i);
        }

        return res.empty() ? vector<int>{-1} : res;
    }
};

```

---

### 📝 How It Works

- Uses a DFS traversal to assign:
    - `tin[node]`: discovery time of a node
    - `low[node]`: lowest discovery time reachable from its subtree
- A node is an **articulation point** if:
    - **(non-root)**: `low[neighbor] >= tin[node]` for any child
    - **(root)**: has more than one child in DFS tree
- The `low[]` values get updated via back edges.

---

### 🧩 Key Formula / Condition

- Articulation Point Conditions:
    - `low[neighbor] >= tin[node]` for any child and node is not root.
    - Root node has `children > 1` in DFS.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(V + E) |
| 💾 Space | O(V) for `tin`, `low`, `vis`, `mark` |

---

### ⚠️ Edge Cases

- Disconnected graph → handles via loop on all components.
- No articulation points → return `{-1}` as required.
- Root node with only one child is **not** an articulation point.

---

### 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Remove one node and check connectivity (brute) ❌ | O(V*(V+E)) | High |
| Tarjan’s Algorithm ✅ | O(V + E) | Optimal |

---

### 🔁 Related Problems

- Leetcode 1192: Critical Connections (bridges)
- Tarjan's SCC (Strongly Connected Components)
- GFG: Bridges in a Graph
- Cut Vertices & Biconnected Components