---
title: Coin Change - II
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - subsequences
---

### Problem Statement:

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return *the number of combinations that make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The answer is **guaranteed** to fit into a signed **32-bit** integer.

- Example:
    
    ```
    Example 1:
    
    Input: amount = 5, coins = [1,2,5]
    Output: 4
    Explanation: there are four ways to make up the amount:
    5=5
    5=2+2+1
    5=2+1+1+1
    5=1+1+1+1+1
    Example 2:
    
    Input: amount = 3, coins = [2]
    Output: 0
    Explanation: the amount of 3 cannot be made up just with coins of 2.
    Example 3:
    
    Input: amount = 10, coins = [10]
    Output: 1
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    // Recursive function to count ways to reach 'target' using coins[0...ind]
    int solve(int ind, int target, vector<int> &coins, vector<vector<int>>&dp){
        // Base case: when using only the first coin
        if(ind == 0){
            return target % coins[0] == 0 ? 1 : 0;
        }

        if(dp[ind][target] != -1) return dp[ind][target];

        int notTake = solve(ind - 1, target, coins, dp);  // skip coin
        int take = 0;
        if(coins[ind] <= target){
            take = solve(ind, target - coins[ind], coins, dp);  // reuse coin
        }

        return dp[ind][target] = take + notTake;
    }

    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, -1));
        return solve(n - 1, amount, coins, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, 0));

        // Initialize base case: using only the first coin
        for(int t = 0; t <= amount; t++){
            if(t % coins[0] == 0) dp[0][t] = 1;
        }

        // Bottom-up DP
        for(int ind = 1; ind < n; ind++){
            for(int target = 0; target <= amount; target++){
                int notTake = dp[ind - 1][target]; // don't take current coin
                int take = 0;
                if(coins[ind] <= target){
                    take = dp[ind][target - coins[ind]]; // take current coin
                }
                dp[ind][target] = take + notTake;
            }
        }

        return dp[n - 1][amount];
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        vector<int> prev(amount + 1, 0);

        // Initialize base case
        for(int t = 0; t <= amount; t++){
            if(t % coins[0] == 0) prev[t] = 1;
        }

        // Bottom-up DP using rolling array
        for(int ind = 1; ind < n; ind++){
            vector<int> curr(amount + 1, 0);
            for(int target = 0; target <= amount; target++){
                int notTake = prev[target];
                int take = 0;
                if(coins[ind] <= target){
                    take = curr[target - coins[ind]];
                }
                curr[target] = take + notTake;
            }
            prev = curr;
        }

        return prev[amount];
    }
};

```

---

## 📝 Revision Notes – Coin Change II

---

### ✅ How It Works

- You're given a set of coins and a total amount.
- You need to find the **number of combinations** to make the amount (order doesn't matter).
- It's a **classic unbounded knapsack** variation:
    - You can take a coin **as many times** as you want.
    - But the order of coins does not matter.

---

### 🧩 Key Formula / Recurrence

```
f(ind, target) =
    f(ind - 1, target)                  // not take current coin
  + f(ind, target - coins[ind])         // take current coin again

```

---

### ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × Amount) | O(N × Amount) |
| Tabulation | O(N × Amount) | O(N × Amount) |
| Space Optimized | O(N × Amount) | O(Amount) |

Where `N = number of coins`

---

### ⚠️ Edge Cases

- `amount = 0` → Always return 1 (empty set is a valid combination)
- Coins with large denominations → might have 0 combinations
- Duplicate denominations don't affect outcome since we consider combinations

---

### 💡 Other Approaches

| Type | Use Case |
| --- | --- |
| Brute Force (DFS) | ❌ Too slow |
| Memoization ✅ | Good for clarity |
| Tabulation ✅ | Iterative and efficient |
| Space Optimized ✅ | Best for constraints |

---

### 🔁 Related Problems

- Leetcode 518 – **Coin Change II**
- Leetcode 322 – Coin Change (minimum number of coins)
- GFG – Count number of ways to reach a given score
- Subset Sum / Unbounded Knapsack

---