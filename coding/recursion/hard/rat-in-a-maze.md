---
title: Rat in a Maze
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

Consider a rat placed at **(0, 0)** in a square matrix ****of order **N * N**. It has to reach the destination at **(N - 1, N - 1)**. Find all possible paths that the rat can take to reach from source to destination. The directions in which the rat can move are **'U'(up)**, **'D'(down)**, **'L' (left)**, **'R' (right)**. Value 0 at a cell in the matrix represents that it is blocked and the rat cannot move to it while value 1 at a cell in the matrix represents that rat can travel through it.

- Example:
    
    ```
    Input:
    N = 4
    m[][] = {{1, 0, 0, 0},
            {1, 1, 0, 1}, 
            {1, 1, 0, 0},
            {0, 1, 1, 1}}
    
    Output: DDRDRR DRDDRR
    ```
    

---

---

## ✅ Solution 1: Backtracking (Manual Direction Check)

```cpp
class Solution {
  public:
    void find(int i, int j, vector<vector<int>>& maze, int n, string move, vector<string> &ans, vector<vector<int>> &vis) {
        if(i == n - 1 && j == n - 1) {
            ans.push_back(move);
            return;
        }

        // Move Down
        if(i + 1 < n && vis[i + 1][j] != 1 && maze[i + 1][j] == 1){
            vis[i][j] = 1;
            find(i + 1, j, maze, n, move + 'D', ans, vis);
            vis[i][j] = 0;
        }

        // Move Left
        if(j - 1 >= 0 && vis[i][j - 1] != 1 && maze[i][j - 1] == 1){
            vis[i][j] = 1;
            find(i, j - 1, maze, n, move + 'L', ans, vis);
            vis[i][j] = 0;
        }

        // Move Right
        if(j + 1 < n && vis[i][j + 1] != 1 && maze[i][j + 1] == 1){
            vis[i][j] = 1;
            find(i, j + 1, maze, n, move + 'R', ans, vis);
            vis[i][j] = 0;
        }

        // Move Up
        if(i - 1 >= 0 && vis[i - 1][j] != 1 && maze[i - 1][j] == 1){
            vis[i][j] = 1;
            find(i - 1, j, maze, n, move + 'U', ans, vis);
            vis[i][j] = 0;
        }
    }

    vector<string> ratInMaze(vector<vector<int>>& maze) {
        int n = maze.size();
        vector<string> ans;
        string move = "";
        vector<vector<int>> vis(n, vector<int>(n, 0));

        if(maze[0][0] == 1)
            find(0, 0, maze, n, move, ans, vis);

        return ans;
    }
};

```

---

## ✅ Solution 2: Optimized Backtracking (With Direction Arrays)

```cpp
class Solution {
  public:
    void find(int i, int j, vector<vector<int>>&maze, int n, string move, vector<string> &ans,
              vector<vector<int>> &vis, int di[], int dj[]) {

        if(i == n - 1 && j == n - 1){
            ans.push_back(move);
            return;
        }

        string dir = "DLRU";  // Lexicographical order: Down, Left, Right, Up
        for(int ind = 0; ind < 4; ind++){
            int nexti = i + di[ind];
            int nextj = j + dj[ind];

            if(nexti >= 0 && nexti < n && nextj >= 0 && nextj < n &&
               maze[nexti][nextj] == 1 && vis[nexti][nextj] == 0){

                vis[i][j] = 1;
                find(nexti, nextj, maze, n, move + dir[ind], ans, vis, di, dj);
                vis[i][j] = 0;
            }
        }
    }

    vector<string> ratInMaze(vector<vector<int>>& maze) {
        int n = maze.size();
        vector<string> ans;
        string move = "";

        int di[] = {+1, 0, 0, -1}; // Down, Left, Right, Up
        int dj[] = {0, -1, +1, 0};
        vector<vector<int>> vis(n, vector<int>(n, 0));

        if(maze[0][0] == 1)
            find(0, 0, maze, n, move, ans, vis, di, dj);

        return ans;
    }
};

```

---

## 📝 Revision Notes

### ✅ Problem: Rat in a Maze – Print All Paths (Backtracking)

---

### 📝 How It Works

- A rat starts at `(0,0)` in an `n x n` grid and must reach `(n-1, n-1)` by moving through **1s** (open path).
- It can move in 4 directions: **Down, Left, Right, Up** — only within grid bounds and unvisited cells.
- We use **recursive backtracking** to explore all valid paths.
- At every step:
    1. If the destination is reached, add the path to result.
    2. Otherwise, mark the cell as visited, explore all 4 directions recursively, then unmark (backtrack).

---

### 🧩 Key Recurrence

```cpp
find(i, j) = try all (i + di[k], j + dj[k]) for k in 0 to 3

```

---

### ⏱️ Time & Space Complexity

### 🔸 Time Complexity: **O(4^(N²))**

- Each cell has up to 4 directions to explore.
- In the worst case, rat may visit each cell only once in each path.
- So maximum number of calls ≈ `4^(N*N)`.

### 🔸 Space Complexity: **O(N²)**

- `O(N²)` for the visited matrix.
- Recursion stack can also go as deep as `N²`.

---

### ⚠️ Edge Cases

- `maze[0][0] == 0` or `maze[n-1][n-1] == 0` → No path exists.
- Blocked cells (`0`s) must be avoided.
- Multiple paths → we ensure lexicographical order using `"DLRU"`.

---

### 💡 Other Approaches

| Approach | Use Case | Time |
| --- | --- | --- |
| DFS with Visited Matrix ✅ | All paths | O(4^N²) |
| BFS | Shortest Path only | O(N²) |
| DFS without extra vis[][] | Mark `maze[i][j] = -1` | Less clean |

---

### 🔁 Related Problems

- Leetcode 79 – Word Search
- Leetcode 200 – Number of Islands
- GFG – Maze with Obstacles
- Leetcode 130 – Surrounded Regions

---