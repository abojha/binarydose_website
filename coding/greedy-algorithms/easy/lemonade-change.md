---
title: Lemonade Change
description: ""
tags:
  - easy
  - greedy-algorithms
---

### Problem Statement:

At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.

Note that you do not have any change in hand at first.

Given an integer array `bills` where `bills[i]` is the bill the `ith` customer pays, return `true` *if you can provide every customer with the correct change, or* `false` *otherwise*.

- Example:
    
    ```
    Example 1:
    
    Input: bills = [5,5,5,10,20]
    Output: true
    Explanation: 
    From the first 3 customers, we collect three $5 bills in order.
    From the fourth customer, we collect a $10 bill and give back a $5.
    From the fifth customer, we give a $10 bill and a $5 bill.
    Since all customers got correct change, we output true.
    Example 2:
    
    Input: bills = [5,5,10,10,20]
    Output: false
    Explanation: 
    From the first two customers in order, we collect two $5 bills.
    For the next two customers in order, we collect a $10 bill and give back a $5 bill.
    For the last customer, we can not give the change of $15 back because we only have two $10 bills.
    Since not every customer received the correct change, the answer is false.
    ```
    

---

---

### ✅ Solution: Greedy

```cpp
class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;

        for(auto bill : bills){
            if(bill == 5){
                five++; // Customer pays with $5, no change needed
            }

            else if(bill == 10){
                if(five){
                    five--; // Give one $5 as change
                    ten++;
                }
                else return false; // No $5 to give as change
            }

            else { // bill == 20
                // Prefer giving one $10 and one $5
                if(five && ten){
                    five--;
                    ten--;
                }
                // Else try to give three $5 bills
                else if(five >= 3){
                    five -= 3;
                }
                else return false; // Not enough change
            }
        }
        return true;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- The customer pays with a bill of `$5`, `$10`, or `$20`.
- You start with **no change** and must return **true** if it's possible to provide the correct change to each customer in order.
- Maintain count of `$5` and `$10` bills.
- Prefer to give `$10 + $5` over `3 x $5` for a `$20` bill (greedy choice).

---

### 🧩 Key Logic

- If `bill == 5`: No change needed, just store the bill.
- If `bill == 10`: Need one `$5` as change.
- If `bill == 20`:
    - Prefer one `$10 + $5` (greedy), else try `3 x $5`.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(n) |
| Space | O(1) |

Only two variables (`five`, `ten`) used for tracking.

---

### ⚠️ Edge Cases

- First bill is not 5 ⇒ return `false` immediately.
- Not enough 5s to make change ⇒ return `false`.
- More 20s early on than 10s/5s available.

---

### 💡 Other Approaches

- No other approach needed — **greedy** is optimal here.

---

### 🔁 Related Problems

- [LC 860. Lemonade Change](https://leetcode.com/problems/lemonade-change/)
- Greedy Coin Problems (e.g., Coin Change)
- Gas Station (Greedy Resource Tracking)