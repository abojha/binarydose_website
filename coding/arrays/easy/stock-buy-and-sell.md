---
title: Stock Buy and Sell
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

You are given an array of prices where prices[i] is the price of a given stock on an ith day. You  want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return 0.

```
Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and 
sell on day 5 (price = 6), profit = 6-1 = 5.

Note: That buying on day 2 and selling on day 1 
is not allowed because you must buy before 
you sell.

Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are 
done and the max profit = 0.
```

---

---

## ✅ Solution: Greedy / Single Pass (Best Time to Buy and Sell Stock)

```cpp
int maximumProfit(vector<int>& stockPrices) {
    int lowestPriceSoFar = INT_MAX;  // Track the minimum price (buying price)
    int highestProfit = 0;           // Track the max profit so far

    for (int price : stockPrices) {
        lowestPriceSoFar = min(lowestPriceSoFar, price);             // Update min price
        highestProfit = max(highestProfit, price - lowestPriceSoFar); // Update max profit
    }

    return highestProfit;
}

```

---

## 📝 How It Works

- You're given a list of stock prices, and you must **buy once and sell once** to maximize profit.
- At each step:
    - Update the **lowest price seen so far** (`lowestPriceSoFar`).
    - Calculate profit: `current price - lowestPriceSoFar`.
    - Update `highestProfit` if the profit is better than before.
- All in **one pass**, making it highly efficient.

---

## 🧩 Key Formula

```
maxProfit = max(maxProfit, price[i] - minPriceSoFar)
minPriceSoFar = min(minPriceSoFar, price[i])

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |

---

## ⚠️ Edge Cases

- All decreasing prices → profit = 0
- All prices same → profit = 0
- Only one price → profit = 0 (can't sell without buying before)
- Empty array → return 0 or handle with a guard

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(n²) | O(1) | Compare all pairs, too slow ❌ |
| Greedy (this) | O(n) | O(1) | ✅ Best and optimal |

---

## 🔁 Related Problems

- [Leetcode 121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
- [Leetcode 122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
- [Leetcode 123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)
- [Leetcode 309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)