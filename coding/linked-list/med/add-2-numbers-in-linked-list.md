---
title: Add 2 Numbers in Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the head of two singly linked lists **num1** and **num2** representing two non-negative integers. The task is to return the **head** of the linked list representing the sum of these two numbers.

For example, num1 represented by the linked list : **1 -> 9 -> 0,** similarly num2 represented by the linked list: **2 -> 5.** Sum of these two numbers is represented by **2 -> 1 -> 5.**

**Note:** There can be leading zeros in the input lists, but there should not be any leading zeros in the output list.

```
Input:num1 = 4 - > 5, num2 = 3 -> 4 -> 5
Output:3 -> 9 -> 0

Explanation:Given numbers are 45 and 345. There sum is 390.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700043/Web/Other/blobid0_1749213210.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Reversal + Addition + Reversal

```cpp
class Solution {
  public:
    Node* reverse(Node *head){
        Node *prev = NULL, *curr = head;
        while(curr){
            Node *nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }

    Node* addTwoLists(Node* num1, Node* num2) {
        // Reverse both input lists
        num1 = reverse(num1);
        num2 = reverse(num2);

        Node *dummy = new Node(-1);
        Node *tail = dummy;
        int carry = 0;

        // Loop while there's a node in either list or carry
        while(num1 || num2 || carry) {
            int sum = carry;

            if(num1) {
                sum += num1->data;
                num1 = num1->next;
            }

            if(num2) {
                sum += num2->data;
                num2 = num2->next;
            }

            carry = sum / 10;
            tail->next = new Node(sum % 10);
            tail = tail->next;
        }

        // Reverse the result list to restore forward order
        Node* result = reverse(dummy->next);
        delete dummy;  // Free dummy node

        return result;
    }
};

```

---

## 📝 How It Works

- The numbers are stored in forward order, so we **reverse both lists** to process from least significant digit (LSD).
- Traverse both reversed lists and **add digit by digit** with carry.
- After the loop, we **reverse the result** to maintain forward digit order.

---

## 🧩 Key Formula / Transition

```
sum = digit1 + digit2 + carry
new_node_value = sum % 10
carry = sum / 10

```

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | O(max(N, M)) — where N and M are lengths of num1 and num2 |
| 🧠 Space | O(max(N, M)) — result list size |

---

## ⚠️ Edge Cases

- One list is shorter (e.g., 123 + 9)
- Carry is left after both lists end (e.g., 999 + 1 → 1000)
- One list is `NULL`
- Both lists are empty → return `NULL`

---

## 💡 Other Approaches

| Approach | Description | Space |
| --- | --- | --- |
| Use Stack | Push all digits to stack and simulate addition | O(N + M) |
| Recursion | Add from tail recursively | O(N) call stack |

---

## 🔁 Related Problems

- [LeetCode 2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) (reverse-order lists)
- [GFG: Add two numbers represented by linked lists](https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1)
- [LeetCode 445. Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/) (this exact problem)

---

## 🛠️ Real-World Analogy

> Think of the two linked lists like columns in manual addition:
> 
> 
> ```
>    7243
> +  564
> ------
>   7807
> 
> ```
> 
> But you have to reverse them first to simulate right-to-left addition.
>