---
title: Candy
description: ""
tags:
  - greedy-algorithms
  - hard
---

### Problem Statement:

There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return *the minimum number of candies you need to have to distribute the candies to the children*.

- Example:
    
    ```
    Example 1:
    
    Input: ratings = [1,0,2]
    Output: 5
    Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
    Example 2:
    
    Input: ratings = [1,2,2]
    Output: 4
    Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
    The third child gets 1 candy because it satisfies the above two conditions.
    ```
    

---

---

## ✅ Solution: Two-Pass Greedy (Left-to-Right & Right-to-Left)

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1); // Step 1: Give 1 candy to each child

        // Step 2: Left to Right - if current rating > previous, give more candy
        for(int i = 1; i < n; i++){
            if(ratings[i] > ratings[i - 1]){
                candies[i] = candies[i - 1] + 1;
            }
        }

        // Step 3: Right to Left - if current rating > next, ensure correct count
        for(int i = n - 2; i >= 0; i--){
            if(ratings[i] > ratings[i + 1]){
                candies[i] = max(candies[i], candies[i + 1] + 1);
            }
        }

        // Step 4: Sum all candies
        return accumulate(candies.begin(), candies.end(), 0);
    }
};

```

---

## 📝 How It Works

- Start by giving **1 candy to every child**.
- First pass (left → right): If the next child has a higher rating, they get more candies than the previous one.
- Second pass (right → left): If the current child has a higher rating than the next one, and doesn’t have more candies, update accordingly.
- This ensures **both neighbors** conditions are satisfied.

---

## 🧩 Key Formula / Recurrence

- `candies[i] = candies[i-1] + 1` if `ratings[i] > ratings[i-1]` (left to right)
- `candies[i] = max(candies[i], candies[i+1] + 1)` if `ratings[i] > ratings[i+1]` (right to left)

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(N) |

---

## ⚠️ Edge Cases

- All ratings are equal → everyone gets 1 candy.
- Strictly increasing or decreasing ratings → forms arithmetic progression of candies.
- Single child → gets 1 candy.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(N) | Update until stable (TLE) ❌ |
| Two-Pass Greedy ✅ | O(N) | O(N) | Optimal and simple |
| Priority Queue | O(N log N) | O(N) | Overkill, not needed |

---

## 🔁 Related Problems

- [Leetcode 135. Candy](https://leetcode.com/problems/candy/)
- [LC 621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)
- [LC 253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

---