---
title: Find Prime Factorisation of a Number using Sieve
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

- Example:

---

### ✅ Solution: Sieve + Prime Factorization (Preprocessing + Query)

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1e7 + 1;
vector<int> spf(MAXN); // Smallest Prime Factor for every number

// Preprocess the smallest prime factor for every number
void sieveSmallestPrimeFactor() {
    for (int i = 1; i < MAXN; i++) spf[i] = i;

    for (int i = 2; i * i < MAXN; i++) {
        if (spf[i] == i) { // i is prime
            for (int j = i * i; j < MAXN; j += i) {
                if (spf[j] == j) spf[j] = i;
            }
        }
    }
}

// Returns the prime factorization of number n using spf[]
vector<int> getPrimeFactors(int n) {
    vector<int> result;
    while (n > 1) {
        result.push_back(spf[n]);
        n = n / spf[n];
    }
    return result;
}

// Driver code
int main() {
    sieveSmallestPrimeFactor();

    int n = 84;
    vector<int> factors = getPrimeFactors(n);

    cout << "Prime factors of " << n << ": ";
    for (int prime : factors) cout << prime << " ";
    cout << endl;

    return 0;
}

```

---

## 📝 How It Works

- **Preprocessing Step:**
    
    We create a `spf[]` array (Smallest Prime Factor) using the modified Sieve of Eratosthenes.
    
    This stores for every number `i`, the smallest prime number that divides it.
    
- **Query Step:**
    
    To factorize `n`, repeatedly divide `n` by `spf[n]` until it becomes 1.
    
    This gives us all the prime factors in O(log n) time **after** O(n log log n) preprocessing.
    

---

## 🧩 Key Formula / Recurrence

- For every number `j` starting from `i*i` in the sieve:
    
    ```
    if spf[j] == j: // means j is not updated yet
        spf[j] = i;
    
    ```
    
- For factorization:
    
    ```
    while(n > 1):
        res.push_back(spf[n])
        n /= spf[n]
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Step | Time Complexity | Space Complexity |
| --- | --- | --- |
| Preprocessing Sieve | O(n log log n) | O(n) |
| Factorization Query | O(log n) | O(1) |

---

## ⚠️ Edge Cases

- `n = 1`: Output is empty (no prime factors)
- `n` is prime: Only one factor: the number itself
- Multiple occurrences: e.g., `60 = 2 * 2 * 3 * 5` → handled correctly due to `spf[n]` being reused

---

## 💡 Other Approaches

| Method | Time Complexity | When to Use |
| --- | --- | --- |
| Trial Division (loop till √n) | O(√n) per query | One-off queries, small inputs |
| Sieve + SPF Table | O(log n) per query after O(n log log n) preprocessing | Multiple queries |

---

## 🔁 Related Problems

- [Sieve of Eratosthenes](https://leetcode.com/discuss/general-discussion/1057283/Sieve-of-Eratosthenes-Explained)
- Count number of distinct prime factors
- Find number of divisors of `n` using prime factorization
- Euler's Totient Function using prime factors

---

Let me know if you want a version that returns counts (like `2^2 * 3^1 * 5^1`) or removes duplicates!