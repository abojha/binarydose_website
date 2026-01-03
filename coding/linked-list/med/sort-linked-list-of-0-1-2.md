---
title: Sort Linked List of  0, 1, 2
description: ""
tags:
  - linked
  - linked-list
  - list
  - med
  - singly
---

### Problem Statement:

Given the **head** of a linked list where nodes can contain values **0s**, **1s,** and **2s** only. Your task is to **rearrange** the list so that all **0s** appear at the beginning, followed by all **1s**, and all **2s** are placed at the end.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Counting Sort (Two-pass Approach)

```cpp
class Solution {
  public:
    Node* segregate(Node* head) {
        int count[3] = {0, 0, 0};

        // First pass: Count the number of 0s, 1s, and 2s
        Node *temp = head;
        while(temp != NULL){
            count[temp->data]++;
            temp = temp->next;
        }

        // Second pass: Overwrite values based on counts
        int i = 0;
        temp = head;
        while(temp){
            if(count[i] == 0){
                i++;
            } else {
                temp->data = i;
                count[i]--;
                temp = temp->next;
            }
        }
        return head;
    }
};

```

---

## 📝 How It Works

- The list contains only 0s, 1s, and 2s.
- First, we **count occurrences** of each number using a frequency array.
- Then, we **overwrite node values** with 0s, 1s, and 2s based on the count — simulating sorting.
- No node creation or pointer manipulation needed — we **reuse the existing nodes**.

---

## 🧩 Key Logic

> Step 1: Count frequency of 0, 1, 2
> 
> 
> Step 2: Rewrite nodes sequentially with those values
> 

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | **O(N)** — two traversals of the list |
| 🪄 Space Complexity | **O(1)** — uses only 3 counters |

---

## ⚠️ Edge Cases

- ✅ Empty list → return `NULL`
- ✅ All values are same (e.g., all 1s or all 2s) → remains unchanged
- ✅ Only one element → unchanged
- ✅ Random mix → will be sorted in-place as 0s → 1s → 2s

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Dummy Node List for 0s, 1s, 2s | O(N) | O(1) | Uses separate sub-lists and merges them |
| In-place data overwrite ✅ | O(N) | O(1) | Simple and efficient |

---

## 🔁 Related Problems

- [LeetCode 75. Sort Colors](https://leetcode.com/problems/sort-colors/) – similar logic with arrays
- [GFG: Given a linked list of 0s, 1s and 2s, sort it](https://www.geeksforgeeks.org/sort-a-linked-list-of-0s-1s-or-2s/)
- [LC 86. Partition List](https://leetcode.com/problems/partition-list/) – separate logic but related in idea

---