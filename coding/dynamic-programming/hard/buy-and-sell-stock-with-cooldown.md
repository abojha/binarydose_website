---
title: Buy and Sell Stock with Cooldown
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - stocks
---

### Problem Statement:

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

- Example:
    
    ```
    Example 1:
    
    Input: prices = [1,2,3,0,2]
    Output: 3
    Explanation: transactions = [buy, sell, cooldown, buy, sell]
    Example 2:
    
    Input: prices = [1]
    Output: 0
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, vector<int> &prices, int buyOrSell, vector<vector<int>> &dp){
        if(ind >= prices.size()) return 0;

        if(dp[ind][buyOrSell] != -1) return dp[ind][buyOrSell];

        int op1 = 0, op2 = 0;
        if(buyOrSell == 0){
            // Skip or Buy
            op1 = solve(ind + 1, prices, 0, dp); // Skip
            op2 = -prices[ind] + solve(ind + 1, prices, 1, dp); // Buy
        } else {
            // Skip or Sell (with cooldown)
            op1 = solve(ind + 1, prices, 1, dp); // Skip
            op2 = prices[ind] + solve(ind + 2, prices, 0, dp); // Sell and cooldown
        }

        return dp[ind][buyOrSell] = max(op1, op2);
    }

    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, -1));
        return solve(0, prices, 0, dp);
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
        vector<vector<int>> dp(n + 2, vector<int>(2, 0)); // dp[i][buy]

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                if(buy == 0){
                    dp[i][buy] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
                } else {
                    dp[i][buy] = max(dp[i + 1][1], prices[i] + dp[i + 2][0]);
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
        vector<int> next1(2, 0), next2(2, 0), curr(2, 0);

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                if(buy == 0){
                    curr[buy] = max(next1[0], -prices[i] + next1[1]);
                } else {
                    curr[buy] = max(next1[1], prices[i] + next2[0]);
                }
            }
            next2 = next1;
            next1 = curr;
        }

        return curr[0];
    }
};

```

---

## 📝 How It Works

- You can buy and sell multiple times **with one restriction**: after selling, you **must cooldown** for **1 day** (i.e., skip the next day).
- State is represented by:
    - `ind`: current day
    - `buy`: whether we can buy (0) or must sell (1)
- Transitions:
    - When buying: `max(skip, buy)`
    - When selling: `max(skip, sell and cooldown)`

---

## 🧩 Key Formula / Recurrence

```cpp
if(buy == 0)
    dp[i][buy] = max(dp[i+1][0], -prices[i] + dp[i+1][1])
else
    dp[i][buy] = max(dp[i+1][1], prices[i] + dp[i+2][0])

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N×2) | O(N×2) |
| Tabulation | O(N×2) | O(N×2) |
| Space Optimized | O(N×2) | O(1) ✅ |

---

## ⚠️ Edge Cases

- `prices = []` → return 0
- Only 1 day of prices → no action possible
- All increasing prices → buy once, sell as late as possible
- All decreasing prices → don't buy at all

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Greedy | ❌ Doesn't work with cooldown |
| DFS Only | ❌ Too slow |
| DP | ✅ Best approach here |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock I](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)

---