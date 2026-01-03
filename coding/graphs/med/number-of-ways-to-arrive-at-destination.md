---
title: Number of Ways to Arrive at Destination
description: ""
tags:
  - graphs
  - med
  - path
  - shortest
---

### Problem Statement:

You are in a city that consists of `n` intersections numbered from `0` to `n - 1` with **bi-directional** roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer `n` and a 2D integer array `roads` where `roads[i] = [ui, vi, timei]` means that there is a road between intersections `ui` and `vi` that takes `timei` minutes to travel. You want to know in how many ways you can travel from intersection `0` to intersection `n - 1` in the **shortest amount of time**.

Return *the **number of ways** you can arrive at your destination in the **shortest amount of time***. Since the answer may be large, return it **modulo** `109 + 7`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2025/02/14/1976_corrected.png)
    
    ```
    Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
    Output: 4
    Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
    The four ways to get there in 7 minutes are:
    - 0 ➝ 6
    - 0 ➝ 4 ➝ 6
    - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
    - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
    
    ```
    
    **Example 2:**
    
    ```
    Input: n = 2, roads = [[1,0,10]]
    Output: 1
    Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.
    ```
    

---

---

## ✅ Solution: Dijkstra’s Algorithm with Path Counting

```cpp
class Solution {
public:
    int MOD = 1e9 + 7;

    int countPaths(int n, vector<vector<int>>& roads) {
        int source = 0;
        int destination = n - 1;

        // Build adjacency list: node -> {neighbor, edgeWeight}
        vector<vector<pair<int, int>>> adjList(n);
        for (auto& edge : roads) {
            int u = edge[0], v = edge[1], wt = edge[2];
            adjList[u].push_back({v, wt});
            adjList[v].push_back({u, wt});
        }

        // Min-heap: {distance, node}
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        pq.push({0, source});

        // Distance array and ways array
        vector<long long> minDistance(n, LLONG_MAX);
        vector<long long> ways(n, 0);
        minDistance[source] = 0;
        ways[source] = 1;

        while (!pq.empty()) {
            auto [currDist, currNode] = pq.top();
            pq.pop();

            for (auto& neighbor : adjList[currNode]) {
                int nextNode = neighbor.first;
                long long edgeWeight = neighbor.second;

                if (currDist + edgeWeight < minDistance[nextNode]) {
                    minDistance[nextNode] = currDist + edgeWeight;
                    ways[nextNode] = ways[currNode];
                    pq.push({minDistance[nextNode], nextNode});
                }
                else if (currDist + edgeWeight == minDistance[nextNode]) {
                    ways[nextNode] = (ways[nextNode] + ways[currNode]) % MOD;
                }
            }
        }

        return ways[destination];
    }
};

```

---

### 📝 How It Works

- You're given a graph of cities (`nodes`) and roads (`edges` with weights).
- You must **count how many different shortest paths** exist from city `0` to city `n-1`.
- Use **Dijkstra’s algorithm** to track:
    - `minDistance[i]`: the shortest distance from source to node `i`
    - `ways[i]`: number of ways to reach node `i` using `minDistance[i]`

**Key Idea:**

- If you find a better distance → update distance and paths.
- If you find an equal distance → add the new number of ways.

---

### 🧩 Key Formula / Transitions

- **Relaxation Rule:**

```cpp
if (dis[v] > dis[u] + wt)
    dis[v] = dis[u] + wt, ways[v] = ways[u];
else if (dis[v] == dis[u] + wt)
    ways[v] = (ways[v] + ways[u]) % MOD;

```

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(E · log V) |
| Space | O(V + E) |
- Dijkstra with a priority queue processes each edge once.
- `ways[]` and `minDistance[]` store path and distance info per node.

---

### ⚠️ Edge Cases

- Multiple roads between two cities → handled via adjacency list.
- Disconnected nodes → ignored unless `n-1` is unreachable.
- MOD is required due to potentially large number of paths.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Dijkstra + Count ✅ | O(E log V) | O(V) | Best for weighted graphs |
| BFS + Level Count | O(V + E) | O(V) | Only works for unweighted graphs |

---

### 🔁 Related Problems

- [LC 1976. Number of Ways to Arrive at Destination](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)
- [LC 743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [LC 1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)
- [LC 787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

---

### 🛠️ Other Notes

- Think of it as **counting shortest routes** between two cities where roads take time to travel.
- Combines **Dijkstra** for path length and **DP** for counting number of optimal ways.
- Be cautious with **`long long`** to avoid overflow during weight accumulation.