---
title: Check for Children Sum Properties
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given a binary tree having **n** nodes. Check whether all of its nodes have a value equal to the sum of their child nodes. Return 1 if all the nodes in the tree satisfy the given properties, else it returns 0. For every node, the data value must be equal to the sum of the data values in the left and right children. Consider the data value 0 for a NULL child. Also, leaves are considered to follow the property.

- Example:
    
    ```
    Examples:
    
    Input:
    Binary tree
           35
          /  \
         20   15
        / \   / \
       15  5 10  5
    
    Output: 1
    Explanation: 
    Here, every node is sum of its left and right child.
    ```
    

---

---

## ✅ Solution: Recursion (Postorder Traversal)

```cpp
/*
struct Node
{
    int data;
    struct Node* left;
    struct Node* right;

    Node(int x){
        data = x;
        left = right = NULL;
    }
};
*/

class Solution {
  public:

    // Recursive function to check sum property at each node
    bool solve(Node *root){
        // Base case: null node or leaf node always satisfies the property
        if(root == NULL || (root->left == NULL && root->right == NULL)){
            return true;
        }

        // Get values of left and right children, or 0 if child is NULL
        int left_val = root->left ? root->left->data : 0;
        int right_val = root->right ? root->right->data : 0;

        // Current node must equal sum of its children and both subtrees must satisfy the property
        return (root->data == left_val + right_val &&
                solve(root->left) &&
                solve(root->right));
    }

    // Wrapper function to return 1 (true) or 0 (false)
    int isSumProperty(Node *root) {
        if(root == NULL) return 1;  // Empty tree satisfies the property
        return solve(root);
    }
};

```

---

## 📝 How It Works

- For each node, check if `node->data == sum of left and right child data`.
- Use **postorder traversal** to ensure that the child subtrees are checked **before** verifying the parent node.
- If all nodes satisfy the condition, the function returns true.

---

## 🧩 Key Condition

```cpp
root->data == left_val + right_val &&
solve(root->left) &&
solve(root->right)

```

- Ensures:
    - Current node equals sum of children.
    - Both left and right subtrees satisfy the same rule.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – Each node visited once |
| Space | O(H) – Recursion stack (`H` = tree height) |

---

## ⚠️ Edge Cases

- Empty tree → valid (return 1)
- Single node → valid (return 1)
- Node with one child → child is treated as 0 if missing, which satisfies the condition

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| DFS ✅ | O(N) | O(H) |
| BFS level-order | O(N) | O(N) |

---

## 🔁 Related Problems

- GFG: [Children Sum Parent](https://practice.geeksforgeeks.org/problems/children-sum-parent/1)
- Leetcode 112: Path Sum
- Leetcode 101: Symmetric Tree

---