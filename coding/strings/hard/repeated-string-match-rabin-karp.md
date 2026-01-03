---
title: Repeated String Match (Rabin Karp)
description: ""
tags:
  - hard
  - strings
---

### Problem Statement:

Given two strings `a` and `b`, return *the minimum number of times you should repeat string* `a` *so that string* `b` *is a substring of it*. If it is impossible for `b` to be a substring of `a` after repeating it, return `-1`.

**Notice:** string `"abc"` repeated 0 times is `""`, repeated 1 time is `"abc"` and repeated 2 times is `"abcabc"`.

- Example:
    
    **Example 1:**
    
    ```
    Input: a = "abcd", b = "cdabcdab"
    Output: 3
    Explanation: We return 3 because by repeating a three times "abcdabcdabcd", b is a substring of it.
    
    ```
    
    **Example 2:**
    
    ```
    Input: a = "a", b = "aa"
    Output: 2
    
    ```
    

---

---

## Solution: Rabin–Karp (Rolling Hash)

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    static constexpr long long MOD = 1000000007LL; // large prime modulus
    static constexpr long long BASE = 31LL;        // base for polynomial rolling hash

    int repeatedStringMatch(string a, string b) {
        if (a == b) return 1;

        // Step 1: Build minimal repeated string such that length >= |b|
        int count = 1;
        string source = a;
        while ((int)source.size() < (int)b.size()) {
            source += a;
            count++;
        }

        // Step 2: Check substring existence
        if (rabinKarpFind(source, b) != -1) return count;
        if (rabinKarpFind(source + a, b) != -1) return count + 1;

        return -1;
    }

private:
    // Rabin–Karp substring search
    int rabinKarpFind(const string &source, const string &target) {
        int n = source.size(), m = target.size();
        if (m == 0 || n < m) return -1;

        // Precompute base^m % MOD
        long long basePow = 1;
        for (int i = 0; i < m; i++) basePow = (basePow * BASE) % MOD;

        // Hash of target string
        long long targetHash = 0;
        for (int i = 0; i < m; i++) {
            targetHash = (targetHash * BASE + (unsigned char)target[i]) % MOD;
        }

        // Rolling hash for source
        long long windowHash = 0;
        for (int i = 0; i < n; i++) {
            windowHash = (windowHash * BASE + (unsigned char)source[i]) % MOD;

            if (i < m - 1) continue; // wait until window is size m

            // Remove leftmost char when window exceeds size m
            if (i >= m) {
                windowHash = (windowHash - (unsigned char)source[i - m] * basePow) % MOD;
                if (windowHash < 0) windowHash += MOD;
            }

            // Compare hash & then strings to avoid collisions
            if (windowHash == targetHash) {
                int start = i - m + 1;
                if (source.compare(start, m, target) == 0) return start;
            }
        }
        return -1;
    }
};

```

---

## 📝 How It Works

1. Repeat string `a` until it becomes at least as long as `b`.
2. Check three cases:
    - If `a == b`, answer is `1`.
    - If `b` is inside `source`, answer is `count`.
    - If `b` spans across the boundary, check `source + a`, answer is `count+1`.
    - Otherwise, return `1`.
3. Substring search is done using **Rabin–Karp**:
    - Compute rolling hash for each substring of length `m = |b|`.
    - Maintain hash efficiently by multiplying with `BASE` and subtracting the outgoing character × `BASE^m`.
    - If hashes match, verify with direct comparison.

---

## 🧩 Key Formula / Recurrence

- Rolling hash update:

$\text{hash}_{i} = \big(\text{hash}_{i-1} \cdot \text{BASE} + \text{newChar} - \text{oldChar} \cdot \text{BASE}^m \big) \; \% \; \text{MOD}$

- Here `BASE = 31`, `MOD = 1e9+7`.

---

## ⏱️ Time & Space Complexity

- **Time Complexity:**
    - Repetition of `a`: O(|a| × ceil(|b|/|a|)).
    - Rabin–Karp search: O(|source| + |b|).
    - Overall ≈ O(|a| + |b|).
- **Space Complexity:** O(|source|) due to repeated string storage.

---

## ⚠️ Edge Cases

- `a == b` directly returns 1.
- `b` longer than `a` and spanning across repetitions.
- Collisions in Rabin–Karp: handled by string comparison.
- Empty string case: handled by returning -1 when `n < m`.

---

## 💡 Other Approaches

1. **KMP (Knuth–Morris–Pratt):**
    
    Deterministic O(n+m) substring search, no hashing/collision risk.
    
2. **Built-in `string::find`:**
    
    Simple and fast in practice (`(source+b).find(b)` check).
    
3. **Naïve substring search:** O(n·m), works for small input but inefficient.

---

## 🔁 Related Problems

- **LeetCode 686 – Repeated String Match** (this problem).
- **LeetCode 28 – Implement strStr()** (KMP / Rabin–Karp).
- **LeetCode 459 – Repeated Substring Pattern.**

---