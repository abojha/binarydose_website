---
title: Middle of the Linked List
description: ""
tags:
  - easy
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

Given the `head` of a singly linked list, return *the middle node of the linked list*.

If there are two middle nodes, return **the second middle** node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/07/23/lc-midlist1.jpg)

```
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Two Pointers (Tortoise-Hare)

```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head;
        ListNode *fast = head;

        // Move fast by 2 and slow by 1 step
        while(fast != NULL && fast->next != NULL){
            slow = slow->next;
            fast = fast->next->next;
        }

        // When fast reaches end, slow is at middle
        return slow;
    }
};

```

---

## 📝 How It Works

- We use **two pointers**:
    - `slow` moves one node at a time.
    - `fast` moves two nodes at a time.
- When `fast` reaches the end, `slow` will be at the **middle node**.
- In case of even-length list, this returns the **second middle node**.

This is also called the **Tortoise-Hare algorithm**.

---

## 🧩 Key Formula / Transition

- `slow = slow->next`
- `fast = fast->next->next`

This ensures `slow` reaches halfway when `fast` finishes the list.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

Only one traversal, and no extra space.

---

## ⚠️ Edge Cases

- List is empty → returns `NULL`
- List has one node → returns that node
- List has even number of nodes → returns second middle (as required by LeetCode)

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Count & Traverse | O(N) | O(1) | First pass to count nodes, second to reach middle |
| Store in vector | O(N) | O(N) | Simplest but extra space |

---

## 🔁 Related Problems

- Detect Cycle in Linked List (uses same fast/slow logic)
- Find the N-th node from end
- Reverse a Linked List
- Palindrome Linked List (use middle to compare halves)

---