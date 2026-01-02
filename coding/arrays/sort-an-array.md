### Problem Statement:

Given an array consisting of only 0s, 1s, and 2s. Write a program to in-place sort the array without using inbuilt sort functions. ( Expected: Single pass-O(N) and constant space)

```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Input: nums = [2,0,1]
Output: [0,1,2]

Input: nums = [0]
Output: [0]
```

---

---

## ✅ Solution: Dutch National Flag Algorithm

```cpp
void sort012(vector<int>& array) {
    int zeroPointer = 0;               // Tracks boundary for 0s
    int onePointer = 0;                // Current element under consideration
    int twoPointer = array.size() - 1; // Tracks boundary for 2s

    // Loop until mid crosses high
    while (onePointer <= twoPointer) {
        if (array[onePointer] == 0) {
            // Place 0s at the beginning
            swap(array[onePointer], array[zeroPointer]);
            zeroPointer++;
            onePointer++;
        } else if (array[onePointer] == 1) {
            // 1s stay in the middle
            onePointer++;
        } else {
            // Place 2s at the end
            swap(array[onePointer], array[twoPointer]);
            twoPointer--;
            // Don't increment onePointer here because the swapped element needs to be checked
        }
    }
}

```

---

## 📝 How It Works

- This is a **three-pointer approach** (also called the **Dutch National Flag Algorithm**).
- The goal is to sort the array with only 0s, 1s, and 2s in one pass (O(n)).
- We divide the array into three parts:
    - From `[0 to zeroPointer - 1]`: All 0s
    - From `[zeroPointer to onePointer - 1]`: All 1s
    - From `[twoPointer + 1 to end]`: All 2s
- Every element is checked only once.

---

## 🧩 Key Insight

- Don’t increment `onePointer` when a 2 is encountered and swapped — the swapped value may not be in the correct position and needs rechecking.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |

---

## ⚠️ Edge Cases

- All elements are already sorted → handled
- All elements are the same (all 0s, all 2s) → handled
- Empty array → no iteration happens
- Array of size 1 → works fine

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Counting Sort | O(n) | O(1) | 2 passes, but fast |
| Dutch Flag (this) | O(n) | O(1) | ✅ Single pass |
| std::sort | O(n log n) | O(1) | ❌ Overkill here |

---

## 🔁 Related Problems

- [Leetcode 75. Sort Colors](https://leetcode.com/problems/sort-colors/)
- [GFG: Sort an array of 0s, 1s and 2s](https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s/0)
- [Partition Array According to Pivot](https://leetcode.com/problems/partition-array-according-to-given-pivot/)