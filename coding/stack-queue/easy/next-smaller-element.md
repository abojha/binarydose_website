---
title: Next Smaller Element
description: ""
tags:
  - easy
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

You are given an integer array arr[ ]. For every element in the array, your task is to determine its **Next Smaller Element (NSE)**.

- The Next Smaller Element (NSE) of an element x is the first element that appears to the right of x in the array and is strictly smaller than x.
- If no such element exists, assign **1** as the NSE for that position.
- Example:
    
    ```
    Examples:
    
    Input: arr[] = [4, 8, 5, 2, 25]
    Output: [2, 5, 2, -1, -1]
    Explanation: 
    The first element smaller than 4 having index > 0 is 2.
    The first element smaller than 8 having index > 1 is 5.
    The first element smaller than 5 having index > 2 is 2.
    There are no elements smaller than 4 having index > 3.
    There are no elements smaller than 4 having index > 4.
    ```
    

---

## Solution: Monotonic Stack

```cpp
class Solution {
  public:
    vector<int> nextSmallerEle(vector<int>& arr) {
        stack<int> st;                // stack to store potential next smaller elements
        int n = arr.size();
        vector<int> res(n, -1);       // default is -1 (if no smaller element exists)

        // Traverse from right to left
        for(int i = n - 1; i >= 0; i--){
            int currNum = arr[i];

            // Pop all elements >= current (since they can't be "next smaller")
            while(!st.empty() && st.top() >= currNum){
                st.pop();
            }

            // If stack still has elements, top is the next smaller
            if(!st.empty()){
                res[i] = st.top();
            }

            // Push current number for future checks
            st.push(currNum);
        }
        return res;
    }
};

```

---

## 📝 How It Works

- The goal is to find, for each element in the array, the **next smaller element to its right**.
- A **monotonic stack** is used:
    - Traverse the array **from right to left**.
    - Maintain a stack of elements in increasing order (smallest near top).
    - While the stack has elements **greater or equal to current**, pop them (since they cannot be the next smaller for anyone).
    - If stack is not empty, its top is the **next smaller element**.
    - Push current element into stack for use by earlier elements.

---

## 🧩 Key Formula / Recurrence

For each index `i`:

```
nextSmaller[i] =
    stack.top()   if stack not empty after popping larger elements
    -1            if stack is empty

```

---

## ⏱️ Time & Space Complexity

- **Time Complexity**: `O(N)`
    - Each element is pushed and popped at most once.
- **Space Complexity**: `O(N)`
    - Stack + result array.

---

## ⚠️ Edge Cases

- Strictly increasing array → all results are `1` (no smaller to the right).
- Strictly decreasing array → each element’s next is just the next element.
- Single element array → result is `1`.

---

## 💡 Other Approaches

- **Brute Force**: For each element, scan to the right until finding a smaller element → `O(N^2)` ❌.
- **Segment Tree / RMQ**: Can be done but overkill compared to stack.

---

## 🔁 Related Problems

- **Next Greater Element** (LeetCode 496)
- **Daily Temperatures** (LeetCode 739)
- **Largest Rectangle in Histogram** (LeetCode 84) – also uses monotonic stack

---