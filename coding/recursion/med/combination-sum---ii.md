---
title: Combination Sum - II
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an array **arr[]** and a **target**, your task is to find all **unique** combinations in the array where the sum is equal to target. Each number in arr[] may only be used **once** in the combination.

You can return your answer in **any** order.

- Example:
    
    ```
    Input: arr[] = [1, 2, 3, 3, 5], target =7
    Output: [[1, 3, 3], [2, 5]]
    Explanation: Total number of possible combinations are 2.
    Input: arr[] = [5, 10, 15, 20, 25, 30], target = 30
    Output: [[5, 10, 15], [5, 25], [10, 20], [30]]
    Explanation: Total number of possible combinations are 4.
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
    void generate(int n, int current, vector<int> &arr, int target,
                  vector<int> &subset, vector<vector<int>> &list) {

        if (target == 0) {
            list.push_back(subset);
            return;
        }

        for (int i = current; i < n; i++) {
            // Skip duplicates
            if (i > current && arr[i] == arr[i - 1]) continue;

            if (arr[i] > target) break;  // No need to continue further

            subset.push_back(arr[i]);
            generate(n, i + 1, arr, target - arr[i], subset, list);
            subset.pop_back();
        }
    }

    vector<vector<int>> uniqueCombinations(vector<int> &arr, int target) {
        vector<vector<int>> list;
        vector<int> subset;

        sort(arr.begin(), arr.end());  // Sort to skip duplicates
        generate(arr.size(), 0, arr, target, subset, list);

        return list;
    }
};

```

---

### ✅ **How It Works**

- You want all **unique combinations** where each number is used **at most once**
- Use **recursion + backtracking**
- Sort input first to:
    - Skip duplicate values
    - Stop early when element > target

---

### 🧠 **Key Points**

- At each step, loop from `current` to `n`
- Use condition: `if (i > current && arr[i] == arr[i - 1]) continue;` to **skip duplicates**
- Use `i + 1` in recursion to ensure no re-use of same element
- No need to remove duplicates later using `unique()` — do it during recursion!

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(2ⁿ) (worst-case) |
| Space | O(n × #answers) |

---

### ⚠️ **Edge Cases**

- Empty array → returns empty list
- All elements > target → returns empty
- All duplicates → only one combination shown

---

### 💡 **Other Approaches**

| Problem | Rule |
| --- | --- |
| Combination Sum I | Pick same element unlimited |
| Combination Sum II ✅ | Pick each at most once |
| Subset Sum Variants | Check/count/generate subsets |

### 🔁 **Related Problems**

| Problem Title | Type |
| --- | --- |
| 🔹 Combination Sum I | Pick same element unlimited times |
| 🔹 Combination Sum II | Pick each number once, skip duplicates |
| 🔹 Subset Sum | Check if subset sums to target |
| 🔹 Count Subsets with Given Sum | Count version |
| 🔹 Partition Equal Subset Sum | Can array be split into two equal sum subsets |
| 🔹 Target Sum | Add + or - to reach target |
| 🔹 Subset II | Generate all unique subsets (with duplicates) |
| 🔹 K Sum Subsets | Subsets with size k and sum = target |
| 🔹 Word Break I / II | Recursion + memoization for valid partitions |