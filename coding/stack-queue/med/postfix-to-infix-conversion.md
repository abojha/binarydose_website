---
title: Postfix to Infix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

You are given a string that represents the postfix form of a valid mathematical expression. Convert it to its infix form.

- Example:
    
    ```
    Example:
    
    Input:
    ab*c+ 
    Output: 
    ((a*b)+c)
    Explanation: 
    The above output is its valid infix form.
    ```
    

---

## Solution: Stack-Based Expression Building (Postfix to Infix Conversion)

```cpp
// User function Template for C++

#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    string postToInfix(string exp) {
        stack<string> st;
        int length = exp.size();

        for (int i = 0; i < length; i++) {
            char currentChar = exp[i];

            // If operand, push it as a string
            if (isalnum(currentChar)) {
                st.push(string(1, currentChar));
            }
            // If operator, pop two operands and combine
            else {
                string operand2 = st.top();
                st.pop();
                string operand1 = st.top();
                st.pop();

                string combined = "(" + operand1 + currentChar + operand2 + ")";
                st.push(combined);
            }
        }

        return st.top();
    }
};

```

---

## 📝 How It Works

- **Initialize a stack of strings.**
- **Iterate through each character in the postfix expression:**
    - If it's an alphanumeric character (operand), push it as a string onto the stack.
    - If it's an operator:
        - Pop two elements from the stack (`operand2` first, `operand1` second).
        - Create a new string in the format `(operand1 operator operand2)`.
        - Push the new string back onto the stack.
- **Final Result:** The stack will have one string representing the fully parenthesized infix expression.

---

## 🧩 Key Formula / Recurrence

- No recurrence relation.
- Stack operation rule:
    - `stack.push("(" + operand1 + operator + operand2 + ")")`

---

## ⏱️ Time & Space Complexity

| Complexity Type | Value |
| --- | --- |
| Time | O(N) |
| Space | O(N) |

Where **N** is the length of the input postfix expression.

- Stack stores at most N/2 combined strings at once (in the worst case).

---

## ⚠️ Edge Cases

- Empty string input → Should return an empty string or handle as invalid input.
- Single operand input → Should return the operand itself.
- Postfix string with invalid sequence (e.g., too many operators or operands) → Not handled in this simple implementation; assumes valid input.

---

## 💡 Other Approaches

| Approach | Remarks |
| --- | --- |
| Recursive Parsing | Possible but unnecessarily complex for postfix expressions. |
| Building Tree + Inorder Traversal | Build expression tree first, then convert using traversal. Space-heavy. Stack is simpler and faster. |

---

## 🔁 Related Problems

- Infix to Postfix Conversion
- Prefix to Infix Conversion
- Evaluate Postfix Expression
- Construct Binary Expression Tree from Postfix
- Reverse Polish Notation Calculator

---

## 🛠️ Other Notes

- **Real-world analogy:** Think of a postfix expression like instructions where you always apply the latest operator to the last two items in your clipboard stack.
- **Why parentheses?** Parentheses ensure operator precedence is preserved in the infix form.