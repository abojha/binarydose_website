---
title: Check if ith Bit is Set or Not
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given two positive integer **n** and **k** , check if the **kth** index bit of **n** is set or not. **Note:** A bit is called set if it is 1.

- Example:
    
    **Examples :**
    
    ```
    Input: n = 4, k = 0
    Output: false
    Explanation: Binary representation of 4 is 100, in which 0th index bit from LSB is not set. So, return false.
    ```
    
    ```
    Input: n = 4, k = 2
    Output: true
    Explanation: Binary representation of 4 is 100, in which 2nd index bit from LSB is set. So, return true.
    ```
    
    ```
    Input: n = 500, k = 3
    Output: false
    Explanation: Binary representation of 500 is 111110100, in which 3rd index bit from LSB is not set. So, return false.
    ```
    

---

### ✅ Solution: Bit Manipulation

```cpp
class Solution {
  public:
    bool checkKthBit(int n, int k) {
        // Right shift `n` by `k` bits and check the least significant bit
        return ((n >> k) & 1) == 1;
    }
};

```

---

### 📝 How It Works

- The goal is to **check if the k-th bit (0-indexed from right)** in the binary representation of integer `n` is set (i.e., is 1).
- We use **bitwise right shift**: `n >> k` shifts the k-th bit to the 0th (LSB) position.
- Then we **AND the result with 1**: `((n >> k) & 1)` to isolate that single bit.
- If the result is `1`, the k-th bit is **set**, otherwise it is **unset**.

Example:

```cpp
n = 5  => binary: 0101
k = 2
n >> 2 = 0001
0001 & 0001 = 0001 → returns true

```

---

### 🧩 Key Formula

```cpp
(n >> k) & 1

```

This extracts the k-th bit.

---

### ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(1) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- `k` >= 32 (for 32-bit integers): May lead to undefined behavior in C++.
- Negative numbers: Bit operations still work, but beware of signed vs unsigned interpretation.

---

### 💡 Other Approaches

| Approach | Logic |
| --- | --- |
| Bitmasking | `(n & (1 << k)) != 0` – Check by creating a mask with only k-th bit set |
| String-based | Convert to binary string and check k-th from right (inefficient) |

Example with bitmasking:

```cpp
bool checkKthBit(int n, int k) {
    return (n & (1 << k)) != 0;
}

```

---

### 🔁 Related Problems

- Check if a number is a power of two
- Count number of set bits (Brian Kernighan's Algorithm)
- Flip a specific bit in an integer
- Set/Unset the Kth bit of a number

---