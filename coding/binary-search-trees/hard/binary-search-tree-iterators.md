---
title: Binary Search Tree Iterators
description: ""
tags:
  - binary-search-trees
  - hard
---

### Problem Statement:

Implement the `BSTIterator` class that represents an iterator over the [**in-order traversal**](https://en.wikipedia.org/wiki/Tree_traversal#In-order_(LNR)) of a binary search tree (BST):

- `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
- `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
- `int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/25/bst-tree.png)

```
Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]

Explanation
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Using Stack (In-Order Traversal Iterator)

```cpp
class BSTIterator {
public:
    stack<TreeNode *> nodeStack;  // Stack to hold nodes

    // Constructor: Initialize iterator by pushing left path of root
    BSTIterator(TreeNode* root) {
        pushAllLeft(root);
    }

    // Returns the next smallest element in BST
    int next() {
        TreeNode *topNode = nodeStack.top();
        nodeStack.pop();

        // If there is a right child, push its left path
        if(topNode->right)
            pushAllLeft(topNode->right);

        return topNode->val;
    }

    // Checks if there is a next smallest element
    bool hasNext() {
        return !nodeStack.empty();
    }

private:
    // Helper function to push all left nodes of a subtree
    void pushAllLeft(TreeNode *node) {
        while(node != NULL) {
            nodeStack.push(node);
            node = node->left;
        }
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- This class creates an iterator that returns the next smallest value in a BST each time `next()` is called.
- Internally, it uses a stack to simulate in-order traversal without recursion.
- During construction, it pushes all left nodes from the root to the stack.
- When `next()` is called:
    - It pops the top node (smallest unvisited node so far).
    - If that node has a right child, it pushes all its left descendants onto the stack.
- `hasNext()` simply checks if the stack is non-empty.

---

### 🧩 Key Formula / Recurrence

- **No recurrence relation in this case.**
- Logic follows BST in-order traversal:
    
    **Left → Node → Right**
    

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Constructor | O(h) | O(h) |
| next() | Amortized O(1) | O(h) |
| hasNext() | O(1) | O(1) |

Where **h** = height of the BST.

- Worst-case space is O(N) if BST is skewed.
- Amortized O(1) for `next()` because each node is pushed and popped only once.

---

### ⚠️ Edge Cases

- BST with only one node.
- Empty BST (root = NULL).
- Skewed BST (all nodes only on one side).

---

### 💡 Other Approaches

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Recursion (storing all elements first) | O(N) | O(N) |
| Morris Traversal (Threaded Binary Tree) | O(1) extra space | Alters tree structure, complex |

This stack-based iterator is the most common interview-friendly method.

---

### 🔁 Related Problems

- LeetCode 173. **Binary Search Tree Iterator**
- LeetCode 94. **Binary Tree Inorder Traversal**
- LeetCode 230. **Kth Smallest Element in a BST**

---

### 🛠️ Other Notes

- ✅ Real-world analogy: Imagine flipping through a sorted book index using sticky notes on the left-most pages.
- ✅ Preferred for interview use-cases due to simplicity and clarity.
- ✅ Maintains BST properties while allowing controlled traversal without full recursion.