---
title: Sqrt(x)
description: ""
tags:
  - binary-search
  - easy
---

### Problem Statement:

Given a non-negative integer `x`, return *the square root of* `x` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

- For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.
- Example:
    
    **Example 1:**
    
    ```
    Input: x = 4
    Output: 2
    Explanation: The square root of 4 is 2, so we return 2.
    
    ```
    
    **Example 2:**
    
    ```
    Input: x = 8
    Output: 2
    Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
    ```
    

---

## Solution: Binary Search

```cpp
class Solution {
public:
    int mySqrt(int x) {
        // Edge case: sqrt(0) = 0
        if(x == 0) return 0;

        long long low = 1;
        long long high = x;
        long long result = 0;

        while(low <= high){
            long long mid = (low + high) / 2;

            if(mid * mid == x){
                return mid; // Perfect square
            }
            else if(mid * mid < x){
                result = mid;      // Store possible answer
                low = mid + 1;     // Move to right half
            }
            else{
                high = mid - 1;    // Move to left half
            }
        }

        return result; // Floor value of sqrt(x)
    }
};

```

---

## 📝 How It Works

- The problem asks for the **integer part (floor) of the square root** of a number.
- We use **binary search** on the range `[1, x]`.
- At each step:
    - Compute `mid = (low + high) / 2`.
    - If `mid * mid == x`, return `mid` (perfect square case).
    - If `mid * mid < x`, store `mid` as a possible answer and search the right half.
    - If `mid * mid > x`, search the left half.
- When the loop ends, `result` holds the largest integer such that `result * result <= x`.

---

## 🧩 Key Formula / Recurrence

Binary search narrowing:

$$
\text{mid} = \frac{\text{low} + \text{high}}{2}
$$


Adjust bounds:

- If $\text{mid}^2 \le x$ → move right (`low = mid + 1`)
- If $\text{mid}^2 > x$ → move left (`high = mid - 1`)

---

## ⏱️ Time & Space Complexity

- **Time Complexity:** $O(\log x)$ → each step halves the search space.
- **Space Complexity:** $O(1)$ → only a few variables are used.

---

## ⚠️ Edge Cases

- `x = 0` → answer should be `0`.
- `x = 1` → answer should be `1`.
- Large values of `x` (near `2^31 - 1`) → use `long long` to avoid overflow when computing `mid * mid`.

---

## 💡 Other Approaches

1. **Linear Search (Brute Force):** Check from `1` to `x` until `i*i > x`. (O(√x)) ❌ Slow for large numbers.
2. **Newton’s Method (Babylonian method):** Iterative formula
    $$
    guess=guess+xguess2guess = \frac{guess + \frac{x}{guess}}{2}
    $$
    
    Converges faster, ~O(log x) but more complex.
    

---

## 🔁 Related Problems

- [x^n power function with binary exponentiation]
- [Find peak element (Binary Search application)]
- [Search in rotated sorted array]

---