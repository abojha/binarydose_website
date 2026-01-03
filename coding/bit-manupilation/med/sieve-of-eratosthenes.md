---
title: Sieve of Eratosthenes
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

Given a positive integer **n** , calculate and return all prime numbers less than or equal to **n** using the **Sieve of Eratosthenes** algorithm.

A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself.

- Example:
    
    Given a positive integer
    
    **n**
    
    , calculate and return all prime numbers less than or equal to
    
    **n**
    
    using the
    
    **Sieve of Eratosthenes**
    
    algorithm.
    
    A
    
    **prime number**
    
    is a natural number greater than 1 that has no positive divisors other than 1 and itself.
    

---

---

### ✅ Solution: Sieve of Eratosthenes (Prime Generation)

```cpp
class Solution {
  public:
    vector<int> sieve(int n) {
        vector<bool> prime(n + 1, true); // mark all as prime initially
        vector<int> res;

        // Start marking from 2 to n
        for(int p = 2; p <= n; p++){
            if(prime[p]){
                // Mark all multiples of p as not prime
                for(int i = p * p; i <= n; i += p){
                    prime[i] = false;
                }
            }
        }

        // Collect all primes into result vector
        for(int i = 2; i <= n; i++){
            if(prime[i]) res.push_back(i);
        }

        return res;
    }
};

```

---

### 📝 How It Works

- Initializes a boolean array `prime[]` of size `n+1` with all `true`.
- Starts iterating from `2` to `n`. For every number marked as `true`, it marks **all multiples** of that number as `false` (i.e., not prime).
- Begins inner loop from `p * p` instead of `2 * p` for optimization.
- Finally, all numbers left as `true` in the array are collected into the result vector and returned.

---

### 🧩 Key Formula / Recurrence

- For each prime `p`, mark:
    
    `prime[p * p], prime[p * p + p], prime[p * p + 2p], ... <= n`
    
    as not prime.
    

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(n log log n)` |
| 💾 Space | `O(n)` |

---

### ⚠️ Edge Cases

- `n < 2` → returns empty list (no primes).
- Handles up to large values like `10⁶` efficiently.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Basic primality check | `O(n√n)` ❌ |
| Sieve of Eratosthenes | `O(n log log n)` ✅ |

---

### 🔁 Related Problems

- Count Primes (Leetcode 204)
- Segmented Sieve (for large ranges)
- Smallest Prime Factor (SPF) array
- Euler's Totient Function (φ)

---