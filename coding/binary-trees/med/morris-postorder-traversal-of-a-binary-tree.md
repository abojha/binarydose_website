---
title: Morris PostOrder Traversal of a Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

---

---

### ✅ Solution: Morris Postorder Traversal

```cpp
class Solution {
public:
    // Helper to reverse the path and collect values
    void reversePath(TreeNode* startNode, TreeNode* endNode, vector<int>& result) {
        reverseEdges(startNode, endNode);

        TreeNode* node = endNode;
        while (true) {
            result.push_back(node->val);
            if (node == startNode) break;
            node = node->right;
        }

        reverseEdges(endNode, startNode); // Restore original tree structure
    }

    // Reverses right pointers between two nodes
    void reverseEdges(TreeNode* fromNode, TreeNode* toNode) {
        if (fromNode == toNode) return;
        TreeNode* prev = fromNode;
        TreeNode* curr = fromNode->right;
        TreeNode* next;

        while (prev != toNode) {
            next = curr->right;
            curr->right = prev;
            prev = curr;
            curr = next;
        }
    }

    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> postorderResult;
        TreeNode dummy(0);  // Dummy node simplifies edge handling
        dummy.left = root;
        TreeNode* current = &dummy;

        while (current != NULL) {
            if (current->left == NULL) {
                current = current->right;
            } else {
                TreeNode* predecessor = current->left;
                while (predecessor->right && predecessor->right != current) {
                    predecessor = predecessor->right;
                }

                if (predecessor->right == NULL) {
                    // Make thread and move left
                    predecessor->right = current;
                    current = current->left;
                } else {
                    // Visit in reverse and remove thread
                    reversePath(current->left, predecessor, postorderResult);
                    predecessor->right = NULL;
                    current = current->right;
                }
            }
        }

        return postorderResult;
    }
};

```

---

## 📝 How It Works

- This is **Morris traversal** adapted for **postorder**, achieving **O(1) space**.
- We use a **dummy node** that links to root to help in final reversal.
- It works by building temporary **threads (right pointers)** and reverses the path from left child to predecessor, collects values in reverse, and then restores the structure.

---

## 🧩 Key Idea / Trick

- For any node, if it has a left child:
    - Find its **rightmost predecessor** in the left subtree.
    - Create a temporary thread to the current node.
    - After processing left subtree, **reverse the path** from child to predecessor and collect it.
- **Postorder = Left → Right → Root**, so we reverse the order before collecting.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- No recursion or stack used.
- Nodes are visited a finite number of times via threaded connections.

---

## ⚠️ Edge Cases

- Empty tree (returns empty list)
- Tree with only root node (returns one value)
- Deep skewed tree (still works in O(1) space)

---

## 💡 Other Approaches

| Approach | Time | Space | Remarks |
| --- | --- | --- | --- |
| Recursive DFS | O(N) | O(H) | Uses call stack |
| Iterative + Stack | O(N) | O(H) | Clean and easy to understand |
| ✅ Morris Traversal | O(N) | O(1) | Optimal space, trickier logic |

---

## 🔁 Related Problems

- Leetcode 145. **Binary Tree Postorder Traversal**
- Leetcode 94. Inorder Traversal
- Leetcode 144. Preorder Traversal
- Leetcode 199. Binary Tree Right Side View

---