---
title: Kruskal’s Algorithm
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

Given a weighted, undirected, and connected graph with V vertices and E edges, your task is to find the sum of the weights of the edges in the Minimum Spanning Tree (MST) of the graph. The graph is represented by an adjacency list, where each element adj[i] is a vector containing vector of integers. Each vector represents an edge, with the first integer denoting the endpoint of the edge and the second integer denoting the weight of the edge.

- Example:
    
    ```
    Input:
    3 3
    0 1 5
    1 2 3
    0 2 1
    
    Output:4
    Explanation:
    
    The Spanning Tree resulting in a weight
    of 4 is shown above.
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid1_1744376821.jpg)
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid2_1744376854.jpg)
    
    ```
    Input:
    2 1
    0 1 5
    
    Output:5
    
    Explanation: Only one Spanning Tree is possible which has a weight of 5.
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid3_1744376890.jpg)
    

---

## ✅ Solution: Kruskal’s Algorithm (Using Disjoint Set Union - Union by Size)

```cpp
class DisJointSet {
    vector<int> rank, parent, size;

public:
    DisJointSet(int n) {
        rank.resize(n + 1, 0);
        size.resize(n + 1, 1);
        parent.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }
    }

    int findParent(int node) {
        if (parent[node] == node)
            return node;
        return parent[node] = findParent(parent[node]); // Path compression
    }

    void unionBySize(int u, int v) {
        int parentU = findParent(u);
        int parentV = findParent(v);

        if (parentU == parentV) return;

        if (size[parentU] < size[parentV]) {
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        } else {
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        }
    }
};

class Solution {
  public:
    // Function to find sum of weights of edges of the Minimum Spanning Tree.
    int spanningTree(int V, vector<vector<int>> adj[]) {
        vector<pair<int, pair<int, int>>> edges; // {weight, {u, v}}

        // Convert adjacency list to edge list
        for (int i = 0; i < V; i++) {
            for (auto& neighbor : adj[i]) {
                int adjNode = neighbor[0];
                int weight = neighbor[1];
                edges.push_back({weight, {i, adjNode}});
            }
        }

        // Sort all edges by increasing weight
        sort(edges.begin(), edges.end());

        DisJointSet ds(V);
        int mstWeight = 0;

        for (auto& edge : edges) {
            int weight = edge.first;
            int u = edge.second.first;
            int v = edge.second.second;

            // Only add edge if it connects two different components
            if (ds.findParent(u) != ds.findParent(v)) {
                mstWeight += weight;
                ds.unionBySize(u, v); // or ds.unionByRank(u, v)
            }
        }

        return mstWeight;
    }
};

```

---

## 📝 How It Works

- **Kruskal’s Algorithm** is a greedy algorithm that builds the MST by always picking the **smallest weight edge** that connects two separate components.
- The edges are stored as `{weight, {u, v}}` and sorted.
- The **Disjoint Set Union (DSU)** is used to track connected components to avoid forming cycles.
- If two nodes `u` and `v` belong to different sets (no cycle), add that edge to MST and union the sets.

---

## 🧩 Key Formula / Logic

- Sort all edges.
- Pick edge `(u, v)` if `findParent(u) != findParent(v)`.
- Use DSU to merge sets via `unionBySize()` or `unionByRank()`.

---

## ⏱️ Time & Space Complexity

| Step | Complexity |
| --- | --- |
| Sorting edges | O(E log E) |
| Union-Find operations | O(E × α(N)) |
| Space (for DSU and edges) | O(N + E) |

Where **α(N)** is inverse Ackermann function, nearly constant.

---

## ⚠️ Edge Cases

- Graph with multiple components → MST is valid only for connected graph.
- Multiple same-weight edges handled automatically.
- Self-loops are not explicitly avoided — assume `adj[]` is clean or add a check if needed.

---

## 💡 Other Approaches

| Approach | Time Complexity | Space |
| --- | --- | --- |
| **Prim’s Algo** (Min Heap) | O(E log V) | O(V + E) |
| **Kruskal’s Algo (this)** | O(E log E) | O(N + E) |

---

## 🔁 Related Problems

- [Leetcode 1584 - Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)
- [Leetcode 1135 - Connecting Cities With Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost/)
- [GFG - Kruskal’s Algorithm](https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1)
- [Disjoint Set Cycle Detection](https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1)

---

## 🛠️ Real-world Analogy

Imagine you’re laying internet cables between cities with known costs between every pair. **Kruskal’s algorithm** helps you pick the cheapest possible connections such that all cities are connected and **no loops** (redundant wiring) are formed.