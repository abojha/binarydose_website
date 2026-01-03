---
title: Kth Largest/Smallest Element in an Array
description: ""
tags:
  - easy
  - heaps
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

### ✅ **1️⃣ Solution 1: Kth Largest Using Quickselect**

```cpp
class Solution {
public:
    int getPartitionIndex(vector<int>& nums, int left, int right) {
        int pivot = left;
        int l = left + 1;
        int r = right;

        while (l <= r) {
            if (nums[l] < nums[pivot] && nums[r] > nums[pivot]) {
                swap(nums[l], nums[r]);
                l++;
                r--;
            }

            if (nums[l] >= nums[pivot]) {
                l++;
            }

            if (nums[r] <= nums[pivot]) {
                r--;
            }
        }
        swap(nums[r], nums[pivot]);
        return r;
    }

    int findKthLargest(vector<int>& nums, int k) {
        int left = 0, right = nums.size() - 1, kth;
        while (true) {
            int idx = getPartitionIndex(nums, left, right);

            if (idx == k - 1) {
                kth = nums[idx];
                break;
            } else if (idx < k - 1) {
                left = idx + 1;
            } else {
                right = idx - 1;
            }
        }
        return kth;
    }
};

```

---

### ✅ **2️⃣ Solution 2: Kth Largest Using Max Heap**

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int> pq;

        for (int i = 0; i < nums.size(); i++) {
            pq.push(nums[i]);
        }

        while (k > 1) {
            pq.pop();
            k--;
        }

        return pq.top();
    }
};

```

---

### ✅ **3️⃣ Solution 3: Kth Smallest Using Quickselect**

```cpp
class Solution {
public:
    int getPartitionIndex(vector<int>& nums, int left, int right) {
        int pivot = left;
        int l = left + 1;
        int r = right;

        while (l <= r) {
            if (nums[l] > nums[pivot] && nums[r] < nums[pivot]) {
                swap(nums[l], nums[r]);
                l++;
                r--;
            }

            if (nums[l] <= nums[pivot]) {
                l++;
            }

            if (nums[r] >= nums[pivot]) {
                r--;
            }
        }
        swap(nums[r], nums[pivot]);
        return r;
    }

    int findKthSmallest(vector<int>& nums, int k) {
        int left = 0, right = nums.size() - 1, kth;
        while (true) {
            int idx = getPartitionIndex(nums, left, right);

            if (idx == k - 1) {
                kth = nums[idx];
                break;
            } else if (idx < k - 1) {
                left = idx + 1;
            } else {
                right = idx - 1;
            }
        }
        return kth;
    }
};

```

---

### ✅ **4️⃣ Solution 4: Kth Smallest Using Min Heap**

```cpp
class Solution {
public:
    int findKthSmallest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq;

        for (int i = 0; i < nums.size(); i++) {
            pq.push(nums[i]);
        }

        while (k > 1) {
            pq.pop();
            k--;
        }

        return pq.top();
    }
};

```

---

## ✅ 📝 Structured Notes

---

### ✅ **How It Works**

- **Quickselect Approach:**
    - Partition array using pivot.
    - If partition index equals `k−1`, return element at that index.
    - Otherwise, move left or right.
- **Heap Approach:**
    - For kth largest → Max Heap.
    - For kth smallest → Min Heap.
    - Pop `k−1` times to get the kth value.

---

### 🧩 **Key Formula**

- Quickselect Partition Logic:
    - For Kth Largest → `arr[left]` as pivot, arrange larger left side.
    - For Kth Smallest → arrange smaller left side.
- Heap Logic:
    - Push all elements and pop `k−1` times.

---

### ⏱️ **Time & Space Complexity**

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Quickselect | Average O(N), Worst O(N²) | O(1) |
| Max/Min Heap | O(N + K log N) | O(N) |

---

### ⚠️ **Edge Cases**

- `k = 1` → Smallest or largest element.
- `k = nums.size()` → Largest or smallest.
- Duplicates in array.

---

### 💡 **Other Approaches**

- C++ `nth_element` STL function → Average O(N).
- Full sort → O(N log N) (less efficient than Quickselect).

---

### 🔁 **Related Problems**

- LeetCode 215: Kth Largest Element in an Array
- LeetCode 703: Kth Largest Element in a Stream
- LeetCode 347: Top K Frequent Elements

---