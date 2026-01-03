---
title: Number of Longest Increasing Subsequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Given an integer array `nums`, return *the number of longest increasing subsequences.*

**Notice** that the sequence has to be **strictly** increasing.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,3,5,4,7]
    Output: 2
    Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].
    Example 2:
    
    Input: nums = [2,2,2,2,2]
    Output: 5
    Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, so output 5.
    ```
    

---

---

## ✅ Solution: Tabulation + Count Tracking

```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);   // dp[i] = length of LIS ending at i
        vector<int> cnt(n, 1);  // cnt[i] = number of LIS ending at i
        int maxi = 1;           // Length of longest increasing subsequence

        for(int i = 0; i < n; i++){
            for(int prev = 0; prev < i; prev++){
                if(nums[prev] < nums[i]){
                    if(dp[prev] + 1 > dp[i]){
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev]; // Reset count from prev
                    }
                    else if(dp[prev] + 1 == dp[i]){
                        cnt[i] += cnt[prev]; // Add more ways to reach same LIS length
                    }
                }
            }
            maxi = max(maxi, dp[i]);
        }

        // Count all sequences of maximum length
        int ans = 0;
        for(int i = 0; i < n; i++){
            if(dp[i] == maxi){
                ans += cnt[i];
            }
        }

        return ans;
    }
};

```

---

## 📝 How It Works

- You must find **how many longest increasing subsequences (LIS)** exist in the array.
- Use:
    - `dp[i]`: length of LIS ending at index `i`
    - `cnt[i]`: number of such LIS of that length ending at `i`
- For every pair `(prev, i)`:
    - If `nums[prev] < nums[i]`, check:
        - **New longer LIS** → update `dp[i]` and reset `cnt[i] = cnt[prev]`
        - **Same length LIS** → accumulate `cnt[i] += cnt[prev]`
- Finally, sum all `cnt[i]` where `dp[i] == maxLIS`.

---

## 🧩 Key Transitions

```cpp
if(nums[prev] < nums[i]){
    if(dp[prev] + 1 > dp[i]){
        dp[i] = dp[prev] + 1;
        cnt[i] = cnt[prev];
    }
    else if(dp[prev] + 1 == dp[i]){
        cnt[i] += cnt[prev];
    }
}

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N²) ✅ |
| Space | O(N) ✅ |

---

## ⚠️ Edge Cases

- All elements equal → every single element is an LIS of length 1
- Strictly increasing → only 1 LIS of length N
- Duplicates with same LIS length → handled via `cnt[i]`

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| DFS + Memo | ❌ Too slow (exponential) |
| Segment Tree | ❌ Overkill, hard to maintain count |
| DP + Count ✅ | Most optimal for counting LIS |

---

## 🔁 Related Problems

- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
- [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)
- [Longest Bitonic Subsequence (GFG)](https://www.geeksforgeeks.org/longest-bitonic-subsequence/)

---