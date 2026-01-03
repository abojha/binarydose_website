---
title: Merge Intervals
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array of intervals, merge all the overlapping intervals and return an array of non-overlapping intervals.

- Example:
    
    ```
    Example 1: 
    
    Input: intervals=[[1,3],[2,6],[8,10],[15,18]]
    
    Output: [[1,6],[8,10],[15,18]]
    
    Explanation: Since intervals [1,3] and [2,6] are overlapping we can merge them to form [1,6]
     intervals.
    
    Example 2:
    
    Input: [[1,4],[4,5]]
    
    Output: [[1,5]]
    
    Explanation: Since intervals [1,4] and [4,5] are overlapping we can merge them to form [1,5].
    ```
    

---

---

## ✅ Solution: Merge Overlapping Intervals (Greedy + Sorting)

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Step 1: Sort intervals based on start time
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> merged;
    merged.push_back(intervals[0]);  // Start with the first interval

    for (int i = 1; i < intervals.size(); i++) {
        // If current interval overlaps with the last one in merged
        if (merged.back()[1] >= intervals[i][0]) {
            // Merge by updating the end time
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            // No overlap, push the current interval
            merged.push_back(intervals[i]);
        }
    }

    return merged;
}

```

---

### 📝 How It Works

1. **Sort** the intervals by their start time.
2. Initialize the result with the **first interval**.
3. Loop through the remaining intervals:
    - If the current interval **overlaps** with the last merged one, **merge** them by updating the end time.
    - If not, **add it as a new interval** to the result.

This works because the intervals are sorted — ensuring that overlapping intervals come consecutively.

---

### 🧩 Key Logic

If two intervals `A = [a1, a2]` and `B = [b1, b2]` **overlap**, then:

a2≥b1a2 \geq b1

→ Merge them as:

[a1,max⁡(a2,b2)][a1, \max(a2, b2)]

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) |
- Sorting takes `O(N log N)`.
- One pass to merge = O(N).
- Space is O(N) for the result (not counting input).

---

### ⚠️ Edge Cases

- Empty list of intervals.
- Nested intervals, e.g., `[[1,10], [2,3]]` should merge to `[1,10]`.
- Already merged input (no changes expected).

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(N) | Compare each with all others |
| Greedy + Sort ✅ | O(N log N) | O(N) | Efficient and clean |

---

### 🔁 Related Problems

- [LC 56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [LC 57. Insert Interval](https://leetcode.com/problems/insert-interval/)
- [LC 252. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [LC 253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [LC 435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

---

### 🛠️ Other Notes

- This pattern is useful in **scheduling**, **calendar merging**, or **CPU job allocation**.
- Real-world analogy: Merging overlapping meeting times on a shared calendar.
- If you need to return non-overlapping intervals after merging → this is the go-to approach.