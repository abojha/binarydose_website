---
title: Check if Linked List is Pallindromic
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the `head` of a singly linked list, return `true` *if it is a palindrome or* `false` *otherwise*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

```
Input: head = [1,2,2,1]
Output: true

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

```
Input: head = [1,2]
Output: false

```

- Example:
    
    ```
    
    ```
    

---

---

### ✅ Solution: Reverse Second Half

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
    // Helper function to reverse a linked list recursively
    ListNode *reverseList(ListNode *head){
        if(head == NULL || head->next == NULL) return head;

        ListNode *newNode = reverseList(head->next);

        head->next->next = head;
        head->next = NULL;

        return newNode;
    }

    bool isPalindrome(ListNode* head) {
        if(head && head->next == NULL) return true; // single node is palindrome

        // Step 1: Find middle of the list
        ListNode *slow = head;
        ListNode *fast = head;
        while(fast->next != NULL && fast->next->next != NULL){
            slow = slow->next;
            fast = fast->next->next;
        }

        // Step 2: Reverse second half of list
        ListNode *newNode = reverseList(slow->next);

        // Step 3: Compare both halves
        ListNode *ptr1 = head;
        ListNode *ptr2 = newNode;
        while(ptr2 != NULL){
            if(ptr1->val != ptr2->val){
                slow->next  = reverseList(newNode); // restore list before returning
                return false;
            }
            ptr1 = ptr1->next;
            ptr2 = ptr2->next;
        }

        // Step 4: Optional - Restore the list
        slow->next = reverseList(newNode);
        return true;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

1. **Find Middle:** Using fast and slow pointers, we reach the midpoint of the list.
2. **Reverse 2nd Half:** Reverse the second half starting from `slow->next`.
3. **Compare Halves:** Compare the first half and reversed second half node by node.
4. **Restore (Optional):** Reverse again to restore the original list before returning.

This approach ensures O(n) time with only O(1) extra space.

---

### 🧩 Key Logic

- Use **two-pointer technique** to split the list.
- Use **recursive reverse** for reversing the second half.
- Use **two pointers** to compare values.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- Empty list → return `true`.
- One node → valid palindrome.
- Odd and even length handled via `fast->next` & `fast->next->next`.

---

### 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Convert to array and check | O(n) | O(n) |
| Stack for 1st half | O(n) | O(n) |
| Reverse 2nd half in-place ✅ | O(n) | O(1) |

---

### 🔁 Related Problems

- **LC 206** – Reverse Linked List
- **LC 234** – Palindrome Linked List
- **LC 876** – Middle of the Linked List
- **LC 143** – Reorder List (uses similar mid + reverse logic)