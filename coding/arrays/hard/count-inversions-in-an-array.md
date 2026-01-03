---
title: Count inversions in an array
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

Given an array of N integers, count the inversion of the array (using [merge-sort](https://takeuforward.org/data-structure/merge-sort-algorithm/)).

What is an inversion of an array? Definition: for all i & j < size of array, if i < j then you have to find pair (A[i],A[j]) such that A[j] < A[i].

- Example:
    
    ```
    Example 1:
    Input Format: N = 5, array[] = {1,2,3,4,5}
    Result: 0
    Explanation: we have a sorted array and the sorted array has 0 inversions as for i < j you will never find a pair such that A[j] < A[i]. More clear example: 2 has index 1 and 5 has index 4 now 1 < 5 but 2 < 5 so this is not an inversion.
    
    Example 2:
    Input Format: N = 5, array[] = {5,4,3,2,1}
    Result: 10
    Explanation: we have a reverse sorted array and we will get the maximum inversions as for i < j we will always find a pair such that A[j] < A[i]. Example: 5 has index 0 and 3 has index 2 now (5,3) pair is inversion as 0 < 2 and 5 > 3 which will satisfy out conditions and for reverse sorted array we will get maximum inversions and that is (n)*(n-1) / 2.For above given array there is 4 + 3 + 2 + 1 = 10 inversions.
    
    Example 3:
    Input Format: N = 5, array[] = {5,3,2,1,4}
    Result: 7
    Explanation: There are 7 pairs (5,1), (5,3), (5,2), (5,4),(3,2), (3,1), (2,1) and we have left 2 pairs (2,4) and (1,4) as both are not satisfy our condition. 
    ```
    

---

---

## ✅ Solution: Count Inversions Using Merge Sort

```cpp
// Merges two sorted halves and counts inversions across them
int merge(vector<int> &arr, int low, int mid, int high) {
    int left = low;
    int right = mid + 1;
    int count = 0;
    vector<int> temp;

    while (left <= mid && right <= high) {
        if (arr[left] > arr[right]) {
            // Every element from left to mid is greater than arr[right]
            count += mid - left + 1;
            temp.push_back(arr[right++]);
        } else {
            temp.push_back(arr[left++]);
        }
    }

    // Append remaining elements
    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= high) temp.push_back(arr[right++]);

    // Copy merged result back to original array
    for (int i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }

    return count;
}

// Recursively sorts and counts inversions
int mergeSort(vector<int> &arr, int low, int high) {
    if (low >= high) return 0;

    int mid = (low + high) / 2;
    int count = 0;
    count += mergeSort(arr, low, mid);       // Left half
    count += mergeSort(arr, mid + 1, high);  // Right half
    count += merge(arr, low, mid, high);     // Cross inversions

    return count;
}

// Entry function
int inversionCount(vector<int> &arr) {
    return mergeSort(arr, 0, arr.size() - 1);
}

```

---

### 📝 How It Works

- This is a modified version of **Merge Sort** that counts **inversions**:
    - An inversion is a pair `(i, j)` where `i < j` and `arr[i] > arr[j]`.
- During the merge process:
    - If `arr[left] > arr[right]`, then all elements from `left` to `mid` form an inversion with `arr[right]`.

---

### 🧩 Key Formula / Logic

If during merge:

```cpp
arr[left] > arr[right]

```

Then:

```cpp
count += (mid - left + 1)

```

Because all elements from `left` to `mid` are greater than `arr[right]`.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) (auxiliary array) |
- Same as Merge Sort.
- Much faster than O(N²) brute force approach.

---

### ⚠️ Edge Cases

- Already sorted array → 0 inversions.
- Reverse sorted array → maximum inversions.
- Duplicates are handled correctly.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N²) | O(1) | Check every pair |
| Merge Sort ✅ | O(N log N) | O(N) | Optimal |

---

### 🔁 Related Problems

- [LC 315. Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)
- [LC 327. Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/)
- [GFG: Count Inversions](https://www.geeksforgeeks.org/counting-inversions/)
- [LC 493. Reverse Pairs](https://leetcode.com/problems/reverse-pairs/)

---

### 🛠️ Other Notes

- Real-world analogy: inversion count tells how "unsorted" the array is.
- Often used in **Kendall Tau distance**, **sorting problems**, and **measuring disorder**.
- Easily extendable to other inversion-related problems like counting **range inversions**.