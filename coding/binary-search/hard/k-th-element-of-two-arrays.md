---
title: K-th element of two Arrays
description: ""
tags:
  - binary-search
  - hard
---

### Problem Statement:

Given two sorted arrays **a[]** and **b[]** and an element **k**, the task is to find the element that would be at the **kth** position of the combined sorted array.

- Example:
    
    **Examples :**
    
    ```
    Input:a[] = [2, 3, 6, 7, 9], b[] = [1, 4, 8, 10], k = 5
    Output:6
    Explanation:The final combined sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.
    
    ```
    
    ```
    Input: a[] = [1, 4, 8, 10, 12], b[] = [5, 7, 11, 15, 17], k = 6
    Output:10
    Explanation:Combined sorted array is [1, 4, 5, 7, 8, 10, 11, 12, 15, 17]. The 6th element of this array is 10.
    ```
    

---

## Solution: Binary Search Partition (Median of Two Sorted Arrays style)

```cpp
class Solution {
  public:
    int kthElement(vector<int> &a, vector<int> &b, int k) {
        int n = a.size();
        int m = b.size();

        // Ensure binary search on smaller array
        if(n > m){
            return kthElement(b, a, k);
        }

        // Search range for elements taken from a[]
        int low = max(0, k - m);
        int high = min(k, n);

        while(low <= high){
            int mid1 = (low + high) / 2;   // elements from a
            int mid2 = k - mid1;           // elements from b

            // Left and right partition boundaries
            int l1 = (mid1 == 0) ? INT_MIN : a[mid1-1];
            int r1 = (mid1 == n) ? INT_MAX : a[mid1];

            int l2 = (mid2 == 0) ? INT_MIN : b[mid2-1];
            int r2 = (mid2 == m) ? INT_MAX : b[mid2];

            // Check valid partition
            if(l1 <= r2 && l2 <= r1){
                return max(l1, l2);
            }

            // Too many elements taken from a → move left
            if(l1 > r2){
                high = mid1 - 1;
            }
            // Too few elements taken from a → move right
            else{
                low = mid1 + 1;
            }
        }
        return 0; // Should never reach here
    }
};

```

---

## 📝 How It Works

- We need the **k-th smallest element** from two sorted arrays.
- Idea: Use **binary search on the partition size of the smaller array** (`a`).
- Split arrays so that total elements in left partition = `k`.
- Compare boundaries:
    - `l1 = last element of a's left`
    - `l2 = last element of b's left`
    - `r1 = first element of a's right`
    - `r2 = first element of b's right`
- If partition valid (`l1 ≤ r2 && l2 ≤ r1`), the k-th element is `max(l1, l2)`.
- Else, adjust search range:
    - If `l1 > r2` → move left.
    - Else → move right.

---

## 🧩 Key Formula / Recurrence

- Partition condition:
    $$
    l1 \leq r2 \quad \text{and} \quad l2 \leq r1
    $$
- Answer:
    $$
    kth element=max⁡(l1,l2)\text{kth element} = \max(l1, l2)
    $$
    

---

## ⏱️ Time & Space Complexity

- **Time**: O(log(min(n, m))) (binary search on smaller array).
- **Space**: O(1).

---

## ⚠️ Edge Cases

- k = 1 → return `min(a[0], b[0])`.
- k = n+m → return `max(a[n-1], b[m-1])`.
- One array empty → kth element comes directly from other array.

---

## 💡 Other Approaches

1. **Merge-based (like merge sort)** → O(k), simple but not optimal.
2. **Heap approach** → O(k log n), also slower.
3. **Binary Search Partition (this approach)** ✅ Best: O(log(min(n, m))).

---

## 🔁 Related Problems

- Median of Two Sorted Arrays (LeetCode 4)
- Kth Smallest Element in Sorted Matrix (LeetCode 378)
- Find K Pairs with Smallest Sums (LeetCode 373)

---