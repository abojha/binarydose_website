---
title: Reverse each word in a given string
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

You are given a string **s**. You need to reverse each word in it where the words are separated by spaces and return the modified string.

Note: The string may contain leading or trailing spaces, or multiple spaces between two words. The returned string should only have a single space separating the words, and no extra spaces should be included.

- Example:
    
    ```
    Input: s = " i like this program very much "
    Output: "i ekil siht margorp yrev hcum"
    Explanation: The words are reversed as follows:
    "i" -> "i","like"->"ekil",
    "this"->"siht","program" -> "margorp",
    "very" -> "yrev","much" -> "hcum".
    Input: s = " pqr mno "
    Output: "rqp onm"
    Explanation: The words are reversed as follows:
    "pqr" -> "rqp" ,
    "mno" -> "onm"
    Input: s = "pqr"
    Output: "rqp"
    Explanation: The words are reversed as follows:
    "pqr" -> "rqp"
    ```
    

---

---

## ✅ Solution: Manual Parsing and Rebuilding (Brute Force)

```cpp
class Solution {
  public:
    string reverseWords(string &s) {
        int n = s.size();
        string ans = "", temp = "";
        int left = 0;
        int right = n - 1;

        // Trim leading spaces
        while(left < n && s[left] == ' ') left++;

        // Trim trailing spaces
        while(right >= 0 && s[right] == ' ') right--;

        // Process characters from right to left
        while(left <= right){
            char ch = s[right];

            if(ch != ' ')
                temp += ch;
            else{
                // If a word ends, add it to the answer (in reverse order)
                if(!temp.empty()){
                    if(ans != "")
                        ans = temp + " " + ans;  // Add space between words
                    else
                        ans = temp;
                    temp = "";  // Reset for next word
                }
            }
            right--;
        }

        // Append the last word if any
        if(!temp.empty()){
            if(ans != "")
                ans = temp + " " + ans;
            else
                ans = temp;
        }

        return ans;
    }
};

```

---

## 📝 How It Works

- You **trim leading and trailing spaces** first.
- Then you scan the string **from right to left**, building each word character-by-character in `temp`.
- When a space is encountered, the accumulated word is added to the front of `ans`, maintaining reverse order.
- Finally, the last accumulated word is added if it's non-empty.

---

## 🧩 Key Technique

- Manual word collection and reverse assembly.
- Instead of using built-in functions like `stringstream`, the solution uses string manipulation and pointer movement to control formatting.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(n) |
| Space | O(n) |
- Each character is processed once.
- An extra string is used to build the result, so space is linear.

---

## ⚠️ Edge Cases

- Input with multiple spaces: `" hello world "`
- Input with only spaces: `" "`
- Input with one word: `"word"`

---

## 💡 Other Approaches

| Approach | Time | Space | Description |
| --- | --- | --- | --- |
| `stringstream` | O(n) | O(n) | Use `stringstream` to split and reverse |
| `reverse + reverse` | O(n) | O(1) (in-place) | Reverse entire string, then each word |

---

## 🔁 Related Problems

- [Leetcode 151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)
- [Leetcode 186. Reverse Words in a String II (in-place)](https://leetcode.com/problems/reverse-words-in-a-string-ii/)
- [Leetcode 557. Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/)

---