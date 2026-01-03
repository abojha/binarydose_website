---
title: Generate Parenthesis
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given `n` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.

- Example:
    
    ```
    Example 1:
    
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]
    Example 2:
    
    Input: n = 1
    Output: ["()"]
    ```
    

---

---

## ✅ Solution: Backtracking

```cpp
class Solution {
public:
    // Recursive function to generate all valid parentheses combinations
    void genP(int n, int open, int close, string &current, vector<string> &result){
        if(open == n && close == n){
            result.push_back(current);  // Found valid combination
            return;
        }

        if(open < n) {
            current.push_back('(');          // Add opening bracket
            genP(n, open + 1, close, current, result);
            current.pop_back();              // Backtrack
        }

        if(close < open) {
            current.push_back(')');          // Add closing bracket
            genP(n, open, close + 1, current, result);
            current.pop_back();              // Backtrack
        }
    }

    vector<string> generateParentheses(int n) {
        vector<string> result;
        string current = "";
        genP(n, 0, 0, current, result);
        return result;
    }
};

```

---

## 📝 How It Works

- The goal is to generate all combinations of **n pairs** of valid parentheses.
- We maintain:
    - `open`: number of `'('` used so far
    - `close`: number of `')'` used so far
    - A string `current` that builds the current sequence
- If both `open` and `close` reach `n`, we’ve built a valid sequence.
- The function **backtracks** by removing the last character after recursive calls.

---

## 🧩 Key Logic

- You can only add `'('` if `open < n`
- You can only add `')'` if `close < open` to maintain valid pairing.

---

## ⏱️ Time & Space Complexity

| Aspect | Value |
| --- | --- |
| Time Complexity | O(2ⁿ) → More precisely: O(Catalan(n)) |
| Space Complexity | O(n) stack depth per call, O(Catalan(n)) result size |

> For n = 3, the valid combinations are 5 → This is the Catalan number: Cₙ = (2n)! / ((n+1)! * n!)
> 

---

## ⚠️ Edge Cases

- n = 0 → return empty list
- n = 1 → return ["()"]

---

## 💡 Other Approaches

- Brute force: Generate all 2^(2n) sequences and filter → ❌ very inefficient
- BFS with queue (alternative to DFS recursion)

---

## 🔁 Related Problems

- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/)
- [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)

---