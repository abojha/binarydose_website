---
title: Prim’s Algorithm
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

Given a weighted, undirected, and connected graph with V vertices and E edges, your task is to find the sum of the weights of the edges in the Minimum Spanning Tree (MST) of the graph. The graph is represented by an adjacency list, where each element adj[i] is a vector containing vector of integers. Each vector represents an edge, with the first integer denoting the endpoint of the edge and the second integer denoting the weight of the edge.

- Example:
    
    ```
    Input:
    3 3
    0 1 5
    1 2 3
    0 2 1
    
    Output:4
    Explanation:
    
    The Spanning Tree resulting in a weight
    of 4 is shown above.
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid1_1744376821.jpg)
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid2_1744376854.jpg)
    
    ```
    Input:
    2 1
    0 1 5
    
    Output:5
    
    Explanation: Only one Spanning Tree is possible which has a weight of 5.
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700343/Web/Other/blobid3_1744376890.jpg)
    

---

## ✅ Solution: Prim's Algorithm (Using Min-Heap)

```cpp
class Solution {
  public:
    // Function to find sum of weights of edges of the Minimum Spanning Tree.
    int spanningTree(int V, vector<vector<int>> adj[]) {
        // Min-heap: stores {weight, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

        int sum = 0; // Stores total weight of MST
        vector<bool> visited(V, false);

        pq.push({0, 0}); // Start from node 0 with weight 0

        while (!pq.empty()) {
            auto [weight, node] = pq.top();
            pq.pop();

            // Skip if node already included in MST
            if (visited[node]) continue;

            visited[node] = true;
            sum += weight;

            // Push all unvisited adjacent nodes with their weights
            for (auto& neighbor : adj[node]) {
                int adjNode = neighbor[0];
                int edgeWeight = neighbor[1];

                if (!visited[adjNode]) {
                    pq.push({edgeWeight, adjNode});
                }
            }
        }

        return sum;
    }
};

```

---

### 📝 How It Works

- This is **Prim’s algorithm** to find the **Minimum Spanning Tree (MST)** of a graph.
- We use a **min-heap (priority queue)** to always pick the minimum weight edge that connects a new node.
- Start from node 0 with weight 0.
- For every node taken from the priority queue, add its weight to the MST sum if it's not visited.
- Push all its neighbors (adjacent nodes and edge weights) into the heap if they’re not yet visited.
- This guarantees that at every step we pick the smallest edge that expands the tree.

---

### 🧩 Key Formula / Logic

- Greedy approach: Expand MST by picking the **smallest weight edge** that connects to an unvisited node.
- The min-heap ensures you always pick the edge with the least weight.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(E log V) — each edge might be pushed to the heap once, and heap operations take log V |
| Space | O(V + E) — for visited array and adjacency list |

---

### ⚠️ Edge Cases

- Disconnected Graph: This algorithm assumes the graph is connected (MST exists).
- Multiple edges between same nodes: Handled because we skip already visited nodes.

---

### 💡 Other Approaches

- **Kruskal’s Algorithm**:
    - Sort all edges and use Disjoint Set (DSU) to avoid cycles.
    - Time: O(E log E) (because of sorting)

---

### 🔁 Related Problems

- [Kruskal’s Algorithm – Minimum Spanning Tree](https://leetcode.com/problems/connecting-cities-with-minimum-cost/)
- [Network Delay Time (LeetCode 743)](https://leetcode.com/problems/network-delay-time/)
- [Connecting Islands](https://practice.geeksforgeeks.org/problems/connecting-the-graph/1)
- [Optimize Water Distribution in a Village (LC 1168)](https://leetcode.com/problems/optimize-water-distribution-in-a-village/)

---

### 🛠️ Real-world Analogy

Think of laying fiber cables to connect several cities (nodes) such that all are connected with **minimum total cost** (MST). Prim’s algorithm starts from one city and greedily expands to the next nearest city not already connected.