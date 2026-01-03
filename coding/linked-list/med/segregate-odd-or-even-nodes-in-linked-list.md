---
title: Segregate Odd or Even Nodes in Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given a link list, modify the list such that all the even numbers appear before all the odd numbers in the modified list. The order of appearance of numbers within each segregation should be the same as that in the original list.

**NOTE:** Don't create a new linked list, instead rearrange the provided one.

**Examples:**

```
Input:Linked list: 17->15->8->9->2->4->6
Output: 8->2->4->6->17->15->9

Explaination: 8,2,4,6 are the even numbers so they appear first and 17,15,9 are odd numbers that appear later.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/705390/Web/Other/blobid0_1722066819.png)

- Example:
    
    ```
    
    ```
    

---

---

### ✅ Solution: Two Separate Linked Lists

```cpp
// User function template for C++

/*
struct Node
{
    int data;
    struct Node* next;

    Node(int x){
        data = x;
        next = NULL;
    }
};
*/

class Solution {
  public:
    Node* divide(Node* head) {
       Node *evenDummy = new Node(0); // Dummy head for even list
       Node *oddDummy = new Node(0);  // Dummy head for odd list

       Node *evenTail = evenDummy;
       Node *oddTail = oddDummy;

       Node *curr = head;

       while(curr != NULL){
           if(curr->data % 2 == 0){
               evenTail->next = curr;
               evenTail = evenTail->next;
           }
           else{
               oddTail->next = curr;
               oddTail = oddTail->next;
           }
           curr = curr->next;
       }

       evenTail->next = oddDummy->next; // Append odd list after even
       oddTail->next = NULL; // End the list

       Node *newhead = evenDummy->next;

       delete evenDummy;
       delete oddDummy;

       return newhead;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

1. **Create Dummy Nodes**: Start with two dummy nodes to hold the heads of even and odd lists.
2. **Traverse Original List**: Traverse once and append even numbers to the even list, and odd to the odd list.
3. **Join the Lists**: Attach the odd list at the end of the even list.
4. **Return Head**: Return the head of the even list (i.e., `evenDummy->next`).

---

### 🧩 Key Logic

- Use two pointers to build separate even and odd sublists.
- Reconnect them at the end to form the final modified list.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- All even nodes → odd list is empty.
- All odd nodes → even list is empty.
- List with a single node (even/odd).
- Empty list (`head == NULL`) → return `NULL`.

---

### 💡 Other Approaches

| Approach | Time | Space | Comment |
| --- | --- | --- | --- |
| Brute Force - Rearranging in-place | O(n²) | O(1) | Too inefficient ❌ |
| Two List Merge (current) ✅ | O(n) | O(1) | Best approach 👍 |

---

### 🔁 Related Problems

- **LC 328** – Odd Even Linked List
- **LC 86** – Partition List (similar two-list technique)
- **LC 25** – Reverse Nodes in k-Group