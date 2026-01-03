---
title: M-Coloring Problem
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

You are given an undirected graph consisting of **V** vertices and **E** edges represented by a list **edges[][]**, along with an integer **`m`**. Your task is to determine whether it is possible to **color the graph** using at most **`m`** different colors such that no two adjacent vertices share the **same color**. Return `true` if the graph can be colored with at most **`m`** colors, otherwise return `false`.

**Note:** The graph is indexed with 0-based indexing.

- Example:
    
    ```
    Input: V = 3, edges[][] = [[0, 1], [1, 2], [0, 2]], m = 2
    Output: false
    Explanation: It is not possible to color the given graph using only 2 colors because vertices 0, 1, and 2 form a triangle.
    ```
    

---

---

## ✅ Solution: Backtracking – M-Coloring

```cpp
class Solution {
  public:
    // Check if assigning color to 'node' is valid
    bool isSafe(int node, vector<vector<int>> &edges, int color, vector<int> &color_list){
        for(auto &edge : edges){
            int u = edge[0];
            int v = edge[1];

            // Check adjacency: if node is u or v and adjacent node has same color
            if(u == node && color_list[v] == color) return false;
            if(v == node && color_list[u] == color) return false;
        }
        return true;
    }

    // Try to color all nodes from index 'ind' to 'v'
    bool solve(int ind, int v, vector<vector<int>> &edges, int colors, vector<int>&color_list){
        if(ind == v){
            return true; // All vertices colored successfully
        }

        for(int color = 1; color <= colors; color++){
            if(isSafe(ind, edges, color, color_list)){
                color_list[ind] = color; // Assign color
                if(solve(ind + 1, v, edges, colors, color_list))
                    return true;
                color_list[ind] = 0; // Backtrack
            }
        }
        return false; // No valid color assignment
    }

    bool graphColoring(int v, vector<vector<int>> &edges, int m) {
        vector<int> color_list(v, 0); // 0 means uncolored
        return solve(0, v, edges, m, color_list);
    }
};

```

---

## 📝 Revision Notes – M-Coloring (Backtracking)

---

### ✅ How It Works

- You are given a graph with `v` vertices and `edges`, and a number `m` representing the **max colors available**.
- Your task is to color each node such that:
    - No two **adjacent vertices** share the same color.
    - At most `m` colors are used.
- Backtracking is used:
    - Try all colors `1...m` for a vertex.
    - If safe (no adjacent node has the same color), assign and recurse to next.
    - If no color works, backtrack.

---

### 🧩 Key Recurrence

```
solve(ind) = for color in 1 to m:
                if isSafe(ind, color):
                    assign and solve(ind + 1)

```

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(m^v) – exponential (m choices per v nodes) |
| **Space** | O(v) – for color assignment array |

---

### ⚠️ Edge Cases

- Graph is disconnected → handled naturally, as coloring goes node by node.
- m = 1 and edges exist → return false (no way to avoid adjacent coloring)
- No edges → any coloring is valid

---

### 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Backtracking ✅ | O(m^v) | Brute-force but effective for small `v` |
| Greedy Coloring ❌ | Depends on graph type | May not work for constrained color count |
| CSP/SAT Solver | Advanced | Real-world compiler/interpreter use |

---

### 🔁 Related Problems

- Leetcode 207 – Course Schedule (detect cycles)
- Leetcode 886 – Possible Bipartition (2-coloring)
- Leetcode 785 – Is Graph Bipartite?
- GFG – M Coloring Problem

---