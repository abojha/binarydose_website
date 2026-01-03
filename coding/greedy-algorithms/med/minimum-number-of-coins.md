---
title: Minimum Number of Coins
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:
Given an *infinite supply* of each denomination of Indian currency *1, 2, 5, 10, 20, 50, 100, 200, 500, 2000*  and a target value *N*.

Find the **minimum** number of coins and/or notes needed to make the change for Rs **N.** You must return the list containing the value of coins required.

- Example:
    
    ```
    
    ```
    

---

---

### ✅ Solution 1: Greedy (Repeated Subtraction)

```cpp
vector<int> minPartition(int N) {
    vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 200, 500, 2000};
    vector<int> res;

    int n = coins.size();

    for(int i = n - 1; i >= 0; i--){
        while(N >= coins[i]){
            N -= coins[i];
            res.push_back(coins[i]);
        }
    }

    return res;
}

```

---

### ✅ Solution 2: Greedy (Integer Division Optimized)

```cpp
vector<int> minPartition(int N) {
    vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 200, 500, 2000};
    vector<int> res;

    int n = coins.size();

    for(int i = n - 1; i >= 0; i--){
        if(N >= coins[i]){
            int count = N / coins[i];
            res.insert(res.end(), count, coins[i]); // Insert 'count' copies
            N %= coins[i];
        }
    }

    return res;
}

```

---

## 📝 Revision Notes

### 📝 How It Works

- You’re given an amount `N` and must return a list of coins that sum to `N` using **minimum number of coins**.
- The logic uses **greedy selection** of the largest coin possible at every step.
- Solution 1 subtracts repeatedly and pushes the coin each time.
- Solution 2 optimizes by computing how many times the coin fits and adds them all at once.

---

### 🧩 Key Formula / Transition

- For each coin:
    - Use it while `coin <= N`
    - In optimized: `count = N / coin`, reduce `N %= coin`

---

### ⏱️ Time & Space Complexity

| Solution | Time Complexity | Space Complexity |
| --- | --- | --- |
| Repeated Subtraction | O(N) in worst-case (if only 1s) | O(N) |
| Integer Division | O(denominations) = O(10) | O(N) |

In practice, both are efficient due to large coins (like 2000, 500, etc.).

---

### ⚠️ Edge Cases

- `N = 0` ⇒ should return empty vector.
- `N` is already a coin ⇒ result will just be that coin.
- Input beyond max denomination ⇒ handled by loop automatically.

---

### 💡 Other Approaches

- Dynamic Programming (for variable coin values, not needed here).
- BFS (if coin set wasn’t sorted/greedy-safe — again not needed here).

---

### 🔁 Related Problems

- Coin Change (Leetcode 322) — DP variant.
- Minimum Coins (GFG)
- Fractional Knapsack (greedy logic)
- Coin Change II (ways to make sum)