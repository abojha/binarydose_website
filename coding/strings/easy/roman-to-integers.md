---
title: Roman to Integers
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

```
SymbolValue
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

- Example:
    
    ```
    Example 1:
    
    Input: s = "III"
    Output: 3
    Explanation: III = 3.
    Example 2:
    
    Input: s = "LVIII"
    Output: 58
    Explanation: L = 50, V= 5, III = 3.
    Example 3:
    
    Input: s = "MCMXCIV"
    Output: 1994
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
    ```
    

---

---

## ✅ Solution 1: Greedy with Inline Comparison

```cpp
class Solution {
public:
    int romanToInt(string s) {
        map<char, int> mpp = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int val = 0;
        for(int i = 0; i < s.size(); i++){
            if(i > 0 && mpp[s[i]] > mpp[s[i-1]])
                val += mpp[s[i]] - 2 * mpp[s[i-1]];
            else
                val += mpp[s[i]];
        }
        return val;
    }
};

```

## ✅ Solution 2: Greedy with Separate Tracking of Previous

```cpp
class Solution {
public:
    int romanToInt(string s) {
        map<char, int> mpp = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int previous_number = 0;
        int current_number = 0;
        int val = 0;
        for(int i = 0; i < s.size(); i++){
            current_number = mpp[s[i]];
            if(i > 0 && previous_number < current_number){
                val = val + current_number - (2 * previous_number);
            } else {
                val += current_number;
            }
            previous_number = current_number;
        }
        return val;
    }
};

```

---

## 📝 How It Works

- Both approaches **map Roman numerals to integers** and scan from **left to right**.
- When the **current value is greater than the previous**, this indicates a **subtraction case**, like `IV`, `IX`, `XL`, etc.
- Since the smaller number was already added in the previous step, we subtract it **twice** to adjust.

The **first solution** uses inline logic with `i - 1` lookback.

The **second solution** stores the previous value explicitly in `previous_number` — this can be slightly easier to follow and debug.

---

## 🧩 Key Rule

```cpp
if(current > previous) {
    total += current - 2 * previous;
} else {
    total += current;
}

```

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(n) |
| Space | O(1) |
- The traversal is linear.
- The map contains a fixed number of keys (7), so lookup is constant time.

---

## ⚠️ Edge Cases

- `"III"` → repetition.
- `"IV"` → subtraction.
- `"MCMXCIV"` → multiple subtraction cases.
- Empty string or invalid Roman characters (not handled explicitly here).

---

## 💡 Other Approaches

| Approach | Description |
| --- | --- |
| Reverse traversal | Go right to left, subtract if current < previous |
| Array-based map | Use array or switch-case instead of `map` for faster lookup |

---

## 🔁 Related Problems

- **Leetcode 13** – Roman to Integer ✅
- **Leetcode 12** – Integer to Roman 🔁
- **Leetcode 273** – Integer to English Words (complex formatting)

---