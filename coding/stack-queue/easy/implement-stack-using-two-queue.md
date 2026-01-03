---
title: Implement Stack using Two Queue
description: ""
tags:
  - easy
  - learning
  - stack-queue
---

### Problem Statement:

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:

- `void push(int x)` Pushes element x to the top of the stack.
- `int pop()` Removes the element on the top of the stack and returns it.
- `int top()` Returns the element on the top of the stack.
- `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a queue, which means that only `push to back`, `peek/pop from front`, `size` and `is empty` operations are valid.
- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.
- Example:
    
    ```
    Example 1:
    
    Input
    ["MyStack", "push", "push", "top", "pop", "empty"]
    [[], [1], [2], [], [], []]
    Output
    [null, null, null, 2, 2, false]
    
    Explanation
    MyStack myStack = new MyStack();
    myStack.push(1);
    myStack.push(2);
    myStack.top(); // return 2
    myStack.pop(); // return 2
    myStack.empty(); // return False
    ```
    

---

---

## ✅ Solution: Implement Stack Using Two Queues (Push Costly Method)

```cpp
class MyStack {
public:
    queue<int> q1;  // Main queue holding stack elements
    queue<int> q2;  // Helper queue for rearranging

    MyStack() {}

    void push(int x) {
        q2.push(x);  // Step 1: Push into helper queue

        // Step 2: Move all elements from q1 to q2
        while(!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }

        // Step 3: Swap q1 and q2
        swap(q1, q2);
    }

    int pop() {
        if(q1.empty()) return -1;
        int n = q1.front();
        q1.pop();
        return n;
    }

    int top() {
        if(q1.empty()) return -1;
        return q1.front();
    }

    bool empty() {
        return q1.empty();
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- **Objective:** Implement a stack using two queues.
- **Approach:**
    - Maintain two queues (`q1`, `q2`).
    - **Push Operation (Costly):**
        - Push the new element into `q2`.
        - Transfer all elements from `q1` into `q2`.
        - Swap `q1` and `q2`. Now `q1` always has the newest element on top.
    - **Pop/Top Operations:**
        - Simply use `q1.front()`.
- **Why Push Costly?**
    
    This ensures stack behavior (`LIFO`) while allowing `O(1)` pop and top operations.
    

---

### 🧩 Key Formula / Recurrence

- **Push:**
    
    Time = O(N) → Transfer all elements from `q1` to `q2`.
    
- **Pop:**
    
    Time = O(1) → `q1.pop()`.
    
- **Top:**
    
    Time = O(1) → `q1.front()`.
    

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| push(x) | O(N) | O(N) |
| pop() | O(1) | O(N) |
| top() | O(1) | O(N) |
| empty() | O(1) | O(N) |
- **N = number of elements in the stack.**

---

### ⚠️ Edge Cases

- Calling `pop()` or `top()` on an empty stack → returns `1` as a guard value.
- Multiple pushes and pops in sequence → should maintain LIFO behavior.
- Large numbers of elements: Ensured by queue size capacity (no special handling required).

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Push Costly (This Method) | Push: O(N), Pop: O(1) ✅ |
| Pop Costly (Opposite) | Push: O(1), Pop: O(N) |
| Using Single Queue | Tricky, possible via rotation (Advanced topic) |
- **Push Costly vs. Pop Costly** depends on usage pattern. If pops are more frequent, prefer push costly.

---

### 🔁 Related Problems

- **LeetCode 225:** Implement Stack using Queues
- **LeetCode 232:** Implement Queue using Stacks
- **LeetCode 155:** Min Stack
- **GFG:** Implement Stack using Two Queues

---

## 🛠️ Other Notes

- ✅ **Interview Insight:** Expect to be asked how to balance between push and pop costs when implementing stacks/queues using opposite structures.
- ✅ **Real-World Example:** Browser history stack implemented using a queue structure underneath for state management.