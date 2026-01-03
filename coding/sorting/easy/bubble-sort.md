---
title: Bubble Sort
description: ""
tags:
  - easy
  - sorting
---

### Problem Statement:

Given an array **arr**, use Bubble **sort** to sort arr[] in increasing order.

- Example:
    
    ```
    Input:arr[] = [4, 1, 3, 9, 7]
    Output:[1, 3, 4, 7, 9]
    Explanation:Maintain sorted (in bold) and unsorted subarrays. Select 1. Array becomes1 4 3 9 7. Select 3. Array becomes1 3 4 9 7. Select 4. Array becomes1 3 4 9 7. Select 7. Array becomes1 3 4 7 9. Select 9. Array becomes1 3 4 7 9.
    ```
    

---

---

---

## 🔀 Solution: Bubble Sort

```cpp
class Solution {
public:
    void bubbleSort(vector<int>& arr) {
        int n = arr.size();
        for(int i = n - 1; i >= 0; i--){
            for(int j = 0; j < i; j++){
                // Swap if the adjacent elements are in the wrong order
                if(arr[j] > arr[j + 1]){
                    swap(arr[j], arr[j + 1]);
                }
            }
        }
    }
};

```

---

## 📝 How It Works

- Bubble Sort works by **repeatedly swapping adjacent elements** if they are in the wrong order.
- After each pass, the **largest unsorted element bubbles up** to its correct position at the end.
- Outer loop runs from the end to the beginning.
- Inner loop compares adjacent pairs and swaps them if needed.

---

## 🧩 Key Concept

- **Repeated adjacent comparison + swap**
- Largest element "bubbles" to the end in each pass

---

## ⏱️ Time & Space Complexity

| Best Case (Sorted) | O(n²) (no break used here) |
| --- | --- |
| Average/Worst Case | O(n²) |
| Space | O(1) (in-place) |

---

## ⚠️ Edge Cases

- Array of size `0` or `1` → Already sorted
- Already sorted array → Still does full O(n²) unless optimized with a flag
- All elements same → No swaps needed

---

## 💡 Other Approaches

| Algorithm | Time (Avg) | Stable | Notes |
| --- | --- | --- | --- |
| Selection Sort | O(n²) | ❌ | Picks min and swaps |
| Insertion Sort | O(n²) | ✅ | Good for small arrays |
| Merge Sort | O(n log n) | ✅ | Divide & conquer |
| Quick Sort | O(n log n) | ❌ | Fast, not stable |
| Heap Sort | O(n log n) | ❌ | Uses heap, not stable |

---

## 🔁 Related Problems

- Sort Colors – LeetCode 75
- Merge Intervals
- Insertion Sort List – LeetCode 147
- Implement Sorting Algorithms

---