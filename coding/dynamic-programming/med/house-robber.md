---
title: House Robber
description: ""
tags:
  - 1d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
    Total amount you can rob = 1 + 3 = 4.
    Example 2:
    
    Input: nums = [2,7,9,3,1]
    Output: 12
    Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
    Total amount you can rob = 2 + 9 + 1 = 12.
    ```
    

---

---

### Solution: Recursive + Memoization

```cpp
int maxSub(int ind, vector<int> &nums, vector<int>& dp) {
    if(ind == 0) return nums[ind];   // Only one element, take it
    if(ind < 0) return 0;            // No valid index, return 0

    if(dp[ind] != -1) return dp[ind];  // Memoized result

    // Choose to pick or not pick the current element
    int pick = nums[ind] + maxSub(ind - 2, nums, dp);  // Pick and skip previous
    int nonPick = maxSub(ind - 1, nums, dp);           // Skip current

    return dp[ind] = max(pick, nonPick);
}

int nonAdjacent(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, -1);
    return maxSub(n - 1, nums, dp);  // ✅ fix: call the recursive function
}

```

---

---

### Solution: Tabulation (Bottom-Up)

```cpp
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];

    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);

    for (int i = 2; i < n; i++) {
        int pick = nums[i] + dp[i - 2];       // Take current and skip previous
        int nonPick = dp[i - 1];              // Skip current
        dp[i] = max(pick, nonPick);
    }

    return dp[n - 1];
}

```

---

---

### Solution: Space Optimized DP (Best Version)

```cpp
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];

    long long prev = nums[0];  // dp[i-1]
    long long prev2 = 0;       // dp[i-2]
    long long curr_i;

    for (int i = 1; i < n; i++) {
        long long pick = nums[i] + prev2;
        long long nonPick = prev;

        curr_i = max(pick, nonPick);
        prev2 = prev;
        prev = curr_i;
    }

    return prev;
}

```

---

### ✅ **How It Works**

- You are given an array `nums` of values at each house.
- You can’t rob two adjacent houses — must **skip at least one**.
- Objective: Maximize the sum of **non-adjacent** elements.
- Build up solution using:
    - **Recurrence**:
        
        `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`
        

---

### 🧠 **Key Points**

- Use **DP** to track max profit at each step.
- Memoization avoids recomputation.
- Tabulation builds the answer iteratively.
- Space optimization stores only last 2 values.

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Recursive + Memo ✅ | O(n) | O(n) |
| Tabulation ✅ | O(n) | O(n) |
| Space Optimized ✅ | O(n) | O(1) |

---

### ⚠️ **Edge Cases**

- Empty array → return 0
- Single element → return that element
- All negative → still return the one with max value
- Large values → use `long long` to avoid overflow

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Brute force (2ⁿ) ❌ | Exponential | O(1) |
| Memoization ✅ | O(n) | O(n) |
| Tabulation ✅ | O(n) | O(n) |
| Space Optimized ✅ | O(n) | O(1) |

---

### 🔁 **Related Problems**

- Climbing Stairs
- Minimum Cost to Reach End
- Paint House Problem (non-adjacent constraints)
- Subsequence Sum with Constraints