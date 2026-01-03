---
title: Serialize and Deserialize Binary Tree
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

**Clarification:** The input/output format is the same as [how LeetCode serializes a binary tree](https://support.leetcode.com/hc/en-us/articles/32442719377939-How-to-create-test-cases-on-LeetCode#h_01J5EGREAW3NAEJ14XC07GRW1A). You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg)

```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

```

**Example 2:**

```
Input: root = []
Output: []
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Level Order (BFS) Based Serialization and Deserialization

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:

    // Encodes a binary tree to a single string using level-order traversal
    string serialize(TreeNode* root) {
        if (!root) return "";

        string s = "";
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode *node = q.front();
            q.pop();

            if (node == NULL) {
                s += "#,"; // '#' represents null node
            } else {
                s += to_string(node->val) + ','; // append current node's value
                q.push(node->left);  // enqueue left child
                q.push(node->right); // enqueue right child
            }
        }
        return s;
    }

    // Decodes the serialized string back to binary tree
    TreeNode* deserialize(string data) {
        if (data.empty()) return NULL;

        stringstream s(data);
        string str;

        getline(s, str, ',');
        TreeNode *root = new TreeNode(stoi(str)); // create root

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode *curr = q.front();
            q.pop();

            // Get left child value
            getline(s, str, ',');
            if (str != "#") {
                TreeNode *leftNode = new TreeNode(stoi(str));
                curr->left = leftNode;
                q.push(curr->left);
            }

            // Get right child value
            getline(s, str, ',');
            if (str != "#") {
                TreeNode *rightNode = new TreeNode(stoi(str));
                curr->right = rightNode;
                q.push(curr->right);
            }
        }

        return root;
    }
};

// Usage:
// Codec ser, deser;
// TreeNode* ans = deser.deserialize(ser.serialize(root));

```

---

## 📝 How It Works

### ✅ Serialization:

- Traverse the tree using **level-order (BFS)**.
- For every node:
    - If it exists → append its value to the string.
    - If it’s null → append `"#"` to represent a missing child.
- Use comma `,` as a separator.

### ✅ Deserialization:

- Read the serialized string using `stringstream` and `getline`.
- Reconstruct the tree level by level.
- Use a queue to keep track of parents and link their left and right children as you parse values.

---

## 🧩 Key Design

- Use **"#"** to represent `NULL` nodes explicitly.
- Maintain **order of insertion** to ensure tree structure is preserved during decode.

---

## ⏱️ Time & Space Complexity

| Operation | Time | Space |
| --- | --- | --- |
| Serialize (BFS) | O(N) | O(N) |
| Deserialize (BFS) | O(N) | O(N) |
- `N` is the number of nodes in the tree.

---

## ⚠️ Edge Cases

- Empty tree → serialized as empty string `""`, deserialized as `NULL`.
- Tree with only one node → handled correctly.
- Trees with null children at various positions → supported by `"#"` markers.

---

## 💡 Other Approaches

| Approach | Time | Space | Comment |
| --- | --- | --- | --- |
| BFS (Level Order) ✅ | O(N) | O(N) | Simple, clear structure |
| DFS (Preorder) | O(N) | O(H) | More compact, recursive design |
| DFS (Postorder) | O(N) | O(H) | Good for symmetric trees |

---

## 🔁 Related Problems

- Leetcode 297: [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- Leetcode 449: Serialize and Deserialize BST
- Leetcode 116: Populating Next Right Pointers

---