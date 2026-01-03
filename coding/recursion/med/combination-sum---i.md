---
title: Combination Sum - I
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an array **arr[]** and a **target**, your task is to find all **unique** combinations in the array where the sum is equal to target. The same number may be chosen from the array **any** number of times to make target.

You can return your answer in **any** order.

- Example:
    
    ```
    Input: arr[] = [2, 4, 6, 8], target = 8
    Output: [[2 2 2 2] [2 2 4] [2 6] [4 4] [8]]
    Explanation: Total number of possible combinations are 5.
    Input: arr[] = [2, 7, 6, 5], target = 16
    Output: [[2 2 2 2 2 2 2 2] [2 2 2 2 2 6] [2 2 2 5 5] [2 2 5 7] [2 2 6 6] [2 7 7] [5 5 6]]
    Explanation: Total number of possible combinations are 7.
    Input: arr[] = [6, 5, 7], target = 8
    Output: []
    Explanation: There are no possible combinantions such that target sum is 8.
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:
    // Recursive backtracking function
    void generate(int n, int current, vector<int> &arr, int target,
                  vector<int> &subset, vector<vector<int>> &list) {
        
        // Base case: if target sum is achieved
        if (target == 0) {
            list.push_back(subset);
            return;
        }

        // If all elements processed or target becomes negative
        if (current == n || target < 0) return;

        // Include current element (can reuse current index)
        if (arr[current] <= target) {
            subset.push_back(arr[current]);
            generate(n, current, arr, target - arr[current], subset, list);
            subset.pop_back();  // backtrack
        }

        // Exclude current element and move to next
        generate(n, current + 1, arr, target, subset, list);
    }

    vector<vector<int>> combinationSum(vector<int> &arr, int target) {
        vector<vector<int>> list;
        vector<int> subset;
        int n = arr.size();

        // Remove duplicates and sort to ensure unique combinations
        sort(arr.begin(), arr.end());
        arr.erase(unique(arr.begin(), arr.end()), arr.end());

        generate(arr.size(), 0, arr, target, subset, list);
        return list;
    }
};

```

---

### ✅ **How It Works**

- At each step:
    - Either **pick** the current element (stay at same index)
    - Or **don’t pick** and move to next index
- Stop if:
    - Target = 0 → push valid combination
    - Target < 0 or end of array → backtrack
- Each number can be **reused unlimited times**
- Must return **unique combinations** (no duplicates)

---

### 🧠 **Key Points**

- Use backtracking with inclusion/exclusion
- Pick step: keep `current` index
- Unpick step: move to `current + 1`
- Use `sort` + `unique()` to remove duplicate elements before recursion

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(2^t), where t is target (worst-case) |
| Space | O(target) recursion depth + O(#answers) |

---

### ⚠️ **Edge Cases**

- Empty array → returns `[]`
- No combination sums to target → returns `[]`
- Array has duplicate elements → use `unique()` to avoid duplicate combinations

---

### 💡 **Other Variants**

| Problem | Difference |
| --- | --- |
| Combination Sum I ✅ | Pick same number multiple times |
| Combination Sum II | Each number only once (with duplicates in input) |
| Subset Sum | Just check existence or count |
| Partition Equal Subset Sum | Divide array into 2 parts with equal sum |

---

### 🔁 **Related Problems**

- Subsets with Given Sum
- Coin Change
- Word Break (similar recursion style)
- Target Sum