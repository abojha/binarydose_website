---
title: Subarrays with K Different Integers
description: ""
tags:
  - hard
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given an integer array `nums` and an integer `k`, return *the number of **good subarrays** of* `nums`.

A **good array** is an array where the number of different integers in that array is exactly `k`.

- For example, `[1,2,3,1,2]` has `3` different integers: `1`, `2`, and `3`.

A **subarray** is a **contiguous** part of an array.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,2,1,2,3], k = 2
    Output: 7
    Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
    Example 2:
    
    Input: nums = [1,2,1,3,4], k = 3
    Output: 3
    Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
    ```
    

---

---

## ✅ Solution: Sliding Window + Inclusion-Exclusion (Count Subarrays with Exactly K Distinct Elements)

---

### Solution: Sliding Window with Map (At Most K Distinct)

```cpp
int counting(vector<int>& nums, int k) {
    int left = 0, right = 0;
    int count = 0;
    map<int, int> mpp;  // stores frequency of each element in the current window

    while (right < nums.size()) {
        if (k < 0) return 0;  // Edge case guard

        mpp[nums[right]]++;  // add nums[right] into window

        // shrink window until distinct elements count is at most k
        while (mpp.size() > k) {
            mpp[nums[left]]--;
            if (mpp[nums[left]] == 0) mpp.erase(nums[left]);
            left++;
        }

        count += right - left + 1;  // count valid subarrays ending at right
        right++;
    }

    return count;
}

int subarraysWithKDistinct(vector<int>& nums, int k) {
    return counting(nums, k) - counting(nums, k - 1);
}

```

---

## 📝 How It Works

- The problem asks to count subarrays with **exactly k distinct elements**.
- We leverage the idea:
    - `subarraysWithKDistinct = atMost(k) - atMost(k - 1)`.
    - `atMost(k)` means count of subarrays with **at most k distinct elements**.
- The function `counting` uses the **sliding window technique**:
    - `map<int, int>` keeps frequency counts of elements inside the current window.
    - If the map’s size exceeds `k`, we shrink the window from `left` until size ≤ `k`.
    - At each step, `right - left + 1` gives the number of valid subarrays ending at `right`.

---

## 🧩 Key Formula / Recurrence

- **Main Formula:**
    
    `subarraysWithKDistinct(nums, k) = atMost(k) − atMost(k − 1)`.
    
- **Window Shrink Condition:**
    
    While `mpp.size() > k`, move `left` forward.
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each element is processed at most twice. |
| **Space Complexity** | O(K) — For `map` storing up to K distinct elements. |

---

## ⚠️ Edge Cases

- `k = 0`: Should return 0 because no valid subarray exists.
- Array size < k: Should return 0.
- All elements the same and `k = 1`: The whole array is valid.
- All elements unique and `k = array size`: The whole array is counted once.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Not efficient, checks all subarrays. |
| Prefix Sum + Hashmap | O(N²) | For educational understanding. |
| Sliding Window + Map | O(N) ✅ | Most efficient, interview standard. |

---

## 🔁 Related Problems

- LeetCode 992: Subarrays with K Different Integers ✅
- LeetCode 340: Longest Substring with At Most K Distinct Characters
- LeetCode 3: Longest Substring Without Repeating Characters
- GFG: Count subarrays with k different integers

---

## 🛠️ Other Notes (Optional)

- ✅ Use unordered_map instead of map if key ordering isn’t required for better average performance.
- ✅ Real-world analogy: Counting the number of playlists with exactly k unique artists playing continuously.