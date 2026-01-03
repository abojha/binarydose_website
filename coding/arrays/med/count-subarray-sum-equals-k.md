---
title: Count Subarray sum Equals K
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array of integers and an integer k, return the total number of subarrays whose sum equals k.

A subarray is a contiguous non-empty sequence of elements within an array.

- Example:
    
    ```
    Example 1:
    Input Format: N = 4, array[] = {3, 1, 2, 4}, k = 6
    Result: 2
    Explanation: The subarrays that sum up to 6 are [3, 1, 2] and [2, 4].
    
    Example 2:
    Input Format: N = 3, array[] = {1,2,3}, k = 3
    Result: 2
    Explanation: The subarrays that sum up to 3 are [1, 2], and [3].
    ```
    

---

---

## ✅ Solution: Prefix Sum + HashMap

```cpp
int subarraySum(vector<int>& nums, int k) {
    map<long long, int> prefixSumFreq;  // stores prefix sum → frequency
    long long sum = 0;
    int count = 0;

    for (int i = 0; i < nums.size(); i++) {
        sum += nums[i];  // cumulative sum up to index i

        if (sum == k) count++;  // case when subarray starts from index 0

        long long remaining = sum - k;
        if (prefixSumFreq.find(remaining) != prefixSumFreq.end()) {
            count += prefixSumFreq[remaining];  // subarrays ending at i with sum = k
        }

        prefixSumFreq[sum]++;  // record the current prefix sum
    }

    return count;
}

```

---

### 📝 How It Works

- We use a **prefix sum** approach: `sum[i] = sum of nums[0..i]`.
- If `sum[i] - sum[j] == k`, then the subarray `nums[j+1..i]` has sum `k`.
- So, for each running prefix sum `sum`, we check if `sum - k` was previously seen.
- We use a map (`prefixSumFreq`) to store the **number of times each prefix sum** occurred.

---

### 🧩 Key Formula / Recurrence

- **Condition**: `prefix_sum[i] - prefix_sum[j] == k`
    
    ⇒ `prefix_sum[j] == prefix_sum[i] - k`
    

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(N) (map) |
- We iterate once through the array → linear time.
- At most `N` distinct prefix sums stored in the map.

---

### ⚠️ Edge Cases

- Elements can be negative (why prefix sum is preferred over sliding window).
- Subarrays can start from index `0` (check `sum == k` directly).
- Multiple subarrays with the same sum.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force (2 loops) | O(N²) | O(1) | TLE for large inputs |
| Sliding Window | ❌ | ❌ | Doesn’t work with negatives |
| Prefix Sum + Map | ✅ O(N) | O(N) | Best approach |

---

### 🔁 Related Problems

- [LC 560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- [LC 974. Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)
- [LC 525. Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- [LC 930. Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/)

---

### 🛠️ Other Notes

- Think of the prefix sum as a **bank account balance**:
    
    If your balance now is `sum` and you earlier had `sum - k`, then you spent exactly `k` in between — that's your subarray!
    
- Works for both positive and negative integers.
- This is a classic **"prefix sum + hashmap"** pattern for subarray problems.