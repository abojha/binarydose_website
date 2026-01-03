---
title: Remove Nth Node from End
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

```

**Example 2:**

```
Input: head = [1], n = 1
Output: []

```

**Example 3:**

```
Input: head = [1,2], n = 1
Output: [1]

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Two Pointer Technique (Fast & Slow Pointers)

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        if(head == NULL) return NULL;

        ListNode *slow = head, *fast = head;

        // Move the fast pointer n steps ahead
        while(n--) {
            fast = fast->next;
        }

        // If fast is NULL, the node to be deleted is the head itself
        if(fast == NULL) return head->next;

        // Move both pointers until fast reaches the end
        while(fast->next != NULL) {
            slow = slow->next;
            fast = fast->next;
        }

        // Delete the nth node from the end
        slow->next = slow->next->next;

        return head;
    }
};

```

---

## 📝 How It Works

- This method uses two pointers (`fast` and `slow`) to identify the node to delete in a **single traversal**.
- `fast` is moved `n` steps ahead first.
- If `fast` becomes `NULL`, it means we have to remove the **head node** (i.e., `n` equals the length of the list).
- Otherwise, we move both pointers forward together until `fast->next == NULL`. At this point:
    - `slow` is just before the node we need to remove.
- We update `slow->next` to skip the node.

---

## 🧩 Key Formula / Recurrence

There’s no recurrence here — just a key pointer logic:

> When fast reaches the end, slow is at (length - n)-th node (i.e., just before the target node).
> 

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | **O(L)**, where L is the length of the linked list |
| 🪄 Space | **O(1)**, constant space |

---

## ⚠️ Edge Cases

- `head == NULL` → return `NULL`
- `n == length of list` → remove the **head node**
- Only one node in the list → result should be `NULL` after deletion
- Deleting the last node (`n == 1`) is handled smoothly

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| **Two-pass** (count length first) | O(L) | O(1) |
| **Stack-based** (store pointers) | O(L) | O(L) |
| **Recursive postorder** deletion | O(L) | O(L) due to call stack |

---

## 🔁 Related Problems

- [**LC 19. Remove Nth Node From End of List**](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [LC 876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [LC 206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [LC 2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

---