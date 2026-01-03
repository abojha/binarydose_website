---
title: Maximum Product Subarray in an Array
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an array that contains both negative and positive integers, find the maximum product subarray.

- Example:
    
    ```
    Example 1:
    Input:
     Nums = [1,2,3,4,5,0]
    Output:
     120
    Explanation:
     In the given array, we can see 1×2×3×4×5 gives maximum product value.
    
    Example 2:
    Input:
     Nums = [1,2,-3,0,-4,-5]
    Output:
     20
    Explanation:
     In the given array, we can see (-4)×(-5) gives maximum product value.
    ```
    

---

---

---

## ✅ Solution 1: Dynamic Programming (Track Min and Max Products)

```cpp
int maxProduct(vector<int>& numbers) {
    int overallMaxProduct = numbers[0];

    int maxEndingHere = numbers[0]; // Tracks max product till current index
    int minEndingHere = numbers[0]; // Tracks min product till current index (important for negatives)

    for (int i = 1; i < numbers.size(); i++) {
        int current = numbers[i];

        // Temporarily store max because maxEndingHere will change
        int tempMax = max({current, maxEndingHere * current, minEndingHere * current});
        minEndingHere = min({current, maxEndingHere * current, minEndingHere * current});
        maxEndingHere = tempMax;

        overallMaxProduct = max(overallMaxProduct, maxEndingHere);
    }

    return overallMaxProduct;
}

```

---

## ✅ Solution 2: Prefix & Suffix Traversal (Handles zeros & negatives)

```cpp
int maxProductSubArray(vector<int>& array) {
    int size = array.size();
    int maxProduct = INT_MIN;
    int prefixProduct = 1, suffixProduct = 1;

    for (int i = 0; i < size; i++) {
        if (prefixProduct == 0) prefixProduct = 1;
        if (suffixProduct == 0) suffixProduct = 1;

        prefixProduct *= array[i];             // Forward pass
        suffixProduct *= array[size - 1 - i];  // Backward pass

        maxProduct = max(maxProduct, max(prefixProduct, suffixProduct));
    }

    return maxProduct;
}

```

---

## 📝 How It Works

### 🔹 DP Approach (Solution 1)

- Similar to Kadane’s but handles **negatives** and **zeros**.
- At each step, you track both:
    - `maxEndingHere`: maximum product ending at index `i`
    - `minEndingHere`: minimum product (important if current number is negative)
- The product can flip sign due to a negative, so you must track both.

### 🔹 Prefix-Suffix Traversal (Solution 2)

- Traverse left to right (prefix) and right to left (suffix).
- Resets prefix/suffix when product becomes 0 (handles zeros cleanly).
- Takes the max of all prefix and suffix values.

---

## 🧩 Key Logic / Transition

**For DP version:**

```
maxEndingHere = max(current, maxEndingHere * current, minEndingHere * current)
minEndingHere = min(current, maxEndingHere * current, minEndingHere * current)

```

**For Prefix/Suffix version:**

```
prefixProduct *= array[i]
suffixProduct *= array[n-1-i]
reset to 1 if product becomes 0

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| DP (min & max track) | O(n) | O(1) |
| Prefix/Suffix | O(n) | O(1) |

---

## ⚠️ Edge Cases

- Zeros in array → resets the product (handled properly)
- All negative numbers → works due to min/max tracking
- Single element → both approaches return it
- Mixed signs → handled correctly

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(n²) | O(1) | Too slow |
| Kadane-style (this) | O(n) | O(1) | ✅ Best and optimal |
| Prefix/Suffix Scan | O(n) | O(1) | ✅ Simple, works well with 0s |

---

## 🔁 Related Problems

- [Leetcode 152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [Leetcode 53. Maximum Subarray (Kadane's)](https://leetcode.com/problems/maximum-subarray/)
- [Leetcode 918. Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/)