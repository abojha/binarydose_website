---
title: Minimum Bit Flips to Convert Number
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

A **bit flip** of a number `x` is choosing a bit in the binary representation of `x` and **flipping** it from either `0` to `1` or `1` to `0`.

- For example, for `x = 7`, the binary representation is `111` and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get `110`, flip the second bit from the right to get `101`, flip the fifth bit from the right (a leading zero) to get `10111`, etc.

Given two integers `start` and `goal`, return *the **minimum** number of **bit flips** to convert* `start` *to* `goal`.

- Example:
    
    **Example 1:**
    
    ```
    Input: start = 10, goal = 7
    Output: 3
    Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
    - Flip the first bit from the right: 1010 -> 1011.
    - Flip the third bit from the right: 1011 -> 1111.
    - Flip the fourth bit from the right:1111 ->0111.
    It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
    ```
    
    **Example 2:**
    
    ```
    Input: start = 3, goal = 4
    Output: 3
    Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
    - Flip the first bit from the right: 011 -> 010.
    - Flip the second bit from the right: 010 -> 000.
    - Flip the third bit from the right:000 ->100.
    It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
    ```
    

---

## ✅ Solution: Bit Manipulation (Count Bit Flips using XOR)

```cpp
class Solution {
public:
    int minBitFlips(int start, int goal) {
        int xorResult = start ^ goal; // XOR to find differing bits
        int flipCount = 0;

        // Count set bits in xorResult (i.e., number of differing bits)
        while (xorResult > 0) {
            if (xorResult & 1) flipCount++; // Check if least significant bit is 1
            xorResult >>= 1;                // Right shift to move to next bit
        }

        return flipCount;
    }
};

```

---

## 📝 How It Works

- The **XOR operation** (`^`) returns `1` at positions where the bits of `start` and `goal` differ.
- For example:
    
    ```
    start = 0101
    goal  = 1100
    XOR   = 1001 (2 bits differ)
    
    ```
    
- We then count how many `1`s are present in the XOR result, which equals the **minimum number of bit flips** needed to convert `start` to `goal`.

---

## 🧩 Key Formula / Logic

- `start ^ goal` → Highlights differing bits.
- Count set bits in the result → `number of bit flips`.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(1) |
| Space | O(1) |

(Only 32 bits in an int → constant time.)

---

## ⚠️ Edge Cases

- `start == goal` ⇒ No flips needed (XOR = 0)
- Large bit patterns: Handles well since it checks one bit at a time
- Negative numbers work too since XOR treats bits consistently (though question context may restrict to non-negative ints)

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Built-in __builtin_popcount | O(1) | Cleaner alternative if allowed |

```cpp
return __builtin_popcount(start ^ goal);

```

---

## 🔁 Related Problems

- [Leetcode 2220 – Minimum Bit Flips to Convert Number](https://leetcode.com/problems/minimum-bit-flips-to-convert-number/)
- [Leetcode 191 – Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- [Leetcode 461 – Hamming Distance](https://leetcode.com/problems/hamming-distance/)
- [Leetcode 136 – Single Number](https://leetcode.com/problems/single-number/)

---

## 🛠️ Real-world Analogy

Imagine two switchboards representing binary numbers — each switch represents a bit. To make the first board match the second, you just count the number of switches that need flipping — exactly what XOR helps you do.