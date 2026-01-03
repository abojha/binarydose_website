---
title: Infix to Prefix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

Given an infix expression, Your task is to convert the given infix expression to a prefix expression.

- Example:
    
    ```
    Input: x+y*z/w+u
    Output: ++x/*yzwu
    Explanation: Infix to prefix
    
    Example 2:
    Input: a+b
    Output: +ab
    Explanation: Infix to prefix
    ```
    

---

---

## Solution: Reverse + Postfix + Reverse (Reverse Polish Conversion Technique)

```cpp
// ✅ Infix to Prefix Conversion using Reverse + Postfix + Reverse

bool isOperator(char c) {
    return (!isalpha(c) && !isdigit(c));
}

int getPriority(char C) {
    if (C == '-' || C == '+')
        return 1;
    else if (C == '*' || C == '/')
        return 2;
    else if (C == '^')
        return 3;
    return 0;
}

string infixToPostfix(string infix) {
    infix = '(' + infix + ')';
    int length = infix.size();
    stack<char> operators;
    string output;

    for (int i = 0; i < length; i++) {
        char ch = infix[i];

        if (isalnum(ch)) {
            output += ch;
        }
        else if (ch == '(') {
            operators.push(ch);
        }
        else if (ch == ')') {
            while (operators.top() != '(') {
                output += operators.top();
                operators.pop();
            }
            operators.pop();
        }
        else {
            while (!operators.empty() && isOperator(operators.top()) &&
                ((ch == '^' && getPriority(ch) <= getPriority(operators.top())) ||
                 (ch != '^' && getPriority(ch) < getPriority(operators.top())))) {
                output += operators.top();
                operators.pop();
            }
            operators.push(ch);
        }
    }

    while (!operators.empty()) {
        output += operators.top();
        operators.pop();
    }

    return output;
}

string infixToPrefix(string infix) {
    int length = infix.size();

    // Step 1: Reverse infix expression
    reverse(infix.begin(), infix.end());

    // Step 2: Swap '(' and ')'
    for (int i = 0; i < length; i++) {
        if (infix[i] == '(') infix[i] = ')';
        else if (infix[i] == ')') infix[i] = '(';
    }

    // Step 3: Get postfix of modified expression
    string prefix = infixToPostfix(infix);

    // Step 4: Reverse postfix to get prefix
    reverse(prefix.begin(), prefix.end());

    return prefix;
}

```

---

## 📝 How It Works

- **Step 1:** Reverse the infix string and swap `(` with `)` to maintain correct bracket positions.
- **Step 2:** Convert the modified infix expression to postfix using a stack (Shunting Yard Algorithm).
- **Step 3:** Reverse the resulting postfix expression to get the required prefix.

✅ This method leverages postfix conversion logic rather than rewriting everything specifically for prefix, making it simpler to implement.

---

## 🧩 Key Formula / Recurrence

- **Operator Precedence:**
    
    `^ > * / > + -`
    
    - Right-associativity for `^`.
- **Prefix Build Rule:**
    
    `prefix = operator + operand1 + operand2`
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Reverse → Postfix → Reverse | O(N) | O(N) |

Where **N** is the length of the infix expression.

---

## ⚠️ Edge Cases

- Single operand (no operator).
- Nested brackets `((a+b)*c)`.
- Mix of right-associative and left-associative operators.
- Assumes valid infix input (doesn't handle invalid expressions).

---

## 💡 Other Approaches

| Approach | Time Complexity | Space Complexity | Notes |
| --- | --- | --- | --- |
| Two-stack Method (Operators + Operands) | O(N) | O(N) | Directly builds prefix without reversing. |
| Expression Tree → Preorder | O(N) | O(N) | More memory-heavy, slower in practice. |

---

## 🔁 Related Problems

- Infix to Postfix Conversion
- Prefix to Infix Conversion
- Prefix Evaluation
- Construct Expression Tree from Infix

---