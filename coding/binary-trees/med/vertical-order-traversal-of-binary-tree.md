---
title: Vertical Order Traversal of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, calculate the **vertical order traversal** of the binary tree.

For each node at position `(row, col)`, its left and right children will be at positions `(row + 1, col - 1)` and `(row + 1, col + 1)` respectively. The root of the tree is at `(0, 0)`.

The **vertical order traversal** of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return *the **vertical order traversal** of the binary tree*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/29/vtree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation:
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Level Order + Coordinate Mapping

```cpp
class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        // x = horizontal distance, y = level (depth), use multiset for sorting same-level nodes
        map<int, map<int, multiset<int>>> nodes;
        queue<pair<TreeNode*, pair<int, int>>> qu;  // {node, {x, y}}

        qu.push({root, {0, 0}});

        while(!qu.empty()){
            auto it = qu.front(); qu.pop();
            TreeNode *node = it.first;
            int x = it.second.first;
            int y = it.second.second;

            nodes[x][y].insert(node->val);

            if(node->left)  qu.push({node->left, {x - 1, y + 1}});
            if(node->right) qu.push({node->right, {x + 1, y + 1}});
        }

        vector<vector<int>> ans;
        for(auto &x_col : nodes){
            vector<int> col;
            for(auto &y_level : x_col.second){
                col.insert(col.end(), y_level.second.begin(), y_level.second.end());
            }
            ans.push_back(col);
        }

        return ans;
    }
};

```

---

## 📝 How It Works

- Traverse the tree using **BFS** (level order), keeping track of:
    - `x`: horizontal position (left = x–1, right = x+1)
    - `y`: depth (level), increases downward
- Store all node values in a nested map:
    - `map<x, map<y, multiset<values>>>` to:
        - Group by vertical column (x)
        - Sort by level (y)
        - Sort multiple nodes in the same position lexicographically
- After BFS, **flatten the structure column by column** to get the final vertical order.

---

## 🧩 Key Idea

Use `map<int, map<int, multiset<int>>>` to maintain vertical ordering (`x`), level ordering (`y`), and value ordering (lexical) at the same coordinates.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | O(N log N) — due to insertion in multiset and ordered maps |
| 🧠 Space | O(N) — for storing map and queue |

---

## ⚠️ Edge Cases

- Multiple nodes with the same `(x, y)` – handled using `multiset`
- Only root node – handled naturally
- Skewed tree (left/right) – `x` becomes very negative or positive

---

## 💡 Other Approaches

| Approach | Description |
| --- | --- |
| DFS with Coordinate Tracking | Use recursion with (x, y), then sort at the end |
| BFS without Multiset | Breaks when duplicate positions occur — ❌ for this problem |
| Priority Queue | To sort nodes while traversing — overkill here |

---

## 🔁 Related Problems

- [LC 987. Vertical Order Traversal of a Binary Tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)
- [LC 314. Binary Tree Vertical Order Traversal](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)
- Top View / Bottom View of Binary Tree (GFG)

---

## 🛠️ Real-World Analogy

> Imagine viewing a tree from the front, capturing all nodes visible from top to bottom column-wise, where ties are broken by level and value. Like looking through window panes arranged vertically.
>