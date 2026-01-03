---
title: Two odd Occuring
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

Given an unsorted array, **arr**[] of positive numbers that contains **even** number of occurrences for all numbers except two numbers. Return that two numbers in **decreasing** order which has **odd** occurrences.

- Example:
    
    **Examples:**
    
    ```
    Input:arr = [4, 2, 4, 5, 2, 3, 3, 1]
    Output: [5, 1]
    Explanation: 5 and 1 have odd occurrences.
    ```
    
    ```
    Input:arr[] = [1, 7, 5, 7, 5, 4, 7, 4]
    Output: [7, 1]
    Explanation: 7 and 1 have odd occurrences.
    ```
    

---

---

### ✅ Solution: Bit Manipulation (XOR Partitioning)

```cpp
class Solution {
  public:
    vector<int> twoOddNum(vector<int>& arr) {
        // Step 1: XOR of all elements gives xor of the two odd-occurring numbers
        int xorAll = 0;
        for(auto num : arr){
            xorAll ^= num;
        }

        // Step 2: Find any set bit (we use rightmost set bit) to differentiate the two numbers
        int rightmostSetBit = xorAll & -xorAll; // isolates the rightmost 1-bit

        int num1 = 0, num2 = 0;

        // Step 3: Partition numbers based on the set bit and take XOR separately
        for(auto num : arr){
            if(num & rightmostSetBit){
                num1 ^= num; // belongs to the group where the bit is set
            }
            else {
                num2 ^= num; // belongs to the group where the bit is not set
            }
        }

        // Step 4: Return in decreasing order as per GFG problem requirement
        return {max(num1, num2), min(num1, num2)};
    }
};

```

---

## 📝 How It Works

- XOR of entire array gives `a ^ b`, where `a` and `b` are the two odd-occurring numbers.
- At least one bit in `a ^ b` will be set (they are different).
- We use the **rightmost set bit** to partition the array into two groups:
    - One where this bit is **set** → contains one of the odd elements.
    - One where this bit is **unset** → contains the other odd element.
- XORing each group gives the two required numbers.

---

## 🧩 Key Formula

- Let `xorAll = a ^ b` (the two odd-count numbers).
- Use `setBit = xorAll & -xorAll` to isolate a bit that differs.
- Partition and reduce using XOR.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(N) |
| 💾 Space | O(1) |

---

## ⚠️ Edge Cases

- Both odd numbers are the same → **not valid** as per constraints.
- Exactly **two numbers** occur an odd number of times.
- Works with unsorted input and duplicates.

---

## 💡 Other Approaches

- HashMap Count → O(N) time, O(N) space ❌
- Bitwise XOR ✅ is optimal and space-efficient.

---

## 🔁 Related Problems

- Find the one number that appears once while others appear twice.
- Find the missing and repeating number.
- Single Number I & II (Leetcode)