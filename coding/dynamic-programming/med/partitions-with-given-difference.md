---
title: Partitions With Given Difference
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

Given an array ‘ARR’, partition it into two subsets (possibly empty) such that their union is the original array. Let the sum of the elements of these two subsets be ‘S1’ and ‘S2’.

Given a difference ‘D’, count the number of partitions in which ‘S1’ is greater than or equal to ‘S2’ and the difference between ‘S1’ and ‘S2’ is equal to ‘D’. Since the answer may be too large, return it modulo ‘10^9 + 7’.

If ‘Pi_Sj’ denotes the Subset ‘j’ for Partition ‘i’. Then, two partitions P1 and P2 are considered different if:

```
1) P1_S1 != P2_S1 i.e, at least one of the elements of P1_S1 is different from P2_S2.
2) P1_S1 == P2_S2, but the indices set represented by P1_S1 is not equal to the indices set of P2_S2. Here, the indices set of P1_S1 is formed by taking the indices of the elements from which the subset is formed.
Refer to the example below for clarification.

```

Note that the sum of the elements of an empty subset is 0.

**For example :**

```
If N = 4, D = 3, ARR = {5, 2, 5, 1}
There are only two possible partitions of this array.
Partition 1: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
Partition 2: {5, 2, 1}, {5}. The subset difference between subset sum is: (5 + 2 + 1) - (5) = 3
These two partitions are different because, in the 1st partition, S1 contains 5 from index 0, and in the 2nd partition, S1 contains 5 from index 2.
```

- Example:
    
    ```
    
    ```
    

---

---

### Solution: Memization

```cpp
#include <bits/stdc++.h> 
int mod =(int)1e9+7;
int f(int ind, int target, vector<int>& arr, vector<vector<int>>& dp) {
    
    // Base case: If we have considered all elements and the target is still not 0, return 0
    if (ind == 0){
        if(target == 0 && arr[0] == 0) return 2;
        if(arr[0] == target || target == 0) return 1;
        return 0;
    }
    // If the result for this state is already calculated, return it
    if (dp[ind][target] != -1)
        return dp[ind][target];

    // Recursive cases
    // 1. Exclude the current element
    int notTaken = f(ind - 1, target, arr, dp);

    // 2. Include the current element if it doesn't exceed the target
    int taken = 0;
    if (arr[ind] <= target)
        taken = f(ind - 1, target - arr[ind], arr, dp);

    // Store the result in the DP table and return
    return dp[ind][target] = (notTaken + taken) % mod;
}
int countPartitions(int n, int d, vector<int> &arr) {
    // Write your code here.
    int totSum = 0;
    for(int i = 0; i < n; i++){
        totSum += arr[i];
    }
    int S2 = 0;
    if((totSum - d)%2 == 1) return false;
    else{
        S2 = (totSum - d) / 2;
    }

    vector<vector<int>>dp(n, vector<int>(S2 + 1, -1));
    return f(n - 1, S2, arr, dp);
}

```

---

---

### Solution: Tabulation

```cpp
#include <bits/stdc++.h>
int mod = (int)1e9 + 7;

int countPartitions(int n, int d, vector<int> &arr) {
    int totSum = accumulate(arr.begin(), arr.end(), 0);

    // Check if valid partition is possible
    if (totSum < d || (totSum - d) % 2 != 0)
        return 0;

    int S2 = (totSum - d) / 2;

    vector<vector<int>> dp(n, vector<int>(S2 + 1, 0));

    // Base case initialization
    if (arr[0] == 0)
        dp[0][0] = 2; // Pick or not pick
    else
        dp[0][0] = 1; // Only not pick

    if (arr[0] != 0 && arr[0] <= S2)
        dp[0][arr[0]] = 1;

    for (int ind = 1; ind < n; ind++) {
        for (int target = 0; target <= S2; target++) {
            int notTaken = dp[ind - 1][target];
            int taken = 0;
            if (arr[ind] <= target)
                taken = dp[ind - 1][target - arr[ind]];
            dp[ind][target] = (notTaken + taken) % mod;
        }
    }

    return dp[n - 1][S2];
}

```

---

---

### Solution: Space Optimized

```cpp
#include <bits/stdc++.h>
int mod = (int)1e9 + 7;

int countPartitions(int n, int d, vector<int> &arr) {
    int totSum = accumulate(arr.begin(), arr.end(), 0);

    if (totSum < d || (totSum - d) % 2 != 0)
        return 0;

    int S2 = (totSum - d) / 2;

    vector<int> prev(S2 + 1, 0);

    // Base case
    if (arr[0] == 0)
        prev[0] = 2;
    else
        prev[0] = 1;

    if (arr[0] != 0 && arr[0] <= S2)
        prev[arr[0]] = 1;

    for (int ind = 1; ind < n; ind++) {
        vector<int> curr(S2 + 1, 0);
        for (int target = 0; target <= S2; target++) {
            int notTaken = prev[target];
            int taken = 0;
            if (arr[ind] <= target)
                taken = prev[target - arr[ind]];
            curr[target] = (notTaken + taken) % mod;
        }
        prev = curr;
    }

    return prev[S2];
}

```

---

### ✅ **How It Works**

- You are given an array `arr` and an integer `d`.
- Find the number of ways to partition the array into **two subsets** `S1` and `S2` such that:Sum(S1)−Sum(S2)=d
    
    Sum(S1)−Sum(S2)=d\text{Sum}(S1) - \text{Sum}(S2) = d
    
- This reduces to:Find number of subsets with sum=2totalSum - d
    $$
    \text{Find number of subsets with sum} = \frac{\text{totalSum - d}}{2}
    $$

---

### 🧩 **Key Formula**

- Let `target = (totalSum - d) / 2`
- `dp[i][target] = dp[i-1][target] + dp[i-1][target - arr[i]]`
- Be careful with:
    - Zeros (handled specially)
    - Negative or non-even (totalSum - d)

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Tabulation | O(n×k) | O(n×k) |
| Space Optimization | O(n×k) | O(k) |

`k = (totalSum - d)/2`

---

### ⚠️ **Edge Cases**

- If `totalSum < d`: return 0
- If `(totalSum - d) % 2 != 0`: return 0
- Zeros: Must consider 2 options (pick / not pick)

---

### 💡 **Other Approaches**

| Technique | Comment |
| --- | --- |
| Recursion | Exponential ❌ |
| Memoization | Possible ✅ |
| Tabulation | Standard ✅ |
| Space Optimized | Best ✅ |

---

### 🔁 **Related Problems**

- Subset Sum
- Count Subsets with Given Sum
- Partition Equal Subset Sum
- Target Sum (Leetcode #494)