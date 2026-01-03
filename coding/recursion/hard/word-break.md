---
title: Word Break
description: ""
tags:
  - hard
  - recursion
---

### Problem Statement:

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

- Example:
    
    ```
    Example 1:
    
    Input: s = "leetcode", wordDict = ["leet","code"]
    Output: true
    Explanation: Return true because "leetcode" can be segmented as "leet code".
    Example 2:
    
    Input: s = "applepenapple", wordDict = ["apple","pen"]
    Output: true
    Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
    Note that you are allowed to reuse a dictionary word.
    Example 3:
    
    Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
    Output: false
    ```
    

---

---

## ✅ Solution: Plain Recursion (Brute Force)

```cpp
class Solution {
public:
    bool solve(string s, unordered_set<string>& wordDict){
        if(s.empty()) return true;

        for(int i = 1; i <= s.size(); i++){
            string prefix = s.substr(0, i);
            string suffix = s.substr(i);

            if(wordDict.count(prefix) && solve(suffix, wordDict))
                return true;
        }
        return false;
    }

    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict = unordered_set<string>(wordDict.begin(), wordDict.end());
        return solve(s, dict);
    }
};

```

---

### ✅ How It Works

- The function tries to split the string `s` into a **prefix** and a **suffix**.
- If the prefix is in the dictionary, it recursively checks whether the **suffix** can also be broken down successfully.
- If the string becomes empty, it means all parts were found in the dictionary.
- No caching is used, so the same substring might be recomputed multiple times.

---

### 🧩 Key Formula / Recurrence

For a string `s`, recursively:

```
solve(s) = true, if ∃ i ∈ [1...s.size()] such that:
           prefix = s.substr(0, i) ∈ dict
           AND solve(suffix = s.substr(i)) == true

```

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | Exponential: O(2^N) worst case |
| **Space** | O(N) recursion stack (depth N) |

This is because for each index, we try every possible partition.

---

### ⚠️ Edge Cases

- Empty string ⇒ return `true`.
- No word from the dictionary fits the start ⇒ return `false`.
- Repeated recomputation of suffixes leads to **TLE** on large inputs.

---

### 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| ✅ Memoization | O(N²) | O(N) |
| ✅ Tabulation | O(N²) | O(N) |
| 🔁 BFS | O(N²) | O(N) |
| ✅ Trie-based | Better for large dictionaries with shared prefixes |  |

---

### 🔁 Related Problems

- [Leetcode 139. Word Break](https://leetcode.com/problems/word-break/)
- [Leetcode 140. Word Break II](https://leetcode.com/problems/word-break-ii/)
- [Leetcode 472. Concatenated Words](https://leetcode.com/problems/concatenated-words/)
- [Leetcode 131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)

---