---
title: Disjoint Set (Union By Rank/Size)
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

- Example:

---

## ✅ Disjoint Set Union (DSU) with Union by Rank & Union by Size

```cpp
#include<bits/stdc++.h>
using namespace std;

class DisJointSet {
    vector<int> rank, parent, size;

public:
    // Constructor initializes DSU with n elements
    DisJointSet(int n){
        rank.resize(n + 1, 0);
        size.resize(n + 1, 1);
        parent.resize(n + 1);
        for(int i = 0; i <= n; i++){
            parent[i] = i;  // Initially, each node is its own parent
        }
    }

    // Finds the ultimate parent of a node with path compression
    int findParent(int node){
        if(parent[node] == node)
            return node;
        return parent[node] = findParent(parent[node]);
    }

    // Union by Rank
    void unionByRank(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);

        if(parentU == parentV) return;

        if(rank[parentU] < rank[parentV]){
            parent[parentU] = parentV;
        }
        else if(rank[parentU] > rank[parentV]){
            parent[parentV] = parentU;
        }
        else{
            parent[parentV] = parentU;
            rank[parentU]++;
        }
    }

    // Union by Size
    void unionBySize(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);

        if(parentU == parentV) return;

        if(size[parentU] < size[parentV]){
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        }
        else{
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        }
    }
};

```

---

## 📝 How It Works

- **Disjoint Set Union (DSU)** is a data structure that tracks a set of elements partitioned into disjoint subsets.
- Each node has a **parent pointer** initially pointing to itself.
- `findParent(x)` uses **path compression** to flatten the tree structure.
- `unionByRank(u, v)` connects two components, using the **rank** to keep the tree shallow.
- `unionBySize(u, v)` connects smaller trees under larger ones using the **size** array.

---

## 🧩 Key Formula / Transitions

- **Path Compression**:
    
    ```cpp
    parent[x] = findParent(parent[x]);
    
    ```
    
- **Union by Rank**: Attach smaller rank under bigger.
- **Union by Size**: Attach smaller size under bigger and update size.

---

## ⏱️ Time & Space Complexity

| Operation | Time (Amortized) | Space |
| --- | --- | --- |
| `findParent` | O(α(N)) | O(N) |
| `unionByRank` | O(α(N)) | O(N) for rank |
| `unionBySize` | O(α(N)) | O(N) for size |

Where **α(N)** is the inverse Ackermann function, which grows very slowly.

---

## ⚠️ Edge Cases

- **Self-union**: Already handled by checking `if parentU == parentV`.
- **Multiple unions on same pair**: Efficient due to path compression and rank/size checks.
- **Disconnected nodes**: Supported; they will remain isolated if never united.

---

## 💡 Other Approaches

- **Basic Union (without rank/size)**: Can lead to deep trees → inefficient.
- **Only Path Compression**: Works well but slower than union by rank/size in some cases.

---

## 🔁 Related Problems

- [Leetcode 684 - Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- [Leetcode 1319 - Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)
- [Leetcode 1202 - Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/)
- [GFG - Detect Cycle in an Undirected Graph](https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1)

---

## 🛠️ Real-World Analogy

Imagine a group of cities that can be connected via roads. Initially, each city is isolated. DSU helps us:

- Group cities when roads are built (union).
- Check if two cities are in the same network (find).
- Use size/rank so smaller networks are merged under larger ones for efficiency—like company mergers.