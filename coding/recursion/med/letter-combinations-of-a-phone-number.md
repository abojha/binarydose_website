---
title: Letter Combinations of a Phone Number
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

- Example:
    
    ```
    Example 1:
    
    Input: digits = "23"
    Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    Example 2:
    
    Input: digits = ""
    Output: []
    Example 3:
    
    Input: digits = "2"
    Output: ["a","b","c"]
     
    ```
    

---

### 

### ✅ Solution: Backtracking

```cpp
class Solution {
public:
    vector<string> result;
    string charToDigit[10] = {
        "",     // 0 has no letters
        "",     // 1 has no letters
        "abc",  // 2
        "def",  // 3
        "ghi",  // 4
        "jkl",  // 5
        "mno",  // 6
        "pqrs", // 7
        "tuv",  // 8
        "wxyz"  // 9
    };

    // Recursive function to build combinations
    void f(string digits, int index, string &current){
        if(index == digits.size()){
            result.push_back(current); // full combination formed
            return;
        }

        string letter = charToDigit[digits[index] - '0'];
        for(char ch : letter){
            current.push_back(ch);         // choose
            f(digits, index + 1, current); // explore
            current.pop_back();            // backtrack
        }
    }

    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return {}; // edge case: no input
        string current;
        f(digits, 0, current);
        return result;
    }
};

```

---

---

## 📝 Revision Notes

### ✅ Solution: Backtracking

---

### 📝 How It Works

- Each digit maps to some letters using a `charToDigit` array, just like on a phone keypad.
- Start from the first digit, and for each possible letter:
    - Add it to the current string.
    - Recursively move to the next digit.
    - When all digits are processed (`index == digits.size()`), the string is added to `result`.
- Uses backtracking to try all combinations and undo choices (with `pop_back()`).

---

### 🧩 Key Formula / Recurrence

- Recurrence is like a tree:
    
    ```
    f(index) = for each letter in map[digits[index]]:
                   f(index + 1)
    
    ```
    
- At each level, you explore all mapped letters.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| **Time** | O(3ⁿ × 4ᵐ) — where n is the number of digits mapping to 3 letters, m to 4 letters |
| **Space** | O(k) for recursion stack, O(3ⁿ × 4ᵐ) for storing answers |

---

### ⚠️ Edge Cases

- Empty string (`""`) → return `[]`
- Digits like `0` or `1` → safely ignored due to `""` mapping

---

### 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| BFS with Queue | O(3ⁿ × 4ᵐ) | Builds layer-by-layer combinations |
| Iterative using Vector | O(3ⁿ × 4ᵐ) | Accumulates results by multiplying with letter sets |

---

### 🔁 Related Problems

- Leetcode 17. Letter Combinations of a Phone Number
- Leetcode 22. Generate Parentheses
- Leetcode 39. Combination Sum
- Leetcode 784. Letter Case Permutation

---

Let me know if you want BFS or Iterative version also!