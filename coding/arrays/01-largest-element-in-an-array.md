---
title: Largest Element in an Array
description: ""
tags:
  - arrays
  - easy
---

### Problem Statement:

Given an array **arr[].** The task is to find the **largest** element and return it.

- Example:
    
    ```
    Examples:
    
    Input: arr[] = [1, 8, 7, 56, 90]
    Output: 90
    Explanation: The largest element of the given array is 90.
    Input: arr[] = [5, 5, 5, 5]
    Output: 5
    Explanation: The largest element of the given array is 5.
    Input: arr[] = [10]
    Output: 10
    Explanation: There is only one element which is the largest.
    ```
    

---

### ✅ Solution 1: Brute Force

```cpp
int largest(vector<int> &arr) {
    int max_ele = INT_MIN;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] > max_ele) {
            max_ele = arr[i];
        }
    }
    return max_ele;
}

```

---

### ✅ Solution 2: Sorting Approach

```cpp
int largest(vector<int> &arr) {
    sort(arr.begin(), arr.end());  // Sorts the array in increasing order
    return arr.back();             // Last element is the maximum
}

```

---

### ✅ Solution 3: Recursive Approach

```cpp
class Solution {
  public:
    int FindMax(vector<int> &arr, int i){
        if(i == arr.size() - 1) return arr[i];
        int max_ele = FindMax(arr, i + 1);
        return max(arr[i], max_ele);
    }

    int largest(vector<int> &arr) {
        return FindMax(arr, 0);
    }
};

```

---

## 📝 How It Works

- **Brute Force:** Linear scan to compare all elements and track the maximum so far.
- **Sorting:** Sort the entire array and return the last element (maximum).
- **Recursion:** Divide problem by computing max of rest of array and compare with current.

---

## 🧩 Key Formula

- **Brute Force:** `max = max(arr[i], max)`
- **Recursion:** `max(i) = max(arr[i], max(i+1))`

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force ✅ | O(N) | O(1) |
| Sorting | O(N log N) | O(1) or O(N) (depending on sort) |
| Recursion | O(N) | O(N) — call stack |

---

## ⚠️ Edge Cases

- Empty array → should return error/INT_MIN or handle explicitly.
- All elements same → returns that element.
- All negative numbers → works as usual.

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Divide and Conquer | Useful for parallel processing |
| Segment Tree | If you need to do multiple range queries |

---

## 🔁 Related Problems

- GFG: Largest element in array
- LeetCode 162: Find Peak Element
- GFG: Second largest element
- Min/Max in recursive array calls

---

## 🛠️ Other Notes (Optional)

- ✅ Brute force is most optimal for one-time scan.
- ⚠️ Avoid recursion for large inputs due to stack overflow risk.
- ❌ Sorting is **overkill** just to find a single max value.