---
title: Merge Two Sorted Lists
description: ""
tags:
  - easy
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return *the head of the merged linked list*.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)
    
    ```
    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]
    
    ```
    
    **Example 2:**
    
    ```
    Input: list1 = [], list2 = []
    Output: []
    
    ```
    
    **Example 3:**
    
    ```
    Input: list1 = [], list2 = [0]
    Output: [0]
    
    ```
    
    **Constraints:**
    
    - The number of nodes in both lists is in the range `[0, 50]`.
    - `100 <= Node.val <= 100`
    - Both `list1` and `list2` are sorted in **non-decreasing** order.

---

## Solution: Iterative Two-Pointer (Dummy Head)

```cpp
// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode(): val(0), next(nullptr) {}
    ListNode(int x): val(x), next(nullptr) {}
    ListNode(int x, ListNode *n): val(x), next(n) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Dummy head simplifies handling the first node
        ListNode* dummyHead = new ListNode(-1);
        ListNode* mergedTail = dummyHead;

        // Merge while both lists have nodes
        while (list1 && list2) {
            if (list1->val <= list2->val) {          // <= keeps relative order (stable)
                mergedTail->next = list1;            // link smaller node
                list1 = list1->next;                 // advance in list1
            } else {
                mergedTail->next = list2;            // link smaller node
                list2 = list2->next;                 // advance in list2
            }
            mergedTail = mergedTail->next;           // advance tail
        }

        // Attach the remaining nodes (only one of these will run)
        if (list1) mergedTail->next = list1;
        if (list2) mergedTail->next = list2;

        ListNode* head = dummyHead->next;
        delete dummyHead;                             // avoid memory leak for dummy
        return head;
    }
};

```

## 📝 How It Works

- Use a **dummy head** and a **tail pointer** to build the merged list.
- Compare heads of `list1` and `list2`; attach the smaller one to `mergedTail`, advance that list and `mergedTail`.
- When one list ends, **append the remainder** of the other (already sorted).
- Return `dummyHead->next` as the merged list’s head.

*Analogy:* Like merging two already-sorted queues by always dequeuing the smaller front element.

## 🧩 Key Formula / Recurrence

- No DP/recurrence. Core transition is:
    
    If `list1->val <= list2->val` → attach `list1`, else attach `list2`.
    

## ⏱️ Time & Space Complexity

- **Time:** `O(m + n)` — each node visited once.
- **Space:** `O(1)` auxiliary — in-place pointer rewiring (no extra nodes), ignoring the dummy node pointer itself.

## ⚠️ Edge Cases

- One or both lists are `nullptr` → returns the other list directly.
- Equal values (`<=`) ensures **stable merge** (preserves original order among equals).
- Very long lists: iterative approach avoids recursion stack overflow.

## 💡 Other Approaches

- **Recursive merge:** cleaner code, same `O(m+n)` time but **O(m+n)** stack space in worst case.
- **Collect & sort values:** `O((m+n) log(m+n))` time, extra space — not recommended.

## 🔁 Related Problems

- Merge k Sorted Lists (use heap or divide & conquer)
- Sort List (merge sort on linked list)
- Remove Duplicates from Sorted List