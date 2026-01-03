---
title: Find the number that appears once, and the other numbers twice
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given a non-empty array of integers **arr**, every element appears twice except for one. Find that single one.

```
Example 1:
Input Format: arr[] = {2,2,1}
Result: 1
Explanation: In this array, only the element 1 appear once and so it is the answer.

Example 2:
Input Format: arr[] = {4,1,2,1,2}
Result: 4
Explanation: In this array, only element 4 appear once and the other elements appear twice. So, 4 is the answer.
```

---

---

### ✅ Solution: Bit Manipulation (XOR)

```cpp
class Solution {
public:
    int singleNumber(vector<int>& numbers) {
        // XOR of all numbers — duplicates cancel out, only the unique one remains
        int uniqueNumber = 0;
        for (int i = 0; i < numbers.size(); i++) {
            uniqueNumber ^= numbers[i];  // XOR each number into the result
        }
        return uniqueNumber;
    }
};

```

---

## 📝 How It Works

- XOR has properties:
    - `a ^ a = 0`
    - `a ^ 0 = a`
    - XOR is **commutative and associative**, so order doesn’t matter.
- In an array where every element appears **twice** except one, XOR-ing all elements will cancel out the pairs and leave the single unique number.

---

## 🧩 Key Formula

```
uniqueNumber = nums[0] ^ nums[1] ^ ... ^ nums[n-1]

```

→ All pairs cancel out due to `x ^ x = 0`

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |

---

## ⚠️ Edge Cases

- All elements are duplicates except one → works ✅
- Only one element in the array → returns that element ✅
- Array not sorted → no issue, XOR works regardless of order ✅

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| XOR (this) | O(n) | O(1) | ✅ Most optimal |
| HashMap (count freq) | O(n) | O(n) | ✅ But extra space needed |
| Sorting + Compare Adj | O(n log n) | O(1) | ❌ Slower due to sorting |

---

## 🔁 Related Problems

- [136. Single Number](https://leetcode.com/problems/single-number/)
- [137. Single Number II (appears thrice)](https://leetcode.com/problems/single-number-ii/)
- [260. Single Number III (two unique numbers)](https://leetcode.com/problems/single-number-iii/)