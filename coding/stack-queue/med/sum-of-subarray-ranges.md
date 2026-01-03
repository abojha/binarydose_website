---
title: Sum of Subarray Ranges
description: ""
tags:
  - med
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

You are given an integer array `nums`. The **range** of a subarray of `nums` is the difference between the largest and smallest element in the subarray.

Return *the **sum of all** subarray ranges of* `nums`*.*

A subarray is a contiguous **non-empty** sequence of elements within an array.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,2,3]
    Output: 4
    Explanation: The 6 subarrays of nums are the following:
    [1], range = largest - smallest = 1 - 1 = 0 
    [2], range = 2 - 2 = 0
    [3], range = 3 - 3 = 0
    [1,2], range = 2 - 1 = 1
    [2,3], range = 3 - 2 = 1
    [1,2,3], range = 3 - 1 = 2
    So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
    Example 2:
    
    Input: nums = [1,3,3]
    Output: 4
    Explanation: The 6 subarrays of nums are the following:
    [1], range = largest - smallest = 1 - 1 = 0
    [3], range = 3 - 3 = 0
    [3], range = 3 - 3 = 0
    [1,3], range = 3 - 1 = 2
    [3,3], range = 3 - 3 = 0
    [1,3,3], range = 3 - 1 = 2
    So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
    Example 3:
    
    Input: nums = [4,-2,-3,4,1]
    Output: 59
    Explanation: The sum of all subarray ranges of nums is 59.
     
    ```
    

---

## ✅ Solution: Monotonic Stack — Subarray Ranges (Max - Min Sum Over All Subarrays)

---

```cpp
class Solution {
public:
    int MOD = 1e9 + 7;

    // Sum of Subarray Minimums using Monotonic Increasing Stack
    long long sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        stack<int> s1, s2;
        vector<int> left(n, -1), right(n, n);

        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[i] <= arr[s1.top()]) {
                s1.pop();
            }
            if (!s1.empty()) {
                left[i] = s1.top();
            }
            s1.push(i);
        }

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[i] < arr[s2.top()]) {
                s2.pop();
            }
            if (!s2.empty()) {
                right[i] = s2.top();
            }
            s2.push(i);
        }

        long long result = 0;
        for (int i = 0; i < n; i++) {
            result += 1LL * arr[i] * (i - left[i]) * (right[i] - i);
        }

        return result;
    }

    // Sum of Subarray Maximums using Monotonic Decreasing Stack
    long long sumSubarrayMaxs(vector<int>& arr) {
        int n = arr.size();
        stack<int> s1, s2;
        vector<int> left(n, -1), right(n, n);

        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[i] >= arr[s1.top()]) {
                s1.pop();
            }
            if (!s1.empty()) {
                left[i] = s1.top();
            }
            s1.push(i);
        }

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[i] > arr[s2.top()]) {
                s2.pop();
            }
            if (!s2.empty()) {
                right[i] = s2.top();
            }
            s2.push(i);
        }

        long long result = 0;
        for (int i = 0; i < n; i++) {
            result += 1LL * arr[i] * (i - left[i]) * (right[i] - i);
        }

        return result;
    }

    long long subArrayRanges(vector<int>& nums) {
        long long mini = sumSubarrayMins(nums);
        long long maxi = sumSubarrayMaxs(nums);
        return maxi - mini;
    }
};

```

---

## 📝 How It Works

- **Objective:**
    
    Find the sum of ranges (max - min) for all subarrays of a given array.
    
- **Key Insight:**
    
    The sum of all subarray maximums minus the sum of all subarray minimums gives the total sum of all subarray ranges.
    
- **Two Main Functions:**
    - `sumSubarrayMins()` → Monotonic Increasing Stack
    - `sumSubarrayMaxs()` → Monotonic Decreasing Stack
- **How It Counts:**
    - For each element, find how many subarrays it is the minimum/maximum of using:
        - Distance to previous smaller/greater element
        - Distance to next smaller/greater element
- **Final Step:**
    
    ```
    result = sumSubarrayMaxs(nums) - sumSubarrayMins(nums)
    
    ```
    

---

## 🧩 Key Formula

- For subarray minimums:
    
    ```
    arr[i] * (i - left[i]) * (right[i] - i)
    
    ```
    
    where `left[i]` → previous smaller
    
    `right[i]` → next smaller
    
- For subarray maximums:
    
    ```
    arr[i] * (i - left[i]) * (right[i] - i)
    
    ```
    
    where `left[i]` → previous greater
    
    `right[i]` → next greater
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Stack | O(N) | O(N) |
- Each element is pushed and popped at most once per stack.

---

## ⚠️ Edge Cases

- Array with all same elements → Range for all subarrays = `0`.
- Single element array → Should return `0`.
- Increasing or decreasing array → Should handle monotonic behavior correctly.

---

## 💡 Other Approaches

- Brute Force with nested loops → O(N²) time, not acceptable for large inputs.
- Segment Tree based range queries — possible but overkill.

---

## 🔁 Related Problems

- LeetCode 907: Sum of Subarray Minimums
- LeetCode 2104: Sum of Subarray Ranges
- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 901: Online Stock Span

---

## 🛠️ Other Notes

- ✅ This combined minimum + maximum method is especially useful in interview settings where you’re asked to find range sums across subarrays.
- ✅ Instead of generating subarrays, **use contribution counting** to get O(N) solutions efficiently.
- ✅ You don’t need to manually apply MOD when solving `subArrayRanges`, since that problem doesn’t ask for modulo. Only `sumSubarrayMins` from LeetCode 907 does.