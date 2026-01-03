---
title: Length of Linked List
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

## ✅ **Solution: Iterative Traversal**

```cpp
int getLength(SinglyLinkedListNode* head) {
    int length = 0;
    SinglyLinkedListNode* current = head;

    // Traverse the list and count nodes
    while(current != nullptr) {
        length++;
        current = current->next;
    }

    return length;
}

```

---

## 📝 **How It Works**

- We start with a pointer `current` at the head.
- For every node we visit, we increment `length` by 1.
- When `current` becomes `nullptr` (end of list), we stop and return the count.

This is a simple **linear traversal** from head to tail.

---

## 🧩 **Key Logic**

There’s no recurrence or DP here — just this iterative loop:

```cpp
while(current != nullptr) {
    length++;
    current = current->next;
}

```

---

## ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| 🕒 Time | O(N), where N is the number of nodes |
| 🧠 Space | O(1), constant space |

---

## ⚠️ **Edge Cases**

- Empty list (`head == nullptr`) → Length is 0
- Single node → Length is 1

---

## 💡 **Other Approaches**

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Iterative ✅ | O(N) | O(1) | Most efficient and preferred |
| Recursive | O(N) | O(N) | Adds call stack space (not ideal) |

---

## 🔁 **Related Problems**

- Detect Length of Cycle in Linked List (Floyd’s Cycle Detection)
- Remove N-th Node from End (need length first)
- Check if Length is Even or Odd
- Reverse a Linked List

---