---
title: Unset the Right Most Set Bit
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

- Example:

---

---

## ✅ Solution: Bit Manipulation

### 🔹 Operation: Unset the Rightmost Set Bit

```cpp
class Solution {
  public:
    int unsetRightMostSetBit(int n) {
        // Unset the rightmost set bit using n & (n - 1)
        return n & (n - 1);
    }
};

```

---

## 📝 How It Works

- The goal is to **turn off (unset)** the **rightmost 1** in the binary representation of a number `n`.
- The expression `n & (n - 1)` does exactly that.

### Example:

Let’s say `n = 12` → `1100` in binary.

- `n - 1 = 11` → `1011`
- `n & (n - 1) = 1100 & 1011 = 1000` → Rightmost `1` is removed ✅

### Why it works?

- Subtracting 1 flips all bits after the **rightmost 1**, including the 1 itself.
- Doing AND with original number clears the rightmost `1`.

---

## 🧩 Key Formula / Recurrence

```cpp
n & (n - 1)

```

This removes the rightmost set bit.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(1) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- `n = 0`: All bits already unset → returns 0
- `n` with only one bit set (e.g. `n = 8` → `1000`) → becomes `0`

---

## 💡 Other Approaches

| Approach | Time | Description |
| --- | --- | --- |
| Bitmasking via loop | O(logN) | Loop to find first set bit, clear it |
| Built-in GCC method | O(1) | `n &= n - 1` internally used in popcount |

---

## 🔁 Related Problems

- **Count Set Bits** → Use this trick repeatedly until `n = 0`
- Set the rightmost 0 bit: `n | (n + 1)`
- Get position of rightmost set bit: `n & -n`
- [Leetcode 191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)
- [GFG: Check whether all bits are set](https://practice.geeksforgeeks.org/problems/check-whether-all-bits-are-set/0)

---