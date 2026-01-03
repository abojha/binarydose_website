---
title: Minimum Window Subsequence
description: ""
tags:
  - hard
  - two-pointers-sliding-window-problems
---

### Problem Statement:

You are given two strings, **s1** and **s2**. Your task is to find the smallest **substring** in **s1** such that **s2** appears as a subsequence within that substring.

1. The characters of s2 must appear in the same sequence within the substring of s1.
2. If there are multiple valid substrings of the same minimum length, return the one that appears first in s1.
3. If no such substring exists, return an empty string.

Note: Both the strings contain only lowercase letters.

- Example:
    
    ```
    Examples:
    
    Input: s1 = "geeksforgeeks", s2 = "eksrg"
    Output: "eksforg"
    Explanation: "eksforg" satisfies all required conditions. s2 is its subsequence and it is longest and leftmost among all possible valid substrings of s1.
    Input: s1 = "abcdebdde", s2 = "bde" 
    Output: "bcde"
    Explanation:  "bcde" is the answer and "deb" is not a smaller window because the elements in the window must occur in order.
    ```
    

---

## ✅ Solution: Two-Pointer Expansion & Contraction (Minimum Window Subsequence)

---

### Solution: Two-Pointer Based Expansion & Contraction

```cpp
class Solution {
  public:
    string minWindow(string& s1, string& s2) {
        int n = s1.size();
        int m = s2.size();

        int startIndex = -1;
        int minLen = INT_MAX;

        for (int i = 0; i < n; i++) {
            if (s1[i] == s2[0]) {
                int p1 = i;
                int p2 = 0;

                // Expand: Move p1 forward to match s2
                while (p1 < n && p2 < m) {
                    if (s1[p1] == s2[p2]) {
                        p2++;
                    }
                    p1++;
                }

                // If entire s2 matched in s1
                if (p2 == m) {
                    int end = p1 - 1;
                    p2 = m - 1;
                    p1 = end;

                    // Contract: Move p1 backward to minimize window
                    while (p1 >= i) {
                        if (s1[p1] == s2[p2]) {
                            p2--;
                            if (p2 < 0) break;
                        }
                        p1--;
                    }

                    if (end - p1 < minLen) {
                        minLen = end - p1;
                        startIndex = p1;
                    }
                }
            }
        }

        return (startIndex == -1) ? "" : s1.substr(startIndex, minLen + 1);
    }
};

```

---

## 📝 How It Works

- We want the **minimum window in s1 that contains s2 as a subsequence**.
- **Two phases:**
    1. **Expand Forward:**
        - For each `i` where `s1[i] == s2[0]`, try to match `s2` in `s1` using two pointers (`p1`, `p2`).
    2. **Contract Backward:**
        - Once a match is found, move `p1` backward to shrink the window while keeping `s2` as a subsequence.
- **Update:** Whenever a smaller valid window is found, update `startIndex` and `minLen`.

---

## 🧩 Key Formula / Recurrence

- **Forward Scan:** Match `s2` using two pointers: `p1` on `s1`, `p2` on `s2`.
- **Backward Scan:** Move `p1` backward once `s2` is matched completely to minimize window.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N × M) — Two nested scans for each potential start point. |
| **Space Complexity** | O(1) — Constant extra space. |

---

## ⚠️ Edge Cases

- `s2` is longer than `s1` → return empty string.
- `s2` is empty → depends on problem convention; usually return `""`.
- No subsequence match → return empty string.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DP Table (LCS Variation) | O(N × M) | For academic interest, but heavier code. |
| Two-Pointer Expansion-Contraction ✅ | O(N × M) | More efficient for coding interviews. |

---

## 🔁 Related Problems

- LeetCode 727: Minimum Window Subsequence ✅
- LeetCode 76: Minimum Window Substring
- GFG: Smallest window in a string containing all characters of another string (with order preserved)

---

## 🛠️ Other Notes (Optional)

- ✅ Real-world analogy: Finding the shortest highlight from a video that contains all key scenes in the correct order.
- ✅ This solution is ideal for **subsequence-based window problems**, not subset window problems like LeetCode 76.