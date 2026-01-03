---
title: Combination Sum - III
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:

- Only numbers `1` through `9` are used.
- Each number is used **at most once**.

Return *a list of all possible valid combinations*. The list must not contain the same combination twice, and the combinations may be returned in any order.

- Example:
    
    ```
    Example 1:
    
    Input: k = 3, n = 7
    Output: [[1,2,4]]
    Explanation:
    1 + 2 + 4 = 7
    There are no other valid combinations.
    Example 2:
    
    Input: k = 3, n = 9
    Output: [[1,2,6],[1,3,5],[2,3,4]]
    Explanation:
    1 + 2 + 6 = 9
    1 + 3 + 5 = 9
    2 + 3 + 4 = 9
    There are no other valid combinations.
    Example 3:
    
    Input: k = 4, n = 1
    Output: []
    Explanation: There are no valid combinations.
    Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:

    void generate(int size, int target, int current, vector<int> &arr, vector<vector<int>> &list, vector<int> &subset){
        if(subset.size() == size){
            if(target == 0){
                list.push_back(subset);
                return;
            }
        }

        if(current == arr.size()){
            return;   
        }
        

        if(arr[current] <= target){
            subset.push_back(arr[current]);
            generate(size, target - arr[current], current + 1, arr, list, subset);
            subset.pop_back();
        }
        generate(size, target, current + 1, arr, list, subset);
    }
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};

        vector<vector<int>> list;
        vector<int> subset;
        generate(k, n, 0, arr, list, subset);
        return list;
    }
};
```

---

### ✅ **How It Works**

- You're asked to **choose `k` numbers** (from 1 to 9, no repeats) such that their **sum equals `n`**
- Use backtracking:
    - At each step: either **include** or **skip** a number
    - Track:
        - Current `subset` (must reach size `k`)
        - Remaining `target` (must reach 0)
- If both are satisfied, store the result

---

### 🧠 **Key Points**

- Use numbers from `1 to 9` only, so no need to pass input array
- Each number used at **most once**
- Backtrack after exploring a number
- Prune branches early if:
    - `subset.size() > k`
    - `target < 0`

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(2⁹) → O(512) worst-case |
| Space | O(k) recursion stack + O(#results × k) |

---

### ⚠️ **Edge Cases**

- `k = 0` or `n = 0` → returns `[]`
- `k = 3, n = 2` → not possible (need at least 1+2+3 = 6)
- `k = 9, n = 45` → only one result: `[1,2,3,4,5,6,7,8,9]`

---

### 💡 **Other Approaches**

| Problem Variant | Rule |
| --- | --- |
| Combination Sum I | Pick any number unlimited times |
| Combination Sum II | Duplicates in array allowed, each number at most once |
| This Problem ✅ | Pick from 1–9, **exactly `k` numbers**, sum = `n` |

---

### 🔁 **Related Problems**

| Problem | Type |
| --- | --- |
| Combination Sum I | Unlimited picks allowed |
| Combination Sum II | Unique combinations with duplicates in input |
| Subsets II | All unique subsets with duplicates |
| Partition Equal Subset Sum | Can array be divided into equal-sum parts |
| Permutations | Generate all arrangements |