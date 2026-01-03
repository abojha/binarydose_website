---
title: Implement Stack using Single Queue
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
    
    **Example 1:**
    
    ```
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

## Solution: Using **1 Queue** (Rotation Trick)

```cpp
class MyStack {
public:
    queue<int> q;

    // Constructor
    MyStack() {}

    // Push element onto stack
    void push(int x) {
        int sizeBeforePush = q.size();
        q.push(x); // add new element at the end

        // Rotate the queue to bring the new element at the front
        for (int i = 0; i < sizeBeforePush; i++) {
            q.push(q.front());
            q.pop();
        }
    }

    // Removes the element on top of the stack
    int pop() {
        if (this->empty()) return -1;
        int element = q.front();
        q.pop();
        return element;
    }

    // Get the top element
    int top() {
        return q.front();
    }

    // Check if stack is empty
    bool empty() {
        return q.empty();
    }
};

```

---

## 📝 How It Works

- We are **implementing a stack (LIFO)** using just **one queue**.
- **Push(x):**
    - Insert `x` into the queue.
    - Rotate all existing elements behind it, so the newest element always comes to the **front**.
    - This ensures stack order is preserved.
- **Pop():**
    - Simply remove from `q.front()` (since the top element is always at front).
- **Top():**
    - Return `q.front()` without removing it.
- **Empty():**
    - Check if queue is empty.

👉 Key trick: Each push makes sure the most recent element becomes the new "top".

---

## 🧩 Key Formula / Recurrence

- For push operation:
    
    ```
    q.push(x)
    for i in [1...sizeBeforePush]:
        q.push(q.front())
        q.pop()
    
    ```
    
- Ensures **stack top is always at queue front**.

---

## ⏱️ Time & Space Complexity

- **Push**: O(n) (rotation for each push)
- **Pop**: O(1) (just pop front)
- **Top**: O(1)
- **Empty**: O(1)
- **Space**: O(n) (queue stores all elements)

---

## ⚠️ Edge Cases

- `pop()` on empty stack → returns `1` in this code (can also throw exception).
- `top()` on empty stack → undefined behavior (should check empty first).
- Multiple consecutive pushes → rotation ensures order is always preserved.

---

## 💡 Other Approaches

1. **Two Queues Method**
    - Use one queue for push, another for rearranging.
    - Simpler rotation but needs O(2n) space.
2. **Deque**
    - Using deque directly simulates stack easily (but defeats the challenge).
3. **Linked List**
    - Implement a stack directly without queues (baseline solution).

---

## 🔁 Related Problems

- Implement Queue using Stacks (LeetCode 232)
- Design Circular Queue (LeetCode 622)
- Min Stack (LeetCode 155)

---