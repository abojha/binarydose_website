---
title: Pascal’s Triangle
description: ""
tags:
  - array
  - med
---

### Problem Statement:

This problem has 3 variations. They are stated below:

**Variation 1:** Given row number r and column number c. Print the element at position (r, c) in Pascal’s triangle.

**Variation 2:** Given the row number n. Print the n-th row of Pascal’s triangle.

**Variation 3:** Given the number of rows n. Print the first n rows of Pascal’s triangle.

- Example:
    
    ```
    Example 1:
    Input Format: N = 5, r = 5, c = 3
    Result: 6 (for variation 1)
    1 4 6 4 1 (for variation 2)
    
    1 
    1 1 
    1 2 1 
    1 3 3 1 
    1 4 6 4 1    (for variation 3)
    
    Explanation: There are 5 rows in the output matrix. Each row is formed using the logic of Pascal’s triangle.
    
    Example 2:
    Input Format: N = 1, r = 1, c = 1
    Result: 1 (for variation 1)
        1 (for variation 2)
        1  (for variation 3)
    Explanation: The output matrix has only 1 row.
    ```
    

---

---

## ✅ Solution: Pascal’s Triangle using Binomial Coefficient (Efficient nCr generation)

```cpp
// Generate a single row of Pascal's Triangle (1-indexed row number)
vector<int> generateRows(int row) {
    int value = 1;
    vector<int> ansRow;
    ansRow.push_back(1);  // First element is always 1

    // Compute next elements using the relation:
    // nCr = nC(r-1) * (n - r + 1) / r
    for (int col = 1; col < row; col++) {
        value = value * (row - col);
        value = value / col;
        ansRow.push_back(value);
    }

    return ansRow;
}

// Generate Pascal’s Triangle up to numRows
vector<vector<int>> generate(int numRows) {
    vector<vector<int>> triangle;
    for (int i = 1; i <= numRows; i++) {
        triangle.push_back(generateRows(i));
    }
    return triangle;
}

```

---

### 📝 How It Works

- We generate each row of Pascal’s Triangle using **binomial coefficients**.
- The value at column `j` in row `i` is **iCj** (i choose j).
- Instead of using factorials, we use the relation:
    
    (nr)=(nr−1)⋅n−r+1r\binom{n}{r} = \binom{n}{r - 1} \cdot \frac{n - r + 1}{r}
    
- This helps compute all values in O(N) time for each row **without overflow** (if done carefully).
- We build each row iteratively and add it to the final 2D vector.

---

### 🧩 Key Formula

- **nCr = nC(r - 1) × (n - r + 1) / r**
- This helps compute each value from the previous one in constant time.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N²) |
| Space | O(N²) (result) |
- Each row takes O(rowNumber) time.
- Total number of elements in Pascal's Triangle up to `n` rows = O(n²).

---

### ⚠️ Edge Cases

- `numRows = 0` → returns empty triangle.
- Be careful with integer overflow in factorials — this method avoids it.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Factorial based nCr | O(N³) | O(N²) | Heavy due to repeated factorials |
| In-place row generation | O(N²) | O(N²) | This solution (efficient and clean) ✅ |
| In-place dynamic buildup | O(N²) | O(N²) | Compute using `triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]` |

---

### 🔁 Related Problems

- [LC 118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)
- [LC 119. Pascal’s Triangle II](https://leetcode.com/problems/pascals-triangle-ii/)
- Compute **nCr mod p** (with Fermat’s Little Theorem)
- Binomial Coefficient Computation in Combinatorics

---

### 🛠️ Other Notes

- Great use case of **combinatorics in dynamic programming**.
- This method is numerically stable and doesn’t overflow like factorial-based versions.
- You can modify it to generate only the kth row in **O(k)** space.