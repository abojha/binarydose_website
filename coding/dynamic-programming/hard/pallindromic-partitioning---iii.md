---
title: Pallindromic Partitioning - III
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - mcm
---

### Problem Statement:

Given a string `s`, partition `s` such that every substring of the partition is a palindrome.

Return *the **minimum** cuts needed for a palindrome partitioning of* `s`.

- Example:
    
    ```
    Example 1:
    
    Input: s = "aab"
    Output: 1
    Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
    Example 2:
    
    Input: s = "a"
    Output: 0
    Example 3:
    
    Input: s = "ab"
    Output: 1
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    // Utility to check if a substring is a palindrome
    bool isPalindrome(string &s, int i, int j){
        while(i < j){
            if(s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }

    // Recursive function with memoization
    int solve(int i, int n, string &s, vector<int> &dp){
        if(i == n) return 0; // No cuts needed at the end of the string
        if(dp[i] != -1) return dp[i];

        int minCost = INT_MAX;
        for(int j = i; j < n; j++){
            if(isPalindrome(s, i, j)){
                int cost = 1 + solve(j + 1, n, s, dp); // 1 cut + recursive cost
                minCost = min(minCost, cost);
            }
        }
        return dp[i] = minCost;
    }

    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n + 1, -1); // dp[i] = min cuts needed for s[i:]
        return solve(0, n, s, dp) - 1; // Final answer is cuts - 1
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n + 1, 0); // dp[i] = min cuts for substring starting at i
        vector<vector<bool>> isPal(n, vector<bool>(n, false));

        // Precompute all palindrome substrings
        for(int i = n - 1; i >= 0; i--){
            for(int j = i; j < n; j++){
                if(s[i] == s[j] && (j - i <= 2 || isPal[i + 1][j - 1])){
                    isPal[i][j] = true;
                }
            }
        }

        // Bottom-up DP to find min cuts
        for(int i = n - 1; i >= 0; i--){
            int minCost = INT_MAX;
            for(int j = i; j < n; j++){
                if(isPal[i][j]){
                    int cost = 1 + dp[j + 1];
                    minCost = min(minCost, cost);
                }
            }
            dp[i] = minCost;
        }

        return dp[0] - 1; // Subtract 1 because last cut is not needed
    }
};

```

---

## 📝 How It Works

- Goal: Partition the string `s` into substrings that are palindromes with **minimum cuts**.
- We try every possible partition point `j` starting from `i`.
- If `s[i..j]` is a palindrome, we try cutting at `j+1` and solve the rest recursively.
- Use `dp[i]` to store the minimum number of cuts needed for `s[i:]`.

---

## 🧩 Key Formula / Recurrence

```
dp[i] = min(1 + dp[j + 1]) for all j ∈ [i, n-1] where s[i..j] is a palindrome

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(n²) | O(n²) |
| Tabulation | O(n²) | O(n²) |
- Palindrome check with caching brings it down from O(n³) to O(n²).

---

## ⚠️ Edge Cases

- Empty string → 0 cuts
- Entire string is already a palindrome → 0 cuts
- All characters are different → `s.length() - 1` cuts

---

## 💡 Other Approaches

| Approach | Time | Comment |
| --- | --- | --- |
| Brute Force | Exponential ❌ | Too slow |
| Memoization | O(n²) ✅ | Top-down |
| Tabulation | O(n²) ✅ | Bottom-up |
| Manacher's Algo | O(n) ✅ but complex | Only works for counting palindromic substrings |

---

## 🔁 Related Problems

- [Palindrome Partitioning I](https://leetcode.com/problems/palindrome-partitioning/)
- [Minimum Cuts for Palindrome Partitioning (GFG)](https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

---

Let me know if you want the **partitioned output as well**, like `["a", "bcb", "d"]` for minimum cuts.