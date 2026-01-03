---
title: Implement Trie - I
description: ""
tags:
  - hard
  - learning
  - tries
---

### Problem Statement:

A [**trie**](https://en.wikipedia.org/wiki/Trie) (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.
- Example:
    
    **Example 1:**
    
    ```
    Input
    ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
    [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
    Output
    [null, null, true, false, true, null, true]
    
    Explanation
    Trie trie = new Trie();
    trie.insert("apple");
    trie.search("apple");   // return True
    trie.search("app");     // return False
    trie.startsWith("app"); // return True
    trie.insert("app");
    trie.search("app");     // return True
    ```
    

---

### ✅ Solution: Trie Data Structure (Prefix Tree)

```cpp
class Node {
    Node *links[26];   // Array of pointers to child nodes for 'a' to 'z'
    bool flag = false; // True if the current node marks end of a word

public:
    bool contains(char ch) {
        return (links[ch - 'a'] != NULL);
    }

    void put(char ch, Node *node) {
        links[ch - 'a'] = node;
    }

    Node* get(char ch) {
        return links[ch - 'a'];
    }

    void setEnd() {
        flag = true;
    }

    bool isEnd() {
        return flag;
    }
};

class Trie {
private:
    Node *root;

public:
    Trie() {
        root = new Node(); // Initialize the root node
    }

    void insert(string word) {
        Node *node = root;
        for (int i = 0; i < word.length(); i++) {
            if (!node->contains(word[i])) {
                node->put(word[i], new Node()); // Create node if not present
            }
            node = node->get(word[i]); // Move to the child node
        }
        node->setEnd(); // Mark the end of the word
    }

    bool search(string word) {
        Node *node = root;
        for (int i = 0; i < word.length(); i++) {
            if (!node->contains(word[i])) {
                return false; // Character path not found
            }
            node = node->get(word[i]); // Move to the next character node
        }
        return node->isEnd(); // Return true only if it’s an end node
    }

    bool startsWith(string prefix) {
        Node *node = root;
        for (int i = 0; i < prefix.length(); i++) {
            if (!node->contains(prefix[i])) {
                return false; // Path for prefix doesn’t exist
            }
            node = node->get(prefix[i]);
        }
        return true; // All characters found ⇒ prefix exists
    }
};

```

---

### 📝 How It Works

- **Structure**: Trie is a tree where each node represents a character. Words are stored by linking characters through pointers (`links[26]` for 'a' to 'z').
- **Insert**:
    - Traverse each character in the word.
    - Create a new node if the character path doesn't exist.
    - Move along the path and mark the last node as the end of the word.
- **Search**:
    - Traverse each character.
    - If path breaks, return `false`.
    - After complete traversal, return `true` only if the node is marked as an end.
- **Prefix Check**:
    - Traverse each character in the prefix.
    - If all characters are found, return `true`.

---

### 🧩 Key Idea

For each character `ch` in a string, use `ch - 'a'` to access the corresponding index in the child pointer array `links[26]`.

This gives **O(1)** access per character, making trie operations very fast.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Insert Word | O(L) | O(N × L) |
| Search Word | O(L) | O(1) |
| Prefix Check | O(L) | O(1) |
- `L` = Length of the word or prefix
- `N` = Number of inserted words

---

### ⚠️ Edge Cases

- Empty string: Should be handled appropriately.
- Words with shared prefixes (e.g., `"apple"` and `"app"`) must distinguish between complete word and prefix.
- Repeated insertions should not affect search correctness.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| HashMap-based | O(1) avg | High | Doesn’t support prefix search efficiently |
| Suffix Trie | O(N^2) insert | High | Useful for substring search |
| Ternary Search Tree | O(L log σ) | Lower | Space efficient |

---

### 🔁 Related Problems

- [Leetcode 208: Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Leetcode 211: Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
- [Leetcode 212: Word Search II](https://leetcode.com/problems/word-search-ii/)

---

### 🛠️ Other Notes

- Can be extended to handle:
    - Uppercase or Unicode by increasing size of `links[]`.
    - Wildcard search (`.`) in problems like Word Dictionary.
- Useful in **Autocomplete**, **Spell Checkers**, **IP Routing**, etc.