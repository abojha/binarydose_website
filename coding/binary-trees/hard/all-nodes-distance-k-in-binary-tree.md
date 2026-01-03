---
title: All Nodes Distance K in Binary Tree
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return *an array of the values of all nodes that have a distance* `k` *from the target node.*

You can return the answer in **any order**.

**Example 1:**

![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/28/sketch0.png)

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.

```

**Example 2:**

```
Input: root = [1], target = 1, k = 3
Output: []
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: BFS with Parent Mapping (Tree to Graph Conversion)

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
class Solution {
public:
    // Helper function to map each node to its parent
    void markParents(TreeNode* root, map<TreeNode*, TreeNode*> &parentMap){
        queue<TreeNode *> q;
        q.push(root);

        while(!q.empty()){
            TreeNode *curr = q.front();
            q.pop();

            if(curr->left){
                q.push(curr->left);
                parentMap[curr->left] = curr;
            }
            if(curr->right){
                q.push(curr->right);
                parentMap[curr->right] = curr;
            }
        }
    }

    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        map<TreeNode*, TreeNode*> parentMap; // Maps each node to its parent
        markParents(root, parentMap);

        unordered_map<TreeNode*, bool> visited; // Tracks visited nodes to avoid cycles
        queue<TreeNode*> q;

        q.push(target); // Start BFS from the target node
        visited[target] = true;

        int currentLevel = 0;

        // BFS to level k
        while(!q.empty()){
            int levelSize = q.size();

            if(currentLevel == k) break;

            for(int i = 0; i < levelSize; i++){
                TreeNode *curr = q.front();
                q.pop();

                if(curr->left && !visited[curr->left]){
                    visited[curr->left] = true;
                    q.push(curr->left);
                }

                if(curr->right && !visited[curr->right]){
                    visited[curr->right] = true;
                    q.push(curr->right);
                }

                if(parentMap[curr] && !visited[parentMap[curr]]){
                    visited[parentMap[curr]] = true;
                    q.push(parentMap[curr]);
                }
            }
            currentLevel++;
        }

        vector<int> res;
        while(!q.empty()){
            TreeNode *temp = q.front();
            q.pop();
            res.push_back(temp->val);
        }

        return res;
    }
};

```

---

## 📝 How It Works

- First, use `markParents()` to store **parent pointers** for each node, turning the tree into an **undirected graph**.
- Then, perform **BFS from the target node**:
    - You can move to the left child, right child, or parent.
    - BFS runs until we reach distance `k`.
- Nodes at exactly `k` distance are added to the result.

---

## 🧩 Key Steps

1. Preprocess with `markParents()` to simulate undirected graph.
2. Use BFS from `target` node.
3. Track levels and stop at level `k`.
4. Collect all nodes in the queue at level `k`.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – every node visited once |
| Space | O(N) – for parent map, visited map, and queue |

---

## ⚠️ Edge Cases

- `k == 0` → return only `[target->val]`
- `k > height of tree` → return empty list
- Tree is empty → return `[]`

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| BFS with Parent Mapping ✅ | O(N) | O(N) | Clean and optimal |
| DFS with depth tracking | O(N) | O(H) | Harder for parent movement |

---

## 🔁 Related Problems

- Leetcode 863: [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)
- Leetcode 543: Diameter of Binary Tree
- Leetcode 236: Lowest Common Ancestor

---