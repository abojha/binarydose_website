---
title: Permutations
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in **any order**.

- Example:
    
    **Example 1:**
    
    ```
    Input: nums = [1,2,3]
    Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
    
    ```
    
    **Example 2:**
    
    ```
    Input: nums = [0,1]
    Output: [[0,1],[1,0]]
    
    ```
    
    **Example 3:**
    
    ```
    Input: nums = [1]
    Output: [[1]]
    ```
    

---

## Solution: Backtracking (Two Methods)

---

### ✅ First Approach: Using Frequency Array (Pick/Not Pick Style)

```cpp
class Solution {
public:
    void solve(vector<int> &current, vector<int> &used, vector<int> &nums, vector<vector<int>>& result) {
        // Base case: if current permutation is complete
        if (current.size() == nums.size()) {
            result.push_back(current);
            return;
        }

        // Try every element if not already used
        for (int i = 0; i < nums.size(); i++) {
            if (used[i] == 0) {
                used[i] = 1; // mark as used
                current.push_back(nums[i]); // choose this element

                solve(current, used, nums, result); // recurse

                current.pop_back(); // backtrack
                used[i] = 0; // mark as unused again
            }
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> current;
        vector<int> used(nums.size(), 0); // tracks used elements
        solve(current, used, nums, result);
        return result;
    }
};

```

---

### ✅ Second Approach: Using Swapping (In-place Permutation Generation)

```cpp
class Solution {
public:
    void solve(int index, vector<int> &nums, vector<vector<int>>& result) {
        // Base case: when index reaches end
        if (index == nums.size()) {
            result.push_back(nums);
            return;
        }

        for (int i = index; i < nums.size(); i++) {
            swap(nums[i], nums[index]); // place one candidate at index
            solve(index + 1, nums, result); // recurse for next index
            swap(nums[i], nums[index]); // backtrack (restore original)
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        solve(0, nums, result);
        return result;
    }
};

```

---

## 📝 How It Works

- **Method 1 (Freq Array):**
    - Maintains a `used` array to track which elements are already included.
    - At each step, tries all unused numbers, adds them to the current sequence, and recurses.
    - Backtracks after exploring each option.
- **Method 2 (Swapping):**
    - Fixes an element at the current index by swapping.
    - Recursively permutes the rest of the array.
    - Backtracks by swapping back to restore the original order.
    - Works in-place, so no extra `used` array is needed.

---

## 🧩 Key Formula / Recurrence

For `n` numbers:

- At each step, we choose one unused element → `n!` total permutations.
- Recurrence:
    
    `Perm(n) = n * Perm(n-1)`
    

---

## ⏱️ Time & Space Complexity

| Method | Time Complexity | Space Complexity |
| --- | --- | --- |
| Frequency Array | **O(n · n!)** (n! permutations, each takes O(n) to build) | **O(n)** recursion + used array |
| Swapping | **O(n · n!)** | **O(n)** recursion only |

---

## ⚠️ Edge Cases

- `nums` has only 1 element → just return `{nums}`.
- Duplicates: Neither method handles duplicates (would generate repeated permutations). Need extra logic for unique permutations (like `std::set` or sorting + skipping).

---

## 💡 Other Approaches

- **STL Approach (next_permutation):**
    - Sort array and repeatedly call `next_permutation()` to generate permutations in lexicographic order.
    - Simpler but less instructive.

---

## 🔁 Related Problems

- **LeetCode 47:** Permutations II (with duplicates)
- **LeetCode 22:** Generate Parentheses (similar backtracking idea)
- **LeetCode 39/40:** Combination Sum (subset-style backtracking)

---