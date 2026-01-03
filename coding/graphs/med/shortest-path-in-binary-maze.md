---
title: Shortest Path in Binary Maze
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

Given an **n * m** matrix grid where each element can either be **0** or **1.** You need to find the shortest distance between a given source cell to a destination cell. The path can only be created out of a cell if its value is 1.

If the path is not possible between the source cell and the destination cell, then return **-1**.

**Note:** You can move into an adjacent cell if that adjacent cell is filled with element 1. Two cells are adjacent if they share a side. In other words, you can move in one of four directions, Up, Down, Left, and Right.

- Example:
    
    ```
    Example 1:
    
    Input:
    grid[][] = {{1, 1, 1, 1},
                {1, 1, 0, 1},
                {1, 1, 1, 1},
                {1, 1, 0, 0},
                {1, 0, 0, 1}}
    source = {0, 1}
    destination = {2, 2}
    Output:
    3
    
    Explanation: 
    
    1 1 1 1
    1 1 0 1
    1 1 1 1
    1 1 0 0
    1 0 0 1
    The highlighted part in the above matrix denotes the shortest path from source to destination cell.
    
    Example 2:
    
    Input:
    grid[][] = {{1, 1, 1, 1, 1},
                {1, 1, 1, 1, 1},
                {1, 1, 1, 1, 0},
                {1, 0, 1, 0, 1}}
    source = {0, 0}
    destination = {3, 4}
    Output:
    -1 
    Explanation: 
    Since, there is no path possible between the source cell and the destination cell, hence we return -1.
    ```
    

---

---

## ✅ Solution: Breadth-First Search (BFS) for Unweighted Grid

```cpp
int shortestPath(vector<vector<int>> &grid, pair<int, int> source,
                 pair<int, int> destination)
{
    // Edge Case: source and destination are same
    if (source.first == destination.first &&
        source.second == destination.second)
        return 0;

    int rows = grid.size();
    int cols = grid[0].size();

    // Distance matrix initialized to a large value
    vector<vector<int>> distance(rows, vector<int>(cols, 1e9));
    distance[source.first][source.second] = 0;

    // Queue stores {distance, {row, col}}
    queue<pair<int, pair<int, int>>> bfsQueue;
    bfsQueue.push({0, {source.first, source.second}});

    // 4 directions: up, right, down, left
    int deltaRow[] = {-1, 0, 1, 0};
    int deltaCol[] = {0, 1, 0, -1};

    while (!bfsQueue.empty())
    {
        auto front = bfsQueue.front();
        bfsQueue.pop();

        int currentDistance = front.first;
        int row = front.second.first;
        int col = front.second.second;

        // Explore all 4 neighbors
        for (int i = 0; i < 4; i++)
        {
            int neighborRow = row + deltaRow[i];
            int neighborCol = col + deltaCol[i];

            // Check validity: within bounds, cell is 1, and has a shorter path
            if (neighborRow >= 0 && neighborRow < rows &&
                neighborCol >= 0 && neighborCol < cols &&
                grid[neighborRow][neighborCol] == 1 &&
                currentDistance + 1 < distance[neighborRow][neighborCol])
            {
                distance[neighborRow][neighborCol] = currentDistance + 1;

                // If destination reached, return distance
                if (neighborRow == destination.first &&
                    neighborCol == destination.second)
                    return currentDistance + 1;

                bfsQueue.push({currentDistance + 1, {neighborRow, neighborCol}});
            }
        }
    }

    // Destination not reachable
    return -1;
}

```

---

### 📝 How It Works

- This is a standard **BFS traversal on a 2D grid**, ideal for finding the shortest path in an unweighted graph.
- Each cell represents a node, and the edges are implied by allowed moves (up, down, left, right).
- We use a **distance matrix** to store the shortest path from source to each cell.
- As soon as we encounter the destination during BFS traversal, we return the distance.

---

### 🧩 Key Formula / Recurrence

No recurrence here — it's a graph traversal.

The grid is treated as an **unweighted graph**, and BFS ensures the **first time you reach a node is the shortest distance**.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N × M) |
| Space | O(N × M) |
- Each cell is visited once at most.
- The queue and distance matrix both use O(N×M) space.

---

### ⚠️ Edge Cases

- Source and destination are the same: return `0`.
- Grid contains `0` at the source or destination: not reachable.
- Destination surrounded by zeros: unreachable → return `1`.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| DFS | O(N×M) | O(N×M) | ❌ Won’t guarantee shortest path |
| Dijkstra | O(N×M log N×M) | O(N×M) | Overkill for uniform weights |
| BFS ✅ | O(N×M) | O(N×M) | Best for unweighted shortest path problems |

---

### 🔁 Related Problems

- [LC 1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)
- [LC 542. 01 Matrix](https://leetcode.com/problems/01-matrix/)
- [GFG: Shortest Source to Destination Path](https://practice.geeksforgeeks.org/problems/shortest-source-to-destination-path3544/1)
- [LC 994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

---

### 🛠️ Other Notes

- BFS is the best approach when **all edges have the same cost** (like moving to adjacent cells).
- Can be extended to **8 directions** by modifying the `deltaRow` and `deltaCol` arrays.
- Use a **priority queue** and Dijkstra if cell weights vary.