---
title: Insert Interval
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` *after the insertion*.

**Note** that you don't need to modify `intervals` in-place. You can make a new array and return it.

- Example:
    
    ```
    Example 1:
    
    Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
    Output: [[1,5],[6,9]]
    Example 2:
    
    Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
    Output: [[1,2],[3,10],[12,16]]
    Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
    ```
    

---

---

## ✅ Solution: Merge Intervals (Greedy)

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int n = intervals.size();
        int i = 0;

        // Step 1: Add all intervals ending before newInterval starts
        while(i < n && intervals[i][1] < newInterval[0]){
            result.push_back(intervals[i]);
            i++;
        }

        // Step 2: Merge overlapping intervals with newInterval
        while(i < n && intervals[i][0] <= newInterval[1]){
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval); // Add the merged interval

        // Step 3: Add remaining intervals
        while(i < n){
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};

```

---

## 📝 How It Works

- Iterate through the given intervals:
    1. **Add all non-overlapping intervals before** `newInterval`.
    2. **Merge overlapping intervals** by updating the bounds of `newInterval`.
    3. Add `newInterval` after merging.
    4. Append **remaining intervals** as they are.
- The result is a new list of merged, non-overlapping intervals sorted by start time.

---

## 🧩 Key Logic

- If `interval[i][1] < newInterval[0]`, interval is completely before → keep as is.
- If `interval[i][0] <= newInterval[1]`, merge using:
    - `newInterval[0] = min(newInterval[0], interval[i][0])`
    - `newInterval[1] = max(newInterval[1], interval[i][1])`

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(N) (output) |

---

## ⚠️ Edge Cases

- `intervals` is empty.
- `newInterval` doesn’t overlap with any interval.
- `newInterval` overlaps all intervals.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force + Sort + Merge | O(N log N) | O(N) | Not optimal for sorted input |

---

## 🔁 Related Problems

- Leetcode 56: Merge Intervals
- Leetcode 986: Interval List Intersections
- Leetcode 252: Meeting Rooms

---