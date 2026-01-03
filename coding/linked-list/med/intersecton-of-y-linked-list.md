---
title: Intersecton of Y Linked List
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the head of two singly linked lists, return the point where these two linked lists intersect.

Note: It is guaranteed that the intersected node always exists.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Length Difference Method

```cpp
class Solution {
  public:
    int getLength(Node *head1, Node *head2) {
        int len1 = 0, len2 = 0;
        while(head1 || head2) {
            if(head1) {
                len1++;
                head1 = head1->next;
            }
            if(head2) {
                len2++;
                head2 = head2->next;
            }
        }
        return len1 - len2;
    }

    Node* intersectPoint(Node* head1, Node* head2) {
        if(head1 == NULL || head2 == NULL) return NULL;

        int diff = getLength(head1, head2);

        // Move longer list's pointer ahead by the diff
        if(diff < 0) {
            while(diff--) head2 = head2->next;
        } else {
            while(diff--) head1 = head1->next;
        }

        // Move both pointers together until they meet
        while(head1 && head2) {
            if(head1 == head2) return head1;
            head1 = head1->next;
            head2 = head2->next;
        }

        return NULL;
    }
};

```

---

## ✅ Solution 2: Two Pointer Switching (Optimal)

```cpp
class Solution {
  public:
    Node* intersectPoint(Node* head1, Node* head2) {
        Node *temp1 = head1, *temp2 = head2;

        while(temp1 != temp2) {
            temp1 = (temp1 == NULL) ? head2 : temp1->next;
            temp2 = (temp2 == NULL) ? head1 : temp2->next;
        }

        return temp1; // Either intersection node or NULL
    }
};

```

---

## 📝 How It Works

### **Length Difference Approach**

- Traverse both lists to calculate their lengths.
- Move the longer list’s pointer ahead by the length difference.
- Then move both pointers together until they meet.

### **Two Pointer Switching**

- When a pointer reaches the end, redirect it to the head of the other list.
- This ensures both pointers traverse equal total length.
- If they intersect, they meet at the node.
- If not, both become `NULL` together.

---

## 🧩 Key Insight

> Two pointer switching ensures both pointers travel equal distance:
> 
> 
> `a + b + c == b + a + c`
> 
> Where:
> 
> - `a` = distance to intersection from head1
> - `b` = distance to intersection from head2
> - `c` = shared tail (intersection onward)

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Length Difference | O(N + M) | O(1) |
| Two Pointer Switching ✅ | O(N + M) | O(1) |

Where `N` and `M` are the lengths of the two lists.

---

## ⚠️ Edge Cases

- ✅ No intersection → both reach `NULL` and return `NULL`
- ✅ One or both lists are `NULL` → returns `NULL`
- ✅ Intersection at head → both pointers point to same node immediately

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Hashing | O(N + M) | O(N) | Store visited nodes from list1 and check list2 |
| Length Diff ✅ | O(N + M) | O(1) | Simple logic |
| Two Pointer ✅ | O(N + M) | O(1) | Elegant, preferred in interviews |

---

## 🔁 Related Problems

- [LeetCode 160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)
- [GFG: Intersection Point in Y Shaped Linked Lists](https://practice.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1)
- [LeetCode 141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [LeetCode 21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

---