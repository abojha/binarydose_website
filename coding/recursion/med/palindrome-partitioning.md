---
title: Palindrome Partitioning
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return *all possible palindrome partitioning of* `s`.

- Example:
    
    ```
    Example 1:
    
    Input: s = "aab"
    Output: [["a","a","b"],["aa","b"]]
    Example 2:
    
    Input: s = "a"
    Output: [["a"]]
    ```
    

---

### ✅ Solution: Backtracking

```cpp
class Solution {
public:
    // Utility to check if a substring is a palindrome
    bool isPallindrome(string s, int start, int end){
        while(start <= end){
            if(s[start++] != s[end--])
                return false;
        }
        return true;
    }

    // Recursive backtracking function
    void f(string s, int ind, vector<string> path, vector<vector<string>> &list){
        // If the entire string is partitioned
        if(ind == s.size()){
            list.push_back(path);
            return;
        }

        // Try all substrings starting from 'ind'
        for(int i = ind; i < s.size(); i++){
            if(isPallindrome(s, ind, i)){
                path.push_back(s.substr(ind, i - ind + 1)); // Choose
                f(s, i + 1, path, list);                    // Explore
                path.pop_back();                            // Un-choose (Backtrack)
            }
        }
    }

    // Main function to return all palindrome partitions
    vector<vector<string>> partition(string s) {
        vector<string> path;
        vector<vector<string>> res;
        f(s, 0, path, res);
        return res;
    }
};

```

---

## 📝 Revision Notes

### ✅ Solution: Backtracking

---

### 📝 How It Works

- Goal: Partition the string `s` into all possible **palindromic substrings**.
- Recursive function `f(...)` tries every substring starting from index `ind`:
    - If the substring `s[ind..i]` is a palindrome → include it in the current path.
    - Recurse for the remaining string starting from `i + 1`.
- When `ind == s.size()`, the path holds one valid partition of palindromes → add it to the result list.
- The `isPallindrome` function helps check if a substring is valid for partitioning.

---

### 🧩 Key Formula / Recurrence

- Recurrence:
    
    `f(ind) = for each i in [ind, s.size()): if s[ind..i] is palindrome → f(i+1)`
    

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| **Time** | O(2ⁿ × n) |
| (Each character can either be a split or not → 2ⁿ partitions; |  |
| Each partition costs up to O(n) to check palindromes) |  |
| **Space** | O(n) recursion stack + O(2ⁿ × n) result size |

---

### ⚠️ Edge Cases

- Empty string → returns `[[]]` (1 valid partition: empty)
- All same characters (e.g., "aaa") → returns all possible combinations of "a", "aa", "aaa"
- No palindromic partition beyond 1-length substrings (e.g., "abc") → each character as individual string

---

### 💡 Other Approaches

| Approach | Time | Description |
| --- | --- | --- |
| DP + Backtracking | O(n² + 2ⁿ) | Precompute all palindromic substrings with DP table |
| Pure DP | 🚫 Not suitable | Because it requires generating partitions, not just Boolean decisions |

---

### 🔁 Related Problems

- Leetcode 131. Palindrome Partitioning
- Leetcode 132. Palindrome Partitioning II (min cuts)
- Leetcode 93. Restore IP Addresses
- Leetcode 140. Word Break II

---