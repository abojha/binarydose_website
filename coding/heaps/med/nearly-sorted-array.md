---
title: Nearly Sorted Array
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

Given an array **arr[]**, where each element is at most **k** away from its target position, you need to sort the array optimally.**Note:** You need to change the given array **arr[]** in place.

**Examples:**

```
Input: arr[] = [6, 5, 3, 2, 8, 10, 9], k = 3
Output:[2, 3, 5, 6, 8, 9, 10]
Explanation:The sorted array will be 2 3 5 6 8 9 10

```

```
Input: arr[]= [1, 4, 5, 2, 3, 6, 7, 8, 9, 10], k = 2
Output:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Explanation:The sorted array will be 1 2 3 4 5 6 7 8 9 10
```

- Example:
    
    ```
    
    ```
    

---

```cpp
class Solution {
public:
    void nearlySorted(vector<int>& arr, int k) {
        // Min heap to store k+1 elements
        priority_queue<int, vector<int>, greater<int>> minHeap;

        // Step 1: Insert first k elements
        for (int i = 0; i <= k && i < arr.size(); i++) {
            minHeap.push(arr[i]);
        }

        int index = 0;

        // Step 2: Process remaining elements
        for (int i = k + 1; i < arr.size(); i++) {
            arr[index++] = minHeap.top();
            minHeap.pop();
            minHeap.push(arr[i]);
        }

        // Step 3: Empty remaining elements from heap
        while (!minHeap.empty()) {
            arr[index++] = minHeap.top();
            minHeap.pop();
        }
    }
};

```

---

## 📝 Required Notes Template

---

## ✅ **How It Works**

- **Problem:** Sort an array where each element is at most k positions away from its correct position (k-sorted array).
- **Approach:**
    1. Maintain a Min Heap with `k + 1` elements.
    2. Add first `k + 1` elements to the heap.
    3. For each new element:
        - Place the smallest element from the heap in the correct position in the array.
        - Push the next element into the heap.
    4. After processing all elements, empty the heap into the array.
- **Real-World Analogy:** Sorting a line where people are approximately in order but a few are out of place.

---

## 🧩 **Key Formula / Recurrence**

- Always maintain the next smallest element within the next `k + 1` window using a Min Heap.

---

## ⏱️ **Time & Space Complexity**

| Metric | Complexity |
| --- | --- |
| Time | O(N log k) |
| Space | O(k) |
- N = total elements in the array.
- k = maximum distance an element is from its correct position.

---

## ⚠️ **Edge Cases**

- `k >= N`: Acts like normal sort.
- `k = 0`: Array already sorted.
- Empty array.

---

## 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Full Sort (O(N log N)) | O(N log N) | O(1) |
| Min Heap (Preferred) | O(N log k) | O(k) |

✅ Min Heap approach is optimal when `k << N`.

---

## 🔁 **Related Problems**

- LeetCode 621: Task Scheduler
- LeetCode 632: Smallest Range Covering Elements from K Lists
- Sorting Problems with Custom Constraints

---