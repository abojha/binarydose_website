---
title: Check if Array is Sorted
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an array **arr[]**, check whether it is sorted in **non-decreasing** order. Return **true** if it is sorted otherwise **false**.

- Example:
    
    ```
    Examples:
    
    Input: arr[] = [10, 20, 30, 40, 50]
    Output: true
    Explanation: The given array is sorted.
    Input: arr[] = [90, 80, 100, 70, 40, 30]
    Output: false
    Explanation: The given array is not sorted.
    ```
    

---

### ✅ Solution: Brute Force – Single Pass

```cpp
class Solution {
  public:
    bool isSorted(vector<int>& arr) {
        // Traverse the array from index 1 to end
        for(int i = 1; i < arr.size(); i++){
            // If any previous element is greater, it's not sorted
            if(arr[i - 1] > arr[i]){
                return false;
            }
        }
        // If no such pair is found, the array is sorted
        return true;
    }
};

```

---

### 📝 How It Works

- The function iterates from the second element to the last.
- For each element, it compares it with its previous one.
- If at any point the current element is **less than** the previous one, it returns `false` (not sorted in non-decreasing order).
- If the loop completes without finding such a pair, it returns `true`.

---

### 🧩 Key Formula / Recurrence

- There’s no recurrence – just a linear scan with the check:
    
    `if arr[i-1] > arr[i] → not sorted`
    

---

### ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- Empty array `[]` → considered sorted ✅
- Single-element array `[42]` → sorted ✅
- All elements equal `[3, 3, 3]` → sorted ✅
- Strictly decreasing `[5, 4, 3]` → not sorted ❌

---

### 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| STL `is_sorted()` | O(N) | Use `return is_sorted(arr.begin(), arr.end());` for cleaner code |
| Compare to sorted copy | O(N log N) | Make a sorted version and compare – inefficient for this task ❌ |

---

### 🔁 Related Problems

- Check if array is strictly increasing
- Count the number of unsorted pairs in an array
- Sort an array using minimum swaps

---

### 🛠️ Other Notes

- This is an ideal use-case for a **simple scan**, no need for recursion or extra space.
- This is **stable** for arrays with duplicates and works well for real-time checks like verifying if logs, scores, or timestamps are in order.