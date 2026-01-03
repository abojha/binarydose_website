---
title: Network Delay Time
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return *the **minimum** time it takes for all the* `n` *nodes to receive the signal*. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png)
    
    ```
    Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
    Output: 2
    
    ```
    
    **Example 2:**
    
    ```
    Input: times = [[1,2,1]], n = 2, k = 1
    Output: 1
    
    ```
    
    **Example 3:**
    
    ```
    Input: times = [[1,2,1]], n = 2, k = 2
    Output: -1
    ```
    

---

---

## ✅ Solution: Dijkstra’s Algorithm (Single Source Shortest Path)

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        // Build adjacency list: node -> {neighbor, time}
        vector<vector<pair<int, int>>> adjList(n + 1);
        for (auto edge : times) {
            int u = edge[0], v = edge[1], w = edge[2];
            adjList[u].push_back({v, w});
        }

        // Min-heap: {time, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        pq.push({0, k});  // Starting from node k with 0 time

        // Distance array initialized to large value
        vector<int> dist(n + 1, 1e9);
        dist[k] = 0;

        while (!pq.empty()) {
            auto top = pq.top();
            pq.pop();
            int currTime = top.first;
            int currNode = top.second;

            for (auto neighbor : adjList[currNode]) {
                int neighNode = neighbor.first;
                int travelTime = neighbor.second;

                // Relaxation: check if current path is shorter
                if (dist[neighNode] > currTime + travelTime) {
                    dist[neighNode] = currTime + travelTime;
                    pq.push({dist[neighNode], neighNode});
                }
            }
        }

        // Find the max time taken to reach any node
        int maxTime = -1;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1;  // Not reachable
            maxTime = max(maxTime, dist[i]);
        }

        return maxTime;
    }
};

```

---

### 📝 How It Works

- Treat the network as a **directed weighted graph**.
- Use **Dijkstra’s algorithm** to find the **minimum time** to reach each node from the starting node `k`.
- Priority queue always processes the **currently shortest known path**.
- After all nodes are processed, return the **maximum of all shortest times** — this is when the last node receives the signal.

---

### 🧩 Key Formula / Transition

- Dijkstra Relaxation:
    $$
    \text{if } dist[v] > dist[u] + weight(u, v) \Rightarrow dist[v] = dist[u] + weight(u, v)
    $$

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(E log V) |
| Space | O(N + E) |
- Each node and edge is processed once with priority queue operations.

---

### ⚠️ Edge Cases

- Disconnected node: return `1`.
- All nodes already reachable with zero delay: return `0`.
- Self-loops or multiple edges: handled via adjacency list naturally.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Bellman-Ford | O(N × E) | O(N) | Works even for negative weights |
| Dijkstra ✅ | O(E log V) | O(N) | Optimal for positive weights |

---

### 🔁 Related Problems

- [LC 743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [LC 787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
- [LC 1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
- [LC 1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)

---

### 🛠️ Other Notes

- Dijkstra ensures the **earliest time** each node can receive the signal is computed correctly.
- Great real-world analogy: **time to send a broadcast signal across a network**.
- If any node is unreachable, we return `1`.