---
title: Course Schedule-I
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

Return `true` if you can finish all courses. Otherwise, return `false`.

- Example:
    
    ```
    Example 1:
    
    Input: numCourses = 2, prerequisites = [[1,0]]
    Output: true
    Explanation: There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0. So it is possible.
    Example 2:
    
    Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
    Output: false
    Explanation: There are a total of 2 courses to take. 
    To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
    ```
    

---

## ✅ Solution: Kahn's Algorithm (BFS + In-Degree) — Course Schedule (Can Finish All Courses?)

---

### ✅ Solution Code:

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
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

        int completedCourses = 0;
        while (!readyCourses.empty()) {
            int current = readyCourses.front();
            readyCourses.pop();
            completedCourses++;

            for (auto next : courseGraph[current]) {
                if (--inDegree[next] == 0) {
                    readyCourses.push(next);
                }
            }
        }

        return completedCourses == numCourses;
    }
};

```

---

## 📝 How It Works

- Treat each course as a node in a **Directed Graph**.
- An edge from `B → A` means: `B` must be taken before `A`.
- Use **Kahn’s Algorithm** (BFS + In-Degree Count):
    1. Calculate the in-degree (number of prerequisites) for each course.
    2. Push all courses with in-degree 0 into a queue (can be taken immediately).
    3. Process the queue:
        - Remove one course.
        - Reduce the in-degree of its dependent courses.
        - If a dependent course's in-degree becomes 0, add it to the queue.
    4. If all courses can be taken (`completedCourses == numCourses`), return true.

---

## 🧩 Key Formula / Recurrence

- **In-degree rule:**
    
    ```
    inDegree[course]++
    
    ```
    
- **BFS processing logic:**
    
    ```
    while (!q.empty()):
        course = q.front();
        for (next : courseGraph[course]):
            inDegree[next]--;
            if (inDegree[next] == 0):
                q.push(next);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Kahn’s Algorithm | O(V + E) | O(V + E) |
- V = number of courses (nodes).
- E = number of prerequisites (edges).

---

## ⚠️ Edge Cases

- `numCourses = 0` → Should return true.
- No prerequisites → Can take all courses.
- Cycle in graph → Must return false.
- Single course pointing to itself → Self-loop cycle.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS + Recursion Stack | O(V + E) | Uses cycle detection via DFS. |

---

## 🔁 Related Problems

- LeetCode 207: Course Schedule (Exact Problem)
- LeetCode 210: Course Schedule II (Topological Order)
- LeetCode 133: Clone Graph (Graph traversal concepts)
- LeetCode 785: Is Graph Bipartite?

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Building a course planner where some courses depend on others.
    
- ✅ Kahn’s Algorithm is preferred for topological sorting when BFS is easier to reason about than DFS.
- ✅ This is a textbook **graph + cycle detection** problem in placement and coding interviews.
    
    Mastering both Kahn’s Algorithm and DFS cycle detection for this type of question is highly recommended.
    

---