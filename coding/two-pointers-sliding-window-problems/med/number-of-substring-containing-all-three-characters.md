---
title: Number of substring containing all three characters
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given a string `s` consisting only of characters *a*, *b* and *c*.

Return the number of substrings containing **at least** one occurrence of all these characters *a*, *b* and *c*.

- Example:
    
    ```
    Example 1:
    
    Input: s = "abcabc"
    Output: 10
    Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
    Example 2:
    
    Input: s = "aaacb"
    Output: 3
    Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
    Example 3:
    
    Input: s = "abc"
    Output: 1
    ```
    

---

---

### Solution:

```cpp
int numberOfSubstrings(string s) {
    int hash[3] = {-1, -1, -1}; // stores last index of 'a', 'b', and 'c'
    int count = 0;

    for (int i = 0; i < s.size(); i++) {
        hash[s[i] - 'a'] = i; // update last seen index of current char

        // add number of substrings ending at i that contain all three letters
        count += (1 + min({hash[0], hash[1], hash[2]}));
    }

    return count;
}

```

---

### 🧠 **How it Works**

- For each character, store its **last seen index**.
- When all three letters have appeared at least once, the **smallest last index** determines the earliest valid start.
- Number of valid substrings ending at `i` = `1 + min(last_seen_a, b, c)`

---

### ⚠️ **Edge Cases**

- String with fewer than 3 characters → returns 0
- Works only with 'a', 'b', and 'c' → extendable by using a map or array of size 26

---

### 📉 **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1)    — array of size 3 |

---

### 💡 **Other Possible Solutions**

- **Sliding Window + Count Map:** Maintain window with all three characters → expand and shrink → O(n)
- **Brute Force:** Generate all substrings and check → O(n²)

---

### 🔁 **Related Problems**

- LC 1358 – Number of Substrings Containing All Three Characters
- Minimum Window Substring (LC 76)
- Longest substring with at most K distinct characters

---

### 📚 **Concepts Used**

- Index tracking
- Minimum of last seen positions
- Substring counting from end position