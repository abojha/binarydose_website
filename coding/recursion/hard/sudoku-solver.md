---
title: Sudoku Solver
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

1. Each of the digits `1-9` must occur exactly once in each row.
2. Each of the digits `1-9` must occur exactly once in each column.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `'.'` character indicates empty cells.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Backtracking

```cpp
class Solution {
public:

    // Check if placing 'c' at (row, col) is valid
    bool isValid(vector<vector<char>> &board, int row, int col, char c){
        for(int i = 0; i < 9; i++){
            // Check current column
            if(board[i][col] == c) return false;

            // Check current row
            if(board[row][i] == c) return false;

            // Check 3x3 sub-box
            if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c)
                return false;
        }
        return true;
    }

    // Recursive backtracking to solve Sudoku
    bool solve(vector<vector<char>>& board) {
        for(int i = 0; i < board.size(); i++){
            for(int j = 0; j < board[0].size(); j++){
                if(board[i][j] == '.'){ // Find empty cell
                    for(char c = '1'; c <= '9'; c++){
                        if(isValid(board, i, j, c)){
                            board[i][j] = c; // Place number
                            if(solve(board)) return true;
                            board[i][j] = '.'; // Backtrack
                        }
                    }
                    return false; // No valid digit found
                }
            }
        }
        return true; // Solved
    }

    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};

```

---

## 📝 Revision Notes – Sudoku Solver (Backtracking)

---

### ✅ How It Works

- You are given a 9×9 partially filled Sudoku board.
- The goal is to fill all the empty cells (marked with '.') such that:
    - Each row, each column, and each 3x3 sub-box contains digits **1 to 9 exactly once**.
- We use **recursive backtracking**:
    - For each empty cell, try digits `1-9`.
    - For each digit, check if it’s **valid** using `isValid`.
    - If valid, place it and recurse.
    - If stuck later, backtrack by resetting to `'.'`.

---

### 🧩 Key Formula / Recurrence

There is no traditional recurrence relation here, but the recursive structure is:

```
For each cell:
    If empty:
        Try placing '1' to '9'
            If valid:
                Place and recurse
                If fails, backtrack

```

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(9^(n)) where n is the number of empty cells – worst-case exponential |
| **Space** | O(1) extra (in-place) + recursion stack depth O(n) |

> ⚠️ In practice, due to constraints and early pruning via isValid, it works efficiently.
> 

---

### ⚠️ Edge Cases

- Already completed board → returns immediately.
- Multiple solutions exist → finds the **first valid** one due to early return.
- Invalid input → assumed to not occur per constraints.

---

### 💡 Other Approaches

| Approach | Time | Description |
| --- | --- | --- |
| Constraint Propagation + Backtracking | Faster in practice | Use bitmasks, sets to prune candidates |
| Dancing Links (DLX) | Very Fast | Advanced algorithm using linked lists for exact cover problems |
| AI with CSP (Constraint Satisfaction Problem) | ✨ | Used in AI, not necessary for this case |

---

### 🔁 Related Problems

- Leetcode 37 – Sudoku Solver (this one)
- Leetcode 36 – Valid Sudoku
- Leetcode 2661 – First Completely Filled Row/Column
- N-Queens – Similar grid-based backtracking
- Word Search – Recursive cell path search

---