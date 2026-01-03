---
title: Word Search
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an `m x n` grid of characters `board` and a string `word`, return `true` *if* `word` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

- Example:
    
    ```
    Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
    Output: true
    ```
    

---

### ✅ Solution: Backtracking (DFS on Grid)

```cpp
class Solution {
public:
    // Recursive DFS to match characters in all 4 directions
    bool searchNext(vector<vector<char>> &board, string word, int row, int col, int index, int m, int n){
        if(index == word.length()) return true;

        // Out of bounds or mismatch or visited cell
        if(row < 0 || col < 0 || row >= m || col >= n || board[row][col] != word[index] || board[row][col] == '!'){
            return false;
        }

        char c = board[row][col];      // Save the current character
        board[row][col] = '!';         // Mark as visited

        // Explore in all four directions
        bool up    = searchNext(board, word, row - 1, col, index + 1, m, n);
        bool down  = searchNext(board, word, row + 1, col, index + 1, m, n);
        bool left  = searchNext(board, word, row, col - 1, index + 1, m, n);
        bool right = searchNext(board, word, row, col + 1, index + 1, m, n);

        board[row][col] = c;  // Unmark (Backtrack)
        return up || down || left || right;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();

        // Try every cell as a starting point
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                if(board[i][j] == word[0]){
                    if(searchNext(board, word, i, j, 0, m, n))
                        return true;
                }
            }
        }
        return false;
    }
};

```

---

### 📝 How It Works

- We're given a 2D grid `board` and a string `word`.
- The goal is to check whether `word` can be formed by **starting from any cell** and **moving up, down, left, or right** without revisiting any cell.
- The `searchNext` function is a DFS that:
    1. Checks base case: if `index == word.length()` → word is matched.
    2. Bounds check and visited check (`board[row][col] == '!'`).
    3. Temporarily marks current cell as visited by setting it to `'!'`.
    4. Tries all 4 directions recursively.
    5. Backtracks by restoring the cell's original character.

---

### 🧩 Key Formula / Recurrence

```
searchNext(row, col, index) =
    searchNext(row + 1, col, index + 1) ||
    searchNext(row - 1, col, index + 1) ||
    searchNext(row, col + 1, index + 1) ||
    searchNext(row, col - 1, index + 1)

```

---

### ⏱️ Time & Space Complexity

### 🔸 Time Complexity: **O(M × N × 4^L)**

Where:

- `M` = number of rows in the board
- `N` = number of columns
- `L` = length of the `word`

**Explanation:**

- You try starting from **every cell** → `M × N` calls.
- For each call, you may explore up to 4 directions (up/down/left/right).
- In the worst case, from each step you explore 4 more paths → up to `4^L` recursive calls per path.

✅ **Total worst-case time = `O(M × N × 4^L)`**

---

### 🔸 Space Complexity: **O(L)**

**Why?**

- The recursion depth is equal to `L` (the word length), as each recursive call adds 1 letter.
- We do **in-place marking** (`board[row][col] = '!'`) to avoid using extra space for a visited matrix.

✅ **Total space = O(L)** for the call stack

---

### ⚠️ Edge Cases

- Empty grid or empty word → return `false`
- Word longer than total grid cells → can't be matched
- Grid with same repeating letters → handled via visited marking

---

### 💡 Other Approaches

| Approach | Time | Use Case |
| --- | --- | --- |
| Trie + DFS (Word Search II) | O(M × N × L × 4^L) | Optimized for multiple word queries |
| Iterative DFS/BFS | Similar | Harder to implement due to visited tracking |

---

### 🔁 Related Problems

- **Leetcode 79. Word Search** ✅ (this one)
- **Leetcode 212. Word Search II** 🔥 (uses Trie)
- **Leetcode 200. Number of Islands**
- **Leetcode 694. Number of Distinct Islands**

Let me know if you want the optimized Trie-based version for multiple word searches (`Leetcode 212`)!