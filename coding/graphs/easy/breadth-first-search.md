---
title: Breadth First Search
description: ""
tags:
  - easy
  - graphs
  - learning
---

### Problem Statement:

Given a **connected undirected graph** containing **V** vertices, represented by a 2-d adjacency list **`adj[][]`**, where each `adj[i]` represents the list of vertices connected to vertex `i`. Perform a **Breadth First Search (BFS)** traversal starting from vertex `0`, visiting vertices from left to right according to the given adjacency list, and return a list containing the BFS traversal of the graph.

**Note:** Do traverse in the **same order** as they are in the given **adjacency list**.

- Example:
    
    ```
    Input: adj[][] = [[2, 3, 1], [0], [0, 4], [0], [2]]
    
    Output: [0, 2, 3, 1, 4]
    Explanation: Starting from 0, the BFS traversal will follow these steps: 
    Visit 0 → Output: 0 
    Visit 2 (first neighbor of 0) → Output: 0, 2 
    Visit 3 (next neighbor of 0) → Output: 0, 2, 3 
    Visit 1 (next neighbor of 0) → Output: 0, 2, 3, 
    Visit 4 (neighbor of 2) → Final Output: 0, 2, 3, 1, 4
    Input: adj[][] = [[1, 2], [0, 2], [0, 1, 3, 4], [2], [2]]
    
    Output: [0, 1, 2, 3, 4]
    Explanation: Starting from 0, the BFS traversal proceeds as follows: 
    Visit 0 → Output: 0 
    Visit 1 (the first neighbor of 0) → Output: 0, 1 
    Visit 2 (the next neighbor of 0) → Output: 0, 1, 2 
    Visit 3 (the first neighbor of 2 that hasn't been visited yet) → Output: 0, 1, 2, 3 
    Visit 4 (the next neighbor of 2) → Final Output: 0, 1, 2, 3, 4
    ```
    

---

---

## Solution: Breadth-First Search (BFS) — Using Adjacency List and Queue

```cpp
// ✅ BFS Traversal of Graph Using Adjacency List

vector<int> bfs(vector<vector<int>> &adj) {
    int V = adj.size();               // Number of vertices
    vector<bool> visited(V, false);   // Visited array

    queue<int> q;
    q.push(0);                        // Starting from node 0
    visited[0] = true;

    vector<int> res;                  // To store BFS result

    while (!q.empty()) {
        int v = q.front();
        q.pop();

        res.push_back(v);             // Add current node to result

        for (auto neighbor : adj[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);     // Push unvisited neighbors into queue
            }
        }
    }

    return res;
}

```

---

## 📝 How It Works

- **Step 1:** Initialize:
    - `visited[]` array with all values as `false`.
    - A queue to store nodes that need to be processed.
- **Step 2:** Start from vertex `0`:
    - Mark it visited.
    - Add it to the queue.
- **Step 3:** While the queue is not empty:
    - Dequeue a node.
    - Add it to the result list.
    - Visit all its neighbors:
        - If a neighbor isn’t visited, mark it visited and enqueue it.
- **Final Output:** Returns a vector containing BFS traversal order starting from node `0`.

---

## 🧩 Key Formula / Recurrence

- No recurrence.
- **Queue processing logic:**
    
    `enqueue all unvisited neighbors of front element.`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(V + E) |
| Space | O(V) |
- **V**: Number of vertices.
- **E**: Number of edges.
- Space comes from the visited array and queue.

---

## ⚠️ Edge Cases

- Graph with multiple components → Only nodes reachable from `0` will be visited.
- Empty graph (`V == 0`) → Should return an empty result.
- Self-loops or parallel edges → Handled naturally with `visited[]` array.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| BFS All Components | O(V + E) | Traverse all unvisited nodes even if disconnected. |
| DFS Traversal | O(V + E) | Stack/Recursion-based alternative. |

---

## 🔁 Related Problems

- Level Order Traversal in Trees
- Connected Components in Graphs
- Bipartite Graph Check Using BFS
- Shortest Path in Unweighted Graphs

---