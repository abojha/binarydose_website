---
title: Placements of Students
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - med
---

### Problem Statement:

The coordinator of the placement cell has received many applications of students applying in different companies. There are M students and N companies who are offering jobs. Each student is interested in a particular number of companies for a job. Each job opening can only accept one student and a student can only have 1 job. As a placement coordinator, you want to place a maximum number of students.

Your task is to find the maximum number of students that can be placed in one of their desired jobs

The data about the set of favourable jobs are given in the form of an M * N binary matrix named ‘mat’, i.e for M students we have M rows each having N integers. Now for example if the first candidate is interested in job1 the value of mat[i][j] will be 1 otherwise it will be 0.

**Note:**

```
It is possible that a single candidate is interested in multiple jobs but he can take up only one of the job out of his favourable jobs, also there is no priority in jobs, i.e all favourable jobs are equally favourable to the candidate
```

- Example:

---

## Solution: Bipartite Matching using DFS (Hungarian / Kuhn’s Algorithm)

```cpp
#include <bits/stdc++.h>
using namespace std;

// Try to assign student u to a company using DFS
bool solve(int student, vector<vector<int>> &mat, vector<int> &visitedCompany, vector<int> &companyTakenStudent){
    int m = mat[0].size();

    for(int company = 0; company < m; company++){
        // If student is interested in this company and company not visited yet in this DFS
        if(mat[student][company] && !visitedCompany[company]){
            visitedCompany[company] = 1;

            // If company is free OR previously assigned student can be shifted elsewhere
            if(companyTakenStudent[company] < 0 || solve(companyTakenStudent[company], mat, visitedCompany, companyTakenStudent)){
                companyTakenStudent[company] = student;  // Assign student to this company
                return true;
            }
        }
    }
    return false;
}

int maxMatch(vector<vector<int>> &mat){
    int n = mat.size();     // number of students
    int m = mat[0].size();  // number of companies

    vector<int> companyTakenStudent(m, -1); // which student is assigned to company
    int result = 0;

    // Try to assign each student to some company
    for(int student = 0; student < n; student++){
        vector<int> visitedCompany(m, 0);
        if(solve(student, mat, visitedCompany, companyTakenStudent)){
            result++; // found a matching
        }
    }

    return result;
}

```

---

## 📝 How It Works

- This is a **Bipartite Matching problem**: students on one side, companies on the other.
- Each edge `mat[student][company] = 1` means the student is interested in that company.
- We use **DFS (Kuhn’s algorithm)** to assign each student:
    1. Try to place the student in one of their desired companies.
    2. If the company is free, assign it.
    3. If not free, recursively check if the already assigned student can be shifted to another company.
    4. If shifting is possible, assign the current student.
- Repeat for all students and count how many get placed.

---

## 🧩 Key Formula / Recurrence

- Recursive matching condition:
    
    ```
    if companyTakenStudent[v] == -1
       OR solve(companyTakenStudent[v], ...)
    
    ```
    
    → allows "augmenting path" adjustment so maximum matching is found.
    

---

## ⏱️ Time & Space Complexity

- **Time Complexity**:
    - Each student attempts DFS on up to `M` companies.
    - Worst case: `O(N * M)` (N students × M companies).
- **Space Complexity**:
    - `O(M)` for visited companies in each DFS.
    - `O(M)` for company assignments.
    - Overall `O(M)`.

---

## ⚠️ Edge Cases

- No student has interest in any company → result = 0.
- More students than companies → maximum = number of companies.
- More companies than students → maximum = number of students.
- Duplicate preferences (many students interested in the same company) handled via augmenting path shifting.

---

## 💡 Other Approaches

1. **Hopcroft–Karp Algorithm** → `O(E * sqrt(V))` (faster for very large graphs).
2. **Network Flow (Ford–Fulkerson / Edmonds–Karp)** → Convert bipartite matching into max flow problem.
3. **Greedy** → Assign sequentially, but may fail for optimal matching.

---

## 🔁 Related Problems

- [LeetCode 1349: Maximum Students Taking Exam] (similar matching logic)
- [GFG: Maximum Bipartite Matching]
- [LeetCode 861: Student Attendance Record II] (different DP flavor but related to allocation constraints)

---