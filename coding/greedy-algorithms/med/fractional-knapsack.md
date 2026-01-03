---
title: Fractional Knapsack
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

Given two arrays, val[] and **`wt[]`**, representing the values and weights of items, and an integer **`capacity`** representing the maximum weight a knapsack can hold, determine the maximum total value that can be achieved by putting items in the knapsack. You are allowed to break items into fractions if necessary.

Return the maximum value as a double, rounded to 6 decimal places.

- Example:
    
    ```
    Input: val[] = [60, 100, 120], wt[] = [10, 20, 30], capacity = 50
    Output: 240.000000
    Explanation: Take the item with value 60 and weight 10, value 100 and weight 20 and split the third item with value 120 and weight 30, to fit it into weight 20. so it becomes (120/30)*20=80, so the total value becomes 60+100+80.0=240.0 Thus, total maximum value of item we can have is 240.00 from the given capacity of sack. 
    ```
    

---

---

## ✅ Solution: Greedy Approach (Sorted by Value-to-Weight Ratio)

```cpp
class Solution {
public:
    double fractionalKnapsack(vector<int>& val, vector<int>& wt, int capacity) {
        vector<pair<double, int>> ratios;

        // Calculate value-to-weight ratio for each item
        for(int i = 0; i < val.size(); i++){
            double ratio = (double)val[i] / wt[i];
            ratios.push_back({ratio, i});
        }

        // Sort items based on ratio in descending order
        sort(ratios.rbegin(), ratios.rend());

        double finalValue = 0.0;
        int currentWeight = 0;

        for(int i = 0; i < val.size(); i++){
            int idx = ratios[i].second;

            if(currentWeight + wt[idx] <= capacity){
                // Take the whole item
                finalValue += val[idx];
                currentWeight += wt[idx];
            } else {
                // Take only the fraction that fits
                int remain = capacity - currentWeight;
                finalValue += ((double)remain / wt[idx]) * val[idx];
                break; // Knapsack is full
            }
        }

        return finalValue;
    }
};

```

---

## 📝 How It Works

- For each item, calculate the **value-to-weight ratio**.
- Sort all items in **descending order of ratio**.
- Greedily pick full items while there's space.
- When a full item can't be picked, take the **fraction that fits**.
- Stop when the knapsack is full.

---

## 🧩 Key Formula

- Sort by:
    $$
    \text{ratio} = \frac{\text{value}}{\text{weight}}
    $$
- If item can fit: take full
- Else take:
    
    $fraction_v= \left(\frac{\text{remaining capacity}}{\text{weight}}\right) \times \text{value}$
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N log N) – due to sorting |
| Space | O(N) – for storing ratios |

---

## ⚠️ Edge Cases

- Knapsack capacity = 0 → Output = 0
- All items are heavier than capacity → Only fraction taken
- Capacity > total weight → Take all items fully

---

## 💡 Other Approaches

| Approach | Time | Space | Suitable When |
| --- | --- | --- | --- |
| Greedy (This) | O(N log N) | O(N) | ✅ Most optimal |
| DP (0/1 Knapsack) | O(NW) | O(NW) | ❌ Not allowed in fractional |

---

## 🔁 Related Problems

- [Leetcode 1286: Iterator for Combination](https://leetcode.com/problems/iterator-for-combination/)
- [Leetcode 1353: Maximum Number of Events That Can Be Attended](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/)
- [0/1 Knapsack Problem – GFG/Leetcode]
- [Unbounded Knapsack – GFG]

---

Let me know if you’d like to also add the **0/1 Knapsack version** for comparison!