---
title: Graph Representaton in C++
description: ""
tags:
  - easy
  - graphs
  - learning
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Graph Representation Using Adjacency List in C++ (All Basic Operations)

---

```cpp
#include <bits/stdc++.h>
using namespace std;

class Graph {
public:
    int V;  // Number of vertices
    vector<vector<int>> adjList;  // Adjacency list

    // Constructor
    Graph(int vertices) {
        V = vertices;
        adjList.resize(V);
    }

    // Add edge (undirected by default)
    void addEdge(int u, int v, bool directed = false) {
        adjList[u].push_back(v);
        if (!directed) {
            adjList[v].push_back(u);
        }
    }

    // Remove edge
    void removeEdge(int u, int v, bool directed = false) {
        adjList[u].erase(remove(adjList[u].begin(), adjList[u].end(), v), adjList[u].end());
        if (!directed) {
            adjList[v].erase(remove(adjList[v].begin(), adjList[v].end(), u), adjList[v].end());
        }
    }

    // Print graph
    void printGraph() {
        for (int i = 0; i < V; i++) {
            cout << i << " -> ";
            for (auto neighbor : adjList[i]) {
                cout << neighbor << " ";
            }
            cout << endl;
        }
    }

    // Check if edge exists
    bool hasEdge(int u, int v) {
        return find(adjList[u].begin(), adjList[u].end(), v) != adjList[u].end();
    }

    // Degree of a vertex
    int degree(int u) {
        return adjList[u].size();
    }
};

```

---

## 📝 How It Works

- **Adjacency List**:
    
    `vector<vector<int>> adjList` is used to store lists of neighbors for each vertex.
    
- **Basic Operations Implemented:**
    1. `addEdge(u, v, directed)`: Adds an edge between vertices. Supports both directed and undirected graphs.
    2. `removeEdge(u, v, directed)`: Removes an edge if it exists.
    3. `printGraph()`: Displays all vertices with their adjacent nodes.
    4. `hasEdge(u, v)`: Checks if there is an edge between two vertices.
    5. `degree(u)`: Returns the number of neighbors of a vertex (degree).

---

## 🧩 Key Formula / Recurrence

- No recurrence relation.
- Uses dynamic lists for adjacency list representation.

---

## ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Add Edge | O(1) (amortized) | O(V + E) |
| Remove Edge | O(Degree of u) | O(V + E) |
| Print Graph | O(V + E) | O(V + E) |
| Has Edge | O(Degree of u) | O(V + E) |
| Degree | O(1) | O(V + E) |

Where:

- **V** = Number of vertices
- **E** = Number of edges

---

## ⚠️ Edge Cases

- Adding/removing an edge with invalid vertex indices.
- Adding duplicate edges (not prevented in basic version).
- Self-loops and multi-edges are possible unless explicitly restricted.

---

## 💡 Other Approaches

| Approach | Space Complexity | Notes |
| --- | --- | --- |
| Adjacency Matrix | O(V²) | Fast edge lookup, high space cost. |
| Edge List | O(E) | Space-efficient for sparse graphs. |

---

## 🔁 Related Problems

- BFS and DFS Traversals
- Cycle Detection in Graphs
- Shortest Path Algorithms (Dijkstra, Bellman-Ford)
- Minimum Spanning Tree (Kruskal, Prim)

---