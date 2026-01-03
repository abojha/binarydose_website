---
title: Second Largest Element in an Array
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an array of **positive** integers **arr[]**, return the **second largest** element from the array. If the second largest element doesn't exist then return **-1.**

Note: The second largest element should not be equal to the largest element.

- Example:
    
    ```
    Examples:
    
    Input: arr[] = [12, 35, 1, 10, 34, 1]
    Output: 34
    Explanation: The largest element of the array is 35 and the second largest element is 34.
    Input: arr[] = [10, 5, 10]
    Output: 5
    Explanation: The largest element of the array is 10 and the second largest element is 5.
    Input: arr[] = [10, 10, 10]
    Output: -1
    Explanation: The largest element of the array is 10 and the second largest element does not exist.
    ```
    

---

---

## ✅ Solution: Brute Force → Sorting → One-Pass Linear Scan

---

### ✅ Solution 1: Brute Force

```cpp
int findSecondLargest(int n, vector<int> &arr) {
    int maxEle = INT_MIN;

    // First, find the largest element
    for (int i = 0; i < n; i++) {
        maxEle = max(maxEle, arr[i]);
    }

    int secondLargest = INT_MIN;

    // Now, find the largest element that is not equal to maxEle
    for (int i = 0; i < n; i++) {
        if (arr[i] != maxEle) {
            secondLargest = max(secondLargest, arr[i]);
        }
    }

    return secondLargest == INT_MIN ? -1 : secondLargest;
}

```

---

### ✅ Solution 2: Sorting Approach

```cpp
int findSecondLargest(int n, vector<int> &arr) {
    sort(arr.begin(), arr.end()); // Sort ascending
    int largest = arr[n - 1];

    // Traverse from second last and return first smaller element
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] != largest) {
            return arr[i];
        }
    }

    return -1;  // All elements are equal
}

```

---

### ✅ Solution 3: One-Pass Optimal (Best Approach)

```cpp
int findSecondLargest(int n, vector<int> &arr) {
    int Largest = INT_MIN;
    int secondLargest = INT_MIN;

    for (int i = 0; i < n; i++) {
        if (arr[i] > Largest) {
            secondLargest = Largest;
            Largest = arr[i];
        }
        else if (arr[i] > secondLargest && arr[i] != Largest) {
            secondLargest = arr[i];
        }
    }

    return secondLargest == INT_MIN ? -1 : secondLargest;
}

```

---

## 📝 How It Works

- **Brute Force:** Find the max first, then find the best candidate not equal to max.
- **Sorting:** Sort the array and look for the first number less than the largest.
- **Optimal Approach:** Traverse once while tracking both the largest and second largest values.

---

## 🧩 Key Formula

- For every element `x`:
    - if `x > Largest`, then `secondLargest = Largest`, `Largest = x`
    - else if `x > secondLargest && x != Largest`, update `secondLargest`

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force | O(2N) | O(1) |
| Sorting | O(N log N) | O(1) or O(N) |
| Optimal ✅ | O(N) | O(1) |

---

## ⚠️ Edge Cases

- All elements are the same → return `1`
- Only one element → return `1`
- Negative values → Works fine
- Duplicates allowed → Second largest must be strictly smaller than largest

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Heap (min-heap) | O(N log K) | Overkill for just 2 largest elems |

---

## 🔁 Related Problems

- GFG: Second Largest Element in Array ✅
- LeetCode 1980: Find Second Highest Salary (SQL)
- GFG: Second Smallest Element
- LeetCode: Third Maximum Number

---

## 🛠️ Other Notes

- ✅ Prefer the **one-pass linear** solution for interviews.
- ⚠️ Avoid sorting for such questions unless asked explicitly.
- ✅ You can easily extend the logic to find **third largest**, **k-th largest**, etc.