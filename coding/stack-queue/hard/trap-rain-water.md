---
title: Trap Rain Water
description: ""
tags:
  - hard
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

```

**Example 2:**

```
Input: height = [4,2,0,3,2,5]
Output: 9
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Two-Pointer (Space Optimized)

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int res = 0;

        while (left <= right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    res += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    res += rightMax - height[right];
                }
                right--;
            }
        }
        return res;
    }
};

```

---

## ✅ Solution: Prefix-Suffix Arrays (Tabulation)

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;

        vector<int> leftMax(n), rightMax(n);

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = max(rightMax[i + 1], height[i]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res += min(leftMax[i], rightMax[i]) - height[i];
        }

        return res;
    }
};

```

---

## ✅ Solution: Brute Force (Naive)

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int leftMax = height[i];
            for (int j = 0; j <= i; j++) {
                leftMax = max(leftMax, height[j]);
            }

            int rightMax = height[i];
            for (int j = i; j < n; j++) {
                rightMax = max(rightMax, height[j]);
            }

            res += min(leftMax, rightMax) - height[i];
        }

        return res;
    }
};

```

---

## 📝 How It Works

- This is the classic **Trapping Rain Water** problem.
- For each bar, the water it can trap is determined by:
    
    ```
    min(max height to its left, max height to its right) - height of the bar
    
    ```
    
- **Three Approaches:**
1. **Brute Force:**
    
    For each index, scan both left and right to find max heights.
    
2. **Prefix-Suffix Arrays:**
    
    Precompute `leftMax[i]` and `rightMax[i]` for all `i`.
    
    This avoids redundant max searches.
    
3. **Two-Pointer:**
    
    Optimizes both time and space.
    
    We maintain two pointers and update `leftMax` and `rightMax` on the fly.
    
    If `height[left] <= height[right]`, we process `left`.
    
    Otherwise, we process `right`.
    

---

## 🧩 Key Formula / Recurrence

- For each `i`:
    
    `water[i] = min(leftMax[i], rightMax[i]) - height[i]`
    
- Where:
    
    `leftMax[i] = max(height[0..i])`
    
    `rightMax[i] = max(height[i..n-1])`
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Brute Force | O(N²) | O(1) |
| Prefix-Suffix Arrays | O(N) | O(N) |
| Two-Pointer | O(N) | O(1) |

---

## ⚠️ Edge Cases

- Empty array.
- All bars have the same height.
- Bars in strictly increasing or decreasing order.
- Only two bars (cannot trap water).

---

## 💡 Other Approaches

- **Stack-Based Method**: Maintains a stack of indices, using a monotonic stack.
    
    Time: O(N), Space: O(N).
    
    More complex than two-pointers for this problem, so less preferred.
    

---

## 🔁 Related Problems

- LeetCode 11: Container With Most Water
- LeetCode 42: Trapping Rain Water
- LeetCode 407: Trapping Rain Water II
- LeetCode 84: Largest Rectangle in Histogram

---

## 🛠️ Other Notes

- **Real-World Analogy:**
    
    Think of city skylines where water gets trapped between tall buildings after rain.
    
    You only care about the tallest buildings on the left and right sides for each spot.
    
- ✅ Among all approaches, two-pointer is most efficient in practice with **O(N) time and O(1) space**.
- ✅ Prefix-suffix arrays are easier to implement and reason about for beginners.