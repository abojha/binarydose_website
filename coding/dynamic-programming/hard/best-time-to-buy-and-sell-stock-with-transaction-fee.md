---
title: Best Time to Buy and Sell Stock with Transaction Fee
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - stocks
---

### Problem Statement:

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Note:**

- You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
- The transaction fee is only charged once for each stock purchase and sale.
- Example:
    
    ```
    Example 1:
    
    Input: prices = [1,3,2,8,4,9], fee = 2
    Output: 8
    Explanation: The maximum profit can be achieved by:
    - Buying at prices[0] = 1
    - Selling at prices[3] = 8
    - Buying at prices[4] = 4
    - Selling at prices[5] = 9
    The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
    Example 2:
    
    Input: prices = [1,3,7,5,10,3], fee = 3
    Output: 6
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, vector<int> &prices, int buyOrSell, int fee, vector<vector<int>> &dp){
        if(ind == prices.size()) return 0;

        if(dp[ind][buyOrSell] != -1) return dp[ind][buyOrSell];

        int op1 = 0, op2 = 0;
        if(buyOrSell == 0){
            // Skip or Buy
            op1 = solve(ind + 1, prices, 0, fee, dp);
            op2 = -prices[ind] + solve(ind + 1, prices, 1, fee, dp);
        } else {
            // Skip or Sell (with fee)
            op1 = solve(ind + 1, prices, 1, fee, dp);
            op2 = prices[ind] - fee + solve(ind + 1, prices, 0, fee, dp);
        }

        return dp[ind][buyOrSell] = max(op1, op2);
    }

    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, -1));
        return solve(0, prices, 0, fee, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                if(buy == 0){
                    dp[i][buy] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
                } else {
                    dp[i][buy] = max(dp[i + 1][1], prices[i] - fee + dp[i + 1][0]);
                }
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
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        vector<int> next(2, 0), curr(2, 0);

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                if(buy == 0){
                    curr[buy] = max(next[0], -prices[i] + next[1]);
                } else {
                    curr[buy] = max(next[1], prices[i] - fee + next[0]);
                }
            }
            next = curr;
        }

        return curr[0];
    }
};

```

---

## 📝 How It Works

- You're allowed to **buy and sell** as many times as you want, **but you pay a fixed transaction fee** every time you sell.
- The `dp[i][buy]` state stores the **maximum profit starting from day `i`** with either:
    - `buy == 0`: we can buy
    - `buy == 1`: we must sell
- Transition:
    - If buying: either buy today or skip
    - If selling: either sell today and **pay the fee**, or skip

---

## 🧩 Key Formula / Recurrence

```cpp
if(buy == 0)
    dp[i][buy] = max(dp[i+1][0], -prices[i] + dp[i+1][1])
else
    dp[i][buy] = max(dp[i+1][1], prices[i] - fee + dp[i+1][0])

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × 2) | O(N × 2) |
| Tabulation | O(N × 2) | O(N × 2) |
| Space Optimized | O(N × 2) | O(1) ✅ |

---

## ⚠️ Edge Cases

- `prices = []` → return 0
- Fee is greater than any potential profit → better not to trade
- All prices decreasing → no trades done, profit = 0

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Greedy | ❌ Doesn’t work for dynamic pricing |
| DP | ✅ Best balance for flexibility |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock I](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)

---