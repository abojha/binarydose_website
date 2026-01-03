---
title: Longest Pallindromic Substring without DP
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

Given a string `s`, return *the longest* *palindromic* *substring* in `s.`

- Example:
    
    ```
    **Example 1:
    
    Input: s = "babad"
    Output: "bab"
    Explanation: "aba" is also a valid answer.
    Example 2:
    
    Input: s = "cbbd"
    Output: "bb"**
    
    ```
    

---

---

## ✅ Solution: Expand Around Center

```cpp
class Solution {
public:
    // Expand around the given center and return the longest palindrome
    string expand(string s, int left, int right){
        while(left >= 0 && right < s.size() && s[left] == s[right]){
            left--;
            right++;
        }
        // Return the palindrome substring found
        return s.substr(left + 1, right - left - 1);
    }

    string longestPalindrome(string s) {
        if (s.empty()) return "";

        string result = "";

        // Try every character as the center of a palindrome
        for(int i = 0; i < s.size(); i++){
            // Odd-length palindromes centered at i
            string oddPalindrome = expand(s, i, i);
            // Even-length palindromes centered between i and i+1
            string evenPalindrome = expand(s, i, i + 1);

            // Update result if we found a longer palindrome
            if(oddPalindrome.size() > result.size()){
                result = oddPalindrome;
            }
            if(evenPalindrome.size() > result.size()){
                result = evenPalindrome;
            }
        }

        return result;
    }
};

```

---

## 📝 How It Works

- The core idea is to treat each index (or pair of indices) as the **center of a potential palindrome**.
- For each center, expand outward as long as characters on both sides match.
- Keep track of the **longest valid palindrome** found during this process.

---

## 🧩 Key Insight

- A palindrome mirrors around its center.
- There are `2n - 1` possible centers:
    - `n` for odd-length (single character center)
    - `n-1` for even-length (between two characters)

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| Time | O(N²) ✅ |
| Space | O(1) ✅ |

---

## ⚠️ Edge Cases

- Empty string → return `""`
- Single character → return the character itself
- All characters same → return entire string
- Palindrome in middle → correctly detected by center expansion

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Expand Around Center | O(N²) | O(1) ✅ | Best simple approach |
| DP (2D Table) | O(N²) | O(N²) | More complex, useful for variants |
| Manacher’s Algorithm | O(N) ✅ | O(N) ✅ | Optimal but hard to implement |

---

## 🔁 Related Problems

- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
- [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)
- [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
- [Count Substrings That Are Palindromes](https://leetcode.com/problems/palindromic-substrings/)

---