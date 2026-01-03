---
title: Reverse a Linked List
description: ""
tags:
  - easy
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

Given the `head` of a singly linked list, reverse the list, and return *the reversed list*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
Input: head = [1,2]
Output: [2,1]

```

**Example 3:**

```
Input: head = []
Output: []
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Iterative

```cpp
class Solution {
  public:
    Node* reverseList(struct Node* head) {
        Node *next, *prev = NULL, *curr = head;

        while(curr != NULL){
            next = curr->next;   // store next node
            curr->next = prev;   // reverse the link
            prev = curr;         // move prev forward
            curr = next;         // move curr forward
        }

        return prev; // new head
    }
};

```

---

## ✅ Solution: Recursive

```cpp
class Solution {
  public:
    Node* reverseList(struct Node* head) {
        if(head == NULL || head->next == NULL){
            return head; // base case
        }

        Node *new_node = reverseList(head->next); // reverse rest of list
        head->next->next = head; // set next node’s next to current
        head->next = NULL;       // break original link

        return new_node; // new head of reversed list
    }
};

```

---

## 📝 How It Works

### 🔁 Iterative

- Initialize `prev = NULL`, `curr = head`.
- At each step:
    - Store next node.
    - Reverse current node’s link.
    - Advance `prev` and `curr`.
- Finally, `prev` will point to the new head.

### 🔁 Recursive

- Go to the end using recursion.
- On backtracking, reverse the links.
- Base case: when `head == NULL` or `head->next == NULL`.

---

## 🧩 Key Logic

### Iterative:

```
curr->next = prev

```

### Recursive:

```
head->next->next = head
head->next = NULL

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Iterative | O(N) | O(1) |
| Recursive | O(N) | O(N) (stack) |

---

## ⚠️ Edge Cases

- Empty list → returns `NULL`
- Single node → returns the same node
- Already reversed → still works correctly

---

## 💡 Other Approaches

| Method | Notes |
| --- | --- |
| Using Stack | Extra space O(N), simpler |
| Tail Recursion | Space optimization possible with language support |

---

## 🔁 Related Problems

- Reverse a Linked List II (between positions m and n)
- Palindrome Linked List
- Add Two Numbers (Reverse-style processing)
- Detect Cycle in Linked List

---