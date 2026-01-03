---
title: Dijkstra Algorithm
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

Given an undirected, weighted graph with **V** vertices numbered from 0 to V-1 and **E** edges, represented by 2d array **edges[][]**, where edges[i]=[u, v, w] represents the **edge** between the nodes u and v having w **edge weight**.You have to find the **shortest distance** of all the vertices from the source vertex **src**, and return an array of integers where the **ith** element denotes the shortest distance between **ith** node and source vertex **src**.

**Note:** The Graph is connected and doesn't contain any negative weight edge.

**Examples:**

```
Input:V = 3, edges[][] = [[0, 1, 1], [1, 2, 3], [0, 2, 6]], src = 2
Output:[4, 3, 0]
Explanation:

Shortest Paths:
For 2 to 0 minimum distance will be 4. By following path 2 -> 1 -> 0
For 2 to 1 minimum distance will be 3. By following path 2 -> 1
For 2 to 2 minimum distance will be 0. By following path 2 -> 2

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/892538/Web/Other/blobid0_1744201836.jpg)

```
Input:V = 5, edges[][] = [[0, 1, 4], [0, 2, 8], [1, 4, 6], [2, 3, 2], [3, 4, 10]], src = 0
Output:[0, 4, 8, 10, 10]
Explanation:

Shortest Paths:
For 0 to 1 minimum distance will be 4. By following path 0 -> 1
For 0 to 2 minimum distance will be 8. By following path 0 -> 2
For 0 to 3 minimum distance will be 10. By following path 0 -> 2 -> 3
For 0 to 4 minimum distance will be 10. By following path 0 -> 1 -> 4
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/892538/Web/Other/blobid1_1744202046.jpg)

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Dijkstra’s Algorithm Using Set vs. Priority Queue (Side-by-Side Comparison)

---

### ✅ Solution 1: Dijkstra Using `set` (With Erase-Update)

```cpp
class Solution {
  public:
    vector<int> dijkstraSet(int V, vector<vector<int>> &edges, int src) {
        vector<vector<pair<int, int>>> adjList(V);

        for (auto it : edges) {
            adjList[it[0]].push_back({it[1], it[2]});
            adjList[it[1]].push_back({it[0], it[2]});
        }

        set<pair<int, int>> st;  // {distance, node}
        st.insert({0, src});

        vector<int> dist(V, 1e9);
        dist[src] = 0;

        while (!st.empty()) {
            auto it = *(st.begin());
            st.erase(it);

            int node = it.second;
            int dis = it.first;

            for (auto neighbor : adjList[node]) {
                int neigh = neighbor.first;
                int edgeW = neighbor.second;

                if (dist[neigh] > dist[node] + edgeW) {
                    if (dist[neigh] != 1e9) {
                        st.erase({dist[neigh], neigh});
                    }
                    dist[neigh] = dist[node] + edgeW;
                    st.insert({dist[neigh], neigh});
                }
            }
        }

        return dist;
    }
};

```

---

### ✅ Solution 2: Dijkstra Using `priority_queue` (Lazy Deletion)

```cpp
class Solution {
  public:
    vector<int> dijkstraPQ(int V, vector<vector<int>> &edges, int src) {
        vector<vector<pair<int, int>>> adjList(V);

        for (auto it : edges) {
            adjList[it[0]].push_back({it[1], it[2]});
            adjList[it[1]].push_back({it[0], it[2]});
        }

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, src});

        vector<int> dist(V, 1e9);
        dist[src] = 0;

        while (!pq.empty()) {
            auto it = pq.top();
            pq.pop();

            int node = it.second;
            int dis = it.first;

            if (dis > dist[node]) continue;  // Skip outdated entry

            for (auto neighbor : adjList[node]) {
                int neigh = neighbor.first;
                int edgeW = neighbor.second;

                if (dist[neigh] > dist[node] + edgeW) {
                    dist[neigh] = dist[node] + edgeW;
                    pq.push({dist[neigh], neigh});
                }
            }
        }

        return dist;
    }
};

```

---

## 📝 How Both Versions Work

- **Common Setup:** Build an adjacency list with `{neighbor, weight}` pairs.
- **Core Logic:** Relax edges using the smallest distance available at each step.

### ✅ Set Version Notes:

- Only keeps the latest `{distance, node}`.
- Needs manual erase before insert if a better path is found.
- Ensures no outdated entries exist in the set.

### ✅ Priority Queue Version Notes:

- Can’t erase elements. Keeps old values.
- Uses lazy deletion:
    - If a popped node’s distance is already better (`if (dis > dist[node])`), skip processing it.

---

## 🧩 Key Formula

- **Relaxation Formula:**
    
    ```
    if (dist[neigh] > dist[node] + weight):
        dist[neigh] = dist[node] + weight
    
    ```
    

---

## ⏱️ Time & Space Complexity Comparison

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Set | O((V + E) * log V) | O(V + E) |
| Priority Queue | O((V + E) * log V) | O(V + E) |
- **Set is slower in practice** due to `erase()` overhead.
- **Priority queue is preferred** for contests and production code because of simpler logic.

---

## ⚠️ Edge Cases

- Disconnected graph → Some nodes retain initial `1e9` value.
- Multiple edges → Only the shortest path is retained.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Bellman-Ford | O(V * E) | Handles negative weights. |
| Floyd-Warshall | O(V³) | All-pairs shortest paths. |

---

## 🔁 Related Problems

- LeetCode 743: Network Delay Time
- GFG: Dijkstra’s Algorithm (Set + Priority Queue versions)
- LeetCode 787: Cheapest Flights Within K Stops

---

## 🛠️ Other Notes (Optional)

- ✅ **Set** is good for theoretical understanding (true decrease-key behavior).
- ✅ **Priority Queue** is more common and practical.
- ✅ Real-world analogy: Like updating your map app’s route list with quicker paths as new traffic data comes in, either by updating entries or just ignoring outdated suggestions.