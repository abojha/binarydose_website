---
title: Remove Duplicates from Sorted Array
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears only **once**. The **relative order** of the elements should be kept the **same**. Then return *the number of unique elements in* `nums`.

Consider the number of unique elements of `nums` to be `k`, to get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.
- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,1,2]
    Output: 2, nums = [1,2,_]
    Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).
    Example 2:
    
    Input: nums = [0,0,1,1,1,2,2,3,3,4]
    Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
    Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
    It does not matter what you leave beyond the returned k (hence they are underscores).
    ```
    

---

---

## ✅ Solution: Two Pointer Technique (In-Place Deduplication)

### 🔁 Return Only the Count of Unique Elements

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;  // Edge case: empty array

        int uniquePos = 1; // Position to place next unique element

        for (int scan = 1; scan < nums.size(); scan++) {
            // If current number is different from previous
            if (nums[scan] != nums[scan - 1]) {
                nums[uniquePos] = nums[scan]; // Overwrite duplicate
                uniquePos++;                  // Move to next insert position
            }
        }

        return uniquePos; // Number of unique elements
    }
};

```

---

### 🔁 Return Vector Containing Only Unique Elements

```cpp
class Solution {
public:
    vector<int> removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return {}; // Edge case: empty array

        int uniquePos = 1; // Position to insert next unique element

        for (int scan = 1; scan < nums.size(); scan++) {
            if (nums[scan] != nums[scan - 1]) {
                nums[uniquePos] = nums[scan];
                uniquePos++;
            }
        }

        // Return only the unique portion of the array
        return vector<int>(nums.begin(), nums.begin() + uniquePos);
    }
};

```

---

## 📝 How It Works

- Traverse the sorted array with a scanning pointer.
- Use another pointer `uniquePos` to track where the next unique number should go.
- Overwrite duplicates in-place to maintain space efficiency.
- Either return:
    - The count of unique values (for in-place APIs like LeetCode), or
    - The sliced result vector (`nums[0:uniquePos]`).

---

## 🧩 Key Formula / Logic

```cpp
if (nums[scan] != nums[scan - 1]) {
    nums[uniquePos] = nums[scan];
    uniquePos++;
}

```

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) (in-place) / O(K) for returned vector |

---

## ⚠️ Edge Cases

- Empty input → returns 0 or empty vector.
- Fully unique array → returns as-is.
- All same elements → returns one element.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| `set` or `unordered_set` | O(N log N) or O(N) | O(N) | Not in-place, unordered |
| Manual new vector build | O(N) | O(N) | More readable, but uses space |

---

## 🔁 Related Problems

- Remove Duplicates from Sorted Array II
- Delete Duplicates in Linked List
- Remove Element
- Move Zeroes

---