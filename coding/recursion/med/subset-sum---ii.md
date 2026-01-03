---
title: Subset Sum - II
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an array of integers that **may contain duplicates** the task is to return all possible subsets. Return only **unique subsets** and they can be in any order.

- Example:
    
    ```
    Example 1:
    
    Input: array[] = [1,2,2]
    
    Output: [ [ ],[1],[1,2],[1,2,2],[2],[2,2] ]
    
    Explanation: We can have subsets ranging from  length 0 to 3. which are listed above. Also the subset [1,2] appears twice but is printed only once as we require only unique subsets.
    
    Input: array[] = [1]
    
    Output: [ [ ], [1] ]
    
    Explanation: Only two unique subsets are available
    ```
    

---

---

```cpp
// User function Template for C++

class Solution {
public:

    // Recursive function to generate unique subsets
    void f(vector<int> &nums, int ind, vector<int> &ds, vector<vector<int>> &list) {
        // Add the current subset to the result list
        list.push_back(ds);

        for(int i = ind; i < nums.size(); i++) {
            // Skip duplicates: If the current element is same as previous and not at the starting index
            if(i != ind && nums[i] == nums[i - 1]) continue;

            // Include current element and move forward
            ds.push_back(nums[i]);
            f(nums, i + 1, ds, list);

            // Backtrack: remove the last element
            ds.pop_back();
        }
    }

    // Function to return all unique subsets
    vector<vector<int>> printUniqueSubsets(vector<int> &nums) {
        vector<int> ds;  // Current subset
        vector<vector<int>> list;  // Final list of subsets

        // Sort to handle duplicates
        sort(nums.begin(), nums.end());

        f(nums, 0, ds, list);
        return list;
    }
};

```

---

### ✅ **How It Works**

The function recursively builds all subsets using a depth-first traversal approach.

It uses backtracking to explore inclusion/exclusion of each element starting from index `ind`.

To avoid duplicate subsets:

- The array is first **sorted**.
- Inside the loop, duplicates are skipped using the condition:
    
    `if(i != ind && nums[i] == nums[i - 1]) continue;`
    

Every time a subset (`ds`) is formed, it is pushed into the result list.

---

### 🧩 **Key Formula**

- Subset generation using backtracking.
- **Duplicate avoidance**:
    
    ```cpp
    if(i != ind && nums[i] == nums[i - 1]) continue;
    
    ```
    

---

### ⏱️ **Time & Space Complexity**

- **Time Complexity:** `O(2^n)`
    
    In the worst case (no duplicates), each element has 2 choices (pick or not).
    
- **Space Complexity:**
    - Recursive stack: `O(n)`
    - Result storage: `O(2^n * k)` (k = average length of subset)

---

### ⚠️ **Edge Cases**

- Empty array → Should return only the empty subset.
- All duplicates like `[1,1,1]` → Must return `[], [1], [1,1], [1,1,1]` (no repetition).
- Negative elements → Should still work properly.

---

### 💡 **Other Approaches**

- **Bitmasking:** Generate subsets using bits and use `set<vector<int>>` to remove duplicates (less efficient).
- **Trie-based filtering:** Use trie to store unique subset paths.

---

### 🔁 **Related Problems**

- [Leetcode 90 - Subsets II](https://leetcode.com/problems/subsets-ii/)
- Power Set Generation
- Permutations with Duplicates
- Combination Sum II

---