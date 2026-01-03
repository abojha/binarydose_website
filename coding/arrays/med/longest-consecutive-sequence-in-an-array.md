---
title: Longest Consecutive Sequence in an Array
description: ""
tags:
  - array
  - med
---

### Problem Statement:

You are given an array of ‘N’ integers. You need to find the length of the longest sequence which contains the consecutive elements

- Example:
    
    ```
    Example 1:
    
    Input: [100, 200, 1, 3, 2, 4]
    
    Output: 4
    
    Explanation: The longest consecutive subsequence is 1, 2, 3, and 4.
    
    Input: [3, 8, 5, 7, 6]
    
    Output: 4
    
    Explanation: The longest consecutive subsequence is 5, 6, 7, and 8.
    ```
    

---

---

---

## ✅ Solution: HashSet + Sequence Starter Check

```cpp
int longestConsecutive(vector<int>& numbers) {
    unordered_set<int> numberSet;
    int maxLength = 0;

    // Insert all elements into an unordered set
    for (int num : numbers) {
        numberSet.insert(num);
    }

    // Check each number: is it the start of a sequence?
    for (int num : numberSet) {
        if (numberSet.find(num - 1) == numberSet.end()) {
            int currentNum = num;
            int currentStreak = 1;

            // Count length of the current sequence
            while (numberSet.find(currentNum + 1) != numberSet.end()) {
                currentNum++;
                currentStreak++;
            }

            maxLength = max(maxLength, currentStreak);
        }
    }

    return maxLength;
}

```

---

## 📝 How It Works

- First, insert all elements into an unordered set to allow **O(1) lookups**.
- Iterate over each number and check if it is the **start of a sequence** by checking if `num - 1` is **not** in the set.
- If it's a starting point, increment `currentNum` until the sequence breaks, counting the streak.
- Track the maximum length found.

---

## 🧩 Key Logic

```
If (num - 1) not in set → it's a sequence start
Then check for (num + 1), (num + 2), ... and count streak

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(n) |

Each number is processed at most once due to set-based sequence checking.

---

## ⚠️ Edge Cases

- Empty array → return 0
- All numbers same → return 1
- Single-element array → return 1
- Already sorted array → correctly finds full length

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force + Sort | O(n log n) | O(1) | ❌ Can't handle duplicates easily |
| HashSet (this) | O(n) | O(n) | ✅ Best and optimal |

---

## 🔁 Related Problems

- [Leetcode 128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- [Leetcode 1048. Longest String Chain](https://leetcode.com/problems/longest-string-chain/)
- [Leetcode 873. Length of Longest Fibonacci Subsequence](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/)