---
title: Rotate a Linked List (Left and Right)
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Circular Linked List Technique (Left & Right Rotation)

---

### 🔄 **Right Rotation**

```cpp
class Solution {
  public:
    Node* rotate(Node* head, int k) {
        if(head == NULL || head->next == NULL || k <= 0) return head;

        int len = 1;
        Node *tail = head;
        while(tail->next != NULL){
            len++;
            tail = tail->next;
        }

        // Connect the end to the head to form a circular list
        tail->next = head;

        // Normalize k if greater than length
        k = k % len;
        int stepsToNewTail = len - k;

        // Move to the new tail
        while(stepsToNewTail--) tail = tail->next;

        // New head is next of tail, and break the loop
        head = tail->next;
        tail->next = NULL;

        return head;
    }
};

```

---

### 🔄 **Left Rotation**

```cpp
class Solution {
  public:
    Node* rotate(Node* head, int k) {
        if(head == NULL || head->next == NULL || k <= 0) return head;

        int len = 1;
        Node *tail = head;
        while(tail->next != NULL){
            len++;
            tail = tail->next;
        }

        // Form circular list
        tail->next = head;

        // Normalize k
        k = k % len;
        int stepsToNewTail = k;

        // Move to the new tail
        while(stepsToNewTail--) tail = tail->next;

        head = tail->next;
        tail->next = NULL;

        return head;
    }
};

```

---

## 📝 How It Works

- First, compute the length of the linked list.
- Then, connect the last node to the head → forming a **circular list**.
- Depending on **rotation direction**, compute how many nodes to skip to reach the **new tail**:
    - For **right rotation**, skip `length - k` nodes.
    - For **left rotation**, skip `k` nodes.
- Set the **new head** as `tail->next`, and break the loop by setting `tail->next = NULL`.

---

## 🧩 Key Formula / Recurrence

- **Right Rotation:**
    
    `newTailPosition = length - (k % length)`
    
- **Left Rotation:**
    
    `newTailPosition = k % length`
    

---

## ⏱️ Time & Space Complexity

| Operation | Time | Space |
| --- | --- | --- |
| Finding Length | O(N) | O(1) |
| Rotation Logic | O(N) | O(1) |
| **Overall** | **O(N)** | **O(1)** |

---

## ⚠️ Edge Cases

- `k == 0`: No rotation needed.
- `k >= length`: Effectively `k % length` rotations.
- Empty list or single node: Return as-is.

---

## 💡 Other Approaches

- **Naive Approach (k times)**:
    - Right rotate: Move last node to front `k` times → O(k × N)
    - Less efficient for large `k`.
- **Stack/Queue-based Rotation**: Uses extra space.

---

## 🔁 Related Problems

- [Leetcode 61: Rotate List](https://leetcode.com/problems/rotate-list/)
- [Leetcode 206: Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [GFG: Rotate a Linked List](https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1)

---

## 🛠️ Other Notes

- This technique efficiently rotates in a single pass with **O(N)** time and **constant space**.
- Real-world analogy: **Rotating a circular queue**, where you just change the start pointer after skipping `k` places.

Let me know if you want a visual diagram of this or want to convert it into Notion format!