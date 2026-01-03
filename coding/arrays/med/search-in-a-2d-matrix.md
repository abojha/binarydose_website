---
title: Search in a 2D Matrix
description: ""
tags:
  - array
  - med
---

### Problem Statement:

You are given an `m x n` integer matrix `matrix` with the following two properties:

- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` *if* `target` *is in* `matrix` *or* `false` *otherwise*.

You must write a solution in `O(log(m * n))` time complexity.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)
    
    ```
    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
    Output: true
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg)
    
    ```
    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
    Output: false
    ```
    

---

## Solution: Binary Search (Row + In-Row)

```cpp
class Solution {
public:
    // Binary search within a single sorted row
    bool binarySearchRow(const vector<int>& row, int target) {
        int l = 0, r = (int)row.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2; // avoid overflow
            if (row[mid] == target) return true;
            if (row[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }

    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = (int)matrix.size();
        if (n == 0) return false;
        int m = (int)matrix[0].size();
        if (m == 0) return false;

        int low = 0, high = n - 1;

        // Binary search on rows using first/last elements as guards
        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If target cannot be in this row by range, move up/down
            if (target < matrix[mid][0]) {
                high = mid - 1;
            } else if (target > matrix[mid][m - 1]) {
                low = mid + 1;
            } else {
                // Target could be in this row — search inside the row once
                return binarySearchRow(matrix[mid], target);
            }
        }
        return false;
    }
};

```

---

## 📝 How It Works

- The matrix is sorted such that each row is non-decreasing and the **first element of a row is greater than the last element of the previous row** (LeetCode 74 property).
- We first **binary search over rows**:
    - Compare `target` with the **first** and **last** elements of `matrix[mid]` to decide if the target could lie in this row.
    - If `target` is outside the row’s range, move `low`/`high` accordingly.
- Once we find a candidate row where `matrix[mid][0] ≤ target ≤ matrix[mid][m-1]`, we run a **standard binary search inside that row**.
- This limits the inner search to **one row** at most, keeping the total work tight.

*(Analogy: You’re looking for a book in a library arranged by ranges of titles per shelf (rows). First pick the correct shelf by checking its label range, then scan that shelf only.)*

---

## 🧩 Key Formula / Transition

- Row selection invariant:
    - If `target < matrix[mid][0]` → search upper half (rows before `mid`)
    - If `target > matrix[mid][m-1]` → search lower half (rows after `mid`)
    - Else → target can only be in this row → binary search within that row

---

## ⏱️ Time & Space Complexity

- **Time:** `O(log n + log m)`
    
    (binary search over `n` rows, then one binary search over `m` columns)
    
- **Space:** `O(1)`
    
    (no extra data structures; pass rows by `const&`)
    

> Note: Your original code called binarySearch on the mid row in every row-iteration, leading to worst-case O(log n * log m) checks. Guarding with first/last narrows it to a single in-row search.
> 

---

## ⚠️ Edge Cases

- Empty matrix (`n == 0`) or empty row (`m == 0`).
- Single row / single column matrices.
- Targets smaller than `matrix[0][0]` or larger than `matrix[n-1][m-1]`.
- Potential integer overflow when computing `mid` → use `low + (high - low) / 2`.

---

## 💡 Other Approaches

1. **Flattened Single Binary Search (Most Elegant) – `O(log(n*m))`, `O(1)`**
    - Treat the matrix as a 1D sorted array:
    - Map `k → (row = k / m, col = k % m)`.
    
    ```cpp
    class Solution {
    public:
        bool searchMatrix(vector<vector<int>>& matrix, int target) {
            int n = matrix.size();
            if (n == 0) return false;
            int m = matrix[0].size();
            if (m == 0) return false;
    
            int l = 0, r = n * m - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                int row = mid / m, col = mid % m;
                int val = matrix[row][col];
    
                if (val == target) return true;
                if (val < target) l = mid + 1;
                else r = mid - 1;
            }
            return false;
        }
    };
    
    ```
    
2. **Row-wise Linear Scan + In-row Binary Search – `O(n + log m)`**
    - Scan rows to find the candidate row, then binary search in it. Simpler but worse in the worst case.

---

## 🔁 Related Problems

- LeetCode 240: **Search a 2D Matrix II** (row & column sorted; two-pointer from top-right)
- LeetCode 34: **Find First and Last Position of Element in Sorted Array** (binary search variants)
- LeetCode 35: **Search Insert Position** (basic binary search pattern)