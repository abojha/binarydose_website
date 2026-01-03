---
title: Linear Search in Array
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Brute Force – Linear Search

```cpp
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Return index where target is found
        }
    }
    return -1; // Target not found
}

```

---

## 📝 How It Works

- Traverse the array from left to right using a loop.
- At each step, check if the current element is equal to the `target`.
- If a match is found, return its index immediately.
- If the loop completes without a match, return `1` to indicate "not found".

---

## 🧩 Key Formula / Recurrence

- No recurrence or DP involved.
- Core condition:
    
    `if (arr[i] == target) → return i;`
    

---

## ⏱️ Time & Space Complexity

| Case | Time Complexity | Space Complexity |
| --- | --- | --- |
| Best Case | O(1) | O(1) |
| Average Case | O(N) | O(1) |
| Worst Case | O(N) | O(1) |
- Best case: `target` is at index 0.
- Worst case: `target` is at the end or not present.

---

## ⚠️ Edge Cases

- Empty array → always return `1`.
- All elements same but not equal to target → return `1`.
- Multiple occurrences → returns **first match only**.
- Array contains negative and positive integers → works without modification.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Binary Search | O(log N) | O(1) | Only works on sorted arrays |
| Hashing (map) | O(1) avg | O(N) | Fast lookup but uses space |

---

## 🔁 Related Problems

- Binary Search (when array is sorted)
- Search Insert Position
- First Occurrence of Element
- Find Element in Rotated Sorted Array

---