---
title: Allocate Minimum Pages
description: ""
tags:
  - binary-search
  - med
---

### Problem Statement:

Given an array **arr[]** of integers, where each element **arr[i]** represents the number of pages in the i-th book. You also have an integer **k** representing the number of students. The task is to allocate books to each student such that:

- Each student receives atleast one book.
- Each student is assigned a contiguous sequence of books.
- No book is assigned to more than one student.

The objective is to **minimize the maximum number of pages** assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the **smallest possible maximum**.

**Note:** If it is not possible to allocate books to all students, return **-1**.

- Example:
    
    **Examples:**
    
    ```
    Input:arr[] = [12, 34, 67, 90], k = 2
    Output:113
    Explanation:Allocation can be done in following ways:
    => [12] and [34, 67, 90] Maximum Pages = 191
    => [12, 34] and [67, 90] Maximum Pages = 157
    => [12, 34, 67] and [90] Maximum Pages = 113.
    The third combination has the minimum pages assigned to a student which is 113.
    ```
    
    ```
    Input: arr[] = [15, 17, 20], k = 5
    Output:-1
    Explanation:Since there are more students than total books, it's impossible to allocate a book to each student.
    ```
    

---

## Solution: Binary Search on Answer (Book Allocation Problem)

```cpp
class Solution {
  public:
    // Helper function to check if allocation is possible under given limit
    bool check(vector<int> &arr, int students, int pageLimit){
        int studentCount = 1;      // start with first student
        int currentPages = 0;      // pages assigned to current student

        for(int i = 0; i < arr.size(); i++){
            // If adding this book exceeds the limit, assign to next student
            if(currentPages + arr[i] > pageLimit){
                currentPages = arr[i];
                studentCount++;
            }
            else{
                currentPages += arr[i];
            }
        }

        // Return whether we fit in the allowed number of students
        return studentCount <= students;
    }

    int findPages(vector<int> &arr, int k) {
        int n = arr.size();

        // Impossible case: more students than books
        if(k > n) return -1;

        // Search range: from max single book to total sum
        int low = *max_element(arr.begin(), arr.end());
        int high = accumulate(arr.begin(), arr.end(), 0);

        int result = -1;
        while(low <= high){
            int mid = low + (high - low) / 2;  // avoid overflow

            if(check(arr, k, mid)){
                result = mid;        // possible solution
                high = mid - 1;      // try smaller max allocation
            }
            else{
                low = mid + 1;       // need to allow more pages
            }
        }

        return result;
    }
};

```

---

## 📝 How It Works

- Problem: Allocate books to `k` students such that the **maximum number of pages assigned to a student is minimized**.
- Idea: Use **binary search on the answer** (the max pages any student can get).
- Steps:
    1. Lower bound = largest single book (since it must fit).
    2. Upper bound = sum of all pages (one student gets everything).
    3. For each guess (`mid` = page limit), check if we can assign books without exceeding `k` students.
    4. If possible, try smaller limit (move left). If not, move right.

---

## 🧩 Key Formula / Recurrence

- Feasibility check:
    $$
    if required students≤k⇒valid allocation\text{if } \text{required students} \leq k \quad \Rightarrow \quad \text{valid allocation}
    $$
- Search space shrinks using binary search:
    - If valid → high = mid - 1
    - Else → low = mid + 1

---

## ⏱️ Time & Space Complexity

- `check()` runs in **O(n)**.
- Binary search on range `[max(arr), sum(arr)]` → about **O(log(sum))** steps.
- **Total**:
    $$
    O(n⋅log⁡(sum of pages))O(n \cdot \log(\text{sum of pages}))
    $$
    
- Space: **O(1)**.

---

## ⚠️ Edge Cases

- `k > n` → not possible, return -1.
- Only 1 student → must take all pages.
- Only 1 book → answer is its pages.
- Very large page values → use `long long` if needed.

---

## 💡 Other Approaches

1. **Greedy without binary search** ❌ (doesn’t guarantee minimal max).
2. **DP solution** → O(n*k), but slower than binary search approach.
3. **Binary Search on Answer (this)** ✅ most efficient.

---

## 🔁 Related Problems

- Painter’s Partition Problem
- Split Array Largest Sum (LeetCode 410)
- Aggressive Cows (similar binary search feasibility check)

---