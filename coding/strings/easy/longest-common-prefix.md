---
title: Longest Common Prefix
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

- Example:
    
    ```
    Example 1:
    
    Input: strs = ["flower","flow","flight"]
    Output: "fl"
    Example 2:
    
    Input: strs = ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.
    ```
    

---

---

## ✅ Solution: Sorting by Length + Prefix Shrinking

```cpp
class Solution {
  public:
    // Custom comparator to sort strings by length (shortest first)
    static bool comparator(const string &a, const string &b){
        return a.size() < b.size();
    }

    string longestCommonPrefix(vector<string> arr) {
        // Sort strings by length to minimize prefix comparison range
        sort(arr.begin(), arr.end(), comparator);
        string prefix = arr[0]; // Start with the shortest string

        // Check this prefix against all other strings
        for(const auto& str : arr){
            while(prefix != str.substr(0, prefix.size())){
                // Shrink the prefix until it matches the current string
                prefix = prefix.substr(0, prefix.size() - 1);
                if(prefix == "") return ""; // No common prefix found
            }
        }
        return prefix;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Sort the strings by length, so we start with the shortest word as a candidate prefix.
- **Step 2:** For every string in the array, check whether it starts with the current `prefix`.
- **Step 3:** If not, reduce `prefix` one character at a time from the end until it matches.
- **Step 4:** If `prefix` ever becomes empty, return `""` as there is no common prefix.

This ensures that we check the **smallest possible number of characters**.

---

## 🧩 Key Idea

Use the **shortest string** as the initial prefix and **shrink it only if needed** based on comparisons.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N * M) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- One word: return that word.
- Empty input: not handled explicitly — should ideally return `""`.
- No common prefix at all: `"abc", "def"` → `""`

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Vertical scanning (char by char column-wise) | O(N * M) | O(1) |
| Trie (Prefix Tree) | O(N * M) | O(N * M) |

---

## 🔁 Related Problems

- Leetcode 14: Longest Common Prefix
- Leetcode 720: Longest Word in Dictionary
- Leetcode 208: Implement Trie (Prefix Tree)

---