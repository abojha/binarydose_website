---
title: Buy and Sell Stock - II
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - stocks
---

### Problem Statement:

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return *the **maximum** profit you can achieve*.

- Example:
    
    ```
    Example 1:
    
    Input: prices = [7,1,5,3,6,4]
    Output: 7
    Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
    Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
    Total profit is 4 + 3 = 7.
    Example 2:
    
    Input: prices = [1,2,3,4,5]
    Output: 4
    Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
    Total profit is 4.
    Example 3:
    
    Input: prices = [7,6,4,3,1]
    Output: 0
    Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, vector<int> prices, int buyOrSell, vector<vector<int>> &dp){
        if(ind == prices.size())
            return 0;

        if(dp[ind][buyOrSell] != -1) return dp[ind][buyOrSell];

        int op1 = 0, op2 = 0;
        if(buyOrSell == 0){
            // Either skip buying or buy at current price
            op1 = solve(ind + 1, prices, 0, dp);
            op2 = -prices[ind] + solve(ind + 1, prices, 1, dp);
        }
        if(buyOrSell == 1){
            // Either skip selling or sell at current price
            op1 = solve(ind + 1, prices, 1, dp);
            op2 = prices[ind] + solve(ind + 1, prices, 0, dp);
        }

        return dp[ind][buyOrSell] = max(op1, op2);
    }

    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, -1));
        return solve(0, prices, 0, dp); // 0 = buy allowed
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0)); // dp[i][0]: buy, dp[i][1]: sell

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy < 2; buy++){
                if(buy == 0){
                    dp[i][buy] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
                } else {
                    dp[i][buy] = max(dp[i + 1][1], prices[i] + dp[i + 1][0]);
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
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> next(2, 0), curr(2, 0);

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy < 2; buy++){
                if(buy == 0){
                    curr[buy] = max(next[0], -prices[i] + next[1]);
                } else {
                    curr[buy] = max(next[1], prices[i] + next[0]);
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

- You can buy and sell stocks **multiple times**, but **only one stock at a time**.
- For each day and state (buy/sell), decide:
    - If **buy allowed**: buy or skip.
    - If **sell allowed**: sell or skip.
- Use `dp[ind][buyOrSell]` to memoize answers to subproblems.

---

## 🧩 Key Formula / Recurrence

Let `dp[i][buy]` represent max profit on day `i` with buy permission:

```cpp
if(buy == 0)
    dp[i][0] = max(dp[i+1][0], -prices[i] + dp[i+1][1])
else
    dp[i][1] = max(dp[i+1][1], prices[i] + dp[i+1][0])

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(n × 2) | O(n × 2) |
| Tabulation | O(n × 2) | O(n × 2) |
| Space Optimized | O(n × 2) | O(1 × 2) = O(1) ✅ |

---

## ⚠️ Edge Cases

- Empty array → return 0
- All decreasing prices → return 0
- All increasing → buy on day 0, sell on last day (sum of differences)

---

## 💡 Other Approaches

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Greedy (sum of all increasing differences) | O(n) | O(1) | Efficient for this problem |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock I (1 transaction)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Best Time to Buy and Sell Stock III (2 transactions)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [Best Time to Buy and Sell Stock IV (k transactions)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

---