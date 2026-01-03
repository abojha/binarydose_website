---
title: Printing Longest Increasing Subsequence
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - lis
  - on
---

### Problem Statement:

Print Longest Increasing Subsequence

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Tabulation + Reconstruction

```cpp
class Solution {
public:
    vector<int> getLIS(vector<int>& arr) {
        int n = arr.size();
        vector<int> dp(n, 1);     // dp[i] = LIS ending at i
        vector<int> hash(n);      // hash[i] = previous index in LIS ending at i

        for(int i = 0; i < n; i++){
            hash[i] = i;          // Initially point to itself
            for(int prev = 0; prev < i; prev++){
                if(arr[i] > arr[prev] && dp[i] < dp[prev] + 1){
                    dp[i] = dp[prev] + 1;
                    hash[i] = prev;
                }
            }
        }

        // Find max length and its index
        int maxLen = -1, lastIndex = -1;
        for(int i = 0; i < n; i++){
            if(dp[i] > maxLen){
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        // Reconstruct LIS using hash
        vector<int> lis;
        lis.push_back(arr[lastIndex]);
        while(hash[lastIndex] != lastIndex){
            lastIndex = hash[lastIndex];
            lis.push_back(arr[lastIndex]);
        }
        reverse(lis.begin(), lis.end());

        return lis;
    }
};

```

---

## 📝 How It Works

- `dp[i]` keeps track of the **length of LIS ending at index `i`**.
- `hash[i]` stores the **index of the previous element** in the LIS ending at `i`.
- After filling `dp` and `hash`, we:
    1. Find the maximum value in `dp`.
    2. Use `hash` to backtrack from that index to reconstruct the LIS.

---

## 🧩 Key Idea

- At every index `i`, we check all `j < i` and extend the subsequence `dp[i] = max(dp[j] + 1)` if `arr[i] > arr[j]`.
- Track the path using `hash` so we can rebuild the actual subsequence.

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| Time Complexity | O(N²) |
| Space Complexity | O(N) |

---

## ⚠️ Edge Cases

- Empty array → return empty list.
- All elements equal → return single element.
- Strictly decreasing array → return any one element.

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| DP + Hash (this one) | ✅ Reconstructs LIS |
| Binary Search + Parent | ✅ O(N log N) reconstruction |
| DP only | ❌ Can't get sequence |

---

## 🔁 Related Problems

- [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
- [Longest Bitonic Subsequence (GFG)](https://www.geeksforgeeks.org/longest-bitonic-subsequence/)
- [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)

---