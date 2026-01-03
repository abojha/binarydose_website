---
title: Rotate Image by 90 degree
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given a matrix, your task is to rotate the matrix 90 degrees clockwise.

- Example:
    
    ```
    Example 1:
    
    Input: [[1,2,3],[4,5,6],[7,8,9]]
    
    Output: [[7,4,1],[8,5,2],[9,6,3]]
    
    Explanation: Rotate the matrix simply by 90 degree clockwise and return the matrix.
    
    Example 2:
    
    Input: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
    
    Output:[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
    
    Explanation: Rotate the matrix simply by 90 degree clockwise and return the matrix
    ```
    

---

---

## ✅ Solution: In-Place Matrix Rotation using Transpose + Reverse

```cpp
void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();

    // Step 1: Transpose the matrix (i.e., convert rows to columns)
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            swap(matrix[i][j], matrix[j][i]);  // swap across diagonal
        }
    }

    // Step 2: Reverse each row (to get 90-degree clockwise rotation)
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

```

---

### 📝 How It Works

1. **Transpose the matrix**: This turns rows into columns and vice versa. It’s done by swapping the element at `(i, j)` with `(j, i)` for all `i > j` (to avoid double-swapping).
2. **Reverse each row**: Once the matrix is transposed, reversing each row gives the final 90-degree clockwise rotated matrix.

🔁 This works **in-place**, meaning no extra space is used.

---

### 🧩 Key Formula / Recurrence

- No recurrence relation here. It uses **matrix transposition + row reversal**:
    - `matrix[i][j] <-> matrix[j][i]` → transpose
    - `reverse(matrix[i])` → reverse each row

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N²) |
| Space | O(1) |
- Every element is visited twice: once in transpose, once in reversal.
- In-place swaps = **constant space**.

---

### ⚠️ Edge Cases

- **1x1 matrix** → nothing changes.
- **Non-square matrices** → not allowed. Problem assumes **NxN matrix**.

---

### 💡 Other Approaches

| Approach | Time | Space | Note |
| --- | --- | --- | --- |
| Using extra matrix | O(N²) | O(N²) | Copy and set `new[j][N-1-i] = old[i][j]` |
| In-place using layers | O(N²) | O(1) | Rotate four elements at a time in concentric squares |

---

### 🔁 Related Problems

- [LC 48. Rotate Image](https://leetcode.com/problems/rotate-image/)
- [LC 73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- [LC 54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- [LC 289. Game of Life](https://leetcode.com/problems/game-of-life/)

---

### 🛠️ Other Notes

- **Real-world analogy**: Think of rotating a photograph clockwise—first, you flip it diagonally (transpose), then turn it side-to-side (reverse rows).
- Very commonly asked in interviews for FAANG and product companies.
- Ensure to validate that the input is **square** if constraints are not guaranteed.