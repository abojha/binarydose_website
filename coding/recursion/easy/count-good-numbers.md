---
title: Count Good Numbers
description: ""
tags:
  - easy
  - recursion
---

### Problem Statement:

A digit string is **good** if the digits **(0-indexed)** at **even** indices are **even** and the digits at **odd** indices are **prime** (`2`, `3`, `5`, or `7`).

- For example, `"2582"` is good because the digits (`2` and `8`) at even positions are even and the digits (`5` and `2`) at odd positions are prime. However, `"3245"` is **not** good because `3` is at an even index but is not even.

Given an integer `n`, return *the **total** number of good digit strings of length* `n`. Since the answer may be large, **return it modulo** `109 + 7`.

A **digit string** is a string consisting of digits `0` through `9` that may contain leading zeros.

- Example:
    
    ```
    Example 1:
    
    Input: n = 1
    Output: 5
    Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".
    Example 2:
    
    Input: n = 4
    Output: 400
    Example 3:
    
    Input: n = 50
    Output: 564908303
    ```
    

---

---

## ✅ Solution: Fast Exponentiation (Recursive)

```cpp
class Solution {
public:
    long long MOD = 1e9 + 7;

    // Fast recursive exponentiation
    long long recursivePow(long long x, long long n) {
        if(n == 0) return 1;
        if(n == 1) return x % MOD;

        long long half = recursivePow(x, n / 2) % MOD;

        if(n % 2 == 0)
            return (half * half) % MOD;
        else
            return (x % MOD * ((half * half) % MOD)) % MOD;
    }

    int countGoodNumbers(long long n) {
        // Even indices (0-based) -> digits: 0,2,4,6,8 => 5 options
        // Odd indices -> primes: 2,3,5,7 => 4 options
        // Total positions = n
        long long half = n / 2;
        long long evenCount = (n % 2 == 0) ? half : half + 1;
        long long oddCount = n / 2;

        // Total = 5^evenCount * 4^oddCount
        long long pow5 = recursivePow(5, evenCount);
        long long pow4 = recursivePow(4, oddCount);

        return (pow5 * pow4) % MOD;
    }
};

```

---

### Iterative Exponentiation (Can replace Recursive Exponentiation)

```cpp
long long iterativePow(long long x, long long n, long long MOD) {
    long long result = 1;
    x = x % MOD;  // Ensure base is within MOD

    while(n > 0){
        if(n % 2 == 1) {
            result = (result * x) % MOD;
        }
        x = (x * x) % MOD;
        n /= 2;
    }

    return result;
}

```

## 📝 How It Works

- Good digits:
    - Even positions: `{0, 2, 4, 6, 8}` → 5 choices
    - Odd positions: `{2, 3, 5, 7}` → 4 choices
- For `n` total digits:
    - `n / 2` digits are at odd indices (1-based)
    - `ceil(n / 2)` digits are at even indices
- We compute:
    - `5^(even_count) * 4^(odd_count)`
- Fast Exponentiation is used to compute `a^b % MOD` efficiently in `O(log b)`.

---

## 🧩 Key Formula

```cpp
Total = (5 ^ even_positions) * (4 ^ odd_positions) % MOD

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(log n) |
| Space (stack) | O(log n) due to recursion |

You can make it iterative to reduce space to O(1).

---

## ⚠️ Edge Cases

- `n = 0` → return 1 (no digits = 1 valid string: empty)
- `n = 1` → only one position (even index), 5 choices

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Naive multiplication | O(n) ❌ | O(1) |
| Recursive power (current) | O(log n) ✅ | O(log n) |
| Iterative power | O(log n) ✅ | O(1) |

---

## 🔁 Related Problems

- [Leetcode 50 – Pow(x, n)](https://leetcode.com/problems/powx-n/)
- [Leetcode 1922 – Count Good Numbers](https://leetcode.com/problems/count-good-numbers/)
- [Modular Exponentiation (GFG)](https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/)

---