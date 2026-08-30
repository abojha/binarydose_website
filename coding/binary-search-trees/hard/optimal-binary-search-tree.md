---
title: Optimal Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - hard
---

### Problem Statement:

Given a sorted array **keys[0.. n-1]** of search keys and an array **freq[0.. n-1]** of frequency counts, where freq[i] is the number of searches to keys[i]. Construct a binary search tree of all keys such that the total cost of all the searches is as small as possible.

Let us first define the cost of a BST. The cost of a BST node is level of that node multiplied by its frequency. Level of root is 1.

- Example:
    
    **Example 1:**
    
    ```
    Input:
    n = 2
    keys = {10, 12}
    freq = {34, 50}
    Output: 118
    Explaination:
    There can be following two possible BSTs
            10                       12
              \                     /
               12                 10
    
    The cost of tree I is 34*1 + 50*2 = 134
    The cost of tree II is 50*1 + 34*2 = 118
    ```
    
    ***Example 2:***
    
    ```
    Input:
    N = 3
    keys = {10, 12, 20}
    freq = {34, 8, 50}
    Output: 142
    Explaination: There can be many possible BSTs
         20
        /
       10
        \
         12
    
    Among all possible BSTs,
    cost of this BST is minimum.
    Cost of this BST is 1*50 + 2*34 + 3*8 = 142
    ```
    

---

## Solution: Memoization (Top-Down DP) — *sticking to your code & style*

```cpp
// User function Template for C++

class Solution {
  public:
    // Recursively compute minimal cost for interval [i..j]
    // dp[i][j] memoizes the result
    int solve(int freq[], int i, int j, vector<vector<int>> &dp){
        if(i > j) return 0;           // empty subarray => no cost
        if(i == j) return freq[i];    // single key => cost equals its frequency

        if(dp[i][j] != -1) return dp[i][j];

        // Compute sum of frequencies in [i..j]
        int freqSum = 0;
        for(int k = i; k <= j; k++){
            freqSum += freq[k];
        }

        // Try each element r in [i..j] as root and minimize left+right cost
        int minCost = INT_MAX;
        for(int r = i; r <= j; r++){
            int costLeft  = solve(freq, i, r - 1, dp);   // cost of left subtree
            int costRight = solve(freq, r + 1, j, dp);   // cost of right subtree
            int cost = costLeft + costRight;
            minCost = min(cost, minCost);
        }

        // All nodes in [i..j] go one level deeper under the chosen root -> add freqSum
        return dp[i][j] = minCost + freqSum;
    }

    int optimalSearchTree(int keys[], int freq[], int n) {
        // code here
        vector<vector<int>> dp(n+1, vector<int>(n+1, -1));
        return solve(freq, 0, n-1, dp);
    }
};

```

## 📝 How It Works

- Define `solve(freq, i, j)` as the **minimum cost** to build an Optimal BST (OBST) from keys `i..j`.
- Base cases:
    - `i > j` → empty tree → cost `0`.
    - `i == j` → one key → cost equals `freq[i]` (depth = 1).
- For a segment `[i..j]`, try every `r` in `[i..j]` as the **root**:
    - Cost = `solve(i, r-1) + solve(r+1, j)` (subtrees)
    - Plus `freqSum(i..j)` because attaching them under a new root increases **depth by 1** for all nodes in the interval.
- Use `dp[i][j]` to memoize results and avoid recomputation.

## 🧩 Key Formula / Recurrence

$dp[i][j]=
\begin{cases}
0, & i>j \\
\text{freq}[i], & i=j \\
\min\limits_{r=i}^{j} \big(\text{dp}[i][r-1] + \text{dp}[r+1][j]\big) + \sum_{k=i}^{j}\text{freq}[k], & i<j
\end{cases}$

## ⏱️ Time & Space Complexity

- **Time:** $O(n^3)$
    - $O(n^2$) intervals × O(n) choices of `r`; plus linear sum per state (already inside the root loop).
- **Space:** $O(n^2)$ for the DP table and recursion stack up to $O(n)$

> ⚡ Micro-optimization note (still your structure): Precompute a prefix sum array to get freqSum(i..j) in O(1) (i.e., prefix[j+1]-prefix[i]). That keeps the code/recurrence same but reduces an inner linear pass, improving constant factors ($O(n^3)$ overall due to the root loop).
> 

## ⚠️ Edge Cases

- `n = 0` → return `0`.
- `n = 1` → return `freq[0]`.
- Highly skewed frequencies: optimal root tends toward higher frequencies near the top.
- Ensure `dp` dimensions cover indices used (`n+1` in your code is safe).

## 💡 Other Approaches

- **Bottom-Up Tabulation:** Same recurrence filled by interval length; identical complexity $O(n^3)$ time and $O(n^2)$ space.
- **Knuth Optimization (when applicable):** If the quadrangle inequality holds, narrows root search range → **$O(n^2)$** time. (Structure unchanged conceptually.)
- **OBST with unsuccessful searches:** Extend model to include miss probabilities `q[i]` (CLRS variant).

## 🔁 Related Problems

- **Matrix Chain Multiplication** (interval DP with splitting positions)
- **Burst Balloons (LC 312)** (choose partition/root-like decisions)
- **Minimum Cost to Merge Files/Stones** (interval DP + prefix sums)