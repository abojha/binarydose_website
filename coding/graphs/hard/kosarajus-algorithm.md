---
title: Kosaraju’s Algorithm
description: ""
tags:
  - algorithms
  - graph
  - graphs
  - hard
  - other
---

### Problem Statement:

- Example:

---

---

### ✅ Solution: Kosaraju’s Algorithm (Strongly Connected Components)

```cpp
// User function Template for C++

class Solution {
  public:
    void dfs(int node, vector<int> adj[], vector<bool> &vis, stack<int> &st){
        vis[node] = true;
        for(auto neigh : adj[node]){
            if(!vis[neigh]){
                dfs(neigh, adj, vis, st);
            }
        }
        st.push(node); // finish time
    }

    void revDfs(int node, vector<int> revAdj[], vector<bool> &vis){
        vis[node] = true;
        for(auto neigh : revAdj[node]){
            if(!vis[neigh]){
                revDfs(neigh, revAdj, vis);
            }
        }
    }

    int kosaraju(int V, vector<int> adj[]) {
        // Step 1: Do DFS and store finish times
        stack<int> st;
        vector<bool> vis(V, false);
        for(int i = 0; i < V; i++){
            if(!vis[i]){
                dfs(i, adj, vis, st);
            }
        }

        // Step 2: Reverse the graph
        vector<int> revAdj[V];
        for(int u = 0; u < V; u++){
            for(auto v : adj[u]){
                revAdj[v].push_back(u); // reverse edge
            }
        }

        // Step 3: Do DFS in order of decreasing finish time on reversed graph
        fill(vis.begin(), vis.end(), false);
        int sccCount = 0;
        while(!st.empty()){
            int node = st.top(); st.pop();
            if(!vis[node]){
                revDfs(node, revAdj, vis);
                sccCount++; // each DFS marks one strongly connected component
            }
        }

        return sccCount;
    }
};

```

---

### 📝 How It Works

Kosaraju's algorithm is used to find the number of **strongly connected components (SCCs)** in a **directed graph**.

The process has 3 major steps:

1. **First DFS**:
    - Perform DFS and store vertices in a stack according to **finish time** (postorder).
2. **Transpose Graph**:
    - Reverse the direction of all edges.
3. **Second DFS on Transposed Graph**:
    - Pop nodes from the stack and do DFS on the **reversed graph**.
    - Each DFS traversal will give **one SCC**.

---

### 🧩 Key Observations

- Vertices belonging to the same SCC will **always finish together** in DFS.
- Reversing the graph ensures we only visit nodes **within the same SCC** during the second DFS.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(V + E) |
| 💾 Space | O(V + E) |

---

### ⚠️ Edge Cases

- Empty graph → 0 SCCs
- Disconnected graph → SCCs equal to number of nodes
- All nodes in a cycle → only 1 SCC

---

### 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Tarjan’s Algorithm | O(V + E) | One-pass DFS using low-link values |
| Kosaraju ✅ | O(V + E) | Easier to implement with two DFS passes |

---

### 🔁 Related Problems

- **Leetcode 2115**: Find All Recipes You Can Make (uses topological + SCC concepts)
- **GFG**: Strongly Connected Components (Kosaraju)
- Tarjan’s SCC algorithm
- Condensation of a Graph (DAG of SCCs)

---