---
title: Top K Frequent Elements
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

Given an integer array `nums` and an integer `k`, return *the* `k` *most frequent elements*. You may return the answer in **any order**.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,1,1,2,2,3], k = 2
    Output: [1,2]
    Example 2:
    
    Input: nums = [1], k = 1
    Output: [1]
    ```
    

---

---

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        map<int, int> freqMap;

        // Step 1: Count frequency of each number
        for(auto num : nums) {
            freqMap[num]++;
        }

        // Step 2: Maintain a min-heap of size k
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;

        for(auto &entry : freqMap) {
            minHeap.push({entry.second, entry.first});  // {frequency, number}

            if(minHeap.size() > k) {
                minHeap.pop();  // Remove smallest frequency if heap exceeds size k
            }
        }

        // Step 3: Extract k elements from the heap
        vector<int> res;
        while(!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }

        return res;
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- **Problem Goal:** Return the k most frequent elements in the array.
- **Approach:**
    - **Step 1:** Build a frequency map (`map<int, int>`) for all numbers.
    - **Step 2:** Use a min-heap to keep track of the top k frequent elements:
        - Push each `{frequency, number}` into the heap.
        - If heap size exceeds k, pop the element with the smallest frequency.
    - **Step 3:** Pop elements from the heap and collect them as the result.
- **Why Min-Heap?**
    
    Maintains the top k elements efficiently with automatic sorting based on frequency.
    

---

### 🧩 Key Formula / Recurrence

- **Frequency Map:** `freqMap[num]++`
- **Min-Heap Property:** Always stores k elements with the highest frequency at any moment.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Building Frequency Map | O(N) | O(N) |
| Heap Operations | O(M log K) | O(K) |
| Total | O(N + M log K) | O(N) |
- **N = number of elements in nums.**
- **M = number of unique elements.**

---

### ⚠️ Edge Cases

- `k = nums.size()`: Return all unique elements.
- All elements have the same frequency: Returns any valid k elements.
- Negative numbers: Handled naturally as keys in the map.
- Very large k values: Still works, but be aware of heap size limits in constrained environments.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Hash Map + Sorting | O(M log M) |
| Hash Map + Bucket Sort | O(N) (Best for dense input) |
| Min-Heap (This method) | O(M log K) ✅ |
- Bucket Sort is faster theoretically but trickier to implement cleanly.

---

### 🔁 Related Problems

- **LeetCode 347:** Top K Frequent Elements (Exact Same)
- **LeetCode 692:** Top K Frequent Words
- **LeetCode 451:** Sort Characters by Frequency
- **GFG:** K Most Frequent Elements in an Array

---

## 🛠️ Other Notes

- **Interview Pattern:** Top K frequent elements → hash map + heap is the standard, bucket sort is the follow-up.
- **Why Map + Heap?** Combines simple frequency counting with efficient top-k extraction.
- **Real-Life Example:** Displaying the top k trending hashtags, most used search keywords, etc.