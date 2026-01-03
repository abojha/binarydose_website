---
title: Prefix to Postfix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

You are given a string that represents the prefix form of a valid mathematical expression. Convert it to its postfix form.

- Example:
    
    ```
    Input: 
    *-A/BC-/AKL
    Output: 
    ABC/-AK/L-*
    Explanation: 
    The above output is its valid postfix form.
    ```
    

---

## Solution: Stack-Based Conversion (Prefix to Postfix)

```cpp
// ✅ Prefix to Postfix Conversion using Stack (Right to Left Scan)

class Solution {
  public:
    string preToPost(string pre_exp) {
        int n = pre_exp.size();
        stack<string> st;

        // Traverse from right to left
        for (int i = n - 1; i >= 0; i--) {
            char ch = pre_exp[i];

            // If operand, push as string
            if (isalnum(ch)) {
                st.push(string(1, ch));
            }
            // If operator, pop two operands, combine and push back
            else {
                string operand1 = st.top(); st.pop();
                string operand2 = st.top(); st.pop();

                string combined = operand1 + operand2 + ch;
                st.push(combined);
            }
        }

        return st.top();
    }
};

```

---

## 📝 How It Works

- **Scan the prefix expression from right to left.**
- **If operand:**
    
    Push it onto the stack as a string.
    
- **If operator:**
    - Pop two strings from the stack.
    - Combine them as `operand1 + operand2 + operator`.
    - Push the result back onto the stack.
- **At the end:**
    
    Only one element remains in the stack, which is the postfix expression.
    

✅ This uses the property that prefix = `operator operand1 operand2` and postfix = `operand1 operand2 operator`.

---

## 🧩 Key Formula / Recurrence

- **Prefix:** `op operand1 operand2`
- **Postfix:** `operand1 operand2 op`
- Stack processing rule:
    
    `st.push(operand1 + operand2 + operator)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N) |
| **Space** | O(N) |

Where **N** is the length of the prefix expression.

- Each character is processed exactly once.
- Stack space grows based on operands and operators.

---

## ⚠️ Edge Cases

- Single operand (like `"A"`) → Should return the same.
- Valid prefix expression only: assumes two operands follow every operator.
- No validation for invalid prefix strings is included.

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Build Expression Tree → Postorder | O(N) | Less direct, slower setup. |
| Recursive Function | O(N) | Possible but stack-based is simpler. |

---

## 🔁 Related Problems

- Prefix to Infix Conversion
- Postfix to Infix Conversion
- Evaluate Prefix Expression
- Evaluate Postfix Expression

---