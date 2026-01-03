---
title: Sort a Stack using recursion
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

Given a stack, the task is to sort it such that the top of the stack has the greatest element.

- Example:
    
    ```
    Example 1:
    
    Input:
    Stack: 3 2 1
    Output: 3 2 1
    Example 2:
    
    Input:
    Stack: 11 2 32 3 41
    Output: 41 32 11 3 2
    ```
    

---

---

### Solution:

```cpp
// Helper function to insert an element x into a sorted stack
void sortedStack(stack<int> &s, int x) {
    // Base: insert if stack is empty or x is larger than top
    if (s.empty() || x > s.top()) {
        s.push(x);
        return;
    }

    // Pop top element to place x correctly
    int temp = s.top();
    s.pop();

    sortedStack(s, x);  // Recursive call to insert x in correct place
    s.push(temp);       // Push back the popped element
}

// Main recursive sort function
void SortedStack::sort() {
    if (!s.empty()) {
        int x = s.top();  // Remove top
        s.pop();

        sort();           // Sort remaining stack recursively
        sortedStack(s, x); // Insert popped element at correct place
    }
}

```

---

### ✅ **How It Works**

- Use **two recursive functions**:
    1. `sort()` – removes all elements recursively
    2. `sortedStack(s, x)` – inserts each popped element back in sorted order
- Idea:
    - Pop all elements → sort smaller stack recursively
    - Insert each popped element back at correct position using recursion

---

### 🧠 **Key Points**

- Works by simulating insertion sort logic using **function call stack**
- `sortedStack()` places `x` at correct position by popping larger elements
- No need for any **extra stack or array**
- Base condition:
    - `sortedStack()`: insert if stack is empty or `x > s.top()`
    - `sort()`: stop if stack is empty

---

### ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| Time | O(n²) |
| Space | O(n) (recursion stack) |

---

### ⚠️ **Edge Cases**

- Empty stack → no operation needed
- Stack already sorted → function still works correctly
- All identical elements → no unnecessary swaps

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Recursion Only ✅ | O(n²) | O(n) |
| Use temp stack (iterative) | O(n log n) or O(n²) | O(n) |

---

### 🔁 **Related Problems**

- Insert element in sorted stack
- Reverse a stack using recursion
- Sort queue using recursion