---
title: Longest Increasing Subsequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Given an integer array `nums`, return *the length of the longest **strictly increasing subsequence***.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [10,9,2,5,3,7,101,18]
    Output: 4
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
    Example 2:
    
    Input: nums = [0,1,0,3,2,3]
    Output: 4
    Example 3:
    
    Input: nums = [7,7,7,7,7,7,7]
    Output: 1
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, int prev_index, vector<int>& nums, vector<vector<int>> &dp){
        if(ind == nums.size()) return 0;

        if(dp[ind][prev_index + 1] != -1)
            return dp[ind][prev_index + 1];

        int notTake = solve(ind + 1, prev_index, nums, dp);
        int take = 0;
        if(prev_index == -1 || nums[ind] > nums[prev_index])
            take = 1 + solve(ind + 1, ind, nums, dp);

        return dp[ind][prev_index + 1] = max(take, notTake);
    }

    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(n + 1, -1));
        return solve(0, -1, nums, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for(int ind = n - 1; ind >= 0; ind--){
            for(int prev_index = ind - 1; prev_index >= -1; prev_index--){
                int notTake = dp[ind + 1][prev_index + 1];
                int take = 0;
                if(prev_index == -1 || nums[ind] > nums[prev_index]){
                    take = 1 + dp[ind + 1][ind + 1];
                }
                dp[ind][prev_index + 1] = max(take, notTake);
            }
        }

        return dp[0][0];
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> next(n + 1, 0), curr(n + 1, 0);

        // Reduce 2D DP to 1D by rolling arrays
        for(int ind = n - 1; ind >= 0; ind--){
            for(int prev_index = ind - 1; prev_index >= -1; prev_index--){
                int notTake = next[prev_index + 1];
                int take = 0;
                if(prev_index == -1 || nums[ind] > nums[prev_index]){
                    take = 1 + next[ind + 1];
                }

                curr[prev_index + 1] = max(take, notTake);
            }
            next = curr; // Move current row to next
        }

        return next[0];
    }
};

```

---

## 📝 How It Works

- Goal: Find the **length of the Longest Increasing Subsequence** (not necessarily contiguous).
- At each index `i`, you decide:
    - **Skip** the current element.
    - **Take** the element if it's greater than the last picked (`nums[i] > nums[prev_index]`).
- Use `dp[ind][prev_index + 1]` to memoize results and avoid recomputation.
- In tabulation and space-optimized versions, we simulate the same recursion using loops.

---

## 🧩 Key Formula / Recurrence

```cpp
dp[ind][prev+1] = max(
    dp[ind + 1][prev + 1],                  // skip
    1 + dp[ind + 1][ind + 1] if valid take  // take
)

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N²) | O(N²) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) ✅ |

---

## ⚠️ Edge Cases

- Empty array → return 0
- All decreasing → only one element can be taken → LIS = 1
- All equal elements → LIS = 1
- Strictly increasing → entire array is LIS → LIS = N

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force | Exponential ❌ | ❌ |
| Memoization | O(N²) | O(N²) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) ✅ |
| Binary Search | O(N log N) ✅ | O(N) ✅  *(coming next)* |

---

## 🔁 Related Problems

- [🔗 Longest Increasing Subsequence (Leetcode 300)](https://leetcode.com/problems/longest-increasing-subsequence/)
- [🔗 Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)
- [🔗 Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
- [🔗 Longest Bitonic Subsequence (GFG)](https://www.geeksforgeeks.org/longest-bitonic-subsequence/)

---