---
title: Top View of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

You are given a binary tree, and your task is to return its **top view**. The top view of a binary tree is the set of nodes visible when the tree is viewed from the top.

**Note:**

- Return the nodes from the leftmost node to the rightmost node.
- If two nodes are at the same position (horizontal distance) and are outside the shadow of the tree, consider the leftmost node only.

**Examples:**

```
Input:root[] = [1, 2, 3]

Output:[2, 1, 3]
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700490/Web/Other/blobid0_1733898095.png)

- Example:
    
    ```
    
    ```
    

---

---

### ✅ Solution: Level Order Traversal with Horizontal Distance

```cpp
/*
struct Node
{
    int data;
    Node* left;
    Node* right;
};
*/

class Solution {
  public:
    vector<int> topView(Node *root) {
        vector<int> result;

        // Map to store the first node at each horizontal distance
        map<int, int> horizontalDistanceMap;

        // Queue for BFS: holds node and its horizontal distance from root
        queue<pair<Node*, int>> bfsQueue;
        bfsQueue.push({root, 0}); // Root has horizontal distance = 0

        while (!bfsQueue.empty()) {
            auto currentPair = bfsQueue.front();
            bfsQueue.pop();

            Node* currentNode = currentPair.first;
            int currentHD = currentPair.second;

            // Store the node if it's the first at this horizontal distance
            if (horizontalDistanceMap.find(currentHD) == horizontalDistanceMap.end()) {
                horizontalDistanceMap[currentHD] = currentNode->data;
            }

            if (currentNode->left) {
                bfsQueue.push({currentNode->left, currentHD - 1});
            }

            if (currentNode->right) {
                bfsQueue.push({currentNode->right, currentHD + 1});
            }
        }

        // Extracting result from the map in sorted order of HD
        for (auto it : horizontalDistanceMap) {
            result.push_back(it.second);
        }

        return result;
    }
};

```

---

## 📝 How It Works

- We use a **level-order traversal (BFS)** with an additional parameter: **horizontal distance (HD)** from the root.
- For each node:
    - Left child → HD - 1
    - Right child → HD + 1
- We store the first node encountered at each HD (topmost) in a map.
- Since map maintains keys in sorted order, we get left to right top view.

---

## 🧩 Key Idea

- Track each node's horizontal distance from the root.
- Only store the **first node** seen at each distance while doing level-order traversal.

---

## ⏱️ Time & Space Complexity

| Complexity | Value |
| --- | --- |
| ⏱️ Time | O(N * log N) (due to map insertion) |
| 💾 Space | O(N) (map + queue) |

---

## ⚠️ Edge Cases

- Tree is empty → return empty vector.
- Tree has only one node → return just root node.

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| DFS with depth tracking | O(N log N) | More complex to implement for top view |
| BFS with `unordered_map` | O(N) | But you lose the order; needs sorting later |

---

## 🔁 Related Problems

- Bottom View of Binary Tree
- Vertical Order Traversal
- Left View / Right View of Binary Tree
- Top View of Binary Tree using DFS

---