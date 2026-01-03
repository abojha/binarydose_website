---
title: Shortest Common Supersequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given two strings `str1` and `str2`, return *the shortest string that has both* `str1` *and* `str2` *as **subsequences***. If there are multiple valid strings, return **any** of them.

A string `s` is a **subsequence** of string `t` if deleting some number of characters from `t` (possibly `0`) results in the string `s`.

- Example:
    
    ```
    Example 1:
    
    Input: str1 = "abac", str2 = "cab"
    Output: "cabac"
    Explanation: 
    str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
    str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
    The answer provided is the shortest such string that satisfies these properties.
    Example 2:
    
    Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
    Output: "aaaaaaaa"
    ```
    

---

---

## ✅ Solution: Tabulation + Backtracking (LCS Based)

```cpp
class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size();
        int m = str2.size();

        // Step 1: Build LCS DP table
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(str1[i - 1] == str2[j - 1]){
                    dp[i][j] = 1 + dp[i - 1][j - 1]; // match
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]); // skip one
                }
            }
        }

        // Step 2: Reconstruct shortest common supersequence using LCS
        int i = n, j = m;
        string ans = "";

        while(i > 0 && j > 0){
            if(str1[i - 1] == str2[j - 1]){
                ans += str1[i - 1];
                i--; j--; // move diagonally up
            }
            else if(dp[i - 1][j] > dp[i][j - 1]){
                ans += str1[i - 1]; // take from str1
                i--;
            }
            else{
                ans += str2[j - 1]; // take from str2
                j--;
            }
        }

        // Append remaining characters from str1 or str2
        while(i > 0) ans += str1[i-- - 1];
        while(j > 0) ans += str2[j-- - 1];

        reverse(ans.begin(), ans.end()); // result is built in reverse

        return ans;
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- This problem asks for the **Shortest Common Supersequence (SCS)**, which is the shortest string that has both `str1` and `str2` as subsequences.
- We first calculate the **LCS (Longest Common Subsequence)** of the two strings.
- Then we **rebuild the SCS** by:
    - Merging both strings using the LCS as a guide.
    - Whenever characters match, add once.
    - If not matching, add from the string which gave the max in LCS DP table.
- Add any **leftover characters** after finishing one string.

---

### 🧩 Key Formula / Recurrence

- LCS:

```cpp
if(str1[i-1] == str2[j-1])
    dp[i][j] = 1 + dp[i-1][j-1];
else
    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);

```

- Rebuild SCS by moving backward through the DP table.

---

### ⏱️ Time & Space Complexity

| Aspect | Complexity |
| --- | --- |
| Time Complexity | O(N × M) |
| Space Complexity | O(N × M) |

> Where N and M are the lengths of the input strings.
> 

---

### ⚠️ Edge Cases

- `str1 == str2`: SCS is the same as either.
- One string empty: SCS is the other string.
- Completely disjoint strings: SCS is just concatenation.

---

### 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Brute-force | Generate all supersequences ❌ |
| LCS + Merge | Optimal and scalable ✅ |

---

### 🔁 Related Problems

- [1092. Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence/)
- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [1312. Minimum Insertions to Make Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)
- [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

---