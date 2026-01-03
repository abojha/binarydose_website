---
title: Stock Span Problem
description: ""
tags:
  - implementation
  - med
  - problem
  - stack-queue
---

Link: https://leetcode.com/problems/online-stock-span/description/
Summary: Use previous greater element

### Problem Statement:

Design an algorithm that collects daily price quotes for some stock and returns **the span** of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

- For example, if the prices of the stock in the last four days is `[7,2,1,2]` and the price of the stock today is `2`, then the span of today is `4` because starting from today, the price of the stock was less than or equal `2` for `4` consecutive days.
- Also, if the prices of the stock in the last four days is `[7,34,1,2]` and the price of the stock today is `8`, then the span of today is `3` because starting from today, the price of the stock was less than or equal `8` for `3` consecutive days.

Implement the `StockSpanner` class:

- `StockSpanner()` Initializes the object of the class.
- `int next(int price)` Returns the **span** of the stock's price given that today's price is `price`.

```
Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
```

## ✅ Solution: Monotonic Stack — Stock Span Problem (Online)

```cpp
class StockSpanner {
public:
    stack<pair<int, int>> st;  // {price, index}
    int index;

    StockSpanner() {
        index = -1;
    }

    int next(int price) {
        index++;
        while (!st.empty() && st.top().first <= price) {
            st.pop();
        }

        int span = index - (st.empty() ? -1 : st.top().second);

        st.push({price, index});
        return span;
    }
};

```

---

## 📝 How It Works

- **Goal:** For each new price, return how many consecutive days before (including today) the stock price was less than or equal to today’s price.
- **Technique:**
    
    Use a **monotonic decreasing stack** to keep track of {price, index} pairs.
    
- **Logic:**
    - If the stack is empty, it means the current price is the largest so far → span equals `index + 1`.
    - Otherwise, span = `index - top’s index` where top is the last higher price before today.

---

## 🧩 Key Formula

- For each `price` at `index`:
    
    ```
    span = index - (st.empty() ? -1 : st.top().second)
    
    ```
    
- **Stack Property:** Maintains only prices greater than the current one in decreasing order from bottom to top.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Monotonic Stack | Amortized O(1) per call | O(N) |
- Each price is pushed and popped at most once.

---

## ⚠️ Edge Cases

- First price → Span is always `1`.
- Constant increasing prices → Span keeps growing.
- Constant decreasing prices → Span is always `1`.

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(1) | Not practical for large data streams |

---

## 🔁 Related Problems

- LeetCode 901: Online Stock Span (Exact Problem)
- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 239: Sliding Window Maximum
- LeetCode 42: Trapping Rain Water

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Think of checking how long a streak lasts before you broke a record (e.g., sales, temperature, performance metrics).
    
- ✅ This is a classic **monotonic stack** template, especially useful in "span" or "next greater element" type problems.
- ✅ Using `pair<price, index>` helps avoid recalculating indices, keeping things clean and efficient.