---
title: All divisors of a Number
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

Given an integer **n,** print all the divisors of N in the **ascending** order.

- Example:
    
    **Examples:**
    
    ```
    Input :n =20
    Output:1 2 4 5 10 20
    Explanation:20 is completely divisible by 1, 2, 4, 5, 10 and 20.
    
    ```
    
    ```
    Input:n =21191
    Output:1 21191
    Explanation: As 21191 is a prime number, it has only 2 factors(1 and the number itself).
    ```
    

---

---

### ✅ Solution: Divisor Enumeration up to √N

```cpp
class Solution {
  public:
    void print_divisors(int n) {
        vector<int> res;

        // Iterate from 1 to √n
        for(int i = 1; i <= sqrt(n); i++){
            if(n % i == 0){
                if(n / i == i){
                    // i is a perfect square divisor (e.g., √n)
                    res.push_back(i);
                }
                else{
                    // Add both divisors: i and n/i
                    res.push_back(i);
                    res.push_back(n / i);
                }
            }
        }

        // Sort all divisors before printing
        sort(res.begin(), res.end());

        // Print each divisor
        for(auto it : res) cout << it << " ";
    }
};

```

---

## 📝 How It Works

- For each number `i` from `1` to `√n`, check if `i` divides `n`.
- If yes, both `i` and `n/i` are divisors.
- Take care not to insert duplicates (when `i == n/i`, like for perfect squares).
- Finally, sort and print all collected divisors.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time | `O(√N + K log K)` where `K` is number of divisors |
| 💾 Space | `O(K)` to store divisors |

---

## ⚠️ Edge Cases

- `n = 1` → output is just `1`
- `n = prime` → output is `1` and `n`
- Handles perfect squares correctly (e.g., `36` includes `6` only once)

---

## 🔁 Related Problems

- Count number of divisors
- Sum of all divisors
- GCD / LCM based problems
- Efficient Sieve + divisor functions