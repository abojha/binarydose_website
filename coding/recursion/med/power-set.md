---
title: Power Set
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given a string, find all the possible subsequences of the string.

- Example:
    
    ```
    Example 1:
    Input: str = "abc"
    Output: a ab abc ac b bc c
    Explanation: Printing all the 7 subsequence for the string "abc".
    
    Example 2:
    Input: str = "aa"
    Output: a a aa 
    Explanation: Printing all the 3 subsequences for the string "aa"
    ```
    

---

---

### Solution:

```cpp
class Solution {
  public:
    // Recursive function to generate all subsets
    void generate(int n, int current, vector<int> &arr,
                  vector<vector<int>> &list, vector<int> &subset) {

        if (current == n) {
            list.push_back(subset);  // base case: add current subset
            return;
        }

        // Include current element
        subset.push_back(arr[current]);
        generate(n, current + 1, arr, list, subset);

        // Backtrack: Exclude current element
        subset.pop_back();
        generate(n, current + 1, arr, list, subset);
    }

    vector<vector<int>> subsets(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> list;
        vector<int> subset;

        generate(n, 0, arr, list, subset);
        sort(list.begin(), list.end());  // optional: sort lexicographically
        return list;
    }
};

```

---

### ✅ **How It Works**

- This problem generates all possible subsets (also known as the **power set**).
- At each index, you make two recursive calls:
    1. Include the current element in the subset
    2. Exclude the current element from the subset
- When the index reaches the end (`current == n`), you push the current subset into the final result.

---

### 🧠 **Key Points**

- Classic example of **backtracking** using the **include/exclude** method.
- Subset vector is modified in-place and then **backtracked** (`pop_back`) to explore all paths.
- Sorting the result at the end gives **lexicographically ordered** subsets.

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(2^n × n) ✅ |
| Space | O(n) recursion + O(2^n × n) result storage |

---

### ⚠️ **Edge Cases**

- `arr = []` → output = `[ [] ]` (1 empty subset)
- Duplicates? This code assumes all elements are **distinct**. For handling duplicates, you need to **skip duplicates during recursion** (not required here).
- Negative numbers are handled fine as well.

---

### 💡 **Other Approaches**

| Approach | Time |
| --- | --- |
| Recursive ✅ | O(2^n) |
| Iterative (bitmask) | O(2^n) |
| DFS-style subset tree | O(2^n) |

---

### 🔁 **Related Problems**

- Subsets II (with duplicates)
- Combinations
- Permutations
- Power Set using Bitmasking
- Partition to K Equal Subsets