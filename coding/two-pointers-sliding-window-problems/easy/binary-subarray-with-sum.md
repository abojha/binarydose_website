---
title: Binary subarray with sum
description: ""
tags:
  - easy
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given a binary array `nums` and an integer `goal`, return *the number of non-empty **subarrays** with a sum* `goal`.

A **subarray** is a contiguous part of the array.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,0,1,0,1], goal = 2
    Output: 4
    Explanation: The 4 subarrays are bolded and underlined below:
    [1,0,1,0,1]
    [1,0,1,0,1]
    [1,0,1,0,1]
    [1,0,1,0,1]
    Example 2:
    
    Input: nums = [0,0,0,0,0], goal = 0
    Output: 15
    ```
    

---

---

## ✅ Solution: Sliding Window + Inclusion-Exclusion (Prefix Count Trick)

```cpp
// Counts number of subarrays with sum at most 'goal'
int findSum(vector<int>& nums, int goal) {
    int sum = 0, count = 0;
    int left = 0, right = 0;

    while (right < nums.size()) {
        if (goal < 0) return 0;  // early exit for invalid range

        sum += nums[right];

        // Shrink window if sum exceeds 'goal'
        while (sum > goal) {
            sum -= nums[left];
            left++;
        }

        // All subarrays ending at 'right' with sum ≤ goal
        count += right - left + 1;
        right++;
    }
    return count;
}

int numSubarraysWithSum(vector<int>& nums, int goal) {
    // Number of subarrays with sum == goal
    return findSum(nums, goal) - findSum(nums, goal - 1);
}

```

---

## 📝 How It Works

- The problem counts the number of subarrays with sum exactly equal to a target.
- Instead of counting exactly, we count:
    - Subarrays with sum ≤ goal (`findSum(nums, goal)`)
    - Subarrays with sum ≤ goal - 1
- Their difference gives subarrays with sum exactly equal to `goal` (Inclusion-Exclusion Trick).
- `findSum` uses a sliding window:
    - Expands right pointer and shrinks left pointer as needed.
    - Maintains window sum ≤ goal and counts valid subarrays ending at each `right`.

---

## 🧩 Key Formula

- `numSubarraysWithSum(goal) = atMost(goal) − atMost(goal − 1)`
- Where `atMost(k)` counts subarrays with sum ≤ k using the sliding window.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — One pass through `nums` per call (two calls total) |
| **Space Complexity** | O(1) — Constant extra space |

---

## ⚠️ Edge Cases

- `goal = 0`: Needs careful handling, especially with empty subarrays (in this implementation, handled by `goal < 0` early return).
- All zeros in `nums`: Many subarrays can form with sum 0.
- Array with size 1.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Prefix Sum + Hashmap | O(N) | Counts prefix sums, useful if negative numbers are involved |
| Brute Force | O(N²) | Not practical for large arrays |

For strictly binary arrays, this sliding window is optimal.

---

## 🔁 Related Problems

- LeetCode 930. Binary Subarrays With Sum
- LeetCode 1248. Count Number of Nice Subarrays
- LeetCode 560. Subarray Sum Equals K (prefix sum + hashmap version)
- GFG: Count subarrays with given sum

---

## 🛠️ Other Notes

- ✅ Works well when `nums` contains only non-negative integers.
- ✅ The sliding window technique **won't work** for arrays with negative numbers because shrinking the window may never reduce the sum in those cases.
- ✅ Real-life analogy: Sliding window works like adjusting a telescope length while measuring a specific distance without overshooting.