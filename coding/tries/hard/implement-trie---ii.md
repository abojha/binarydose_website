---
title: Implement Trie - II
description: ""
tags:
  - hard
  - learning
  - tries
---

### Problem Statement:

Ninja has to implement a data structure ”TRIE” from scratch. Ninja has to complete some functions.

```
1) Trie(): Ninja has to initialize the object of this “TRIE” data structure.

2) insert(“WORD”): Ninja has to insert the string “WORD”  into this “TRIE” data structure.

3) countWordsEqualTo(“WORD”): Ninja has to return how many times this “WORD” is present in this “TRIE”.

4) countWordsStartingWith(“PREFIX”): Ninjas have to return how many words are there in this “TRIE” that have the string “PREFIX” as a prefix.

5) erase(“WORD”): Ninja has to delete one occurrence of the string “WORD” from the “TRIE”.

```

Note:

```
1. If erase(“WORD”) function is called then it is guaranteed that the “WORD” is present in the “TRIE”.

2. If you are going to use variables with dynamic memory allocation then you need to release the memory associated with them at the end of your solution.

```

Can you help Ninja implement the "TRIE" data structure?

- Example:
    
    **Sample Input 1:**
    
    ```
    1
    5
    insert coding
    insert ninja
    countWordsEqualTo coding
    countWordsStartingWith nin
    erase coding
    
    ```
    
    **Sample Output 1:**
    
    ```
    1
    1
    
    ```
    
    **Explanation of sample input 1:**
    
    ```
    After insertion of “coding” in “TRIE”:
    
    ```
    
    ```
    After insertion of “ninja” in “TRIE”:
    
    ```
    
    ```
    Count words equal to “coding” :
    
    ```
    
    ```
    Count words those prefix is “nin”:
    
    ```
    
    ```
    After deletion of the word “coding”, “TRIE” is:
    
    ```
    
    **Sample Input 2:**
    
    ```
    1
    6
    insert samsung
    insert samsung
    insert vivo
    erase vivo
    countWordsEqualTo samsung
    countWordsStartingWith vi
    
    ```
    
    **Sample Output 2:**
    
    ```
    2
    0
    
    ```
    
    **Explanation for sample input 2:**
    
    ```
    insert “samsung”: we are going to insert the word “samsung” into the “TRIE”.
    
    insert “samsung”: we are going to insert another “samsung” word into the “TRIE”.
    
    insert “vivo”: we are going to insert the word “vivo” into the “TRIE”.
    
    erase “vivo”: we are going to delete the word “vivo” from the “TRIE”.
    
    countWordsEqualTo “samsung”: There are two instances of “sumsung” is present in “TRIE”.
    
    countWordsStartingWith “vi”: There is not a single word in the “TRIE” that starts from the prefix “vi”.
    ```
    

---

### ✅ Solution: Trie with Frequency Count (Enhanced Trie)

```cpp
#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    Node *links[26];          // Links to child nodes for 'a' to 'z'
    int countEndWith = 0;     // Number of words ending at this node
    int countPrefix = 0;      // Number of words with prefix up to this node

    bool contains(char ch) {
        return links[ch - 'a'] != NULL;
    }

    void put(char ch, Node *node) {
        links[ch - 'a'] = node;
    }

    Node* get(char ch) {
        return links[ch - 'a'];
    }

    void increasePrefix() {
        countPrefix++;
    }

    void increaseEnd() {
        countEndWith++;
    }

    void decreasePrefix() {
        countPrefix--;
    }

    void decreaseEnd() {
        countEndWith--;
    }
};

class Trie {
    Node *root;

public:
    Trie() {
        root = new Node();  // Initialize root node
    }

    void insert(string &word) {
        Node *node = root;
        for (char ch : word) {
            if (!node->contains(ch)) {
                node->put(ch, new Node());
            }
            node = node->get(ch);
            node->increasePrefix();  // Increment prefix count at each node
        }
        node->increaseEnd();  // Mark end of word
    }

    int countWordsEqualTo(string &word) {
        Node *node = root;
        for (char ch : word) {
            if (!node->contains(ch)) return 0;
            node = node->get(ch);
        }
        return node->countEndWith;
    }

    int countWordsStartingWith(string &prefix) {
        Node *node = root;
        for (char ch : prefix) {
            if (!node->contains(ch)) return 0;
            node = node->get(ch);
        }
        return node->countPrefix;
    }

    void erase(string &word) {
        Node *node = root;
        for (char ch : word) {
            if (!node->contains(ch)) return; // Word doesn't exist
            node = node->get(ch);
            node->decreasePrefix(); // Decrease prefix count
        }
        node->decreaseEnd(); // Unmark end of word
    }
};

```

---

### 📝 How It Works

- Each node keeps:
    - `countPrefix`: how many words pass through this node.
    - `countEndWith`: how many words end at this node.
- **Insert**: Traverse through the word, creating nodes as needed, incrementing `countPrefix`. Finally, increment `countEndWith`.
- **Search Equal**: Traverse and check if each character exists. If so, return the `countEndWith` at the last node.
- **Search Prefix**: Traverse prefix and return `countPrefix` at the last character.
- **Erase**: Traverse and decrement `countPrefix`. After traversal, decrement `countEndWith`.

---

### 🧩 Key Idea

Unlike a standard Trie, this version supports:

- Counting how many times a word was inserted.
- Counting how many words share the same prefix.
- Deleting occurrences of a word without affecting other words.

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Insert Word | O(L) | O(N × L) |
| Count Word Equal To | O(L) | O(1) |
| Count Prefix Words | O(L) | O(1) |
| Erase Word | O(L) | O(1) |
- `L`: Length of the word
- `N`: Number of inserted unique words

---

### ⚠️ Edge Cases

- Inserting or erasing the same word multiple times.
- Searching for a prefix that doesn't exist.
- Deleting a word not present in the Trie.

---

### 💡 Other Approaches

| Feature | Standard Trie | Frequency Trie (This) |
| --- | --- | --- |
| Prefix search | ✅ | ✅ |
| Word existence check | ✅ | ✅ |
| Word frequency count | ❌ | ✅ |
| Prefix frequency count | ❌ | ✅ |
| Deletion support | ❌ (manual) | ✅ |

---

### 🔁 Related Problems

- [Leetcode 208 – Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Leetcode 648 – Replace Words](https://leetcode.com/problems/replace-words/)
- [GFG – Trie | (Insert and Search)](https://www.geeksforgeeks.org/trie-insert-and-search/)

---

### 🛠️ Other Notes

- Great use-case in **autocomplete systems**, **dictionary frequency tracking**, and **search engines**.
- Can be extended for uppercase/lowercase, digits, or Unicode by expanding the `links[]` array.