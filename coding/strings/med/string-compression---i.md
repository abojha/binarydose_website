---
title: String Compression - I
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

Given an array of characters `chars`, compress it using the following algorithm:

Begin with an empty string `s`. For each group of **consecutive repeating characters** in `chars`:

- If the group's length is `1`, append the character to `s`.
- Otherwise, append the character followed by the group's length.

The compressed string `s` **should not be returned separately**, but instead, be stored **in the input character array `chars`**. Note that group lengths that are `10` or longer will be split into multiple characters in `chars`.

After you are done **modifying the input array,** return *the new length of the array*.

You must write an algorithm that uses only constant extra space.

- Example:
    
    **Example 1:**
    
    ```
    Input: chars = ["a","a","b","b","c","c","c"]
    Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
    Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
    
    ```
    
    **Example 2:**
    
    ```
    Input: chars = ["a"]
    Output: Return 1, and the first character of the input array should be: ["a"]
    Explanation: The only group is "a", which remains uncompressed since it's a single character.
    
    ```
    
    **Example 3:**
    
    ```
    Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
    Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
    Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
    ```
    

---

## Solution: Two Pointers (In-place Run-Length Encoding)

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int compress(vector<char>& chars) {
        int writeIndex = 0;                 // where we write the compressed output
        int readIndex = 0;                  // scans the input

        while (readIndex < (int)chars.size()) {
            int groupStart = readIndex;     // start of the current run

            // Move readIndex to the first index AFTER this run of identical characters
            while (readIndex < (int)chars.size() && chars[readIndex] == chars[groupStart]) {
                readIndex++;
            }

            int groupLength = readIndex - groupStart;  // size of the run

            // Always write the character once
            chars[writeIndex++] = chars[groupStart];

            // If run length > 1, write its count digit by digit
            if (groupLength > 1) {
                // Convert count to string (handles multi-digit counts like 12, 100, ...)
                string countString = to_string(groupLength);
                for (char digit : countString) {
                    chars[writeIndex++] = digit;
                }
            }
        }
        // New logical length after in-place compression
        return writeIndex;
    }
};

```

## 📝 How It Works

- Use two pointers:
    - `readIndex` scans the array to find **runs** of the same character.
    - `writeIndex` writes the compressed result **in-place**.
- For each run `[groupStart, readIndex)`:
    1. Write the character at `groupStart` once to `writeIndex`.
    2. If the run length `groupLength > 1`, write its decimal length (e.g., `12` as `'1','2'`) to `writeIndex`.
- Continue until `readIndex` reaches the end. Return `writeIndex` as the new length.

Real-world analogy: Think of packing consecutive identical items in a conveyor belt—place one item as a label and then write how many identical items followed it.

## 🧩 Key Formula / Recurrence

- Not a DP problem; it’s a **linear scan with two pointers**.
- For each maximal run of length `L` of character `c`, output:
    - `c` followed by `digits(L)` **only if** `L > 1`.

## ⏱️ Time & Space Complexity

- **Time:** `O(n)` — each element is visited a constant number of times.
- **Space:** `O(1)` extra — done in-place (ignoring the temporary string for count digits whose total length is bounded by `O(n)` writes back into `chars`).

## ⚠️ Edge Cases

- Single character vector, e.g., `['a']` → `['a']` (length 1).
- All unique characters, e.g., `['a','b','c']` → unchanged (length 3).
- All same characters, e.g., 10 `'a'`s → `['a','1','0']`.
- Multi-digit counts (≥10) are correctly handled via `to_string`.
- Very long inputs (ensure indices are `int`/`size_t` cast properly to avoid warnings).
- No stray writes: ensure `writeIndex` only advances through valid positions.

## 💡 Other Approaches

- **Extra buffer (not in-place):** Build a new string/vector then copy back. Simpler to reason about, but uses `O(n)` extra space (disallowed for the LeetCode version).
- **Single pass with `for` and inner while:** Equivalent logic with slightly different loop structure; complexity unchanged.

## 🔁 Related Problems

- LeetCode 26: **Remove Duplicates from Sorted Array** (two pointers, in-place write).
- LeetCode 443 (this one): **String Compression**.
- LeetCode 38: **Count and Say** (run-length encoding idea, but generates new strings).
- Classic **Run-Length Encoding / Decoding** implementations.