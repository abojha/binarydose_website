---
title: Find pairs with given sum in doubly linked list
description: ""
tags:
  - doubly
  - linked
  - linked-list
  - list
  - med
---

### Problem Statement:

Given a sorted doubly linked list of positive distinct elements, the task is to find pairs in a doubly-linked list whose sum is equal to given value **target**.

- Example:
    
    ```
    Example 1:
    
    Input:  
    1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9
    target = 7
    Output: (1, 6), (2,5)
    Explanation: We can see that there are two pairs 
    (1, 6) and (2,5) with sum 7.
     
    
    Example 2:
    
    Input: 
    1 <-> 5 <-> 6
    target = 6
    Output: (1,5)
    Explanation: We can see that there is one pairs  (1, 5) with sum 6.
    ```
    

---

---

## ✅ Solution: Two-Pointer Technique on Doubly Linked List

```cpp
class Solution {
  public:
    vector<pair<int, int>> findPairsWithGivenSum(Node *head, int targetSum) {
        vector<pair<int, int>> result;

        if (head == NULL || head->next == NULL) return result;

        Node* leftPointer = head;
        Node* rightPointer = head;

        // Move rightPointer to the end of the list
        while (rightPointer->next != NULL)
            rightPointer = rightPointer->next;

        // Apply two-pointer approach
        while (leftPointer != rightPointer && leftPointer->data <= rightPointer->data) {
            int currentSum = leftPointer->data + rightPointer->data;

            if (currentSum == targetSum) {
                result.push_back({leftPointer->data, rightPointer->data});
                leftPointer = leftPointer->next;
                rightPointer = rightPointer->prev;
            }
            else if (currentSum > targetSum) {
                rightPointer = rightPointer->prev;
            }
            else {
                leftPointer = leftPointer->next;
            }
        }

        return result;
    }
};

```

---

## 📝 How It Works

- Use two pointers: one starting from the **beginning** (`leftPointer`), and the other from the **end** (`rightPointer`) of the doubly linked list.
- The algorithm is similar to the classic two-pointer technique used on arrays, but adapted to a doubly linked list using `next` and `prev` pointers.
- For each pair:
    - If the sum equals the target, store it and move both pointers inward.
    - If the sum is greater than the target, move the right pointer left.
    - If the sum is less than the target, move the left pointer right.
- Terminate when both pointers meet or cross.

---

## 🧩 Key Logic

- Two-pointer approach in a **sorted** doubly linked list.
- Works because the list is sorted in non-decreasing order.

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) extra |

---

## ⚠️ Edge Cases

- Empty list or only one node → return empty vector.
- No such pair exists → return empty vector.
- Multiple pairs possible → all valid pairs returned.
- Nodes can have the **same value** multiple times.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force (2 nested loops) | O(N²) | O(1) |
| Hashing | O(N) | O(N) |
| Two-pointer (used here) | O(N) ✅ | O(1) ✅ |

---

## 🔁 Related Problems

- [Two Sum II - Input array is sorted (Leetcode 167)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- Count pairs with given sum in a sorted doubly linked list
- Remove Duplicates from Sorted Linked List
- Intersection Point in Y Shaped Linked Lists

---