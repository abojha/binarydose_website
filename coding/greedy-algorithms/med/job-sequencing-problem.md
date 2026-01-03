---
title: Job Sequencing Problem
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given two arrays: **`deadline[]`,** and **`profit[]`,** which represent a set of jobs, where each job is associated with a **deadline**, and a **profit**. Each job takes 1 unit of time to complete, and only one job can be scheduled at a time. You will earn the profit associated with a job only if it is completed by its deadline.

Your task is to find:

1. The **maximum number of jobs** that can be completed within their deadlines.
2. The **total maximum profit** earned by completing those jobs.
- Example:
    
    ```
    Input: deadline[] = [4, 1, 1, 1], profit[] = [20, 10, 40, 30]
    Output: [2, 60]
    Explanation: Job1 and Job3 can be done with maximum profit of 60 (20+40).
    Input: deadline[] = [2, 1, 2, 1, 1], profit[] = [100, 19, 27, 25, 15]
    Output: [2, 127]
    Explanation: Job1 and Job3 can be done with maximum profit of 127 (100+27).
    Input: deadline[] = [3, 1, 2, 2], profit[] = [50, 10, 20, 30]
    Output: [3, 100]
    Explanation: Job1, Job3 and Job4 can be completed with a maximum profit of 100 (50 + 20 + 30).
    ```
    

---

---

## ✅ Solution: Greedy + Deadline Slotting (Reverse Scheduling)

```cpp
class Solution {
  public:
    vector<int> jobSequencing(vector<int> &deadline, vector<int> &profit) {
        int n = profit.size();
        int max_deadline = *max_element(deadline.begin(), deadline.end());
        vector<int> sch(max_deadline + 1, -1);  // 1-based scheduling

        vector<pair<int, int>> jobs;
        for (int i = 0; i < n; i++) {
            jobs.push_back({profit[i], deadline[i]});
        }

        // Sort jobs by profit in descending order
        sort(jobs.rbegin(), jobs.rend());

        int count = 0, totProfit = 0;

        for (int i = 0; i < n; i++) {
            int currProfit = jobs[i].first;
            int currDeadline = jobs[i].second;

            // Try to find a free slot from current deadline backward
            while (currDeadline > 0 && sch[currDeadline] != -1) {
                currDeadline--;
            }

            if (currDeadline == 0) continue; // No slot available

            sch[currDeadline] = 1;  // Schedule job
            count++;
            totProfit += currProfit;
        }

        return {count, totProfit};
    }
};

```

---

## 📝 How It Works

- You’re given jobs with deadlines and profits.
- Each job takes 1 unit time, and **only one job can be done at a time**.
- Objective: **maximize the number of jobs done and the total profit**.
- Sort all jobs by **profit in descending order**.
- Try placing each job at the **latest possible time slot** before its deadline.
- If a slot is available, mark it and add profit.

---

## 🧩 Key Formula / Greedy Strategy

- **Sort jobs** by `profit` in descending order.
- For each job, **find the latest available slot ≤ deadline**.
    - If found, schedule the job and add profit.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N log N + N * D) |
| Space | O(D) |
- `N`: number of jobs
- `D`: maximum deadline
- `N log N`: sorting jobs
- Worst-case slot search for each job: up to `D` times

> You can optimize time using DSU (Disjoint Set Union) to O(N log N) with path compression.
> 

---

## ⚠️ Edge Cases

- Multiple jobs with the same deadline.
- No job can be scheduled.
- All jobs have deadline > max slots available.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(N) | Try every job in every slot |
| DSU/Union-Find | O(N log N) | O(N) | Optimized slot finding with DSU |

---

## 🔁 Related Problems

- [**GFG: Job Sequencing Problem**](https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620)
- [LC 435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [LC 452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

---