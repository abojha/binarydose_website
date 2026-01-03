---
title: Delete the Middle Node of Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

You are given the `head` of a linked list. **Delete** the **middle node**, and return *the* `head` *of the modified linked list*.

The **middle node** of a linked list of size `n` is the `⌊n / 2⌋th` node from the **start** using **0-based indexing**, where `⌊x⌋` denotes the largest integer less than or equal to `x`.

- For `n` = `1`, `2`, `3`, `4`, and `5`, the middle nodes are `0`, `1`, `1`, `2`, and `2`, respectively.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg1drawio.png)

```
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation:
The above figure represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg2drawio.png)

```
Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation:
The above figure represents the given linked list.
For n = 4, node 2 with value 3 is the middle node, which is marked in red.

```

**Example 3:**

![](https://assets.leetcode.com/uploads/2021/11/16/eg3drawio.png)

```
Input: head = [2,1]
Output: [2]
Explanation:
The above figure represents the given linked list.
For n = 2, node 1 with value 1 is the middle node, which is marked in red.
Node 0 with value 2 is the only node remaining after removing node 1.
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
    ListNode* deleteMiddle(ListNode* head) {
        // If there's only one node or list is empty, return NULL
        if(head == NULL || head->next == NULL) return NULL;

        ListNode *fast = head;
        ListNode *slow = head;
        ListNode *prev = NULL;

        // Move fast by 2 and slow by 1 to find the middle
        while(fast != NULL && fast->next != NULL){
            prev = slow;           // Keep track of node before slow
            slow = slow->next;     // Move slow 1 step
            fast = fast->next->next; // Move fast 2 steps
        }

        // Delete the middle node
        prev->next = slow->next;

        return head;
    }
};

```

---

## 📝 How It Works

- The task is to **delete the middle node** of a singly linked list.
- Uses two pointers:
    - `fast` moves 2 steps at a time.
    - `slow` moves 1 step at a time.
- When `fast` reaches the end, `slow` will be at the middle.
- `prev` tracks the node just **before** `slow`.
- We remove the middle node by doing: `prev->next = slow->next`.

---

## 🧩 Key Formula / Recurrence

There’s no recurrence here. Key movement rule is:

> When fast reaches the end, slow is at the middle.
> 

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | **O(N)** — traverses the list once |
| 🪄 Space | **O(1)** — constant space |

---

## ⚠️ Edge Cases

- ✅ Empty list → return `NULL`
- ✅ Only one node → return `NULL` (middle is the node itself)
- ✅ Two nodes → delete second one (as per problem definition)
- ✅ Even-length list → delete **second middle** (i.e., `n/2`th node)

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Count length, then go to middle | O(N) | O(1) |
| Use vector to store nodes | O(N) | O(N) |
| Recursive approach | O(N) | O(N) recursion stack |

---

## 🔁 Related Problems

- [LeetCode 2095. Delete the Middle Node of a Linked List](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/)
- [LeetCode 876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [LeetCode 19. Remove N-th Node From End](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [LeetCode 206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

---