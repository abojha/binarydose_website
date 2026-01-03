---
title: Detect a Loop in Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true` *if there is a cycle in the linked list*. Otherwise, return `false`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

```

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Two Pointer / Floyd's Cycle Detection (Tortoise and Hare)

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;

        // Move slow by 1 and fast by 2 steps
        while(fast != NULL && fast->next != NULL){
            fast = fast->next->next;
            slow = slow->next;

            // If they meet, a cycle exists
            if(fast == slow) return true;
        }

        return false; // No cycle
    }
};

```

---

## 📝 How It Works

- We use two pointers:
    - `slow` moves one step at a time.
    - `fast` moves two steps at a time.
- If there’s **no cycle**, `fast` will reach the end (`NULL`) and loop exits.
- If there **is a cycle**, `fast` and `slow` will eventually **meet** inside the cycle.

This is known as **Floyd’s Cycle Detection Algorithm (Tortoise and Hare)**.

---

## 🧩 Key Logic

```cpp
while(fast != NULL && fast->next != NULL){
    fast = fast->next->next;
    slow = slow->next;
    if(fast == slow) return true;
}

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Each pointer travels at most `N` steps in the worst case.
- No extra memory is used.

---

## ⚠️ Edge Cases

- Empty list (`head == NULL`)
- Single node without cycle
- Self-loop (single node pointing to itself)
- Two-node cycle

---

## 💡 Other Approaches

| Method | Time | Space | Comment |
| --- | --- | --- | --- |
| HashSet Tracking | O(N) | O(N) | Store visited nodes |
| Floyd’s Algorithm | O(N) | O(1) | Optimal and commonly preferred |

---

## 🔁 Related Problems

- [142. Linked List Cycle II (Find the node where cycle begins)](https://leetcode.com/problems/linked-list-cycle-ii/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

---