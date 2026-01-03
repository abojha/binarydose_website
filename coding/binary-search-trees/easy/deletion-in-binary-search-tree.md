---
title: Deletion in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return *the **root node reference** (possibly updated) of the BST*.

Basically, the deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/04/del_node_1.jpg)

```
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

```

![](https://assets.leetcode.com/uploads/2020/09/04/del_node_supp.jpg)

**Example 2:**

```
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.

```

**Example 3:**

```
Input: root = [], key = 0
Output: []
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive (with Inorder Successor)

```cpp
TreeNode *getSuccessor(TreeNode *curr){
    curr = curr->right;
    while(curr != NULL && curr->left != NULL){
        curr = curr->left; // Find the smallest in right subtree
    }
    return curr;
}

TreeNode* deleteNode(TreeNode* root, int key) {
    if(root == NULL) return root;

    if(key < root->val){
        root->left = deleteNode(root->left, key);
    }
    else if(key > root->val){
        root->right = deleteNode(root->right, key);
    }
    else{
        // Node to delete found
        if(root->left == NULL){
            TreeNode *temp = root->right;
            delete root;
            return temp;
        }

        if(root->right == NULL){
            TreeNode *temp = root->left;
            delete root;
            return temp;
        }

        // Node with 2 children: use inorder successor
        TreeNode *succ = getSuccessor(root);
        root->val = succ->val;
        root->right = deleteNode(root->right, succ->val);
    }
    return root;
}

```

---

## 📝 How It Works

- **Search phase**: Recursively find the node matching the key.
- **Delete phase**:
    - If node has **no children**, return `NULL`.
    - If node has **one child**, bypass it by returning the non-null child.
    - If node has **two children**:
        - Find the **inorder successor** (smallest in right subtree).
        - Replace current node’s value with successor's.
        - Recursively delete the successor node.

---

## 🧩 Key Formula / Recurrence

- Recurrence follows BST traversal:
    
    ```
    T(N) = T(N/2) + O(H)
    
    ```
    
- If root is the node to delete:
    - If two children:
        - `root->val = successor value`
        - `deleteNode(root->right, successor value)`

---

## ⏱️ Time & Space Complexity

| Case | Time | Space |
| --- | --- | --- |
| Best (Balanced BST) | O(log N) | O(log N) |
| Worst (Skewed) | O(N) | O(N) |

---

## ⚠️ Edge Cases

- Node not found in the tree → just return root.
- Node is a **leaf node**.
- Node has **only one child**.
- Node has **two children**.

---

## 💡 Other Approaches

| Method | Time | Notes |
| --- | --- | --- |
| Iterative version | O(H) | Harder to write, no recursion stack |
| Inorder Predecessor | O(H) | Can be used instead of successor |

---

## 🔁 Related Problems

- Insert into a BST
- Search in a BST
- Validate Binary Search Tree
- Lowest Common Ancestor in BST
- Kth Smallest Element in BST

---