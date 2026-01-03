---
title: Length of the longest subarray with zero Sum
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array containing both positive and negative integers, we have to find the length of the longest subarray with the sum of all elements equal to zero.

- Example:
    
    ```
    Example 1:
    Input Format: N = 6, array[] = {9, -3, 3, -1, 6, -5}
    Result: 5
    Explanation: The following subarrays sum to zero:
    {-3, 3} , {-1, 6, -5}, {-3, 3, -1, 6, -5}
    Since we require the length of the longest subarray, our answer is 5!
    
    Example 2:
    Input Format: N = 8, array[] = {6, -2, 2, -8, 1, 7, 4, -10}
    Result: 8
    Subarrays with sum 0 : {-2, 2}, {-8, 1, 7}, {-2, 2, -8, 1, 7}, {6, -2, 2, -8, 1, 7, 4, -10}
    Length of longest subarray = 8
    
    Example 3:
    Input Format: N = 3, array[] = {1, 0, -5}
    Result: 1
    Subarray : {0}
    Length of longest subarray = 1
    
    Example 4:
    Input Format: N = 5, array[] = {1, 3, -5, 6, -2}
    Result: 0
    Subarray: There is no subarray that sums to zero
    ```
    

---

---

### Solution:

```cpp
int maxLen(vector<int>& arr) {
    int maxi = 0;
    int sum = 0;
    map<int, int> mpp;

    for(int i = 0; i < arr.size(); i++) {
        sum += arr[i];

        // If the sum becomes zero, update max length
        if(sum == 0) {
            maxi = max(maxi, i + 1);
        }

        // If this sum was seen before, subarray between indices has sum 0
        if(mpp.find(sum) != mpp.end()) {
            maxi = max(maxi, i - mpp[sum]);
        }
        else {
            mpp[sum] = i;  // Store first occurrence only
        }
    }
    return maxi;
}

```

---

### ✅ **How It Works**

- Maintain a prefix sum while traversing.
- If sum repeats, it means subarray in between has sum `0`.
- Use a hash map to store **first index** of each prefix sum.

---

### 🧠 **Key Points**

- If sum becomes 0 at any index `i`, then subarray from `0 to i` is valid.
- Only store the **first occurrence** of a prefix sum in the map.

---

### ⏱️ **Time and Space**

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(n) |

---

### ⚠️ **Edge Cases**

- All elements are 0 → entire array is the answer.
- No subarray exists → return 0.

---

### 💡 **Other Related Approaches**

| Approach | Time |
| --- | --- |
| Brute force (2 loops) | O(n²) |
| Prefix sum + HashMap ✅ | O(n) |

---

### 🔁 **Related Problems**

- Subarray with Given Sum (Positive Numbers)
- Subarray with Given Sum (Can be Negative)
- Longest Subarray with Given Sum K