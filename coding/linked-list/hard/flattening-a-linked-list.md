---
title: Flattening a Linked List
description: ""
tags:
  - hard
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

Given a linked list containing **n** head nodes where every node in the linked list contains two pointers:

(i) **next** points to the next node in the list.

(ii) **bottom** pointer to a sub-linked list where the current node is the head.

Each of the sub-linked lists nodes and the head nodes are sorted in **ascending** order based on their data.

Your task is to **flatten** the linked list such that all the nodes appear in a single level while maintaining the sorted order.

**Note:**1. **↓** represents the bottom pointer and **->** represents the next pointer.2. The flattened list will be printed using the **bottom** pointer instead of the next pointer.

**Examples:**

```
Input:

Output: 5-> 7-> 8-> 10 -> 19-> 20-> 22-> 28-> 30-> 35-> 40-> 45-> 50.
Explanation:
Bottom pointer of 5 is pointing to 7.
Bottom pointer of 7 is pointing to 8.
Bottom pointer of 8 is pointing to 10 and so on.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700192/Web/Other/blobid0_1722066129.png)

```
Input:

Output: 5-> 7-> 8-> 10-> 19-> 22-> 28-> 30-> 50
Explanation:
Bottom pointer of 5 is pointing to 7.
Bottom pointer of 7 is pointing to 8.
Bottom pointer of 8 is pointing to 10 and so on.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700192/Web/Other/blobid1_1722066171.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursion + Merge Two Sorted Lists

```cpp
/*
struct Node{
    int data;
    struct Node * next;
    struct Node * bottom;

    Node(int x){
        data = x;
        next = NULL;
        bottom = NULL;
    }
};
*/

class Solution {
  public:

    // Merges two sorted bottom-linked lists
    Node* merge(Node *list1, Node *list2){
        Node *dummy = new Node(-1);
        Node *tail = dummy;

        while(list1 && list2){
            if(list1->data <= list2->data){
                tail->bottom = list1;
                list1 = list1->bottom;
            } else {
                tail->bottom = list2;
                list2 = list2->bottom;
            }
            tail = tail->bottom;
        }

        // Attach remaining part
        if(list1) tail->bottom = list1;
        else tail->bottom = list2;

        return dummy->bottom;
    }

    // Recursively flattens the list
    Node *flatten(Node *head) {
        if(head == NULL || head->next == NULL) return head;

        // Recursively flatten the next list
        Node *flattenedRest = flatten(head->next);

        // Merge current list with the flattened rest
        head = merge(head, flattenedRest);

        return head;
    }
};

```

---

## 📝 How It Works

- Each node has a `next` pointer (horizontal) and a `bottom` pointer (vertical) to a sorted linked list.
- The goal is to **flatten the list into a single bottom-linked list**, preserving **sorted order**.
- The algorithm works by:
    1. **Recursively flattening** the `next` list.
    2. **Merging** the current list (`head`) with the already-flattened list using a sorted merge logic (like merge step in merge sort).
- Merging is done using a dummy node and standard sorted linked list merging via `bottom` pointers.

---

## 🧩 Key Concept

This is similar to **k-way merge** of sorted linked lists, recursively reducing to 2-way merge.

---

## ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Merge of two lists | O(N + M) | O(1) |
| Total recursive merges | O(N * M) in worst case | O(N) call stack |
- `N`: Number of `next` nodes
- `M`: Average number of `bottom` nodes in each list

> Space is O(N) due to recursion stack, merge is done in-place with O(1) extra.
> 

---

## ⚠️ Edge Cases

- Empty list: return `NULL`.
- Only one `next` node: already flat.
- Some bottom lists are `NULL`: still valid, handled during merge.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Recursion + Merge ✅ | O(N * M) | O(N) |
| Min-Heap for k-way merge | O(N log k) | O(k) extra (heap) |

> Heap-based approach is more optimal if k is large and performance matters.
> 

---

## 🔁 Related Problems

- [Leetcode 23: Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [GFG: Flattening a Linked List](https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1)
- [Leetcode 21: Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Leetcode 430: Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)

---

## 🛠️ Real-World Analogy

Imagine `next` pointers as departments, and `bottom` lists as sorted employee IDs in that department. Flattening means creating **one global sorted list** of all employees from all departments.