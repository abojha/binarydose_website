---
title: Reverse a Stack
description: ""
tags:
  - easy
  - recursion
---

### Problem Statement:

You are given a stack **St**. You have to reverse the stack using recursion.

- Example:
    
    ```
    Example 1:
    
    Input:
    St = {3,2,1,7,6}
    Output:
    {6,7,1,2,3}
    Explanation:
    Input stack after reversing will look like the stack in the output.
    Example 2:
    
    Input:
    St = {4,3,9,6}
    Output:
    {6,9,3,4}
    Explanation:
    Input stack after reversing will look like the stack in the output.
    ```
    

---

---

### Solution:

```cpp
class Solution {
  public:
    // Helper to insert an element at the bottom of the stack
    void InsertAtBottom(stack<int> &s, int x) {
        if (s.empty()) {
            s.push(x);
            return;
        }

        int temp = s.top();  // Pop top element
        s.pop();

        InsertAtBottom(s, x);  // Insert x at bottom recursively

        s.push(temp);  // Push the popped element back
    }

    // Main recursive function to reverse the stack
    void Reverse(stack<int> &St) {
        if (!St.empty()) {
            int x = St.top();
            St.pop();

            Reverse(St);  // Reverse the smaller stack
            InsertAtBottom(St, x);  // Insert removed element at bottom
        }
    }
};

```

---

### ✅ **How It Works**

- Two recursive functions are used:
    1. `Reverse()` — pops all elements to the bottom
    2. `InsertAtBottom()` — puts each element back at the **bottom**, reversing the stack
- Key idea:
    
    Pop all elements one by one
    
    and **insert each at the bottom** during backtracking
    

---

### 🧠 **Key Points**

- The call stack itself stores the popped elements
- `InsertAtBottom()` is a helper that places an element at the bottom of the stack recursively
- Recursive base:
    - For `Reverse`: stop when stack is empty
    - For `InsertAtBottom`: insert when stack becomes empty

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n²) ✅ |
| Space | O(n) recursion |

---

### ⚠️ **Edge Cases**

- Empty stack → no change
- Single element stack → remains same
- All elements same → order doesn't matter but works

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Recursion ✅ | O(n²) | O(n) |
| Iterative (with extra stack) | O(n) | O(n) |

---

### 🔁 **Related Problems**

- Sort a Stack using Recursion
- Insert element at bottom of stack
- Design Stack with Min/Max
- Implement Stack using Queue