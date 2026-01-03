---
title: Find XOR of numbers from L to R.
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

You are given two integers L and R, your task is to find the XOR of elements of the range [L, R].

- Example:
    
    **Example:**
    
    ```
    Input:
    L = 4, R = 8
    Output:
    8
    Explanation:
    4 ^ 5 ^ 6 ^ 7 ^ 8 = 8
    ```
    

---

---

### ✅ Solution: Math-Based (Optimized)

```cpp
// User function Template for C++

class Solution {
  public:
    // XOR from 0 to n using pattern:
    // n % 4 == 0 → n
    // n % 4 == 1 → 1
    // n % 4 == 2 → n + 1
    // n % 4 == 3 → 0
    int xorTill(int n){
        if(n % 4 == 0) return n;
        else if(n % 4 == 1) return 1;
        else if(n % 4 == 2) return n + 1;
        else return 0;
    }

    int findXOR(int l, int r) {
        // XOR from l to r = xorTill(r) ^ xorTill(l - 1)
        return xorTill(r) ^ xorTill(l - 1);
    }
};

```

---

## 📝 How It Works

- **Observation**: XOR from `0` to `n` follows a 4-value repeating pattern:
    
    ```
    n % 4 == 0 → n
    n % 4 == 1 → 1
    n % 4 == 2 → n + 1
    n % 4 == 3 → 0
    
    ```
    
- To find `XOR(l to r)`, you compute `XOR(0 to r) ^ XOR(0 to l-1)`.

---

## 🧩 Key Formula

```
XOR(l to r) = XOR(0 to r) ^ XOR(0 to l-1)

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(1) ✅ |
| 💾 Space | O(1) ✅ |

---

## ⚠️ Edge Cases

- `l == r` → output is `l`.
- `l > r` → undefined, but not expected in constraints.

---

## 💡 Other Approaches

| Approach | Time |
| --- | --- |
| Brute Force Loop | O(N) ❌ |
| Math Pattern | O(1) ✅ |

---

## 🔁 Related Problems

- XOR Queries of Subarrays
- XOR from 1 to N
- Prefix XOR and Range XOR queries