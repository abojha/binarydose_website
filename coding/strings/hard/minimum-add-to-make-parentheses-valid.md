---
title: Minimum Add to Make Parentheses Valid
description: ""
tags:
  - hard
  - strings
---

### Problem Statement:

A parentheses string is valid if and only if:

- It is the empty string,
- It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
- It can be written as `(A)`, where `A` is a valid string.

You are given a parentheses string `s`. In one move, you can insert a parenthesis at any position of the string.

- For example, if `s = "()))"`, you can insert an opening parenthesis to be `"(**(**)))"` or a closing parenthesis to be `"())**)**)"`.

Return *the minimum number of moves required to make* `s` *valid*.

- Example:
    
    **Example 1:**
    
    ```
    Input: s = "())"
    Output: 1
    
    ```
    
    **Example 2:**
    
    ```
    Input: s = "((("
    Output: 3
    ```
    

---

---

## ✅ Solution: Greedy (Balance Counter)

```cpp
class Solution {
public:
    int minAddToMakeValid(string s) {
        int balance = 0;  // Tracks open '(' count
        int insertions = 0;  // Insertions needed for unmatched ')'

        for(char ch : s){
            if(ch == '('){
                balance++;  // Expect a ')' to match this
            } else {
                balance--;  // Found a ')', reduce expectation
                if(balance < 0){
                    insertions++;  // Need one '(' to match this ')'
                    balance = 0;
                }
            }
        }

        // `balance` holds unmatched '(' needing ')'
        return insertions + balance;
    }
};

```

---

## ✅ Solution: Stack-Based

```cpp
class Solution {
public:
    int minAddToMakeValid(string s) {
        stack<char> openBrackets;
        int insertions = 0;

        for(char ch : s){
            if(ch == '('){
                openBrackets.push(ch);  // Store for future matching
            } else {
                if(!openBrackets.empty()){
                    openBrackets.pop();  // Match with a previous '('
                } else {
                    insertions++;  // Need one '(' to match this ')'
                }
            }
        }

        // Remaining '(' in the stack need ')' to match
        return insertions + openBrackets.size();
    }
};

```

---

## 📝 How It Works

### ✅ Greedy Approach

- Traverse the string maintaining a `balance`:
    - Increment on `'('`, decrement on `')'`.
    - If balance drops below 0 (extra `')'`), insert `'('` and reset balance.
- After loop, any remaining `balance` means unmatched `'('` needing `')'`.

### ✅ Stack Approach

- Push every `'('` into a stack.
- On `')'`, try to pop one `'('`. If not possible, count it as an insertion.
- After loop, any remaining `'('` in the stack needs a closing `')'`.

---

## 🧩 Key Formula / Recurrence

- **Greedy**:
    - Increment `insertions` when `balance < 0`
    - Final Answer: `insertions + balance`
- **Stack**:
    - Final Answer: `insertions + unmatched '(' in stack`

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Greedy | O(N) | O(1) |
| Stack | O(N) | O(N) |

---

## ⚠️ Edge Cases

- Empty string → valid (output = 0)
- All `'('` → all need `')'`
- All `')'` → all need `'('`
- Mixed unmatched → combination of inserts at both ends

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Stack | O(N) | O(N) |
| Greedy ✅ | O(N) | O(1) |

Stack is more intuitive for beginners, but greedy is optimal.

---

## 🔁 Related Problems

- **LeetCode 921** – Minimum Add to Make Parentheses Valid ✅
- **LeetCode 20** – Valid Parentheses (check only validity)
- **LeetCode 32** – Longest Valid Parentheses
- **LeetCode 1249** – Minimum Remove to Make Valid Parentheses

---