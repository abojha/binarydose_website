---
title: Sliding Window Maximum
description: ""
tags:
  - implementation
  - med
  - problem
  - stack-queue
---

Summary: Use deque for optimum solution

### Problem Statement:

Given an array of integers arr, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return *the **max sliding window***.

```
Example 1:

Input: arr = [4,0,-1,3,5,3,6,8], k = 3

Output: [4,3,5,5,6,8]

Explanation: 

Window position                   Max
------------------------         -----
[4  0  -1] 3  5  3  6  8           4
 4 [0  -1  3] 5  3  6  8           3
 4  0 [-1  3  5] 3  6  8           5
 4  0  -1 [3  5  3] 6  8           5
 4  0  -1  3 [5  3  6] 8           6
 4  0  -1  3  5 [3  6  8]          8

For each window of size k=3, we find the maximum element in the window and add it to our output array.
```

## ✅ Solution: Monotonic Deque — Sliding Window Maximum

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // stores indices
    vector<int> res;

    for (int i = 0; i < nums.size(); i++) {
        // Remove indices outside the window
        if (!dq.empty() && dq.front() == i - k) dq.pop_front();

        // Remove indices whose values are less than nums[i]
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();

        // Add current index
        dq.push_back(i);

        // Record result starting from the first full window
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }

    return res;
}

```

---

## 📝 How It Works

- **Problem Goal:** For each window of size `k`, find the maximum value.
- **Technique:**
    - Use a **deque** that always keeps the maximum element at the front.
    - **Monotonic Decreasing Order:** Elements in deque from front to back are decreasing in value.
- **Step-by-Step:**
    1. Remove elements from the front if they fall outside the current window range (`i - k`).
    2. Remove elements from the back if they are smaller than the current number (`nums[i]`), as they will never be needed again.
    3. Push the current element's index into the deque.
    4. Add the maximum (deque front) to the result once at least `k` elements are processed.

---

## 🧩 Key Formula

- Maintain a deque such that:
    
    ```
    nums[dq.front()] is the maximum in current window
    
    ```
    
- Deque cleaning rules:
    - Pop front if `dq.front() <= i - k`
    - Pop back if `nums[dq.back()] < nums[i]`

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Deque | O(N) | O(K) |
- Each element is pushed and popped at most once.

---

## ⚠️ Edge Cases

- k = 1 → Result is the original array.
- Array of all same values.
- Increasing or decreasing array (tests whether deque maintains correct order).

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N * K) | O(1) | Too slow for large arrays |
| Max-Heap (Priority Queue) | O(N log K) | O(K) | Not as clean as deque and slower |

---

## 🔁 Related Problems

- LeetCode 239: Sliding Window Maximum (Exact Problem)
- LeetCode 480: Sliding Window Median
- LeetCode 862: Shortest Subarray with Sum at Least K
- LeetCode 1438: Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

---

## 🛠️ Other Notes

- ✅ Real-world analogy:
    
    Keeping track of the largest value in a rolling window, like monitoring maximum temperature in the past 7 days.
    
- ✅ Monotonic queue is a reusable pattern for windowed problems requiring max/min.
- ✅ Compared to heaps, deque-based solutions are faster and easier to reason about for sliding max/min problems.