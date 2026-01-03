---
title: Assign Cookies
description: ""
tags:
  - easy
  - greedy-algorithms
---

### Problem Statement:

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child `i` has a greed factor `g[i]`, which is the minimum size of a cookie that the child will be content with; and each cookie `j` has a size `s[j]`. If `s[j] >= g[i]`, we can assign the cookie `j` to the child `i`, and the child `i` will be content. Your goal is to maximize the number of your content children and output the maximum number.

- Example:
    
    ```
    Example 1:
    
    Input: g = [1,2,3], s = [1,1]
    Output: 1
    Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
    And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
    You need to output 1.
    Example 2:
    
    Input: g = [1,2], s = [1,2,3]
    Output: 2
    Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
    You have 3 cookies and their sizes are big enough to gratify all of the children, 
    You need to output 2.
    ```
    

---

---

### Solution:

```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        int n = g.size();  // Number of children
        int m = s.size();  // Number of cookies

        int cookiePointer = 0;     // Pointer for cookie sizes
        int greedPointer = 0;      // Pointer for children's greed factor

        // Sort both arrays to apply greedy strategy
        sort(g.begin(), g.end());  // Sort greed factors in ascending order
        sort(s.begin(), s.end());  // Sort cookie sizes in ascending order

        // Traverse both arrays
        while(greedPointer < n && cookiePointer < m){
            // If current cookie can satisfy the current child
            if(g[greedPointer] <= s[cookiePointer]){
                greedPointer++;  // Assign cookie to child and move to next child
            }
            // Move to next cookie in any case
            cookiePointer++;
        }

        // The number of children who got cookies
        return greedPointer;
    }
};

```

---

### ✅ **How It Works**

- Each child has a **greed factor** — the minimum cookie size that will satisfy them.
- Each cookie has a **size**.
- You must assign at most one cookie to each child.
- A child will be content if `cookie_size ≥ greed_factor`.
- Use a **greedy approach**: assign the **smallest sufficient cookie** to each child to maximize the number of content children.

---

### 🧩 **Key Idea / Formula**

- **Sort** both greed and cookie size arrays.
- Use two pointers:
    - If `g[child] <= s[cookie]`: assign and move both pointers.
    - Else: try next larger cookie.

---

### ⏱️ **Time & Space Complexity**

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Sorting + Two Pointers ✅ | O(n log n + m log m) | O(1) or O(n + m) if not in-place |

Where `n = number of children`, `m = number of cookies`.

---

### ⚠️ **Edge Cases**

- No children or no cookies → return 0.
- All cookies are too small → return 0.
- Cookies more than children but all too small → return 0.
- Some children have greed = 0 or cookie size = 0 → still valid if condition is met.

---

### 💡 **Other Approaches**

| Strategy | Feasibility | Why Not |
| --- | --- | --- |
| Brute-force (try every cookie for every child) | ❌ Exponential | Too slow |
| Greedy with sorting ✅ | ✅ Optimal | Efficient and works for all cases |

---

### 🔁 **Related Problems**

- Lemonade Change – LC 860 (Greedy)
- Candy – LC 135 (Greedy)
- Non-overlapping Intervals – LC 435
- Is Subsequence – LC 392