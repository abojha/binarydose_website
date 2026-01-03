---
title: Implement Queue using Two Stack
description: ""
tags:
  - easy
  - learning
  - stack-queue
---

### Problem Statement:

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:

- `void push(int x)` Pushes element x to the back of the queue.
- `int pop()` Removes the element from the front of the queue and returns it.
- `int peek()` Returns the element at the front of the queue.
- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
- Example:
    
    ```
    Example 1:
    
    Input
    ["MyQueue", "push", "push", "peek", "pop", "empty"]
    [[], [1], [2], [], [], []]
    Output
    [null, null, null, 1, 1, false]
    
    Explanation
    MyQueue myQueue = new MyQueue();
    myQueue.push(1); // queue is: [1]
    myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
    myQueue.peek(); // return 1
    myQueue.pop(); // return 1, queue is [2]
    myQueue.empty(); // return false
    ```
    

---

---

```cpp
class MyQueue {
public:
    stack<int> s1;  // For push operations
    stack<int> s2;  // For pop/peek operations

    MyQueue() {}

    void push(int x) {
        s1.push(x);
    }

    int pop() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        if (s2.empty()) return -1;  // Queue is empty
        int n = s2.top();
        s2.pop();
        return n;
    }

    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        if (s2.empty()) return -1;  // Queue is empty
        return s2.top();
    }

    bool empty() {
        return s1.empty() && s2.empty();
    }
};

```

---

### 📝 How It Works

- **Goal:** Implement a queue using two stacks.
- **Main Idea:**
    - `s1` → Holds elements in push order.
    - `s2` → Holds elements in queue order (for pop/peek).
- **When `pop()` or `peek()` is called:**
    - If `s2` is empty, transfer all elements from `s1` to `s2`. This reverses the order and makes the front of the queue accessible at `s2.top()`.
- **Amortized Time Explanation:**
    - Each element is moved between stacks **at most once**.
    - Over multiple operations, each element contributes O(1) per operation on average.

---

### 🧩 Key Formula / Recurrence

- **Push:** `s1.push(x)` → O(1).
- **Pop:**
    - If `s2` is empty → Transfer all from `s1` → O(N).
    - Else → `s2.pop()` → O(1).
- **Peek:**
    - Same logic as pop.

---

### ⏱️ Time & Space Complexity

| Operation | Amortized Time Complexity | Space Complexity |
| --- | --- | --- |
| push(x) | O(1) | O(N) |
| pop() | O(1) (amortized) | O(N) |
| peek() | O(1) (amortized) | O(N) |
| empty() | O(1) | O(1) |
- Worst case for pop/peek is O(N), but this happens rarely due to amortization.

---

### ⚠️ Edge Cases

- Calling `pop()` or `peek()` when both `s1` and `s2` are empty → return `1` as per your implementation.
- Multiple push calls followed by multiple pop calls → stack transfer occurs only once per transfer phase.

---

### 💡 Other Approaches

| Approach | Time Complexity |
| --- | --- |
| Two Stacks (This) | Amortized O(1) per operation ✅ |
| Single Stack + Recursion | Possible but not recommended (inefficient) ❌ |
- This is the standard optimal approach used in interviews and system design.

---

### 🔁 Related Problems

- **LeetCode 232:** Implement Queue Using Stacks (Exact Same)
- **LeetCode 225:** Implement Stack Using Queues
- **GFG:** Implement Queue Using Two Stacks

---

## 🛠️ Other Notes

- **Why Two Stacks Work:**
    
    First stack `s1` holds incoming elements, second stack `s2` holds outgoing elements in reverse order, simulating queue behavior.
    
- **Real-World Analogy:** Think of a conveyor belt system with two sections — load items on one end, retrieve from the other end in first-in-first-out order.