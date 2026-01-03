---
title: Bit Manipulation (IMP)
description: ""
tags:
  - bit-manupilation
  - easy
  - learning
---

---

---

### 🔸 `n & (n - 1)`

- **Unsets rightmost set bit (1)**
- Example: `12 (1100)` → `8 (1000)`
- Use: Count set bits

---

### 🔸 `n | (n - 1)`

- **Sets all bits to the right of rightmost unset bit**
- Example: `8 (1000)` → `15 (1111)`
- Use: Fill lower bits with 1s

---

### 🔸 `n & (n + 1)`

- **Unsets trailing set bits**
- Example: `7 (0111)` → `0 (0000)`
- Use: Check if all bits are set → `n & (n+1) == 0`

---

### 🔸 `n | (n + 1)`

- **Sets the rightmost unset bit**
- Example: `10 (1010)` → `11 (1011)`
- Use: Set rightmost 0

---