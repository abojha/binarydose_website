---
title: Add 1 to a Number respresented by Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

You are given a linked list where each element in the list is a node and have an integer data. You need to add **1** to the number formed by concatinating all the list node numbers together and return the head of the modified linked list.

**Note:** The head represents the first element of the given array.

```
Input:LinkedList: 4->5->6
Output:457

Explanation: 4->5->6 represents 456 and when 1 is added it becomes 457.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700053/Web/Other/blobid0_1722278845.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Recursive (Backtracking Approach)

```cpp
class Solution {
  public:
    int addOneUtils(Node *head) {
        if(head == NULL) return 1; // Base case: initial carry = 1

        int carry = addOneUtils(head->next); // Recurse to end
        int sum = head->data + carry;
        head->data = sum % 10;
        return sum / 10; // return carry to propagate
    }

    Node* addOne(Node* head) {
        int carry = addOneUtils(head);
        if(carry) {
            Node *newNode = new Node(carry);
            newNode->next = head;
            head = newNode;
        }
        return head;
    }
};

```

---

## ✅ Solution 2: Iterative (Reverse + Add + Reverse)

```cpp
class Solution {
  public:
    Node* reverse(Node *head) {
        Node *prev = NULL, *curr = head;
        while(curr) {
            Node *nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }

    Node* addOne(Node* head) {
        head = reverse(head); // Step 1: reverse the list

        int carry = 1;
        Node *curr = head, *prev = NULL;

        while(curr && carry) {
            int sum = curr->data + carry;
            curr->data = sum % 10;
            carry = sum / 10;
            prev = curr;
            curr = curr->next;
        }

        if(carry) {
            prev->next = new Node(carry);
        }

        head = reverse(head); // Step 3: reverse back
        return head;
    }
};

```

---

## 📝 How It Works

### Recursive:

- Recurse to the **end of the list** (least significant digit).
- Add 1 and propagate the **carry backward** during the return phase.

### Iterative:

1. **Reverse the list** to make addition easier (starting from LSB).
2. Perform addition and handle carry.
3. **Reverse back** to restore original order.

---

## 🧩 Key Concepts

| Concept | Recursive | Iterative |
| --- | --- | --- |
| Handles carry naturally | ✅ Yes | ✅ Yes |
| Uses reverse logic | ❌ No | ✅ Yes |
| In-place updates | ✅ | ✅ |
| Base case | Reaches `NULL` | Starts from head |

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(N) | O(N) recursion stack |
| Iterative | O(N) | O(1) constant space |

---

## ⚠️ Edge Cases

- ✅ `999 → 1000`
- ✅ Empty list → return `NULL`
- ✅ Last node becomes 10 → carry added as new node

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Convert to integer | Not safe for large numbers |
| Stack-based | Push all digits, pop and add |

---

## 🔁 Related Problems

- [LeetCode 66. Plus One](https://leetcode.com/problems/plus-one/) – for arrays
- [LeetCode 2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
- [GFG: Add 1 to a number represented as linked list](https://practice.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1)

---