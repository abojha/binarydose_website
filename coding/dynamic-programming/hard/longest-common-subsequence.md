---
title: Longest Common Subsequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

The longest Common Subsequence is defined for two strings. It is the common subsequence that has the greatest length.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Memoization (Top-Down)

```cpp
class Solution {
public:
    // Recursive function with memoization
    int solve(string text1, string text2, int ind1, int ind2, vector<vector<int>>& dp){
        if(ind1 < 0 || ind2 < 0)
            return 0;

        if(dp[ind1][ind2] != -1) return dp[ind1][ind2];

        if(text1[ind1] == text2[ind2]){
            // If characters match, include it in LCS
            return dp[ind1][ind2] = 1 + solve(text1, text2, ind1-1, ind2-1, dp);
        } else {
            // Else take the max by moving one index back in either string
            return dp[ind1][ind2] = max(solve(text1, text2, ind1-1, ind2, dp),
                                        solve(text1, text2, ind1, ind2-1, dp));
        }
    }

    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<vector<int>> dp(n, vector<int>(m, -1));
        return solve(text1, text2, n-1, m-1, dp);
    }
};

```

---

## ✅ Solution: Tabulation (Bottom-Up)

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // Build the table from smaller problems to larger
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(text1[i - 1] == text2[j - 1]){
                    // If match, add 1 to previous diagonal cell
                    dp[i][j] = 1 + dp[i-1][j-1];
                } else {
                    // Else take max of top or left
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[n][m];
    }
};

```

---

## ✅ Solution: Space Optimized (2 Rows)

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();

        // Instead of 2D, we use 2 1D arrays
        vector<int> prev(m + 1, 0), curr(m + 1, 0);

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(text1[i - 1] == text2[j - 1]){
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j-1]);
                }
            }
            prev = curr; // Slide window
        }
        return prev[m];
    }
};

```

---

## 📝 Revision Notes – Longest Common Subsequence (LCS)

---

### ✅ How It Works

- Compare characters from the end of both strings.
- If they match: `1 + LCS of remaining substrings`.
- If not: max of skipping one character from either string.
- The recursive idea is turned into DP using either a 2D table or 1D rolling arrays.

---

### 🧩 Key Formula / Recurrence

```
if(text1[i] == text2[j]):
    dp[i][j] = 1 + dp[i-1][j-1]
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])

```

---

### ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N × M) | O(N × M) |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

---

### ⚠️ Edge Cases

- One or both strings empty → LCS = 0.
- All characters same → LCS = min(lengths of both strings).
- No common characters → LCS = 0.

---

### 💡 Other Approaches

- **Print LCS**: Track path while filling `dp` to reconstruct the string.
- **Memoization with string slicing** (inefficient due to copies).
- **LCS Length only** is best solved with space optimization.

---

### 🔁 Related Problems

- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
- [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
- [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

---