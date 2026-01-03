---
title: N Queens
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

 The n-queens is the problem of placing n queens on n × n chessboard such that no two queens can attack each other. Given an integer n, return all distinct solutions to the n -queens puzzle. Each solution contains a distinct boards configuration of the queen's placement, where ‘Q’ and ‘.’ indicate queen and empty space respectively.

- Example:
    
    ```
    Input: n = 4
    
    Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
    ```
    

---

---

### ✅ Solution 1: Optimized Backtracking using Hashing (O(1) Safety Check)

```cpp
class Solution {
public:
    void solve(int col, int n, vector<string> &board, vector<vector<string>> &ans,
               vector<int> &left, vector<int> &lowerDig, vector<int> &upperDig) {

        if(col == n){
            ans.push_back(board);
            return;
        }

        for(int row = 0; row < n; row++){
            // Check if position is safe using O(1) lookup
            if(left[row] == 0 && lowerDig[row + col] == 0 && upperDig[n - 1 + col - row] == 0){
                board[row][col] = 'Q';
                left[row] = 1;
                lowerDig[row + col] = 1;
                upperDig[n - 1 + col - row] = 1;

                solve(col + 1, n, board, ans, left, lowerDig, upperDig);

                board[row][col] = '.';
                left[row] = 0;
                lowerDig[row + col] = 0;
                upperDig[n - 1 + col - row] = 0;
            }
        }
    }

    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        vector<string> board(n, string(n, '.'));

        vector<int> left(n, 0), lowerDiagonal(2 * n - 1, 0), upperDiagonal(2 * n - 1, 0);

        solve(0, n, board, ans, left, lowerDiagonal, upperDiagonal);
        return ans;
    }
};

```

---

### ✅ Solution 2: Brute Force Backtracking (Using Safe Check Function)

```cpp
class Solution {
public:
    bool safe(int row, int col, vector<string> &board){
        int n = board.size();

        // Check upper-left diagonal
        for(int i = row, j = col; i >= 0 && j >= 0; i--, j--){
            if(board[i][j] == 'Q') return false;
        }

        // Check left row
        for(int j = col; j >= 0; j--){
            if(board[row][j] == 'Q') return false;
        }

        // Check lower-left diagonal
        for(int i = row, j = col; i < n && j >= 0; i++, j--){
            if(board[i][j] == 'Q') return false;
        }

        return true;
    }

    void solve(int col, int n, vector<string> &board, vector<vector<string>> &ans){
        if(col == n){
            ans.push_back(board);
            return;
        }

        for(int row = 0; row < n; row++){
            if(safe(row, col, board)){
                board[row][col] = 'Q';
                solve(col + 1, n, board, ans);
                board[row][col] = '.';
            }
        }
    }

    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        vector<string> board(n, string(n, '.'));
        solve(0, n, board, ans);
        return ans;
    }
};

```

---

## 📝 Revision Notes

### ✅ Problem: N-Queens – Backtracking

---

### 📝 How It Works

- Goal: Place `n` queens on an `n×n` board such that no two queens attack each other.
- The recursive function `solve(col, ...)`:
    - Tries placing a queen in each row of current column `col`.
    - If valid (no conflict), it places the queen and recurses to the next column.
    - On return (backtrack), it removes the queen and tries the next row.
- Termination: when `col == n`, it means all queens are placed safely.

### In **Optimized Version**:

- Instead of checking rows and diagonals using loops, we use **3 hash arrays**:
    - `left[row]` → for row checks
    - `lowerDiagonal[row + col]` → for lower diagonal ()
    - `upperDiagonal[n - 1 + col - row]` → for upper diagonal (/)

---

### 🧩 Key Formula

- Diagonal Indexing:
    - **Lower Diagonal (\)**: `row + col`
    - **Upper Diagonal (/)**: `n - 1 + col - row`

---

### ⏱️ Time & Space Complexity

| Metric | Brute Force | Optimized |
| --- | --- | --- |
| **Time** | O(N!) × O(N) – due to `safe()` checking O(N) per position | O(N!) – constant time (O(1)) check |
| **Space** | O(N²) recursion + board | O(N²) board + O(N) hash arrays |
- `O(N!)` – total valid configurations tried
- In brute force, each safety check takes O(N) time → adds extra factor

---

### ⚠️ Edge Cases

- `n = 1` → only 1 cell, place the queen
- `n = 2` or `n = 3` → no solutions, returns empty list

---

### 💡 Other Approaches

| Approach | Time Complexity | Description |
| --- | --- | --- |
| Brute Force + Safe Check | O(N! × N) | Simple, but slow due to scanning |
| Optimized Backtracking | O(N!) | Uses hash arrays to check constraints in O(1) |

---

### 🔁 Related Problems

- Leetcode 51: N-Queens ✅
- Leetcode 52: N-Queens II (Count only)
- Leetcode 37: Sudoku Solver (similar backtracking)
- Leetcode 36: Valid Sudoku (constraint validation)

---