---
title: Largest Rectangle in Histogram
description: ""
tags:
  - hard
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return *the area of the largest rectangle in the histogram*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg)

```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg)

```
Input: heights = [2,4]
Output: 4
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Monotonic Stack — Largest Rectangle in Histogram

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
};

```

---

## 📝 How It Works

- **Goal:** Find the largest rectangular area in a histogram.
- **Technique:**
    
    Use a monotonic increasing stack to keep track of bar indices.
    
- **Step-by-Step:**
    1. Traverse from left to right.
    2. When the current bar is **lower** than the bar at the stack's top, we pop from the stack.
    3. For each popped bar, calculate the width:
        - If stack is empty → width = `i` (from beginning to `i - 1`).
        - Otherwise → width = `i - st.top() - 1` (between two smaller bars).
    4. Update `maxArea` using `height * width`.
    5. Push the current index onto the stack.
- **Why `i == n` loop condition:**
    
    We need one extra iteration to flush out remaining bars in the stack after processing all indices.
    

---

## 🧩 Key Formula

For each popped bar `height = heights[st.top()]`:

- `width = (st.empty() ? i : i - st.top() - 1)`
- `area = height * width`
- `maxArea = max(maxArea, area)`

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Stack | O(N) | O(N) |
- Every bar is pushed and popped at most once.

---

## ⚠️ Edge Cases

- All bars of same height.
- Increasing heights (e.g., `[1, 2, 3, 4, 5]`).
- Decreasing heights (e.g., `[5, 4, 3, 2, 1]`).
- Single bar → Area is just height itself.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Check all rectangles for each height. Too slow for large N. |
| Divide & Conquer | O(N log N) | Recursive max-min partitioning approach. Harder to implement. |

---

## 🔁 Related Problems

- LeetCode 84: Largest Rectangle in Histogram (Exact Problem)
- LeetCode 85: Maximal Rectangle
- LeetCode 42: Trapping Rain Water
- LeetCode 907: Sum of Subarray Minimums

---

## 🛠️ Other Notes

- ✅ This is a classic **monotonic stack** template.
- ✅ Real-world analogy:
    
    Finding the largest rectangular billboard possible along a skyline of buildings.
    
- ✅ Remember: Always push indices instead of values to calculate widths properly!