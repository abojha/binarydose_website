---
title: Reverse a Linked List in Group of Size K
description: ""
tags:
  - hard
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

Given the **head** a linked list, the task is to **reverse** every **k** node in the linked list. If the number of nodes is not a multiple of ***k*** then the left-out nodes in the end, should be considered as a group and must be **reversed**.

**Examples:**

```
Input:head = 1 -> 2 -> 2 -> 4 -> 5 -> 6 -> 7 -> 8, k = 4
Output:4 -> 2 -> 2 -> 1 -> 8 -> 7 -> 6 -> 5

Explanation: The first 4 elements 1, 2, 2, 4 are reversed first and then the next 4 elements 5, 6, 7, 8. Hence, the resultant linked list is 4 -> 2 -> 2 -> 1 -> 8 -> 7 -> 6 -> 5.

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700013/Web/Other/blobid0_1723298986.png)

```
Input:head = 1 -> 2 -> 3 -> 4 -> 5, k = 3
Output:3 -> 2 -> 1 -> 5 -> 4

Explanation:The first 3 elements 1, 2, 3 are reversed first and then left out elements 4, 5 are reversed. Hence, the resultant linked list is 3 -> 2 -> 1 -> 5 -> 4.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700013/Web/Other/blobid1_1723298995.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Version 1: Reverse only full `k`sized groups (default behavior)**

```cpp
class Solution {
  public:
    Node* reversal(Node* head) {
        Node* prev = NULL;
        Node* curr = head;

        while(curr != NULL){
            Node* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        return prev;
    }

    Node* getKthNode(Node* start, int k) {
        while(--k && start != NULL){
            start = start->next;
        }
        return start;
    }

    Node* reverseKGroup(Node* head, int k) {
        Node* curr = head;
        Node* prevGroupTail = NULL;

        while(curr != NULL){
            Node* kth = getKthNode(curr, k);
            if(kth == NULL) break; // Not enough nodes left

            Node* nextGroupHead = kth->next;
            kth->next = NULL;

            Node* reversedGroupHead = reversal(curr);

            if(curr == head)
                head = reversedGroupHead;
            else
                prevGroupTail->next = reversedGroupHead;

            prevGroupTail = curr;
            curr = nextGroupHead;
        }

        if(prevGroupTail != NULL)
            prevGroupTail->next = curr; // attach remaining unprocessed part

        return head;
    }
};

```

---

## ✅ **Version 2: Reverse *all* groups — even last one if size < `k`**

```cpp
class Solution {
  public:
    Node* reversal(Node* head) {
        Node* prev = NULL;
        Node* curr = head;

        while(curr != NULL){
            Node* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        return prev;
    }

    Node* getKthNode(Node* start, int k) {
        while(--k && start != NULL){
            start = start->next;
        }
        return start;
    }

    Node* reverseKGroup(Node* head, int k) {
        Node* curr = head;
        Node* prevGroupTail = NULL;

        while(curr != NULL){
            Node* kth = getKthNode(curr, k);

            Node* nextGroupHead = NULL;
            if(kth != NULL) {
                nextGroupHead = kth->next;
                kth->next = NULL;
            }

            // If kth is NULL, still reverse the remaining (last < k group)
            Node* reversedGroupHead = reversal(curr);

            if(curr == head)
                head = reversedGroupHead;
            else
                prevGroupTail->next = reversedGroupHead;

            prevGroupTail = curr;
            curr = nextGroupHead;
        }

        return head;
    }
};

```

---

## ⚖️ Summary Table

| Behavior | Version 1 | Version 2 |
| --- | --- | --- |
| Reverse only full `k` groups | ✅ Yes | ❌ No |
| Reverse last group if size < `k` | ❌ No | ✅ Yes |