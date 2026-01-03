---
title: Max Consecutive Ones
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given a binary array `nums`, return *the maximum number of consecutive* `1`*'s in the array*.

```
Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2
```

---

---

### ✅ Solution: Linear Scan

```cpp
int findMaxConsecutiveOnes(vector<int>& binaryArray) {
    int maxConsecutiveOnes = 0;      // Stores the maximum count of consecutive 1s
    int currentCount = 0;            // Tracks the current streak of 1s

    for (int i = 0; i < binaryArray.size(); i++) {
        if (binaryArray[i] == 1) {
            currentCount++;          // Extend the streak when we find a 1
        } else {
            // Update the max if current streak ends
            maxConsecutiveOnes = max(maxConsecutiveOnes, currentCount);
            currentCount = 0;        // Reset the streak
        }
    }

    // Final check in case the array ends with a streak of 1s
    maxConsecutiveOnes = max(maxConsecutiveOnes, currentCount);

    return maxConsecutiveOnes;
}

```

---

## 📝 How It Works

- You scan the array once, keeping a **running count** of consecutive 1s.
- Each time you see a `1`, you increment `currentCount`.
- If you see a `0`, you:
    - Compare `currentCount` with `maxConsecutiveOnes` and update it if needed.
    - Reset `currentCount` to 0.
- After the loop ends, you again update `maxConsecutiveOnes` to handle the case where the array ends with 1s.

---

## 🧩 Key Logic

There’s no recurrence here — it’s a simple one-pass comparison-based logic:

```
maxConsecutiveOnes = max(maxConsecutiveOnes, currentCount)

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) |
- Single pass through the array.
- Only two integer variables used.

---

## ⚠️ Edge Cases

- All elements are `1` → final max is updated at the end.
- All elements are `0` → `maxConsecutiveOnes` remains 0.
- Single element → works correctly for both `0` and `1`.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Linear Scan (this) | O(n) | O(1) | ✅ Most efficient |
| Segment Tree | O(log n) | O(n) | ❌ Overkill |
| Sliding Window (Fixed Size) | Not applicable here | – | ❌ Only works for fixed-length windows |

---

## 🔁 Related Problems

- [Max Consecutive Ones III (LC 1004)](https://leetcode.com/problems/max-consecutive-ones-iii/)
- [Max Consecutive Ones II (LC 487)](https://leetcode.com/problems/max-consecutive-ones-ii/)
- [Longest Subarray of 1's After Deleting One Element (LC 1493)](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)