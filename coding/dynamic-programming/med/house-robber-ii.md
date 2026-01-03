---
title: House Robber II
description: ""
tags:
  - 1d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [2,3,2]
    Output: 3
    Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
    Example 2:
    
    Input: nums = [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
    Total amount you can rob = 1 + 3 = 4.
    Example 3:
    
    Input: nums = [1,2,3]
    Output: 3
    ```
    

---

---

### Solution: Space Optimized

```cpp
int solve(vector<int> &nums) {
    int n = nums.size();
    if(n == 0) return 0;

    long long prev = nums[0], prev2 = 0;

    for(int i = 1; i < n; i++) {
        long long pick = nums[i] + prev2;
        long long nonPick = prev;
        long long curr_i = max(pick, nonPick);
        prev2 = prev;
        prev = curr_i;
    }

    return prev;
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;
    if(n == 1) return nums[0];

    vector<int> arr1(nums.begin() + 1, nums.end());     // exclude first
    vector<int> arr2(nums.begin(), nums.end() - 1);     // exclude last

    return max(solve(arr1), solve(arr2));
}

```

---

---

### Solution: **Memoization (Top-Down DP)**

```cpp
int houseRobMemo(int i, vector<int>& nums, vector<int>& dp) {
    if(i == 0) return nums[i];
    if(i < 0) return 0;
    if(dp[i] != -1) return dp[i];

    int pick = nums[i] + houseRobMemo(i - 2, nums, dp);
    int nonPick = houseRobMemo(i - 1, nums, dp);

    return dp[i] = max(pick, nonPick);
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;
    if(n == 1) return nums[0];

    vector<int> arr1(nums.begin() + 1, nums.end());
    vector<int> arr2(nums.begin(), nums.end() - 1);

    vector<int> dp1(arr1.size(), -1);
    vector<int> dp2(arr2.size(), -1);

    int ans1 = houseRobMemo(arr1.size() - 1, arr1, dp1);
    int ans2 = houseRobMemo(arr2.size() - 1, arr2, dp2);

    return max(ans1, ans2);
}

```

---

---

### Solution:  Tabulation (Bottom-Up DP)

```cpp
int houseRobTab(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;
    if(n == 1) return nums[0];

    vector<int> dp(n);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);

    for(int i = 2; i < n; i++) {
        dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);
    }

    return dp[n - 1];
}

int rob(vector<int>& nums) {
    int n = nums.size();
    if(n == 0) return 0;
    if(n == 1) return nums[0];

    vector<int> arr1(nums.begin() + 1, nums.end());
    vector<int> arr2(nums.begin(), nums.end() - 1);

    return max(houseRobTab(arr1), houseRobTab(arr2));
}

```

---

### ✅ **How It Works**

- You cannot rob both **first and last** house due to the **circular arrangement**.
- So divide the array into **two linear parts**:
    - Exclude first house → `[1...n-1]`
    - Exclude last house → `[0...n-2]`
- Apply **House Robber I** logic (non-adjacent max sum) on both.
- Return the **maximum of the two results**.

---

### 🧠 **Key Points**

- If you rob house `0`, you cannot rob `n-1` (and vice versa).
- Final answer = `max(rob(1 to n-1), rob(0 to n-2))`
- Use **space optimization** to reduce from O(n) → O(1)
- Handle `n == 0` and `n == 1` explicitly.

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(n) | O(n) |
| Tabulation | O(n) | O(n) |
| Space Optimized ✅ | O(n) | O(1) |

---

### ⚠️ **Edge Cases**

- `n == 0` → return 0
- `n == 1` → return `nums[0]`
- All elements are 0
- Very large values → use `long long` to avoid overflow

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Recursion (TLE) ❌ | 2ⁿ | O(1) |
| Memoization ✅ | O(n) | O(n) |
| Tabulation ✅ | O(n) | O(n) |
| Space Optimization ✅ | O(n) | O(1) |

---

### 🔁 **Related Problems**

- **House Robber I**
- **Frog Jump**
- **Maximum Non-Adjacent Subset Sum**
- **Paint House / Cost Minimization DP**