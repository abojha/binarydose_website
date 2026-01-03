---
title: Single Element in Sorted Array
description: ""
tags:
  - binary-search
  - med
---

### Problem Statement:

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return *the single element that appears only once*.

Your solution must run in `O(log n)` time and `O(1)` space.

- Example:
    
    **Example 1:**
    
    ```
    Input: nums = [1,1,2,3,3,4,4,8,8]
    Output: 2
    
    ```
    
    **Example 2:**
    
    ```
    Input: nums = [3,3,7,7,10,11,11]
    Output: 10
    ```
    

---

## Solution: Binary Search on Index Parity

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();

        // Edge cases: single element or unique at boundaries
        if(n == 1) return nums[0];
        if(nums[0] != nums[1]) return nums[0];
        if(nums[n-1] != nums[n-2]) return nums[n-1];

        int low = 1, high = n - 2;

        while(low <= high){
            int mid = (low + high) / 2;

            // Case 1: Pair on the right
            if(nums[mid] == nums[mid + 1]){
                if(mid % 2 == 0)
                    low = mid + 1;  // single lies after
                else
                    high = mid - 1; // single lies before
            }

            // Case 2: Pair on the left
            else if(nums[mid] == nums[mid - 1]){
                if(mid % 2 == 0)
                    high = mid - 1; // single lies before
                else
                    low = mid + 1;  // single lies after
            }

            // Case 3: nums[mid] is unique
            else{
                return nums[mid];
            }
        }

        return -1; // shouldn't reach here
    }
};

```

---

## 📝 How It Works

- Array is **sorted** and every number appears **twice**, except one unique element.
- In a perfectly paired array:
    - Left half (before the unique element) → pairs start at even indices.
    - Right half (after the unique element) → pairs start at odd indices.
- We use **binary search with parity check**:
    - If `nums[mid] == nums[mid+1]` and `mid` is even → unique is on right.
    - If `nums[mid] == nums[mid+1]` and `mid` is odd → unique is on left.
    - If `nums[mid] == nums[mid-1]` → similar logic but mirrored.
    - If neither matches, `nums[mid]` is the single element.

---

## 🧩 Key Formula / Recurrence

- **Invariant**:
    - Before unique → pairs start at even indices.
    - After unique → pairs start at odd indices.
- Binary Search Condition:
    $$
    \text{if pair index parity mismatches, move left else move right}
    $$

---

## ⏱️ Time & Space Complexity

- **Time**: O(log n) (binary search).
- **Space**: O(1) (no extra structures).

---

## ⚠️ Edge Cases

- Only one element in array → return directly.
- Unique at **start** or **end** of array.
- Large input size → careful with `(low+high)/2` to avoid overflow (use `low + (high-low)/2`).

---

## 💡 Other Approaches

1. **XOR approach**: XOR of all elements gives single → O(n), O(1).
    - Simple but not O(log n).
2. **Linear scan**: Compare pairs directly → O(n).
3. **Binary Search (this approach)** → ✅ Optimal O(log n).

---

## 🔁 Related Problems

- Find Peak Element (LeetCode 162)
- Search in Rotated Sorted Array (LeetCode 33)
- First and Last Position of Element in Sorted Array (LeetCode 34)

---