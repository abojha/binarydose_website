---
title: Check if Number is Even or Not
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given a positive integer **n**, determine whether it is odd or even. Return **true** if the number is even and **false** if the number is odd.

- Example:
    
    **Examples:**
    
    ```
    Input: n = 15
    Output:false
    Explanation:The number is not divisible by 2, Odd number.
    ```
    
    ```
    Input: n = 44
    Output:true
    Explanation:The number is divisible by 2, Even number.
    ```
    

---

### ✅ Solution: Bit Manipulation

```cpp
class Solution {
  public:
    bool isEven(int n) {
        // If the least significant bit is 1, the number is odd
        // If it's 0, the number is even
        return !(n & 1);
    }
};

```

---

### 📝 How It Works

- Every **even number has 0 as its least significant bit (LSB)**.
- `(n & 1)` checks the LSB:
    - If `n & 1` is `1`, then the number is **odd**.
    - If `n & 1` is `0`, then the number is **even**.
- We use `!` to **negate** the result, so:
    - `!(n & 1)` returns `true` for even numbers,
    - `false` for odd numbers.

Example:

```cpp
n = 6  -> binary: 0110 → LSB = 0 → even → return true
n = 7  -> binary: 0111 → LSB = 1 → odd → return false

```

---

### 🧩 Key Formula

```cpp
!(n & 1)

```

This uses bitwise AND with 1 to check the parity.

---

### ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(1) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- Negative numbers are correctly handled by bitwise operations in C++.
- Zero is considered **even** (since LSB is 0).

---

### 💡 Other Approaches

| Approach | Example | Description |
| --- | --- | --- |
| Modulo | `n % 2 == 0` | Simple and readable, but slightly slower due to division |
| Bitmasking | `!(n & 1)` ✅ | Fast and efficient using LSB check |

---

### 🔁 Related Problems

- Check if number is odd or even
- Count number of even digits in a number
- Separate even and odd indexed characters
- Find the sum of even or odd indexed elements

---