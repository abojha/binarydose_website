---
title: Sort Characters by Frequency
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

Given a string `s`, sort it in **decreasing order** based on the **frequency** of the characters. The **frequency** of a character is the number of times it appears in the string.

Return *the sorted string*. If there are multiple answers, return *any of them*.

- Example:
    
    ```
    Example 1:
    
    Input: s = "tree"
    Output: "eert"
    Explanation: 'e' appears twice while 'r' and 't' both appear once.
    So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
    Example 2:
    
    Input: s = "cccaaa"
    Output: "aaaccc"
    Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
    Note that "cacaca" is incorrect, as the same characters must be together.
    Example 3:
    
    Input: s = "Aabb"
    Output: "bbAa"
    Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
    Note that 'A' and 'a' are treated as two different characters.
    ```
    

---

---

## ✅ Solution: Hash Map + Max Heap

```cpp
class Solution {
public:
    string frequencySort(string s) {
        map<char, int> mpp;
        string result;

        // Count frequencies of characters
        for(int i = 0; i < s.size(); i++){
            mpp[s[i]]++;
        }

        // Use max heap to sort by frequency
        priority_queue<pair<int, char>> pq;
        for(auto m : mpp){
            pq.push({m.second, m.first});
        }

        // Append characters by frequency order
        while(!pq.empty()){
            auto it = pq.top();
            pq.pop();
            result += string(it.first, it.second);  // Append char multiple times
        }

        return result;
    }
};

```

---

## 📝 How It Works

1. **Frequency Count**: Use a map to count how many times each character appears.
2. **Max Heap**: Push all characters with their frequency into a max-heap (`priority_queue`) so the highest frequency comes out first.
3. **Rebuild String**: Pop from the heap and append the character `frequency` times to the result string.

---

## 🧩 Key Idea

Use a **priority queue (max heap)** to sort characters by their frequency in descending order.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(n log k) |
| Space | O(k) |
- `n` = length of the input string
- `k` = number of distinct characters
- **Explanation**:
    - Counting freq = O(n)
    - Heap operations = O(k log k)
    - Rebuilding = O(n)

---

## ⚠️ Edge Cases

- All characters same → e.g., `"aaa"` → return `"aaa"`.
- All characters unique → order of same-frequency chars may vary.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Bucket Sort (using vector) | O(n) | O(n) |
| Sorting with custom comparator | O(n log n) | O(n) |

Bucket sort can be **faster** in practice for small `k` (26 lowercase letters).

---

## 🔁 Related Problems

- Leetcode 347: Top K Frequent Elements
- Leetcode 692: Top K Frequent Words
- Leetcode 451: Sort Characters by Frequency

---