---
title: Generate all binary strings
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given an integer **N** , Print all binary strings of size N which do not contain consecutive 1s.

A binary string is that string which contains only 0 and 1.

- Example:
    
    ```
    Example 1:
    
    Input:
    N = 3
    Output:
    000 , 001 , 010 , 100 , 101
    Explanation:
    None of the above strings contain consecutive 1s. "110" is not an answer as it has '1's occuring consecutively. 
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:
    // Recursive function to generate all binary strings
    void generate(int num, int i, vector<string> &list, string &st) {
        if (i == num) {
            list.push_back(st);  // base case: full binary string formed
            return;
        }

        st[i] = '0';
        generate(num, i + 1, list, st);

        st[i] = '1';
        generate(num, i + 1, list, st);
    }

    vector<string> generateBinaryStrings(int num) {
        vector<string> list;
        string s(num, '0');  // start with a string of length num
        generate(num, 0, list, s);
        return list;
    }
};

```

---

### ✅ **How It Works**

- You need to generate **all strings of length `n`** containing only `0` and `1`.
- Use a recursive function with:
    - `i`: current index in string
    - `st`: string being constructed
    - `list`: final answer list
- At each index, try both `'0'` and `'1'` → branch out.

---

### 🧠 **Key Points**

- Recursively try:
    - `st[i] = '0'` and recurse
    - `st[i] = '1'` and recurse
- Base case: when `i == n`, push current string to result.
- Preallocate the string `s` of size `num` to avoid repeated resizing.

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(2^n) |
| Space | O(2^n × n)    (to store all strings) |

---

### ⚠️ **Edge Cases**

- `num = 0` → returns `[""]` (1 empty string)
- `num = 1` → returns `["0", "1"]`
- `num = 2` → returns `["00", "01", "10", "11"]`

---

### 💡 **Other Approaches**

| Approach | Time |
| --- | --- |
| Recursion ✅ | O(2^n) |
| Iterative (bitmask) | O(2^n) |

---

### 🔁 **Related Problems**

- Generate Subsets (Power Set)
- Generate All n-bit Gray Codes
- Generate All K-ary Strings
- Binary Strings with No Consecutive 1s