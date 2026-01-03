---
title: Delete a Node in Linked List
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

## ✅ **Solution: Pointer Manipulation with Dummy Node**

```cpp
SinglyLinkedListNode* deleteNode(SinglyLinkedListNode* llist, int position) {
    // Create a dummy node pointing to the head to simplify deletion logic
    SinglyLinkedListNode *dummy = new SinglyLinkedListNode(0);
    dummy->next = llist;

    SinglyLinkedListNode *curr = dummy;

    // Traverse to the node just before the one to delete
    for(int i = 0; i < position; i++) {
        if(curr->next == NULL) return dummy->next;  // position out of bounds
        curr = curr->next;
    }

    // Bypass the node to delete
    if(curr->next != NULL)
        curr->next = curr->next->next;

    // Return the updated list (skipping dummy node)
    return dummy->next;
}

```

---

## 📝 **How It Works**

- A dummy node is used to simplify edge cases like deleting the head node.
- Traverse to the node just **before the target position**.
- Change its `next` pointer to skip over the node at the given position.
- Return `dummy->next` as the new head.

---

## 🧩 **Key Logic**

There’s no recurrence here — it's purely pointer manipulation:

```cpp
curr->next = curr->next->next;

```

This bypasses the node at the `position`.

---

## ⏱️ **Time & Space Complexity**

| Metric | Value |
| --- | --- |
| 🕒 Time | O(position) |
| 🧠 Space | O(1) — constant extra space |

---

## ⚠️ **Edge Cases**

- Deleting from an empty list (`llist == NULL`)
- Deleting at position `0` (head node)
- Deleting a node at an invalid position (beyond list size)

---

## 💡 **Other Approaches**

| Approach | Pros | Cons |
| --- | --- | --- |
| Without dummy node | Saves one allocation | Needs special case for deleting head ❌ |
| With dummy node ✅ | Uniform logic | Slight extra memory |

---

## 🔁 **Related Problems**

- Insert Node at Head/Tail/Position
- Delete Node by Value
- Reverse a Linked List
- Remove N-th Node From End of List (LeetCode 19)

---