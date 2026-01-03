---
title: Sort Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the `head` of a linked list, return *the list after sorting it in **ascending order***.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

```
Input: head = [4,2,1,3]
Output: [1,2,3,4]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Merge Sort (Divide and Conquer)

```cpp
class Solution {
public:

    // Function to find the middle node of the list
    ListNode *findMiddle(ListNode *head){
        ListNode *slow = head, *fast = head->next;
        while(fast != NULL && fast->next != NULL){
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    // Function to merge two sorted lists
    ListNode *mergeLists(ListNode *left, ListNode *right){
        ListNode *dummy = new ListNode();
        ListNode *temp = dummy;

        while(left != NULL && right != NULL){
            if(left->val <= right->val){
                temp->next = left;
                left = left->next;
            }
            else{
                temp->next = right;
                right = right->next;
            }
            temp = temp->next;
        }

        if(left != NULL) temp->next = left;
        else temp->next = right;

        return dummy->next;
    }

    // Merge Sort: recursively split and merge
    ListNode* sortList(ListNode* head) {
        if(head == NULL || head->next == NULL) return head;

        ListNode *middleNode = findMiddle(head);

        ListNode *right = middleNode->next;
        middleNode->next = NULL;  // Break the list into two halves
        ListNode *left = head;

        left = sortList(left);
        right = sortList(right);

        return mergeLists(left, right);
    }
};

```

---

## 📝 How It Works

This is the **Merge Sort algorithm adapted for linked lists**, which avoids using extra space (unlike array merge sort). Here's how it works:

1. **Base Case**: If the list is empty or has only one node, it's already sorted.
2. **Split Phase**:
    - Use the **slow-fast pointer approach** to find the middle.
    - Cut the list into two halves.
3. **Recursion**: Recursively sort both halves.
4. **Merge Phase**:
    - Merge the two sorted halves using a dummy node and pointer manipulation.

This technique ensures the list gets sorted in **O(n log n)** time using only **O(1)** auxiliary space for list nodes.

---

## 🧩 Key Formula / Recurrence

- The recursive recurrence:
    
    ```
    T(n) = 2*T(n/2) + O(n)
    
    ```
    
    Which solves to `T(n) = O(n log n)`
    

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | **O(n log n)** — standard merge sort |
| 🪄 Space | **O(log n)** — due to recursive stack calls (no array-based space) |

---

## ⚠️ Edge Cases

- ✅ Empty list → returns `NULL`
- ✅ Single node → already sorted
- ✅ Already sorted list → returned as is
- ✅ All elements same → still handled correctly
- ✅ List with negative and positive integers → handled properly

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Merge Sort | O(n log n) | O(log n) | ✅ Optimal |
| Array Sort | O(n log n) | O(n) | Copy values to array, sort, write back |
| Insertion Sort | O(n²) | O(1) | ❌ Too slow for large lists |

---

## 🔁 Related Problems

- [LeetCode 148. Sort List](https://leetcode.com/problems/sort-list/)
- [LeetCode 21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [LeetCode 876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [LeetCode 23. Merge k Sorted List](https://leetcode.com/problems/merge-k-sorted-lists/)

---