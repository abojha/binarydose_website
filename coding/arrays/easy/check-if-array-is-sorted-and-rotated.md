---
title: Check if Array is Sorted and Rotated
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an array `nums`, return `true` *if the array was originally sorted in non-decreasing order, then rotated **some** number of positions (including zero)*. Otherwise, return `false`.

There may be **duplicates** in the original array.

**Note:** An array `A` rotated by `x` positions results in an array `B` of the same length such that `B[i] == A[(i+x) % A.length]` for every valid index `i`.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [3,4,5,1,2]
    Output: true
    Explanation: [1,2,3,4,5] is the original sorted array.
    You can rotate the array by x = 3 positions to begin on the element of value 3: [3,4,5,1,2].
    Example 2:
    
    Input: nums = [2,1,3,4]
    Output: false
    Explanation: There is no sorted array once rotated that can make nums.
    Example 3:
    
    Input: nums = [1,2,3]
    Output: true
    Explanation: [1,2,3] is the original sorted array.
    You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.
    ```
    

---

---

## ✅ Solution: Brute Force with Modulo (Rotation Check)

```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int drop = 0;
        int n = nums.size();

        for(int i = 0; i < n; i++) {
            // Compare current with next (wrap around using modulo)
            if(nums[i] > nums[(i + 1) % n]) {
                drop++;
            }
        }

        // More than one drop means it can't be sorted by rotation
        return drop <= 1;
    }
};

```

---

## 📝 How It Works

- The array is a **rotated non-decreasing array** if it has at most **one "drop"**, where a drop is defined as `nums[i] > nums[i+1]`.
- The comparison `nums[i] > nums[(i + 1) % n]` wraps around using modulo to connect the last and first elements.
- If more than one such drop is found, the array cannot be obtained by rotating a sorted array.

---

## 🧩 Key Formula / Recurrence

- Check condition:
    
    `if nums[i] > nums[(i + 1) % n] → drop++`
    
- Valid only if `drop <= 1`

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- Already sorted array → `drop = 0` ✅
- Rotated sorted array like `[3,4,5,1,2]` → `drop = 1` ✅
- More than one rotation point → `drop > 1` ❌
- Single element array → valid ✅
- All elements same → valid ✅

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute force rotation and check | O(N²) | O(N) | Try every rotation (inefficient) |
| Sort and rotate compare | O(N log N) | O(N) | Sort the array and simulate all rotations |

---

## 🔁 Related Problems

- Check if Array Is Sorted and Rotated
- Rotate Array
- Find Minimum in Rotated Sorted Array
- Search in Rotated Sorted Array