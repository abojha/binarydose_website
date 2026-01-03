---
title: Task Scheduler
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

You are given an array of CPU `tasks`, each labeled with a letter from A to Z, and a number `n`. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of **at least** `n` intervals between two tasks with the same label.

Return the **minimum** number of CPU intervals required to complete all tasks.

- Example:
    
    ```
    Example 1:
    
    Input: tasks = ["A","A","A","B","B","B"], n = 2
    
    Output: 8
    
    Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
    
    After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.
    
    Example 2:
    
    Input: tasks = ["A","C","A","B","D","B"], n = 1
    
    Output: 6
    
    Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
    
    With a cooling interval of 1, you can repeat a task after just one other task.
    
    Example 3:
    
    Input: tasks = ["A","A","A", "B","B","B"], n = 3
    
    Output: 10
    
    Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
    
    There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.
    ```
    

---

## ✅ Solution: Task Scheduler Using Max Heap + Greedy

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char, int> freqMap;

        // Step 1: Count frequency of each task
        for (auto task : tasks) {
            freqMap[task]++;
        }

        // Step 2: Push all frequencies into max heap
        priority_queue<int> maxHeap;
        for (auto it : freqMap) {
            maxHeap.push(it.second);
        }

        int totalTime = 0;

        // Step 3: Process tasks in cycles of size n + 1
        while (!maxHeap.empty()) {
            int time = 0;
            vector<int> temp;

            for (int i = 0; i <= n; i++) {
                if (!maxHeap.empty()) {
                    temp.push_back(maxHeap.top() - 1); // Decrement task count
                    maxHeap.pop();
                    time++;
                }
            }

            // Step 4: Push back remaining tasks
            for (auto count : temp) {
                if (count > 0) maxHeap.push(count);
            }

            totalTime += maxHeap.empty() ? time : n + 1;
        }

        return totalTime;
    }
};

```

---

## ✅ Structured Revision Notes

---

## 📝 **How It Works**

- **Problem:** Schedule tasks with cooling period `n` between two same tasks to minimize total time.
- **Greedy Approach with Max Heap:**
    1. Count frequency of each task.
    2. Use max heap to always pick the most frequent task first.
    3. In each cycle of size `n + 1`:
        - Pick up to `n + 1` tasks, process them, decrement their count.
        - If any tasks still have remaining count, push them back.
    4. Add total time including idle slots if needed.
- **Why `n + 1` cycle?**
    - One task uses a spot, followed by `n` cooldowns before repeating the same task.

---

## 🧩 **Key Formula / Recurrence**

- Cycle length = `n + 1`
- Total time = Number of full cycles + Remaining tasks.

---

## ⏱️ **Time & Space Complexity**

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) |
- N = number of tasks.
- Heap operations take log N time per push/pop.

---

## ⚠️ **Edge Cases**

- `n = 0` → No cooldown required. Total time = number of tasks.
- All tasks same → Maximum idle times.
- All tasks unique → No idle time even with `n > 0`.

---

## 💡 **Other Approaches**

| Approach | Time Complexity |
| --- | --- |
| Sorting + Math Formula | O(N) |
| Max Heap (this method) | O(N log N) |
- Math formula approach available if exact counts are needed in constant time using max frequency.

---

## 🔁 **Related Problems**

- LeetCode 621: Task Scheduler
- LeetCode 134: Gas Station (Greedy/Simulation pattern)
- LeetCode 621 + 621 follow-up versions with extra constraints