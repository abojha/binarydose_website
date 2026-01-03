---
title: Copy List with Random Pointer
description: ""
tags:
  - hard
  - linked
  - linked-list
  - list
  - singly
---

### Problem Statement:

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a [**deep copy**](https://en.wikipedia.org/wiki/Object_copying#Deep_copy) of the list. The deep copy should consist of exactly `n` **brand new** nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list**.

For example, if there are two nodes `X` and `Y` in the original list, where `X.random --> Y`, then for the corresponding two nodes `x` and `y` in the copied list, `x.random --> y`.

Return *the head of the copied linked list*.

The linked list is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (range from `0` to `n-1`) that the `random` pointer points to, or `null` if it does not point to any node.

Your code will **only** be given the `head` of the original linked list.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2019/12/18/e1.png)
    
    ```
    Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
    Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2019/12/18/e2.png)
    
    ```
    Input: head = [[1,1],[2,1]]
    Output: [[1,1],[2,1]]
    
    ```
    
    **Example 3:**
    
    ![](https://assets.leetcode.com/uploads/2019/12/18/e3.png)
    
    ```
    Input: head = [[3,null],[3,0],[3,null]]
    Output: [[3,null],[3,0],[3,null]]
    
    ```
    
    **Constraints:**
    

---

### ✅ Solution:

1. **First Solution**: Interleaving Copy (Space Optimized)
2. **Second Solution**: HashMap-based Copy (with Extra Space)

---

## ✨ First Solution: Space Optimized (No Extra Map)

```cpp
class Solution {
public:
    // Step 1: Interleave copied nodes into original list
    void getCopyInBetween(Node *head){
        Node * temp = head;
        while(temp != NULL){
            Node *nextNode = temp->next;
            Node *copyNode = new Node(temp->val); // copy current node
            temp->next = copyNode;
            copyNode->next = nextNode;
            temp = nextNode;
        }
    }

    // Step 2: Set random pointers for copied nodes
    void addRandomPointer(Node *head){
        Node *temp = head;
        while(temp != NULL){
            Node *copyNode = temp->next;
            if(temp->random)
                copyNode->random = temp->random->next;
            temp = temp->next->next;
        }
    }

    // Step 3: Separate copied list from original list
    Node* getCopyList(Node *head){
        Node *dummyHead = new Node(0);
        Node *copy = dummyHead;
        Node *temp = head;

        while(temp != NULL){
            copy->next = temp->next;         // Add copied node to result list
            copy = copy->next;
            temp->next = temp->next->next;   // Restore original list
            temp = temp->next;
        }

        return dummyHead->next;
    }

    Node* copyRandomList(Node* head) {
        if(head == NULL) return NULL;

        getCopyInBetween(head);
        addRandomPointer(head);
        return getCopyList(head);
    }
};

```

---

## ✨ Second Solution: Using Hash Map

```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(head == NULL) return NULL;

        unordered_map<Node*, Node*> nodeMap; // Original -> Copy

        Node *temp = head;

        // Step 1: Create copy nodes and store in map
        while(temp != NULL){
            nodeMap[temp] = new Node(temp->val);
            temp = temp->next;
        }

        // Step 2: Assign next and random pointers using map
        temp = head;
        while(temp != NULL){
            nodeMap[temp]->next = nodeMap[temp->next];
            nodeMap[temp]->random = nodeMap[temp->random];
            temp = temp->next;
        }

        return nodeMap[head];
    }
};

```

---

## 📝 How It Works

### Interleaving Copy (1st approach):

1. Interleave copy nodes right after original ones: `A → A' → B → B' → ...`
2. Assign random pointers: since `A.random → C`, then `A'.random → C' = A.random.next`
3. Separate the copy list and restore the original list.

### HashMap Copy (2nd approach):

1. Traverse and create new nodes using a hash map to link original → copied.
2. Use the map to set `.next` and `.random` of each copy node.

---

## 🧩 Key Ideas

- Interleaving trick avoids extra space by utilizing the original list structure.
- HashMap approach is easier to implement and debug.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Interleaved Copy | O(N) | O(1) |
| Hash Map | O(N) | O(N) |

---

## ⚠️ Edge Cases

- `head == NULL`: empty list
- Nodes where `.random` is `NULL`
- All `.random` pointing to themselves
- Cyclic random pointers (not `.next`)

---

## 💡 Other Approaches

- Recursion + map (less readable, not preferred)
- Serialization-based clone (used when list is serialized into array form)

---

## 🔁 Related Problems

- **LC 138**: Copy List with Random Pointer
- **LC 148**: Sort a linked list
- **LC 287**: Find Duplicate Number (cycle detection)

---

## 🛠️ Other Notes

- Interleaving is a **clever space-saving trick**.
- HashMap version is **easier for interviews**, especially when explaining pointer connections.