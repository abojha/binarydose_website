---
title: Count number of nice subarrays
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given an array of integers `nums` and an integer `k`. A continuous subarray is called **nice** if there are `k` odd numbers on it.

Return *the number of **nice** sub-arrays*.

- Example:
    
    ```
    Example 1:
    
    ```
    Input: nums = [1,1,2,1,1], k = 3
    Output: 2
    Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
    
    ```
    
    Example 2:
    
    ```
    Input: nums = [2,4,6], k = 1
    Output: 0
    Explanation: There are no odd numbers in the array.
    
    ```
    
    Example 3:
    
    ```
    Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
    Output: 16
    
    ```
    ```
    

---

---

## ✅ Solution: Sliding Window + Inclusion-Exclusion (Count Subarrays with Exactly K Odd Numbers)

---

### Solution: Sliding Window with Inclusion-Exclusion

```cpp
int countSubarrays(vector<int>& nums, int k) {
    int left = 0, right = 0;
    int no_of_odds = 0;
    int count = 0;

    while (right < nums.size()) {
        if (k < 0) return 0;  // Early exit for invalid k

        no_of_odds += (nums[right] % 2);

        while (no_of_odds > k) {
            no_of_odds -= (nums[left] % 2);
            left++;
        }

        count += right - left + 1;  // Count valid subarrays ending at 'right'
        right++;
    }

    return count;
}

int numberOfSubarrays(vector<int>& nums, int k) {
    return countSubarrays(nums, k) - countSubarrays(nums, k - 1);
}

```

---

## 📝 How It Works

- We are asked to count subarrays with exactly **k odd numbers**.
- Instead of counting **exactly k** directly, we:
    - Count subarrays with at most `k` odd numbers: `countSubarrays(nums, k)`.
    - Count subarrays with at most `k-1` odd numbers: `countSubarrays(nums, k - 1)`.
    - Their difference gives subarrays with exactly `k` odds.
- **Sliding Window Details:**
    - Expand `right` to include more elements while tracking the number of odd numbers.
    - Shrink `left` until the window is valid again if odd numbers exceed `k`.
    - At each step, add `(right - left + 1)` to the count.

---

## 🧩 Key Formula / Recurrence

- **Main Formula:**
    
    `numberOfSubarrays(nums, k) = atMost(k) - atMost(k - 1)`
    
- **Window Condition:**
    
    While `no_of_odds > k`, shrink window from `left`.
    
- **Count Update:**
    
    `count += right - left + 1` whenever window is valid.
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each element is processed at most twice. |
| **Space Complexity** | O(1) — Constant extra space. |

---

## ⚠️ Edge Cases

- `k = 0`: Count subarrays with 0 odd numbers → handled via early return.
- All numbers are odd → Edge condition where window constantly shrinks.
- All numbers are even → Whole array considered if `k = 0`.
- Array size < k → Should return 0.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Checks all subarrays, inefficient. |
| Prefix Sum + Hashmap | O(N) | Another O(N) method using prefix odd count map. |
| Sliding Window + Inclusion-Exclusion | O(N) ✅ | Most concise and efficient. |

---

## 🔁 Related Problems

- LeetCode 1248: Count Number of Nice Subarrays ✅
- LeetCode 930: Binary Subarrays With Sum (Similar logic)
- LeetCode 560: Subarray Sum Equals K
- GFG: Count subarrays with given number of odd numbers

---

## 🛠️ Other Notes (Optional)

- ✅ Real-world analogy: Like counting playlists that contain exactly `k` rock songs from a mixed playlist.
- ✅ Same template applies for counting subarrays with exactly `k` special elements where "special" could be customized (like even, divisible by 3, etc.).