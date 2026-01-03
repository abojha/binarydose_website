---
title: Median of two sorted array
description: ""
tags:
  - binary-search
  - hard
---

### Problem Statement:

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

- Example:
    
    **Example 1:**
    
    ```
    Input: nums1 = [1,3], nums2 = [2]
    Output: 2.00000
    Explanation: merged array = [1,2,3] and median is 2.
    
    ```
    
    **Example 2:**
    
    ```
    Input: nums1 = [1,2], nums2 = [3,4]
    Output: 2.50000
    Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
    ```
    

---

## Solution: Binary Search (Partition Method)

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int m = nums2.size();

        // Ensure nums1 is the smaller array for optimized binary search
        if(n > m){
            return findMedianSortedArrays(nums2, nums1);
        }

        int low = 0, high = n;

        while(low <= high){
            int mid1 = (low + high) / 2;               // Partition index for nums1
            int mid2 = (n + m + 1)/2 - mid1;           // Partition index for nums2

            // Left max and right min for nums1
            int l1 = mid1 == 0 ? INT_MIN : nums1[mid1 - 1];
            int r1 = mid1 == n ? INT_MAX : nums1[mid1];

            // Left max and right min for nums2
            int l2 = mid2 == 0 ? INT_MIN : nums2[mid2 - 1];
            int r2 = mid2 == m ? INT_MAX : nums2[mid2];

            // ✅ Correct partition found
            if(l1 <= r2 && l2 <= r1){
                if((n + m) % 2 == 0){
                    // Even length: take avg of max(left) and min(right)
                    return ((max(l1, l2) + min(r1, r2)) / 2.0);
                }
                else{
                    // Odd length: median is max(left)
                    return max(l1, l2);
                }
            }

            // Adjust binary search
            if(l1 > r2){
                high = mid1 - 1;   // Move left
            }
            else{
                low = mid1 + 1;    // Move right
            }
        }
        return 0.0;
    }
};

```

---

## 📝 How It Works

1. We use **binary search on the smaller array** to partition both arrays into left and right halves.
2. `mid1` → partition index in `nums1`, `mid2` → partition index in `nums2`.
3. Define:
    - `l1` = max element on left side of `nums1`
    - `r1` = min element on right side of `nums1`
    - `l2` = max element on left side of `nums2`
    - `r2` = min element on right side of `nums2`
4. A correct partition satisfies:
    - `l1 <= r2` **and** `l2 <= r1`
5. If valid:
    - Odd length total → median = `max(l1, l2)`
    - Even length total → median = `(max(l1, l2) + min(r1, r2)) / 2.0`
6. If invalid:
    - If `l1 > r2`, move `high` left
    - Else, move `low` right

---

## 🧩 Key Formula / Recurrence

- Partition condition:
    
    `l1 <= r2 && l2 <= r1`
    
- Median:
    - Odd → `max(l1, l2)`
    - Even → `(max(l1, l2) + min(r1, r2)) / 2.0`

---

## ⏱️ Time & Space Complexity

- **Time:** `O(log(min(n, m)))` → binary search only on smaller array.
- **Space:** `O(1)` → constant extra variables.

---

## ⚠️ Edge Cases

- One array empty → directly pick median from other array.
- Arrays of different sizes (works fine).
- Duplicate numbers across arrays.
- Odd/even total length handled separately.

---

## 💡 Other Approaches

1. **Brute Force Merge:** Merge both arrays and pick middle → `O(n+m)` time, `O(n+m)` space.
2. **Two-pointer Traversal:** Merge until median index reached → `O(n+m)` time, `O(1)` space.
3. **Binary Search Partition (Optimal):** `O(log(min(n,m)))` time, `O(1)` space ✅.

---

## 🔁 Related Problems

- [LeetCode 4] Median of Two Sorted Arrays
- Find K-th element in two sorted arrays
- Merge Two Sorted Arrays
- Median in a row-wise sorted matrix

---