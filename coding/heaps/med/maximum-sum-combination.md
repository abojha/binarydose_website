---
title: Maximum Sum Combination
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

You are given two integer arrays **`a[]`** and **`b[]`** of equal size. A sum combination is formed by adding one element from **`a[]`** and one from **`b[]`**, using each index pair **`(i, j)`** at most once. Return the top **`k` maximum** sum combinations, sorted in non-increasing order.

- Example:
    
    ```
    Examples:
    
    Input: a[] = [3, 2], b[] = [1, 4], k = 2
    Output: [7, 6]
    Explanation: Possible sums: 3 + 1 = 4, 3 + 4 = 7, 2 + 1 = 3, 2 + 4 = 6, Top 2 sums are 7 and 6.
    Input: a[] = [1, 4, 2, 3], b[] = [2, 5, 1, 6], k = 3
    Output: [10, 9, 9]
    Explanation: The top 3 maximum possible sums are : 4 + 6 = 10, 3 + 6 = 9, and 4 + 5 = 9
    ```
    

---

---

```cpp
class Solution {
  public:
    vector<int> topKSumPairs(vector<int>& a, vector<int>& b, int k) {
        int n = a.size();
        int m = b.size();

        // Max-heap stores {sum, {i, j}} where i and j are indices in arrays a and b
        priority_queue<pair<int, pair<int, int>>> maxHeap;
        set<pair<int, int>> visited;  // To avoid duplicates
        vector<int> res;

        // Sort both arrays in descending order
        sort(a.rbegin(), a.rend());
        sort(b.rbegin(), b.rend());

        // Initialize heap with the largest sum
        maxHeap.push({a[0] + b[0], {0, 0}});
        visited.insert({0, 0});

        while(k-- && !maxHeap.empty()) {
            auto top = maxHeap.top();
            maxHeap.pop();

            res.push_back(top.first);

            int i = top.second.first;
            int j = top.second.second;

            // Try moving in array a
            if(i + 1 < n && visited.find({i + 1, j}) == visited.end()) {
                maxHeap.push({a[i + 1] + b[j], {i + 1, j}});
                visited.insert({i + 1, j});
            }

            // Try moving in array b
            if(j + 1 < m && visited.find({i, j + 1}) == visited.end()) {
                maxHeap.push({a[i] + b[j + 1], {i, j + 1}});
                visited.insert({i, j + 1});
            }
        }

        return res;
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- **Goal:** Find the top `k` largest sums where each sum is formed by adding one element from `a` and one from `b`.
- **Approach:**
    - Sort both arrays in descending order to prioritize larger sums first.
    - Use a max-heap to always extract the current largest sum candidate.
    - Store `{i, j}` in a `visited` set to avoid pushing duplicate index pairs into the heap.
    - Expand two possible next sums by incrementing `i` or `j` (move in either array).
- **Real-world analogy:** Merging two sorted score lists and picking top combinations without checking all possibilities.

---

### 🧩 Key Formula / Recurrence

- Max-Heap Formula:
    - Current max = `a[i] + b[j]`
    - Push next candidates:
        - `a[i+1] + b[j]`
        - `a[i] + b[j+1]`
    - Avoid revisiting using a set.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Sorting | O(N log N + M log M) | O(1) |
| Heap + Set Ops | O(K log K) | O(K) |
| Total | O(N log N + M log M + K log K) | O(K) |
- K is usually much smaller than N × M, so this is efficient for large arrays with small K.

---

### ⚠️ Edge Cases

- `k > n * m`: Should cap K to `n * m` if needed (depends on problem constraints).
- Duplicate elements in `a` or `b`: Handled naturally; values are considered with their indices.
- Arrays with negative numbers: Still works because we always track sums, whether negative or positive.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Brute Force (All combinations) | O(N * M + N * M log N * M) ❌ |
| Max-Heap + Set (This method) | O(K log K) ✅ |
- Heap + set is the optimal method for top-k sum pair problems in interviews and contests.

---

### 🔁 Related Problems

- **LeetCode 373:** Find K Pairs with Smallest Sums (similar logic, but for smallest sums)
- **LeetCode 215:** Kth Largest Element in an Array
- **LeetCode 23:** Merge K Sorted Lists (heap merging logic)
- **GFG:** K Maximum Sum Combinations

---

## 🛠️ Other Notes

- **Why Use `set<pair<int, int>>`?**
    
    To avoid revisiting `{i, j}` combinations already seen—prevents duplicates and unnecessary heap pushes.
    
- **Why Sort Before?**
    
    Sorting ensures the largest elements are always at the start, so moving right/down guarantees smaller or equal sums.