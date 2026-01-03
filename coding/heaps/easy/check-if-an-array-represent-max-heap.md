---
title: Check if an Array Represent Max Heap
description: ""
tags:
  - easy
  - heaps
---

### Problem Statement:

Given an array **arr** of size **n**, the task is to check if the given array can be a level order representation of a [Max Heap](https://www.geeksforgeeks.org/difference-between-min-heap-and-max-heap/).

- Example:
    
    ```
    Input:
    n = 6
    arr[] = {90, 15, 10, 7, 12, 2}
    Output: 
    1
    Explanation: 
    The given array represents below tree
           90
         /    \
       15      10
      /  \     /
    7    12  2
    The tree follows max-heap property as every
    node is greater than all of its descendants.
    ```
    

---

```cpp
// Function to check if the given array represents a Max Heap
bool isMaxHeap(int arr[], int n) {
    // Loop through all internal nodes: from 0 to (n-2)/2
    for (int i = 0; i <= (n - 2) / 2; i++) {
        // Check left child
        if (2 * i + 1 < n && arr[i] < arr[2 * i + 1]) {
            return false;
        }
        // Check right child
        if (2 * i + 2 < n && arr[i] < arr[2 * i + 2]) {
            return false;
        }
    }
    return true;
}

```

---

## 📝 Required Notes Template

---

## ✅ **How It Works**

- **Heap Property:** In a max heap, for every node `i`:
    - `arr[i] ≥ arr[left child]`
    - `arr[i] ≥ arr[right child]`
- **Internal Nodes Range:**
    
    We only check nodes from index `0` to `(n − 2) / 2`.
    
    Why? Nodes after `(n−2)/2` are leaf nodes (no children).
    
- **Step-by-Step:**
    1. Iterate through each internal node.
    2. If the current node is smaller than any of its children, return `false`.
    3. If no violation is found, return `true`.

---

## 🧩 **Key Formula / Recurrence**

- **Internal nodes range:** `i ∈ [0, (n − 2) / 2]`
- For each `i`:
    - Check:
        
        `arr[i] ≥ arr[2 * i + 1]` (if exists)
        
        `arr[i] ≥ arr[2 * i + 2]` (if exists)
        

---

## ⏱️ **Time & Space Complexity**

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Single pass through all internal nodes.

---

## ⚠️ **Edge Cases**

- **Empty Array (n = 0)** → Should return true (by convention).
- **Single Element (n = 1)** → Valid max heap.
- **Two Elements:** Direct parent-child check.

---

## 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Bottom-Up Heapify Check | O(N) | O(1) |
| Recursive Tree Validation | O(N) | O(log N) |

> ✅ Iterative check (current solution) is simplest for array-based heaps.
> 

---

## 🔁 **Related Problems**

- Validate Min Heap Array
- Build Max Heap from Array
- Convert Array to BST

---