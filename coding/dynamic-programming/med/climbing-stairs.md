---
title: Climbing Stairs
description: ""
tags:
  - 1d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

- Example:
    
    ```
    Example 1:
    
    Input: n = 2
    Output: 2
    Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps
    Example 2:
    
    Input: n = 3
    Output: 3
    Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step
    ```
    

---

---

### Solution: DP with space optimization ✅

```cpp
int climbStairs(int n) {
    // Base case: If there's only 1 step, there's only one way
    if (n == 1) return 1;

    int prev = 1;   // Ways to reach (n-1)th step
    int prev2 = 1;  // Ways to reach (n-2)th step
    int total = 0;

    // Start from step 2 to n and build up the total ways
    for (int i = 2; i <= n; i++) {
        total = prev + prev2;  // Ways to reach current step = sum of previous two
        prev2 = prev;          // Move one step ahead
        prev = total;
    }

    return total;
}
```

---

---

### Solution: Recursive (no memoization)

```cpp
 int climbStairs(int n) {
        if(n == 0) return 1;
        if(n == 1) return 1;

        int left = climbStairs(n - 1);
        int right = climbStairs(n - 2);

        return left + right;
    }
```

---

### ✅ **How It Works**

- You can climb either **1 step or 2 steps** at a time.
- Total ways to reach `i`th stair = ways to reach `(i-1)` + ways to reach `(i-2)`
- Problem reduces to **Fibonacci sequence**:
    
    `f(n) = f(n-1) + f(n-2)`
    
    with base cases:
    
    - `f(1) = 1`
    - `f(2) = 2`
- Instead of storing all previous values (DP array), we just store last two.

---

### 🧠 **Key Points**

- Optimized **Dynamic Programming** with space compression.
- Similar to **Fibonacci number generation**.
- `prev`, `prev2` store values for `f(n-1)`, `f(n-2)` respectively.

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) ✅ |

---

### ⚠️ **Edge Cases**

- `n = 1` → return 1
- `n = 2` → return 2
- Large `n` is fine due to iterative approach.

---

### 💡 **Other Approaches**

| Approach | Time |
| --- | --- |
| Recursive (no memoization) | Exponential ❌ |
| DP with array | O(n) |
| DP with space optimization ✅ | O(n) |

---

### 🔁 **Related Problems**

- Fibonacci Number
- Decode Ways (Leetcode 91)
- House Robber
- Minimum Cost Climbing Stairs

---

### 🔍 **Quick Example**

Input: `n = 5`

Steps:

- `f(1) = 1`
- `f(2) = 2`
- `f(3) = 3`
- `f(4) = 5`
- `f(5) = 8` ✅
    
    Output: `8` ways to climb 5 stairs