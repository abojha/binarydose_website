---
title: Construct Binary Tree from Inorder and Postorder Traversal
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return *the binary tree*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

```
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

```

**Example 2:**

```
Input: inorder = [-1], postorder = [-1]
Output: [-1]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive Tree Construction from Inorder and Postorder

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    // Recursive function to construct binary tree
    TreeNode* construction(vector<int> &postorder, int postStart, int postEnd,
                           vector<int> &inorder, int inStart, int inEnd,
                           map<int, int> &inorderIndexMap) {

        if (postStart > postEnd || inStart > inEnd) return NULL;

        // Last element of postorder is always the root
        TreeNode* root = new TreeNode(postorder[postEnd]);

        // Find the root in the inorder array
        int inRootIndex = inorderIndexMap[root->val];

        // Number of nodes in the left subtree
        int leftSubtreeSize = inRootIndex - inStart;

        // Build left subtree
        root->left = construction(postorder, postStart, postStart + leftSubtreeSize - 1,
                                  inorder, inStart, inRootIndex - 1, inorderIndexMap);

        // Build right subtree
        root->right = construction(postorder, postStart + leftSubtreeSize, postEnd - 1,
                                   inorder, inRootIndex + 1, inEnd, inorderIndexMap);

        return root;
    }

    // Main function to initiate tree building
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        map<int, int> inorderIndexMap;

        // Map each inorder value to its index for quick lookup
        for (int i = 0; i < inorder.size(); i++) {
            inorderIndexMap[inorder[i]] = i;
        }

        return construction(postorder, 0, postorder.size() - 1,
                            inorder, 0, inorder.size() - 1,
                            inorderIndexMap);
    }
};

```

---

## 📝 How It Works

- The **last element** of the `postorder` array is always the **root**.
- Find the root’s index in the `inorder` array to split into **left and right subtrees**.
- Use that size to calculate postorder subarray ranges for each subtree.
- Recursively repeat the process for left and right children.

---

## 🧩 Key Formula / Recurrence

- **Postorder:** `[left subtree] [right subtree] [root]`
- **Inorder:** `[left subtree] [root] [right subtree]`
- Recursive Breakdown:

```cpp
root = postorder[postEnd]
inRootIndex = map[root]
leftSize = inRootIndex - inStart

root->left  = construct(postStart, postStart + leftSize - 1)
root->right = construct(postStart + leftSize, postEnd - 1)

```

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – every node visited once |
| Space | O(N) – map + recursion stack |

---

## ⚠️ Edge Cases

- Empty input arrays → return `NULL`
- Single node → works as expected
- Skewed trees → handled correctly by recursion

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Recursive ✅ | O(N) | O(N) | Clean and optimal |
| Iterative (with stack) | O(N) | O(N) | Complex logic, rarely used |

---

## 🔁 Related Problems

- Leetcode 106: [Construct Binary Tree from Inorder and Postorder](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- Leetcode 105: Construct from Preorder + Inorder
- Leetcode 889: Construct from Preorder and Postorder
- GFG: Tree Construction Problems

---