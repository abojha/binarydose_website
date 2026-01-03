---
title: Buy and Sell Stock - IV
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - stocks
---

### Problem Statement:

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `k`.

Find the maximum profit you can achieve. You may complete at most `k` transactions: i.e. you may buy at most `k` times and sell at most `k` times.

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

- Example:
    
    ```
    Example 1:
    
    Input: k = 2, prices = [2,4,1]
    Output: 2
    Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
    Example 2:
    
    Input: k = 2, prices = [3,2,6,5,0,3]
    Output: 7
    Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int ind, int buy, int cap, vector<int>& prices, vector<vector<vector<int>>> &dp) {
        if (ind == prices.size() || cap == 0) return 0;

        if (dp[ind][buy][cap] != -1) return dp[ind][buy][cap];

        if (buy == 0) {
            // Buy or skip
            return dp[ind][buy][cap] = max(
                solve(ind + 1, 0, cap, prices, dp), // skip
                -prices[ind] + solve(ind + 1, 1, cap, prices, dp) // buy
            );
        } else {
            // Sell or skip
            return dp[ind][buy][cap] = max(
                solve(ind + 1, 1, cap, prices, dp), // skip
                prices[ind] + solve(ind + 1, 0, cap - 1, prices, dp) // sell
            );
        }
    }

    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(k + 1, -1)));
        return solve(0, 0, k, prices, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(k + 1, 0)));

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                for(int cap = 1; cap <= k; cap++){
                    if(buy == 0){
                        dp[i][buy][cap] = max(dp[i + 1][0][cap], -prices[i] + dp[i + 1][1][cap]);
                    } else {
                        dp[i][buy][cap] = max(dp[i + 1][1][cap], prices[i] + dp[i + 1][0][cap - 1]);
                    }
                }
            }
        }

        return dp[0][0][k];
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> next(2, vector<int>(k + 1, 0)), curr(2, vector<int>(k + 1, 0));

        for(int i = n - 1; i >= 0; i--){
            for(int buy = 0; buy <= 1; buy++){
                for(int cap = 1; cap <= k; cap++){
                    if(buy == 0){
                        curr[buy][cap] = max(next[0][cap], -prices[i] + next[1][cap]);
                    } else {
                        curr[buy][cap] = max(next[1][cap], prices[i] + next[0][cap - 1]);
                    }
                }
            }
            next = curr;
        }

        return next[0][k];
    }
};

```

---

## 📝 How It Works

- You are allowed at most `k` transactions.
- At every day `i`, the state depends on:
    - `buy = 0` → Can buy or skip
    - `buy = 1` → Can sell or skip
    - `cap` → Number of remaining full transactions (1 buy + 1 sell)
- Use recursive choices to:
    - Skip
    - Buy or sell
- Reduce the transaction count only **when you sell**, not when you buy.

---

## 🧩 Key Formula / Recurrence

```cpp
if (buy == 0)
    dp[i][buy][cap] = max(dp[i+1][0][cap], -prices[i] + dp[i+1][1][cap])
else
    dp[i][buy][cap] = max(dp[i+1][1][cap], prices[i] + dp[i+1][0][cap - 1])

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × 2 × K) | O(N × 2 × K) |
| Tabulation | O(N × 2 × K) | O(N × 2 × K) |
| Space Optimized | O(N × 2 × K) | O(2 × K) = O(K) ✅ |

---

## ⚠️ Edge Cases

- `prices = []` → No transaction possible, return 0
- `k == 0` → Not allowed to do anything, return 0
- All prices decreasing → Best to not buy at all, return 0
- All prices increasing → Best to buy once and sell at the end

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Greedy | ❌ Doesn't work for general k |
| DFS Brute | ❌ Exponential and too slow |
| Optimized DP | ✅ Best balance between performance & clarity |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock I](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

---