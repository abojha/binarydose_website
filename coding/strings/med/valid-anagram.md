---
title: Valid Anagram
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

- Example:
    
    ```
    Example 1:
    
    Input: s = "anagram", t = "nagaram"
    
    Output: true
    
    Example 2:
    
    Input: s = "rat", t = "car"
    
    Output: false
    ```
    

---

---

## ✅ Solution: Frequency Map (Using `map<char, int>`)

```cpp
class Solution {
  public:
    bool areAnagrams(string& s1, string& s2) {
        map<char, int> mpp;

        // Count characters in s1
        for(int i = 0; i < s1.size(); i++){
            mpp[s1[i]]++;
        }

        // Decrease count for characters in s2
        for(int i = 0; i < s2.size(); i++){
            if(mpp.count(s2[i])){
                mpp[s2[i]]--;
            }
            else return false;  // Character not found in s1
        }

        // Final check: all frequencies should be zero
        for(auto it : mpp){
            if(it.second != 0)
                return false;
        }
        return true;
    }
};

```

---

### 📝 How It Works

1. Count frequency of each character in the first string `s1` using a map.
2. Traverse `s2` and decrement the frequency from the same map.
3. If any character in `s2` is not present in `s1`, return false.
4. Finally, check if all values in the frequency map are zero — if not, return false.
5. If all checks pass, return true — both strings are anagrams.

---

### 🧩 Key Logic

An anagram has **same characters with same frequency**. So,

- Count in `s1` ➕
- Count in `s2` ➖
- Final values = all zero ✔

---

### ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(n + m) |
| Space | O(1) (since map has max 26 entries if lowercase) |

---

### ⚠️ Edge Cases

- Strings of **different lengths** → directly return `false`.
- Case-sensitive: `"a"` and `"A"` are treated as different.
- Empty strings: Two empty strings are considered anagrams.

---

### 💡 Other Approaches

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Sort both strings | O(n log n) | O(1) | Check if sorted versions match |
| Array frequency (`int[26]`) | O(n) | O(1) | Faster than map for lowercase |

---

### 🔁 Related Problems

- [Valid Anagram – Leetcode 242](https://leetcode.com/problems/valid-anagram/)
- [Group Anagrams – Leetcode 49](https://leetcode.com/problems/group-anagrams/)
- [Check Permutation – Cracking the Coding Interview]

---