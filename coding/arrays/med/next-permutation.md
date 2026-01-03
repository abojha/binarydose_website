---
title: Next Permutation
description: ""
tags:
  - array
  - med
---

### Problem Statement:

There’s an array ‘A’ of size ‘N’ with an equal number of positive and negative elements. Without altering the relative order of positive and negative elements, you must return an array of alternately positive and negative values.

- Example:
    
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

---

---

## ✅ Solution: Next Lexicographical Permutation (STL-style)

```cpp
void nextPermutation(vector<int>& numbers) {
    int n = numbers.size();
    int breakPoint = -1;

    // Step 1: Find the first index from the back where arr[i] < arr[i+1]
    for (int i = n - 2; i >= 0; i--) {
        if (numbers[i] < numbers[i + 1]) {
            breakPoint = i;
            break;
        }
    }

    // Step 2: If no such point found, array is in descending order
    if (breakPoint == -1) {
        sort(numbers.begin(), numbers.end());  // Return the smallest permutation
        return;
    }

    // Step 3: Find the next greater element than arr[breakPoint] from the back
    for (int i = n - 1; i > breakPoint; i--) {
        if (numbers[i] > numbers[breakPoint]) {
            swap(numbers[i], numbers[breakPoint]);
            break;
        }
    }

    // Step 4: Reverse the suffix starting at breakPoint + 1
    reverse(numbers.begin() + breakPoint + 1, numbers.end());
}

```

---

## 📝 How It Works

- You're asked to find the **next lexicographically greater permutation** of the current array.
- The idea is based on the observation of permutation patterns:
    - If the array is in descending order → it's the **last permutation**, so return the **first one**.
    - Otherwise, find the rightmost index where the order is ascending and make a minimal adjustment to move to the next permutation.

**Steps:**

1. Find the **first decreasing element** from the back (`breakPoint`).
2. If no such point exists, the array is the last permutation → return the sorted (smallest) version.
3. Otherwise, find the next bigger element on the right and **swap**.
4. Finally, **reverse the suffix** after the swapped index to make it the smallest lexicographical suffix.

---

## 🧩 Key Transitions

```
1. Traverse from right: find i such that arr[i] < arr[i + 1]
2. Find j > i such that arr[j] > arr[i]
3. Swap arr[i], arr[j]
4. Reverse from i + 1 to end

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |

All steps (finding, swapping, reversing) are done in linear time and in-place.

---

## ⚠️ Edge Cases

- Already the last permutation → returns sorted first permutation
- Already the first permutation → just returns next one
- Duplicate elements → still works correctly
- Single element → no change

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| STL `next_permutation()` | O(n) | O(1) | ✅ Built-in and same logic |
| Manual (this) | O(n) | O(1) | ✅ Best for interviews |

---

## 🔁 Related Problems

- [Leetcode 31. Next Permutation](https://leetcode.com/problems/next-permutation/)
- [Leetcode 46. Permutations](https://leetcode.com/problems/permutations/)
- [Leetcode 47. Permutations II](https://leetcode.com/problems/permutations-ii/)
- [GFG: Next Permutation](https://www.geeksforgeeks.org/next-permutation/)