---
title: Minimum Window Substring
description: ""
tags:
  - hard
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given two strings `s` and `t` of lengths `m` and `n` respectively, return *the **minimum window*** ***substring** of* `s` *such that every character in* `t` *(**including duplicates**) is included in the window*. If there is no such substring, return *the empty string* `""`.

The testcases will be generated such that the answer is **unique**.

- Example:
    
    ```
    Example 1:
    
    Input: s = "ADOBECODEBANC", t = "ABC"
    Output: "BANC"
    Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
    Example 2:
    
    Input: s = "a", t = "a"
    Output: "a"
    Explanation: The entire string s is the minimum window.
    Example 3:
    
    Input: s = "a", t = "aa"
    Output: ""
    Explanation: Both 'a's from t must be included in the window.
    Since the largest window of s only has one 'a', return empty string.
    ```
    

---

---

## ✅ Solution: Sliding Window + HashMap (Minimum Window Substring)

---

### Solution: Sliding Window with Frequency Map

```cpp
string minWindow(string s, string t) {
    int left = 0, right = 0;
    map<char, int> mpp;  // frequency map for characters in t
    int startIndex = -1, len = INT_MAX;
    int count = 0;  // number of required characters matched

    for (auto ch : t) {
        mpp[ch]++;
    }

    while (right < s.size()) {
        if (mpp[s[right]] > 0) count++;  // count matched char if still needed
        mpp[s[right]]--;  // reduce required count even if negative

        while (count == t.size()) {  // all required characters matched
            if (right - left + 1 < len) {
                len = right - left + 1;
                startIndex = left;
            }

            mpp[s[left]]++;  // exclude left char
            if (mpp[s[left]] > 0) count--;  // reduce matched count if required again
            left++;
        }

        right++;
    }

    return (startIndex == -1) ? "" : s.substr(startIndex, len);
}

```

---

## 📝 How It Works

- **Objective:** Find the minimum length substring in `s` that contains all characters from `t`.
- We build a **frequency map** for characters in `t`.
- Expand the window using `right`:
    - Decrease `mpp[s[right]]` for each character.
    - If `mpp[s[right]] > 0`, it means a needed character is included, so we increase `count`.
- Once all required characters are matched (`count == t.size()`):
    - Try shrinking the window from `left` while maintaining the validity.
    - Update the minimum length and start index whenever a smaller valid window is found.
- If no valid window is found, return `""`.

---

## 🧩 Key Formula / Recurrence

- **Window Validation:**
    
    `while (count == t.size())`
    
- **Window Shrinking:**
    
    Adjust `left` pointer while maintaining required characters using `mpp`.
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each character is processed at most twice. |
| **Space Complexity** | O(M) — M = number of unique characters in `t`. |

---

## ⚠️ Edge Cases

- `t` contains characters not present in `s` → return `""`.
- `s` is smaller than `t` → no valid window.
- `s` and `t` have all the same characters → full string `s` is the window.
- Repeating characters in `t`.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Inefficient for large inputs. |
| Sliding Window + Map | O(N) ✅ | Most efficient and standard method. |

---

## 🔁 Related Problems

- LeetCode 76: Minimum Window Substring ✅
- LeetCode 567: Permutation in String
- LeetCode 3: Longest Substring Without Repeating Characters
- LeetCode 340: Longest Substring with At Most K Distinct Characters

---

## 🛠️ Other Notes (Optional)

- ✅ Real-world analogy: Finding the shortest sequence of ingredients in a shopping list that contains everything you need exactly once.
- ✅ Using `unordered_map` instead of `map` can improve runtime on large inputs with many unique characters.