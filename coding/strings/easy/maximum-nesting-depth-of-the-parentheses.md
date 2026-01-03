---
title: Maximum Nesting Depth of the Parentheses
description: ""
tags:
  - easy
  - strings
---

### Problem Statement:

A string is a **valid parentheses string** (denoted **VPS** ) if is meets any one of the following:

- It is an empty string **""**, or a single character not equals to **" ( "**  or  **" ) "** ,
- It can be written as **AB** (**A** concatenated with **B** ),where **A** and **B** are **VPS's** , or
- It can be written as **(A)** , where **A** is a **VPS**.

We can similarly define the **nesting depth** depth (S) of any VPS **S** as follows:

- **depth ("") = 0**
- **depth (C) = 0**, where **C** is a string with a single character excluding "(" and ")" ,
- **depth (A + B) = max (depth (A) , depth (B))** , where **A** and **B** are VPS's.
- **depth ( "(" + A + ")" ) = 1 + depth (A)** , where **A** is a VPS.

For example , **""** , **" ( ) ( ) "** , and **" ( ) ( ( ) ( ) ) "** and **VPS's** (with nesting depths 0 , 1, and 2), and **" ) ( "** and **" ( ( )** **"**   are not **VPS's**.

Given a **VPS** represented as string **S** , return the nesting depth of **S.**

- Example:
    
    ```
    Example 1:
    
    Input: s = " ((5+2)(3+4)((6))) "
    Output: 3
    Explanation: Character '6' is inside three nested parentheses.
     
    
    Example 2:
    
    Input: " (43+4++3)((3)(9))+1 "
    Output: 2
    Explanation: Character '3' and '9' both are inside two nested parentheses.
    ```
    

---

---

## ✅ Solution: Simple Iteration

```cpp
class Solution {
  public:
    int maxDepth(string s) {
        int count = 0;
        int ans = INT_MIN;

        for(int i = 0; i < s.size(); i++){
            if(s[i] == '('){
                count++;  // entering a new level
            }
            if(s[i] == ')'){
                ans = max(ans, count);  // update maximum depth before exiting
                count--;  // exiting a level
            }
        }
        return ans;
    }
};

```

---

## 📝 How It Works

- We traverse the string and track the **current depth** using a counter.
- Every time we encounter `'('`, we increment `count` (we go deeper).
- When we encounter `')'`, we update the answer with the **maximum** depth so far and then decrement `count` (we exit a level).
- Finally, `ans` stores the **maximum depth** reached during the traversal.

---

## 🧩 Key Insight

The **maximum number of open parentheses** at any point represents the nesting depth.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(n) |
| Space | O(1) |
- Only one pass through the string.
- Constant extra space for counters.

---

## ⚠️ Edge Cases

- No parentheses: e.g., `"abc"` → depth is 0.
- Empty string → return 0.
- Mismatched parentheses → this code assumes input is **valid** as per problem statement.

---

## 💡 Other Approaches

This is already the optimal approach for this problem.

---

## 🔁 Related Problems

- Leetcode 1614: Maximum Nesting Depth of the Parentheses ✅
- Leetcode 20: Valid Parentheses
- Leetcode 856: Score of Parentheses

---