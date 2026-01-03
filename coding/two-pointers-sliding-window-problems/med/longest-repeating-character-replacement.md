---
title: Longest repeating character replacement
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

- Example:
    
    ```
    Example 1:
    
    Input: s = "ABAB", k = 2
    Output: 4
    Explanation: Replace the two 'A's with two 'B's or vice versa.
    Example 2:
    
    Input: s = "AABABBA", k = 1
    Output: 4
    Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
    The substring "BBBB" has the longest repeating letters, which is 4.
    There may exists other ways to achieve this answer too.
     
    ```
    

---

---

## ✅ Solution: Sliding Window with Frequency Count (At Most K Replacements)

---

### Solution: Sliding Window with HashMap

```cpp
int characterReplacement(string s, int k) {
    int n = s.size();
    int left = 0, right = 0;
    unordered_map<char, int> mp;
    int maxFreq = INT_MIN;
    int maxLen = INT_MIN;

    while (right < n) {
        mp[s[right]]++;                              // Add current character to window
        maxFreq = max(maxFreq, mp[s[right]]);        // Track the max frequency character in window

        // If window size minus maxFreq exceeds k, shrink window from left
        if ((right - left + 1) - maxFreq > k) {
            mp[s[left]]--;
            left++;
        }

        maxLen = max(maxLen, right - left + 1);      // Update max length found so far
        right++;
    }

    return maxLen;
}

```

---

## 📝 How It Works

- We are finding the length of the longest substring that can be made by replacing at most `k` characters.
- We use a **sliding window** between `left` and `right` pointers:
    - Keep track of the count of each character using `unordered_map`.
    - Maintain `maxFreq`, which is the frequency of the most common character in the current window.
    - If `(window size - maxFreq) > k`, we shrink the window from the left.
    - Update the maximum length whenever the window is valid.

---

## 🧩 Key Formula / Recurrence

- **Window Check Condition:**
    
    `(right - left + 1) - maxFreq > k`
    
    If true → shrink window by moving `left` pointer.
    
- **Length Update:**
    
    `maxLen = max(maxLen, right - left + 1)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each character processed once. |
| **Space Complexity** | O(26) or O(M) — M = size of character set. |

---

## ⚠️ Edge Cases

- `k = 0`: No replacement allowed → longest sequence of repeating characters.
- All characters the same → whole string length is returned.
- String length = 1 → should handle single-character strings.
- `k` ≥ string length → whole string is valid because all can be replaced.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Not recommended. |
| Sliding Window + Map | O(N) ✅ | Most efficient for this problem. |
| Sliding Window + Array | O(N) | Replace `map` with array if only uppercase letters. |

---

## 🔁 Related Problems

- LeetCode 424: Longest Repeating Character Replacement ✅
- LeetCode 340: Longest Substring with At Most K Distinct Characters
- LeetCode 3: Longest Substring Without Repeating Characters
- LeetCode 567: Permutation in String (Sliding Window Pattern)

---

## 🛠️ Other Notes (Optional)

- ✅ For uppercase English letters, replacing `unordered_map` with `int freq[26]` is faster.
- ✅ Real-world analogy: Like changing up to `k` parts in a word puzzle to make a uniform line.
- ✅ `maxFreq` does not need to be recalculated when shrinking the window. This optimization saves unnecessary recalculation and keeps time complexity linear.