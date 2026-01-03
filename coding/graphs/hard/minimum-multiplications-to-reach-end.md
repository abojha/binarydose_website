---
title: Minimum Multiplications to reach End
description: ""
tags:
  - graphs
  - hard
  - path
  - shortest
---

### Problem Statement:

Given **start**, **end** and an array **arr** of **n** numbers. At each step, **start** is multiplied with any number in the array and then mod operation with **100000** is done to get the new start.

Your task is to find the minimum steps in which **end** can be achieved starting from **start**. If it is not possible to reach **end**, then return **-1**.

- Example:
    
    **Example 1:**
    
    ```
    Input:
    arr[] = {2, 5, 7}
    start = 3, end = 30
    Output:
    2
    Explanation:
    Step 1: 3*2 = 6 % 100000 = 6
    Step 2: 6*5 = 30 % 100000 = 30
    
    ```
    
    **Example 2:**
    
    ```
    Input:
    arr[] = {3, 4, 65}
    start = 7, end = 66175
    Output:
    4
    Explanation:
    Step 1: 7*3 = 21 % 100000 = 21
    Step 2: 21*3 = 63 % 100000 = 63
    Step 3: 63*65 = 4095 % 100000 = 4095
    Step 4: 4095*65 = 266175 % 100000 = 66175
    ```
    

---

---

## ✅ Solution: BFS + Modulo (Shortest Path in Number Space)

```cpp
class Solution {
  public:
    int minimumMultiplications(vector<int>& arr, int start, int end) {
        queue<pair<int, int>> q;  // {steps, number}
        q.push({0, start});

        vector<int> dist(100000, 1e9);  // Distance array for all numbers modulo 100000
        dist[start] = 0;

        while (!q.empty()) {
            auto it = q.front();
            q.pop();

            int steps = it.first;
            int curr = it.second;

            // Found the target number
            if (curr == end) return steps;

            // Try all multiplications with numbers in arr
            for (int num : arr) {
                int next = (curr * num) % 100000;
                if (steps + 1 < dist[next]) {
                    dist[next] = steps + 1;
                    q.push({steps + 1, next});
                }
            }
        }

        // If end is unreachable
        return -1;
    }
};

```

---

### 📝 How It Works

- Treat each number as a **node**, and a multiplication as a **step to a new node**.
- Use **BFS** to find the **minimum steps (edges)** required to go from `start` to `end` using multiplications from `arr`.
- Since the numbers can grow large, we **mod by 100000** to cap the search space.
- Keep track of the shortest distance to each number using a `dist` array of size `100000`.

---

### 🧩 Key Formula / Transition

- From current `x`, generate next states as:
    $$
    \text{next} = (x \times arr[i]) \mod 100000
    $$
- Transition allowed if `dist[next] > dist+ 1`

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(100000 × A) |
| Space | O(100000) |
- BFS explores each number (mod 100000) at most once.
- `A = size of arr`, used in inner loop.

---

### ⚠️ Edge Cases

- `start == end` → return `0`.
- Element in `arr` is `0` → only reaches `0`, may block search.
- `end` unreachable → return `1`.

---

### 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| BFS ✅ | O(N × A) | Fastest for uniform cost |
| Dijkstra (Heap) | O(N log N) | Overkill for unit weights |

---

### 🔁 Related Problems

- [GFG: Minimum Multiplications to Reach End](https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1)
- [LC 752. Open the Lock](https://leetcode.com/problems/open-the-lock/)
- [LC 127. Word Ladder](https://leetcode.com/problems/word-ladder/)
- Shortest path in modular graphs

---

### 🛠️ Other Notes

- This is a **shortest path in modular arithmetic** space.
- Real-world analogy: **reaching a combination lock code** via repeated multiplications.
- BFS works perfectly as **each operation has unit cost**.