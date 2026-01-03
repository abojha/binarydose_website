---
title: Kth Largest in Stream
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

Given an input stream **arr[]** of **n** integers. Find the **K**th largest element (not **K**th largest unique element) after insertion of each element in the stream and if the **Kth** largest element doesn't exist, the answer will be -1 for that insertion.  return a list of size n after all insertions.

- Example:
    
    ```
    Input:
    k = 4, n = 6
    arr[] = {1, 2, 3, 4, 5, 6}
    Output:
    -1 -1 -1 1 2 3
    Explanation:
    k = 4
    For 1, the 4th largest element doesn't
    exist so answer will be -1.
    For 2, the 4th largest element doesn't
    exist so answer will be -1.
    For 3, the 4th largest element doesn't
    exist so answer will be -1.
    For 4, the 4th largest element is 1.
    For 5, the 4th largest element is 2.
    for 6, the 4th largest element is 3.
    Example 2:
    
    Input:
    k = 1, n = 2
    arr[] = {3, 4}
    Output:
    3 4 
    Explanation: 
    For the 1st and 2nd element the 1st largest 
    element is itself.
    ```
    

---

---

```cpp
class Solution {
  public:
    vector<int> kthLargest(int k, int arr[], int n) {
        vector<int> res;
        priority_queue<int, vector<int>, greater<int>> minHeap;  // Min-heap to maintain k largest elements

        for(int i = 0; i < n; i++) {
            if(minHeap.size() < k) {
                minHeap.push(arr[i]);  // Fill up until size k
            }
            else if(arr[i] > minHeap.top()) {
                minHeap.pop();         // Remove smallest in k-sized heap
                minHeap.push(arr[i]);  // Insert new candidate
            }

            if(minHeap.size() == k) {
                res.push_back(minHeap.top());  // Kth largest = min in heap
            } else {
                res.push_back(-1);  // Not enough elements yet
            }
        }
        return res;
    }
};

```

---

### 📝 How It Works

- The problem asks for the **kth largest element** after each new array element is added in a stream.
- **Approach:**
    - Maintain a min-heap (`priority_queue<int, vector<int>, greater<int>>`) that stores the top `k` largest elements.
    - At each step:
        - If heap size < k, push the element.
        - If heap size == k and new element > heap top (smallest in top-k), pop the smallest and insert the new element.
        - If heap size is exactly `k`, the top of the min-heap is the kth largest element so far.
        - If heap size < k, we cannot report kth largest yet → push `1`.

---

### 🧩 Key Formula / Recurrence

- **Min-Heap Logic:**
    - Maintain k largest elements seen so far.
    - Top of heap → kth largest element among current numbers.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Each Insertion | O(log k) | O(k) |
| Total (for n elements) | O(n log k) | O(k) |
- Efficient because k is usually much smaller than n.

---

### ⚠️ Edge Cases

- `k > n`: Technically invalid; here, it keeps outputting `1` until heap fills.
- Duplicates in array: Handled naturally by heap comparison.
- Negative numbers: No issue; heap works on relative size.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Sort on every step | O(n² log n) ❌ |
| Min-Heap (this method) | O(n log k) ✅ |
- **Note:** Using a multiset would be similar but less efficient.

---

### 🔁 Related Problems

- **LeetCode 703:** Kth Largest Element in a Stream
- **LeetCode 215:** Kth Largest Element in an Array
- **GFG:** Kth Largest Element in a Stream
- **LeetCode 347:** Top K Frequent Elements

---

## 🛠️ Other Notes

- **Real-World Analogy:** Showing the k-th ranked stock price on a moving list where prices keep changing.
- **Interview Tip:** Always highlight min-heap usage for top-k or kth-largest type questions. Simple to implement and scalable.