---
title: Swap Two Numbers
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

- Example:

---

---

## ✅ Solution: Bit Manipulation (XOR Swap)

```cpp
class Solution {
  public:
    void swapNumbers(int &a, int &b) {
        if (a != b) {
            a = a ^ b;  // Step 1
            b = a ^ b;  // Step 2 (a ^ b) ^ b = a
            a = a ^ b;  // Step 3 (a ^ b) ^ a = b
        }
    }
};

```

---

## 📝 How It Works

- This method uses **XOR** to swap two variables **without using a temporary variable**.
- Step-by-step:
    1. `a = a ^ b` — Now `a` holds (a ⊕ b)
    2. `b = a ^ b` — Now `b` becomes (a ⊕ b) ⊕ b = a
    3. `a = a ^ b` — Now `a` becomes (a ⊕ b) ⊕ a = b
- After the three XOR operations, `a` and `b` are swapped.

---

## 🧩 Key Formula

```
a = a ^ b;
b = a ^ b;
a = a ^ b;

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(1) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- Must check `a != b`. If both refer to the **same memory address**, result will become zero.
- Doesn’t work safely for **pointers to the same variable**.

---

## 💡 Other Approaches

| Method | Extra Space | Temp Var Used? |
| --- | --- | --- |
| Temp variable | O(1) | Yes |
| Arithmetic method | O(1) | No |
| Bit manipulation ✅ | O(1) | No |

---

## 🔁 Related Problems

- Swap values in an array without using extra space
- XOR properties in finding missing number
- Bitwise tricks in interview puzzles

---