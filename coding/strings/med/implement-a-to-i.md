---
title: Implement A to I
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then round the integer to remain in the range. Specifically, integers less than `231` should be rounded to `231`, and integers greater than `231 - 1` should be rounded to `231 - 1`.

Return the integer as the final result.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursion + Digit Extraction

```cpp
class Solution {
public:
    // Recursive helper to extract digits and build the number
    void solve(string s, int ind, int n, bool isNeg, long long &result){
        if(ind >= n || !isdigit(s[ind])) return;

        int digit = s[ind] - '0';
        result = result * 10 + digit;

        // Clamp to prevent overflow
        if(result > INT_MAX){
            result = isNeg ? INT_MIN : INT_MAX;
            return;
        }

        solve(s, ind + 1, n, isNeg, result);
    }

    int myAtoi(string s) {
        int n = s.size();
        int i = 0;
        bool isNeg = false;

        // Skip leading whitespaces
        while(i < n && s[i] == ' '){
            i++;
        }

        // Handle optional sign
        if(i < n && (s[i] == '-' || s[i] == '+')){
            isNeg = (s[i] == '-');
            i++;
        }

        long long result = 0;
        solve(s, i, n, isNeg, result);

        // Apply sign
        result = isNeg ? -result : result;

        // Clamp result to 32-bit signed integer range
        if(result < INT_MIN) return INT_MIN;
        if(result > INT_MAX) return INT_MAX;

        return result;
    }
};

```

---

## 📝 How It Works

- This simulates `atoi()` conversion:
    1. Skip leading spaces.
    2. Handle optional sign (`+` or ).
    3. Parse digits recursively using `solve()`.
    4. Clamp result to 32-bit signed integer range.
- Recursive `solve()` builds `result` digit by digit while tracking overflow.

---

## 🧩 Key Logic

```cpp
result = result * 10 + digit;
if(result > INT_MAX){
    result = isNeg ? INT_MIN : INT_MAX;
    return;
}

```

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) ✅ |
| Space | O(N) due to recursion ✅ |

---

## ⚠️ Edge Cases

- `" "` → returns 0
- `"+-12"` → returns 0
- `"0032"` → returns 32
- `"-91283472332"` → clamps to INT_MIN
- `"words123"` → returns 0

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Iterative Parsing | ✅ Most common and preferred |
| Recursive Parsing | ✅ Clean and conceptual |
| Regex Matching | ❌ Not efficient or readable |

---

## 🔁 Related Problems

- [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)
- [Valid Number](https://leetcode.com/problems/valid-number/)
- [Parse Integer With Rules (GFG)](https://www.geeksforgeeks.org/write-your-own-atoi/)

---