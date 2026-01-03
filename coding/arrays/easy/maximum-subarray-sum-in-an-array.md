---
title: Maximum Subarray Sum in an Array
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

Given an integer array arr, find the contiguous subarray (containing at least one number) which

has the largest sum and returns its sum and prints the subarray.

```
Example 1:

Input: arr = [-2,1,-3,4,-1,2,1,-5,4] 

Output: 6 

Explanation: [4,-1,2,1] has the largest sum = 6. 

Examples 2: 

Input: arr = [1] 

Output: 1 

Explanation: Array has only one element and which is giving positive sum of 1. 
```

---

---

## ✅ Solution 1: Kadane’s Algorithm (Return Max Sum Only)

```cpp
int maxSubarraySum(vector<int>& numbers) {
    int currentSum = 0;
    int maxSum = INT_MIN;

    for (int number : numbers) {
        currentSum += number;               // Add current number to running sum
        maxSum = max(maxSum, currentSum);   // Update max sum seen so far
        if (currentSum < 0)
            currentSum = 0;                 // Reset if running sum drops below 0
    }

    return maxSum;
}

```

---

## ✅ Solution 2: Kadane’s Algorithm (Return Actual Subarray)

```cpp
vector<int> maxSubarray(vector<int>& numbers) {
    int currentSum = 0;
    int maxSum = INT_MIN;
    int start = 0, tempStart = 0, end = 0;

    for (int index = 0; index < numbers.size(); index++) {
        currentSum += numbers[index];

        // Update max and indices when new max found
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = index;
        }

        // Reset the current sum and temp start index
        if (currentSum < 0) {
            currentSum = 0;
            tempStart = index + 1;
        }
    }

    // Build the result subarray from start to end
    vector<int> subarray;
    for (int i = start; i <= end; i++) {
        subarray.push_back(numbers[i]);
    }

    return subarray;
}

```

---

## 📝 How It Works

### 🔹 Kadane’s Intuition:

- You're traversing the array and maintaining a running `currentSum`.
- If `currentSum` ever drops below 0, it's reset to 0 because any future subarray would do better starting fresh.
- At each step, `maxSum` is updated with the max of itself and `currentSum`.

### 🔹 Subarray Printing Version:

- Tracks not just the max sum but also the indices (`start`, `end`) where the maximum subarray begins and ends.
- Resets the temporary start index when the sum is dropped to 0.

---

## 🧩 Key Formula

```
currentSum = max(currentSum + nums[i], nums[i])
maxSum = max(maxSum, currentSum)

```

In subarray tracking:

- Store `start` and `end` when `maxSum` is updated.
- Reset `currentSum` and `tempStart` if `currentSum` drops below 0.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱ Time | O(n) |
| 🗂 Space | O(1) for sum only, O(k) for subarray |

---

## ⚠️ Edge Cases

- All numbers negative → Kadane’s still works (initial `maxSum = INT_MIN`)
- Single element array → works fine
- Empty array → should handle as a special case (return 0 or empty vector)

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Kadane’s Algorithm | O(n) | O(1) or O(k) | ✅ Best and optimal |
| Brute Force | O(n²) | O(1) | ❌ Too slow for large inputs |

---

## 🔁 Related Problems

- [Leetcode 53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
- [Leetcode 918. Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/)
- [Leetcode 152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [GFG: Largest Sum Contiguous Subarray](https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/)

---