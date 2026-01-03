---
title: Reverse Pairs
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

Given an integer array `nums`, return *the number of **reverse pairs** in the array*.

A **reverse pair** is a pair `(i, j)` where:

- `0 <= i < j < nums.length` and
- `nums[i] > 2 * nums[j]`.
- Example:
    
    **Example 1:**
    
    ```
    Input: nums = [1,3,2,3,1]
    Output: 2
    Explanation: The reverse pairs are:
    (1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
    (3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1
    
    ```
    
    **Example 2:**
    
    ```
    Input: nums = [2,4,3,5,1]
    Output: 3
    Explanation: The reverse pairs are:
    (1, 4) --> nums[1] = 4, nums[4] = 1, 4 > 2 * 1
    (2, 4) --> nums[2] = 3, nums[4] = 1, 3 > 2 * 1
    (3, 4) --> nums[3] = 5, nums[4] = 1, 5 > 2 * 1
    ```
    

---

## Solution: Divide & Conquer (Merge Sort with Two-Pointer Count)

```cpp
class Solution {
public:
    // Merge two sorted halves nums[low..mid] and nums[mid+1..high]
    void merge(vector<int> &nums, int low, int mid, int high) {
        int leftIndex  = low;
        int rightIndex = mid + 1;
        vector<int> merged;

        // Standard merge of two sorted ranges
        while (leftIndex <= mid && rightIndex <= high) {
            if (nums[leftIndex] <= nums[rightIndex]) {          // <= keeps it stable
                merged.push_back(nums[leftIndex++]);
            } else {
                merged.push_back(nums[rightIndex++]);
            }
        }

        // Flush remaining elements
        while (leftIndex  <= mid)  merged.push_back(nums[leftIndex++]);
        while (rightIndex <= high) merged.push_back(nums[rightIndex++]);

        // Copy back to original array
        for (int i = low; i <= high; i++) nums[i] = merged[i - low];
    }

    // Count reverse pairs where i in [low..mid], j in [mid+1..high] and nums[i] > 2*nums[j]
    int countReversePairs(vector<int> &nums, int low, int mid, int high) {
        int count = 0;
        int right = mid + 1;

        for (int left = low; left <= mid; left++) {
            // Move right pointer as long as condition holds
            while (right <= high && (long long)nums[left] > 2LL * nums[right]) {
                right++;
            }
            // For this left, all indices in [mid+1 .. right-1] form reverse pairs
            count += (right - (mid + 1));   // NOTE: accumulate, don't overwrite
        }
        return count;
    }

    int mergeSort(vector<int> &nums, int low, int high) {
        if (low >= high) return 0;

        int mid = low + (high - low) / 2;
        int count = 0;

        // Sort left and right halves and count within them
        count += mergeSort(nums, low, mid);
        count += mergeSort(nums, mid + 1, high);

        // Count cross-half reverse pairs using the two-pointer trick
        count += countReversePairs(nums, low, mid, high);

        // Merge to keep the array sorted for upper levels
        merge(nums, low, mid, high);
        return count;
    }

    int reversePairs(vector<int>& nums) {
        if (nums.size() < 2) return 0;
        return mergeSort(nums, 0, (int)nums.size() - 1);
    }
};

```

## 📝 How It Works

- We use **merge sort** to keep subarrays sorted at each level of recursion.
- After sorting `left = nums[low..mid]` and `right = nums[mid+1..high]`, we **count cross reverse pairs** `(i, j)` such that `nums[i] > 2*nums[j]`.
- Because both halves are sorted, we can scan with two pointers:
    - For each `i` in the left half, advance `right` in the right half while `nums[i] > 2*nums[right]`.
    - The number of valid `j` for that `i` is `right - (mid + 1)`.
    - **Important:** `right` never moves backward—total linear work per merge level.
- Finally, we **merge** the two halves to maintain sorted order for higher recursion levels.

*Analogy:* Think of two sorted shelves of book sizes. For each left-shelf book, slide a pointer on the right shelf until books stop being “less than half the size.” Everything you slid past is a valid match for that left book.

## 🧩 Key Formula / Recurrence

- Let `T(n)` be time to process `n` elements:
    - `T(n) = 2*T(n/2) + O(n)`
    - The `O(n)` comes from the **two-pointer counting** + **merge**.
- Reverse-pair count for fixed `i`:
    - `count_i = max(0, right - (mid + 1))` after advancing `right` while `nums[i] > 2*nums[right]`.

## ⏱️ Time & Space Complexity

- **Time:** `O(n log n)`
    
    (Merge sort levels `log n`, and each level does linear work.)
    
- **Space:** `O(n)` auxiliary for merge arrays (recursion stack `O(log n)`).

## ⚠️ Edge Cases

- **Large values / overflow:** Use `long long` when computing `2 * nums[j]` to avoid overflow.
- **Duplicates & negatives:** Works fine with duplicates and negative numbers (condition is strict `>`).
- **Single element / empty:** Returns `0`.
- **Already sorted / reverse sorted:** Counting logic still `O(n)` per level due to two pointers.

## 💡 Other Approaches

- **Fenwick/Segment Tree with coordinate compression:**
    
    Count while iterating (e.g., from right to left), querying how many elements `< floor(nums[i]/2)` already inserted.
    
    Time `O(n log n)`, Space `O(n)`. More complex to implement carefully for negatives.
    
- **Balanced BST / Ordered statistics tree:**
    
    Also `O(n log n)` but requires an order-statistics tree or multiset with rank queries.
    
- **Brute Force:**
    
    Check all pairs `O(n^2)` — too slow for large `n`.
    

## 🔁 Related Problems

- LeetCode 493. Reverse Pairs (this one)
- LeetCode 315. Count of Smaller Numbers After Self (Fenwick/merge-sort counting)
- LeetCode 327. Count of Range Sum (merge sort on prefix sums)