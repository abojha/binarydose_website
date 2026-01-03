---
title: Single Number
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given a **non-empty** array of integers `nums`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

- Example:
    
    **Example 1:**
    
    **Input:** nums = [2,2,1]
    
    **Output:** 1
    
    **Example 2:**
    
    **Input:** nums = [4,1,2,1,2]
    
    **Output:** 4
    
    **Example 3:**
    
    **Input:** nums = [1]
    
    **Output:** 1
    

---

## ✅ Solution: Bit Manipulation (Using XOR)

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int xorResult = 0;

        for (auto num : nums) {
            xorResult ^= num; // XOR all numbers
        }

        return xorResult; // The unique number remains
    }
};

```

---

## 📝 How It Works

- The XOR (`^`) operation has two key properties:
    - `a ^ a = 0` (any number XOR with itself is 0)
    - `a ^ 0 = a` (any number XOR with 0 remains unchanged)
- In this problem:
    - Every number appears **twice** except one.
    - XORing all numbers cancels out the duplicates and leaves only the single number.

---

## 🧩 Key Formula / Logic

```cpp
xorResult ^= nums[i]; // cancels out all duplicates

```

Result = element that appears once.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

Just one pass and constant memory.

---

## ⚠️ Edge Cases

- Array with only one element.
- All pairs except one → the algorithm handles it naturally.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Hash Map Frequency | O(N) | O(N) | Easy to implement, slower |
| Sorting + Scan | O(N log N) | O(1) | Extra time for sorting |
| XOR ✅ | O(N) | O(1) | Best and most elegant |

---

## 🔁 Related Problems

- [Leetcode 136 – Single Number](https://leetcode.com/problems/single-number/)
- [Leetcode 137 – Single Number II](https://leetcode.com/problems/single-number-ii/)
- [Leetcode 260 – Single Number III](https://leetcode.com/problems/single-number-iii/)
- [Leetcode 389 – Find the Difference](https://leetcode.com/problems/find-the-difference/)

---

## 🛠️ Real-world Analogy

Imagine everyone in a room shakes hands twice with each other — except one person who only shakes hands once. XOR lets you magically detect who it is by pairing and canceling out all handshakes.