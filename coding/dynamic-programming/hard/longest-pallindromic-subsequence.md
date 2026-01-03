---
title: Longest Pallindromic Subsequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given a string `s`, find *the longest palindromic **subsequence**'s length in* `s`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

- Example:
    
    ```
    Example 1:
    
    Input: s = "bbbab"
    Output: 4
    Explanation: One possible longest palindromic subsequence is "bbbb".
    Example 2:
    
    Input: s = "cbbd"
    Output: 2
    Explanation: One possible longest palindromic subsequence is "bb".
    ```
    

---

---

### ✅ Memoization

```cpp
class Solution {
public:
    int lcs(int ind1, int ind2, string s, string t, vector<vector<int>> &dp){
        if(ind1 < 0 || ind2 < 0)
            return 0;

        if(dp[ind1][ind2] != -1) return dp[ind1][ind2];

        if(s[ind1] == t[ind2])
            return dp[ind1][ind2] = 1 + lcs(ind1-1, ind2-1, s, t, dp);
        else
            return dp[ind1][ind2] = max(lcs(ind1-1, ind2, s, t, dp), lcs(ind1, ind2-1, s, t, dp));
    }

    int longestPalindromeSubseq(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return lcs(n - 1, n - 1, s, t, dp);
    }
};

```

---

### ✅ Tabulation

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        // Bottom-up DP for LCS
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= n; j++){
                if(s[i - 1] == t[j - 1])
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[n][n];
    }
};

```

---

### ✅ Space Optimized

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();
        vector<int> prev(n + 1, 0), curr(n + 1, 0);

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= n; j++){
                if(s[i - 1] == t[j - 1])
                    curr[j] = 1 + prev[j - 1];
                else
                    curr[j] = max(prev[j], curr[j - 1]);
            }
            prev = curr;
        }
        return prev[n];
    }
};

```

---

### 📝 How It Works

- The Longest Palindromic Subsequence (LPS) is computed by finding the **Longest Common Subsequence (LCS)** between the original string and its reverse.
- This works because a subsequence that’s the same in both `s` and `reverse(s)` must be palindromic.
- Three approaches are used:
    - **Memoization:** Recursive LCS with caching.
    - **Tabulation:** Bottom-up 2D DP.
    - **Space Optimization:** 1D DP to reduce space usage.

---

### 🧩 Key Formula / Recurrence

LCS Recurrence:

```
if s[i] == t[j]:
    dp[i][j] = 1 + dp[i-1][j-1]
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])

```

---

### ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N²) | O(N²) (recursion + dp) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) |

---

### ⚠️ Edge Cases

- Empty string → return 0.
- All characters same → return `n`.
- No repeating characters → return 1 (every char is its own palindrome).

---

### 💡 Other Approaches

- Naive recursion (Exponential) ❌
- Expand Around Center (works for longest palindromic **substring**, not subsequence) ❌

---

### 🔁 Related Problems

- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
- [1312. Minimum Insertion Steps to Make a String Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)

---