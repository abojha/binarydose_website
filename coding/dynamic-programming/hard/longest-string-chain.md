---
title: Longest String Chain
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

You are given an array of `words` where each word consists of lowercase English letters.

`wordA` is a **predecessor** of `wordB` if and only if we can insert **exactly one** letter anywhere in `wordA` **without changing the order of the other characters** to make it equal to `wordB`.

For example, `"abc"` is a **predecessor** of `"abac"`, while `"cba"` is not a **predecessor** of `"bcad"`.

A **word chain** **is a sequence of words `[word1, word2, ..., wordk]` with `k >= 1`, where `word1` is a **predecessor** of `word2`, `word2` is a **predecessor** of `word3`, and so on. A single word is trivially a **word chain** with `k == 1`.

Return *the **length** of the **longest possible word chain** with words chosen from the given list of* `words`.

- Example:
    
    ```
    Example 1:
    
    Input: words = ["a","b","ba","bca","bda","bdca"]
    Output: 4
    Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
    Example 2:
    
    Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
    Output: 5
    Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
    Example 3:
    
    Input: words = ["abcd","dbqca"]
    Output: 1
    Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
    ["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
     
    ```
    

---

---

## ✅ Solution: Dynamic Programming + Custom Comparison

```cpp
class Solution {
public:
    // Sort strings by length
    static bool comp(string &s1, string &s2){
        return s1.size() < s2.size();
    }

    // Returns true if s2 is a valid predecessor of s1
    bool compare(string &s1, string &s2){
        if(s1.size() != s2.size() + 1) return false;

        int i = 0, j = 0;
        while(i < s1.size()){
            if(j < s2.size() && s1[i] == s2[j]){
                i++; j++;
            } else {
                i++; // Skip one char in s1 (simulate deletion)
            }
        }

        return i == s1.size() && j == s2.size();
    }

    int longestStrChain(vector<string>& words) {
        int n = words.size();
        sort(words.begin(), words.end(), comp);  // Sort by length

        vector<int> dp(n, 1); // dp[i] = longest chain ending at index i

        for(int i = 0; i < n; i++){
            for(int prev = 0; prev < i; prev++){
                if(compare(words[i], words[prev]) && dp[i] < dp[prev] + 1){
                    dp[i] = dp[prev] + 1;
                }
            }
        }

        return *max_element(dp.begin(), dp.end()); // Final answer
    }
};

```

---

## 📝 How It Works

- Problem: Find the longest sequence of words where each word is formed by **adding one character** to the previous word.
- **Sort** all words by length.
- For every word `words[i]`, check all shorter words `words[prev]`:
    - If `words[prev]` is a valid **predecessor**, try extending the chain.
- Use `dp[i]` to track the **longest chain ending at `i`**.

---

## 🧩 Key Transition

```cpp
if(compare(words[i], words[prev]) && dp[i] < 1 + dp[prev]){
    dp[i] = 1 + dp[prev];
}

```

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| Sorting | O(N log N) |
| DP comparison | O(N² * L) |
| Space (dp array) | O(N) ✅ |

> L is average word length for comparison
> 

---

## ⚠️ Edge Cases

- Only one word → chain = 1
- All words same length → no chaining
- Chain is not contiguous in original input → sort fixes that

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| DFS + Memo (Map) | Possible, but slower than DP here |
| Graph Topo Sort | Overkill for this case |
| DP + Sorting ✅ | Best for clarity and performance |

---

## 🔁 Related Problems

- [Longest String Chain](https://leetcode.com/problems/longest-string-chain/)
- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Word Break](https://leetcode.com/problems/word-break/)
- [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)

---