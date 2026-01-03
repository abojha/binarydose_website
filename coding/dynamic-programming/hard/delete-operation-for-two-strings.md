---
title: Delete Operation for Two Strings
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given two strings `word1` and `word2`, return *the minimum number of **steps** required to make* `word1` *and* `word2` *the same*.

In one **step**, you can delete exactly one character in either string.

- Example:
    
    ```
    Example 1:
    
    Input: word1 = "sea", word2 = "eat"
    Output: 2
    Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
    Example 2:
    
    Input: word1 = "leetcode", word2 = "etco"
    Output: 4
    ```
    

---

---

## ✅ Solution: Memoization

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

    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();

        vector<vector<int>> dp(n, vector<int>(m, -1));

        int k = lcs(word1, word2, n - 1, m - 1, dp);

        return (n - k) + (m - k); // Total insertions + deletions
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(word1[i - 1] == word2[j - 1]){
                    dp[i][j] = 1 + dp[i-1][j-1];  // match
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);  // skip either
                }
            }
        }

        int k = dp[n][m];
        return (n - k) + (m - k); // insertions + deletions
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size();
        int m = word2.size();

        vector<int> prev(m + 1, 0);

        for(int i = 1; i <= n; i++){
            vector<int> curr(m + 1, 0);
            for(int j = 1; j <= m; j++){
                if(word1[i - 1] == word2[j - 1]){
                    curr[j] = 1 + prev[j-1];
                } else {
                    curr[j] = max(prev[j], curr[j-1]);
                }
            }
            prev = curr;
        }

        int k = prev[m];
        return (n - k) + (m - k);
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- We're trying to convert `word1` into `word2` using the **minimum number of insertions and deletions**.
- The optimal way is to keep the **Longest Common Subsequence (LCS)** and delete the rest from `word1`, and insert the rest from `word2`.
- So:
    
    **Deletions = word1.size() - LCS**
    
    **Insertions = word2.size() - LCS**
    
    **Total = deletions + insertions**
    

---

### 🧩 Key Formula / Recurrence

```
if word1[i] == word2[j]:
    dp[i][j] = 1 + dp[i-1][j-1]
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])

```

Final answer:

`(n - LCS) + (m - LCS)`

---

### ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N × M) | O(N × M) |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

---

### ⚠️ Edge Cases

- `word1` and `word2` are the same → 0 operations.
- One of the strings is empty → length of other string insertions/deletions.

---

### 💡 Other Approaches

- Plain recursion (exponential ❌)
- LCS → Delete + Insert ✅

---

### 🔁 Related Problems

- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [1312. Minimum Insertion Steps to Make a String Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)
- [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) ✅ (Same logic)

---