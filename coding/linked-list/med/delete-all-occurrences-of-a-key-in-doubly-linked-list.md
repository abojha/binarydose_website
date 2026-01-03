---
title: Delete all Occurrences of a Key in Doubly Linked List
description: ""
tags:
  - doubly
  - linked
  - linked-list
  - list
  - med
---

### Problem Statement:

You are given the **head_ref** of a doubly Linked List and a **Key**. Your task is to **delete all occurrences** of the given key if it is present and return the new DLL.

- Example:
    
    ```
    Example1:
    
    Input: 
    2<->2<->10<->8<->4<->2<->5<->2
    2
    Output: 
    10<->8<->4<->5
    Explanation: 
    All Occurences of 2 have been deleted.
    
    Example2:
    
    Input: 
    9<->1<->3<->4<->5<->1<->8<->4
    9
    Output: 
    1<->3<->4<->5<->1<->8<->4
    Explanation: 
    All Occurences of 9 have been deleted.
    ```
    

---

---

## ✅ Solution: Doubly Linked List Node Deletion

```cpp
class Solution {
  public:
    void deleteAllOccurOfX(Node** head_ref, int targetValue) {
        Node* current = *head_ref;

        while (current != NULL) {
            Node* nextNode = current->next;

            if (current->data == targetValue) {
                // If current node is the head
                if (current->prev == NULL) {
                    *head_ref = current->next;
                    if (*head_ref) (*head_ref)->prev = NULL;
                }
                // If current node is not the head
                else {
                    current->prev->next = current->next;
                    if (current->next)
                        current->next->prev = current->prev;
                }
                // Optional: Free memory if needed
                // delete current;
            }

            current = nextNode;  // Move to next node
        }
    }
};

```

---

## 📝 How It Works

- Traverse the doubly linked list using a pointer `current`.
- For each node:
    - If its value matches `targetValue`, adjust the `next` and `prev` pointers of neighboring nodes to **bypass** the current node.
    - If it’s the **head node**, update `head_ref` to point to the new head.
- Move to the next node before modifying the current one (store `next` beforehand).

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

## ⚠️ Edge Cases Handled

- Empty list (`head == NULL`)
- All nodes are equal to `x`
- First node (head) has value `x`
- Last node has value `x`
- Multiple `x` values scattered in the list

---

## 💡 Other Approaches

- For a **singly linked list**, a dummy head pointer is often used to simplify head deletions.
- Can be extended to **return count** of deleted nodes or a boolean if deletion occurred.

---

## 🔁 Related Problems

- Delete Node in a Doubly Linked List
- Remove Duplicates in a Linked List
- Delete Middle Node in Linked List
- Delete Nth Node from End of Linked List

---