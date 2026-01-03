---
title: Find the missing number in an array
description: ""
tags:
  - array
  - easy
---

Summary: use XOR trick

### Problem Statement:

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array.*

- Example
    
    ```
    ****Example 1:**
    
    **Input:** nums = [3,0,1]
    
    **Output:** 2
    
    **Explanation:**
    
    `n = 3` since there are 3 numbers, so all numbers are in the range `[0,3]`. 2 is the missing number in the range since it does not appear in `nums`.
    
    **Example 2:**
    
    **Input:** nums = [0,1]
    
    **Output:** 2
    
    **Explanation:**
    
    `n = 2` since there are 2 numbers, so all numbers are in the range `[0,2]`. 2 is the missing number in the range since it does not appear in `nums`.
    
    **Example 3:**
    
    **Input:** nums = [9,6,4,2,3,5,7,0,1]
    
    **Output:** 8
    
    **Explanation:**
    
    `n = 9` since there are 9 numbers, so all numbers are in the range `[0,9]`. 8 is the missing number in the range since it does not appear in `nums`.**
    ```
    

---

## ✅ Solution Label: Bit Manipulation (XOR) and Math Formula

---

## 📝 How It Works

### 🔹 XOR Approach (C++)

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int ans = nums.size(); // Initialize with 'n'
        for (int i = 0; i < nums.size(); i++)
            ans ^= i ^ nums[i]; // XOR with both index and element
        return ans; // Remaining number is the missing one
    }
};

```

- This uses the property of XOR: `a ^ a = 0` and `a ^ 0 = a`.
- Every number `0` to `n` is present except one.
- XOR all elements of the array and all numbers from `0` to `n`.
- All numbers cancel out, and the missing number remains.

---

### 🔹 Sum Formula Approach (Python)

```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        total = n * (n + 1) // 2  # Sum from 0 to n
        return total - sum(nums) # Difference is the missing number

```

- The sum of numbers from `0` to `n` is `n(n+1)/2`.
- Subtract the sum of the array to get the missing number.

---

## 🧩 Key Formula / Recurrence

- **XOR Formula:**
    
    `missing = 0 ^ 1 ^ 2 ^ ... ^ n ^ nums[0] ^ nums[1] ^ ... ^ nums[n-1]`
    
- **Sum Formula:**
    
    `missing = (n * (n + 1)) / 2 - sum(nums)`
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| XOR | O(n) | O(1) |
| Sum Formula | O(n) | O(1) |

---

## ⚠️ Edge Cases

- Array contains all numbers except `0` → works fine.
- Array contains all numbers except `n` → works fine.
- Array of length 1 (e.g. `[0]` or `[1]`) → still works as expected.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Sorting + Search | O(n log n) | O(1) or O(n) |
| Hash Set | O(n) | O(n) |

---

## 🔁 Related Problems

- [268. Missing Number](https://leetcode.com/problems/missing-number/)
- [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)
- [136. Single Number](https://leetcode.com/problems/single-number/)
- [41. First Missing Positive](https://leetcode.com/problems/first-missing-positive/)

---

## 🛠️ Other Notes

- XOR method is very efficient and elegant—no risk of overflow unlike the sum formula.
- Sum formula is easy to implement but may overflow in other languages with fixed integer sizes (not Python/C++ with large ints).

Let me know if you'd like a **tabulation** or **space-optimized** variant of a similar problem!