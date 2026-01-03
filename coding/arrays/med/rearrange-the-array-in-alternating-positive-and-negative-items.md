---
title: Rearrange the array in alternating positive and negative items
description: ""
tags:
  - array
  - med
---

### Problem Statement:

There’s an array ‘A’ of size ‘N’ with an equal number of positive and negative elements. Without altering the relative order of positive and negative elements, you must return an array of alternately positive and negative values.

```
Example 1:

Input:
arr[] = {1,2,-4,-5}, N = 4
Output:
1 -4 2 -5

Explanation: 

Positive elements = 1,2
Negative elements = -4,-5
To maintain relative ordering, 1 must occur before 2, and -4 must occur before -5.

Example 2:
Input:
arr[] = {1,2,-3,-1,-2,-3}, N = 6
Output:
1 -3 2 -1 3 -2
Explanation: 

Positive elements = 1,2,3
Negative elements = -3,-1,-2
To maintain relative ordering, 1 must occur before 2, and 2 must occur before 3.
Also, -3 should come before -1, and -1 should come before -2.
```

---

---

## ✅ Solution: Two-Pointer Rearrangement by Sign

```cpp
vector<int> rearrangeBySign(vector<int>& numbers) {
    int size = numbers.size();
    vector<int> result(size, 0);  // Final array with alternating signs

    int positiveIndex = 0;  // Even indices for positive numbers
    int negativeIndex = 1;  // Odd indices for negative numbers

    for (int number : numbers) {
        if (number >= 0) {
            result[positiveIndex] = number;
            positiveIndex += 2;  // Move to next even index
        } else {
            result[negativeIndex] = number;
            negativeIndex += 2;  // Move to next odd index
        }
    }

    return result;
}

```

---

## 📝 How It Works

- You're given an array with **equal number of positive and negative elements**.
- Goal: Rearrange such that:
    - Positive numbers go to even indices.
    - Negative numbers go to odd indices.
- Use two pointers:
    - One starts at even indices (`positiveIndex = 0`).
    - One starts at odd indices (`negativeIndex = 1`).
- Traverse original array once and place numbers accordingly into the result.

---

## 🧩 Key Logic

```
If number >= 0 → result[positiveIndex] = number, positiveIndex += 2
If number <  0 → result[negativeIndex] = number, negativeIndex += 2

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(n) |
- Linear traversal once.
- New array of same size for output.

---

## ⚠️ Edge Cases

- Unequal number of positives and negatives → ❌ this approach will break.
- Only positives or only negatives → ❌ won’t work (requires alternate logic).
- All 0s considered positive here → behavior is consistent.

---

## 💡 Other Approaches

| Approach | Time | Space | Works with Unequal Pos/Neg? |
| --- | --- | --- | --- |
| This Two-Pointer | O(n) | O(n) | ❌ Only equal counts |
| Two Queues + Interleave | O(n) | O(n) | ✅ Works for unequal |
| In-place (Extra Hard) | O(n) | O(1) | ✅ Complex to implement |

---

## 🔁 Related Problems

- [Leetcode 2149. Rearrange Array Elements by Sign](https://leetcode.com/problems/rearrange-array-elements-by-sign/)
- [Leetcode 1438. Longest Subarray with Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)
- [Rearrange Positive and Negative Numbers in O(n) Time and O(1) Extra Space (GFG)](https://www.geeksforgeeks.org/rearrange-positive-and-negative-numbers/)