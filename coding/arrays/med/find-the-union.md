---
title: Find the Union
description: ""
tags:
  - array
  - med
---

### Problem Statement:

You are given two arrays **a[]** and **b[]**, return the **Union** of both the arrays in any order.

The **Union** of two arrays is a collection of all **distinct elements** present in either of the arrays. If an element appears more than once in one or both arrays, it should be included **only once** in the result.

**Note:** Elements of **a[]** and **b[]** are not necessarily distinct.Note that, You can return the Union in any order but the driver code will print the result in **sorted order** only.

- Example:
    
    ```
    Examples:
    
    Input: a[] = [1, 2, 3, 2, 1], b[] = [3, 2, 2, 3, 3, 2]
    Output: [1, 2, 3]
    Explanation: Union set of both the arrays will be 1, 2 and 3.
    Input: a[] = [1, 2, 3], b[] = [4, 5, 6] 
    Output: [1, 2, 3, 4, 5, 6]
    Explanation: Union set of both the arrays will be 1, 2, 3, 4, 5 and 6.
    Input: a[] = [1, 2, 1, 1, 2], b[] = [2, 2, 1, 2, 1] 
    Output: [1, 2]
    Explanation: Union set of both the arrays will be 1 and 2.
    ```
    

---

---

## ✅ Solution 1: Using Set (For **Unsorted** Arrays)

```cpp
class Solution {
public:
    vector<int> findUnion(vector<int>& a, vector<int>& b) {
        set<int> uniqueElements;
        vector<int> result;

        for (int num : a) uniqueElements.insert(num);
        for (int num : b) uniqueElements.insert(num);

        result.insert(result.end(), uniqueElements.begin(), uniqueElements.end());
        return result;
    }
};

```

---

## ✅ Solution 2: Two Pointer Technique (For **Sorted** Arrays)

```cpp
class Solution {
public:
    vector<int> findUnion(vector<int>& a, vector<int>& b) {
        int i = 0, j = 0;
        int n = a.size(), m = b.size();
        vector<int> result;

        while (i < n && j < m) {
            // Skip duplicates from a
            if (!result.empty() && result.back() == a[i]) {
                i++;
                continue;
            }

            // Skip duplicates from b
            if (!result.empty() && result.back() == b[j]) {
                j++;
                continue;
            }

            if (a[i] < b[j]) {
                result.push_back(a[i]);
                i++;
            } else if (a[i] > b[j]) {
                result.push_back(b[j]);
                j++;
            } else {
                result.push_back(a[i]);
                i++;
                j++;
            }
        }

        // Handle remaining elements in a
        while (i < n) {
            if (result.empty() || result.back() != a[i])
                result.push_back(a[i]);
            i++;
        }

        // Handle remaining elements in b
        while (j < m) {
            if (result.empty() || result.back() != b[j])
                result.push_back(b[j]);
            j++;
        }

        return result;
    }
};

```

---

## 📝 How It Works

### ✅ Set-Based Version

- Works for **unsorted** arrays.
- Adds all elements from both arrays into a `set`, which:
    - Removes duplicates
    - Sorts elements automatically
- Returns the result as a sorted, unique union.

### ✅ Two-Pointer Version

- Works efficiently when both arrays are **sorted**.
- Uses two pointers to:
    - Traverse both arrays simultaneously
    - Avoid duplicates by comparing with `result.back()`
    - Merge in linear time

---

## 🧩 Key Formula / Logic

### Set-Based:

- `set.insert(x)` ensures uniqueness + sorting.

### Two-Pointer:

```cpp
if (a[i] < b[j]) → push a[i], i++
if (a[i] > b[j]) → push b[j], j++
if (a[i] == b[j]) → push one, i++, j++
skip duplicates if result.back() == current element

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Set-Based | O((n + m)·log(n + m)) | O(n + m) |
| Two-Pointer | O(n + m) | O(n + m) |

---

## ⚠️ Edge Cases

- One or both arrays empty → returns union of non-empty or empty.
- All duplicates → returns only distinct elements.
- Arrays already contain common elements → properly deduplicated.

---

## 💡 Other Approaches

| Approach | Use Case | Notes |
| --- | --- | --- |
| HashSet | Unsorted arrays | No order guaranteed |
| Two-pointer | Sorted arrays | Most optimal |

---

## 🔁 Related Problems

- Intersection of Two Arrays
- Merge Two Sorted Arrays
- Union and Intersection in Linked Lists
- Remove Duplicates from Sorted Array

---