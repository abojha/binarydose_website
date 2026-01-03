---
title: Power Set
description: ""
tags:
  - bit-manupilation
  - med
---

### Problem Statement:

Given a string **s** of length **n**, find all the **possible non-empty [subsequences](https://www.geeksforgeeks.org/data-structures/string-subsequence-substring/)** of the string **s** in **lexicographically-sorted** order.

- Example:
    
    **Example 1:**
    
    ```
    Input :
    s = "abc"
    Output:
    a ab abc ac b bc c
    Explanation :
    There are a total 7 number of subsequences possible for the given string, and they are mentioned above in lexicographically sorted order.
    
    ```
    
    **Example 2:**
    
    ```
    Input:
    s = "aa"
    Output:
    a a aa
    Explanation :
    There are a total 3 number of subsequences possible for the given string, and they are mentioned above in lexicographically sorted order.
    ```
    

---

## ✅ Solution: Bitmasking (Generate All Non-Empty Subsequences)

```cpp
class Solution {
  public:
    vector<string> AllPossibleStrings(string s) {
        int n = s.size();
        vector<string> res;

        // Loop through all binary masks from 1 to 2^n - 1 (excluding 0 to skip empty subset)
        for (int mask = 1; mask < (1 << n); mask++) {
            string temp = "";
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) {
                    temp += s[j]; // Include s[j] if j-th bit is set
                }
            }
            res.push_back(temp);
        }

        sort(res.begin(), res.end()); // Lexicographical order
        return res;
    }
};

```

---

## 📝 How It Works

- We want to generate all **non-empty subsequences** of a string.
- A string of length `n` has `2^n` subsets → we use **bitmasking** to represent inclusion/exclusion of each character.
- Skip `i = 0` to avoid the empty subset.
- Each number `i` from `1` to `(1 << n) - 1` represents a subset.
    - If `i & (1 << j)` is true, include character at position `j`.

---

## 🧩 Key Formula / Logic

- Total subsequences = `2^n - 1` (excluding empty string)
- For each mask from `1` to `(1 << n) - 1`:
    - Include character `s[j]` if `(mask >> j) & 1` is true.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(2ⁿ × n + 2ⁿ log 2ⁿ) |
| Space | O(2ⁿ × n) |
- `O(2^n × n)` to generate all strings
- Sorting takes `O(2^n log 2^n)`

---

## ⚠️ Edge Cases

- Empty string → no non-empty subsequences (but loop skips i=0 so it's safe)
- Duplicates in input string → handled correctly; output may have duplicate-looking strings but still unique by character positions.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Recursion/Backtracking | O(2ⁿ × n) | O(n) | Similar result, more intuitive for beginners |
| Bitmasking ✅ | O(2ⁿ × n) | O(2ⁿ) | Fast & compact |

---

## 🔁 Related Problems

- [Leetcode 78 – Subsets](https://leetcode.com/problems/subsets/)
- [Leetcode 90 – Subsets II](https://leetcode.com/problems/subsets-ii/)
- [GFG – Power Set](https://practice.geeksforgeeks.org/problems/power-set4302/1)
- [Leetcode 46 – Permutations](https://leetcode.com/problems/permutations/)

---

## 🛠️ Real-world Analogy

Think of choosing clothes from a wardrobe — you decide for each item: take it or not. Bitmasking efficiently goes through **every combination** (except empty outfit here) by encoding choices in binary.