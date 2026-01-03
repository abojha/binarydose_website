---
title: Partition Equal Subset Sum
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

You are given an array 'ARR' of 'N' positive integers. Your task is to find if we can partition the given array into two subsets such that the sum of elements in both subsets is equal.

For example, let’s say the given array is [2, 3, 3, 3, 4, 5], then the array can be partitioned as [2, 3, 5], and [3, 3, 4] with equal sum 10.

Follow Up:

```
Can you solve this using not more than O(S) extra space, where S is the sum of all elements of the given array?
```

- Example:
    
    ```
    Sample Input 1:
    2
    6
    3 1 1 2 2 1
    5
    5 6 5 11 6
    Sample Output 1:
    true
    false    
    Explanation Of Sample Input 1:
    For the first test case, the array can be partitioned as ([2,1,1,1] and [3, 2]) or ([2,2,1], and [1,1,3]) with sum 5.
    
    For the second test case, the array can’t be partitioned.
    Sample Input 2:
    2
    9
    2 2 1 1 1 1 1 3 3
    6
    8 7 6 12 4 5
    Sample Output 2:
    false
    true
    ```
    

---

---

### Solution:

```cpp
#include <bits/stdc++.h>
using namespace std;

bool subsetSum(int index, int target, vector<int>& arr, vector<vector<int>>& dp){
    // Base cases
    if(target == 0) return true;
    if(index == 0) return arr[0] == target;

    if(dp[index][target] != -1) return dp[index][target];

    // Exclude current
    bool notTake = subsetSum(index - 1, target, arr, dp);
    
    // Include current (only if not greater than target)
    bool take = false;
    if(arr[index] <= target)
        take = subsetSum(index - 1, target - arr[index], arr, dp);
    
    return dp[index][target] = take || notTake;
}

bool canPartition(vector<int> &arr, int n) {
    int total = accumulate(arr.begin(), arr.end(), 0);

    if(total % 2 != 0) return false;

    int target = total / 2;
    vector<vector<int>> dp(n, vector<int>(target + 1, -1));
    return subsetSum(n - 1, target, arr, dp);
}

```

---

---

### Solution:

```cpp
#include <bits/stdc++.h>
using namespace std;

bool canPartition(vector<int> &arr, int n) {
    int total = accumulate(arr.begin(), arr.end(), 0);
    if(total % 2 != 0) return false;

    int k = total / 2;
    vector<vector<bool>> dp(n, vector<bool>(k + 1, false));

    // Initializations
    for(int i = 0; i < n; i++) dp[i][0] = true;
    if(arr[0] <= k) dp[0][arr[0]] = true;

    // Filling the table
    for(int i = 1; i < n; i++) {
        for(int target = 1; target <= k; target++) {
            bool notTake = dp[i - 1][target];
            bool take = false;
            if(arr[i] <= target)
                take = dp[i - 1][target - arr[i]];

            dp[i][target] = take || notTake;
        }
    }

    return dp[n - 1][k];
}

```

---

---

### Solution:

```cpp
#include <bits/stdc++.h>
using namespace std;

bool canPartition(vector<int> &arr, int n) {
    int total = accumulate(arr.begin(), arr.end(), 0);
    if(total % 2 != 0) return false;

    int k = total / 2;
    vector<bool> prev(k + 1, false), curr(k + 1, false);

    prev[0] = true;
    if(arr[0] <= k) prev[arr[0]] = true;

    for(int i = 1; i < n; i++) {
        curr[0] = true; // target = 0 always true
        for(int target = 1; target <= k; target++) {
            bool notTake = prev[target];
            bool take = false;
            if(arr[i] <= target)
                take = prev[target - arr[i]];

            curr[target] = take || notTake;
        }
        prev = curr;
    }

    return prev[k];
}

```

---

### ✅ **How It Works**

- You're given an array, and you must check if it can be partitioned into **two subsets with equal sum**.
- The problem reduces to checking if there's **any subset with sum equal to totalSum / 2**.
- Classic application of **subset sum DP**.

---

### 🧩 **Key Formula**

- `dp[i][target] = dp[i-1][target] || dp[i-1][target - arr[i]]`

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Recursion Only ❌ | Exponential | O(n) |
| Memoization ✅ | O(n * sum) | O(n * sum) |
| Tabulation ✅ | O(n * sum) | O(n * sum) |
| Space Optimized ✅ | O(n * sum) | O(sum) |

---

### ⚠️ **Edge Cases**

- Total sum is odd → can't divide equally.
- Single element array.
- Array with all zeroes.

---

### 💡 **Other Approaches**

| Approach | Status |
| --- | --- |
| Recursion ❌ | TLE |
| Rec + Memo ✅ | Optimal |
| Tabulation ✅ | Optimal |
| Space Optimized ✅ | Best |

---

### 🔁 **Related Problems**

- Subset Sum Equals K
- Count Subsets with Sum K
- Target Sum (Leetcode)
- Equal Sum Partition (Variation)
- Minimum Subset Sum Difference