---
title: Find Median from Data Stream
description: ""
tags:
  - hard
  - heaps
---

### Problem Statement:

The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for `arr = [2,3,4]`, the median is `3`.
- For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the MedianFinder class:

- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far. Answers within `105` of the actual answer will be accepted.
- Example:
    
    ```
    Example 1:
    
    Input
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
    [[], [1], [2], [], [3], []]
    Output
    [null, null, null, 1.5, null, 2.0]
    
    Explanation
    MedianFinder medianFinder = new MedianFinder();
    medianFinder.addNum(1);    // arr = [1]
    medianFinder.addNum(2);    // arr = [1, 2]
    medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
    medianFinder.addNum(3);    // arr[1, 2, 3]
    medianFinder.findMedian(); // return 2.0
    ```
    

---

---

```cpp
class MedianFinder {
public:
    priority_queue<int> maxHeap; // Left half (smaller elements)
    priority_queue<int, vector<int>, greater<int>> minHeap; // Right half (larger elements)

    MedianFinder() {
    }

    void addNum(int num) {
        maxHeap.push(num);

        // Balance: move the largest of maxHeap to minHeap
        minHeap.push(maxHeap.top());
        maxHeap.pop();

        // Ensure maxHeap has equal or 1 more element than minHeap
        if(minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if(minHeap.size() == maxHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        } else {
            return maxHeap.top();
        }
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- We maintain two heaps:
    - **Max-Heap (`maxHeap`)** stores the smaller half of the numbers.
    - **Min-Heap (`minHeap`)** stores the larger half of the numbers.
- **Balance Logic:**
    - Always keep `maxHeap` size ≥ `minHeap` size.
    - For an odd number of elements → `maxHeap` has one more element → median = `maxHeap.top()`.
    - For an even number of elements → median = average of `maxHeap.top()` and `minHeap.top()`.
- **Why Two Heaps?**
    - `maxHeap` gives the largest of the smaller half.
    - `minHeap` gives the smallest of the larger half.
    - Together, they allow quick access to the median in `O(1)` time after each insertion.

---

### 🧩 Key Formula / Recurrence

- **Median Formula:**
    - If sizes are equal:
        
        `median = (maxHeap.top() + minHeap.top()) / 2.0`
        
    - Else:
        
        `median = maxHeap.top()`
        
- **Balancing Rule:**
    
    Ensure:
    
    - `abs(maxHeap.size() - minHeap.size()) ≤ 1`

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| addNum(num) | O(log N) | O(N) |
| findMedian() | O(1) | O(1) |
- Inserting into a heap: `O(log N)`
- Finding median: Just peeking tops → `O(1)`.

---

### ⚠️ Edge Cases

- Empty structure: Should not call `findMedian()` before any `addNum()`.
- Only one number: Median is that number.
- Repeated numbers: Handled naturally.
- Negative numbers and floats: The code supports integers; adapting for floats would require using `double` heaps.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Sort on every addNum | O(N log N) |
| Two Heaps (This method) | O(log N) ✅ |
| Balanced BST | O(log N) |
- **Two heaps are preferred** due to easier implementation and guaranteed log N behavior.

---

### 🔁 Related Problems

- **LeetCode 295:** Find Median from Data Stream (Exact Problem)
- **LeetCode 480:** Sliding Window Median
- **LeetCode 239:** Sliding Window Maximum (related heap balancing)
- **GFG:** Median of Stream of Running Integers

---

## 🛠️ Other Notes

- ✅ **Common Interview Topic:** Median in a stream is a regular Amazon/Google type question.
- ✅ **Real-World Example:** Real-time statistics dashboards showing live medians for stock prices, temperatures, etc.
- ✅ **Why Not One Heap?** One heap would not give direct median access—needs two halves.