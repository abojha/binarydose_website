---
title: Pow(x, n)
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates `x` raised to the power `n` (i.e., `xn`).

- Example:
    
    **Example 1:**
    
    ```
    Input: x = 2.00000, n = 10
    Output: 1024.00000
    
    ```
    
    **Example 2:**
    
    ```
    Input: x = 2.10000, n = 3
    Output: 9.26100
    
    ```
    
    **Example 3:**
    
    ```
    Input: x = 2.00000, n = -2
    Output: 0.25000
    Explanation: 2-2 = 1/22 = 1/4 = 0.25
    ```
    

---

### ✅ Solution: Binary Exponentiation (Iterative)

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        long long exp = n;  // Use long long to avoid overflow for INT_MIN
        if(exp < 0) {
            x = 1 / x;       // Take reciprocal if exponent is negative
            exp = -exp;
        }

        double result = 1;
        while(exp > 0){
            if(exp % 2 == 1)     // If exponent is odd, multiply result
                result *= x;
            x *= x;              // Square the base
            exp /= 2;            // Halve the exponent
        }
        return result;
    }
};

```

---

## 📝 How It Works

- The function implements **Binary Exponentiation** to compute `x^n` in `O(log n)` time.
- It first handles the **negative exponent case** by taking the reciprocal (`1/x`) and flipping the sign.
- Then, using a **loop**, it squares the base `x` and halves the exponent `n` on each step.
- If the exponent is **odd**, it multiplies the result by current `x` (before squaring).
- This way, we reduce the number of multiplications from `O(n)` to `O(log n)`.

---

## 🧩 Key Formula / Recurrence

- **Binary Exponentiation**:
    
    ```
    x^n = (x^2)^(n/2)       if n is even
    x^n = x * (x^2)^(n/2)   if n is odd
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| Time | O(log n) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- `n = 0`: returns 1
- `x = 0`: returns 0 (except for `0^0`, usually treated as 1)
- `n = INT_MIN`: handled using `long long` to avoid overflow when `n`
- Negative `x` with odd/even `n`: sign handled correctly

---

## 💡 Other Approaches

| Approach | Time | When to Use |
| --- | --- | --- |
| Recursive Binary Exponentiation | O(log n) | Cleaner, uses recursion |
| Brute Force (x * x * ... * x) | O(n) | Only for small `n` (not recommended) |

---

## 🔁 Related Problems

- [**Leetcode 50. Pow(x, n)**](https://leetcode.com/problems/powx-n/)
- Implement integer exponentiation modulo `m`
- Matrix exponentiation (`T^n`)
- Fast modular exponentiation (`x^n % m`)

---