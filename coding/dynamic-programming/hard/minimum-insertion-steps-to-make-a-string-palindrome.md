---
title: Minimum Insertion Steps to Make a String Palindrome
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given a string `s`. In one step you can insert any character at any index of the string.

Return *the minimum number of steps* to make `s` palindrome.

A **Palindrome String** is one that reads the same backward as well as forward.

- Example:
    
    ```
    Example 1:
    
    Input: s = "zzazz"
    Output: 0
    Explanation: The string "zzazz" is already palindrome we do not need any insertions.
    Example 2:
    
    Input: s = "mbadm"
    Output: 2
    Explanation: String can be "mbdadbm" or "mdbabdm".
    Example 3:
    
    Input: s = "leetcode"
    Output: 5
    Explanation: Inserting 5 characters the string becomes "leetcodocteel".
    ```
    

---

---

## ✅ Solution: Memoization, Tabulation, Space Optimized

---

### ✅ Memoization

```cpp
class Solution {
public:
    int lcs(string text1, string text2, int ind1, int ind2, vector<vector<int>>& dp){
        if(ind1 < 0 || ind2 < 0)
            return 0;

        if(dp[ind1][ind2] != -1) return dp[ind1][ind2];

        if(text1[ind1] == text2[ind2]){
            // If characters match, include it in LCS
            return dp[ind1][ind2] = 1 + lcs(text1, text2, ind1-1, ind2-1, dp);
        } else {
            // Else take the max by moving one index back in either string
            return dp[ind1][ind2] = max(lcs(text1, text2, ind1-1, ind2, dp),
                                        lcs(text1, text2, ind1, ind2-1, dp));
        }
    }

    int minInsertions(string s) {
        int n = s.size();
        string t = s;
        reverse(t.begin(), t.end());
        vector<vector<int>> dp(n, vector<int>(n, -1));

        int k = lcs(s, t, n-1, n-1, dp);
        return n - k; // Characters not in LPS must be inserted
    }
};

```

---

### ✅ Tabulation

```cpp
class Solution {
public:
    int minInsertions(string s) {
        int n = s.size();
        string t = s;
        reverse(t.begin(), t.end());

        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        // Bottom-up LCS between s and its reverse
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= n; j++){
                if(s[i - 1] == t[j - 1])
                    dp[i][j] = 1 + dp[i-1][j-1];
                else
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }

        return n - dp[n][n]; // Min insertions = total length - LPS
    }
};

```

---

### ✅ Space Optimized

```cpp
class Solution {
public:
    int minInsertions(string s) {
        int n = s.size();
        string t = s;
        reverse(t.begin(), t.end());

        vector<int> prev(n + 1, 0);

        for(int i = 1; i <= n; i++){
            vector<int> curr(n + 1, 0);
            for(int j = 1; j <= n; j++){
                if(s[i - 1] == t[j - 1])
                    curr[j] = 1 + prev[j-1];
                else
                    curr[j] = max(prev[j], curr[j-1]);
            }
            prev = curr;
        }

        return n - prev[n];
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- The goal is to make the string a palindrome by inserting the **minimum number of characters**.
- The trick is to compute the **Longest Palindromic Subsequence (LPS)**.
- Once we know the LPS, the remaining characters (i.e., `n - LPS`) must be inserted to form the palindrome.
- The LPS is calculated as the **LCS of `s` and reverse(s)`**.

---

### 🧩 Key Formula / Recurrence

- LCS Recurrence:
    
    ```
    if s[i] == t[j]:
        dp[i][j] = 1 + dp[i-1][j-1]
    else:
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    ```
    
- Final Answer:
    
    ```
    minInsertions = length of s - length of LPS
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N²) | O(N²) (recursion + DP) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) |

---

### ⚠️ Edge Cases

- Empty string → 0 insertions needed.
- Already a palindrome → 0 insertions needed.
- All characters distinct → Insert `n - 1` characters.

---

### 💡 Other Approaches

| Approach | Time |
| --- | --- |
| Recursion only | Exponential ❌ |
| DP via LCS | O(N²) ✅ |

---

### 🔁 Related Problems

- [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
- [1312. Minimum Insertion Steps to Make a String Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)
- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

---