---
title: Minimum Cost to Cut a Stick
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - mcm
---

### Problem Statement:

Given a wooden stick of length `n` units. The stick is labelled from `0` to `n`. For example, a stick of length **6** is labelled as follows:

![](https://assets.leetcode.com/uploads/2020/07/21/statement.jpg)

Given an integer array `cuts` where `cuts[i]` denotes a position you should perform a cut at.

You should perform the cuts in order, you can change the order of the cuts as you wish.

The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.

Return *the minimum total cost* of the cuts.

- Example:
    
    ```
    Example 1:
    
    Input: n = 7, cuts = [1,3,4,5]
    Output: 16
    Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:
    
    The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.
    Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).
    ```
    

---

---

## ✅ Solution: Memoization

```cpp
class Solution {
public:
    int solve(int i, int j, vector<int> &cuts, vector<vector<int>> &dp){
        if(i > j) return 0;
        if(dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;
        for(int k = i; k <= j; k++){
            int cost = cuts[j + 1] - cuts[i - 1]; // Current segment size
            int left = solve(i, k - 1, cuts, dp);
            int right = solve(k + 1, j, cuts, dp);
            mini = min(mini, cost + left + right);
        }

        return dp[i][j] = mini;
    }

    int minCost(int n, vector<int>& cuts) {
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0); // add 0 at the start
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(c + 1, vector<int> (c + 1, -1));
        return solve(1, c, cuts, dp); // range [1, c] because 0 and n are boundaries
    }
};

```

---

## ✅ Solution: Tabulation

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        int c = cuts.size();
        cuts.push_back(n);
        cuts.insert(cuts.begin(), 0);
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(c + 2, vector<int>(c + 2, 0)); // extra space for boundaries

        for(int i = c; i >= 1; i--){
            for(int j = i; j <= c; j++){
                int mini = INT_MAX;
                for(int k = i; k <= j; k++){
                    int cost = cuts[j + 1] - cuts[i - 1];
                    int total = cost + dp[i][k - 1] + dp[k + 1][j];
                    mini = min(mini, total);
                }
                dp[i][j] = mini;
            }
        }

        return dp[1][c];
    }
};

```

---

## 📝 How It Works

- The stick is represented as a line from `0` to `n`.
- You must make cuts at specified positions (in any order), but the cost of a cut is **always the length of the current stick** being cut.
- So, to **minimize total cost**, you need to try every possible first cut and recursively cut the resulting two segments.
- Add `0` and `n` to the cuts list and sort it. Then you treat the problem like **Matrix Chain Multiplication**.

---

## 🧩 Key Formula / Recurrence

```
dp[i][j] = min(
    cuts[j + 1] - cuts[i - 1] + dp[i][k - 1] + dp[k + 1][j]
) for all k in [i, j]

```

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(c³) | O(c²) |
| Tabulation | O(c³) | O(c²) |

Where `c = number of cuts`.

---

## ⚠️ Edge Cases

- No cuts ⇒ cost = 0.
- Only 1 cut ⇒ cost = `n`.
- Cuts not sorted ⇒ must sort them before using.

---

## 💡 Other Approaches

| Approach | Time | Comment |
| --- | --- | --- |
| Brute Force | Exponential ❌ | Too slow |
| Memoization | O(c³) ✅ | Recursive with cache |
| Tabulation | O(c³) ✅ | Bottom-up |

---

## 🔁 Related Problems

- **Matrix Chain Multiplication** – same structure and logic.
- [Burst Balloons](https://leetcode.com/problems/burst-balloons/)
- [Optimal BST](https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/)
- [Stone Game V](https://leetcode.com/problems/stone-game-v/)

---