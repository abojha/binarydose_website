---
title: Check if Number if Power of 2 or Not
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given an integer `n`, return `*true` if it is a power of two. Otherwise, return `false`*.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2x`.

- Example:
    
    **Example 1:**
    
    ```
    Input: n = 1
    Output: true
    Explanation:20 = 1
    
    ```
    
    **Example 2:**
    
    ```
    Input: n = 16
    Output: true
    Explanation:24 = 16
    
    ```
    
    **Example 3:**
    
    ```
    Input: n = 3
    Output: false
    ```
    

---

---

## 💡 Solution: Bit Manipulation – One-Liner Trick

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        // A power of two has exactly one set bit, so n & (n - 1) == 0
        return n > 0 && (n & (n - 1)) == 0;
    }
};

```

---

## 🧠 Solution: Bit Manipulation – Count Set Bits

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if(n < 0) return false;  // Negative numbers can't be powers of two

        int count = 0;
        while(n > 0){
            if(n & 1)  // Check if the least significant bit is 1
                count++;
            n = n >> 1;  // Right shift to check next bit
        }

        return count == 1;  // Power of two has exactly one set bit
    }
};

```

---

## 📝 How It Works

### ✅ Solution 1: `n & (n - 1)`

- The expression `(n & (n - 1))` removes the **lowest set bit** in `n`.
- If there's only one set bit, this operation will yield `0`.
- Combine with `n > 0` to handle 0 and negatives.

**Example**:

- `n = 8 (1000)`, `n - 1 = 7 (0111)`
- `8 & 7 = 0` → valid power of two ✅

---

### ✅ Solution 2: Count Set Bits

- Traverse all bits using right shift.
- Count how many 1s are present.
- If only **one 1**, then `n` is a power of two.

**Example**:

- `n = 8 → 1000` → only one `1` → return true

---

## 🧩 Key Formula / Insight

- **Power of Two** means: `binary(n)` has **exactly one bit set**.
- Trick:
    
    ```cpp
    n > 0 && (n & (n - 1)) == 0
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| `n & (n - 1)` | O(1) | O(1) |
| Count Set Bits | O(log n) | O(1) |

---

## ⚠️ Edge Cases

- `n <= 0` → not a power of two
- Works for large values of `n`
- `n = 1` is valid (`2⁰`)

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Logarithm Check | O(1) | May fail due to floating-point precision |
| Bit Count | O(log n) | Clear and simple logic |
| Bit Trick | O(1) | Most optimal and clean |

---

## 🔁 Related Problems

- LeetCode 231 – Power of Two
- LeetCode 191 – Number of 1 Bits
- LeetCode 326 – Power of Three
- LeetCode 342 – Power of Four

---