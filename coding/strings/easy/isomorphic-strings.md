---
title: Isomorphic strings
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Given two strings `s` and `t`, *determine if they are isomorphic*.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

- Example:
    
    ```
    Example 1:
    
    Input: s = "egg", t = "add"
    
    Output: true
    
    Explanation:
    
    The strings s and t can be made identical by:
    
    Mapping 'e' to 'a'.
    Mapping 'g' to 'd'.
    Example 2:
    
    Input: s = "foo", t = "bar"
    
    Output: false
    
    Explanation:
    
    The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.
    
    Example 3:
    
    Input: s = "paper", t = "title"
    
    Output: true
    ```
    

---

---

## ✅ Solution: Hash Maps for Bidirectional Mapping

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        map<char , char> sTot, tTos;

        for(int i = 0; i < s.size(); i++){
            char c1 = s[i];
            char c2 = t[i];

            // Check if c1 has already been mapped and verify the mapping
            if(sTot.count(c1) && sTot[c1] != c2) return false;

            // Check if c2 has already been mapped from another char
            if(tTos.count(c2) && tTos[c2] != c1) return false;

            // Set bidirectional mapping
            sTot[c1] = c2;
            tTos[c2] = c1;
        }

        return true;
    }
};

```

---

## 📝 How It Works

- You traverse both strings `s` and `t` together.
- Maintain two maps:
    - `sTot`: maps each character in `s` to its corresponding character in `t`.
    - `tTos`: maps each character in `t` back to `s` to ensure **one-to-one mapping**.
- If any character is mapped inconsistently (i.e., already mapped to something else), return `false`.
- Otherwise, continue and return `true` at the end.

---

## 🧩 Key Idea

Check **isomorphism** by ensuring:

- Each character from `s` maps to **one unique character** in `t`.
- And vice versa.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- Strings of different lengths: Not needed here since `s.size() == t.size()` per problem constraint.
- Duplicate characters mapping inconsistently: `"foo"` and `"bar"` → should return `false`.

---

## 💡 Other Approaches

- Use fixed-size arrays instead of maps if the input is limited to lowercase/ASCII for faster performance.

---

## 🔁 Related Problems

- Leetcode 290: Word Pattern
- Leetcode 205: Isomorphic Strings
- Leetcode 242: Valid Anagram

---