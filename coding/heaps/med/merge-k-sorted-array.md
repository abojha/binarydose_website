---
title: Merge K Sorted Array
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

Given **k** sorted arrays arranged in the form of a matrix of size **k** * **k**. The task is to merge them into one sorted array. Return the merged sorted array ( as a pointer to the merged sorted arrays in **cpp,** as an ArrayList in **java,** and list in **python**).

- Example:
    
    **Examples :**
    
    ```
    Input:k = 3, arr[][] = {{1,2,3},{4,5,6},{7,8,9}}
    Output:1 2 3 4 5 6 7 8 9
    Explanation:Above test case has 3 sorted arrays of size 3, 3, 3 arr[][] = [[1, 2, 3],[4, 5, 6],[7, 8, 9]]. The merged list will be [1, 2, 3, 4, 5, 6, 7, 8, 9].
    ```
    
    ```
    Input:k = 4, arr[][]={{1,2,3,4},{2,2,3,4},{5,5,6,6},{7,8,9,9}}
    Output:1 2 2 2 3 3 4 4 5 5 6 6 7 8 9 9
    Explanation:Above test case has 4 sorted arrays of size 4, 4, 4, 4 arr[][] = [[1, 2, 2, 2], [3, 3, 4, 4], [5, 5, 6, 6], [7, 8, 9, 9 ]]. The merged list will be [1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9].
    ```
    

---

---

## Solution: Min-Heap (K-way merge)

```cpp
// Technique: Min-Heap (K-way merge)
// Time: O(N log K), Space: O(K) + O(N) for output
class Solution {
public:
    // pair format: (value, (array_index, element_index))
    typedef pair<int, pair<int, int>> pp;

    // Function to merge k sorted arrays.
    vector<int> mergeKArrays(vector<vector<int>> arr, int K) {
        vector<int> res;
        if (K == 0 || arr.empty()) return res;

        // Use actualK = min(K, arr.size()) in case K doesn't match arr.size()
        int actualK = min(K, static_cast<int>(arr.size()));

        // Min-heap: smallest value at top (lexicographic compare on pair).
        priority_queue<pp, vector<pp>, greater<pp>> minHeap;

        // Optionally compute total size to reserve result capacity and avoid reallocations
        size_t total = 0;
        for (int i = 0; i < actualK; ++i) total += arr[i].size();
        if (total) res.reserve(total);

        // Push first element of each non-empty array
        for (int i = 0; i < actualK; ++i) {
            if (!arr[i].empty()) {
                minHeap.push({ arr[i][0], { i, 0 } });
            }
        }

        // Extract min and push next element from same array until heap empties
        while (!minHeap.empty()) {
            auto it = minHeap.top();
            minHeap.pop();

            int val = it.first;             // smallest value
            int i = it.second.first;        // which array
            int j = it.second.second;       // index in that array

            res.push_back(val);

            // If next element exists in same array, push it
            if (j + 1 < static_cast<int>(arr[i].size())) {
                minHeap.push({ arr[i][j + 1], { i, j + 1 } });
            }
        }

        return res;
    }
};

```

---

## ✅ Label the code solution

**Technique:** Min-Heap (K-way merge using a min priority queue)

---

## 📝 How It Works

1. Build a min-heap that stores a triple `(value, (array_index, element_index))` for the current candidate from each array.
2. Initially push the first element of every non-empty array into the heap.
3. Repeatedly:
    - Pop the smallest triple `(val, (i, j))` from the heap.
    - Append `val` to the result vector.
    - From the same array `i`, if index `j+1` exists, push `(arr[i][j+1], (i, j+1))` into the heap.
4. Stop when the heap is empty. Because the heap always yields the smallest available value across all arrays, the output is globally sorted.

---

## 🧩 Key Formula / Recurrence

- Not recursive; the key transition is:
    - `pop (val, (i,j))` → `push (arr[i][j+1], (i,j+1))` if exists.
- Each element triggers at most one push and one pop; heap operations cost `O(log K)`.

---

## ⏱️ Time & Space Complexity

- **Time:** `O(N log K)`
    - `N` = total number of elements across all arrays.
    - Each of the `N` elements is inserted and removed from the heap once; each heap op is `O(log K)`.
- **Space:** `O(K)` extra for the heap plus `O(N)` for the output vector `res` (output space excluded from "extra" if you prefer).

---

## ⚠️ Edge Cases

- `K == 0` or `arr` empty → return empty vector.
- Some arrays may be empty — they are skipped on initial push.
- `K` passed can be larger than `arr.size()` — code uses `actualK = min(K, arr.size())`.
- Arrays of varying lengths work fine.
- Duplicate values — stable ordering between equal values is by insertion order into heap (not strictly necessary to guarantee beyond sorting).
- Very large total `N` — reserving `res` capacity (done) reduces reallocations.

---

## 💡 Other Approaches

1. **Divide & Conquer (Pairwise merge)**
    - Merge arrays in pairs repeatedly (like tournament).
    - Time: `O(N log K)`. May be faster in practice due to less heap overhead; needs extra space for merged results.
2. **Flatten & Sort**
    - Concatenate all arrays then `std::sort`.
    - Time: `O(N log N)`, Space: `O(N)`. Simpler but often slower when `K` is much smaller than `N`.
3. **External Multiway Merge**
    - For datasets that don't fit in memory: read chunks, produce sorted runs, use k-way merge with limited memory buffers (external sorting).

---

## 🔁 Related Problems

- Merge k Sorted Lists (LeetCode 23) — same concept for linked lists.
- Merge Two Sorted Arrays / Lists (LeetCode 21) — primitive building block.
- Smallest Range Covering Elements from K Lists (LeetCode 632) — also uses a min-heap over k sources.

---

## 🛠️ Other Notes (optional but recommended)

- **C++ by default** (done).
- **Inline comments** included in the code.
- **Real-world analogy:** Think of `K` conveyor belts each outputting sorted items; you always pick the smallest visible item across belts — the min-heap is the efficient "smallest-finder".
- **Avoid unnecessary boilerplate:** function provided is ready to drop into typical competitive templates.

---