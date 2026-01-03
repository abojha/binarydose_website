---
title: Find the repeating and missing numbers
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

You are given a read-only array of N integers with values also in the range [1, N] both inclusive. Each integer appears exactly once except A which appears twice and B which is missing. The task is to find the repeating and missing numbers A and B where A repeats twice and B is missing.

- Example:
    
    ```
    Example 1:
    Input Format:  array[] = {3,1,2,5,3}
    Result: {3,4}
    Explanation: A = 3 , B = 4 
    Since 3 is appearing twice and 4 is missing
    
    Example 2:
    Input Format: array[] = {3,1,2,5,4,6,7,5}
    Result: {5,8}
    Explanation: A = 5 , B = 8 
    Since 5 is appearing twice and 8 is missing
    ```
    

---

## ✅ Solution: Math-Based Approach (Using Sum and Sum of Squares)

```cpp
vector<int> findMissingRepeatingNumbers(vector<int> a) {
    long long n = a.size();

    // Expected sum and sum of squares for numbers 1 to n
    long long sum_n = (n * (n + 1)) / 2;
    long long sum_sq_n = (n * (n + 1) * (2 * n + 1)) / 6;

    // Actual sum and sum of squares from array
    long long actual_sum = 0, actual_sq_sum = 0;
    for (int i = 0; i < n; i++) {
        actual_sum += a[i];
        actual_sq_sum += (long long)a[i] * a[i];
    }

    // Let:
    // X = repeating number, Y = missing number
    // Equation 1: X - Y = actual_sum - sum_n
    // Equation 2: X^2 - Y^2 = actual_sq_sum - sum_sq_n
    // => (X + Y)(X - Y) = Equation 2

    long long diff = actual_sum - sum_n;               // X - Y
    long long sq_diff = actual_sq_sum - sum_sq_n;      // X^2 - Y^2

    long long sum = sq_diff / diff;                    // X + Y

    long long X = (diff + sum) / 2;
    long long Y = X - diff;

    return {(int)X, (int)Y};  // {repeating, missing}
}

```

---

### 📝 How It Works

- We are given an array from `1 to N` with:
    - **One number repeated once**
    - **One number missing**
- We use two mathematical formulas:
    - Sum of first `N` natural numbers:
        $$
        S_N = \frac{n(n + 1)}{2}
        $$
        
    - Sum of squares of first `N` numbers:
        $$
        S_{2N} = \frac{n(n + 1)(2n + 1)}{6}
        $$
        
- Let:
    - `X = repeating`, `Y = missing`
    - `S = actual sum`, `S2 = actual sum of squares`
- Using:
    - `X - Y = S - S_N`
    - `X² - Y² = S2 - S_{2N} = (X - Y)(X + Y)`
- We compute `X + Y`, solve two equations and derive both values.

---

### 🧩 Key Formula

Let:

- `val1 = X - Y = S - S_N`
- `val2 = X² - Y² = S2 - S2_N = (X - Y)(X + Y)`
- `valSum = X + Y = val2 / val1`

Then:
$$
X = \frac{val1 + valSum}{2}, \quad Y = X - val1
$$
---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- One pass to compute actual sums.
- Constant space — all done via math.

---

### ⚠️ Edge Cases

- Array with all elements correct (no repeat/missing) — invalid input for this algorithm.
- Overflow for large `n` — that's why `long long` is used.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Hashing | O(N) | O(N) | Uses extra memory |
| Index marking (Negation) | O(N) | O(1) | Modifies input array |
| XOR-based method | O(N) | O(1) | Trickier but elegant |
| Math-based ✅ | O(N) | O(1) | Clean and simple |

---

### 🔁 Related Problems

- [GFG: Find missing and repeating](https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/)
- [LC 645. Set Mismatch](https://leetcode.com/problems/set-mismatch/)
- [LC 268. Missing Number](https://leetcode.com/problems/missing-number/)

---

### 🛠️ Other Notes

- **Elegant math trick** to avoid extra space or modifying the array.
- Works best when values are guaranteed to be in `1 to N`.
- If the array can contain invalid or duplicated values multiple times, this approach may fail.

Let me know if you'd like to see the **XOR-based approach** for this problem!