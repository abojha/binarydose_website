---
title: Replace elements by its rank in the array
description: ""
tags:
  - easy
  - heaps
---

### Problem Statement:

Given an array **arr** of **N** integers, the task is to replace each element of the array by its rank in the array. The **rank** of an element is defined as the distance between the element with the first element of the array when the array is arranged in ascending order. If two or more are same in the array then their rank is also the same as the rank of the first occurrence of the element. 

- Example:
    
    ```
    Example 1:
    
    Input:
    N = 6
    arr = [20, 15, 26, 2, 98, 6]
    Output:
    4, 3, 5, 1, 6, 2
    Explanation:
    After sorting, array becomes {2,6,15,20,26,98}
    Rank(2) = 1 (at index 0) 
    Rank(6) = 2 (at index 1) 
    Rank(15) = 3 (at index 2) 
    Rank(20) = 4 (at index 3) and so on..
    Example 2:
    
    Input:
    N = 4
    arr = [2, 2, 1, 6]
    Output:
    2, 2, 1, 3
    Explanation:
    After sorting, array becomes {1, 2, 2, 6}
    Rank(1) = 1 (at index 0) 
    Rank(2) = 2 (at index 1) 
    Rank(2) = 2 (at index 2) 
    Rank(6) = 3 (at index 3)
    Rank(6) = 3 because rank after 2 is 3 as rank 
    of same element remains same and for next element 
    increases by 1.
    ```
    

---

## ✅ Solution: Replace Elements with Their Ranks Using Map + Set

```cpp
vector<int> replaceWithRank(vector<int> &arr, int N) {
    // Step 1: Store unique elements in a sorted set
    set<int> uniqueElements(arr.begin(), arr.end());

    // Step 2: Assign ranks using map
    map<int, int> rankMap;
    int rank = 1;
    for (auto ele : uniqueElements) {
        rankMap[ele] = rank++;
    }

    // Step 3: Replace original elements with their rank
    vector<int> res(N);
    for (int i = 0; i < N; i++) {
        res[i] = rankMap[arr[i]];
    }

    return res;
}

```

---

## ✅ Required Notes Template

---

## 📝 **How It Works**

- **Problem:** Replace each element in an array with its rank based on sorted order (smallest → rank 1).
- **Steps:**
    1. Collect all unique elements in a set (auto-sorted).
    2. Assign incremental ranks using a map.
    3. Loop through the original array and replace each element using the rank map.

---

## 🧩 **Key Formula**

- Rank is assigned as:
    
    `rankMap[sorted unique value] = rank++`
    
- **Set** ensures sorting and uniqueness automatically.

---

## ⏱️ **Time & Space Complexity**

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) |
- `set` + `map` insertions = O(log N) per element.
- Overall O(N log N) where N = array size.

---

## ⚠️ **Edge Cases**

- Duplicate elements → Same rank assigned.
- Already sorted array → Ranks = indices + 1.
- Array with all same elements → All ranks = 1.

---

## 💡 **Other Approaches**

| Approach | Time Complexity |
| --- | --- |
| Sorting + Map | O(N log N) |
| Coordinate Compression (using vector + sort + map) | O(N log N) |

Both are similar in logic to coordinate compression techniques.

---

## 🔁 **Related Problems**

- Coordinate Compression in Competitive Programming
- LeetCode 1331: Rank Transform of an Array
- Frequency-based Array Manipulations

---