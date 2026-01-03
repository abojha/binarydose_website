---
title: Longest Subarray with given Sum K(Positives or Negatives)
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array and a sum k, we need to print the length of the longest subarray that sums to k.

```
Example 1:
Input Format: N = 3, k = 5, array[] = {2,3,5}
Result: 2
Explanation: The longest subarray with sum 5 is {2, 3}. And its length is 2.

Example 2:
Input Format: N = 5, k = 10, array[] = {2,3,5,1,9}
Result: 3
Explanation: The longest subarray with sum 10 is {2, 3, 5}. And its length is 3.
```

---

---

## ✅ Solution 1: Prefix Sum + HashMap (Works for positives + negatives)

```cpp
int longestSubarray(vector<int>& numbers, int targetSum) {
    unordered_map<int, int> prefixSumIndex;  // stores first occurrence of a prefix sum
    int currentSum = 0;
    int maxLength = 0;

    for (int index = 0; index < numbers.size(); index++) {
        currentSum += numbers[index];

        // Case 1: subarray from 0 to index has the required sum
        if (currentSum == targetSum)
            maxLength = index + 1;

        // Case 2: subarray from some earlier index to current gives the sum
        int remainingSum = currentSum - targetSum;
        if (prefixSumIndex.find(remainingSum) != prefixSumIndex.end()) {
            int possibleLength = index - prefixSumIndex[remainingSum];
            maxLength = max(maxLength, possibleLength);
        }

        // Store current sum only if it's not already present (we want the earliest index)
        if (prefixSumIndex.find(currentSum) == prefixSumIndex.end()) {
            prefixSumIndex[currentSum] = index;
        }
    }

    return maxLength;
}

```

---

## ✅ Solution 2: Two Pointer / Sliding Window (Works only for **positives**)

```cpp
int longestSubarray(vector<int>& numbers, int targetSum) {
    int left = 0, right = 0;
    int currentSum = 0;
    int maxLength = 0;

    while (right < numbers.size()) {
        currentSum += numbers[right];

        // Shrink window from left if sum exceeds target
        while (currentSum > targetSum && left <= right) {
            currentSum -= numbers[left];
            left++;
        }

        // If sum matches, update max length
        if (currentSum == targetSum) {
            maxLength = max(maxLength, right - left + 1);
        }

        right++;
    }

    return maxLength;
}

```

---

## 📝 How It Works

### 🔹 Prefix Sum + HashMap

- Keep track of the **cumulative sum** as you iterate.
- If `currentSum - targetSum` has occurred before, a subarray exists with sum = `targetSum`.
- Use a map to store the **first index** where each sum occurred.
- Handles **negative numbers** too.

### 🔹 Two Pointer Approach

- Works only for **positive integers**.
- Use two pointers to maintain a sliding window `[left, right]`.
- If the current window's sum is too large, move `left` forward.
- If it's equal to target, update max length.

---

## 🧩 Key Formula

- For Prefix Sum:
    
    If `prefixSum[i] - prefixSum[j] = k`, then subarray `[j+1...i]` has sum = `k`.
    

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Prefix Sum + HashMap | O(n) | O(n) |
| Two Pointer (Positives) | O(n) | O(1) |

---

## ⚠️ Edge Cases

- Empty array → return 0.
- All elements = 0 and k = 0 → handle correctly.
- For two-pointer approach:
    - ❌ Fails if negative numbers are present (may incorrectly shrink window).

---

## 💡 Other Approaches

- Brute force: Try all subarrays → O(n²) ❌
- Kadane’s variant (for max sum): not suitable for exact sum match

---

## 🔁 Related Problems

- [LC 325. Maximum Size Subarray Sum Equals k](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/)
- [LC 560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- [LC 930. Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/)
- [LC 974. Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)