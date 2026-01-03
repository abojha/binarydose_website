---
title: Count and Say
description: ""
tags:
  - hard
  - strings
---

### Problem Statement:

The **count-and-say** sequence is a sequence of digit strings defined by the recursive formula:

- `countAndSay(1) = "1"`
- `countAndSay(n)` is the run-length encoding of `countAndSay(n - 1)`.

[Run-length encoding](http://en.wikipedia.org/wiki/Run-length_encoding) (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string `"3322251"` we replace `"33"` with `"23"`, replace `"222"` with `"32"`, replace `"5"` with `"15"` and replace `"1"` with `"11"`. Thus the compressed string becomes `"23321511"`.

Given a positive integer `n`, return *the* `nth` *element of the **count-and-say** sequence*.

- Example:
    
    **Example 1:**
    
    **Input:** n = 4
    
    **Output:** "1211"
    
    **Explanation:**
    
    ```
    countAndSay(1) = "1"
    countAndSay(2) = RLE of "1" = "11"
    countAndSay(3) = RLE of "11" = "21"
    countAndSay(4) = RLE of "21" = "1211"
    
    ```
    
    **Example 2:**
    
    **Input:** n = 1
    
    **Output:** "1"
    
    **Explanation:**
    
    This is the base case.
    

---

---

## ✅ Solution: **Recursive (Helper Function for Say Operation)**

```cpp
class Solution {
public:
    // Helper function to "say" the string
    string solve(string prev){
        int count = 1;
        string current = "";

        for(int i = 1; i < prev.size(); i++){
            if(prev[i] == prev[i - 1]){
                count++;  // same digit, increment count
            } else {
                // say the previous digit
                current += to_string(count) + prev[i - 1];
                count = 1;  // reset for new digit
            }
        }

        // say the last group
        current += to_string(count) + prev.back();
        return current;
    }

    string countAndSay(int n) {
        if(n == 1) return "1";  // base case

        string prev = countAndSay(n - 1);  // get previous term recursively
        return solve(prev);                // describe it
    }
};

```

---

## ✅ Solution: **Iterative**

```cpp
class Solution {
public:
    string countAndSay(int n) {
        if(n == 1) return "1";

        string current = "1";

        for(int i = 2; i <= n; i++){
            string next = "";
            int count = 1;

            for(int j = 1; j < current.size(); j++){
                if(current[j] == current[j - 1]){
                    count++;  // same digit
                } else {
                    next += to_string(count) + current[j - 1];  // append count + digit
                    count = 1;  // reset
                }
            }

            next += to_string(count) + current.back();  // handle last group
            current = next;  // move to next term
        }

        return current;
    }
};

```

---

## 📝 How It Works

- The "Count and Say" sequence starts with `"1"`, and each next term describes the previous one using **count followed by digit**.
- For example:
    - `"1"` → `"11"` (one 1)
    - `"11"` → `"21"` (two 1s)
    - `"21"` → `"1211"` (one 2, one 1), and so on.
- **Recursive version** builds from base case and uses a helper to process each term.
- **Iterative version** loops from 2 to n and generates each next term from the current one.

---

## 🧩 Key Formula / Recurrence

- No numeric recurrence, but logic-wise:
    
    ```
    countAndSay(n) = say(countAndSay(n - 1))
    
    ```
    
- "say" = count consecutive digits and describe them as `count + digit`.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Recursive | O(n × 2ⁿ) | O(n × 2ⁿ) stack |
| Iterative | O(n × 2ⁿ) | O(2ⁿ) |
- Length of each term nearly doubles → exponential growth.

---

## ⚠️ Edge Cases

- `n = 1`: Base case, must return `"1"`.
- Always handle the **last group** of characters after the loop.
- Avoid off-by-one errors: loop runs from `1` to `s.size() - 1`.

---

## 💡 Other Approaches

| Approach | Time | Remarks |
| --- | --- | --- |
| Recursion | O(n × 2ⁿ) | Elegant but has call stack |
| Iterative | O(n × 2ⁿ) | More efficient and safe |

---

## 🔁 Related Problems

- [Leetcode 38. Count and Say](https://leetcode.com/problems/count-and-say/)
- Run-Length Encoding
- Look-and-Say Sequence in Number Theory

---