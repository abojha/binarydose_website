---
title: Shortest Job First
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

Geek is a software engineer. He is assigned with the task of calculating **average waiting time** of all the processes by following **shortest job first** policy.

The shortest job first (SJF) or shortest job next, is a scheduling policy that selects the waiting process with the smallest execution time to execute next.

Given an array of integers **bt** of size **n**. Array **bt** denotes the **burst time** of each process. Calculate the **average waiting time** of all the processes and return the nearest integer which is smaller or equal to the output.

**Note:** Consider all process are available at time 0.

- Example:
    
    ```
    Example 1:
    
    Input:
    n = 5
    bt = [4,3,7,1,2]
    Output: 4
    Explanation: After sorting burst times by shortest job policy, calculated average waiting time is 4.
    Example 2:
    
    Input:
    n = 4
    arr = [1,2,3,4]
    Output: 2
    Explanation: After sorting burst times by shortest job policy, calculated average waiting time is 2.
    ```
    

---

---

## ✅ Solution: Greedy (Shortest Job First)

```cpp
class Solution {
  public:
    long long solve(vector<int>& bt) {
        // Sort the burst times in increasing order
        sort(bt.begin(), bt.end());

        int wait = 0; // Total waiting time
        int tot = 0;  // Cumulative burst time

        for(int i = 0; i < bt.size(); i++){
            wait += tot;     // Add current waiting time to total
            tot += bt[i];    // Update cumulative burst time
        }

        return wait / bt.size(); // Return average waiting time
    }
};

```

---

## 📝 How It Works

- The idea is to **minimize average waiting time** using **Shortest Job First (SJF)** strategy.
- Sort all jobs based on their burst time.
- First process the shortest job, then the next shortest, and so on.
- Use a running total to track **waiting time** of each process.

---

## 🧩 Key Formula

- `wait[i] = burst[0] + burst[1] + ... + burst[i-1]`
- `Average Waiting Time = Total Waiting Time / Number of Processes`

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- Only 1 process → Waiting time = 0.
- All burst times are equal → Linear processing.
- Already sorted burst time → No impact from sorting.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| FCFS (No Sort) | O(N) | O(1) | Worse avg. waiting time |
| SJF (Greedy) | O(N log N) | O(1) | Best for minimizing wait ✅ |

---

## 🔁 Related Problems

- CPU Scheduling (OS Concept)
- Turnaround Time = Waiting Time + Burst Time
- LC 621. [Task Scheduler](https://leetcode.com/problems/task-scheduler/)

---