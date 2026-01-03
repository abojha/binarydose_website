---
title: LRU Cache Problem
description: ""
tags:
  - hard
  - implementation
  - problem
  - stack-queue
---

Link: https://leetcode.com/problems/lru-cache/
Summary: Use DLL + Map

### Problem Statement: **“**Design a data structure that follows the constraints of **Least Recently Used (LRU) cache**”.

Implement the **LRU Cache** class:

**LRU Cache(int capacity) we need to initialize the LRU cache with positive size capacity.int get(int key) returns the value of the key if the key exists, otherwise return -1.Void put(int key, int value), Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. if the number of keys exceeds the capacity from this operation, evict the least recently used key.**

- **LRU Cache(int capacity)** we need to initialize the LRU cache with positive size **capacity**.
- **int get(int key)** returns the value of the **key** if the key exists, otherwise return **-1**.
- **Void put(int key, int value),** Update the value of the **key** if the **key** exists. Otherwise, add the **key-value** pair to the cache. if the number of keys exceeds the **capacity** from this operation, evict the least recently used key.

The functions **get** and **put** must each run in **O(1)** average time complexity.

```
Input:
 ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
       [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

Output:
 [null, null, null, 1, null, -1, null, -1, 3, 4]
```

### Solution:

```cpp
class LRUCache {
public:
    // Node class for doubly linked list
    class node {
    public:
        int key, val;
        node *next;
        node *prev;

        node(int _key, int _val) {
            key = _key;
            val = _val;
        }
    };

    // Dummy head and tail nodes to simplify insert/delete operations
    node *head = new node(-1, -1);
    node *tail = new node(-1, -1);

    int cap;  // capacity of the cache
    unordered_map<int, node*> m;  // hashmap to store key and corresponding node pointer

    // Constructor to initialize LRUCache
    LRUCache(int capacity) {
        cap = capacity;
        head->next = tail;
        tail->prev = head;
    }

    // Function to add a node right after head (marking it as most recently used)
    void addNode(node *newNode) {
        node *temp = head->next;
        newNode->next = temp;
        newNode->prev = head;
        head->next = newNode;
        temp->prev = newNode;
    }

    // Function to delete a node from the doubly linked list
    void delNode(node *delNode) {
        node *delprev = delNode->prev;
        node *delnext = delNode->next;
        delprev->next = delnext;
        delnext->prev = delprev;
    }

    // Get value by key and update it as most recently used
    int get(int key) {
        if (m.find(key) != m.end()) {
            node *resNode = m[key];
            int res = resNode->val;

            // Move this node to the front
            m.erase(key);
            delNode(resNode);
            addNode(resNode);

            // Update map with new position
            m[key] = head->next;

            return res;
        }

        return -1;  // Key not found
    }

    // Insert or update key-value in cache
    void put(int key, int value) {
        // If key already exists, remove the old node
        if (m.find(key) != m.end()) {
            node *resNode = m[key];
            m.erase(key);
            delNode(resNode);
        }

        // If cache is full, remove the least recently used node (before tail)
        if (m.size() == cap) {
            m.erase(tail->prev->key);
            delNode(tail->prev);
        }

        // Add the new node at the front (most recently used)
        addNode(new node(key, value));
        m[key] = head->next;
    }
};

/**
 * Usage:
 * LRUCache* obj = new LRUCache(capacity);
 * int value = obj->get(key);
 * obj->put(key, value);
 */

```

---

### **Core Concepts**

- Use **Doubly Linked List (DLL)** for maintaining the order of usage.
- Use **Hash Map** for O(1) access to nodes.

---

### 🧱 **Components**

1. **`node` class**:
    - Represents one node in the DLL with `key`, `value`, `next`, and `prev`.
2. **`head` and `tail` dummy nodes**:
    - Dummy nodes to avoid null checks when adding/removing nodes.
    - `head->next` is **most recently used**, `tail->prev` is **least recently used**.
3. **`unordered_map<int, node*> m`**:
    - Stores key and address of corresponding node in the DLL.

---

### 🔧 **Functions**

### `addNode(node*)`

- Adds the node **right after head** (most recently used position).

### `delNode(node*)`

- Removes a node from the DLL.

### `get(key)`

- If key exists:
    - Move node to the front (most recently used).
    - Return its value.
- Else, return -1.

### `put(key, value)`

- If key exists:
    - Delete the old node.
- If cache is full:
    - Remove the **least recently used** node (before `tail`).
- Add new node to the front and update map.

---

### ⚠️ **Key Points to Remember**

- `m[key] = head->next;` always points to the most recently used version.
- DLL allows O(1) deletion and insertion.
- Hash map allows O(1) lookup.

---

### 🧠 Tips to Memorize

- **DLL + Map = O(1) LRU**
- Always insert at **head**, remove from **tail** if full.
- Move to front = Delete from old place → Add to head.