---
title: Starting Point of Loop
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the `head` of a linked list, return *the node where the cycle begins. If there is no cycle, return* `null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to (**0-indexed**). It is `-1` if there is no cycle. **Note that** `pos` **is not passed as a parameter**.

**Do not modify** the linked list.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

```
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

```
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.

```

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

```
Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Floyd’s Cycle Detection (Detect Starting Node)

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;
        bool isCycle = false;

        // Step 1: Detect cycle using Floyd’s Algorithm
        while(fast != NULL && fast->next != NULL){
            slow = slow->next;
            fast = fast->next->next;

            if(slow == fast){
                isCycle = true;
                break;
            }
        }

        // Step 2: Find starting point of cycle
        if(isCycle){
            slow = head;
            while(slow != fast){
                slow = slow->next;
                fast = fast->next;
            }
            return slow;  // Starting node of the cycle
        }

        return NULL;  // No cycle
    }
};

```

---

## 📝 How It Works

1. **Phase 1: Cycle Detection**
    - Use two pointers: `slow` (moves 1 step) and `fast` (moves 2 steps).
    - If they meet, a cycle is present.
2. **Phase 2: Finding the Start of Cycle**
    - Reset `slow` to `head`.
    - Move both `slow` and `fast` one step at a time.
    - The point where they meet again is the **start of the cycle**.

---

## 🧩 Key Logic

- **Cycle exists** when `fast == slow`.
- From meeting point, both pointers move at same pace:
    
    ```cpp
    slow = head;
    while(slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Only two pointers used.
- Fast and slow both take linear time in worst case.

---

## ⚠️ Edge Cases

- `head` is `NULL`
- Cycle starts at head itself
- Very small list (1–2 nodes)
- No cycle exists

---

## 💡 Other Approaches

| Method | Time | Space | Description |
| --- | --- | --- | --- |
| HashSet Tracking | O(N) | O(N) | Store visited nodes |
| Floyd's Algo | O(N) | O(1) | Most optimal approach ✅ |

---

## 🔁 Related Problems

- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)

---