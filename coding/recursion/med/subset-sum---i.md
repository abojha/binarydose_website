---
title: Subset Sum - I
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

 Given an array print all the sum of the subset generated from it, in the increasing order.

- Example:
    
    ```
    Example 1:
    
    Input: N = 3, arr[] = {5,2,1}
    
    Output: 0,1,2,3,5,6,7,8
    
    Explanation: We have to find all the subset’s sum and print them.in this case the generated subsets are [ [], [1], [2], [2,1], [5], [5,1], [5,2]. [5,2,1],so the sums we get will be  0,1,2,3,5,6,7,8
    
    Input: N=3,arr[]= {3,1,2}
    
    Output: 0,1,2,3,3,4,5,6
    
    Explanation: We have to find all the subset’s sum and print them.in this case the generated subsets are [ [], [1], [2], [2,1], [3], [3,1], [3,2]. [3,2,1],so the sums we get will be  0,1,2,3,3,4,5,6
    ```
    

---

---

### Solution:

```cpp
// Helper function to calculate subset sums using recursion
void subsetSumsHelper(int ind, vector<int> &arr, int n, vector<int> &ans, int sum) {
    // Base Case: If index reaches end of array, store the accumulated sum
    if (ind == n) {
        ans.push_back(sum);
        return;
    }

    // Include the current element in the sum
    subsetSumsHelper(ind + 1, arr, n, ans, sum + arr[ind]);

    // Exclude the current element from the sum
    subsetSumsHelper(ind + 1, arr, n, ans, sum);
}

// Main function to return all possible subset sums
vector<int> subsetSums(vector<int> arr, int n) {
    vector<int> ans;  // Stores all subset sums
    subsetSumsHelper(0, arr, n, ans, 0);  // Initial recursive call
    sort(ans.begin(), ans.end());  // Optional: Sorting the subset sums
    return ans;
}

```

---

### ✅ **How It Works**

This algorithm recursively generates all possible subsets of a given array and calculates their sums.

At each index, you have two choices:

- Include the element: Add `arr[ind]` to the current sum.
- Exclude the element: Proceed without adding it.

When the recursion reaches the end (`ind == n`), it stores the current sum in the `ans` vector.

All such sums are finally returned, optionally sorted.

---

### 🧩 **Key Formula**

This problem uses **recursion + backtracking**:

```
Total Subsets = 2^n
```

Each subset contributes a sum to the answer.

---

### ⏱️ **Time & Space Complexity**

- **Time Complexity:** `O(2^n)`
    
    There are 2 choices (pick or not) for each element.
    
- **Space Complexity:** `O(2^n)` for storing all subset sums in `ans`.
    
    Recursion stack space is `O(n)` in the worst case.
    

---

### ⚠️ **Edge Cases**

- `arr` is empty → Should return a vector with a single element `0`.
- All elements are zero → Subsets will still produce `0` multiple times.
- Negative numbers → Still valid; sums can be negative.

---

### 💡 **Other Approaches**

- **Iterative Bitmasking Approach:** Use bitmasks to generate all subsets and compute their sums.
- **Memoization:** Not useful here unless there's a follow-up like counting specific sums.

---

### 🔁 **Related Problems**

- Subset Sum Problem
- Generate All Subsets (Power Set)
- Partition Equal Subset Sum
- Target Sum (Leetcode 494)
- Count of Subsets with Given Sum