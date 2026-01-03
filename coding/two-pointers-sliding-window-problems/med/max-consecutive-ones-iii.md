---
title: Max Consecutive Ones III
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given a binary array `nums` and an integer `k`, return *the maximum number of consecutive* `1`*'s in the array if you can flip at most* `k` `0`'s.

```
Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

---

## ✅ Solution: Sliding Window with Queue (Fixed Zero Flip Count)

---

### Solution: Sliding Window with Queue

```cpp
int longestOnes(vector<int>& nums, int k) {
    queue<int> qu;  // stores indices of flipped 0s
    int left = 0, right = 0;
    int n = nums.size();
    int max_ans = INT_MIN;

    while (right < n) {
        if (nums[right] == 0) {
            qu.push(right);  // flip 0 and track its index
        }

        // If flips exceed k, shrink window from left
        if (qu.size() > k) {
            left = qu.front() + 1;  // move left after the first flipped 0
            qu.pop();
        }

        max_ans = max(max_ans, right - left + 1);  // update max length
        right++;
    }

    return max_ans;
}

```

---

## 📝 How It Works

- The goal is to find the longest subarray with at most `k` zeros flipped to ones.
- We use a sliding window between `left` and `right` pointers.
- We maintain a `queue` that stores the indices of the zeros flipped:
    - Whenever `nums[right] == 0`, add its index to `queue`.
    - If `queue.size() > k`, it means we have flipped more than allowed zeros.
    - In that case, move `left` pointer to one position after the earliest flipped zero (`queue.front()`).
- At each step, calculate `right - left + 1` as the current window length and update the maximum length found.

---

## 🧩 Key Formula / Recurrence

- **Window Adjustment:**
    
    If number of zeros > k →
    
    `left = qu.front() + 1` and remove front from queue.
    
- **Window Length:**
    
    `max_ans = max(max_ans, right - left + 1)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each element is processed at most twice. |
| **Space Complexity** | O(K) — For the queue storing up to `k` zero indices. |

---

## ⚠️ Edge Cases

- `k = 0`: No flips allowed. The longest window must contain only `1`s.
- All elements are `1`: The full array length is returned.
- All elements are `0` and `k < total zeros`: Only part of the array can be considered.
- `nums` is empty.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Sliding Window + Counter | O(N) | Instead of storing indices, maintain zero count with two pointers. |
| Brute Force | O(N²) | Inefficient, not recommended. |

---

## 🔁 Related Problems

- LeetCode 1004: Max Consecutive Ones III
- LeetCode 487: Max Consecutive Ones II (k = 1)
- LeetCode 485: Max Consecutive Ones
- GFG: Longest subarray with at most K zeros

---

## 🛠️ Other Notes (Optional)

- **Real-world analogy**: Imagine skipping bad quality video frames (0s) while watching a stream. You’re allowed to skip up to `k` frames and want to enjoy the longest continuous good segment.
- You can replace `queue<int>` with `deque<int>` or even an integer counter + manual index tracking for slightly faster performance.