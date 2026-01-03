---
title: Flloyd Warshall
description: ""
tags:
  - graphs
  - hard
  - path
  - shortest
---

### Problem Statement:

You are given an weighted **directed** graph, represented by an adjacency matrix, **dist[][]** of size **n x n**, where **dist[i][j]** represents the weight of the edge from **node i to node j**. If there is no direct edge, **dist[i][j]** is set to a large value (i.e., **108**) to represent infinity.

The graph may contain **negative edge weights**, but it does not contain any **negative weight cycles**.

Your task is to find the **shortest distance** between every pair of nodes **i** and **j** in the graph.

Note: Modify the distances for every pair **in place**.

- Example:
    
    **Examples :**
    
    ```
    Input:dist[][] = [[0, 4, 108, 5, 108], [108, 0, 1, 108, 6], [2, 108, 0, 3, 108], [108, 108, 1, 0, 2], [1, 108, 108, 4, 0]]
    
    Output:[[0, 4, 5, 5, 7], [3, 0, 1, 4, 6], [2, 6, 0, 3, 5], [3, 7, 1, 0, 2], [1, 5, 5, 4, 0]]
    
    Explanation:Each cell dist[i][j] in the output shows the shortest distance from node i to node j, computed by considering all possible intermediate nodes.
    
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893245/Web/Other/blobid0_1744701272.jpg)
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893245/Web/Other/blobid1_1744701370.jpg)
    
    ```
    Input:dist[][] = [[0, -1, 2], [1, 0, 108], [3, 1, 0]]
    
    Output:[[0, -1, 2], [1, 0, 3], [2, 1, 0]]
    
    Explanation:Each cell dist[i][j] in the output shows the shortest distance from node i to node j, computed by considering all possible intermediate nodes.
    From 2 to 0 shortest distance should be 2 by following path 2 -> 1 -> 0
    From 1 to 2 shortest distance should be 3 by following path 1 -> 0 -> 2
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893245/Web/Other/blobid2_1744701698.jpg)
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/893245/Web/Other/blobid3_1744701713.jpg)
    

---

---

## ✅ Solution: Floyd-Warshall (All Pairs Shortest Path)

```cpp
class Solution {
  public:
    void floydWarshall(vector<vector<int>> &dist) {
        int n = dist.size();
        for(int k = 0; k < n; k++){
            for(int i = 0; i < n; i++){
                for(int j = 0; j < n; j++){
                    // Only proceed if both paths are valid (not INF)
                    if (dist[i][k] < 1e8 && dist[k][j] < 1e8) {
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
    }
};

```

---

### 📝 How It Works

- The algorithm considers each node `k` as an **intermediate point** and checks if going from node `i → j` via `k` offers a shorter path.
- This is done for all pairs `(i, j)` for each possible intermediate node `k`.
- The matrix `dist[i][j]` is updated in-place to store the shortest distance from node `i` to `j`.

---

### 🧩 Key Formula / Transition
$$
\text{dist}[i][j] = \min(\text{dist}[i][j],\ \text{dist}[i][k] + \text{dist}[k][j])
$$
- Applied for every triple `(i, j, k)`.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N³) |
| Space | O(1) extra |
- Works in-place if the input matrix is directly modified.

---

### ⚠️ Edge Cases

- Ensure no integer overflow happens when dummy values like `1e8` are used to represent infinity. Check `dist[i][k] < 1e8` before adding.
- If graph has **negative cycles**, additional logic can be added to detect it (`dist[i][i] < 0` after completion).
- Input may contain `1e8` or `INT_MAX` to represent no path — ensure proper guards to avoid overflow.

---

### 💡 Other Approaches

| Approach | Use Case | Time |
| --- | --- | --- |
| Dijkstra N times | Works for positive weights only | O(N × E log N) |
| Floyd-Warshall | Handles **all pairs**, even with negative edges | O(N³) |

---

### 🔁 Related Problems

- [Leetcode 1334 – Find the City With the Smallest Number of Neighbors](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)
- [GFG – Floyd Warshall](https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1)
- Shortest cycle in a directed graph
- Detecting negative weight cycles

---

### 🛠️ Other Notes

- Real-world analogy: Floyd-Warshall is like building a map of all shortest air routes between all cities.
- You can use this to compute the **transitive closure** by replacing the weight matrix with boolean reachability matrix.
- The algorithm is simple, but not suitable for large graphs due to its cubic time complexity.