---
title: Find Duplicate in array of N+1 number
description: ""
tags:
  - array
  - med
---

For example:

### Problem Statement:

You are given an array ‘ARR’ of size ‘N’ containing each number between 1 and ‘N’ - 1 at least once. There is a single integer value that is present in the array twice. Your task is to find the duplicate integer value present in the array.

- Example:
    
    ```
    Consider ARR = [1, 2, 3, 4, 4], the duplicate integer value present in the array is 4. Hence, the answer is 4 in this case.
    ```
    

---

## Solution: Floyd’s Tortoise and Hare (Cycle Detection)

```cpp
#include <bits/stdc++.h>
using namespace std;

int findDuplicate(vector<int> &arr)
{
    int n = arr.size();

    // Step 1: Initialize both pointers
    int slow = arr[0];
    int fast = arr[0];

    // Step 2: Move slow pointer by 1 step and fast pointer by 2 steps until they meet
    do {
        slow = arr[slow];              // Move by 1 step
        fast = arr[arr[fast]];         // Move by 2 steps
    } while (slow != fast);

    // Step 3: Reset one pointer to start and move both at same speed
    slow = arr[0];
    while (slow != fast) {
        slow = arr[slow];
        fast = arr[fast];
    }

    // Step 4: The meeting point is the duplicate number
    return slow;
}

```

---

## 📝 How It Works

- **Idea:**
    
    Treat the array as a linked list where `arr[i]` is the "next" pointer from index `i`.
    
    Since there’s one duplicate number, the "linked list" has a cycle.
    
- **Step 1:** Use **Floyd’s Cycle Detection** to find the meeting point inside the cycle.
- **Step 2:** Reset one pointer to the start of the array.
- **Step 3:** Move both pointers one step at a time — the point where they meet is the duplicate number.

---

## 🧩 Key Formula / Recurrence

- This is not a DP problem — it’s based on the **cycle detection principle**:
    
    ```
    Slow pointer moves 1 step at a time.
    Fast pointer moves 2 steps at a time.
    Meeting point is inside the cycle.
    
    ```
    

---

## ⏱️ Time & Space Complexity

- **Time:** `O(N)` — At most two passes over the array.
- **Space:** `O(1)` — Only constant extra variables.

---

## ⚠️ Edge Cases

- Duplicate number appears more than twice (still works).
- Minimum size array (n=2) where both elements are same.
- Duplicate is at the start or end of the array.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Sorting | O(N log N) | O(1) | Loses original order |
| Hash Set | O(N) | O(N) | Uses extra space |
| Binary Search on Value Range | O(N log N) | O(1) | Uses counting to find duplicate |

---

## 🔁 Related Problems

- **LeetCode 287:** Find the Duplicate Number
- Detect cycle in a linked list
- Find starting node of loop in linked list

---