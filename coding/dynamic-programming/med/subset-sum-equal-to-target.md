---
title: Subset sum equal to target
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

We are given an array ‘ARR’ with N positive integers. We need to find if there is a subset in “ARR” with a sum equal to K. If there is, return true else return false.

- Example:
    
    ```
    
    ```
    

---

---

### Solution: Memoization

```cpp
#include <bits/stdc++.h>
using namespace std;

bool f(int index, int target, vector<int> &arr, vector<vector<int>> &dp){
    // Base Case: target becomes 0 => empty subset is valid
    if(target == 0) return true;

    // Only one element left
    if(index == 0) return (arr[0] == target);

    // Return if already computed
    if(dp[index][target] != -1) return dp[index][target];

    // Not pick the current element
    bool notPick = f(index - 1, target, arr, dp);

    // Pick the current element if it's not greater than target
    bool pick = false;
    if(arr[index] <= target)
        pick = f(index - 1, target - arr[index], arr, dp);

    return dp[index][target] = pick || notPick;
}

bool subsetSumToK(int n, int k, vector<int> &arr) {
    vector<vector<int>> dp(n, vector<int>(k + 1, -1));
    return f(n - 1, k, arr, dp);
}

```

---

---

### Solution: Tabulation

```cpp
#include <bits/stdc++.h>
using namespace std;

bool subsetSumToK(int n, int k, vector<int> &arr) {
    vector<vector<bool>> dp(n, vector<bool>(k + 1, false));

    // Fill base cases
    for(int i = 0; i < n; i++)
        dp[i][0] = true; // sum 0 is always possible

    if(arr[0] <= k)
        dp[0][arr[0]] = true;

    // Fill DP table
    for(int index = 1; index < n; index++){
        for(int target = 1; target <= k; target++){
            bool notPick = dp[index - 1][target];
            bool pick = false;
            if(arr[index] <= target)
                pick = dp[index - 1][target - arr[index]];

            dp[index][target] = pick || notPick;
        }
    }

    return dp[n - 1][k];
}

```

---

---

### Solution: Space Optimized

```cpp
#include <bits/stdc++.h>
using namespace std;

bool subsetSumToK(int n, int k, vector<int> &arr) {
    vector<bool> prev(k + 1, false), curr(k + 1, false);

    prev[0] = true;
    if(arr[0] <= k) prev[arr[0]] = true;

    for(int index = 1; index < n; index++){
        curr[0] = true; // every row starts with target 0 as true
        for(int target = 1; target <= k; target++){
            bool notPick = prev[target];
            bool pick = false;
            if(arr[index] <= target)
                pick = prev[target - arr[index]];

            curr[target] = pick || notPick;
        }
        prev = curr;
    }

    return prev[k];
}

```

---

### ✅ **How It Works**

- You're given an array of `n` integers and a target sum `k`.
- You need to **determine whether any subset** of the array sums up to exactly `k`.
- At each index, you can either **include** or **exclude** the current element.
- Use **Dynamic Programming** to avoid recalculating overlapping subproblems.

---

### 🧩 **Key Formula**

- `dp[i][target] = dp[i-1][target] || dp[i-1][target - arr[i]]`
    - **Exclude**: don’t pick the current element.
    - **Include**: pick the current element if `arr[i] <= target`.

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Recursion Only ❌ | 2^n | O(n) stack |
| Memoization ✅ | O(n*k) | O(n*k) |
| Tabulation ✅ | O(n*k) | O(n*k) |
| Space Optimized ✅ | O(n*k) | O(k) |

---

### ⚠️ **Edge Cases**

- Target `k = 0`: Always `true` (empty subset).
- Single element equal to `k`: Should return `true`.
- All elements greater than `k`: Return `false`.
- Negative numbers not allowed (standard version).

---

### 💡 **Other Approaches**

| Approach | Valid When |
| --- | --- |
| Recursion Only ❌ | Just for understanding |
| Recursion + Memo ✅ | Top-down with cache |
| Tabulation ✅ | Bottom-up DP |
| Space Optimization ✅ | Use only 1D array (rolling) |

---

### 🔁 **Related Problems**

- 🟡 Partition Equal Subset Sum
- 🟡 Count Subsets with Sum K
- 🟡 Target Sum (LeetCode)
- 🟡 Minimum Subset Sum Difference
- 🟡 0/1 Knapsack Problem