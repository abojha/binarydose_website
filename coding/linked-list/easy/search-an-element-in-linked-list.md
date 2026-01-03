---
title: Search an Element in Linked List
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

## ✅ **Solution: Iterative Search**

```cpp
bool searchElement(SinglyLinkedListNode* head, int target) {
    SinglyLinkedListNode* current = head;

    // Traverse the list to look for the target
    while(current != nullptr) {
        if(current->data == target) return true;
        current = current->next;
    }

    return false; // Not found
}

```

---

## 📝 **How It Works**

- We initialize a pointer `current` at the head.
- Traverse the list node by node.
- At each step, check if `current->data == target`.
- If found, return `true`.
- If we reach the end without finding it, return `false`.

This is a basic **linear search** on a linked list.

---

## 🧩 **Key Logic**

The main condition checked inside the loop:

```cpp
if(current->data == target) return true;

```

---

## ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| 🕒 Time | O(N), where N is number of nodes |
| 🧠 Space | O(1), no extra space used |

---

## ⚠️ **Edge Cases**

- Empty list → returns `false`
- First node is the target → returns immediately
- Last node is the target → full traversal needed
- Target not present → returns `false`

---

## 💡 **Other Approaches**

| Approach | Time | Space | Use When |
| --- | --- | --- | --- |
| Iterative ✅ | O(N) | O(1) | Preferred for simplicity |
| Recursive | O(N) | O(N) | Good for practice, but inefficient due to stack |

---

## 🔁 **Related Problems**

- Find the middle node
- Detect cycle in a linked list
- Find N-th node from the end
- Count frequency of a specific value

---