---
title: Check Valid Parenthesis
description: ""
tags:
  - learning
  - med
  - stack-queue
---

### Problem Statement:

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.
- Example:
    
    ```
    Example 1:
    
    Input: s = "()"
    
    Output: true
    
    Example 2:
    
    Input: s = "()[]{}"
    
    Output: true
    
    Example 3:
    
    Input: s = "(]"
    
    Output: false
    
    Example 4:
    
    Input: s = "([])"
    
    Output: true
    ```
    

---

---

## ✅ Solution: Stack-Based Parentheses Validation

```cpp
class Solution {
public:
    bool checkValidity(char closing, char opening) {
        if(opening == '(' && closing == ')') return true;
        if(opening == '{' && closing == '}') return true;
        if(opening == '[' && closing == ']') return true;
        return false;
    }

    bool isValid(string s) {
        stack<char> st;

        for(char c : s) {
            if(c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if(st.empty() || !checkValidity(c, st.top())) {
                    return false;
                }
                st.pop();
            }
        }

        return st.empty();
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- **Goal:** Check if the given string of parentheses is valid (every opening bracket has a matching closing bracket in correct order).
- **Approach:**
    - Use a stack to store opening brackets.
    - On encountering a closing bracket:
        - Check if the stack is empty (invalid if true).
        - Check if the top of the stack matches using `checkValidity()`.
        - If both checks pass, pop from the stack.
    - After the loop, if the stack is empty, all brackets matched correctly.
- **Key Principle:** Matching open-close pairs in **Last-In, First-Out** order → ideal for a stack.

---

### 🧩 Key Formula / Recurrence

- **Stack Condition:**
    - For each `)` → top of stack should be `(`.
    - For each `}` → top of stack should be `{`.
    - For each `]` → top of stack should be `[`.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| isValid() | O(N) | O(N) |
- N = length of the input string.
- Worst case space: all opening brackets → stack size N.

---

### ⚠️ Edge Cases

- Empty string: Valid by definition → returns true.
- Closing bracket first: Invalid → e.g., `")("`.
- Mixed unmatched brackets: e.g., `"{[)]}"`.
- Single bracket: Always invalid → e.g., `"("` or `"]"`.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Stack (This method) | O(N) ✅ |
| Recursive parsing | Not efficient ❌ |
- Stack-based validation is the **standard method** for these problems.

---

### 🔁 Related Problems

- **LeetCode 20:** Valid Parentheses (Exact)
- **LeetCode 32:** Longest Valid Parentheses
- **LeetCode 1249:** Minimum Remove to Make Valid Parentheses
- **GFG:** Check for Balanced Brackets

---

## 🛠️ Other Notes

- **Real-World Analogy:** HTML/XML tag validation—ensuring all open tags have corresponding close tags in the right order.
- **Why Not Use Queue?** Queue is FIFO → not suitable for nested bracket problems requiring LIFO behavior.