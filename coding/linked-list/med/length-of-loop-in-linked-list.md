---
title: Length of Loop in Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the head of a **linked list**, ****determine the **length** of a **loop** present in the linked list; if not present, return **0.**

Example 1:
Input Format:
LL: 1  2  3  4  5
Output: 3
Explanation: A cycle exists in the linked list starting at node 3 -> 4 -> 5 and then back to 3. There are 3 nodes present in this cycle.

![](https://static.takeuforward.org/wp/uploads/2023/12/tuxpi.com_.1698730326-1024x537.jpg)

Example 2:
Input Format:
LL: 1  2  3  4  9  9
Output:0
Explanation: In this example, the linked list is linear and does not have a loop hence return 0.

![](https://static.takeuforward.org/wp/uploads/2023/12/tuxpi.com_.1698730362-1024x268.jpg)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Floyd’s Cycle Detection + Counting Loop Length

```cpp
/*
struct Node {
    int data;
    struct Node *next;
    Node(int x) {
        data = x;
        next = NULL;
    }
};
*/

class Solution {
public:
    // Function to find the length of a loop in the linked list.
    int countNodesinLoop(Node *head) {
        if(head == NULL || head->next == NULL) return 0;

        Node *slow = head;
        Node *fast = head;

        // Phase 1: Detect cycle using slow and fast pointers
        while(fast != NULL && fast->next != NULL){
            slow = slow->next;
            fast = fast->next->next;

            if(fast == slow){
                // Cycle detected, count its length
                int cnt = 1;
                fast = fast->next;
                while(slow != fast){
                    cnt++;
                    fast = fast->next;
                }
                return cnt;
            }
        }

        return 0; // No cycle
    }
};

```

---

## 📝 How It Works

- First, we detect the presence of a cycle using Floyd’s algorithm.
- Once the `slow` and `fast` pointers meet, it confirms a cycle.
- From that point, we **traverse the cycle once** using one pointer (`fast`) until we return to the meeting point, counting steps to determine the loop's length.

---

## 🧩 Key Formula / Logic

- Detect cycle:
    
    ```cpp
    if (slow == fast) → cycle detected
    
    ```
    
- Count nodes in the cycle:
    
    ```cpp
    do {
        count++;
        fast = fast->next;
    } while(fast != slow);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Fast and slow pointers make a linear traversal.
- No extra space used.

---

## ⚠️ Edge Cases

- No loop: returns `0`
- Single node with self-loop: returns `1`
- Entire list is a loop
- Long tail before entering loop

---

## 💡 Other Approaches

| Method | Time | Space | Description |
| --- | --- | --- | --- |
| Hashing | O(N) | O(N) | Store visited nodes |
| Floyd’s Cycle | O(N) | O(1) | Most optimal ✅ |

---

## 🔁 Related Problems

- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

---