---
title: Number of Provinces
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return *the total number of **provinces***.

- Example:
    
    ```
    Example 1:
    
    Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
    Output: 2
    Example 2:
    
    Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
    Output: 3
    ```
    

---

## ✅ Solution: Connected Components Counting (Find Number of Provinces / Connected Groups)

---

## ✅ **Code — DFS + Adjacency List Construction**

```cpp
// ✅ Find Number of Provinces Using DFS and Adjacency List Conversion

class Solution {
public:
    void dfs(int node, vector<bool>& visited, vector<vector<int>>& adj) {
        visited[node] = true;

        for (auto neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, adj);
            }
        }
    }

    int findCircleNum(vector<vector<int>>& isConnected) {
        int v = isConnected.size();
        vector<vector<int>> adj(v);

        // Convert adjacency matrix to adjacency list
        for (int i = 0; i < v; i++) {
            for (int j = 0; j < v; j++) {
                if (isConnected[i][j] == 1 && i != j) {
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }

        vector<bool> visited(v, false);
        int count = 0;

        for (int i = 0; i < v; i++) {
            if (!visited[i]) {
                count++;
                dfs(i, visited, adj);
            }
        }

        return count;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Convert adjacency matrix `isConnected` into an adjacency list `adj`.
    
    ✅ This reduces redundant checks during DFS traversal.
    
- **Step 2:** Initialize `visited[]` array.
- **Step 3:** For each unvisited node:
    - Increment `count` (new province).
    - Call DFS to visit all nodes in that component.
- **Step 4:** Return the total number of provinces found.

✅ This is equivalent to counting connected components in an undirected graph.

---

## 🧩 Key Formula / Recurrence

- **DFS Recurrence:**
    
    `dfs(node) → for each neighbor → if not visited → dfs(neighbor)`
    
- **Final Result:**
    
    `count = number of DFS calls from unvisited nodes.`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(V²) |
| Space | O(V²) |
- **V**: Number of vertices (cities).
- Matrix conversion takes O(V²).
- DFS traversal covers all edges once.

---

## ⚠️ Edge Cases

- All cities disconnected → `count = V`.
- All cities fully connected → `count = 1`.
- Self-loops in `isConnected[i][i]` ignored (i ≠ j check).

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| Adjacency Matrix DFS | O(V²) | O(V) | Skip adjacency list step. |
| Union-Find / Disjoint Set | O(V² * α(V)) | O(V) | Faster for dynamic components. |

---

## 🔁 Related Problems

- Number of Islands
- Connected Components in Undirected Graph
- Redundant Connection Detection
- Friendship Circle Counting

---