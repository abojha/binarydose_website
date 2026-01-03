---
title: Maximal Rectangle
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - squares
---

### Problem Statement:

Given a `rows x cols` binary `matrix` filled with `0`'s and `1`'s, find the largest rectangle containing only `1`'s and return *its area*.

- Example:
    
    ```
    Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
    Output: 6
    Explanation: The maximal rectangle is shown in the above picture.
    ```
    

---

---

## ✅ Solution: Stack-Based Histogram Extension (2D to 1D)

```cpp
class Solution {
public:

    // Solves Largest Rectangle in Histogram for a single row
    int solve(vector<int> &heights){
        stack<int> st;
        int n = heights.size();
        int maxHeight = INT_MIN;

        for(int i = 0; i <= n; i++){
            // Ensure the stack is increasing
            while(!st.empty() && (i == n || heights[st.top()] >= heights[i])){
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxHeight = max(maxHeight, height * width);
            }
            st.push(i);
        }
        return maxHeight;
    }

    int maximalRectangle(vector<vector<char>>& matrix) {
        int row = matrix.size();
        int col = matrix[0].size();

        // Convert matrix into histogram-like height matrix
        vector<vector<int>> dp(row, vector<int>(col, 0));

        for(int i = 0; i < col; i++){
            int sum = 0;
            for(int j = 0; j < row; j++){
                sum += matrix[j][i] - '0';

                // Reset on 0
                if(matrix[j][i] - '0' == 0){
                    sum = 0;
                }
                dp[j][i] = sum;
            }
        }

        int maxArea = INT_MIN;

        // Compute largest rectangle in each histogram row
        for(int i = 0; i < row; i++){
            maxArea = max(maxArea, solve(dp[i]));
        }

        return maxArea;
    }
};

```

---

## 📝 How It Works

- This problem **extends "Largest Rectangle in Histogram"** to a 2D matrix.
- First, convert each row of the matrix into a **histogram of heights** by counting the number of consecutive 1’s above it.
- Then, treat each row like a 1D histogram and apply the **largest rectangle in histogram** algorithm using a **monotonic stack**.
- For each row:
    - Increase height by 1 if current cell is `'1'`
    - Reset to 0 if current cell is `'0'`
- Track the **maximum area** among all rows.

---

## 🧩 Key Insight

For each row, you're solving:

```
Area = height[i] * width

```

Where `width` is the number of consecutive columns that support `height[i]` as the minimum height in that subarray.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N * M) for histogram + O(M) stack = **O(N * M)** |
| Space | O(M) for histogram row + O(M) stack = **O(M)** |

Where N = rows, M = columns.

---

## ⚠️ Edge Cases

- Empty matrix → return 0
- All 1s → one big rectangle
- All 0s → return 0
- Single row/column → reduces to histogram problem

---

## 💡 Other Approaches

| Approach | Time | Comment |
| --- | --- | --- |
| Brute Force (O(N⁴)) | TLE ❌ | Too slow |
| Histogram + Stack (current) | O(N * M) ✅ | Most efficient |

---

## 🔁 Related Problems

- [Leetcode 84 – Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- [Leetcode 85 – Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- [Leetcode 221 – Maximal Square](https://leetcode.com/problems/maximal-square/)

---