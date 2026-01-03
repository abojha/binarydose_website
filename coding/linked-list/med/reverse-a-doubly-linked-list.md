---
title: Reverse a Doubly Linked List
description: ""
tags:
  - doubly
  - linked
  - linked-list
  - list
  - med
---

### Problem Statement:

Given a **doubly linked list**. Your task is to **reverse** the doubly linked list and return its head.

**Examples:**

```
Input:LinkedList: 3 <-> 4 <-> 5
Output:5 <-> 4 <-> 3

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700137/Web/Other/blobid1_1724317926.png)

```
Input:LinkedList: 75 <-> 122 <-> 59 <-> 196
Output:196 <-> 59 <-> 122 <-> 75

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700137/Web/Other/blobid0_1724317913.png)

**Expected Time Complexity:** O(n).

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Solution: In-Place Reversal of Doubly Linked List**

```cpp
/*
class DLLNode {
  public:
    int data;
    DLLNode *next;
    DLLNode *prev;

    DLLNode(int val) {
        data = val;
        this->next = NULL;
        this->prev = NULL;
    }
};
*/

class Solution {
  public:
    // Function to reverse a doubly linked list
    DLLNode* reverseDLL(DLLNode* head) {
        if(head == NULL || head->next == NULL) return head;

        DLLNode* curr = head;
        DLLNode* prevNode = NULL;

        while(curr != NULL){
            prevNode = curr->prev;      // Store previous
            curr->prev = curr->next;    // Swap next and prev
            curr->next = prevNode;      // Move forward
            curr = curr->prev;          // Continue in swapped direction
        }

        // Return new head (prev of last non-null curr)
        return prevNode->prev;
    }
};

```

---

## 📝 **How It Works**

- Start from the head of the DLL.
- At each node, swap its `next` and `prev` pointers.
- After the loop ends, `curr` becomes `NULL`, and `prevNode` will point to the last node processed.
- The new head is at `prevNode->prev`.

---

## 🧩 **Key Swap Logic**

```cpp
curr->prev = curr->next;
curr->next = prevNode;

```

This inverts the direction of the list.

---

## ⏱️ **Time & Space Complexity**

| Operation | Time | Space |
| --- | --- | --- |
| Reversal | O(N) | O(1) |

---

## ⚠️ **Edge Cases**

- Empty list → returns `NULL`
- Single node → returns the node as-is
- List with even/odd number of nodes

---

## 💡 **Other Approaches**

- **Using stack:** Push nodes into stack and re-link from top — uses O(N) space.
- **Recursive reversal:** Elegant, but not space-efficient due to recursion stack.

---

## 🔁 **Related Problems**

- Reverse a singly linked list
- Flatten a multilevel doubly linked list
- Rotate DLL by k nodes
- Check if DLL is palindrome

---