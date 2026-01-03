---
title: Check if One String is Rotation of Another
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

You are given two strings of equal lengths, **s1** and **s2**. The task is to check if **s2** is a rotated version of the string **s1**.

Note: The characters in the strings are in lowercase.

- Example:
    
    ```
    Input: s1 = "abcd", s2 = "cdab"
    Output: true
    Explanation: After 2 right rotations, s1 will become equal to s2.
    Input: s1 = "aab", s2 = "aba"
    Output: true
    Explanation: After 1 left rotation, s1 will become equal to s2.
    Input: s1 = "abcd", s2 = "acbd"
    Output: false
    Explanation: Strings are not rotations of each other.
    ```
    

---

---

## ✅ Solution 1: Brute Force Rotation Check

```cpp
class Solution {
  public:
    bool areRotations(string &s1, string &s2) {
        for(int i = 0; i < s1.size(); i++){
            string prefix = s1.substr(i) + s1.substr(0, i);  // Rotate string
            if(prefix == s2)
                return true;
        }
        return false;
    }
};

```

---

### 📝 How It Works

- For each index `i` from `0` to `s1.length() - 1`, you simulate a rotation of `s1` by moving the prefix `s1.substr(0, i)` to the end.
- If any such rotation matches `s2`, return `true`.
- If no rotation matches, return `false`.

---

### 🧩 Key Concept

You are generating all **n possible rotations** of `s1` and comparing them with `s2`.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n²) |
| Space | O(n) |

Due to repeated string slicing and concatenation.

---

### ⚠️ Edge Cases

- Unequal lengths → return `false` immediately.
- Identical strings → return `true` (rotation by 0).
- Empty strings → return `true` (conventionally).

---

## ✅ Solution 2: Concatenation Trick (Optimal)

```cpp
class Solution {
  public:
    bool areRotations(string &s1, string &s2) {
        return (s1.size() == s2.size()) && ((s1 + s1).find(s2) != string::npos);
    }
};

```

---

### 📝 How It Works

- If `s2` is a rotation of `s1`, then it must be a **substring of `s1 + s1`**.
- For example, `"ABCD"` and `"CDAB"` → `"ABCDABCD"` contains `"CDAB"`.

---

### 🧩 Key Concept

- If `s2` is a rotation of `s1`, it must appear in the concatenated string `s1 + s1`.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(n) |

Using `.find()` is optimized and avoids redundant comparisons.

---

### ⚠️ Edge Cases

- Check for length mismatch first — if lengths are unequal, it cannot be a valid rotation.

---

## 💡 Other Approaches

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute-force Rotation | O(n²) | O(n) | Simulates each rotation |
| Concatenation + Find | O(n) | O(n) | Optimal and elegant ✅ |

---

## 🔁 Related Problems

- [Check if two strings are anagrams](https://leetcode.com/problems/valid-anagram/)
- [Check if strings are isomorphic](https://leetcode.com/problems/isomorphic-strings/)
- [Rotate String – Leetcode 796](https://leetcode.com/problems/rotate-string/)

---