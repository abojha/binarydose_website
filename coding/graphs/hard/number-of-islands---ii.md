---
title: Number of Islands - II
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

You are given a **n,m** which means the row and column of the 2D matrix and an array of  size k denoting the number of operations. Matrix elements is 0 if there is water or 1 if there is land. Originally, the 2D matrix is all 0 which means there is no land in the matrix. The array has k operator(s) and each operator has two integer A[i][0], A[i][1] means that you can change the cell matrix[A[i][0]][A[i][1]] from sea to island. Return how many island are there in the matrix after each operation.You need to return an array of size **k** .

**Note :**

An island means group of 1s such that they share a common side.

- Example:
    
    **Example 1:**
    
    ```
    Input: n = 4
    m = 5
    k = 4
    A = {{1,1},{0,1},{3,3},{3,4}}
    
    Output: 1 1 2 2
    Explanation:
    0.  00000
        00000
        00000
        00000
    1.  00000
        01000
        00000
        00000
    2.  01000
        01000
        00000
        00000
    3.  01000
        01000
        00000
        00010
    4.  01000
        01000
        00000
        00011
    ```
    
    **Example 2:**
    
    ```
    Input: n = 4
    m = 5
    k = 4
    A = {{0,0},{1,1},{2,2},{3,3}}
    
    Output: 1 2 3 4
    Explanation:
    0.  00000
        00000
        00000
        00000
    1.  10000
        00000
        00000
        00000
    2.  10000
        01000
        00000
        00000
    3.  10000
        01000
        00100
        00000
    4.  10000
        01000
        00100
        00010
    ```
    

---

---

### ✅ Solution: Disjoint Set (Union by Size) – *Number of Islands in a 2D Grid with Operators*

```cpp
// User function Template for C++
class DisjointSet {
public:
    vector<int> parent, rank, size;

    // Initialize parent, rank, and size arrays
    DisjointSet(int totalNodes){
        rank.resize(totalNodes + 1, 0);
        parent.resize(totalNodes + 1);
        size.resize(totalNodes + 1, 1);
        for(int i = 0; i <= totalNodes; i++){
            parent[i] = i; // Every node is initially its own parent
        }
    }

    // Find ultimate parent with path compression
    int findParent(int node){
        if(parent[node] == node) return node;
        return parent[node] = findParent(parent[node]);
    }

    // Union two components by size
    void unionBySize(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);

        if(parentU == parentV) return; // already in same set

        if(size[parentU] > size[parentV]){
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        } else {
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        }
    }
};

class Solution {
public:
    vector<int> numOfIslands(int numRows, int numCols, vector<vector<int>> &operators) {
        DisjointSet ds(numRows * numCols); // DSU for the entire grid
        int visited[numRows][numCols];
        memset(visited, 0, sizeof(visited)); // mark all cells as unvisited

        int islandCount = 0;
        vector<int> result;

        for(auto operation : operators){
            int row = operation[0];
            int col = operation[1];

            // If cell is already land, island count doesn't change
            if(visited[row][col] == 1){
                result.push_back(islandCount);
                continue;
            }

            // Step 1: Mark the current cell as land
            visited[row][col] = 1;
            islandCount++;

            // Directions: Right, Left, Down, Up
            int dx[] = {0, 0, 1, -1};
            int dy[] = {1, -1, 0, 0};

            // Step 2: Check all 4 neighbors
            for(int i = 0; i < 4; i++){
                int newRow = row + dx[i];
                int newCol = col + dy[i];

                // Check bounds and whether neighbor is land
                if(newRow >= 0 && newCol >= 0 && newRow < numRows && newCol < numCols){
                    if(visited[newRow][newCol] == 1){
                        // Convert 2D to 1D index for DSU
                        int currentNode = row * numCols + col;
                        int adjacentNode = newRow * numCols + newCol;

                        // If both belong to different components → merge them
                        if(ds.findParent(currentNode) != ds.findParent(adjacentNode)){
                            ds.unionBySize(currentNode, adjacentNode);
                            islandCount--; // merged 2 components → decrease count
                        }
                    }
                }
            }

            result.push_back(islandCount); // record current number of islands
        }

        return result;
    }
};

```

---

## 📝 How It Works

- Grid starts with all water.
- As land cells are added (via operators), check if the new cell connects to existing land.
- If it connects to land in a different component, we **merge components** using DSU and **reduce island count**.
- We use 2D→1D mapping: `index = row * m + col`.

---

## 🧩 Key Logic

- Every land addition starts as its **own island**.
- If it connects to other islands, we **union them** and reduce island count.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(Q * 4 * α(N*M))` where `Q = #operators`, `α` is inverse Ackermann |
| 💾 Space | `O(N*M)` for DSU and visited grid |

---

## ⚠️ Edge Cases

- Same cell added multiple times → skip union.
- All operators isolated → each forms new island.

---

## 🔁 Related Problems

- Leetcode 305: **Number of Islands II** ✅
- Leetcode 200: **Number of Islands**
- Leetcode 1319: **Make Network Connected**
- GFG: **Flood Fill variations**