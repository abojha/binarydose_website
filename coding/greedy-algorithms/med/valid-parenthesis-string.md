---
title: Valid Parenthesis String
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` *if* `s` *is **valid***.

The following rules define a **valid** string:

- Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
- Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
- Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
- `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.
- Example:
    
    ```
    Example 1:
    
    Input: s = "()"
    Output: true
    Example 2:
    
    Input: s = "(*)"
    Output: true
    Example 3:
    
    Input: s = "(*))"
    Output: true
    ```
    

---

---

### ✅ Solution: Greedy (Range-Based)

```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int openMin = 0, openMax = 0;

        for(auto c : s){
            if(c == '('){
                openMin++; // definitely an opening bracket
                openMax++;
            }
            else if(c == ')'){
                openMin--; // definitely a closing bracket
                openMax--;
            }
            else { // c == '*'
                openMin--; // treat as ')'
                openMax++; // treat as '('
            }

            // openMax < 0 means too many closing brackets
            if(openMax < 0) return false;

            // openMin can't go negative (we can't have fewer opens than closes)
            openMin = max(openMin, 0);
        }

        // If openMin == 0, we were able to balance all opens and closes
        return openMin == 0;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- We traverse the string and maintain two variables:
    - `openMin`: Minimum number of unmatched `(` considering  as `)`.
    - `openMax`: Maximum number of unmatched `(` considering  as `(`.
- For , we **assume worst and best cases**: it might be `(`, `)` or an empty string.
- If `openMax` ever goes below zero, it means we have more `)` than possible `(` → invalid.
- After processing the string, if `openMin == 0`, then a valid configuration exists.

---

### 🧩 Key Logic / Formula

- Treat  as flexible:
    - Worst case (min):  is `)`
    - Best case (max):  is `(`
- Track how many opens can be matched (`openMin`, `openMax`)
- Early fail if `openMax < 0`

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

No extra data structures used — just two counters.

---

### ⚠️ Edge Cases

- Only : valid ( = "")
- More `)` than possible `(` early in the string.
- Starts or ends with multiple , handled via range tracking.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Stack-based | O(n) | O(n) | Tracks indices of `*`, `(` separately |
| Greedy Range | O(n) | O(1) | Optimal & elegant ✅ |

---

### 🔁 Related Problems

- **LC 678. Valid Parenthesis String** (This exact problem)
- LC 20. Valid Parentheses
- LC 921. Minimum Add to Make Parentheses Valid
- LC 1249. Minimum Remove to Make Valid Parentheses