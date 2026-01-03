---
title: But and Sell Stock - III
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

Find the maximum profit you can achieve. You may complete **at most two transactions**.

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

- Example:
    
    ```
    Example 1:
    
    Input: prices = [3,3,5,0,0,3,1,4]
    Output: 6
    Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
    Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
    Example 2:
    
    Input: prices = [1,2,3,4,5]
    Output: 4
    Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
    Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
    Example 3:
    
    Input: prices = [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transaction is done, i.e. max profit = 0.
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, vector<int> &prices, int buyOrSell, int cap, vector<vector<vector<int>>> &dp){
        if(ind == prices.size() || cap == 0) return 0;

        if(dp[ind][buyOrSell][cap] != -1) return dp[ind][buyOrSell][cap];

        int op1 = 0, op2 = 0;
        if(buyOrSell == 0){
            // Either skip buying or buy at current price
            op1 = solve(ind + 1, prices, 0, cap, dp);
            op2 = -prices[ind] + solve(ind + 1, prices, 1, cap, dp);
        }
        else{
            // Either skip selling or sell at current price
            op1 = solve(ind + 1, prices, 1, cap, dp);
            op2 = prices[ind] + solve(ind + 1, prices, 0, cap - 1, dp);
        }

        return dp[ind][buyOrSell][cap] = max(op1, op2);
    }

    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int cap = 2; // Only 2 transactions allowed
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(3, -1)));
        return solve(0, prices, 0, cap, dp);
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
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(3, 0)));

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                for(int cap = 1; cap <= 2; cap++){
                    if(buy == 0){
                        dp[i][buy][cap] = max(dp[i + 1][0][cap], -prices[i] + dp[i + 1][1][cap]);
                    } else {
                        dp[i][buy][cap] = max(dp[i + 1][1][cap], prices[i] + dp[i + 1][0][cap - 1]);
                    }
                }
            }
        }

        return dp[0][0][2];
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
        vector<vector<int>> next(2, vector<int>(3, 0)), curr(2, vector<int>(3, 0));

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                for(int cap = 1; cap <= 2; cap++){
                    if(buy == 0){
                        curr[buy][cap] = max(next[0][cap], -prices[i] + next[1][cap]);
                    } else {
                        curr[buy][cap] = max(next[1][cap], prices[i] + next[0][cap - 1]);
                    }
                }
            }
            next = curr;
        }

        return next[0][2];
    }
};

```

---

## 📝 How It Works

- You are allowed **at most 2 transactions**.
- At every index `i`, with a state:
    - `buy == 0`: you can buy or skip
    - `buy == 1`: you can sell or skip
    - `cap`: remaining number of transactions
- You update `dp[i][buy][cap]` based on choices:
    - If buying: `max(skip, buy)`
    - If selling: `max(skip, sell & reduce cap)`

---

## 🧩 Key Formula / Recurrence

```cpp
if(buy == 0)
    dp[i][buy][cap] = max(dp[i+1][0][cap], -prices[i] + dp[i+1][1][cap])
else
    dp[i][buy][cap] = max(dp[i+1][1][cap], prices[i] + dp[i+1][0][cap - 1])

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × 2 × 3) = O(N) | O(N × 2 × 3) = O(N) |
| Tabulation | O(N) | O(N) |
| Space Optimized | O(N) | O(1) ✅ |

---

## ⚠️ Edge Cases

- `prices = []` → return 0
- Single element → no transaction possible
- All increasing or decreasing

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Greedy | ❌ Not valid for k transactions |
| DFS + Pruning | ❌ Too slow |
| Segment Tree | ❌ Overkill for simple k = 2 case |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock I](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)
- [Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

---