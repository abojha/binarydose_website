---
title: N Meetings in One Room
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given timings of **n** meetings in the form of **(start[i], end[i])** where start[i] ****is the start time of meeting **i** and end[i] ****is the finish time of meeting **i.** Return the **maximum** number of meetings that can be accommodated in a single meeting room, when only one meeting can be held in the meeting room at a particular time.

**Note:** The start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

- Example:
    
    ```
    Input: start[] = [1, 3, 0, 5, 8, 5], end[] =  [2, 4, 6, 7, 9, 9]
    Output: 4
    Explanation: Maximum four meetings can be held with given start and end timings. The meetings are - (1, 2), (3, 4), (5,7) and (8,9)
    Input: start[] = [10, 12, 20], end[] = [20, 25, 30]
    Output: 1
    Explanation: Only one meetings can be held with given start and end timings.
    Input: start[] = [1, 2], end[] = [100, 99]
    Output: 1
    ```
    

---

---

## ✅ **Solution: Greedy + Custom Comparator**

```cpp
class Solution {
  public:
    // Comparator function to sort meetings by end time
    static bool comp(const pair<int, int> &a, const pair<int, int> &b){
        return a.second < b.second;
    }

    int maxMeetings(vector<int>& start, vector<int>& end) {
        vector<pair<int, int>> meetSch;
        int n = start.size();

        // Pair each meeting's start and end time
        for(int i = 0; i < n; i++){
            meetSch.push_back({start[i], end[i]});
        }

        // Sort meetings based on end time
        sort(meetSch.begin(), meetSch.end(), comp);

        int count = 1;
        int limit = meetSch[0].second;

        // Pick non-overlapping meetings greedily
        for(int i = 1; i < n; i++){
            if(meetSch[i].first > limit){
                count++;
                limit = meetSch[i].second;
            }
        }

        return count;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- We’re given start and end times of meetings.
- The goal is to **select the maximum number of non-overlapping meetings**.
- We pair each meeting’s start and end time, and **sort by end time**.
- We then **greedily pick the next meeting** whose start time is **after the last selected meeting's end time**.

---

### 🧩 Key Formula / Logic

- **Sort meetings by end time.**
- Always pick the earliest-ending meeting that doesn’t overlap.
- Use:
    
    ```cpp
    if(meeting[i].start > last_meeting_end)
        select it;
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N log N) – for sorting |
| Space | O(N) – for storing pairs |

---

### ⚠️ Edge Cases

- Only 1 meeting → return 1.
- All meetings overlap → only 1 can be chosen.
- All meetings non-overlapping → all can be selected.

---

### 💡 Other Approaches

| Approach | Time | Space | Remarks |
| --- | --- | --- | --- |
| Brute Force | Exponential | O(1) | Try all subsets ❌ |
| Greedy + Sorting | O(N log N) | O(N) | Optimal ✅ |

---

### 🔁 Related Problems

- **N Meeting in One Room** – GFG
- **Interval Scheduling Maximum Subset** – Standard Greedy
- [LC 452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)
- [LC 56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)

---