---
title: Two Sum in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - hard
---

### Problem Statement:

Given the `root` of a binary search tree and an integer `k`, return `true` *if there exist two elements in the BST such that their sum is equal to* `k`, *or* `false` *otherwise*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/21/sum_tree_1.jpg)

```
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/21/sum_tree_2.jpg)

```
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Solution: Two Sum IV – Input is a BST (Two Approaches)**

### Approach 1: Two Pointers Using BST Iterator

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

class BSTIterator {
public:
    stack<TreeNode*> st;
    bool rev = false;  // false: in-order, true: reverse in-order

    BSTIterator(TreeNode *root, bool isReverse) {
        rev = isReverse;
        pushAll(root);
    }

    int next() {
        TreeNode *node = st.top();
        st.pop();
        if (!rev) pushAll(node->right); // in-order: right next
        else pushAll(node->left);       // reverse in-order: left next
        return node->val;
    }

private:
    void pushAll(TreeNode *node) {
        while (node != NULL) {
            st.push(node);
            if (!rev) node = node->left;
            else node = node->right;
        }
    }
};

class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        if (!root) return false;
        BSTIterator l(root, false);
        BSTIterator r(root, true);

        int i = l.next();
        int j = r.next();

        while (i < j) {
            if (i + j == k) return true;
            else if (i + j < k) i = l.next();
            else j = r.next();
        }
        return false;
    }
};

```

---

### Approach 2: DFS + Hash Set

```cpp
class Solution {
public:
    bool helper(TreeNode *root, int k, unordered_set<int> &seen) {
        if (root == NULL) return false;
        if (seen.count(k - root->val)) return true;
        seen.insert(root->val);
        return helper(root->left, k, seen) || helper(root->right, k, seen);
    }

    bool findTarget(TreeNode* root, int k) {
        unordered_set<int> seen;
        return helper(root, k, seen);
    }
};

```

---

## 📝 **Notes for Both Approaches**

### ✅ **How It Works**

- **BST Iterator Two Pointer:**
    - Uses two custom iterators: one from smallest, one from largest.
    - Combines in-order and reverse in-order traversal like two pointers on a sorted array.
    - Saves space compared to storing a full array.
- **DFS + Hash Set:**
    - Traverses the BST in DFS style.
    - Uses a hash set to check if `k - current_value` exists.
    - Simpler logic but uses O(N) space.

---

### 🧩 **Key Formula**

- **BST Iterator:**
    
    Two Pointer logic → `i + j == k`
    
- **DFS + Set:**
    
    Check → `k - root->val ∈ seen`
    

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| BST Iterator | O(N) | O(h) |
| DFS + Hash Set | O(N) | O(N) |
- **N = total nodes, h = height of BST.**

---

### ⚠️ **Edge Cases**

- Empty tree → return false.
- Single node → false.
- Duplicate node values (though BST usually has unique values).

---

### 💡 **Other Approaches**

- Store full in-order traversal in an array and apply the two-pointer technique: O(N) space.
- Morris Traversal for O(1) space (advanced, rarely required in interviews).

---

### 🔁 **Related Problems**

- LeetCode 653. Two Sum IV – Input is a BST
- LeetCode 1. Two Sum
- LeetCode 167. Two Sum II – Input Array is Sorted
- LeetCode 173. BST Iterator

---

### ✅ **Real-Life Analogy**

- **BST Iterator Approach:** Like reading from both ends of a sorted list, one person starts from the beginning and one from the end, both moving toward the middle.
- **DFS + Set Approach:** Like remembering all past values you've seen while searching for a pair.

---