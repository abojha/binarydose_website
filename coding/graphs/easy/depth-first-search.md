---
title: Depth First Search
description: ""
tags:
  - easy
  - graphs
  - learning
---

### Problem Statement:

Given a **connected undirected graph** containing **V** vertices represented by a 2-d adjacency list **`adj[][]`**, where each `adj[i]` represents the list of vertices connected to vertex `i`. Perform a **Depth First Search (DFS)** traversal starting from vertex 0, visiting vertices from left to right as per the given adjacency list, and return a list containing the DFS traversal of the graph.

**Note:** Do traverse in the **same order** as they are in the given **adjacency list**.

- Example:
    
    ```
    Input: adj[][] = [[2, 3, 1], [0], [0, 4], [0], [2]]
    
    Output: [0, 2, 4, 3, 1]
    Explanation: Starting from 0, the DFS traversal proceeds as follows:
    Visit 0 → Output: 0 
    Visit 2 (the first neighbor of 0) → Output: 0, 2 
    Visit 4 (the first neighbor of 2) → Output: 0, 2, 4 
    Backtrack to 2, then backtrack to 0, and visit 3 → Output: 0, 2, 4, 3 
    Finally, backtrack to 0 and visit 1 → Final Output: 0, 2, 4, 3, 1
    Input: adj[][] = [[1, 2], [0, 2], [0, 1, 3, 4], [2], [2]]
    
    Output: [0, 1, 2, 3, 4]
    Explanation: Starting from 0, the DFS traversal proceeds as follows: 
    Visit 0 → Output: 0 
    Visit 1 (the first neighbor of 0) → Output: 0, 1 
    Visit 2 (the first neighbor of 1) → Output: 0, 1, 2 
    Visit 3 (the first neighbor of 2) → Output: 0, 1, 2, 3 
    Backtrack to 2 and visit 4 → Final Output: 0, 1, 2, 3, 4
    ```
    

---

## ✅ Solution: Depth-First Search (DFS) — Recursive & Iterative (C++)

---

## ✅ **Recursive DFS**

```cpp
// ✅ Recursive DFS Traversal Using Adjacency List in C++

class Solution {
  public:
    void DFS(int node, vector<bool>& visited, vector<vector<int>>& adj, vector<int>& res) {
        visited[node] = true;
        res.push_back(node);

        for (auto neighbor : adj[node]) {
            if (!visited[neighbor]) {
                DFS(neighbor, visited, adj, res);
            }
        }
    }

    vector<int> dfsRecursive(vector<vector<int>>& adj) {
        int V = adj.size();
        vector<bool> visited(V, false);
        vector<int> res;

        DFS(0, visited, adj, res);

        return res;
    }
};

```

---

## ✅ **Iterative DFS**

```cpp
// ✅ Iterative DFS Traversal Using Adjacency List in C++

class Solution {
  public:
    vector<int> dfsIterative(vector<vector<int>>& adj) {
        int V = adj.size();
        vector<bool> visited(V, false);
        stack<int> st;
        vector<int> res;

        st.push(0);

        while (!st.empty()) {
            int node = st.top();
            st.pop();

            if (!visited[node]) {
                visited[node] = true;
                res.push_back(node);

                // Reverse iterate to maintain DFS order same as recursive
                for (auto it = adj[node].rbegin(); it != adj[node].rend(); it++) {
                    if (!visited[*it]) {
                        st.push(*it);
                    }
                }
            }
        }

        return res;
    }
};

```

---

## 📝 How It Works

- **Recursive DFS:**
    - Calls itself for each unvisited neighbor.
    - Uses system call stack to manage the order of exploration.
    - Starts from node `0`.
- **Iterative DFS:**
    - Uses an explicit stack.
    - Replaces the recursive stack with manual push/pop.
    - Reverse neighbor iteration is required to match recursive behavior.

✅ Both methods traverse the graph in depth-first order using adjacency list.

---

## 🧩 Key Formula / Recurrence

- **Recursive DFS Formula:**
    - `DFS(node) → mark visited → for each neighbor → if not visited → DFS(neighbor)`
- **Stack Order for Iterative DFS:**
    - Push neighbors in reverse order to mimic recursion.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(V + E) |
| Space | O(V) |
- **V** = Number of vertices.
- **E** = Number of edges.
- Space for visited array + recursion stack (recursive) or explicit stack (iterative).

---

## ⚠️ Edge Cases

- Disconnected graph → Only component connected to `0` will be visited.
- Empty graph → Returns empty result.
- Self-loops → Visited check handles them naturally.
- Duplicate edges → Visited array prevents re-visiting.

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| BFS Traversal | O(V + E) | O(V) | Level-wise, uses queue. |
| DFS All Components | O(V + E) | O(V) | Needed for disconnected graphs. |

---

## 🔁 Related Problems

- Connected Components Counting
- Topological Sorting (using DFS)
- Cycle Detection in Undirected Graph (using DFS)
- Strongly Connected Components