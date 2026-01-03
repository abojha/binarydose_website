---
title: Cheapest flight with K Stops
description: ""
tags:
  - graphs
  - hard
  - path
  - shortest
---

### Problem Statement:

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates that there is a flight from city `fromi` to city `toi` with cost `pricei`.

You are also given three integers `src`, `dst`, and `k`, return ***the cheapest price** from* `src` *to* `dst` *with at most* `k` *stops.* If there is no such route, return **`-1`.

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-3drawio.png)
    
    ```
    Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
    Output: 700
    Explanation:
    The graph is shown above.
    The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
    Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-1drawio.png)
    
    ```
    Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
    Output: 200
    Explanation:
    The graph is shown above.
    The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
    
    ```
    
    **Example 3:**
    
    ![](https://assets.leetcode.com/uploads/2022/03/18/cheapest-flights-within-k-stops-2drawio.png)
    
    ```
    Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
    Output: 500
    Explanation:
    The graph is shown above.
    The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.
    ```
    

---

## ✅ Solution: **Modified BFS (Dijkstra with Stop Constraint)**

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // Build adjacency list: node → list of {neighbor, cost}
        vector<vector<pair<int, int>>> adjList(n);
        for (auto flight : flights) {
            int u = flight[0], v = flight[1], cost = flight[2];
            adjList[u].push_back({v, cost});
        }

        // Queue format: {stops, {currentCity, totalCost}}
        queue<pair<int, pair<int, int>>> bfsQueue;
        bfsQueue.push({0, {src, 0}});

        // Distance array to track minimum cost to each city
        vector<int> minCost(n, 1e9);
        minCost[src] = 0;

        while (!bfsQueue.empty()) {
            auto front = bfsQueue.front();
            bfsQueue.pop();

            int stops = front.first;
            int currCity = front.second.first;
            int costSoFar = front.second.second;

            if (stops > k) continue;  // Exceeded stop limit

            // Check neighbors
            for (auto neighbor : adjList[currCity]) {
                int nextCity = neighbor.first;
                int price = neighbor.second;

                int newCost = costSoFar + price;
                if (newCost < minCost[nextCity] && stops <= k) {
                    minCost[nextCity] = newCost;
                    bfsQueue.push({stops + 1, {nextCity, newCost}});
                }
            }
        }

        return minCost[dst] == 1e9 ? -1 : minCost[dst];
    }
};

```

---

### 📝 How It Works

- You need to find the **minimum cost** from `src` to `dst` using **at most k stops**.
- Treat the flight network as a **graph**, where edges are flights and weights are costs.
- Use a **modified BFS** (similar to Dijkstra) that also tracks the number of stops.
- For each node, if you find a cheaper path within the allowed `k + 1` edges, update and push it to the queue.

---

### 🧩 Key Concept

Each queue element stores:

- `stops`: how many flights taken so far
- `currentCity`: current node
- `costSoFar`: total cost to reach that city

We only process paths with `stops ≤ k`.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N + E·K) |
| Space | O(N + E) |
- In the worst case, each edge is traversed for every level up to `k`.
- Works better in practice with pruning using the distance array.

---

### ⚠️ Edge Cases

- If no path exists within `k` stops → return `1`.
- If `src == dst` → cost is `0`.
- Multiple flights between same cities with different costs.

---

### 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Bellman-Ford (k+1 passes) | O(k·E) | Classic method for k-constrained paths |
| Dijkstra (with stops) | O(E log V) | Use min-heap & stops as a state |
| BFS with queue ✅ | O(N + E·K) | Clean and intuitive |

---

### 🔁 Related Problems

- [LC 787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
- [LC 743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [LC 1631. Path with Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
- [LC 847. Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)

---

### 🛠️ Other Notes

- This is a great example of **BFS with additional state tracking** (`stops`).
- You can also implement this using a **priority queue** (min-heap) to explore cheaper routes first.
- Use **Bellman-Ford** if you’re asked to explore all paths up to `k` edges globally.