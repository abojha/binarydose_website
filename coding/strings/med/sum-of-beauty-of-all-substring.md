---
title: Sum of Beauty of all Substring
description: ""
tags:
  - med
  - strings
---

### Problem Statement:

Given a string **S**, return the sum of **beauty** of all its substrings.The **beauty** of a string is defined as the difference in frequencies between the most frequent and least frequent characters.

- For example, the beauty of string "aaac" is 3 - 1 = 2.
- Example:
    
    **Example 1:**
    
    **Input:**S = "aaac"**Output:**3**Explanation:** The substrings with non - zero beauty are ["aaac","aac"]where beauty of "aaac" is 2 and beauty of "aac" is 1.
    
    **Example 2:**
    
    **Input:**S = "geeksforgeeks"**Output:**62**Explanation:** There are 91 substrings of the given strings.Like, the beauty of substring "geek" is 1.In this way the sum of beauties of all substrings are 62.
    
    **Your Task:**You don't need to read input or print anything. Your task is to complete the function **beautySum()** which takes string **S** as input paramters and returns the sum of **beauty** of all its substrings.
    

---

### Solution: Brute Force (with frequency map)

```cpp
class Solution {
  public:
    int beautySum(string s) {
        int sum = 0;

        // Iterate over all substrings
        for(int i = 0; i < s.size(); i++){
            int freq[26] = {0};  // Frequency array for each starting index

            for(int j = i; j < s.size(); j++){
                freq[s[j] - 'a']++;  // Update frequency of current character

                int mini = INT_MAX, maxi = INT_MIN;
                for(int k = 0; k < 26; k++){
                    if(freq[k] > 0){
                        mini = min(mini, freq[k]);
                        maxi = max(maxi, freq[k]);
                    }
                }

                sum += (maxi - mini);  // Add beauty of this substring
            }
        }

        return sum;
    }
};

```

---

## 📝 How It Works

- For every possible substring of `s` (from index `i` to `j`), we:
    - Maintain a frequency count of characters in the current substring.
    - After updating the frequency for `s[j]`, compute the **maximum and minimum frequency** values among all characters that appear at least once.
    - The **beauty** of a substring is defined as `max frequency - min frequency`, and we add this to a running total.
- This is repeated for every possible substring starting at each index.

---

## 🧩 Key Formula / Recurrence

There is no recurrence relation here — it’s a pure nested loop brute-force approach:

```
Beauty of substring s[i...j] = max(freq) - min(freq), where freq > 0

```

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | O(N³): two nested loops for substrings + one loop for frequency scan |
| 💾 Space | O(1): Only a fixed-size frequency array of size 26 |

> Although it's O(N³) in worst-case, the constant factors are small and acceptable for N ≈ 500 due to 26 letters only.
> 

---

## ⚠️ Edge Cases

- String with all identical characters (e.g., `"aaaa"`) → beauty of all substrings is 0.
- All characters unique → maximum beauty in substrings.
- Short strings (length 1–2) handled naturally.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force | O(N³) | O(1) |
| Using HashMap (unordered_map) for better readability | O(N³) | O(1) |
| Optimized with segment trees or advanced freq tracking | ⚠️ Complex and overkill |  |

> The current approach is optimal for the constraints typically seen in interview settings.
> 

---

## 🔁 Related Problems

- Leetcode 1915. **Number of Wonderful Substrings**
- Leetcode 3. **Longest Substring Without Repeating Characters**
- Leetcode 424. **Longest Repeating Character Replacement**

---