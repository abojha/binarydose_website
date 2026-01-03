---
title: Set the Right Most Unset Bit
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given a non-negative number **n** . The problem is to set the rightmost unset bit in the binary representation of **n**.

- Example:
    
    **Examples :**
    
    ```
    Input:n = 6
    Output:7
    Explanation:The binary representation of 6 is 110. After setting right most bit it becomes 111 which is 7.
    ```
    
    ```
    Input:n = 15
    Output:31
    Explanation:The binary representation of 15 is 01111. After setting right most bit it becomes 11111 which is 31.
    ```
    

---

---

## ✅ Solution: Bit Manipulation

### 🔹 Version 1: Using `getRightMostSetBit` with `log2`

```cpp
class Solution {
  public:
    // Get the 1-based position of rightmost set bit
    int getRightMostSetBit(int n){
        return log2(n & -n) + 1;
    }

    int setBit(int n) {
        if(n == 0) return 1;

        // If all bits are set (like 1, 3, 7, 15...), return n as-is
        if((n & (n + 1)) == 0) return n;

        // Get position of first 0 bit from right in ~n
        int pos = getRightMostSetBit(~n);

        // Set that bit
        return ((1 << (pos - 1)) | n);
    }
};

```

---

### 🔹 Version 2: Using `n | (n + 1)` (More Elegant)

```cpp
class Solution {
  public:
    int setBit(int n) {
        if(n == 0) return 1;

        // Directly set the rightmost 0 bit using bitwise OR
        return (n | (n + 1));
    }
};

```

---

## 📝 How It Works

### Version 1:

1. If `n == 0`, return 1 (first bit is 0).
2. If all bits are already 1, i.e., `n & (n + 1) == 0`, return `n` unchanged.
3. Otherwise:
    - Flip the bits using `~n`.
    - Get the position of rightmost **set bit** in `~n` (which corresponds to rightmost **unset** bit in `n`).
    - Set that bit in original number using bitmask.

### Version 2:

- When you do `n | (n + 1)`:
    - It **automatically sets the rightmost 0** to 1.
    - It works because `n + 1` carries into the first 0 in `n`.
    - The OR operation ensures that bit is set in result.

---

## 🧩 Key Formula / Recurrence

| Operation | Expression |
| --- | --- |
| Position of rightmost set bit | `log2(n & -n) + 1` |
| Position of rightmost unset bit | `log2(~n & -~n) + 1` |
| Set bit at that position | `n |
| Shortcut to set rightmost 0-bit | `n |

---

## ⏱️ Time & Space Complexity

| Version | Time | Space |
| --- | --- | --- |
| `log2` logic | O(1) | O(1) |
| `n | (n+1)` | O(1) |

---

## ⚠️ Edge Cases

- `n = 0`: First bit is unset; output = `1`
- All bits already set: `1, 3, 7, 15...` → `n & (n + 1) == 0`
- Negative `n`: Bitwise operations still work due to 2's complement, but log2 may behave unexpectedly

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Loop over bits | O(logN) | Less efficient, manually check each bit |
| `n | (n + 1)` | O(1) |
| `log2(n & -n)` method | O(1) | Good for learning bit position tricks |

---

## 🔁 Related Problems

- Set the K-th bit
- Unset the K-th bit
- Count number of set/unset bits
- Check whether all bits are set
- [Leetcode 1318](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/)
- [GFG: Rightmost different bit](https://practice.geeksforgeeks.org/problems/rightmost-different-bit-1587115621/)

---

Let me know if you'd like to see **visual binary examples** or **bit tracing diagrams** too!