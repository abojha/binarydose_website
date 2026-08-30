---
title: Median in a row-wise sorted Matrix
description: ""
tags:
  - binary-search
  - hard
---

### Problem Statement:

Given a **row-wise sorted** matrix **mat[][]** of size n*m, where the number of rows and columns is always **odd**. Return the **median** of the matrix.

- Example:
    
    **Examples:**
    
    ```
    Input: mat[][] = [[1, 3, 5],
                    [2, 6, 9],
                    [3, 6, 9]]
    Output: 5
    Explanation: Sorting matrix elements gives us [1, 2, 3, 3, 5, 6, 6, 9, 9]. Hence, 5 is median.
    
    ```
    
    ```
    Input:mat[][] = [[2, 4, 9],
                    [3, 6, 7],
                    [4, 7, 10]]
    Output:6
    Explanation: Sorting matrix elements gives us [2, 3, 4, 4, 6, 7, 7, 9, 10]. Hence, 6 is median.
    ```
    
    ```
    Input:mat = [[3], [4], [8]]
    Output:4
    Explanation: Sorting matrix elements gives us [3, 4, 8]. Hence, 4 is median.
    ```
    

---

## Solution: Binary Search on Answer

```cpp
class Solution {
  public:
    int median(vector<vector<int>> &mat) {
        int n = mat.size();
        int m = mat[0].size();

        // Find min element (first col elements) and max element (last col elements)
        int minVal = INT_MAX, maxVal = INT_MIN;
        for(int i = 0; i < n; i++){
            minVal = min(mat[i][0], minVal);
            maxVal = max(mat[i][m-1], maxVal);
        }

        // Median will be the (n*m + 1)/2-th element (1-based indexing)
        int desired = (n * m + 1) / 2;

        int low = minVal, high = maxVal;
        while(low < high){
            int mid = low + (high - low) / 2;

            // Count elements <= mid using upper_bound in each row
            int placed = 0;
            for(int i = 0; i < n; i++){
                placed += upper_bound(mat[i].begin(), mat[i].end(), mid) - mat[i].begin();
            }

            // If count is less than desired, go right (increase low)
            if(placed < desired)
                low = mid + 1;
            else
                high = mid;
        }

        return low; // low = median at the end
    }
};

```

---

## 📝 How It Works

- Each row of the matrix is **sorted**.
- The median is the element at position `(n*m + 1)/2` in the flattened sorted array.
- Instead of merging rows, we **binary search on the value range** (`minVal` to `maxVal`).
- For a guessed `mid`, count how many elements are `<= mid` using `upper_bound` (binary search in each row).
- If count is **less than desired position**, move right (`low = mid+1`), else move left.
- Eventually `low` converges to the **median**.

---

## 🧩 Key Formula / Recurrence

- Desired position:
    $$
    \text{desired} = \frac{n \times m + 1}{2}
    $$
    
- Transition during binary search:
    - If `count(mid) < desired` → `low = mid + 1`
    - Else → `high = mid`

---

## ⏱️ Time & Space Complexity

- **Counting step per mid:** $O(n \cdot \log m)$ (`upper_bound` in each row).
- **Binary search range:** $O(\log(\text{maxVal} - \text{minVal}))$.
- **Total:**
    $$
    O(n \cdot \log m \cdot \log(\text{maxVal} - \text{minVal}))
    $$
    
- Space: **O(1)** (no extra structures).

---

## ⚠️ Edge Cases

- Matrix with **1 row or 1 column**.
- All elements same (minVal == maxVal → median is that element).
- Large numbers in rows (watch for overflow in `(low+high)/2`).

---

## 💡 Other Approaches

1. **Flatten & Sort**: O(n*m log(n*m)) time, O(n*m) space ❌ (not efficient).
2. **Heap approach**: Keep min-heap of row pointers → O(n log n + k log n) but more complex.
3. **Binary Search on Value (this solution)** ✅ Best for row-wise sorted matrix.

---

## 🔁 Related Problems

- Median of Two Sorted Arrays (LeetCode 4)
- Kth Smallest Element in a Sorted Matrix (LeetCode 378)
- Search a 2D Matrix II (LeetCode 240)

---