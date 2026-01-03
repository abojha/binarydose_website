---
title: Odd Even Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the `head` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return *the reordered list*.

The **first** node is considered **odd**, and the **second** node is **even**, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in `O(1)` extra space complexity and `O(n)` time complexity.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg)

```
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg)

```
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Solution: In-Place Linked List Reordering**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {

        if(head == NULL || head->next == NULL) return head;

        ListNode *odd = head;               // odd positioned node pointer
        ListNode *even = head->next;        // even positioned node pointer
        ListNode *evenHead = even;          // save start of even list

        while(even != NULL && even->next != NULL){
            odd->next = even->next;         // link odd nodes
            odd = odd->next;

            even->next = odd->next;         // link even nodes
            even = even->next;
        }

        odd->next = evenHead;               // attach even list after odd

        return head;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

1. Split the original list into two:
    - One for nodes at **odd positions**.
    - One for nodes at **even positions**.
2. Use two pointers `odd` and `even` to traverse the list in tandem.
3. At the end, link the last node of the odd list to the head of the even list.
4. This **rearranges the nodes**, maintaining their original relative order within odd/even.

---

### 🧩 Key Logic

- Keep two running pointers: `odd` and `even`, both progressing via `next->next`.
- When loop finishes, connect end of odd to head of even.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- Empty list → return `NULL`.
- List with 1 node → return as-is.
- List with 2 nodes → no rearrangement needed.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force with Arrays | O(n) | O(n) | Uses extra space ❌ |
| Two-pointer in-place | O(n) | O(1) | Optimal ✅ |

---

### 🔁 Related Problems

- **LC 328** – Odd Even Linked List ✅
- **LC 86** – Partition List
- **LC 206** – Reverse Linked List
- **LC 143** – Reorder List (Zigzag pattern)

---