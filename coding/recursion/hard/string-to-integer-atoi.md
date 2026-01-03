---
title: String to Integer (atoi)
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then round the integer to remain in the range. Specifically, integers less than `231` should be rounded to `231`, and integers greater than `231 - 1` should be rounded to `231 - 1`.
- Example:
    
    ```
    Example 1:
    
    Input: s = "42"
    
    Output: 42
    
    Explanation:
    
    The underlined characters are what is read in and the caret is the current reader position.
    Step 1: "42" (no characters read because there is no leading whitespace)
             ^
    Step 2: "42" (no characters read because there is neither a '-' nor '+')
             ^
    Step 3: "42" ("42" is read in)
               ^
    Example 2:
    
    Input: s = " -042"
    
    Output: -42
    
    Explanation:
    
    Step 1: "   -042" (leading whitespace is read and ignored)
                ^
    Step 2: "   -042" ('-' is read, so the result should be negative)
                 ^
    Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
                   ^
    Example 3:
    
    Input: s = "1337c0d3"
    
    Output: 1337
    
    Explanation:
    
    Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
             ^
    Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
             ^
    Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
                 ^
    Example 4:
    
    Input: s = "0-1"
    
    Output: 0
    
    Explanation:
    
    Step 1: "0-1" (no characters read because there is no leading whitespace)
             ^
    Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
             ^
    Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
              ^
    Example 5:
    
    Input: s = "words and 987"
    
    Output: 0
    
    Explanation:
    
    Reading stops at the first non-digit character 'w'.
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:
    long long recursiveParse(string &s, int i, bool isNegative, long long result) {
        if (i >= s.size() || !isdigit(s[i])) return result;

        int digit = s[i] - '0';
        result = result * 10 + digit;

        // Clamp if overflow
        if (result > INT_MAX) {
            return isNegative ? INT_MIN : INT_MAX;
        }

        return recursiveParse(s, i + 1, isNegative, result);
    }

    int myAtoi(string s) {
        int n = s.size();
        bool isNegative = false;
        int i = 0;

        // Skip leading whitespaces
        while (i < n && s[i] == ' ') i++;

        // Handle optional sign
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            isNegative = (s[i] == '-');
            i++;
        }

        // No digits after optional sign
        if (i >= n || !isdigit(s[i])) return 0;

        long long result = recursiveParse(s, i, isNegative, 0);
        return isNegative ? -result : result;
    }
};

```

---

### ✅ **How It Works**

- Parse the string from left to right:
    - Skip whitespaces
    - Handle sign (`+` or )
    - Read digits and build the number recursively
- Clamp result to `INT_MAX (2³¹−1)` or `INT_MIN (−2³¹)` on overflow.

---

### 🧠 **Key Points**

- Use `long long` to safely handle overflow before clamping.
- Use recursion to build the number digit by digit.
- Check for invalid input after the sign.
- Use ASCII logic: `'0'` to `'9'` → valid digits.

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(n) (recursion stack) |

---

### ⚠️ **Edge Cases**

- `" "` → `0`
- `" -42"` → `42`
- `"words123"` → `0`
- `"91283472332"` → clamp to `INT_MAX`
- `"-91283472332"` → clamp to `INT_MIN`

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Iterative ✅ | O(n) | O(1) |
| Recursive (this) | O(n) | O(n) |
| Regex (not recommended in interviews) | — | — |

---

### 🔁 **Related Problems**

- Valid Number
- Parse Integer from String
- Implement `strtol` / `stoi` behavior
- Custom Token Parsers