---
title: Bottom View of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a binary **tree**, return an array where elements represent the bottom view of the binary tree from left to right.

Note: If there are **multiple** bottom-most nodes for a horizontal distance from the root, then the **later** one in the level order traversal is considered. For example, in the below diagram, 7 and 34 both are the bottommost nodes at a horizontal distance of 0 from the root, here **34** will be considered.For the above tree, the output should be 5 8 34 22 25

**Examples :**

```
Input:root[] = [1, 3, 2]

Output:[3 1 2]
Explanation:First case represents a tree with 3 nodes and 2 edges where root is 1, left child of 1 is 3 and right child of 1 is 2.

Thus bottom view of the binary tree will be 3 1 2.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700160/Web/Other/blobid1_1749205073.webp)

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700160/Web/Other/blobid0_1749729655.webp)

```
Input:root[] = [10, 20, 30, 40, 60]

Output:[40 20 60 30]
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700160/Web/Other/blobid2_1749729901.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Level Order Traversal with Horizontal Distance (Bottom View)

```cpp
/*
struct Node {
    int data;
    Node* left;
    Node* right;
};
*/

class Solution {
  public:
    vector<int> bottomView(Node *root) {
        vector<int> result;

        // Map to store the last node seen at each horizontal distance
        map<int, int> hdToNodeValue;

        // Queue for BFS: each element stores a node and its horizontal distance
        queue<pair<Node*, int>> bfsQueue;
        bfsQueue.push({root, 0});  // Start with root at horizontal distance 0

        while (!bfsQueue.empty()) {
            auto [currentNode, hd] = bfsQueue.front();
            bfsQueue.pop();

            // For bottom view, overwrite existing value at the horizontal distance
            hdToNodeValue[hd] = currentNode->data;

            if (currentNode->left) {
                bfsQueue.push({currentNode->left, hd - 1});
            }

            if (currentNode->right) {
                bfsQueue.push({currentNode->right, hd + 1});
            }
        }

        // Extract values from the map in sorted order of horizontal distance
        for (const auto& [hd, val] : hdToNodeValue) {
            result.push_back(val);
        }

        return result;
    }
};

```

---

## 📝 How It Works

- Perform a **BFS traversal** of the tree while tracking each node's **horizontal distance** (HD) from the root.
- Unlike top view, in bottom view we always **overwrite** the value at a given HD with the latest (deepest) node.
- After BFS, extract values from the map sorted by HD for the final result.

---

## 🧩 Key Idea

- Use a queue for BFS traversal.
- Track and update the node at each horizontal distance using a map.
- The last node at each HD (in level order) is the one visible from the bottom.

---

## ⏱️ Time & Space Complexity

| Measure | Value |
| --- | --- |
| ⏱️ Time | O(N log N) due to `map` |
| 💾 Space | O(N) for `map` + `queue` |

---

## ⚠️ Edge Cases

- Tree is empty → return an empty vector.
- Tree with a single node → return only that node.
- Tree with multiple nodes at same HD but different levels → bottom-most node takes precedence.

---

## 💡 Other Approaches

| Approach | Time | Description |
| --- | --- | --- |
| BFS with `unordered_map` | O(N), but output needs sorting |  |
| DFS with depth tracking | O(N), but more complex logic to manage depth and HD |  |

---

## 🔁 Related Problems

- [Top View of Binary Tree](https://leetcode.com/problems/binary-tree-top-view/)
- [Vertical Order Traversal](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)
- [Left View of Binary Tree](https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/)
- [Right View of Binary Tree](https://practice.geeksforgeeks.org/problems/right-view-of-binary-tree/)

---