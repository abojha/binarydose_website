---
title: Implementation of Stack using Linked List
description: ""
tags:
  - easy
  - learning
  - stack-queue
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

```cpp
#include <iostream>
using namespace std;

// Node class for stack
class Node {
public:
    int data;
    Node* next;

    Node(int value) {
        data = value;
        next = nullptr;
    }
};

// Stack class using linked list
class Stack {
private:
    Node* top;

public:
    // Constructor
    Stack() {
        top = nullptr;
    }

    // Destructor
    ~Stack() {
        while (!isEmpty()) {
            pop();
        }
    }

    // Check if stack is empty
    bool isEmpty() {
        return top == nullptr;
    }

    // Push operation
    void push(int value) {
        Node* node = new Node(value);
        node->next = top;
        top = node;
        cout << value << " pushed successfully\n";
    }

    // Pop operation
    int pop() {
        if (isEmpty()) {
            cout << "Cannot pop because of stack underflow\n";
            return -1;
        }
        int value = top->data;
        Node* temp = top;
        top = top->next;
        delete temp;
        cout << value << " popped successfully\n";
        return value;
    }

    // Peek operation (position from top, 1-based)
    void peek() {
        int pos;
        cout << "Enter the position of the element to peek: ";
        cin >> pos;

        Node* current = top;
        for (int i = 1; i < pos && current != nullptr; i++) {
            current = current->next;
        }

        if (current != nullptr) {
            cout << current->data << " is at position " << pos << " from the top\n";
        } else {
            cout << "Invalid position!\n";
        }
    }

    // Print top element
    void stackTop() {
        if (!isEmpty()) {
            cout << "The topmost element of stack is " << top->data << endl;
        } else {
            cout << "Stack is empty.\n";
        }
    }

    // Print bottom element
    void stackBottom() {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return;
        }
        Node* current = top;
        while (current->next != nullptr) {
            current = current->next;
        }
        cout << "The bottommost element of stack is " << current->data << endl;
    }
};

// Driver code
int main() {
    Stack s;

    s.push(2);
    s.push(26);
    s.push(29);

    s.peek();
    s.stackTop();
    s.stackBottom();

    s.pop();
    s.stackTop();
    s.stackBottom();

    return 0;
}

```

---

## ✅ Structured Revision Notes

---

### 📝 **How It Works**

- Converted linked list based stack from C-style struct to full C++ class:
    - Uses `Node` class for stack elements.
    - Stack management handled inside `Stack` class.
- Core methods:
    - `push(int)`
    - `pop()`
    - `peek()` — Access element at a given position from the top.
    - `stackTop()`
    - `stackBottom()`

---

### 🧩 **Key Concepts**

- **Stack Linked List Properties:**
    - Dynamic size — no fixed capacity.
- **Class Features:**
    - Constructor initializes empty stack.
    - Destructor clears memory automatically.

---

### ⏱️ **Time & Space Complexity**

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Push | O(1) | O(1) per element |
| Pop | O(1) | O(1) |
| Peek | O(pos) | O(1) |
| Top/Bottom | O(1) / O(N) | O(1) |

---

### ⚠️ **Edge Cases**

- Calling pop on an empty stack.
- Peeking an invalid position.
- Stack with only one element (top = bottom).

---

### 💡 **Other Approaches**

| Approach | Notes |
| --- | --- |
| Array-based Stack | Fixed size |
| STL `stack<int>` | Built-in class |

---

### 🔁 **Related Problems**

- Design Stack with Linked List
- Implement Stack Using Array and Linked List
- LeetCode 155: Min Stack

---