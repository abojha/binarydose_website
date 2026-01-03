---
title: Merge K Linked List
description: ""
tags:
  - heaps
  - med
---

### Problem Statement:

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

- Example:
    
    ```
    Input: lists = [[1,4,5],[1,3,4],[2,6]]
    Output: [1,1,2,3,4,4,5,6]
    Explanation: The linked-lists are:
    [
      1->4->5,
      1->3->4,
      2->6
    ]
    merging them into one sorted linked list:
    1->1->2->3->4->4->5->6
    
    ```
    
    ```
    Input: lists = []
    Output: []
    
    ```
    
    ```
    Input: lists = [[]]
    Output: []
    ```
    

---

---

## Solution: Min-Heap (Priority Queue)

```cpp
// Technique: Min-Heap (Priority Queue)
// Time: O(N log k), Space: O(k)

class compare {
public:
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;  // min-heap (smaller value has higher priority)
    }
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, compare> pq;

        // Push first node of each non-empty list into min-heap
        for (auto head : lists) {
            if (head != nullptr) pq.push(head);
        }

        // Dummy node to simplify list construction
        ListNode* dummy = new ListNode(-1);
        ListNode* tail = dummy;

        // Extract the smallest node, append to result, and push its next
        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();

            tail->next = node;  // append node
            tail = node;

            if (node->next != nullptr) {
                pq.push(node->next);  // push next from same list
            }
        }

        return dummy->next;  // skip dummy
    }
};

```

---

## 📝 How It Works

1. A **min-heap (priority queue)** is built that stores the current smallest head among all lists.
2. Initially, push the **first node** of each non-empty list into the heap.
3. Repeatedly:
    - Pop the **smallest node**.
    - Append it to the result linked list.
    - Push its `next` node (if exists) into the heap.
4. Continue until heap is empty → merged sorted list is ready.

This ensures the merged list always remains sorted because we always take the smallest available node.

---

## 🧩 Key Formula / Recurrence

- Not a recursive DP, but key transition:
    - For each popped node → push its `next`.
- Heap ensures smallest element is always extracted in `O(log k)` time.

---

## ⏱️ Time & Space Complexity

- **Time Complexity:** `O(N log k)`
    - `N` = total number of nodes
    - Each node is pushed + popped once (`O(log k)` per operation).
- **Space Complexity:** `O(k)` (size of heap).

---

## ⚠️ Edge Cases

- `lists` is empty (`[]`) → return `nullptr`.
- All lists are empty (`[NULL, NULL]`) → return `nullptr`.
- Only one list → directly returned.
- Lists with duplicate values → handled correctly since comparator only compares values.

---

## 💡 Other Approaches

1. **Divide & Conquer (Pairwise Merge)**
    - Merge lists in pairs recursively like merge sort.
    - Time: `O(N log k)`, Space: `O(1)` (ignoring recursion).
2. **Sequential Merge**
    - Merge first two, then merge with third, etc.
    - Time: `O(kN)` → too slow for large `k`.
3. **Flatten & Sort**
    - Collect all nodes into vector, sort, rebuild list.
    - Time: `O(N log N)`, Space: `O(N)`.

---

## 🔁 Related Problems

- **LeetCode 21:** Merge Two Sorted Lists
- **LeetCode 23:** Merge k Sorted Lists (this one)
- **LeetCode 632:** Smallest Range Covering k Lists

---