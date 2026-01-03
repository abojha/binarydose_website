---
title: Largest Divisible Subset
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Given a set of **distinct** positive integers `nums`, return the largest subset `answer` such that every pair `(answer[i], answer[j])` of elements in this subset satisfies:

- `answer[i] % answer[j] == 0`, or
- `answer[j] % answer[i] == 0`

If there are multiple solutions, return any of them.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,2,3]
    Output: [1,2]
    Explanation: [1,3] is also accepted.
    Example 2:
    
    Input: nums = [1,2,4,8]
    Output: [1,2,4,8]
    ```
    

---

---

## ✅ Solution: Tabulation + Hashing (Reconstruction)

```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());  // Sort to ensure divisibility in order

        vector<int> dp(n, 1);     // dp[i] = length of largest subset ending at i
        vector<int> hash(n, 0);   // hash[i] = previous index in the subset

        for(int i = 0; i < n; i++){
            hash[i] = i; // Point to self initially
            for(int prev = 0; prev < i; prev++){
                if(nums[i] % nums[prev] == 0 && dp[i] < dp[prev] + 1){
                    dp[i] = dp[prev] + 1;
                    hash[i] = prev;
                }
            }
        }

        // Find index of max value in dp[]
        int maxLen = -1, lastIndex = -1;
        for(int i = 0; i < n; i++){
            if(dp[i] > maxLen){
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        // Reconstruct the largest divisible subset
        vector<int> subset;
        subset.push_back(nums[lastIndex]);
        while(hash[lastIndex] != lastIndex){
            lastIndex = hash[lastIndex];
            subset.push_back(nums[lastIndex]);
        }

        reverse(subset.begin(), subset.end()); // Optional: return in increasing order
        return subset;
    }
};

```

---

## 📝 How It Works

- You need to find the **largest subset** where for every pair `(i, j)`, either `nums[i] % nums[j] == 0` or `nums[j] % nums[i] == 0`.
- Sort the array → guarantees that if `nums[i] % nums[j] == 0`, then `i > j` is more likely.
- Build `dp[i]` as the **length of the largest divisible subset** ending at index `i`.
- Use a `hash` array to **reconstruct** the actual subset.

---

## 🧩 Key Transition

```cpp
if(nums[i] % nums[prev] == 0 && dp[i] < dp[prev] + 1){
    dp[i] = dp[prev] + 1;
    hash[i] = prev;
}

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Tabulation + Hash | O(N²) ✅ | O(N) ✅ |

---

## ⚠️ Edge Cases

- Single element → return the element
- All numbers are powers/multiples of each other
- No pair divisible → return any one element

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Brute Force Subsets | ❌ Too slow (2^N) |
| DP + Hash (this one) | ✅ Reconstructs actual subset |
| Greedy | ❌ Fails to build full chain |

---

## 🔁 Related Problems

- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Longest String Chain](https://leetcode.com/problems/longest-string-chain/)
- [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/)
- [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)

---