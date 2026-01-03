---
title: Longest Substring with At Most K Distinct Characters
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

Given a string **s**, you need to print the size of the longest possible substring with at most **k unique** characters. If no possible substring exists, print -1.

- Example:
    
    ```
    Examples:
    
    Input: s = "aabacbebebe", k = 3
    Output: 7
    Explanation: "cbebebe" is the longest substring with 3 distinct characters.
    
    Input: s = "aaaa", k = 2
    Output: -1
    Explanation: There's no substring with 2 distinct characters.
    
    Input: s = "aabaaab", k = 2
    Output: 7
    Explanation: "aabaaab" is the longest substring with 2 distinct characters.
    ```
    

---

---

## ✅ Solution: Sliding Window with HashMap (At Most K Distinct Characters)

---

### Solution: Sliding Window with HashMap

```cpp
int longestKSubstr(string &s, int k) {
    int maxLen = -1;
    unordered_map<char, int> mpp;  // Stores character frequency in the window
    int left = 0, right = 0;

    while (right < s.size()) {
        mpp[s[right]]++;  // Include the current character in the window

        // Shrink the window until unique characters count is at most k
        while (mpp.size() > k) {
            mpp[s[left]]--;
            if (mpp[s[left]] == 0) mpp.erase(s[left]);
            left++;
        }

        // Update max length if window is valid (≤ k unique characters)
        maxLen = max(maxLen, right - left + 1);

        right++;
    }

    return maxLen;
}

```

---

## 📝 How It Works

- We want the **longest substring with at most K unique characters**.
- Using a **sliding window** approach:
    - Expand the window by moving `right` and count frequencies using `unordered_map`.
    - If the number of unique characters exceeds `k`, shrink from `left` until it becomes valid again.
    - Keep updating the maximum length whenever the window is valid.
- If no valid window exists (e.g., `k = 0`), we return `1` as per problem convention.

---

## 🧩 Key Formula / Recurrence

- **When `mpp.size() > k`:**
    
    Shrink window:
    
    `left++` and update frequency in `mpp`.
    
- **At each step:**
    
    `maxLen = max(maxLen, right - left + 1)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time Complexity** | O(N) — Each character is processed at most twice. |
| **Space Complexity** | O(K) — Maximum K entries in `unordered_map`. |

---

## ⚠️ Edge Cases

- `k = 0`: Should return `1`. No valid window.
- String length < `k`: Return length of the string.
- All characters the same and `k = 1`: Whole string is valid.
- String with all unique characters and `k = string length`: Whole string is valid.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Not efficient, only for learning. |
| Sliding Window + HashMap | O(N) ✅ | Most optimal for interview use. |
- Some variants use `unordered_map` vs. array when dealing with specific character sets (like only lowercase letters).

---

## 🔁 Related Problems

- LeetCode 340: Longest Substring with At Most K Distinct Characters ✅ (same logic)
- LeetCode 3: Longest Substring Without Repeating Characters (At Most 1 distinct count per character)
- GFG: Longest substring with at most K unique characters
- LeetCode 159: Longest Substring with At Most Two Distinct Characters

---

## 🛠️ Other Notes (Optional)

- ✅ Use `unordered_map` for dynamic character sets.
- ✅ For only lowercase English letters, you could replace the map with a vector of size 26.
- ✅ Real-world analogy: Like trying to keep your playlist limited to at most `k` different artists without stopping the music.