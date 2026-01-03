---
title: Min Stack
description: ""
tags:
  - learning
  - med
  - stack-queue
---

### Problem Statement:

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

- Example:
    
    ```
    Example 1:
    
    Input
    ["MinStack","push","push","push","getMin","pop","top","getMin"]
    [[],[-2],[0],[-3],[],[],[],[]]
    
    Output
    [null,null,null,null,-3,null,0,-2]
    
    Explanation
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin(); // return -3
    minStack.pop();
    minStack.top();    // return 0
    minStack.getMin(); // return -2
    ```
    

---

---

## ✅ Solution: Stack with Auxiliary Min-Stack

```cpp
class MinStack {
public:
    stack<int> st;      // Main stack
    stack<int> min_st;  // Stack to keep track of minimum elements

    MinStack() {}

    void push(int val) {
        st.push(val);
        if(min_st.empty() || val <= min_st.top()) {
            min_st.push(val);
        }
    }

    void pop() {
        if(st.top() == min_st.top()) {
            min_st.pop();
        }
        st.pop();
    }

    int top() {
        return st.top();
    }

    int getMin() {
        if(min_st.empty()) return -1;
        return min_st.top();
    }
};

```

---

### 📝 How It Works

- **Goal:** Implement a stack that supports push, pop, top, and getMin in O(1) time.
- **Approach:**
    - Use two stacks:
        - `st`: Holds all elements.
        - `min_st`: Holds the minimum value **at or below each level** in `st`.
    - When pushing:
        - Push into `min_st` if it’s empty or the new value is less than or equal to the current minimum.
    - When popping:
        - If the popped element is also the current minimum, pop from both stacks.
    - `getMin()` simply returns the top of `min_st`.
- **Why It Works:**
    
    By storing historical minimums, we can always access the current minimum in O(1) without scanning the entire stack.
    

---

### 🧩 Key Formula / Recurrence

- **Push Condition:**
    
    If `min_st.empty() || val <= min_st.top()` → push `val` into `min_st`.
    
- **Pop Condition:**
    
    If `st.top() == min_st.top()` → pop both `st` and `min_st`.
    

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| push(x) | O(1) | O(N) |
| pop() | O(1) | O(N) |
| top() | O(1) | O(1) |
| getMin() | O(1) | O(1) |
- N = number of elements pushed.

---

### ⚠️ Edge Cases

- Popping from an empty stack: Depends on problem constraints, usually handled by platform checks.
- Multiple duplicate minimum values: All are stored in `min_st` until they’re removed.
- Calling `getMin()` on an empty stack: Returns `1` here, which is a guard value.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Two Stacks (This Method) | O(1) for all ops ✅ |
| Single Stack with Pairs | O(1), more memory use |
| Array + Manual Min Tracking | Slower, O(N) for getMin ❌ |

---

### 🔁 Related Problems

- **LeetCode 155:** Min Stack (Exact Same)
- **LeetCode 716:** Max Stack (similar logic but for max instead of min)
- **GFG:** Get Minimum Element from Stack

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:** Tracking minimum prices in a stack of receipts or products.
- ✅ **Interview Tip:** Mention using auxiliary data structures like `min_st` when asked how to support extra operations on basic data types.