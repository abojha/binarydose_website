---
title: Minimum Number of Platforms by Railway
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given the arrival times **arr[]** and departure times **dep[]** of all trains that arrive at a railway station on the same day. Your task is to determine the minimum number of platforms required at the station to ensure that no train is kept waiting.

At any given time, the same platform cannot be used for both the arrival of one train and the departure of another. Therefore, when two trains arrive at the same time, or when one arrives before another departs, additional platforms are required to accommodate both trains.

- Example:
    
    ```
    Input: arr[] = [900, 940, 950, 1100, 1500, 1800], dep[] = [910, 1200, 1120, 1130, 1900, 2000]
    Output: 3
    Explanation: There are three trains during the time 9:40 to 12:00. So we need a minimum of 3 platforms.
    Input: arr[] = [900, 1235, 1100], dep[] = [1000, 1240, 1200]
    Output: 1
    Explanation: All train times are mutually exclusive. So we need only one platform
    Input: arr[] = [1000, 935, 1100], dep[] = [1200, 1240, 1130]
    Output: 3
    Explanation: All 3 trains have to be there from 11:00 to 11:30
    ```
    

---

---

## ✅ **Solution: Two-Pointer + Greedy (Sort Start & End Times)**

```cpp
class Solution {
  public:
    int findPlatform(vector<int>& arrival, vector<int>& departure) {
        // Sort both arrays
        sort(arrival.begin(), arrival.end());
        sort(departure.begin(), departure.end());

        int platformNeeded = 1; // Current platforms needed
        int maxPlatforms = 1;   // Overall max platforms required

        int arrivalIndex = 1, departureIndex = 0;
        int totalTrains = arrival.size();

        while (arrivalIndex < totalTrains && departureIndex < totalTrains) {
            // If next train arrives before or when another departs => need more platforms
            if (arrival[arrivalIndex] <= departure[departureIndex]) {
                platformNeeded++;
                arrivalIndex++;
            } else {
                // A train departed, reduce platform count
                platformNeeded--;
                departureIndex++;
            }
            maxPlatforms = max(maxPlatforms, platformNeeded);
        }

        return maxPlatforms;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- Trains arrive and depart at different times.
- The goal is to find the **minimum number of platforms** needed so that no train waits.
- Sort both arrival and departure times.
- Use two pointers:
    - One iterates over `arrival`, the other over `departure`.
    - If the next train arrives before the earliest departing train → increase platform count.
    - Otherwise, a platform frees up → decrease count.
- Keep updating the max number of platforms required at any point.

---

### 🧩 Key Logic

- Sort `arrival[]` and `departure[]`.
- Use two pointers `i` and `j`:
    
    ```cpp
    if(arrival[i] <= departure[j])
        platformCount++, i++;
    else
        platformCount--, j++;
    maxPlatforms = max(maxPlatforms, platformCount);
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N log N) |
| Space | O(1) |

> Sorting dominates the complexity.
> 

---

### ⚠️ Edge Cases

- All trains arrive at the same time → requires `N` platforms.
- No overlapping trains → only 1 platform needed.
- Random unsorted input → sorting helps simulate the timeline.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(1) | Check overlap for each pair |
| Heap-based Track | O(N log N) | O(N) | Track platform availability |

---

### 🔁 Related Problems

- [**LC 253. Meeting Rooms II**](https://leetcode.com/problems/meeting-rooms-ii/)
- [**LC 56. Merge Intervals**](https://leetcode.com/problems/merge-intervals/)
- [**LC 759. Employee Free Time**](https://leetcode.com/problems/employee-free-time/)

---