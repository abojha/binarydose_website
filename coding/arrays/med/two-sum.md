---
title: Two Sum
description: ""
tags:
  - array
  - med
---

import AlgoDoseCallout from '@site/src/components/AlgoDose/AlgoDoseCallout';

<AlgoDoseCallout
  algoId="two_sum"
  title="Two Sum (Two Pointers)"
  description="Watch the left and right pointers converge, inspect sum comparisons, and step through the logic in real-time."
/>

### Problem Statement:

Given an array of integers arr[] and an integer target.

**1st variant:** Return **YES** if there exist two numbers such that their sum is equal to the target. Otherwise, return **NO.**

**2nd variant:** Return indices of the two numbers such that their sum is equal to the target. Otherwise, we will return {-1, -1}.

**Note:** You are not allowed to use the same element twice. Example: If the target is equal to 6 and num[1] = 3, then nums[1] + nums[1] = target is not a solution.

```
Example 1:
Input Format: N = 5, arr[] = {2,6,5,8,11}, target = 14
Result: YES (for 1st variant)
       [1, 3] (for 2nd variant)
Explanation: arr[1] + arr[3] = 14. So, the answer is “YES” for the first variant and [1, 3] for 2nd variant.

Example 2:
Input Format: N = 5, arr[] = {2,6,5,8,11}, target = 15
Result: NO (for 1st variant)
	[-1, -1] (for 2nd variant)
Explanation: There exist no such two numbers whose sum is equal to the target
```

---

---

## ✅ Solution 1: Hash Map Approach (Returns indices — LeetCode style)

```cpp
vector<int> twoSum(vector<int>& numbers, int targetSum) {
    unordered_map<int, int> numberToIndex;
    vector<int> result;

    for (int currentIndex = 0; currentIndex < numbers.size(); currentIndex++) {
        int complement = targetSum - numbers[currentIndex];

        // Check if the complement exists in the map
        if (numberToIndex.find(complement) != numberToIndex.end()) {
            result.push_back(numberToIndex[complement]); // index of complement
            result.push_back(currentIndex);              // current index
            break; // Only one valid pair exists
        }

        // Store the current number with its index
        numberToIndex[numbers[currentIndex]] = currentIndex;
    }

    return result;
}

```

---

## ✅ Solution 2: Two Pointer Approach (Returns "YES"/"NO" — GFG style)

```cpp
string twoSum(int size, vector<int>& numbers, int targetSum) {
    sort(numbers.begin(), numbers.end()); // Sort for two-pointer approach
    int left = 0, right = size - 1;

    while (left < right) {
        int currentSum = numbers[left] + numbers[right];

        if (currentSum == targetSum) return "YES";
        else if (currentSum < targetSum) left++;  // Need a larger sum
        else right--;                             // Need a smaller sum
    }

    return "NO"; // No such pair found
}

```

---

## 📝 How It Works

### 🔹 Hash Map Version

- For every number, calculate its complement: `target - number`.
- If the complement exists in the hash map, return their indices.
- This version **preserves original indices** and works on **unsorted arrays**.

### 🔹 Two Pointer Version

- Sort the array first.
- Use two pointers (`left` and `right`) to find a pair that sums to the target.
- If sum < target, move `left` to increase sum; if sum > target, move `right` to decrease sum.
- This version is used when only the **existence** of a pair is required.

---

## 🧩 Key Formula

- Hash Map:
    
    `map[target - nums[i]] exists? → found the pair`
    
- Two Pointer (sorted):
    
    `if nums[left] + nums[right] == target → found the pair`
    

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space | Works with negative numbers |
| --- | --- | --- | --- |
| Hash Map | O(n) | O(n) | ✅ Yes |
| Two Pointer | O(n log n) | O(1) | ✅ Yes |

---

## ⚠️ Edge Cases

- No such pair → returns `[]` or `"NO"`
- Repeated numbers → both methods work
- Negative numbers → both methods support them
- Pair is made of the same number (e.g., 2+2 = 4) → works if there are **two** such numbers

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Brute Force | O(n²) | Too slow for large inputs ❌ |
| Hash Map (optimized) | O(n) | ✅ Best for index return |
| Two Pointer | O(n log n) | ✅ Best for "YES/NO" only check |

---

## 🔁 Related Problems

- [Leetcode 1. Two Sum](https://leetcode.com/problems/two-sum/)
- [GFG: Key Pair](https://www.geeksforgeeks.org/problems/key-pair5616/1)
- [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [3Sum](https://leetcode.com/problems/3sum/)