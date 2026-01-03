---
title: Burning Tree
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given a binary tree and a **target** node, determine the minimum time required to burn the entire tree if the **target** node is set on fire. In one second, the fire spreads from a node to its left child, right child, and parent.**Note:** The tree contains unique values.

**Examples :**

```
Input:root[] = [1, 2, 3, 4, 5, 6, 7], target = 2
Output: 3
Explanation: Initially 2 is set to fire at 0 sec
At 1 sec: Nodes 4, 5, 1 catches fire.
At 2 sec: Node 3 catches fire.
At 3 sec: Nodes 6, 7 catches fire.
It takes 3s to burn the complete tree.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/702131/Web/Other/blobid0_1747048733.webp)

```
Input: root[] = [1, 2, 3, 4, 5, N, 7, 8, N, 10], target = 10

Output: 5
Explanation:Initially 10 is set to fire at 0 sec
At 1 sec: Node 5 catches fire.
At 2 sec: Node 2 catches fire.
At 3 sec: Nodes 1 and 4 catches fire.
At 4 sec: Node 3 and 8 catches fire.
At 5 sec: Node 7 catches fire.
It takes 5s to burn the complete tree.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/702131/Web/Other/blobid1_1747048769.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: BFS + Parent Mapping (Burning Tree Simulation)

```cpp
/*
class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/
class Solution {
  public:

    // Step 1: Map each node to its parent
    void markParent(Node *root, map<Node*, Node*> &parentMap){
        queue<Node*> q;
        q.push(root);

        while(!q.empty()){
            Node *curr = q.front();
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

    // Step 2: Locate the target node
    Node* findTargetNode(Node *root, int target){
        if(root == NULL) return NULL;
        if(root->data == target) return root;

        Node *leftResult = findTargetNode(root->left, target);
        if (leftResult != NULL) return leftResult;
        return findTargetNode(root->right, target);
    }

    // Step 3: Simulate burning using BFS
    int timeToBurn(Node *targetNode, map<Node*, Node*> parentMap){
        queue<Node*> q;
        map<Node*, bool> visited;
        int burningTime = 0;

        q.push(targetNode);
        visited[targetNode] = true;

        while(!q.empty()){
            int levelSize = q.size();
            bool newNodeBurned = false;

            for(int i = 0; i < levelSize; i++){
                Node *curr = q.front();
                q.pop();

                if(curr->left && !visited[curr->left]){
                    q.push(curr->left);
                    visited[curr->left] = true;
                    newNodeBurned = true;
                }

                if(curr->right && !visited[curr->right]){
                    q.push(curr->right);
                    visited[curr->right] = true;
                    newNodeBurned = true;
                }

                if(parentMap[curr] && !visited[parentMap[curr]]){
                    q.push(parentMap[curr]);
                    visited[parentMap[curr]] = true;
                    newNodeBurned = true;
                }
            }

            if(newNodeBurned) burningTime++;
        }

        return burningTime;
    }

    int minTime(Node* root, int target) {
        if(root == NULL) return 0;

        map<Node*, Node*> parentMap;
        markParent(root, parentMap);

        Node *targetNode = findTargetNode(root, target);
        if(targetNode == NULL) return 0;

        return timeToBurn(targetNode, parentMap);
    }
};

```

---

## 📝 How It Works

- First, we **map each node to its parent** using BFS (`markParent`).
- Then we **find the node** with the given target value using DFS.
- After that, we simulate the **burning process** using **BFS**:
    - The fire spreads to `left`, `right`, and `parent` each time step.
    - A level is counted only if at least one new node catches fire.

---

## 🧩 Key Observations

- Tree is converted to an **undirected graph** using parent mapping.
- BFS level traversal ensures **time steps = levels burned**.

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
| --- | --- |
| markParent | O(N) |
| findTargetNode | O(N) |
| timeToBurn (BFS) | O(N) |
| **Total Time** | **O(N)** |
| **Space** | O(N) – queue + map |

---

## ⚠️ Edge Cases

- Tree is empty → return 0
- Target node doesn't exist → return 0
- Tree is already linear (like linked list) → burning time = height - 1

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| BFS with Parent Map ✅ | O(N) | O(N) | Optimal, clean |
| Pure DFS + backtracking | O(N) | O(H) | More complex to simulate fire timing |

---

## 🔁 Related Problems

- GFG: [Burning Tree](https://practice.geeksforgeeks.org/problems/burning-tree/1)
- Leetcode 863: All Nodes at Distance K
- Leetcode 543: Diameter of Binary Tree
- Leetcode 236: Lowest Common Ancestor

---