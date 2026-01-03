---
title: Count Subsets with Sum K
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

We are given an array ‘ARR’ with N positive integers and an integer K. We need to find the number of subsets whose sum is equal to K.

- Example:
    
    ```
    
    ```
    

---

---

### Solution: Memoization

```cpp
#include <bits/stdc++.h>
using namespace std;
int mod = 1e9 + 7;

int countSubsets(int ind, int target, vector<int> &arr, vector<vector<int>> &dp) {
    if(ind == 0){
        if(target == 0 && arr[0] == 0) return 2;
        if(target == 0 || arr[0] == target) return 1;
        return 0;
    }

    if(dp[ind][target] != -1) return dp[ind][target];

    int notTaken = countSubsets(ind - 1, target, arr, dp);
    int taken = 0;
    if(arr[ind] <= target)
        taken = countSubsets(ind - 1, target - arr[ind], arr, dp);

    return dp[ind][target] = (taken + notTaken) % mod;
}

int findWays(vector<int>& arr, int k) {
    int n = arr.size();
    vector<vector<int>> dp(n, vector<int>(k + 1, -1));
    return countSubsets(n - 1, k, arr, dp);
}

```

---

---

### Solution: Tabulation

```cpp
#include <bits/stdc++.h>
using namespace std;
int mod = 1e9 + 7;

int findWays(vector<int>& arr, int k) {
    int n = arr.size();
    vector<vector<int>> dp(n, vector<int>(k + 1, 0));

    // Base cases
    if(arr[0] == 0) dp[0][0] = 2; // pick or not pick 0
    else dp[0][0] = 1;

    if(arr[0] != 0 && arr[0] <= k)
        dp[0][arr[0]] = 1;

    for(int i = 1; i < n; i++){
        for(int target = 0; target <= k; target++){
            int notTaken = dp[i - 1][target];
            int taken = 0;
            if(arr[i] <= target)
                taken = dp[i - 1][target - arr[i]];
            dp[i][target] = (taken + notTaken) % mod;
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
int mod = 1e9 + 7;

int findWays(vector<int>& arr, int k) {
    int n = arr.size();
    vector<int> prev(k + 1, 0);

    if(arr[0] == 0) prev[0] = 2;
    else prev[0] = 1;

    if(arr[0] != 0 && arr[0] <= k)
        prev[arr[0]] = 1;

    for(int i = 1; i < n; i++){
        vector<int> curr(k + 1, 0);
        for(int target = 0; target <= k; target++){
            int notTaken = prev[target];
            int taken = 0;
            if(arr[i] <= target)
                taken = prev[target - arr[i]];
            curr[target] = (taken + notTaken) % mod;
        }
        prev = curr;
    }
    return prev[k];
}

```

---

### ✅ **How It Works**

- You are given an array `arr` and a target `sum k`.
- You must count the number of **distinct subsets** of the array whose elements sum up exactly to `k`.
- Apply dynamic programming to count combinations while avoiding recomputation.

---

### 🧩 **Key Formula**

`dp[i][target] = dp[i-1][target] + dp[i-1][target - arr[i]]`

- `dp[i][target]`: number of ways to get `target` using first `i` elements.
- Add:
    - Ways by **not picking** `arr[i]`
    - Ways by **picking** `arr[i]` if it's `≤ target`

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × k) | O(N × k) |
| Tabulation | O(N × k) | O(N × k) |
| Space Optimized | O(N × k) | O(k) |

---

### ⚠️ **Edge Cases**

- `arr[i] == 0`: must consider 2 ways (pick or not pick).
- `k == 0`: always at least one way (empty set).
- All elements are larger than `k`: return 0.
- Large arrays: use modulo to avoid overflow (`mod = 1e9+7`).

---

### 💡 **Other Approaches**

| Technique | Comment |
| --- | --- |
| Recursion only | Exponential ❌ |
| Memoization | Top-down ✅ |
| Tabulation | Bottom-up ✅ |
| Space Optimization | Best in practice ✅ |

---

### 🔁 **Related Problems**

- Subset Sum Problem
- Target Sum (with +/- signs)
- Partition Equal Subset Sum
- Count Partitions with Given Difference