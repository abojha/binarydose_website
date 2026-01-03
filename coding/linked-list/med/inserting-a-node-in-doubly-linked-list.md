---
title: Inserting a Node in Doubly Linked List
description: ""
tags:
  - doubly
  - linked
  - linked-list
  - list
  - med
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Solution: Insertion at Head**

```cpp
struct Node {
    int data;
    Node* prev;
    Node* next;
    Node(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};

Node* insertAtHead(Node* head, int data) {
    Node* newNode = new Node(data);
    newNode->next = head;

    if (head != nullptr)
        head->prev = newNode;

    return newNode; // New node is now head
}

```

---

## ✅ **Solution: Insertion at Tail**

```cpp
Node* insertAtTail(Node* head, int data) {
    Node* newNode = new Node(data);
    if (head == nullptr)
        return newNode;

    Node* temp = head;
    while (temp->next != nullptr)
        temp = temp->next;

    temp->next = newNode;
    newNode->prev = temp;
    return head;
}

```

---

## ✅ **Solution: Insertion at Given Position (0-based)**

```cpp
Node* insertAtPosition(Node* head, int data, int pos) {
    if (pos == 0)
        return insertAtHead(head, data);

    Node* newNode = new Node(data);
    Node* temp = head;
    int count = 0;

    while (temp != nullptr && count < pos - 1) {
        temp = temp->next;
        count++;
    }

    if (temp == nullptr) return head; // Invalid position

    newNode->next = temp->next;
    newNode->prev = temp;

    if (temp->next != nullptr)
        temp->next->prev = newNode;

    temp->next = newNode;

    return head;
}

```

---

## 📝 **How It Works**

- **At Head**: Insert the new node before current head. Update head and prev pointers.
- **At Tail**: Traverse to the last node and attach the new node after it.
- **At Position**: Traverse to the node before the desired position and insert in between, adjusting 4 pointers:
    - `newNode->next`
    - `newNode->prev`
    - `prev->next`
    - `next->prev`

---

## 🧩 **Key Pointer Updates**

- `newNode->next = prev->next`
- `newNode->prev = prev`
- `prev->next = newNode`
- `if(next) next->prev = newNode`

---

## ⏱️ **Time & Space Complexity**

| Operation | Time | Space |
| --- | --- | --- |
| At Head | O(1) | O(1) |
| At Tail | O(N) | O(1) |
| At Position | O(N) | O(1) |

---

## ⚠️ **Edge Cases**

- Insertion into empty list
- Insertion at position `0` (head)
- Insertion at position > length → should be safely handled
- Insertion at tail (when position == length)

---

## 💡 **Other Approaches**

- You can use a **dummy head** to avoid edge case checks
- Circular Doubly Linked List → requires special pointer management

---

## 🔁 **Related Problems**

- Delete node in doubly linked list
- Reverse a doubly linked list
- Flatten a multilevel doubly linked list (LeetCode)
- Implement LRU Cache using DLL

---