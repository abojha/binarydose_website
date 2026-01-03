---
title: Inserting a Node in Linked List
description: ""
tags:
  - easy
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

### 🧩 Insert at Head

```cpp
SinglyLinkedListNode* insertNodeAtHead(SinglyLinkedListNode* llist, int data) {
    // Create a new node with given data
    SinglyLinkedListNode *temp = new SinglyLinkedListNode(data);

    // Point new node to current head
    temp->next = llist;

    // New node becomes the new head
    return temp;
}

```

---

### 🧩 Insert at Tail

```cpp
SinglyLinkedListNode* insertNodeAtTail(SinglyLinkedListNode* head, int data) {
    // Create a new node
    SinglyLinkedListNode *temp = new SinglyLinkedListNode(data);

    // If list is empty, return new node as head
    if(head == NULL){
        return temp;
    }

    // Traverse to the last node
    SinglyLinkedListNode *curr = head;
    while(curr->next != NULL){
        curr = curr->next;
    }

    // Attach new node at the end
    curr->next = temp;

    return head;
}

```

---

### 🧩 Insert at Given Position (0-based index)

```cpp
SinglyLinkedListNode* insertNodeAtPosition(SinglyLinkedListNode* llist, int data, int position) {
    // Create new node
    SinglyLinkedListNode *temp = new SinglyLinkedListNode(data);

    // Special case: inserting at head
    if(position == 0){
        temp->next = llist;
        return temp;
    }

    // Traverse to position - 1
    SinglyLinkedListNode *curr = llist;
    int count = 0;
    while(count + 1 != position){
        curr = curr->next;
        count++;
    }

    // Insert node at position
    temp->next = curr->next;
    curr->next = temp;

    return llist;
}

```

---

## 📝 How It Works

- **Insert at Head**: Attach the new node before the current head.
- **Insert at Tail**: Traverse to the end and attach the new node.
- **Insert at Position**: Traverse to the node just before the given index and update pointers.

---

## 🧩 Key Logic

- Head Insertion: `temp->next = llist;`
- Tail Insertion: Traverse until `curr->next == NULL`
- Position Insertion: Stop at position - 1, link the node in between.

---

## ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Insert at Head | O(1) | O(1) |
| Insert at Tail | O(N) | O(1) |
| Insert at Position | O(P) | O(1) |

Where `P` is the position index.

---

## ⚠️ Edge Cases

- Insert at position 0 → handle as head insertion.
- Insertion into an empty list.
- Position out of bounds → should be validated in real-world code (not done here).

---

## 💡 Other Approaches

| Alternative | When to Use |
| --- | --- |
| Use dummy head node | Simplifies insertion/deletion logic |
| Doubly Linked List | If backward traversal is needed |
| Circular List | When list loops back to head |

---

## 🔁 Related Problems

- Reverse a Linked List
- Delete Node at Given Position
- Detect Cycle in Linked List
- Merge Two Sorted Linked Lists