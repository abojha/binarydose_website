---
title: Sum of Subarray Minimum
description: ""
tags:
  - med
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given an array of integers arr, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer **modulo** `109 + 7`.

- Example:
    
    ```
    Example 1:
    
    Input: arr = [3,1,2,4]
    Output: 17
    Explanation: 
    Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
    Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
    Sum is 17.
    Example 2:
    
    Input: arr = [11,81,94,43,3]
    Output: 444
     
    ```
    

---

## ✅ Solution: Monotonic Stack (Next Smaller Element Pattern)

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int MOD = 1e9 + 7;
        int n = arr.size();
        stack<int> s1, s2;
        vector<int> left(n, -1), right(n, n);

        // Find previous smaller elements
        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[i] <= arr[s1.top()]) {
                s1.pop();
            }
            if (!s1.empty()) {
                left[i] = s1.top();
            }
            s1.push(i);
        }

        // Find next smaller elements
        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[i] < arr[s2.top()]) {
                s2.pop();
            }
            if (!s2.empty()) {
                right[i] = s2.top();
            }
            s2.push(i);
        }

        // Calculate result using contribution of each element
        long long result = 0;
        for (int i = 0; i < n; i++) {
            long long count = (long long)(i - left[i]) * (right[i] - i);
            result = (result + arr[i] * count) % MOD;
        }

        return (int)result;
    }
};

```

---

## 📝 How It Works

- **Objective:**
    
    Calculate the sum of the minimum of all possible subarrays in the given array.
    
- **Concept:**
    
    For each element `arr[i]`, we calculate how many subarrays it is the minimum of by:
    
    - Finding the distance to the previous smaller element (`left[i]`).
    - Finding the distance to the next smaller element (`right[i]`).
    - Total subarrays where `arr[i]` is minimum: `(i - left[i]) * (right[i] - i)`.
- **Steps:**
    1. Use **Monotonic Stack** to find previous smaller and next smaller elements.
    2. Multiply contribution from each `arr[i]` and sum them up modulo `10^9 + 7`.

---

## 🧩 Key Formula / Recurrence

- Contribution of `arr[i]`:
    
    ```
    arr[i] * (i - left[i]) * (right[i] - i)
    
    ```
    
    Where:
    
    - `left[i]`: index of previous smaller element (or `1` if none).
    - `right[i]`: index of next smaller element (or `n` if none).

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Stack | O(N) | O(N) |

---

## ⚠️ Edge Cases

- Single element array → Should return the element itself.
- Strictly increasing/decreasing array → Tests stack behavior and correctness of `left` and `right`.
- Duplicate elements → Correctly handle `<=` and `<` in stack conditions.

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(1) | Not acceptable for large N |
| DP + Monotonic | O(N) | O(N) | Best balance |

---

## 🔁 Related Problems

- LeetCode 907: Sum of Subarray Minimums
- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 901: Online Stock Span
- LeetCode 42: Trapping Rain Water

---

## 🛠️ Other Notes

- **Real-World Analogy:**
    
    Think of an array as a set of building heights, and you're looking for the contribution of each building as the shortest one in a certain viewing window.
    
- ✅ **Important Observation:**
    
    The trick is that **you don't need to generate all subarrays**.
    
    Just calculate contribution using previous/next smaller information.
    
- ✅ Remember to handle modulo carefully, especially with large numbers and during intermediate multiplications.