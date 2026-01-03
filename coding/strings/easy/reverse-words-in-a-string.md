---
title: Reverse Words in a String
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Given an input string `s`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The **words** in `s` will be separated by at least one space.

Return *a string of the words in reverse order concatenated by a single space.*

**Note** that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

- Example:
    
    ```
    Example 1:
    
    Input: s = "the sky is blue"
    Output: "blue is sky the"
    Example 2:
    
    Input: s = "  hello world  "
    Output: "world hello"
    Explanation: Your reversed string should not contain leading or trailing spaces.
    Example 3:
    
    Input: s = "a good   example"
    Output: "example good a"
    Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
    ```
    

---

---

## ✅ Solution: String Manipulation (Two Pointer Traversal)

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int n = s.size();
        int left = 0;
        int right = n - 1;
        string temp = "";
        string ans = "";

        // Trim leading spaces
        while(left <= right && s[left] == ' ') left++;

        // Trim trailing spaces
        while(left <= right && s[right] == ' ') right--;

        while(left <= right){
            char ch = s[left];
            if(ch != ' ')
                temp += ch;
            else if(!temp.empty()){
                // Prepend the word to the result
                if(ans != "") ans = temp + " " + ans;
                else ans = temp;
                temp = "";
            }
            left++;
        }

        // Add the last word
        if(!temp.empty()){
            if(ans != "") ans = temp + " " + ans;
            else ans = temp;
        }

        return ans;
    }
};

```

---

## 📝 How It Works

1. **Trim Spaces**: Leading and trailing spaces are removed using two pointers.
2. **Word Construction**: As we traverse, characters are accumulated into a temporary string `temp` until a space is found.
3. **Reverse Order**: Every time a word ends, we prepend it to `ans`, building the result in reverse.
4. **Last Word**: After the loop, the final word in `temp` is also prepended.
5. **No Extra Spaces**: Multiple spaces between words are ignored using `temp.empty()` check.

---

## 🧩 Key Concept

- **Prepending words** to reverse their order.
- **Skipping spaces** while keeping only single spaces between words.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(N) |

---

## ⚠️ Edge Cases

- Input with multiple spaces between words → `" Hello World "`
- Input with only spaces → `" "` → returns `""`
- Single word without spaces → `"Hello"` → returns `"Hello"`

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Stack of words | O(N) | O(N) | Push words into a stack and pop to reverse |
| In-place reverse | O(N) | O(1) | Use string reversal and extra steps (more complex) |
| `stringstream` + `vector<string>` | O(N) | O(N) | Easier with STL split and reverse |

---

## 🔁 Related Problems

- [Leetcode 151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)
- Leetcode 186. Reverse Words in a String II
- Leetcode 557. Reverse Words in a String III

---