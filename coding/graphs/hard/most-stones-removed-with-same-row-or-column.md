---
title: Most Stones Removed with Same Row or Column
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either **the same row or the same column** as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [xi, yi]` represents the location of the `ith` stone, return *the largest possible number of stones that can be removed*.

- Example:
    
    **Example 1:**
    
    ```
    Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    Output: 5
    Explanation: One way to remove 5 stones is as follows:
    1. Remove stone [2,2] because it shares the same row as [2,1].
    2. Remove stone [2,1] because it shares the same column as [0,1].
    3. Remove stone [1,2] because it shares the same row as [1,0].
    4. Remove stone [1,0] because it shares the same column as [0,0].
    5. Remove stone [0,1] because it shares the same row as [0,0].
    Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
    
    ```
    
    **Example 2:**
    
    ```
    Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
    Output: 3
    Explanation: One way to make 3 moves is as follows:
    1. Remove stone [2,2] because it shares the same row as [2,0].
    2. Remove stone [2,0] because it shares the same column as [0,0].
    3. Remove stone [0,2] because it shares the same row as [0,0].
    Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
    
    ```
    
    **Example 3:**
    
    ```
    Input: stones = [[0,0]]
    Output: 0
    Explanation: [0,0] is the only stone on the plane, so you cannot remove it.
    ```
    

---

### ✅ Solution: Disjoint Set (Union by Size) – *Most Stones Removed with Same Row or Column*

---

```cpp
class DisjointSet {
public:
    vector<int> parent, rank, size;

    // Initialize parent, rank, and size arrays
    DisjointSet(int n){
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for(int i = 0; i <= n; i++){
            parent[i] = i; // Every node is initially its own parent
        }
    }

    // Find the ultimate parent of a node with path compression
    int findParent(int node){
        if(parent[node] == node) return node;
        return parent[node] = findParent(parent[node]);
    }

    // Union two nodes by size (attach smaller to larger)
    void unionBySize(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);

        if(parentU == parentV) return;

        if(size[parentU] > size[parentV]){
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        }
        else {
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        }
    }
};

class Solution {
public:
    int removeStones(vector<vector<int>>& stones) {
        int maxRow = 0;
        int maxCol = 0;
        int totalStones = stones.size();

        // Find the maximum row and column index used
        for(int i = 0; i < stones.size(); i++){
            maxRow = max(maxRow, stones[i][0]);
            maxCol = max(maxCol, stones[i][1]);
        }

        // Create a DSU for (rows + cols). Offset cols to avoid collision.
        DisjointSet ds(maxRow + maxCol + 1);

        // Map to keep track of all unique nodes (row or col index used)
        map<int, int> nodeUsed;

        // Union each stone's row and (offset) column
        for(auto it : stones){
            int rowNode = it[0];
            int colNode = it[1] + maxRow + 1; // offset col to make unique node id

            ds.unionBySize(rowNode, colNode);

            // Mark both nodes as used
            nodeUsed[rowNode] = 1;
            nodeUsed[colNode] = 1;
        }

        // Count number of connected components (unique parents)
        int numComponents = 0;
        for(auto it : nodeUsed){
            int node = it.first;
            if(ds.findParent(node) == node){
                numComponents++;
            }
        }

        // Max stones removable = total stones - number of components
        return totalStones - numComponents;
    }
};

```

---

## 📝 How It Works

- You can remove a stone **if there’s another stone in the same row or column**.
- Think of each stone as a connection between its row and column.
- Use **Disjoint Set Union** to group all connected rows and columns.
- Offset column index to avoid clash with row index (`col + maxRow + 1`).
- After processing all unions:
    - Count how many **unique connected components** exist.
    - Answer is `total stones - number of components`.

---

## 🧩 Key Idea

- Treat **rows and columns as graph nodes**.
- Stones connect `row ↔ column`, forming a bipartite graph.
- DSU groups stones into connected components.
- **Each connected component must leave at least one stone**, others can be removed.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(N * α(N))` where `α` is inverse Ackermann |
| 💾 Space | `O(R + C)` where `R` is max row, `C` is max column |

---

## ⚠️ Edge Cases

- All stones in different rows/cols → no stone can be removed.
- All stones in same row/column → all but one can be removed.

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| DFS/BFS | O(N²) | Build row/col adjacency, less efficient |
| Union-Find ✅ | O(N * α(N)) | Most efficient |

---

## 🔁 Related Problems

- Leetcode 947: **Most Stones Removed with Same Row or Column** ✅
- Leetcode 1319: **Make Network Connected**
- Leetcode 200: **Number of Islands**
- Leetcode 990: **Satisfiability of Equality Equations**