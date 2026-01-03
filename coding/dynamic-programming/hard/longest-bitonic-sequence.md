---
title: Longest Bitonic Sequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Given an array of positive integers. Find the **maximum** length of **Bitonic subsequence.**

A subsequence of array is called Bitonic if it is first strictly increasing, then strictly decreasing. Return the maximum length of bitonic subsequence.

**Note** : A strictly increasing or a **strictly** decreasing sequence should not be considered as a bitonic sequence

- Example:
    
    ```
    Examples :
    
    Input: n = 5, nums[] = [1, 2, 5, 3, 2]
    Output: 5
    Explanation: The sequence {1, 2, 5} is increasing and the sequence {3, 2} is decreasing so merging both we will get length 5.
    Input: n = 8, nums[] = [1, 11, 2, 10, 4, 5, 2, 1]
    Output: 6
    Explanation: The bitonic sequence {1, 2, 10, 4, 2, 1} has length 6.
    Input: n = 3, nums[] = [10, 20, 30]
    Output: 0
    Explanation: The decreasing or increasing part cannot be empty
    Input: n = 3, nums[] = [10, 10, 10]
    Output: 0
    Explanation: The subsequences must be strictly increasing or decreasing
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