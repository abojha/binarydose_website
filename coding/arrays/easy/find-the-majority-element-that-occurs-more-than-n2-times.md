---
title: Find the Majority Element that occurs more than N/2 times
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

 Given an array of **N integers**, write a program to return an element that occurs more than **N/2** times in the given array. You may consider that such an element always exists in the array.

```
Example 1:
Input Format: N = 3, nums[] = {3,2,3}
Result: 3
Explanation: When we just count the occurrences of each number and compare with half of the size of the array, you will get 3 for the above solution. 

Example 2:
Input Format:  N = 7, nums[] = {2,2,1,1,1,2,2}

Result: 2

Explanation: After counting the number of times each element appears and comparing it with half of array size, we get 2 as result.

Example 3:
Input Format:  N = 10, nums[] = {4,4,2,4,3,4,4,3,2,4}

```

---

---

### ✅ Solution: Boyer-Moore Voting Algorithm

```cpp
class Solution {
public:
    int majorityElement(vector<int>& array) {
        int count = 0;
        int candidate = -1;
        int size = array.size();

        // Phase 1: Find a potential majority candidate
        for (int element : array) {
            if (count == 0) {
                candidate = element;  // Set new candidate
            }

            if (element == candidate)
                count++;             // Confirm the candidate
            else
                count--;             // Disagree vote
        }

        // Phase 2: Confirm if candidate is truly the majority
        count = 0;
        for (int element : array) {
            if (element == candidate)
                count++;
        }

        // If frequency of candidate > n/2, return it; else return -1
        return count > size / 2 ? candidate : -1;
    }
};

```

---

## 📝 How It Works

- The problem asks us to find the **majority element**, i.e., the element that appears more than `n/2` times.
- **Boyer-Moore Voting Algorithm** works in two phases:
    1. **Candidate Selection:** Iterate and cancel out different elements. If the counter becomes zero, assume the current element as a new candidate.
    2. **Verification:** Count the candidate’s actual frequency to confirm whether it really occurs more than `n/2` times.

---

## 🧩 Key Insight / Formula

- **Boyer-Moore Voting:** At most one majority can exist.
- If an element occurs more than `n/2` times, it will **always survive** the cancellation process.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |

---

## ⚠️ Edge Cases

- All elements same → returns that element ✅
- No element appears > n/2 → returns -1 ✅
- Exactly n/2 elements same → returns -1 (since not strictly more than half) ✅
- Array of size 1 → returns that one element ✅

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| HashMap (frequency count) | O(n) | O(n) | Simple but uses extra space ❌ |
| Sorting + middle element | O(n log n) | O(1) | Middle element is majority if valid ✅ |
| Boyer-Moore (this) | O(n) | O(1) | Best and optimal ✅ |

---

## 🔁 Related Problems

- [169. Majority Element](https://leetcode.com/problems/majority-element/)
- [229. Majority Element II](https://leetcode.com/problems/majority-element-ii/) (more than n/3 times)
- [Moore’s Voting Algorithm](https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/)

---