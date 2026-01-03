---
title: Longest Substring Without Repeating Characters
description: ""
tags:
  - med
  - two-pointers-sliding-window-problems
---

### Problem Statement:

 Given a String, find the length of longest substring without any repeating character.

```

```

---

---

## ✅ Solution: Brute Force → Sliding Window (Set) → Optimized Sliding Window (Map)

---

### Solution: Brute Force

```cpp
int lengthOfLongestSubstring(string s) {
    if(s.empty()) return 0;

    int maxLength = INT_MIN;

    for(int i = 0; i < s.size(); i++) {
        unordered_set<char> seenChars;
        for(int j = i; j < s.size(); j++) {
            if(seenChars.find(s[j]) != seenChars.end()) {
                maxLength = max(maxLength, j - i);
                break;
            }
            seenChars.insert(s[j]);
        }
        // Handle when substring reaches the end
        maxLength = max(maxLength, (int)(s.size() - i));
    }

    return maxLength;
}

```

---

### Solution: Sliding Window with Set

```cpp
int lengthOfLongestSubstring(string s) {
    if(s.empty()) return 0;

    int left = 0, right = 0;
    int maxLength = INT_MIN;
    unordered_set<char> seenChars;

    while(right < s.size()) {
        if(seenChars.find(s[right]) != seenChars.end()) {
            while(left < right && seenChars.find(s[right]) != seenChars.end()) {
                seenChars.erase(s[left]);
                left++;
            }
        }

        seenChars.insert(s[right]);
        maxLength = max(maxLength, right - left + 1);
        right++;
    }

    return maxLength;
}

```

---

### Solution: Optimized Sliding Window with Map

```cpp
int lengthOfLongestSubstring(string s) {
    if(s.empty()) return 0;

    map<char, int> lastSeen; // Stores character and its latest index
    int left = 0;
    int maxLength = INT_MIN;

    for(int right = 0; right < s.size(); right++) {
        if(lastSeen.find(s[right]) != lastSeen.end()) {
            left = max(left, lastSeen[s[right]] + 1);
        }

        lastSeen[s[right]] = right;
        maxLength = max(maxLength, right - left + 1);
    }

    return maxLength;
}

```

---

## 📝 How It Works

- **Brute Force**: Checks all possible substrings using two loops and a set to check for duplicates.
- **Sliding Window with Set**:
    - Maintains a window using `left` and `right` pointers.
    - Expands `right` until a duplicate is found.
    - Shrinks `left` until the duplicate is removed.
- **Optimized Sliding Window with Map**:
    - Uses `map<char, int>` to record last seen index.
    - Directly moves `left` pointer to `lastSeen[s[right]] + 1` whenever a duplicate is found.
    - Ensures each character is processed only once efficiently.

---

## 🧩 Key Formula / Recurrence

- For **Optimized Sliding Window**:
    - `left = max(left, lastSeen[s[right]] + 1)`
    - `maxLength = max(maxLength, right - left + 1)`

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Brute Force | O(N²) | O(N) |
| Sliding Window + Set | O(N) | O(M) |
| Optimized Sliding Window | O(N) ✅ | O(M) ✅ |

Where:

- N = length of `s`
- M = size of character set (128 for ASCII)

---

## ⚠️ Edge Cases

- Empty string → returns 0
- All same characters → longest substring length = 1
- No repeating characters → length equals string size

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force | O(N²) | Too slow for interviews |
| Sliding Window + Set | O(N) | Good but extra checking |
| Optimized Sliding Window | O(N) ✅ | Most efficient for interviews |
- For ASCII strings, replacing `map` with `vector<int>` can improve performance further.

---

## 🔁 Related Problems

- LeetCode 3: Longest Substring Without Repeating Characters
- LeetCode 76: Minimum Window Substring
- LeetCode 159: Longest Substring with At Most Two Distinct Characters
- GFG: Longest Distinct Characters Substring

---

## 🛠️ Other Notes (Optional)

- **Real-world analogy**: Like walking through a street of unique shops; if you see a repeat shop, you restart counting from after your last visit.
- **Interview Tip**: Always explain sliding window with both expanding and shrinking the window as you iterate through the array.