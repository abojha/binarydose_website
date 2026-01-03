---
title: Insertion in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

You are given the `root` node of a binary search tree (BST) and a `value` to insert into the tree. Return *the root node of the BST after the insertion*. It is **guaranteed** that the new value does not exist in the original BST.

**Notice** that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return **any of them**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/05/insertbst.jpg)

```
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:

```

![](https://assets.leetcode.com/uploads/2020/10/05/bst.jpg)

**Example 2:**

```
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

```

**Example 3:**

```
Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive

```cpp
TreeNode* insertIntoBST(TreeNode* root, int val) {
    if(root == NULL){
        // Create a new node when reaching the NULL spot
        return new TreeNode(val);
    }

    if(val < root->val){
        root->left = insertIntoBST(root->left, val);
    }
    else if(val > root->val){
        root->right = insertIntoBST(root->right, val);
    }

    return root;
}

```

---

## ✅ Solution: Iterative

```cpp
TreeNode* insertIntoBST(TreeNode* root, int val) {
    TreeNode* newNode = new TreeNode(val);

    if(root == NULL) return newNode;

    TreeNode* curr = root;

    while(true){
        if(val < curr->val){
            if(curr->left == NULL){
                curr->left = newNode;
                break;
            }
            curr = curr->left;
        }
        else{
            if(curr->right == NULL){
                curr->right = newNode;
                break;
            }
            curr = curr->right;
        }
    }

    return root;
}

```

---

## 📝 How It Works

- Traverse the BST using binary search logic.
- If the value is smaller → go left.
- If greater → go right.
- Insert the node where the null pointer is encountered.
- Recursive version relies on stack, while iterative manages pointer manually.

---

## 🧩 Key Idea

Insert `val` into its **correct sorted position** in the BST so that the tree remains a valid binary search tree:

```
Left Subtree  < Node < Right Subtree

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(H) | O(H) (stack) |
| Iterative | O(H) | O(1) |

Where H = height of tree (O(log N) for balanced, O(N) for skewed).

---

## ⚠️ Edge Cases

- Inserting into an empty tree.
- Inserting duplicate value (this code **ignores duplicates**).
- Left/right subtree is null — insert directly.

---

## 💡 Other Approaches

- You can use **Morris Traversal** if required, but it's **overkill** here.
- Use an explicit stack to simulate recursion if iterative with stack is preferred.

---

## 🔁 Related Problems

- Search in BST
- Delete a node in BST
- Lowest Common Ancestor in BST
- BST to Balanced BST conversion

---