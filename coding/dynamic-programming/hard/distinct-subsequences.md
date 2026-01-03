---
title: Distinct Subsequences
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

Given two strings s and t, return *the number of distinct* ***subsequences** of* s *which equals* t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

- Example:
    
    ```
    Example 1:
    
    Input: s = "rabbbit", t = "rabbit"
    Output: 3
    Explanation:
    As shown below, there are 3 ways you can generate "rabbit" from s.
    rabbbit
    rabbbit
    rabbbit
    Example 2:
    
    Input: s = "babgbag", t = "bag"
    Output: 5
    Explanation:
    As shown below, there are 5 ways you can generate "bag" from s.
    babgbag
    babgbag
    babgbag
    babgbag
    babgbag
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    // Recursive function with memoization
    int countUtil(int ind1, int ind2, string s, string t, vector<vector<int>> &dp){
        // If all characters of t are matched
        if(ind2 < 0) return 1;

        // If string s is exhausted and t is not
        if(ind1 < 0) return 0;

        if(dp[ind1][ind2] != -1) return dp[ind1][ind2];

        int result = 0;

        if(s[ind1] == t[ind2]){
            // Take or not take the character
            int leave = countUtil(ind1 - 1, ind2 - 1, s, t, dp);
            int stay = countUtil(ind1 - 1, ind2, s, t, dp);
            result = (leave + stay) % mod;
        }
        else{
            // Skip s[ind1]
            result = countUtil(ind1 - 1, ind2, s, t, dp);
        }

        return dp[ind1][ind2] = result;
    }

    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, -1));
        return countUtil(n-1, m-1, s, t, dp);
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // Base case: An empty t can be formed from any prefix of s
        for(int i = 0; i <= n; i++){
            dp[i][0] = 1;
        }

        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(s[i - 1] == t[j - 1]){
                    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % mod;
                }
                else{
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][m];
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
public:
    int mod = 1e9 + 7;

    int numDistinct(string s, string t) {
        int n = s.size();
        int m = t.size();

        vector<int> prev(m + 1, 0), curr(m + 1, 0);

        prev[0] = curr[0] = 1; // Base: empty t can always be formed

        for(int i = 1; i <= n; i++){
            for(int j = m; j >= 1; j--){
                if(s[i - 1] == t[j - 1]){
                    curr[j] = (prev[j - 1] + prev[j]) % mod;
                }
                else{
                    curr[j] = prev[j];
                }
            }
            prev = curr;
        }

        return prev[m];
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- We need to count the **number of distinct subsequences of `s` that equal `t`**.
- Use **DP** where `dp[i][j]` means number of ways to form `t[0..j-1]` from `s[0..i-1]`.
- If characters match: we have 2 options — include it or not.
- If they don’t match: we skip the current character from `s`.

---

### 🧩 Key Formula / Recurrence

```cpp
if(s[i-1] == t[j-1])
    dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
else
    dp[i][j] = dp[i-1][j];

```

---

### ⏱️ Time & Space Complexity

| Version | Time Complexity | Space Complexity |
| --- | --- | --- |
| Memoization | O(N × M) | O(N × M) + Recursion Stack |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

Where `N = s.length()`, `M = t.length()`.

---

### ⚠️ Edge Cases

- `t` is empty ⇒ Always 1 way.
- `s` is empty and `t` is not ⇒ 0 ways.
- Large inputs ⇒ use modulo `1e9+7`.

---

### 💡 Other Approaches

| Approach | Status |
| --- | --- |
| Brute Force Recursion | ❌ Too slow |
| Memoization (Top Down) | ✅ Optimal |
| Tabulation (Bottom Up) | ✅ Optimal |
| Space Optimized | ✅ Best for large inputs |

---

### 🔁 Related Problems

- Leetcode 115: **Distinct Subsequences**
- Leetcode 392: **Is Subsequence**
- Leetcode 583: **Delete Operation for Two Strings**
- Leetcode 72: **Edit Distance**

---