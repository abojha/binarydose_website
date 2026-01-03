---
title: Largest Odd Number in String
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

You are given a string `num`, representing a large integer. Return *the **largest-valued odd** integer (as a string) that is a **non-empty substring** of* `num`*, or an empty string* `""` *if no odd integer exists*.

A **substring** is a contiguous sequence of characters within a string.

- Example:
    
    ```
    Example 1:
    
    Input: num = "52"
    Output: "5"
    Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
    Example 2:
    
    Input: num = "4206"
    Output: ""
    Explanation: There are no odd numbers in "4206".
    Example 3:
    
    Input: num = "35427"
    Output: "35427"
    Explanation: "35427" is already an odd number.
    ```
    

---

---

## ✅ Solution: Greedy Traversal (from End)

```cpp
class Solution {
public:
    string largestOddNumber(string num) {
        int n = num.size();

        // Traverse from the last digit to the first
        for (int i = n - 1; i >= 0; i--) {
            // Check if current digit is odd
            if ((num[i] - '0') % 2 == 1) {
                // Return the substring up to this digit (inclusive)
                return num.substr(0, i + 1);
            }
        }

        // No odd digit found → return empty string
        return "";
    }
};

```

---

## 📝 How It Works

- The idea is simple: we need the **largest prefix** of the number that ends with an **odd digit**.
- Start from the rightmost digit and move left.
- The **first odd digit** from the right gives the last position of the valid prefix.
- Use `substr(0, i + 1)` to return the prefix including that digit.
- If no odd digit exists (e.g. `"4206"`), return `""`.

---

## 🧩 Key Concept

- A number is **odd if its last digit is odd**.
- We need the **rightmost odd digit** to decide the prefix cut.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- All digits are even: `"4206"` → returns `""`
- Already an odd number: `"357"` → returns `"357"`
- Single-digit even number: `"4"` → returns `""`
- Single-digit odd number: `"7"` → returns `"7"`

---

## 💡 Other Approaches

Not needed — this is already optimal and clean.

---

## 🔁 Related Problems

- Leetcode 1903: Largest Odd Number in String
- Leetcode 1689: Partitioning Into Minimum Number of Deci-Binary Numbers
- Leetcode 1408: String Matching in an Array

---