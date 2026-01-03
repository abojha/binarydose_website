---
title: Division without using multiplication, division and mod operator
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

Given two integers **dividend** and **divisor**. Find the quotient after dividing the **dividend** by **divisor** without using multiplication, division and mod operator.

Note: If the quotient is strictly greater than 2^31 - 1, return **2^31 - 1** and if the quotient is strictly less than -2^31, then return **-2^31**.

- Example:
    
    **Examples:**
    
    ```
    Input:dividend = 10, divisor= 3
    Output: 3
    Exaplanation:10/3 gives quotient as 3 and remainder as 1.
    ```
    
    ```
    Input:dividend  = 43, divisor = -8
    Output: -5
    Explanation:43/-8 gives quotient as -5 and remainder as 3.
    ```
    

---

## ✅ Solution: Bit Manipulation (Efficient Division without `/`)

```cpp
class Solution {
  public:
    long long divide(long long dividend, long long divisor) {
        if (dividend == 0) return 0;

        // Determine the sign of the result
        int sign = (dividend < 0) ^ (divisor < 0) ? -1 : 1;

        // Convert both dividend and divisor to positive
        long long a = abs(dividend);
        long long b = abs(divisor);
        long long quotient = 0;

        // Start from the highest bit and try to subtract (divisor << i) from dividend
        for (int i = 31; i >= 0; i--) {
            if ((b << i) <= a) {
                a -= (b << i);               // Subtract shifted divisor from current dividend
                quotient |= (1LL << i);      // Add the power of 2 to the quotient
            }
        }

        return quotient * sign;
    }
};

```

---

## 📝 How It Works

- We're asked to divide two integers **without using `/`, , or `%`**.
- We perform the division using **bit manipulation**:
    - The idea is similar to **binary long division**.
    - At each step, we check if `divisor << i` (divisor multiplied by 2ⁱ) can fit into the current dividend.
    - If yes, subtract it and add `1 << i` to the result.
- Finally, multiply the result by the appropriate sign based on input signs.

---

## 🧩 Key Formula / Logic

- For each bit position `i` from 31 down to 0:
    
    ```
    if (divisor << i) <= dividend:
        dividend -= (divisor << i)
        quotient |= (1 << i)
    
    ```
    
- Result sign = `+` if both numbers have same sign,  otherwise.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(32) = O(1) |
| Space | O(1) |

Only 32 iterations in the worst case.

---

## ⚠️ Edge Cases

- `dividend = 0` ⇒ result is `0`
- Sign handling is done via XOR: `(dividend < 0) ^ (divisor < 0)`
- For LeetCode-style problems:
    - **INT_MIN / -1** can overflow → might need to handle separately (e.g. clamp to `INT_MAX`)
    - In this version, since we use `long long`, overflow is naturally handled

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Repeated subtraction | O(N) | Slow for large input |
| Binary search | O(log N) | Good for division-like logic |
| Bit manipulation ✅ | O(1) | Most optimal and clean |

---

## 🔁 Related Problems

- [Leetcode 29 – Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
- [Leetcode 371 – Sum of Two Integers (No + or -)](https://leetcode.com/problems/sum-of-two-integers/)
- [Leetcode 50 – Pow(x, n)](https://leetcode.com/problems/powx-n/)

---

## 🛠️ Real-world Analogy

This mimics how we **manually divide numbers**: keep subtracting multiples of the divisor (like 10×, 5×, etc.) to get the quotient.

In computers, **shifting bits** allows us to quickly test and subtract powers of 2 multiples.