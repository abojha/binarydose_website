---
title: Edit Distance
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given two strings `word1` and `word2`, return *the minimum number of operations required to convert `word1` to `word2`*.

You have the following three operations permitted on a word:

- Insert a character
- Delete a character
- Replace a character
- Example:
    
    ```
    Example 1:
    
    Input: word1 = "horse", word2 = "ros"
    Output: 3
    Explanation: 
    horse -> rorse (replace 'h' with 'r')
    rorse -> rose (remove 'r')
    rose -> ros (remove 'e')
    Example 2:
    
    Input: word1 = "intention", word2 = "execution"
    Output: 5
    Explanation: 
    intention -> inention (remove 't')
    inention -> enention (replace 'i' with 'e')
    enention -> exention (replace 'n' with 'x')
    exention -> exection (replace 'n' with 'c')
    exection -> execution (insert 'u')
    ```
    

---

---

## ✅ Solution: Memoization, Tabulation & Space Optimization

---

### ✅ Memoization

```cpp
class Solution {
public:
    int solve(int ind1, int ind2, string word1, string word2, vector<vector<int>>&dp){
        if(ind1 < 0) return ind2 + 1; // Insert all remaining from word2
        if(ind2 < 0) return ind1 + 1; // Delete all remaining from word1

        if(dp[ind1][ind2] != -1) return dp[ind1][ind2];

        if(word1[ind1] == word2[ind2])
            return dp[ind1][ind2] = solve(ind1 - 1, ind2 - 1, word1, word2, dp);

        // Try insert, delete, or replace
        return dp[ind1][ind2] = 1 + min({
            solve(ind1 - 1, ind2, word1, word2, dp),      // Delete
            solve(ind1, ind2 - 1, word1, word2, dp),      // Insert
            solve(ind1 - 1, ind2 - 1, word1, word2, dp)   // Replace
        });
    }

    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, -1));
        return solve(n - 1, m - 1, word1, word2, dp);
    }
};

```

---

### ✅ Tabulation

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // Fill base cases
        for(int i = 0; i <= n; i++) dp[i][0] = i;
        for(int j = 0; j <= m; j++) dp[0][j] = j;

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(word1[i - 1] == word2[j - 1]){
                    dp[i][j] = dp[i - 1][j - 1];  // No operation needed
                } else {
                    dp[i][j] = 1 + min({
                        dp[i - 1][j],     // Delete
                        dp[i][j - 1],     // Insert
                        dp[i - 1][j - 1]  // Replace
                    });
                }
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
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<int> prev(m + 1, 0), curr(m + 1, 0);

        for(int j = 0; j <= m; j++) prev[j] = j;

        for(int i = 1; i <= n; i++){
            curr[0] = i;
            for(int j = 1; j <= m; j++){
                if(word1[i - 1] == word2[j - 1]){
                    curr[j] = prev[j - 1];
                } else {
                    curr[j] = 1 + min({
                        curr[j - 1],  // Insert
                        prev[j],      // Delete
                        prev[j - 1]   // Replace
                    });
                }
            }
            prev = curr;
        }

        return prev[m];
    }
};

```

---

## 📝 How It Works

- The goal is to **convert `word1` to `word2`** using the minimum number of **insert**, **delete**, or **replace** operations.
- The key idea is to compute the **edit distance** between prefixes of both strings.
- For each character pair, if they match: no operation. If they don't: try the 3 options and take minimum.

---

## 🧩 Key Formula / Recurrence

```
If word1[i] == word2[j]:
    dp[i][j] = dp[i-1][j-1]
Else:
    dp[i][j] = 1 + min(
        dp[i-1][j],   // delete
        dp[i][j-1],   // insert
        dp[i-1][j-1]  // replace
    )

```

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N × M) | O(N × M) |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

---

## ⚠️ Edge Cases

- One string is empty → return length of the other (all insertions/deletions).
- Strings are already equal → 0 operations.
- Completely different → replace each character.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Recursion Only | Exponential ❌ | Stack depth O(N+M) |
| Memoization ✅ | O(N×M) | O(N×M) |
| Tabulation ✅ | O(N×M) | O(N×M) |
| Space Optimized ✅ | O(N×M) | O(M) |

---

## 🔁 Related Problems

- [Leetcode 72. Edit Distance](https://leetcode.com/problems/edit-distance/)
- Minimum Insertions to Make a String Palindrome
- Convert A to B using minimum operations
- Sequence Alignment (Bioinformatics)

---

Let me know if you'd like a dry-run example or visual diagram!