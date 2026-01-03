---
title: Remove Duplicates from sorted Doubly Linked List
description: ""
tags:
  - doubly
  - linked
  - linked-list
  - list
  - med
---

### Problem Statement:

Given a doubly linked list of **n** nodes sorted by values, the task is to remove duplicate nodes present in the linked list.

- Example:
    
    ```
    Example 1:
    
    Input:
    n = 6
    1<->1<->1<->2<->3<->4
    Output:
    1<->2<->3<->4
    Explanation:
    Only the first occurance of node with value 1 is 
    retained, rest nodes with value = 1 are deleted.
    Example 2:
    
    Input:
    n = 7
    1<->2<->2<->3<->3<->4<->4
    Output:
    1<->2<->3<->4
    Explanation:
    Only the first occurance of nodes with values 2,3 and 4 are 
    retained, rest repeating nodes are deleted.
    ```
    

---

---

## ✅ Solution: Iterative In-Place Removal

```cpp
class Solution {
  public:
    Node* removeDuplicates(Node* head) {
        if (head == NULL || head->next == NULL) return head;

        Node* current = head->next;

        while (current != NULL) {
            if (current->data == current->prev->data) {
                // Skip the current duplicate node
                current->prev->next = current->next;
                if (current->next != NULL)
                    current->next->prev = current->prev;
            } else {
                // Move forward only if no deletion occurred
                // (otherwise current is already moved)
                current = current->next;
            }
        }

        return head;
    }
};

```

---

## 📝 How It Works

- Start from the second node since we want to compare each node with its **previous** node.
- If the current node’s value equals the previous one, it's a **duplicate**, so remove the current node by rewiring `prev` and `next` pointers.
- If not a duplicate, move to the next node.
- Repeat until the end of the list.

> This works only because the doubly linked list is sorted in non-decreasing order.
> 

---

## 🧩 Key Logic

- `if (current->data == current->prev->data)` → triggers removal.
- Adjust both `next` and `prev` pointers to maintain DLL integrity.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

## ⚠️ Edge Cases

- Only one node → no duplicate to remove.
- All elements are the same → only one remains.
- Alternating duplicates → handles gracefully.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Hashing (for unsorted) | O(N) | O(N) | Works even if not sorted |
| In-place (this one) | O(N) | O(1) | Best for sorted list ✅ |

---

## 🔁 Related Problems

- Remove Duplicates from Sorted Linked List (Singly)
- Delete Nodes having Greater Value on Right
- Remove all occurrences of duplicates
- Remove Duplicates from Unsorted Linked List

---