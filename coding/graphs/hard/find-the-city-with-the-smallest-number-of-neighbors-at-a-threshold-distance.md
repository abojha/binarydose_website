---
title: Find the City With the Smallest Number of Neighbors at a Threshold Distance
description: ""
tags:
  - graphs
  - hard
  - path
  - shortest
---

### Problem Statement:

There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [fromi, toi, weighti]` represents a bidirectional and weighted edge between cities `fromi` and `toi`, and given the integer `distanceThreshold`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is **at most** `distanceThreshold`, If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities ***i*** and ***j*** is equal to the sum of the edges' weights along that path.

---

- Example:
    
    **Example 1:**
    
    ![](https://assets.leetcode.com/uploads/2024/08/23/problem1334example1.png)
    
    ```
    Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
    Output: 3
    Explanation:The figure above describes the graph.
    The neighboring cities at a distanceThreshold = 4 for each city are:
    City 0 -> [City 1, City 2]
    City 1 -> [City 0, City 2, City 3]
    City 2 -> [City 0, City 1, City 3]
    City 3 -> [City 1, City 2]
    Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.
    
    ```
    
    **Example 2:**
    
    ![](https://assets.leetcode.com/uploads/2024/08/23/problem1334example0.png)
    
    ```
    Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
    Output: 0
    Explanation:The figure above describes the graph.
    The neighboring cities at a distanceThreshold = 2 for each city are:
    City 0 -> [City 1]
    City 1 -> [City 0, City 4]
    City 2 -> [City 3, City 4]
    City 3 -> [City 2, City 4]
    City 4 -> [City 1, City 2, City 3]
    The city 0 has 1 neighboring city at a distanceThreshold = 2.
    
    ```
    

---

---

## ✅ Solution: Floyd-Warshall

```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        // Initialize distance matrix with INT_MAX
        vector<vector<int>> dist(n, vector<int>(n, INT_MAX));

        // Fill direct edges
        for(auto it : edges){
            dist[it[0]][it[1]] = it[2];
            dist[it[1]][it[0]] = it[2];
        }

        // Distance from a city to itself is 0
        for(int i = 0; i < n; i++) dist[i][i] = 0;

        // Floyd-Warshall to compute all-pairs shortest paths
        for(int k = 0; k < n; k++){
            for(int i = 0; i < n; i++){
                for(int j = 0; j < n; j++){
                    // Skip if path doesn't exist to avoid overflow
                    if(dist[i][k] == INT_MAX || dist[k][j] == INT_MAX) continue;

                    // Update shortest distance
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        int minReachable = n;  // Max possible count
        int cityNo = -1;

        // Find the city with minimum reachable neighbors within the threshold
        for(int i = 0; i < n; i++){
            int count = 0;
            for(int j = 0; j < n; j++){
                if(dist[i][j] <= distanceThreshold){
                    count++;
                }
            }

            // If count is same, prefer the city with larger number (as per question)
            if(count <= minReachable){
                minReachable = count;
                cityNo = i;
            }
        }

        return cityNo;
    }
};

```

---

### 📝 How It Works

- Build a **distance matrix** to represent graph using edge weights.
- Use **Floyd-Warshall algorithm** to compute the shortest paths between all pairs.
- For each city, count how many other cities are reachable within the `distanceThreshold`.
- Track the city with **the smallest number of reachable cities**. If multiple cities have the same count, pick the one with the **largest index**.

---

### 🧩 Key Formula / Transition

dist[i][j]=min⁡(dist[i][j], dist[i][k]+dist[k][j])\text{dist}[i][j] = \min(\text{dist}[i][j],\ \text{dist}[i][k] + \text{dist}[k][j])

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N³) |
| Space | O(N²) |
- `N` is the number of cities.

---

### ⚠️ Edge Cases

- Multiple cities with same reachable count → return **maximum index** city.
- Distance overflow: Guard against `INT_MAX + dist` by checking before addition.
- Self-distances must be initialized to `0`.

---

### 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Dijkstra from each city | O(N * E log N) | Better for sparse graphs, but harder to implement for all-pairs. |
| Floyd-Warshall | O(N³) | Simple and works well for dense graphs. |

---

### 🔁 Related Problems

- [Leetcode 1334 - Find the City With the Smallest Number of Neighbors](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)
- [Leetcode 743 - Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [Leetcode 787 - Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

---

### 🛠️ Other Notes

- This problem is a **graph analysis** task that checks centrality based on reachability.
- Floyd-Warshall gives a clean and direct method for all-pair shortest path problems like this.
- Good fit when `n <= 100` due to cubic complexity.