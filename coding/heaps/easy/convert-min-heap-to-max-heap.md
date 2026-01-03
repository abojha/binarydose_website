---
title: Convert Min Heap to Max Heap
description: ""
tags:
  - easy
  - heaps
---

### Problem Statement:

You are given an array **arr** of **N** integers representing a min Heap. The task is to convert it to max Heap.

A max-heap is a complete binary tree in which the value in each internal node is greater than or equal to the values in the children of that node.

- Example:
    
    ```
    Example 1:
    
    Input:
    N = 4
    arr = [1, 2, 3, 4]
    Output:
    [4, 2, 3, 1]
    Explanation:
    
    The given min Heap:
    
              1
            /   \
          2       3
         /
       4
    
    Max Heap after conversion:
    
             4
           /   \
          2     3
        /
       1
    Example 2:
    
    Input:
    N = 5
    arr = [3, 4, 8, 11, 13]
    Output:
    [13, 11, 8, 3, 4]
    Explanation:
    
    The given min Heap:
    
              3
            /   \
          4      8
        /   \ 
      11     13
    
    Max Heap after conversion:
    
              13
            /    \
          11      8
        /   \ 
       3     4
    ```
    

---

## ✅ Solution: Convert Min-Heap to Max-Heap Using Heapify

```cpp
// User function Template for C++

class Solution {
  public:
    // Function to get left child index
    int getLeftChildIndex(int i, int n) {
        int leftChildIndex = 2 * i + 1;
        if (leftChildIndex >= n) return -1;
        return leftChildIndex;
    }

    // Function to get right child index
    int getRightChildIndex(int i, int n) {
        int rightChildIndex = 2 * i + 2;
        if (rightChildIndex >= n) return -1;
        return rightChildIndex;
    }

    // Heapify function to maintain max heap property
    void hepify(vector<int> &arr, int i, int n) {
        int l = getLeftChildIndex(i, n);
        int r = getRightChildIndex(i, n);

        int maxIndex = i;

        if (l != -1 && arr[maxIndex] < arr[l]) {
            maxIndex = l;
        }
        if (r != -1 && arr[maxIndex] < arr[r]) {
            maxIndex = r;
        }

        if (maxIndex != i) {
            swap(arr[i], arr[maxIndex]);
            hepify(arr, maxIndex, n);
        }
    }

    // Function to convert given Min-Heap array to Max-Heap
    void convertMinToMaxHeap(vector<int> &arr, int N) {
        for (int i = (N - 2) / 2; i >= 0; i--) {
            hepify(arr, i, N);
        }
    }
};

```

---

---

## 📝 How It Works

- **Problem:** Convert a Min-Heap array to a Max-Heap array in-place.
- **Core Idea:**
    - Use **bottom-up heapify** on all internal nodes from `(N−2)/2` to `0`.
    - Same as building a max heap from an unsorted array — only here, the array is already a min heap.
- **Process:**
    - Traverse from last internal node down to root.
    - For each node, call `hepify()` to maintain max heap property.

---

## 🧩 Key Formula / Recurrence

- **Internal Nodes:** `i ∈ [0, (N−2)/2]`
- **Max Heapify Logic:**
    - `maxIndex = max(arr[i], arr[left], arr[right])`
    - If maxIndex changes → swap and recursively heapify down.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Reason: Bottom-up heapify has linear time complexity when applied across all internal nodes.

---

## ⚠️ Edge Cases

- Array with 1 element → already max heap.
- Array with 2 elements → simple swap check.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Using Priority Queue STL | O(N log N) | O(N) |
| Bottom-Up Heapify (Used) | O(N) | O(1) |
- Bottom-up is optimal in both interviews and real applications.

---

## 🔁 Related Problems

- Build Max Heap from Array
- Convert Max Heap to Min Heap
- Heap Sort

---