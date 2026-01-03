---
title: Postfix to Prefix Conversion
description: ""
tags:
  - conversion
  - med
  - stack-queue
---

### Problem Statement:

You are given a string that represents the postfix form of a valid mathematical expression. Convert it to its prefix form.

- Example:
    
    ```
    Input: 
    ABC/-AK/L-*
    Output: 
    *-A/BC-/AKL
    Explanation: 
    The above output is its valid prefix form.
    ```
    

---

## Solution: Stack-Based Conversion (Postfix to Prefix)

```cpp
// ✅ Postfix to Prefix Conversion using Stack (Left to Right Scan)

class Solution {
  public:
    string postToPre(string post_exp) {
        int n = post_exp.size();
        stack<string> st;

        for (int i = 0; i < n; i++) {
            char ch = post_exp[i];

            // If operand, push as string
            if (isalnum(ch)) {
                st.push(string(1, ch));
            }
            // If operator, pop two operands, combine and push back
            else {
                string operand2 = st.top(); st.pop();
                string operand1 = st.top(); st.pop();

                string combined = ch + operand1 + operand2;
                st.push(combined);
            }
        }

        return st.top();
    }
};

```

---

## 📝 How It Works

- **Scan the postfix expression from left to right.**
- **If operand:**
    
    Push it onto the stack as a string.
    
- **If operator:**
    - Pop two strings from the stack: `operand2` first, `operand1` second.
    - Combine as `operator + operand1 + operand2`.
    - Push the new string back onto the stack.
- **At the end:**
    
    The only element left in the stack is the equivalent prefix expression.
    

✅ This relies on postfix structure:

- Postfix: `operand1 operand2 operator`
- Prefix: `operator operand1 operand2`

---

## 🧩 Key Formula / Recurrence

- **Postfix:** `operand1 operand2 operator`
- **Prefix:** `operator operand1 operand2`
- Stack processing rule:
    
    `st.push(operator + operand1 + operand2)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N) |
| **Space** | O(N) |

Where **N** is the length of the postfix expression.

- Every character is processed exactly once.
- Stack stores intermediate expressions.

---

## ⚠️ Edge Cases

- Postfix expression with a single operand (like `"A"`).
- Valid postfix expression assumed:
    
    (e.g., enough operands for every operator).
    
- No explicit error handling for malformed expressions.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Build Expression Tree → Preorder | O(N) | Slower setup, uses more space. |
| Recursive Parsing | O(N) | Possible but stack-based is simpler. |

---

## 🔁 Related Problems

- Prefix to Postfix Conversion
- Infix to Prefix Conversion
- Evaluate Prefix Expression
- Evaluate Postfix Expression

---