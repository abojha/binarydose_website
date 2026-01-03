---
title: Populating Next Right Pointers in Each Node
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}

```

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)
    
    ```
    Input: root = [1,2,3,4,5,6,7]
    Output: [1,#,2,3,#,4,5,6,7,#]
    Explanation:Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
    
    ```
    
    **Example 2:**
    
    ```
    Input: root = []
    Output: []
    ```
    

---

---

## 🧠 Solution: Iterative (Using Existing `next` Pointers, O(1) Extra Space)

---

### 🧩 **C++ Implementation**

```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        // Start from the leftmost node of the current level
        Node* levelStart = root;

        while (levelStart) {
            // Dummy node acts as the head of the next level
            Node dummy(0);
            Node* tail = &dummy;  // tail builds the next level's chain

            // Traverse the current level using next pointers
            for (Node* node = levelStart; node != nullptr; node = node->next) {
                if (node->left) {
                    tail->next = node->left;
                    tail = tail->next;
                }
                if (node->right) {
                    tail->next = node->right;
                    tail = tail->next;
                }
            }

            // Move to the first node of the next level
            levelStart = dummy.next;
        }

        return root;
    }
};

```

---

### 🐍 **Python Implementation**

```python
class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None

        # Start from the leftmost node of the current level
        level_start = root

        while level_start:
            # Dummy node for the next level
            dummy = Node(0)
            tail = dummy  # tail builds the next level’s linked list

            # Traverse the current level
            current = level_start
            while current:
                if current.left:
                    tail.next = current.left
                    tail = tail.next
                if current.right:
                    tail.next = current.right
                    tail = tail.next

                # Move to next node in the same level
                current = current.next

            # Move to the first node of the next level
            level_start = dummy.next

        return root

```

---

## 📝 How It Works

- The algorithm processes **one level at a time**, using already established `next` pointers to traverse horizontally.
- A **dummy node** is used to build `next` links for the **next level** while traversing the **current level**.
- After processing one level, we move `level_start` to the next level using `dummy.next`.

👉 This avoids recursion and queues — achieving **constant extra space**.

---

## 🧩 Key Formula / Recurrence

There’s no recurrence here — but the key invariant is:

> While processing level L, all next pointers within L are already correct and used to build L+1.
> 

---

## ⏱️ Time & Space Complexity

| Metric | Complexity | Explanation |
| --- | --- | --- |
| **Time** | O(N) | Each node is processed exactly once |
| **Space** | O(1) | Only uses a few pointers (no queue/recursion) |

---

## ⚠️ Edge Cases

- Empty tree (`root = None`)
- Tree with only one node
- Skewed tree (all left or all right)
- Nodes missing one child (handled seamlessly)

---

## 💡 Other Approaches

| Approach | Description | Time | Space |
| --- | --- | --- | --- |
| **BFS (Queue)** | Level-order traversal using a queue | O(N) | O(W), W = width |
| **Recursive Helper** | Recursively connect subtrees using right pointers | O(N) | O(H) recursion stack |
| **Dummy Node (This)** | Iterative, pointer-based level traversal | O(N) | O(1) ✅ |

---

## 🔁 Related Problems

- **LeetCode 116:** Populating Next Right Pointers in Each Node (Perfect Binary Tree)
- **LeetCode 117:** Populating Next Right Pointers in Each Node II (General Tree)
- **LeetCode 199:** Binary Tree Right Side View
- **LeetCode 102:** Binary Tree Level Order Traversa

---