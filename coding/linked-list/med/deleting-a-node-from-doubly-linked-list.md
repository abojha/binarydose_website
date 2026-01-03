---
title: Deleting a Node from Doubly Linked List
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

## ✅ **Solution: Delete at Head**

```cpp
Node* deleteHead(Node* head) {
    if(head == nullptr) return nullptr;

    Node* temp = head;
    head = head->next;

    if(head != nullptr)
        head->prev = nullptr;

    delete temp;
    return head;
}

```

---

## ✅ **Solution: Delete at Tail**

```cpp
Node* deleteTail(Node* head) {
    if(head == nullptr) return nullptr;
    if(head->next == nullptr) { // only one node
        delete head;
        return nullptr;
    }

    Node* temp = head;
    while(temp->next != nullptr)
        temp = temp->next;

    temp->prev->next = nullptr;
    delete temp;
    return head;
}

```

---

## ✅ **Solution: Delete at a Given Position (0-based index)**

```cpp
Node* deleteAtPosition(Node* head, int pos) {
    if(head == nullptr) return nullptr;

    if(pos == 0) return deleteHead(head);

    Node* temp = head;
    int count = 0;

    while(temp != nullptr && count < pos) {
        temp = temp->next;
        count++;
    }

    if(temp == nullptr) return head; // position out of bounds

    if(temp->prev != nullptr)
        temp->prev->next = temp->next;

    if(temp->next != nullptr)
        temp->next->prev = temp->prev;

    delete temp;
    return head;
}

```

---

## 📝 **How It Works**

- **At Head**: Move head pointer to next node, delete the old head, and update new head’s `prev` to `nullptr`.
- **At Tail**: Traverse to last node, update its previous node’s `next` to `nullptr`, and delete it.
- **At Position**: Traverse to the required index, update surrounding node pointers to skip it, then delete.

---

## 🧩 **Key Pointer Adjustments**

- At middle position:
    
    ```cpp
    temp->prev->next = temp->next;
    temp->next->prev = temp->prev;
    
    ```
    

---

## ⏱️ **Time & Space Complexity**

| Operation | Time | Space |
| --- | --- | --- |
| Delete at Head | O(1) | O(1) |
| Delete at Tail | O(N) | O(1) |
| Delete at Position | O(N) | O(1) |

---

## ⚠️ **Edge Cases**

- Deleting from empty list
- Deleting the only node (head becomes `nullptr`)
- Deleting first node (`head` must be updated)
- Invalid position (position ≥ length) — do nothing

---

## 💡 **Other Approaches**

- Use a dummy head to simplify deletion logic
- Track tail pointer separately to make tail deletion O(1)
- Maintain a count of nodes to validate positions faster

---

## 🔁 **Related Problems**

- Delete N-th node from end (LL variant)
- LRU Cache (involves DLL deletion/insertion)
- Flatten multilevel doubly linked list
- Reversing a doubly linked list

---