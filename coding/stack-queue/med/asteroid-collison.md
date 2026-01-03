---
title: Asteroid Collison
description: ""
tags:
  - med
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

We are given an array `asteroids` of integers representing asteroids in a row. The indices of the asteriod in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

- Example:
    
    ```
    Example 1:
    
    Input: asteroids = [5,10,-5]
    Output: [5,10]
    Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
    Example 2:
    
    Input: asteroids = [8,-8]
    Output: []
    Explanation: The 8 and -8 collide exploding each other.
    Example 3:
    
    Input: asteroids = [10,2,-5]
    Output: [10]
    Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
    ```
    

---

## ✅ Solution: Stack Simulation (Asteroid Collision)

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        int n = asteroids.size();
        vector<int> result;  // acts like a stack

        for (int i = 0; i < n; i++) {
            if (asteroids[i] > 0) {
                // Moving right, no immediate collision
                result.push_back(asteroids[i]);
            } else {
                // Moving left, may collide with result's right-moving asteroids
                while (!result.empty() && result.back() > 0 && result.back() < abs(asteroids[i])) {
                    result.pop_back();  // Destroy smaller right-moving asteroid
                }

                if (!result.empty() && result.back() == abs(asteroids[i])) {
                    result.pop_back();  // Both destroy each other
                } else if (result.empty() || result.back() < 0) {
                    result.push_back(asteroids[i]);  // No collision, push left-moving asteroid
                }
            }
        }

        return result;
    }
};

```

---

## 📝 How It Works

- We simulate the collision process using a **stack-like behavior** using `result` vector.
- **Right-moving asteroids (`> 0`)** are pushed directly.
- For **left-moving asteroids (`< 0`)**:
    - While there's a right-moving asteroid on top of the stack smaller than the left-moving one, we pop it.
    - If the top asteroid is equal in size but opposite in direction, both get destroyed.
    - If stack is empty or the top is left-moving, we safely push the left-moving asteroid.

---

## 🧩 Key Formula / Recurrence

- **No DP recurrence here.**
- Stack logic based on two conditions:
    1. If `top > 0 && current < 0` → possible collision.
    2. Continue popping while `top < abs(current)` and `top > 0`.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Stack Simulation | O(N) | O(N) |
- Each asteroid is pushed and popped at most once.

---

## ⚠️ Edge Cases

- All asteroids moving right → Return as is.
- All asteroids moving left → Return as is.
- Multiple collisions happening in a chain (e.g., `[10, 2, -5]`).
- Same size asteroids → Both destroy each other.

---

## 💡 Other Approaches

- **Linked List Simulation** — Not necessary; stack is simpler and faster.
- **Deque (Double-Ended Queue)** — Can be used but adds unnecessary complexity for this specific problem.

---

## 🔁 Related Problems

- LeetCode 735: Asteroid Collision (Exact Problem)
- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 901: Online Stock Span
- LeetCode 42: Trapping Rain Water (stack application)

---

## 🛠️ Other Notes

- **Real-World Analogy:**
    
    Think of two moving trains on the same track. If they collide:
    
    - The smaller one gets destroyed.
    - If both are the same size, both get destroyed.
- ✅ Using `vector` as a stack is preferred in C++ for its flexibility and performance over `std::stack`.
- ✅ Be mindful of sign checks while comparing values to handle both directions properly.