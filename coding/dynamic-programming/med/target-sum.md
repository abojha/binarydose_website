---
title: Target Sum
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.

- For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`.

Return the number of different **expressions** that you can build, which evaluates to `target`.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,1,1,1,1], target = 3
    Output: 5
    Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
    -1 + 1 + 1 + 1 + 1 = 3
    +1 - 1 + 1 + 1 + 1 = 3
    +1 + 1 - 1 + 1 + 1 = 3
    +1 + 1 + 1 - 1 + 1 = 3
    +1 + 1 + 1 + 1 - 1 = 3
    Example 2:
    
    Input: nums = [1], target = 1
    Output: 1
     
    ```
    

---

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    // Recursive function to count subsets with sum = target
    int solve(int ind, int target, vector<int> &nums, vector<vector<int>> &dp){
        // Base case
        if(ind == 0){
            if(target == 0 && nums[0] == 0) return 2; // (+0, -0)
            if(target == 0 || nums[0] == target) return 1;
            return 0;
        }

        if(dp[ind][target] != -1) return dp[ind][target];

        // Exclude current number
        int notTake = solve(ind - 1, target, nums, dp);

        // Include current number (only if ≤ target)
        int take = 0;
        if(nums[ind] <= target)
            take = solve(ind - 1, target - nums[ind], nums, dp);

        return dp[ind][target] = (take + notTake) % mod;
    }

    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        int totSum = accumulate(nums.begin(), nums.end(), 0);

        // If impossible to reach target
        if(target > totSum || (totSum - target) % 2 != 0) return 0;

        int S2 = (totSum - target) / 2;

        vector<vector<int>> dp(n, vector<int>(S2 + 1, -1));
        return solve(n - 1, S2, nums, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        int totSum = accumulate(nums.begin(), nums.end(), 0);

        // Check if a valid partition is possible
        if(totSum < target || (totSum - target) % 2 != 0)
            return 0;

        int S2 = (totSum - target) / 2;
        vector<vector<int>> dp(n, vector<int>(S2 + 1, 0));

        // Base case initialization
        if(nums[0] == 0)
            dp[0][0] = 2; // (+0 and -0)
        else
            dp[0][0] = 1;

        if(nums[0] != 0 && nums[0] <= S2)
            dp[0][nums[0]] = 1;

        // Build DP table
        for(int i = 1; i < n; i++){
            for(int target = 0; target <= S2; target++){
                int notTake = dp[i - 1][target];  // Exclude
                int take = 0;
                if(nums[i] <= target)
                    take = dp[i - 1][target - nums[i]]; // Include

                dp[i][target] = (take + notTake) % mod;
            }
        }

        return dp[n - 1][S2];
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        int totSum = accumulate(nums.begin(), nums.end(), 0);

        if(totSum < target || (totSum - target) % 2 != 0)
            return 0;

        int S2 = (totSum - target) / 2;
        vector<int> prev(S2 + 1, 0);

        // Base case
        if(nums[0] == 0)
            prev[0] = 2;  // (+0, -0)
        else
            prev[0] = 1;

        if(nums[0] != 0 && nums[0] <= S2)
            prev[nums[0]] = 1;

        // Iterative DP with space optimization
        for(int i = 1; i < n; i++){
            vector<int> curr(S2 + 1, 0);
            for(int target = 0; target <= S2; target++){
                int notTake = prev[target]; // Exclude
                int take = 0;
                if(nums[i] <= target)
                    take = prev[target - nums[i]]; // Include

                curr[target] = (take + notTake) % mod;
            }
            prev = curr;
        }

        return prev[S2];
    }
};

```

---

## 📝 Revision Notes – Target Sum Using Subset Sum

### ✅ How It Works

- You are given a list `nums` and a `target`.
- You can assign '+' or '−' before each number.
- The goal is to count how many such expressions evaluate to the `target`.

### 🔄 Reduce to Subset Sum:

- Let total sum be `S`.
- Use equation:
    
    `S1 - S2 = target`
    
    `S1 + S2 = S`
    
    ➤ Solve for S2: `S2 = (S - target) / 2`
    
- Now count number of subsets with sum = `S2`.

---

### 🧩 Key Formula

```
dp[i][j] = dp[i-1][j] + dp[i-1][j - nums[i]]

```

Where:

- `dp[i][j]` = number of ways to get sum `j` using first `i` elements.

---

### ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × S2) | O(N × S2) |
| Tabulation | O(N × S2) | O(N × S2) |
| Space Optimized | O(N × S2) | O(S2) |

> S2 = (totalSum - target) / 2
> 

---

### ⚠️ Edge Cases

- If `target > totalSum` → no solution.
- If `(totalSum - target)` is odd → not divisible into subsets.
- If `nums[0] == 0` → two ways to get zero: (+0, -0)

---

### 🔁 Related Problems

- **Leetcode 494 – Target Sum**
- **Leetcode 416 – Equal Subset Partition**
- **Count subsets with given sum**
- **Minimum subset sum difference**

---