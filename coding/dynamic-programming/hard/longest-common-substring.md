---
title: Longest Common Substring
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

You are given two strings **s1** and **s2**. Your task is to find the length of the **longest common substring** among the given strings.

- Example:
    
    ```
    Input: s1 = "ABCDGH", s2 = "ACDGHR"
    Output: 4
    Explanation: The longest common substring is "CDGH" with a length of 4.
    Input: s1 = "abc", s2 = "acb"
    Output: 1
    Explanation: The longest common substrings are "a", "b", "c" all having length 1.
    Input: s1 = "YZ", s2 = "yz"
    Output: 0
    ```
    

---

---

## ✅ Solution: Tabulation (Bottom-Up)

```cpp
class Solution {
  public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n1 = s1.size();
        int n2 = s2.size();

        vector<vector<int>> dp(n1 + 1, vector<int>(n2 + 1, 0));
        int ans = 0;

        for(int i = 1; i <= n1; i++){
            for(int j = 1; j <= n2; j++){
                if(s1[i - 1] == s2[j - 1]){
                    dp[i][j] = 1 + dp[i - 1][j - 1]; // extend the common substring
                    ans = max(ans, dp[i][j]); // update answer
                }
                else{
                    dp[i][j] = 0; // reset on mismatch
                }
            }
        }

        return ans;
    }
};

```

---

## ✅ Solution: Space Optimized

```cpp
class Solution {
  public:
    int longestCommonSubstr(string& s1, string& s2) {
        int n1 = s1.size();
        int n2 = s2.size();

        vector<int> prev(n2 + 1, 0);
        int ans = 0;

        for(int i = 1; i <= n1; i++){
            vector<int> curr(n2 + 1, 0);
            for(int j = 1; j <= n2; j++){
                if(s1[i - 1] == s2[j - 1]){
                    curr[j] = 1 + prev[j - 1]; // build from prev diagonal
                    ans = max(ans, curr[j]);   // track max length
                }
                else{
                    curr[j] = 0; // reset on mismatch
                }
            }
            prev = curr; // slide window
        }

        return ans;
    }
};

```

---

## 📝 Revision Notes – Longest Common Substring

---

### ✅ How It Works

- Similar to **LCS**, but only counts **continuous matching** substrings.
- Reset the count to 0 on mismatch.
- Update maximum on every match.

---

### 🧩 Key Formula

```
if(s1[i-1] == s2[j-1]):
    dp[i][j] = 1 + dp[i-1][j-1]
else:
    dp[i][j] = 0

```

---

### ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Tabulation | O(N × M) | O(N × M) |
| Space Optimized | O(N × M) | O(M) |

> N and M are lengths of the two strings.
> 

---

### ⚠️ Edge Cases

- No common substring → result is 0.
- Entire strings match → result is length of the strings.
- Case-sensitive match.

---

### 💡 Other Approaches

- **Suffix Tree / Suffix Array + LCP**: Advanced, but not used in interviews often.
- **Rolling Hash + Binary Search**: For large strings (competitive).

---

### 🔁 Related Problems

- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
- [718. Maximum Length of Repeated Subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray/)
- [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

---