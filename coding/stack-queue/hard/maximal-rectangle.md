---
title: Maximal Rectangle
description: ""
tags:
  - hard
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given a `rows x cols` binary `matrix` filled with `0`'s and `1`'s, find the largest rectangle containing only `1`'s and return *its area*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg)

```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

```

**Example 2:**

```
Input: matrix = [["0"]]
Output: 0

```

**Example 3:**

```
Input: matrix = [["1"]]
Output: 1

```

**Constraints:**

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Monotonic Stack + Histogram Technique — Maximal Rectangle

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int maxArea = 0;
        stack<int> st;
        int n = heights.size();

        for (int i = 0; i <= n; i++) {
            while (!st.empty() && (i == n || heights[st.top()] >= (i == n ? 0 : heights[i]))) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }

    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;

        int row = matrix.size();
        int col = matrix[0].size();
        vector<int> heights(col, 0);
        int maxArea = 0;

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                // Update histogram heights
                if (matrix[i][j] == '1') {
                    heights[j]++;
                } else {
                    heights[j] = 0;
                }
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }

        return maxArea;
    }
};

```

---

## 📝 How It Works

- **Problem Goal:** Find the largest rectangle containing only 1s in a binary matrix.
- **Approach:**
    - Treat each row as the base of a histogram.
    - Build cumulative heights as we move down row by row.
    - Apply the **Largest Rectangle in Histogram** algorithm on each row.
- **Step-by-Step:**
    1. Initialize a height array with 0s.
    2. For each row:
        - If cell is `'1'`, increment the height at that column.
        - If cell is `'0'`, reset height to 0.
    3. Apply `largestRectangleArea()` on updated `heights` after each row.

---

## 🧩 Key Formula

- For each row, use:
    
    ```
    maxArea = max(maxArea, largestRectangleArea(heights));
    
    ```
    
- Histogram heights:
    
    ```
    heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Histogram + Monotonic Stack | O(N × M) | O(M) |
- Where `N = number of rows`, `M = number of columns`.

---

## ⚠️ Edge Cases

- Empty matrix → Should return `0`.
- All zeros → Max area = `0`.
- All ones → Max area = `row × col`.

---

## 💡 Other Approaches

- **DP Table Approach:** Pre-calculate left/right boundaries per row.
    
    Similar time complexity but requires more memory management.
    
- **Brute Force:** Check all possible rectangles.
    
    Time: O(N² × M²) — not practical for large matrices.
    

---

## 🔁 Related Problems

- LeetCode 85: Maximal Rectangle (Exact Problem)
- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 221: Maximal Square

---

## 🛠️ Other Notes

- ✅ **Real-world analogy:**
    
    Imagine placing books in stacks row by row, and wanting the largest contiguous block of books.
    
- ✅ Histogram-based row-by-row stacking is often used for similar matrix-based maximum area problems.
- ✅ Always handle empty matrix cases before proceeding with core logic.