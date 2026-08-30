---
title: Aggressive Cows
description: ""
tags:
  - binary-search
  - med
---

### Problem Statement:

You are given an array ***'arr'*** consisting of ***'n'*** integers which denote the position of a stall.

You are also given an integer ***'k'*** which denotes the number of aggressive cows.

You are given the task of assigning stalls to 'k' cows such that the minimum distance between any two of them is the maximum possible.

Print the maximum possible minimum distance.

- Example:
    
    ### **Sample Input 1 :**
    
    ```
    6 4
    0 3 4 7 10 9
    
    ```
    
    ### **Sample Output 1 :**
    
    ```
    3
    
    ```
    
    ### **Explanation to Sample Input 1 :**
    
    ```
    The maximum possible minimum distance between any two cows will be 3 when 4 cows are placed at positions {0, 3, 7, 10}. Here distance between cows are 3, 4 and 3 respectively.
    ```
    

---

## Solution: Binary Search on Answer (Aggressive Cows Problem)

```cpp
#include <bits/stdc++.h>
using namespace std;

// Helper function to check if cows can be placed
bool check(vector<int> &stalls, int cows, int dist){
    int placedCows = 1;         // first cow placed at first stall
    int lastPos = stalls[0];

    for(int i = 1; i < stalls.size(); i++){
        if(stalls[i] - lastPos >= dist){
            placedCows++;
            lastPos = stalls[i];  // place cow here
        }
    }

    return placedCows >= cows;  // check if we managed to place all cows
}

int aggressiveCows(vector<int> &stalls, int k){
    int n = stalls.size();

    // Edge case: more cows than stalls
    if(k > n) return -1;

    sort(stalls.begin(), stalls.end());

    int low = 1;                               // minimum possible distance
    int high = stalls.back() - stalls.front(); // maximum possible distance
    int result = 1;

    while(low <= high){
        int mid = low + (high - low) / 2;  // candidate distance

        if(check(stalls, k, mid)){
            result = mid;          // feasible → try for larger distance
            low = mid + 1;
        }
        else{
            high = mid - 1;        // not feasible → try smaller distance
        }
    }
    return result;
}

```

---

## 📝 How It Works

- You need to place `k` cows in `n` stalls such that the **minimum distance between any two cows is maximized**.
- Sort the stalls (since only relative positions matter).
- Use **binary search on distance**:
    - Lower bound = `1` (smallest possible distance).
    - Upper bound = `max(stalls) - min(stalls)` (largest possible gap).
- For each `mid = candidate distance`:
    - Try placing cows greedily → always place a cow in the next available stall that is at least `mid` away.
    - If we can place all `k` cows → it's feasible, try larger distance.
    - Otherwise → reduce distance.
- Result is the **largest feasible minimum distance**.

---

## 🧩 Key Formula / Recurrence

- Feasibility check:
    $$
    \text{place cows greedily with gap } \ge \text{mid; if count } \ge k \implies \text{feasible}
    $$
- Binary search update:
    - If feasible → `low = mid + 1`
    - Else → `high = mid - 1`

---

## ⏱️ Time & Space Complexity

- Sorting stalls: **$O(n \log n)$**
- Binary search range: $O(\log(\text{maxDist}))$
- Feasibility check per step: $O(n)$
- **Total:**
    $$
    O(n \log n + n \log(\text{maxDist}))
    $$
- Space: **$O(1)$**

---

## ⚠️ Edge Cases

- `k > n` → not possible, return -1.
- Only 1 cow → always place at any stall.
- `k == n` → each cow in its own stall, min distance = smallest gap between consecutive stalls.

---

## 💡 Other Approaches

- **Brute Force**: Try all possible distances (O(n * maxDist)) ❌ too slow.
- **Binary Search (this approach)** ✅ most efficient.

---

## 🔁 Related Problems

- Book Allocation Problem
- Split Array Largest Sum (LeetCode 410)
- Magnetic Force Between Two Balls (LeetCode 1552, same problem)

---