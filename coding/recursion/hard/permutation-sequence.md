---
title: Permutation Sequence
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for `n = 3`:

1. `"123"`
2. `"132"`
3. `"213"`
4. `"231"`
5. `"312"`
6. `"321"`

Given `n` and `k`, return the `kth` permutation sequence.

- Example:
    
    **Example 1:**
    
    ```
    Input: n = 3, k = 3
    Output: "213"
    
    ```
    
    **Example 2:**
    
    ```
    Input: n = 4, k = 9
    Output: "2314"
    
    ```
    
    **Example 3:**
    
    ```
    Input: n = 3, k = 1
    Output: "123"
    
    ```
    
    **Constraints:**
    
    - `1 <= n <= 9`
    - `1 <= k <= n!`

---

## Solution: Factorial Number System (Direct k-th Permutation)

```cpp
class Solution {
public:
    string getPermutation(int n, int k) {
        // Build the pool of available digits: [1, 2, ..., n]
        vector<int> availableDigits;
        availableDigits.reserve(n);
        for (int value = 1; value <= n; ++value) {
            availableDigits.push_back(value);
        }

        // Precompute factorials up to (n-1)!  (factorials[i] = i!)
        // For LeetCode constraints (n ≤ 9), int is safe; using long long is also fine.
        vector<int> factorials(n, 1);
        for (int i = 1; i < n; ++i) {
            factorials[i] = factorials[i - 1] * i;
        }

        // k is 1-based in the problem; convert to 0-based to use factoradic indexing
        int kZeroBased = k - 1;

        // Construct the answer by choosing one digit for each position
        string result;
        result.reserve(n);
        for (int positionsLeft = n; positionsLeft >= 1; --positionsLeft) {
            // Block size = (positionsLeft-1)! permutations per fixed prefix
            int blockSize = factorials[positionsLeft - 1];

            // Index of the next digit in the remaining pool
            int index = kZeroBased / blockSize;

            // Append that digit and remove it from the pool
            result += to_string(availableDigits[index]);
            availableDigits.erase(availableDigits.begin() + index);

            // Reduce k inside the selected block
            kZeroBased %= blockSize;
        }
        return result;
    }
};

```

## 📝 How It Works

- Think of all permutations grouped by fixed first digit. Each group has `(n-1)!` permutations.
- Convert `(k-1)` to the **factorial number system (factoradic)**. Each “digit” in base `i` (from `n` down to `1`) tells which element to pick from the remaining sorted pool.
- Steps:
    1. Prepare `availableDigits = [1..n]`.
    2. Precompute factorials `i!` for `i = 0..(n-1)`.
    3. Make `kZeroBased = k - 1` (since groups are 0-indexed).
    4. For each position from left to right:
        - `index = kZeroBased / (positionsLeft-1)!`.
        - Pick `availableDigits[index]`, append to result, and erase it from the pool.
        - Update `kZeroBased %= (positionsLeft-1)!`.
- This directly constructs the k-th permutation without generating previous ones.

*Analogy:* Imagine seats labeled 1..n. For the first seat, there are `(n-1)!` ways for each choice. `(k-1)` tells you which “block” (choice) to take. After you seat someone, you repeat the same logic for the remaining seats.

## 🧩 Key Formula / Recurrence

- **Factoradic indexing:**
    
    For remaining `m` positions, block size `B = (m-1)!`.
    
    - Choose index: `idx = k' / B`
    - Reduce: `k' = k' % B`
    - Remove `availableDigits[idx]` and continue with `m-1`.

No DP/recurrence over subproblems is needed; it’s pure arithmetic decomposition.

## ⏱️ Time & Space Complexity

- **Time:** `O(n^2)` due to `erase` from `vector` (shifts elements). For `n ≤ 9`, this is trivial.
- **Space:** `O(n)` for the pool and factorials.

> If n were large, using a balanced tree / Fenwick tree (order-statistics) can reduce selection+removal to O(log n) each → overall O(n log n).
> 

## ⚠️ Edge Cases

- `n = 1`, `k = 1` → returns `"1"`.
- `k` is exactly `n!` (last permutation) → factoradic digits become maximal.
- Valid input guarantee (common in the problem): `1 ≤ k ≤ n!`. If not guaranteed, guard and return `""` or handle error.
- Integer overflow is not a concern for given constraints (`9! = 362880`), but using `long long` for factorials is safer in general.

## 💡 Other Approaches

- **Repeated `next_permutation`**: Start from `[1..n]` and call `next_permutation` `k-1` times → `O(k·n)`, impractical for large `k`.
- **Order-statistics tree / Fenwick tree**: Maintain counts of available digits and select the `idx`th in `O(log n)` per step → `O(n log n)`; useful when `n` is large.

## 🔁 Related Problems

- **31. Next Permutation** – in-place lexicographic next sequence.
- **46. Permutations** – generate all permutations via backtracking.
- **440. K-th Smallest in Lexicographical Order** – digit-tree selection by counts (similar “skip by blocks” idea).