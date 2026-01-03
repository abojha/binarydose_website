---
title: Prime Factors
description: ""
tags:
  - bit-manupilation
  - easy
---

### Problem Statement:

Given a number **n**. Find its **unique** prime factors in **increasing order**.

- Example:
    
    **Examples :**
    
    ```
    Input:n = 100
    Output:[2, 5]
    Explanation:Unique prime factors of 100 are 2 and 5.
    
    ```
    
    ```
    Input:n = 60
    Output:[2, 3, 5]
    Explanation:Prime factors of 60 are 2, 2, 3, 5. Unique prime factors are 2, 3 and 5.
    ```
    

---

---

### ✅ Solution: Prime Factorization using Trial Division

```cpp
class Solution {
  public:
    vector<int> primeFac(int n) {
        // Set to store unique prime factors
        set<int> primeFactors;

        // Step 1: Divide out all factors of 2
        while(n % 2 == 0){
            primeFactors.insert(2);
            n /= 2;
        }

        // Step 2: Try all odd numbers from 3 up to √n
        for(int i = 3; i * i <= n; i++){
            while(n % i == 0){
                primeFactors.insert(i); // i is a prime factor
                n /= i;
            }
        }

        // Step 3: If remaining n is a prime number > 2
        if(n > 2) primeFactors.insert(n);

        // Convert set to vector and return
        return vector<int>(primeFactors.begin(), primeFactors.end());
    }
};

```

---

## 📝 How It Works

- First, remove all 2s (smallest even prime).
- Then test odd numbers from 3 up to √n to remove any other prime factors.
- If after that, `n > 2`, it must itself be a prime factor.

---

## 🧩 Key Concept

- **All composite numbers** have at least one prime factor ≤ √n.
- Use a **set** to collect only unique prime factors.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | O(√N) |
| 💾 Space | O(log N) (for storing prime factors in set) |

---

## ⚠️ Edge Cases

- `n = 1` → returns empty vector.
- `n = prime number` → returns `{n}`.
- Works efficiently for `n` up to ~10⁷.

---

## 🔁 Related Problems

- Count total number of prime factors
- Count number of divisors
- GCD using prime factorization
- Sieve of Eratosthenes (for multiple queries)