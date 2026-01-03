---
title: Merge two Sorted Arrays Without Extra Space
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

 ****Given two sorted arrays **arr1[]** and **arr2[]** of ****sizes **n** and **m** in non-decreasing order. Merge them in sorted order. Modify arr1 so that it contains the first N elements and modify arr2 so that it contains the last M elements

- Example:
    
    ```
    Example 1:
    
    Input: 
    n = 4, arr1[] = [1 4 8 10] 
    m = 5, arr2[] = [2 3 9]
    
    Output: 
    arr1[] = [1 2 3 4]
    arr2[] = [8 9 10]
    
    Explanation:
    After merging the two non-decreasing arrays, we get, 1,2,3,4,8,9,10.
    
    Example2:
    
    Input: 
    n = 4, arr1[] = [1 3 5 7] 
    m = 5, arr2[] = [0 2 6 8 9]
    
    Output: 
    arr1[] = [0 1 2 3]
    arr2[] = [5 6 7 8 9]
    
    Explanation:
    After merging the two non-decreasing arrays, we get, 0 1 2 3 5 6 7 8 9.
    ```
    
    ---
    

---

### Solution:

```cpp
void mergeArrays(vector<int>& a, vector<int>& b) {
    int n = a.size(), m = b.size();
    int left = n - 1, right = 0;

    // Swap out-of-place elements from end of 'a' and start of 'b'
    while (left >= 0 && right < m) {
        if (a[left] > b[right]) {
            swap(a[left], b[right]);
            left--;
            right++;
        } else {
            break;
        }
    }

    // Sort both arrays individually
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
}

```

---

### ✅ **Concept**

- Merge two sorted arrays `a[]` and `b[]` without using extra space.
- Compare last elements of `a` and first elements of `b`. Swap if needed.
- Finally, sort both arrays individually.

---

### 📌 **Why it works**

- After swapping large elements of `a` with small ones of `b`, both arrays become closer to sorted order.
- Final sort puts them into completely sorted state.

---

### 🧮 **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n log n + m log m) due to sorting |
| Space | O(1) |

---

### ⚠️ **Edge Cases**

- One array is fully smaller/larger than the other (no swaps needed).
- Arrays already in combined sorted order.

---

### 🛠️ Other Approaches

| Approach | Time | Space | Note |
| --- | --- | --- | --- |
| **Gap method** | O((n+m) log(n+m)) | O(1) | Optimal without sorting individually |
| Brute force + sort | O((n+m) log(n+m)) | O(n+m) | Merges into one array |
| Merge + Shift | O(n×m) | O(1) | Inefficient for large arrays |

### 🔁 Related Problems

| Problem Name | Concept Tested |
| --- | --- |
| **Merge Two Sorted Arrays (with extra space)** | Classic merge approach (O(n+m), O(n+m)) |
| **Merge Intervals** | Interval overlap logic |
| **Median of Two Sorted Arrays** | Binary search + partitioning |
| **In-place merge sort** | Recursion + merge strategy |
| **Next Permutation** | Swap + sort trick (like post-merge sort) |
| **Dutch National Flag Problem** | Partition-based element swaps |