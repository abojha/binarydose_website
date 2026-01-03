---
title: Surrounded Region (DFS)
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - hard
---

### Problem Statement:

You are given an `m x n` matrix `board` containing **letters** `'X'` and `'O'`, **capture regions** that are **surrounded**:

- **Connect**: A cell is connected to adjacent cells horizontally or vertically.
- **Region**: To form a region **connect every** `'O'` cell.
- **Surround**: The region is surrounded with `'X'` cells if you can **connect the region** with `'X'` cells and none of the region cells are on the edge of the `board`.

To capture a **surrounded region**, replace all `'O'`s with `'X'`s **in-place** within the original board. You do not need to return anything.

**Example 1:**

**Input:** board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

**Output:** [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

**Explanation:**

![](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

**Example 2:**

**Input:** board = [["X"]]

**Output:** [["X"]]

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: DFS (Depth-First Search)

```cpp
class Solution {
public:
    // Perform DFS to mark all 'O's connected to boundary 'O's
    void dfs(int x, int y, int n, int m, vector<vector<int>> &visited, int dx[], int dy[], vector<vector<char>> &board) {
        visited[x][y] = 1;

        for (int i = 0; i < 4; i++) {
            int newX = x + dx[i];
            int newY = y + dy[i];

            // Check bounds and if the cell is unvisited and has 'O'
            if (newX >= 0 && newX < n && newY >= 0 && newY < m &&
                !visited[newX][newY] && board[newX][newY] == 'O') {
                dfs(newX, newY, n, m, visited, dx, dy, board);
            }
        }
    }

    void solve(vector<vector<char>>& board) {
        int n = board.size();
        int m = board[0].size();

        vector<vector<int>> visited(n, vector<int>(m, 0));
        int dx[4] = {0, 0, 1, -1};
        int dy[4] = {1, -1, 0, 0};

        // Check first and last row
        for (int j = 0; j < m; j++) {
            if (!visited[0][j] && board[0][j] == 'O') {
                dfs(0, j, n, m, visited, dx, dy, board);
            }
            if (!visited[n - 1][j] && board[n - 1][j] == 'O') {
                dfs(n - 1, j, n, m, visited, dx, dy, board);
            }
        }

        // Check first and last column
        for (int i = 0; i < n; i++) {
            if (!visited[i][0] && board[i][0] == 'O') {
                dfs(i, 0, n, m, visited, dx, dy, board);
            }
            if (!visited[i][m - 1] && board[i][m - 1] == 'O') {
                dfs(i, m - 1, n, m, visited, dx, dy, board);
            }
        }

        // Flip all unvisited 'O's to 'X'
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!visited[i][j] && board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
            }
        }
    }
};

```

---

## 📝 How It Works

- This is the "Surrounded Regions" problem where we want to flip all 'O's that are **not connected to boundary 'O's** into 'X's.
- We:
    1. Use DFS starting from all boundary 'O's to mark connected 'O's as visited.
    2. Traverse the entire board again and convert all unvisited 'O's to 'X'.
- **Important Note**:
    
    The original code had this subtle bug:
    
    `vector<vector<char>> board` was passed **by value** to DFS.
    
    This means updates in DFS didn’t reflect back.
    
    It must be `vector<vector<char>> &board` (by reference).
    

---

## 🧩 Key Formula / Recurrence

- No classic recurrence. It’s a plain DFS grid traversal.
- Recurrence relationship for DFS:
    
    `dfs(x, y) = dfs(x+1, y) + dfs(x-1, y) + dfs(x, y+1) + dfs(x, y-1)`
    

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N × M) — Every cell is visited at most once |
| Space | O(N × M) — For visited matrix and call stack in worst case (recursion depth) |

---

## ⚠️ Edge Cases

- Empty board or `board.size() == 0`.
- All cells are 'X'.
- All cells are 'O' but on the boundary only (shouldn’t flip anything).
- Single row or single column grids.

---

## 💡 Other Approaches

- **BFS instead of DFS** — Similar logic, just use a queue.
- **In-place marking using temporary character** — Instead of extra `visited` array, temporarily mark boundary-connected 'O's with something like `'#'`, then revert them later.

---

## 🔁 Related Problems

- LeetCode 200: Number of Islands
- LeetCode 695: Max Area of Island
- LeetCode 130: Surrounded Regions (exact same problem)
- LeetCode 417: Pacific Atlantic Water Flow

---

## 🛠️ Other Notes

- Real-world analogy:
    
    Think of 'O' as water and 'X' as land.
    
    We want to drain ponds that are not touching the sea (boundary).
    
- Always prefer passing large structures like `vector<vector<>>` by reference to avoid unnecessary copying in DFS or BFS problems.