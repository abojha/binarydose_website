---
title: Making A Large Island
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

You are given an `n x n` binary matrix `grid`. You are allowed to change **at most one** `0` to be `1`.

Return *the size of the largest **island** in* `grid` *after applying this operation*.

An **island** is a 4-directionally connected group of `1`s.

- Example:
    
    **Example 1:**
    
    ```
    Input: grid = [[1,0],[0,1]]
    Output: 3
    Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
    
    ```
    
    **Example 2:**
    
    ```
    Input: grid = [[1,1],[1,0]]
    Output: 4
    Explanation:Change the 0 to 1 and make the island bigger, only one island with area = 4.
    ```
    
    **Example 3:**
    
    ```
    Input: grid = [[1,1],[1,1]]
    Output: 4
    Explanation: Can't change any 0 to 1, only one island with area = 4.
    ```
    

---

---

### ✅ Solution: Disjoint Set (Union by Size)

```cpp
class DisjointSet {
public:
    vector<int> parent, rank, size;

    // Initialize DSU with n * n nodes
    DisjointSet(int totalNodes){
        rank.resize(totalNodes + 1, 0);
        parent.resize(totalNodes + 1);
        size.resize(totalNodes + 1, 1);
        for(int i = 0; i <= totalNodes; i++){
            parent[i] = i; // Each node is its own parent
        }
    }

    // Find with path compression
    int findParent(int node){
        if(parent[node] == node) return node;
        return parent[node] = findParent(parent[node]);
    }

    // Union by size
    void unionBySize(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);
        if(parentU == parentV) return;

        if(size[parentU] > size[parentV]){
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        } else {
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        }
    }
};

```

```cpp
class Solution {
public:
    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size();
        DisjointSet ds(n * n); // DSU with total n*n nodes

        // Directions for adjacent cells: right, left, down, up
        int dx[] = {0, 0, 1, -1};
        int dy[] = {1, -1, 0, 0};

        // Step 1: Union adjacent '1' cells
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(grid[i][j] == 0) continue;

                for(int k = 0; k < 4; k++){
                    int nx = dx[k] + i;
                    int ny = dy[k] + j;

                    if(nx >= 0 && ny >= 0 && nx < n && ny < n && grid[nx][ny] == 1){
                        int currNo = i * n + j;
                        int adjNo = nx * n + ny;
                        ds.unionBySize(currNo, adjNo);
                    }
                }
            }
        }

        int maxIslandSize = 0;

        // Step 2: For each 0, try converting to 1 and calculate potential island size
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                if(grid[i][j] == 1) continue;

                set<int> components;
                for(int k = 0; k < 4; k++){
                    int nx = dx[k] + i;
                    int ny = dy[k] + j;

                    if(nx >= 0 && ny >= 0 && nx < n && ny < n && grid[nx][ny] == 1){
                        components.insert(ds.findParent(nx * n + ny));
                    }
                }

                // Combine sizes of unique neighboring components
                int totalSize = 0;
                for(auto parent : components){
                    totalSize += ds.size[parent];
                }

                // Add 1 for the current flipped cell
                maxIslandSize = max(maxIslandSize, totalSize + 1);
            }
        }

        // Step 3: If no 0 found, return size of largest existing island
        for(int i = 0; i < n * n; i++){
            maxIslandSize = max(maxIslandSize, ds.size[ds.findParent(i)]);
        }

        return maxIslandSize;
    }
};

```

---

## 📝 How It Works

- All cells with `1` are grouped into islands using DSU.
- For each `0`, try converting it into a `1` and merge all **distinct neighboring islands**.
- Keep track of the **maximum size** after merging.
- If no `0` exists, return the size of the largest existing island.

---

## 🧩 Key Idea

- Treat each cell as a node: `node = i * n + j`.
- Merge `1`cells using `unionBySize`.
- For each `0`, simulate a flip and check 4 directions using DSU.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(N² * 4α(N²)) → nearly O(N²) |
| 💾 Space | O(N²) |

---

## ⚠️ Edge Cases

- Grid already all 1s → no flip needed.
- Grid full of 0s → only one cell can be turned into island.

---

## 🔁 Related Problems

- Leetcode 827: **Making A Large Island** ✅
- Leetcode 200: **Number of Islands**
- Leetcode 305: **Number of Islands II**
- GFG: **Islands in a Graph (DSU)**