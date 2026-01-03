---
title: WildCard Matching
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `'?'` and `'*'` where:

- `'?'` Matches any single character.
- `'*'` Matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string (not partial).

- Example:
    
    ```
     
    
    Example 1:
    
    Input: s = "aa", p = "a"
    Output: false
    Explanation: "a" does not match the entire string "aa".
    Example 2:
    
    Input: s = "aa", p = "*"
    Output: true
    Explanation: '*' matches any sequence.
    Example 3:
    
    Input: s = "cb", p = "?a"
    Output: false
    Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
    ```
    

---

---

## ✅ Solution: Memoization, Tabulation & Space Optimized

---

### ✅ Memoization

```cpp
class Solution {
public:
    bool solve(int i, int j, string s, string p, vector<vector<int>> &dp){
        // Base Cases
        if(i < 0 && j < 0) return true;
        if(i < 0 && j >= 0) {
            for(int k = 0; k <= j; k++)
                if(p[k] != '*') return false;
            return true;
        }
        if(i >= 0 && j < 0) return false;

        if(dp[i][j] != -1) return dp[i][j];

        // Match current characters or '?'
        if(s[i] == p[j] || p[j] == '?')
            return dp[i][j] = solve(i - 1, j - 1, s, p, dp);

        // Match '*' with empty (j-1) or match '*' with current char (i-1)
        if(p[j] == '*')
            return dp[i][j] = solve(i - 1, j, s, p, dp) || solve(i, j - 1, s, p, dp);

        return dp[i][j] = false;
    }

    bool isMatch(string s, string p) {
        int n = s.size();
        int m = p.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, -1));
        return solve(n - 1, m - 1, s, p, dp);
    }
};

```

---

### ✅ Tabulation

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));

        // Empty string and pattern matches
        dp[0][0] = true;

        // Only '*' can match empty string
        for(int j = 1; j <= m; j++)
            dp[0][j] = p[j - 1] == '*' ? dp[0][j - 1] : false;

        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if(s[i - 1] == p[j - 1] || p[j - 1] == '?')
                    dp[i][j] = dp[i - 1][j - 1];
                else if(p[j - 1] == '*')
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            }
        }

        return dp[n][m];
    }
};

```

---

### ✅ Space Optimized

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size();
        vector<bool> prev(m + 1, false);

        // Base case
        prev[0] = true;
        for(int j = 1; j <= m; j++)
            prev[j] = (p[j - 1] == '*') ? prev[j - 1] : false;

        for(int i = 1; i <= n; i++) {
            vector<bool> curr(m + 1, false);
            for(int j = 1; j <= m; j++) {
                if(s[i - 1] == p[j - 1] || p[j - 1] == '?')
                    curr[j] = prev[j - 1];
                else if(p[j - 1] == '*')
                    curr[j] = curr[j - 1] || prev[j];
            }
            prev = curr;
        }

        return prev[m];
    }
};

```

---

## 📝 How It Works

- This problem matches a string `s` with a pattern `p`, which may include wildcards:
    - `'?'` matches any single character.
    - `'*'` matches any sequence (including empty).
- Using **Dynamic Programming**, we check whether each prefix of `s` matches with each prefix of `p`.

---

## 🧩 Key Formula / Recurrence

```
if s[i] == p[j] or p[j] == '?':
    dp[i][j] = dp[i-1][j-1]
else if p[j] == '*':
    dp[i][j] = dp[i][j-1] (treat '*' as empty) OR dp[i-1][j] (treat '*' as one char)
else:
    dp[i][j] = false

```

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N × M) | O(N × M) |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

Where `N = s.length()` and `M = p.length()`.

---

## ⚠️ Edge Cases

- Empty string with all stars → true
- String is non-empty but pattern has only stars → true
- Pattern has no wildcards → simple character comparison
- Empty pattern with non-empty string → false

---

## 💡 Other Approaches

| Technique | Remarks |
| --- | --- |
| Pure Recursion | Exponential and fails TLE ❌ |
| Memoization | Top-down with caching ✅ |
| Tabulation | Bottom-up, more iterative ✅ |
| Space Optimized | Very efficient ✅ |

---

## 🔁 Related Problems

- [Leetcode 44. Wildcard Matching](https://leetcode.com/problems/wildcard-matching/)
- [Leetcode 10. Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)
- Longest Common Subsequence
- Edit Distance

---