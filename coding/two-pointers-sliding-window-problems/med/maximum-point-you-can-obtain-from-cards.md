---
title: Maximum point you can obtain from cards
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

There are several cards **arranged in a row**, and each card has an associated number of points. The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the *maximum score* you can obtain.

- Example:
    
    ```
    Example 1:
    
    Input: cardPoints = [1,2,3,4,5,6,1], k = 3
    Output: 12
    Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
    Example 2:
    
    Input: cardPoints = [2,2,2], k = 2
    Output: 4
    Explanation: Regardless of which two cards you take, your score will always be 4.
    Example 3:
    
    Input: cardPoints = [9,7,7,9,7,7,9], k = 7
    Output: 55
    Explanation: You have to take all the cards. Your score is the sum of points of all cards.
    ```
    

---

---

### Solution:

```cpp
int maxScore(vector<int>& cardPoints, int k) {
    int left_sum = 0, right_sum = 0, maxSum = 0;

    // Take first k cards from the front
    for (int i = 0; i < k; i++) {
        left_sum += cardPoints[i];
    }

    maxSum = left_sum;
    int rightIndex = cardPoints.size() - 1;

    // Try all combinations: i from left, k-i from right
    for (int i = k - 1; i >= 0; i--) {
        left_sum -= cardPoints[i];
        right_sum += cardPoints[rightIndex];
        rightIndex--;

        maxSum = max(maxSum, left_sum + right_sum);
    }

    return maxSum;
}

```

---

### 🧠 **How it Works**

- Take the first `k` cards from the front → that’s one option.
- Then gradually replace cards from the front with cards from the back.
- At each step:
    
    `current_sum = left_sum + right_sum`
    
    Track the **maximum** among all such combinations.
    

---

### ⚠️ **Edge Cases**

- `k == cardPoints.size()` → take all cards
- `k == 1` → max of first or last card
- `cardPoints` can be large → use `long long` if needed in extreme cases

---

### 📉 **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(k) |
| Space | O(1) |

---

### 💡 **Other Possible Solutions**

- **Sliding Window Complement:**
    
    Total sum - minimum subarray of size `n-k` → O(n)
    
- **Brute Force:** Try all combinations → O(2^k) (not feasible for large k)

---

### 🔁 **Related Problems**

- LC 1423 – Maximum Points from Cards
- Maximum subarray of size k
- Minimum window to skip to reach target score

---

### 📚 **Concepts Used**

- Prefix sum
- Sliding window from both ends
- Complement window trick (`n-k`)