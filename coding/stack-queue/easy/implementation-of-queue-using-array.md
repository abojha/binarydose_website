---
title: Implementation of Queue using Array
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

class Queue {
private:
    int* array;
    int size;
    int front;
    int rear;

public:
    // Constructor
    Queue(int n) {
        size = n;
        array = new int[size];
        front = -1;
        rear = -1;
        cout << "Queue Created Successfully\n";
    }

    // Destructor
    ~Queue() {
        delete[] array;
        cout << "Queue Deleted Successfully\n";
    }

    // Check if queue is empty
    bool isEmpty() {
        return front == -1;
    }

    // Check if queue is full
    bool isFull() {
        return rear == size - 1;
    }

    // Enqueue operation
    void enqueue(int data) {
        if (isFull()) {
            cout << "Queue Overflow, can't insert element\n";
            return;
        }
        rear++;
        array[rear] = data;
        if (front == -1) {
            front = 0;
        }
        cout << array[rear] << " inserted successfully\n";
    }

    // Dequeue operation
    void dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow, nothing to delete\n";
            return;
        }

        int data = array[front];
        cout << data << " deleted successfully\n";

        if (front == rear) { // Reset queue when last element removed
            front = -1;
            rear = -1;
            cout << "Queue is now empty (reset state)\n";
        } else {
            front++;
        }
    }

    // Get rear element
    int rearMost() {
        if (!isEmpty()) {
            return array[rear];
        } else {
            cout << "Queue is empty\n";
            return -1;
        }
    }

    // Get front element
    int frontMost() {
        if (!isEmpty()) {
            return array[front];
        } else {
            cout << "Queue is empty\n";
            return -1;
        }
    }
};

// Driver Code
int main() {
    int n;
    cout << "Enter the size of queue:\n";
    cin >> n;

    Queue q(n);

    q.enqueue(2);
    q.enqueue(5);
    q.enqueue(6);
    q.enqueue(100);

    cout << "Rear Most: " << q.rearMost() << endl;
    cout << "Front Most: " << q.frontMost() << endl;

    q.dequeue();
    cout << "Rear Most: " << q.rearMost() << endl;
    cout << "Front Most: " << q.frontMost() << endl;

    return 0;
}

```

---

## ✅ Structured Revision Notes

---

### 📝 **How It Works**

- **Array-based Queue using Class:**
    - Maintains `front` and `rear` pointers.
    - `enqueue` → Adds element at rear.
    - `dequeue` → Removes element from front.
- **Constructor/Destructor:**
    - Automatically initializes and cleans memory using `new` and `delete`.

---

### 🧩 **Key Logic**

- **Queue Full:** `rear == size - 1`
- **Queue Empty:** `front == -1`
- **After last dequeue:** Reset both `front` and `rear` to `1`.

---

### ⏱️ **Time & Space Complexity**

| Operation | Time Complexity |
| --- | --- |
| Enqueue | O(1) |
| Dequeue | O(1) |
| Front/Rear | O(1) |

| Resource | Space Complexity |
| --- | --- |
| Array | O(N) |

---

### ⚠️ **Edge Cases**

- Dequeue on empty queue → Handled.
- Enqueue on full queue → Handled.
- Accessing front/rear on empty queue → Handled.

---

### 💡 **Other Approaches**

| Approach | Space | Notes |
| --- | --- | --- |
| Circular Array Queue | O(N) | Avoids space wastage |
| Linked List Queue | O(N) | Dynamic size |
| STL `queue<int>` | O(N) | Ready-made implementation |

---

### 🔁 **Related Problems**

- Implement Circular Queue
- Design Queue using Two Stacks (LeetCode 232)
- Design Deque

---