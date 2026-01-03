---
title: Course Schedule-II
description: ""
tags:
  - graphs
  - hard
  - sort
  - topo
---

### Problem Statement:

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return *the ordering of courses you should take to finish all courses*. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.

- Example:
    
    ```
    Example 1:
    
    Input: numCourses = 2, prerequisites = [[1,0]]
    Output: [0,1]
    Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
    Example 2:
    
    Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
    Output: [0,2,1,3]
    Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
    So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
    Example 3:
    
    Input: numCourses = 1, prerequisites = []
    Output: [0]
    ```
    

---

## ✅ Solution: Kahn's Algorithm (BFS) — Course Schedule II (Find Valid Course Order)

---

### ✅ Solution Code:

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> courseGraph(numCourses);
        vector<int> inDegree(numCourses, 0);

        // Build graph and count in-degrees
        for (auto &pair : prerequisites) {
            int course = pair[0];
            int prerequisite = pair[1];
            courseGraph[prerequisite].push_back(course);
            inDegree[course]++;
        }

        queue<int> readyCourses;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                readyCourses.push(i);
            }
        }

        vector<int> courseList;
        int completedCourses = 0;

        while (!readyCourses.empty()) {
            int current = readyCourses.front();
            readyCourses.pop();
            courseList.push_back(current);
            completedCourses++;

            for (auto next : courseGraph[current]) {
                if (--inDegree[next] == 0) {
                    readyCourses.push(next);
                }
            }
        }

        return (completedCourses == numCourses) ? courseList : vector<int>();
    }
};

```

---

## 📝 How It Works

- **Objective:**
    
    Find a valid order to complete all courses given prerequisite constraints.
    
- **Technique:**
    
    Use **Kahn’s Algorithm (BFS)** to perform topological sorting.
    
- **Step-by-Step:**
    1. Build adjacency list from prerequisites.
    2. Calculate in-degree for each course.
    3. Push all courses with in-degree 0 into a queue.
    4. Process the queue, building `courseList` as you remove courses.
    5. If all courses are included in `courseList`, return it. Otherwise, return an empty list (cycle detected).

---

## 🧩 Key Formula / Recurrence

- In-degree calculation:
    
    ```
    for each [course, prerequisite] in prerequisites:
        courseGraph[prerequisite].push_back(course);
        inDegree[course]++;
    
    ```
    
- BFS loop:
    
    ```
    while (!readyCourses.empty()):
        current = readyCourses.front();
        for (next : courseGraph[current]):
            if (--inDegree[next] == 0):
                readyCourses.push(next);
    
    ```
    
- Final check:
    
    ```
    if (completedCourses == numCourses):
        return courseList;
    else:
        return empty list;
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |

Where:

- V = number of courses (nodes).
- E = number of prerequisite pairs (edges).

---

## ⚠️ Edge Cases

- `numCourses = 0` → Should return empty list.
- No prerequisites → Return any order (can be `[0, 1, ..., numCourses-1]`).
- Cycle exists → Must return empty list.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS + Recursion Stack | O(V + E) | Also returns topological order if no cycle. |

---

## 🔁 Related Problems

- LeetCode 210: Course Schedule II (Exact Problem)
- LeetCode 207: Course Schedule
- LeetCode 133: Clone Graph
- LeetCode 785: Is Graph Bipartite?

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Building a semester-wise course plan with prerequisites.
    
- ✅ BFS Topological Sort is preferred when you want **a valid order** explicitly (not just a yes/no cycle check).
- ✅ Kahn’s Algorithm ensures that if a valid topological ordering exists, it finds it reliably without recursion.