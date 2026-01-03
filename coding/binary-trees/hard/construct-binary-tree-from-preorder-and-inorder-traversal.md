---
title: Construct Binary Tree from Preorder and Inorder Traversal
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return *the binary tree*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

```

**Example 2:**

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive Tree Construction from Inorder and Preorder

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
    TreeNode* construction(vector<int> &preorder, int preStart, int preEnd,
                           vector<int> &inorder, int inStart, int inEnd,
                           map<int, int> &inorderIndexMap) {

        if (preStart > preEnd || inStart > inEnd) return NULL;

        // First element in preorder is root
        TreeNode* root = new TreeNode(preorder[preStart]);

        // Index of root in inorder traversal
        int inRootIndex = inorderIndexMap[root->val];

        // Number of elements in left subtree
        int leftSubtreeSize = inRootIndex - inStart;

        // Recursively construct left and right subtrees
        root->left = construction(preorder, preStart + 1, preStart + leftSubtreeSize,
                                  inorder, inStart, inRootIndex - 1, inorderIndexMap);

        root->right = construction(preorder, preStart + leftSubtreeSize + 1, preEnd,
                                   inorder, inRootIndex + 1, inEnd, inorderIndexMap);

        return root;
    }

    // Main function to build tree
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        map<int, int> inorderIndexMap;

        // Store indices of inorder elements for quick lookup
        for (int i = 0; i < inorder.size(); i++) {
            inorderIndexMap[inorder[i]] = i;
        }

        return construction(preorder, 0, preorder.size() - 1,
                            inorder, 0, inorder.size() - 1,
                            inorderIndexMap);
    }
};

```

---

## 📝 How It Works

- The first element of `preorder` is always the **root** of the (sub)tree.
- Locate this root in the `inorder` array to divide the array into **left and right subtrees**.
- Recursively repeat this process for the left and right halves of the inorder array, updating corresponding ranges in the preorder array.

---

## 🧩 Key Concept

- **Preorder Traversal:** `[root] [left subtree] [right subtree]`
- **Inorder Traversal:** `[left subtree] [root] [right subtree]`
- Using the **root’s index in inorder**, we split the array and determine the size of left subtree.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – Each node processed once |
| Space | O(N) – Map + recursion stack |

---

## ⚠️ Edge Cases

- Empty tree (`preorder` or `inorder` is empty)
- Only one node → correctly handled
- Left-skewed or right-skewed trees → handled via recursion

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Recursive (this) ✅ | O(N) | O(N) | Optimal for tree construction |
| Iterative with Stack | O(N) | O(N) | More complex logic |

---

## 🔁 Related Problems

- Leetcode 105: [Construct Binary Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- Leetcode 106: Construct from Inorder and Postorder
- Leetcode 889: Construct from Preorder and Postorder
- GFG: Tree from Inorder and Preorder

---