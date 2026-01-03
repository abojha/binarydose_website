---
title: Fruit Into Baskets
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the **type** of fruit the `ith` tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

- You only have **two** baskets, and each basket can only hold a **single type** of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick **exactly one fruit** from **every** tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array `fruits`, return *the **maximum** number of fruits you can pick*.

```
Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
```

---

### Solution:

```cpp
  int totalFruit(vector<int>& fruits) {
        map<int, int> typeMap; // stores fruit type → count in current window
        int left = 0, right = 0;
        int n = fruits.size();
        int ans_max = INT_MIN;

        while (right < n) {
            typeMap[fruits[right]]++; // add fruit at 'right' to map

            // Shrink window if more than 2 types
            while (typeMap.size() > 2) {
                typeMap[fruits[left]]--; // reduce count of left fruit
                if (typeMap[fruits[left]] == 0) {
                    typeMap.erase(fruits[left]); // remove type if count is 0
                }
                left++; // shrink window from left
            }

            // update max length of valid window
            ans_max = max(ans_max, right - left + 1);
            right++;
        }

        return ans_max;
    }
```

### **How the code works**

- Use a **map** to count each fruit type in the current window.
- Expand `right` to include new fruits.
- If the map holds **more than 2 types**, shrink window from `left` until only 2 remain.
- Track max valid window size as `right - left + 1`.

---

### ⚠️ **Edge Cases**

- All same type → whole array valid.
- Sudden 3rd type → triggers cleanup from `left`.
- Ensure `erase` is done only when count becomes zero.

---

### 📉 **Complexity**

- **Time:** O(n) — each element added/removed once.
- **Space:** O(1) — map stores at most 3 entries (bounded by unique fruit types, max 3).

---

<aside>
💡

### 🧠 Rule of Thumb:

> Even if there’s a nested loop, if each pointer only moves forward, and each element is handled in a limited way, total time is linear.
> 
</aside>