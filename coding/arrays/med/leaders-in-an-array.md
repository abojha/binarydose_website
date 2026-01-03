---
title: Leaders in an Array
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array, print all the elements which are leaders. A Leader is an element that is greater than all of the elements on its right side in the array.

- Example:
    
    ```
    Example 1:
    Input:
     arr = [4, 7, 1, 0]
    Output:
     7 1 0
    Explanation:
     Rightmost element is always a leader. 7 and 1 are greater than the elements in their right side.
    
    Example 2:
    Input:
     arr = [10, 22, 12, 3, 0, 6]
    Output:
     22 12 6
    Explanation:
     6 is a leader. In addition to that, 12 is greater than all the elements in its right side (3, 0, 6), also 22 is greater than 12, 3, 0, 6.
    ```
    

---

- A **leader** is an element greater than or equal to all elements to its right.
- Start from the rightmost element and keep track of the **maximum seen so far**.
- Push leaders into a result list and reverse it before returning.

---

---

## ✅ Solution: Reverse Traversal (Right to Left Scan)

```cpp
vector<int> leaders(vector<int>& numbers) {
    vector<int> leaderList;
    int size = numbers.size();

    // Last element is always a leader
    leaderList.push_back(numbers[size - 1]);

    // Traverse from second-last to start
    for (int i = size - 2; i >= 0; i--) {
        // Current element is a leader if it's >= last stored leader
        if (numbers[i] >= leaderList.back()) {
            leaderList.push_back(numbers[i]);
        }
    }

    // Reverse the list to restore left-to-right order
    reverse(leaderList.begin(), leaderList.end());

    return leaderList;
}

```

---

## 📝 How It Works

- A **leader** in an array is an element that is **greater than or equal to all elements to its right**.
- Start from the last element, which is always a leader.
- Traverse the array **backwards**, comparing each element with the **last leader found**:
    - If current element ≥ last leader → it's a new leader.
- Store leaders in reverse, and reverse the list at the end to maintain original order.

---

## 🧩 Key Insight

```
A[i] is a leader ⇨ A[i] >= max(A[i+1]...A[n-1])

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(k) |
- Single pass from right to left → O(n)
- O(k) space where `k` is number of leaders

---

## ⚠️ Edge Cases

- Array with all elements same → all are leaders
- Strictly increasing array → only last element is a leader
- Strictly decreasing array → all elements are leaders
- Single-element array → the element is the leader

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force (nested) | O(n²) | O(1) | ❌ Too slow for large inputs |
| Reverse traversal | O(n) | O(k) | ✅ Best and optimal |

---

## 🔁 Related Problems

- [GFG: Leaders in an Array](https://www.geeksforgeeks.org/leaders-in-an-array/)
- [Leetcode 739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (conceptually similar with future elements)
- [Leetcode 496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)