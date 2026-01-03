---
title: Infix to Postfix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

You are given an arithmetic expression in **infix notation** as a string. Your task is to convert this expression into its equivalent **postfix notation** (Reverse Polish Notation).

The expression may contain:

- Operands: single alphabetic characters (`a`–`z`, `A`–`Z`) or digits (`0`–`9`).
- Operators: `+`, , , `/`, `^`.
- Parentheses: `(` and `)`.

**Operator Precedence (from lowest to highest):**

| Operator | Precedence | Associativity |
| --- | --- | --- |
| +, - | 1 | Left-to-right |
| *, / | 2 | Left-to-right |
| ^ | 3 | Right-to-left |

You must:

- Maintain operator precedence.
- Handle parentheses correctly.
- Handle right-associativity of the `^` operator.
- Example:
    
    ```
    Input:
    s = "a+b*(c^d-e)^(f+g*h)-i"
    
    Output:
    "abcd^e-fgh*+^*+i-"
    
    Explanation:
    
    Step-by-step infix to postfix conversion using the Shunting Yard Algorithm:
    
    a + → operand, then operator (hold + in stack)
    
    b * → push * into stack as higher precedence
    
    ( c ^ d - e ) → handle parenthesis and precedence inside
    
    ^ ( f + g * h ) → handle nested parentheses and operators
    
    Process everything respecting precedence and associativity
    
    Result after all processing → "abcd^e-fgh*+^*+i-"
    
    🔍 Example 2
    Input:
    s = "A*(B+C)/D"
    
    Output:
    "ABC+*D/"
    
    Explanation:
    
    B + C → BC+
    
    A * (BC+) → ABC+*
    
    ABC+* / D → ABC+*D/
    
    ✅ Constraints
    ```
    

---

---

```cpp
class Solution {
  public:
    int get_pre(char ch){
        if(ch == '+' || ch == '-') return 1;
        if(ch == '*' || ch == '/') return 2;
        if(ch == '^') return 3;
        return 0;
    }

    string infixToPostfix(string& s) {
        string res = "";
        stack<char> st;

        for(int i = 0; i < s.size(); i++) {
            char ch = s[i];

            // If operand, add directly to result
            if(isalnum(ch)) {
                res += ch;
            } else {
                if(ch == '(') {
                    st.push(ch);
                }
                else if(ch == ')') {
                    while(!st.empty() && st.top() != '(') {
                        res += st.top();
                        st.pop();
                    }
                    if(!st.empty()) st.pop();  // Pop '('
                }
                else {
                    // Operator case
                    while(!st.empty() && st.top() != '(') {
                        // Note: '^' is right-associative
                        if((get_pre(ch) < get_pre(st.top())) ||
                           (get_pre(ch) == get_pre(st.top()) && ch != '^')) {
                            res += st.top();
                            st.pop();
                        } else {
                            break;
                        }
                    }
                    st.push(ch);
                }
            }
        }

        // Pop remaining operators
        while(!st.empty()) {
            res += st.top();
            st.pop();
        }

        return res;
    }
};

```

---

### 📝 How It Works

- **Goal:** Convert an infix expression (with operators and parentheses) into postfix (Reverse Polish Notation).
- **Approach:**
    - Use a **stack** to hold operators.
    - **Operands** (like `a`, `b`, `1`) → added directly to result.
    - **Operators** → compare precedence using `get_pre()`:
        - Pop higher or equal precedence operators from stack before pushing the current operator.
    - **Parentheses:**
        - `'('` → push to stack.
        - `')'` → pop until `'('` is found.
- **Right-Associative Note:**
    - For operators like `^`, when precedence is equal, **do not pop** existing operators (handle it carefully in condition).

---

### 🧩 Key Formula / Recurrence

- **Operator Precedence:**
    - `+`,  → 1
    - , `/` → 2
    - `^` → 3 (right-associative)
- **Condition for popping operators:**
    - If `get_pre(ch) < get_pre(st.top())`
    - OR
    - `get_pre(ch) == get_pre(st.top())` and `ch != '^'`

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| infixToPostfix() | O(N) | O(N) |
- N = length of the infix expression.

---

### ⚠️ Edge Cases

- Empty input string → returns an empty string.
- Mismatched parentheses → not handled in this template (can add a check for production use).
- Consecutive operators without operands: Can lead to incorrect results if input is invalid.
- Right-associative operators like `^`: Needs special handling (already included here).

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Shunting Yard (This Method) | O(N) ✅ |
| Recursion (Binary Expression Tree) | O(N) |
- Stack-based is simpler for quick parsing tasks.

---

### 🔁 Related Problems

- **LeetCode 150:** Evaluate Reverse Polish Notation
- **LeetCode 227:** Basic Calculator II
- **GFG:** Infix to Prefix Conversion
- **GFG:** Postfix Expression Evaluation

---

## 🛠️ Other Notes

- ✅ **Interview Tip:** Make sure to mention operator associativity handling when discussing this algorithm.
- ✅ **Real-World Example:** Used in compilers/interpreters to convert mathematical expressions into executable instructions.

Let me know if you'd like a prefix conversion version or expression evaluation logic based on this!