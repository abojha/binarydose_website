---
title: Number of Operations to Make Network Connected
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between computers `ai` and `bi`. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return *the minimum number of times you need to do this in order to make all the computers connected*. If it is not possible, return `-1`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2020/01/02/sample_1_1677.png)
    
    ```
    Input: n = 4, connections = [[0,1],[0,2],[1,2]]
    Output: 1
    Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2020/01/02/sample_2_1677.png)
    
    ```
    Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
    Output: 2
    
    ```
    
    **Example 3:**
    
    ```
    Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
    Output: -1
    Explanation: There are not enough cables.
    ```
    

---

### Solution: Disjoint Set (Union Find with Union by Size)

---

```cpp
class DisjointSet {
public:
    vector<int> parent, rank, size;

    // Constructor to initialize parent, rank and size
    DisjointSet(int n){
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for(int i = 0; i <= n; i++){
            parent[i] = i; // each node is initially its own parent
        }
    }

    // Find with path compression
    int findParent(int x){
        if(parent[x] == x) return x;
        return parent[x] = findParent(parent[x]); // compress path
    }

    // Union by size
    void unionBySize(int y, int z){
        int rootY = findParent(y);
        int rootZ = findParent(z);

        if(rootY == rootZ) return;

        if(size[rootY] > size[rootZ]){
            parent[rootZ] = rootY;
            size[rootY] += size[rootZ];
        }
        else {
            parent[rootY] = rootZ;
            size[rootZ] += size[rootY];
        }
    }
};

class Solution {
public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        DisjointSet ds(n);
        int cntExtras = 0; // count of redundant connections

        // Process each connection
        for(auto it : connections){
            int u = it[0];
            int v = it[1];

            // If both have same parent, it's an extra cable
            if(ds.findParent(u) == ds.findParent(v)){
                cntExtras++;
            } else {
                ds.unionBySize(u, v);
            }
        }

        // Count how many disconnected components exist
        int numComponents = 0;
        for(int i = 0; i < n; i++){
            if(ds.parent[i] == i) // i is representative of a component
                numComponents++;
        }

        int requiredCables = numComponents - 1;

        return (cntExtras >= requiredCables) ? requiredCables : -1;
    }
};

```

---

## 📝 How It Works

- The goal is to connect all `n` computers using available cables.
- We use **Disjoint Set Union (DSU)** to track how many connected components exist.
- For each connection:
    - If both nodes are already in the same set → **redundant cable** (can be reused).
    - Otherwise, unite them using union by size.
- After processing all connections:
    - Count the number of **disconnected components**.
    - To fully connect all components, we need **(components - 1)** extra cables.
- If the number of redundant cables is sufficient → return that count.
- Else → return `1` (not enough cables to connect the network).

---

## 🧩 Key Formula / Recurrence

- `required_cables = components - 1`
- Use `unionBySize()` to keep DSU trees flat and optimized.
- Use `findParent()` with path compression to avoid TLE.

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| ⏱️ Time | `O(N + E*α(N))` where `α(N)` is inverse Ackermann function (nearly constant) |
| 💾 Space | `O(N)` for `parent`, `rank`, `size` arrays |

---

## ⚠️ Edge Cases

- Less than `n - 1` total connections: return `1` immediately.
- All nodes already connected: should return `0`.

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| DFS/BFS | O(N + E) | Valid, but DSU is more optimal for repeated merging |
| Kruskal's (MST) | O(E log E) | Overkill for just checking connectivity |

---

## 🔁 Related Problems

- Leetcode 547: **Number of Provinces** (Connected Components in Graph)
- Leetcode 1319: **Number of Operations to Make Network Connected** ✅
- Leetcode 684: **Redundant Connection**
- GFG: Detect Cycle in Undirected Graph using DSU

---

### 🛠️ Other Notes

- Think of computers as **islands**, and cables as **bridges**.
- If you can reuse extra bridges (redundant cables), you can connect disconnected islands (components).