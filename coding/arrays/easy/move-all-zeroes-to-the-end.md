---
title: Move All Zeroes to the End
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

You are given an array **arr[]** of non-negative integers. Your task is to move all the zeros in the array to the right end while maintaining the relative order of the non-zero elements. The operation must be performed **in place**, meaning you should not use extra space for another array.

- Example:
    
    ```
    Examples:
    
    Input: arr[] = [1, 2, 0, 4, 3, 0, 5, 0]
    Output: [1, 2, 4, 3, 5, 0, 0, 0]
    Explanation: There are three 0s that are moved to the end.
    Input: arr[] = [10, 20, 30]
    Output: [10, 20, 30]
    Explanation: No change in array as there are no 0s.
    Input: arr[] = [0, 0]
    Output: [0, 0]
    Explanation: No change in array as there are all 0s.
    ```
    

---

---

## ✅ Solution: Two Pointer Technique (In-Place Swapping)

```cpp
class Solution {
public:
    void pushZerosToEnd(vector<int>& arr) {
        int nonZeroPos = 0; // Points to where the next non-zero element should go

        for (int i = 0; i < arr.size(); i++) {
            if (arr[i] != 0) {
                swap(arr[i], arr[nonZeroPos]); // Move non-zero to the front
                nonZeroPos++;
            }
        }
        // All zeros are pushed after the last non-zero element
    }
};

```

---

## 📝 How It Works

- Use `nonZeroPos` to track the position where the next non-zero should be placed.
- Traverse the array:
    - If the element is non-zero, swap it with the element at `nonZeroPos` and increment `nonZeroPos`.
- Zeros are effectively pushed to the end, while preserving the order of non-zero elements.

---

## 🧩 Key Formula / Logic

```cpp
if (arr[i] != 0) {
    swap(arr[i], arr[nonZeroPos]);
    nonZeroPos++;
}

```

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- All zeros → remains the same
- No zeros → array unchanged
- Zeros only at front or end → efficiently handled
- Single element → zero or non-zero both fine

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Using extra array | O(N) | O(N) | Needs extra space (not in-place) |
| Counting zeros and shifting | O(N) | O(1) | Less optimal for stable position |

---

## 🔁 Related Problems

- Move Zeroes (Leetcode 283)
- Sort array by parity
- Stable partitioning of elements
- Rearrange positive and negative numbers

---