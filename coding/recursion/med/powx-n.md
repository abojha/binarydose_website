---
title: Pow(x, n)
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates `x` raised to the power `n` (i.e., `xn`).

- Example:
    
    ```
    Example 1:
    
    Input: x = 2.00000, n = 10
    Output: 1024.00000
    Example 2:
    
    Input: x = 2.10000, n = 3
    Output: 9.26100
    Example 3:
    
    Input: x = 2.00000, n = -2
    Output: 0.25000
    Explanation: 2-2 = 1/22 = 1/4 = 0.25
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:
    double recursivePow(double x, long long n) {
        if(n == 0) return 1;
        if(n == 1) return x;

        double half = recursivePow(x, n / 2);

        if(n % 2 == 0)
            return half * half;
        else
            return x * half * half;
    }

    double myPow(double x, int n) {
        long long exp = n;  // Safely store exponent as long long
        if(exp < 0) {
            x = 1 / x;
            exp = -exp;
        }

        return recursivePow(x, exp);
    }
};

```

---

### ✅ **How It Works**

- You want to compute: `x^n`
- Key idea:
    - If `n == 0`, return `1`
    - If `n % 2 == 0`,
        
        `x^n = (x^(n/2)) * (x^(n/2))`
        
    - If `n % 2 == 1`,
        
        `x^n = x * (x^(n/2)) * (x^(n/2))`
        
- Handle negative `n` by converting to positive and inverting `x` → `1 / x^n`

---

### 🧠 **Key Points**

- Convert `n` to `long long` to safely handle `INT_MIN = -2^31`
- Recursive breakdown follows **divide and conquer** (splits problem in half)
- Handles large inputs without overflow

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(log n) |
| Space | O(log n) ✅  (recursive stack depth) |

---

### ⚠️ **Edge Cases**

- `x = 0` and `n > 0` → return 0
- `x = 0` and `n <= 0` → undefined (can cause division by zero)
- `n = INT_MIN` → must convert to `long long` to prevent overflow
- `x = 1` or `n = 0` → always return 1

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Iterative Binary Exponentiation ✅ | O(log n) | O(1) |
| Recursive (this) ✅ | O(log n) | O(log n) |

---

### 🔁 **Related Problems**

- Modular Exponentiation
- Matrix Exponentiation (Fibonacci)
- Fast Multiplication
- Implement `pow(x, n)` using recursion