---
title: Longest Increasing Sequence using Binary Search
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Given an integer array `nums`, return *the length of the longest **strictly increasing subsequence***.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [10,9,2,5,3,7,101,18]
    Output: 4
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
    Example 2:
    
    Input: nums = [0,1,0,3,2,3]
    Output: 4
    Example 3:
    
    Input: nums = [7,7,7,7,7,7,7]
    Output: 1
    ```
    

---

---

## ✅ Solution: Binary Search (Patience Sorting Technique)

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> temp;         // Holds the potential ends of LIS

        for(int i = 0; i < n; i++){
            if(temp.empty() || nums[i] > temp.back()){
                // If current number extends LIS, push it
                temp.push_back(nums[i]);
            }
            else {
                // Replace the first element >= nums[i]
                int ind = lower_bound(temp.begin(), temp.end(), nums[i]) - temp.begin();
                temp[ind] = nums[i];
            }
        }

        // Length of temp is the LIS length
        return temp.size();
    }
};

```

---

## 📝 How It Works

- The idea is inspired by the **Patience Sorting** card game.
- Maintain a `temp` array where:
    - Each element represents the **smallest possible tail** of an increasing subsequence of a given length.
- For every `nums[i]`:
    - If `nums[i] > temp.back()`: extend the LIS.
    - Else: use `lower_bound()` to find the first number in `temp` ≥ `nums[i]` and replace it.
- This ensures `temp` is always increasing, and its length gives the LIS length.

---

## 🧩 Key Insight

- We do **not build the actual sequence**, just the length.
- The **`temp` vector is not the actual LIS**, but helps track its length efficiently.

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| Time | O(N log N) ✅ |
| Space | O(N) ✅ |

---

## ⚠️ Edge Cases

- `[]` → return 0
- `[5,4,3,2,1]` → LIS = 1
- `[1,2,3,4,5]` → LIS = 5
- `[10,9,2,5,3,7,101,18]` → LIS = 4

---

## 💡 Other Approaches

| Method | Time | Space |
| --- | --- | --- |
| Memoization | O(N²) | O(N²) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) |
| **Binary Search** ✅ | **O(N log N)** ✅ | **O(N)** ✅ |

---

## 🔁 Related Problems

- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)
- [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
- [Longest Bitonic Subsequence (GFG)](https://www.geeksforgeeks.org/longest-bitonic-subsequence/)

---