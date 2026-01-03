---
title: Non-Overlapping Intervals
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return *the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping*.

**Note** that intervals which only touch at a point are **non-overlapping**. For example, `[1, 2]` and `[2, 3]` are non-overlapping.

- Example:
    
    ```
    Example 1:
    
    Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
    Output: 1
    Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
    Example 2:
    
    Input: intervals = [[1,2],[1,2],[1,2]]
    Output: 2
    Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
    Example 3:
    
    Input: intervals = [[1,2],[2,3]]
    Output: 0
    Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
    ```
    

---

---

## ✅ Solution: Greedy (Sorted by End Time)

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();

        // Sort intervals by their end time (non-decreasing)
        sort(intervals.begin(), intervals.end(), [](vector<int> &a, vector<int> &b){
            return a[1] < b[1];
        });

        int count = 0;
        int prevEnd = intervals[0][1]; // Track end of last non-overlapping interval

        for(int i = 1; i < n; i++){
            if(intervals[i][0] < prevEnd){
                // Overlap found, need to remove one
                count++;
            } else {
                // No overlap, update end
                prevEnd = intervals[i][1];
            }
        }

        return count;
    }
};

```

---

## 📝 How It Works

- The idea is to **keep as many non-overlapping intervals as possible**.
- We first **sort by the end time**, which ensures we always try to keep the interval that finishes the earliest.
- Traverse the sorted intervals:
    - If the current interval starts **before** the previous one ends → overlap → increment `count`.
    - Else, update `prevEnd` to current's end time.

---

## 🧩 Key Formula / Strategy

- **Sort by end time**.
- If `interval[i].start < prevEnd`, it's overlapping → remove.
- Else → update `prevEnd = interval[i].end`.

---

## ⏱️ Time & Space Complexity

| Aspect | Value |
| --- | --- |
| Time | O(N log N) |
| Space | O(1) (in-place sorting) |

---

## ⚠️ Edge Cases

- Only 1 interval → return 0.
- All intervals overlap → remove all but one.
- Intervals already non-overlapping → return 0.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(1) | Check all pairs for overlap |
| Greedy (this) | ✅ O(N log N) | O(1) | Optimal & clean |

---

## 🔁 Related Problems

- [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)

---