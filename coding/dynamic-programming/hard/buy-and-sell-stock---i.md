---
title: Buy and Sell Stock - I
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

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.

- Example:
    
    ```
    Example 1:
    
    Input: prices = [7,1,5,3,6,4]
    Output: 5
    Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
    Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
    Example 2:
    
    Input: prices = [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transactions are done and the max profit = 0.
    ```
    

---

---

## ✅ Solution: One Pass Greedy

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0;
        int minimum = INT_MAX;
        int current = prices[0];

        for(int i = 1; i < prices.size(); i++){
            // Compute profit by selling at current price
            maxProfit = max(maxProfit, prices[i] - current);

            // Update the minimum price so far
            current = min(current, prices[i]);
        }

        return maxProfit;
    }
};

```

---

## 📝 How It Works

1. **Initialize** `current` as the price on day 0 (min price seen so far).
2. Loop through the array from day 1 to end:
    - Compute profit as `prices[i] - current` → max profit if bought at lowest seen so far.
    - Update `maxProfit` with the best profit seen.
    - Update `current` if you find a lower price (buy cheaper).
3. Return the maximum profit found.

This approach always looks for the lowest price to buy and highest to sell after that point.

---

## 🧩 Key Formula

```cpp
maxProfit = max(maxProfit, prices[i] - minPriceSoFar);
minPriceSoFar = min(minPriceSoFar, prices[i]);

```

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- All decreasing prices → return 0 (no profit).
- Single element array → return 0.
- Prices remain constant → return 0.

---

## 💡 Other Approaches

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(n²) | O(1) | Try every pair (TLE) ❌ |
| DP | O(n) | O(n) | Track profits per day ✅ |

---

## 🔁 Related Problems

- [Best Time to Buy and Sell Stock II (Multiple Transactions)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Best Time to Buy and Sell Stock III (at most 2 transactions)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [Maximum Subarray (Kadane’s Algo)](https://leetcode.com/problems/maximum-subarray/)

---