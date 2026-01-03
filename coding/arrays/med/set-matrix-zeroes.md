---
title: Set Matrix Zeroes
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given a matrix if an element in the matrix is 0 then you will have to set its entire column and row to 0 and then return the matrix.

- Example:
    
    ```
    Examples 1:
    
    Input: matrix=[[1,1,1],[1,0,1],[1,1,1]]
    
    Output: [[1,0,1],[0,0,0],[1,0,1]]
    
    Explanation: Since matrix[2][2]=0.Therfore the 2nd column and 2nd row wil be set to 0.
     
    Input: matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    
    Output:[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    
    Explanation:Since matrix[0][0]=0 and matrix[0][3]=0. Therefore 1st row, 1st column and 4th column will be set to 0
    ```
    

---

---

---

## ✅ Solution: In-Place Matrix Zeroing Using First Row & Column as Markers

```cpp
void setZeroes(vector<vector<int>>& matrix) {
    int rows = matrix.size();
    int cols = matrix[0].size();
    int firstColZero = 1;

    // Step 1: Use first row and column to mark zeroed rows/columns
    for (int i = 0; i < rows; i++) {
        if (matrix[i][0] == 0) firstColZero = 0;
        for (int j = 1; j < cols; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0; // mark row
                matrix[0][j] = 0; // mark column
            }
        }
    }

    // Step 2: Apply markers to the rest of the matrix
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;
        }
    }

    // Step 3: Zero the first row if needed
    if (matrix[0][0] == 0) {
        for (int j = 0; j < cols; j++)
            matrix[0][j] = 0;
    }

    // Step 4: Zero the first column if needed
    if (firstColZero == 0) {
        for (int i = 0; i < rows; i++)
            matrix[i][0] = 0;
    }
}

```

---

## 📝 How It Works

- Problem: If any element in the matrix is 0, **set its entire row and column to 0**.
- To do this in **O(1) space**, we use the **first row and first column as markers**.
- The trick: avoid overwriting marker info by:
    - Separately tracking whether **first column** should be zeroed using a variable (`firstColZero`)
    - Carefully **applying zeroes only after marking is complete**

---

## 🧩 Key Logic

```
- Use matrix[0][j] to mark column j as zero
- Use matrix[i][0] to mark row i as zero
- Track first column separately using `firstColZero`

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(m × n) |
| 🗂 Space | O(1) |
- Single pass for marking and applying
- Constant extra space (no additional matrix or sets used)

---

## ⚠️ Edge Cases

- Zeros in the first row or column → handled with special logic
- Empty matrix → nothing to change
- Entire matrix is 0 → entire matrix becomes 0
- Matrix of size 1×1 → still handled

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Extra row/col flags (arrays) | O(m × n) | O(m + n) | ✅ Easier, uses extra space |
| Brute force with dummy value | O(m² × n²) | O(1) | ❌ Inefficient and tricky |
| Marker in-place (this) | O(m × n) | O(1) | ✅ Optimal solution |

---

## 🔁 Related Problems

- [Leetcode 73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- [Leetcode 289. Game of Life](https://leetcode.com/problems/game-of-life/)
- [Leetcode 36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)