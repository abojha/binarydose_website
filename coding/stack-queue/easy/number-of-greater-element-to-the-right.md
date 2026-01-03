---
title: Number of Greater Element to the Right
description: ""
tags:
  - easy
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given an array of **N** integers and **Q** queries of indices. For each query `indices[i]`, determine the count of elements in `arr` that are **strictly greater** than `arr[indices[i]]` to its right (after the position `indices[i]`).

- Example:
    
    ```
    Input: arr[] = [3, 4, 2, 7, 5, 8, 10, 6], queries = 2, indices[] = [0, 5]
    Output:  [6, 1]
    Explanation: The next greater elements to the right of 3(index 0) are 4,7,5,8,10,6. The next greater elements to the right of 8(index 5) is only 10.
    Input: arr[] = [1, 2, 3, 4, 1], queries = 2, indices[] = [0, 3]
    Output:  [3, 0]
    Explanation: The count of numbers to the right of index 0 which are greater than arr[0] is 3 i.e. (2, 3, 4). Similarly, the count of numbers to the right of index 3 which are greater than arr[3] is 0, since there are no greater elements than 4 to the right of the array.
    ```
    

---

## ✅ Solution: Brute Force — Count Number of Next Greater Elements (NGE) for Multiple Queries

---

```cpp
// ✅ Count NGE Using Brute Force Approach

class Solution {
  public:
    vector<int> count_NGE(int n, vector<int> &arr, int queries, vector<int> &indices) {
        vector<int> count(n, 0);

        // Count number of greater elements after each index
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] > arr[i]) {
                    cnt++;
                }
            }
            count[i] = cnt;
        }

        // Build result vector for each query
        vector<int> res;
        for (int i = 0; i < queries; i++) {
            res.push_back(count[indices[i]]);
        }

        return res;
    }
};

```

---

## 📝 How It Works

- **Step 1:** For each element in `arr`:
    - Count how many elements after it are greater than itself.
- **Step 2:** Store these counts in a `count[]` array.
- **Step 3:** For each query index given in `indices[]`, return the pre-computed count value.

✅ Pre-computation avoids redundant counting while answering multiple queries.

---

## 🧩 Key Formula / Recurrence

- Brute force double loop:
    
    `for each i → count elements j > i where arr[j] > arr[i]`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N² + Q) |
| **Space** | O(N + Q) |
- **N = arr.size()**
- **Q = queries**
- Double loop for count + simple array lookup for queries.

---

## ⚠️ Edge Cases

- All elements equal → All counts are 0.
- Strictly increasing array → Maximum counts.
- Empty array or empty query list → Return empty result.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Monotonic Stack + Tree | O(N log N) | Possible using segment trees for counting. |
| Brute Force | O(N² + Q) | Simple but slow for large N. |

---

## 🔁 Related Problems

- Next Greater Element Queries
- Count Smaller Elements After Self
- Stock Span Problem
- Range Queries for Next Greater Elements

---