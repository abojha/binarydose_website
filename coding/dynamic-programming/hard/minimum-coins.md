---
title: Minimum Coins
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

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

- Example:
    
    ```
    Example 1:
    
    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
    Example 2:
    
    Input: coins = [2], amount = 3
    Output: -1
    Example 3:
    
    Input: coins = [1], amount = 0
    Output: 0
    ```
    

---

---

### Solution: Memization

```cpp
class Solution {
public:
    // Recursive function with memoization
    int f(int index, vector<int> &coins, int amount, vector<vector<int>> &dp){
        // Base case: if only one coin type
        if(index == 0){
            if(amount % coins[index] == 0)
                return amount / coins[index];
            else
                return 1e9;  // impossible
        }

        // If already computed
        if(dp[index][amount] != -1) return dp[index][amount];

        // Don't take the current coin
        int notTake = f(index - 1, coins, amount, dp);

        // Take the coin if it's <= amount
        int take = 1e9;
        if(coins[index] <= amount){
            take = 1 + f(index, coins, amount - coins[index], dp);
        }

        // Store and return min of take/not-take
        return dp[index][amount] =  min(take, notTake);
    }

    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, -1));
        int result = f(n - 1, coins, amount, dp);
        return (result >= 1e9) ? -1 : result;
    }
};

```

---

---

### Solution: Tabulation

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<vector<int>> dp(n, vector<int>(amount + 1, 0));
        
        // Initialize base case (row 0)
        for(int rem = 0; rem <= amount; rem++){
            if(rem % coins[0] == 0){
                dp[0][rem] = rem / coins[0];
            }
            else
                dp[0][rem] = 1e9;
        }

        for(int i = 1; i < n; i++){
            for(int target = 0; target <= amount; target++){
                int notTake = dp[i - 1][target];
                int take = 1e9;

                if(coins[i] <= target){
                    take = 1 + dp[i][target - coins[i]];
                }

                dp[i][target] = min(take, notTake);
            }
        }
        int result = dp[n-1][amount];
        return result >= 1e9 ? -1 : result;
    }
};

```

---

---

### Solution: Space Optimized

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int n = coins.size();
        vector<int> prev(amount + 1, 0);
        
        // Initialize base row
        for(int rem = 0; rem <= amount; rem++){
            if(rem % coins[0] == 0){
                prev[rem] = rem / coins[0];
            }
            else
                prev[rem] = 1e9;
        }

        for(int i = 1; i < n; i++){
            vector<int> curr(amount + 1, 0);
            for(int target = 0; target <= amount; target++){
                int notTake = prev[target];
                int take = 1e9;

                if(coins[i] <= target){
                    take = 1 + curr[target - coins[i]];
                }

                curr[target] = min(take, notTake);
            }
            prev = curr;
        }
        int result = prev[amount];
        return result >= 1e9 ? -1 : result;
    }
};

```

---

### ✅ **How It Works**

- We are given coin denominations and a target `amount`.
- We must use the fewest number of coins to make up that `amount`.
- We apply **dynamic programming** to build solutions from smaller subproblems.
- We have three options: **memoization**, **tabulation**, and **space optimization**.

---

### 🧩 **Key Formula**

```cpp
cpp
CopyEdit
dp[i][amt] = min(dp[i-1][amt], 1 + dp[i][amt - coins[i]]) if coins[i] <= amt

```

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization (Top-Down) | O(n * amount) | O(n * amount) |
| Tabulation | O(n * amount) | O(n * amount) |
| Space Optimized | O(n * amount) | O(amount) |

---

### ⚠️ **Edge Cases**

- `amount = 0`: Always 0 coins.
- No combination adds up: Return `1`.
- Coins contain 1: Will always find a solution.
- All denominations larger than amount.

---

### 💡 **Other Approaches**

| Approach | Time Complexity |
| --- | --- |
| Recursion only ❌ | Exponential |
| Memoization ✅ | O(n * amount) |
| Tabulation ✅ | O(n * amount) |
| Space Optimized ✅ | O(n * amount) |

---

### 🔁 **Related Problems**

- **Coin Change 2** – Count number of ways to make amount.
- **Unbounded Knapsack** – Classic variation.
- **Minimum Number of Jumps**
- **Subset Sum Variants**