---
title: Partition Array for Maximum Sum
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - mcm
---

### Problem Statement:

Given an integer array `arr`, partition the array into (contiguous) subarrays of length **at most** `k`. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return *the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a **32-bit** integer.*

- Example:
    
    ```
    Example 1:
    
    Input: arr = [1,15,7,9,2,5,10], k = 3
    Output: 84
    Explanation: arr becomes [15,15,15,9,10,10,10]
    Example 2:
    
    Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
    Output: 83
    Example 3:
    
    Input: arr = [1], k = 1
    Output: 1
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    // Recursive helper to compute max sum starting from index i
    int solve(int i, int n, int k, vector<int> &arr, vector<int> &dp){
        if(i == n) return 0;
        if(dp[i] != -1) return dp[i];

        int len = 0;
        int maxi = INT_MIN;
        int maxans = INT_MIN;

        // Try all partitions of length up to k
        for(int j = i; j < min(i + k, n); j++){
            len++;
            maxi = max(maxi, arr[j]);  // Keep track of max in this partition

            // Compute cost: max * len + solve remaining part
            int ans = maxi * len + solve(j + 1, n, k, arr, dp);
            maxans = max(maxans, ans); // Maximize result
        }

        return dp[i] = maxans;
    }

    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, -1); // dp[i] = max sum from index i to end
        return solve(0, n, k, arr, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, 0); // dp[i] = max sum starting from i

        // Fill dp array from end to start
        for(int i = n - 1; i >= 0; i--){
            int len = 0;
            int maxi = INT_MIN;
            int maxans = INT_MIN;

            for(int j = i; j < min(i + k, n); j++){
                len++;
                maxi = max(maxi, arr[j]);
                int ans = maxi * len + dp[j + 1];
                maxans = max(ans, maxans);
            }

            dp[i] = maxans;
        }

        return dp[0];
    }
};

```

---

## 📝 How It Works

- We are allowed to **partition the array into blocks of size at most `k`**.
- For each block, we calculate its cost as:
    
    `max in block * size of block`.
    
- We then recurse or build the DP table to compute the **maximum sum possible** after choosing all partitions optimally.
- `dp[i]` stores the maximum sum we can achieve starting from index `i`.

---

## 🧩 Key Formula / Transition

```
dp[i] = max(
    max(arr[i..j]) * (j - i + 1) + dp[j + 1]
) for all j in [i, i+k-1]

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N*K) | O(N) |
| Tabulation | O(N*K) | O(N) |
- We explore up to `k` elements from each index `i`.

---

## ⚠️ Edge Cases

- `k = 1` → Only 1-element partitions.
- All elements are the same → Partition into max `k` size to get max sum.
- `k >= n` → Can take the whole array as a single partition.

---

## 💡 Other Approaches

| Approach | Time | Comment |
| --- | --- | --- |
| Recursive Only | Exponential ❌ | Too slow |
| Memoization | O(N*K) ✅ | Top-down |
| Tabulation | O(N*K) ✅ | Bottom-up |

---

## 🔁 Related Problems

- [Partition Array for Maximum Sum – Leetcode 1043](https://leetcode.com/problems/partition-array-for-maximum-sum/)
- [Paint House Problem (GFG)](https://www.geeksforgeeks.org/dynamic-programming-set-13-cutting-a-rod/)
- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

---