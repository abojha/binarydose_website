---
title: Flatten Binary Tree to Linked List
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given the `root` of a binary tree, flatten the tree into a "linked list":

- The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
- The "linked list" should be in the same order as a [**pre-order traversal**](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) of the binary tree.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg)

```
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]

```

**Example 2:**

```
Input: root = []
Output: []

```

**Example 3:**

```
Input: root = [0]
Output: [0]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Recursive Reverse Preorder

```cpp
class Solution {
public:
    TreeNode *prev = NULL;

    void flatten(TreeNode* root) {
        if(root == NULL) return;

        flatten(root->right);  // Process right subtree first
        flatten(root->left);   // Then left subtree

        root->right = prev;    // Connect current node's right to previous node
        root->left = NULL;     // Nullify left
        prev = root;           // Move prev to current
    }
};

```

---

## ✅ Solution 2: Iterative using Stack (Preorder)

```cpp
class Solution {
public:
    void flatten(TreeNode* root) {
        if(root == NULL) return;

        stack<TreeNode*> st;
        st.push(root);

        while(!st.empty()){
            TreeNode *curr = st.top();
            st.pop();

            if(curr->right) st.push(curr->right);  // Push right child first
            if(curr->left) st.push(curr->left);    // Then left child

            if(!st.empty()) curr->right = st.top();  // Set current's right to next node in preorder

            curr->left = NULL;  // Left should always be null in the final linked list
        }
    }
};

```

---

## ✅ Solution 3: Morris Style (O(1) Space)

```cpp
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode *curr = root;

        while(curr){
            if(curr->left){
                TreeNode *pre = curr->left;
                while(pre->right){
                    pre = pre->right;  // Move to rightmost node of left subtree
                }

                pre->right = curr->right;  // Connect right subtree after left's tail
                curr->right = curr->left;  // Move left subtree to the right
                curr->left = NULL;         // Nullify left
            }
            curr = curr->right;  // Move to next node
        }
    }
};

```

---

## 📝 How It Works

- Problem asks to **flatten a binary tree** into a linked list in **preorder traversal**.
- All nodes’ `left` pointers should be `NULL`, and `right` pointers should point to the **next node in preorder**.
- Approaches:
    1. **Reverse Preorder (Right → Left → Root)** and connect `right = prev`.
    2. **Iterative Stack** simulates preorder traversal.
    3. **Morris-style** rewiring by finding the **predecessor** and updating pointers in-place.

---

## 🧩 Key Insight

- We simulate preorder without creating a new structure.
- In Morris, use threading via rightmost of left subtree.
- In reverse-recursive, think of post-processing the root after both children.

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(N) | O(H) recursion |
| Stack Iterative | O(N) | O(N) stack |
| Morris Style | O(N) | O(1) ✅ |

---

## ⚠️ Edge Cases

- Root is NULL
- Skewed tree (all left or all right)
- Tree with only one node

---

## 💡 Other Approaches

| Approach | Time | Space | Note |
| --- | --- | --- | --- |
| Extra List | O(N) | O(N) | Traverse → rebuild |
| Morris | O(N) | O(1) | In-place, trickier |

---

## 🔁 Related Problems

- [Leetcode 114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)
- Binary Tree Preorder Traversal
- Convert Binary Tree to DLL
- Tree to BST conversion
- Morris Traversals (Inorder/Preorder/Postorder)

---