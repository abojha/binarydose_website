---
title: Prefix to Infix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

You are given a string **S** of size **N** that represents the prefix form of a valid mathematical expression. The string **S** contains only lowercase and uppercase alphabets as operands and the operators are +, -, *, /, %, and ^.Convert it to its infix form.

- Example:
    
    ```
    Example 1:
    
    Input: 
    *-A/BC-/AKL
    Output: 
    ((A-(B/C))*((A/K)-L))
    Explanation: 
    The above output is its valid infix form.
    ```
    

---

---

## ✅ Solution: Prefix to Infix Conversion Using Stack

```cpp
class Solution {
  public:

    bool isOperator(char ch) {
        return (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%');
    }

    string preToInfix(string pre_exp) {
        stack<string> st;

        for(int i = pre_exp.length() - 1; i >= 0; i--) {
            char ch = pre_exp[i];

            if(isalnum(ch)) {
                st.push(string(1, ch));  // Push operand as string
            } else if(isOperator(ch)) {
                string operand1 = st.top(); st.pop();
                string operand2 = st.top(); st.pop();

                string temp = "(" + operand1 + ch + operand2 + ")";
                st.push(temp);
            }
        }

        return st.top();
    }
};

```

---

### 📝 How It Works

- **Goal:** Convert a prefix (Polish Notation) expression into its corresponding infix expression.
- **Approach:**
    - Process the prefix string from **right to left**.
    - **Operands (letters/digits)** → push onto a stack as strings.
    - **Operators**:
        - Pop two operands from the stack.
        - Combine them using the current operator surrounded by parentheses.
        - Push the resulting string back onto the stack.
    - At the end, the stack contains the complete infix expression.

---

### 🧩 Key Formula / Recurrence

- For operator `ch`:
    - `result = "(" + operand1 + ch + operand2 + ")"`
- **Traversal Order:**
    - Iterate from the end of `pre_exp` towards the beginning (right to left).

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| preToInfix() | O(N) | O(N) |
- N = length of the prefix expression.

---

### ⚠️ Edge Cases

- Invalid prefix string: Not handled in this template (assumes valid input as per problem statement).
- Single character input: Just returns the operand.
- Nested operators: Correctly handled with stack-based combining logic.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Stack (This method) | O(N) ✅ |
| Recursive | O(N), but more complex handling |
- Stack-based processing is simpler and easier to debug.

---

### 🔁 Related Problems

- **LeetCode 150:** Evaluate Reverse Polish Notation
- **GFG:** Prefix to Postfix Conversion
- **GFG:** Infix to Prefix Conversion
- **GFG:** Postfix to Infix Conversion

---