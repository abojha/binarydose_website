---
title: Remove Outermost Parentheses
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Return `s` *after removing the outermost parentheses of every primitive string in the primitive decomposition of* `s`.

- Example:
    
    ```
    Example 1:
    
    Input: s = "(()())(())"
    Output: "()()()"
    Explanation: 
    The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
    After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
    ```
    

---

---

## ✅ Solution: Greedy + Counter-Based Parsing

```cpp
class Solution {
public:
    string removeOuter(string& s) {
        bool flag = true;  // true means we're at the outermost '('
        int count = 0;     // track open vs close balance
        string ans = "";

        for(int i = 0; i < s.size(); i++){
            if(s[i] == '(')
                count++;

            if(s[i] == ')')
                count--;

            // When a primitive closes
            if(count == 0 && flag == false){
                flag = true;
                continue;  // skip the last ')' of current primitive
            }

            // When a new primitive starts
            if(count == 1 && flag == true){
                flag = false;
                continue;  // skip the first '(' of current primitive
            }

            // Add inner characters of primitive
            ans += s[i];
        }

        return ans;
    }
};

```

---

## 📝 Required Notes Template

### ✅ How It Works

- The input string is a **concatenation of primitive parentheses strings**.
- A primitive string is defined as a valid parentheses string that cannot be split into smaller valid parts.
- Use a counter `count`:
    - Increment on `'('`, decrement on `')'`.
    - When `count == 0`, a primitive block has ended.
- The `flag` variable:
    - Helps detect and skip the **first '('** and **last ')'** of every primitive block.
- Accumulate only the **inner content** of each primitive.

---

### 🧩 Key Logic

- Remove the first `'('` and the last `')'` of every primitive block.
- Count opening and closing to identify the boundaries.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N) |
| **Space** | O(N) (for result string) |

---

### ⚠️ Edge Cases

- Input string is empty ⇒ returns empty.
- String like `"()"` ⇒ both parentheses are removed → empty string.
- Nested primitives are handled by the counter and flag.

---

### 💡 Other Approaches

| Approach | Description |
| --- | --- |
| Stack-based | Track depth using stack (slower, more space) |
| Counter-based ✅ | Efficient and concise |

---

### 🔁 Related Problems

- Leetcode 1021: [Remove Outermost Parentheses](https://leetcode.com/problems/remove-outermost-parentheses/)
- Leetcode 856: Score of Parentheses
- Leetcode 20: Valid Parentheses
- Leetcode 301: Remove Invalid Parentheses

---