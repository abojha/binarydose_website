---
title: Selection Sort
description: ""
tags:
  - easy
  - sorting
---

import AlgoDoseCallout from '@site/src/components/AlgoDose/AlgoDoseCallout';

<AlgoDoseCallout
  algoId="selection_sort"
  title="Selection Sort"
  description="Watch the algorithm scan for the minimum element and place it at the sorted boundary step-by-step."
/>

### Problem Statement:

Given an array **arr**, use **selection sort** to sort arr[] in increasing order.

- Example:
    
    ```
    Input:arr[] = [4, 1, 3, 9, 7]
    Output:[1, 3, 4, 7, 9]
    Explanation:Maintain sorted (in bold) and unsorted subarrays. Select 1. Array becomes1 4 3 9 7. Select 3. Array becomes1 3 4 9 7. Select 4. Array becomes1 3 4 9 7. Select 7. Array becomes1 3 4 7 9. Select 9. Array becomes1 3 4 7 9.
    ```
    

---

---

## ✅ Solution: Brute Force (Selection Sort)

```cpp
class Solution {
  public:
    // Function to perform selection sort on the given array.
    void selectionSort(vector<int> &arr) {
        int n = arr.size();

        for(int i = 0; i < n; i++) {
            int min_index = i;  // Assume current index has the minimum

            // Find the actual minimum in the remaining array
            for(int j = i + 1; j < n; j++) {
                if(arr[j] < arr[min_index]) {
                    min_index = j;
                }
            }

            // Swap minimum element with the first element of unsorted part
            swap(arr[i], arr[min_index]);
        }
    }
};

```

---

## 📝 How It Works

- For each position `i`, the algorithm **finds the smallest element** in the unsorted part of the array (`i+1` to `n-1`).
- It **swaps** that smallest element with the element at index `i`.
- This process repeats for each index, pushing the next smallest element to its correct sorted position.
- Think of it like **selecting** the smallest card from the remaining deck and placing it in sorted order from left to right.

---

## 🧩 Key Formula / Recurrence

There’s no recurrence here (non-recursive).

But the core operation is:

```
For each i from 0 to n-1:
    Find index j such that arr[j] is min in [i...n-1]
    Swap arr[i] and arr[j]

```

---

## ⏱️ Time & Space Complexity

| Aspect | Value |
| --- | --- |
| Time Complexity | O(N²) |
| Space Complexity | O(1) – In-place |
- Best, Average, and Worst case = **O(N²)** due to nested loops.
- It doesn’t use any extra memory, just a few variables and swaps.

---

## ⚠️ Edge Cases

- Empty array or single-element array → already sorted, function handles it safely.
- Already sorted or reverse sorted → still goes through all comparisons (no optimization).

---

## 💡 Other Approaches

| Algorithm | Time | Space | Notes |
| --- | --- | --- | --- |
| Selection Sort | O(N²) | O(1) | Simple but slow |
| Bubble Sort | O(N²) | O(1) | Slightly more swap-heavy |
| Insertion Sort | O(N²) | O(1) | Faster on nearly sorted arrays |
| Merge Sort | O(N log N) | O(N) | Divide and conquer |
| Quick Sort | O(N log N) avg | O(log N) | Fastest in practice on average |
| Heap Sort | O(N log N) | O(1) | No recursion, useful in hard limits |

---

## 🔁 Related Problems

- [Sort Colors – Leetcode 75](https://leetcode.com/problems/sort-colors/)
- [Insertion Sort List – Leetcode 147](https://leetcode.com/problems/insertion-sort-list/)
- [GFG - Sorting Algorithms](https://www.geeksforgeeks.org/sorting-algorithms/)

---