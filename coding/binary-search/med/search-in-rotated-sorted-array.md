---
title: Search in Rotated Sorted Array
description: ""
tags:
  - binary-search
  - med
---

### Problem Statement:

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

- Example:
    
    **Example 1:**
    
    ```
    Input: nums = [4,5,6,7,0,1,2], target = 0
    Output: 4
    
    ```
    
    **Example 2:**
    
    ```
    Input: nums = [4,5,6,7,0,1,2], target = 3
    Output: -1
    
    ```
    
    **Example 3:**
    
    ```
    Input: nums = [1], target = 0
    Output: -1
    ```
    

---

## Solution: Binary Search on Rotated Sorted Array

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int low = 0;
        int high = n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Found the target
            if (nums[mid] == target) return mid;

            // Check if the left half is sorted
            if (nums[low] <= nums[mid]) {
                // Target lies in the left half
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                }
                // Otherwise, search right half
                else {
                    low = mid + 1;
                }
            }
            // Otherwise, right half must be sorted
            else {
                // Target lies in the right half
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                }
                // Otherwise, search left half
                else {
                    high = mid - 1;
                }
            }
        }
        return -1; // Not found
    }
};

```

---

## 📝 How It Works

1. This is a **binary search adaptation** for rotated sorted arrays.
2. At each step:
    - Check if the current middle element is the target.
    - Determine which half of the array is sorted:
        - If **left half is sorted** (`nums[low] <= nums[mid]`), check if the target lies between `nums[low]` and `nums[mid]`.
        - Otherwise, it must lie in the **right half**.
    - Narrow down the search range accordingly.
3. Repeat until the element is found or the search range becomes invalid.

---

## 🧩 Key Formula / Recurrence

Binary search narrowing logic:

- If `nums[low] <= nums[mid]`: left half is sorted
    - If `nums[low] <= target < nums[mid]` → search left
    - Else → search right
- Else: right half is sorted
    - If `nums[mid] < target <= nums[high]` → search right
    - Else → search left

---

## ⏱️ Time & Space Complexity

- **Time Complexity:** `O(log N)` (binary search halving each step).
- **Space Complexity:** `O(1)` (only variables used, no extra data structures).

---

## ⚠️ Edge Cases

- Array with only one element.
- Target at the very beginning or end of array.
- No rotation (normal sorted array).
- Fully rotated (back to original sorted order).
- Target not present at all.

---

## 💡 Other Approaches

- **Linear Search:** `O(N)` → trivial but inefficient.
- **Find Pivot + Binary Search:** First locate rotation pivot, then perform binary search in the correct half. Same time complexity but requires extra steps.

---

## 🔁 Related Problems

- LeetCode 153: Find Minimum in Rotated Sorted Array
- LeetCode 81: Search in Rotated Sorted Array II (with duplicates)
- LeetCode 162: Find Peak Element

---