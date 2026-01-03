---
title: Print the matrix in spiral manner
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given a Matrix, print the given matrix in spiral order.

- Example:
    
    ```
    Example 1:
    Input: Matrix[][] = { { 1, 2, 3, 4 },
    		      { 5, 6, 7, 8 },
    		      { 9, 10, 11, 12 },
    	              { 13, 14, 15, 16 } }
    
    Outhput: 1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10.
    Explanation: The output of matrix in spiral form.
    
    Example 2:
    Input: Matrix[][] = { { 1, 2, 3 },
    	              { 4, 5, 6 },
    		      { 7, 8, 9 } }
    			    
    Output: 1, 2, 3, 6, 9, 8, 7, 4, 5.
    Explanation: The output of matrix in spiral form.
    ```
    

---

---

### Solution:

```cpp
vector<int> spirallyTraverse(vector<vector<int>>& mat) {
    int n = mat.size();
    int m = mat[0].size();
    vector<int> res;

    int top = 0, bottom = n - 1;
    int left = 0, right = m - 1;

    while (top <= bottom && left <= right) {
        // Left to right
        for (int i = left; i <= right; i++) {
            res.push_back(mat[top][i]);
        }
        top++;

        // Top to bottom
        for (int i = top; i <= bottom; i++) {
            res.push_back(mat[i][right]);
        }
        right--;

        // Right to left
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                res.push_back(mat[bottom][i]);
            }
            bottom--;
        }

        // Bottom to top
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                res.push_back(mat[i][left]);
            }
            left++;
        }
    }

    return res;
}

```

---

### 🧠 **How it Works**

- Use four boundaries: `top`, `bottom`, `left`, `right`
- Traverse layer by layer:
    - ➡️ Left to Right on top row
    - ⬇️ Top to Bottom on right column
    - ⬅️ Right to Left on bottom row
    - ⬆️ Bottom to Top on left column
- Shrink boundaries after each direction

---

### ⚠️ **Edge Cases**

- Single row or column → handled via boundary checks
- Matrix with 1x1 or empty → returns as expected
- Always check bounds (`top <= bottom`, `left <= right`) before inner loops

---

### 📉 **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(m × n) (all elements visited once) |
| Space | O(1) extra (excluding result vector) |

---

### 💡 **Other Possible Solutions**

- No better time complexity — this is optimal
- Can be done recursively (for fun or interviews), but not recommended for large inputs

---

### 🔁 **Related Problems**

- LC 54 – Spiral Matrix (exact match)
- LC 59 – Spiral Matrix II (construct spiral)
- Boundary traversal
- Zigzag traversal

---

### 📚 **Concepts Used**

- 2D Boundary Control
- Layered Traversal
- Four Directional Pointers