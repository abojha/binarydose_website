---
title: Design Twitter
description: ""
tags:
  - hard
  - heaps
---

### Problem Statement:

Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the `10` most recent tweets in the user's news feed.

Implement the `Twitter` class:

- `Twitter()` Initializes your twitter object.
- `void postTweet(int userId, int tweetId)` Composes a new tweet with ID `tweetId` by the user `userId`. Each call to this function will be made with a unique `tweetId`.
- `List<Integer> getNewsFeed(int userId)` Retrieves the `10` most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be **ordered from most recent to least recent**.
- `void follow(int followerId, int followeeId)` The user with ID `followerId` started following the user with ID `followeeId`.
- `void unfollow(int followerId, int followeeId)` The user with ID `followerId` started unfollowing the user with ID `followeeId`.
- Example:
    
    ```
    Input
    ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
    [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
    Output
    [null, null, [5], null, null, [6, 5], null, [5]]
    
    Explanation
    Twitter twitter = new Twitter();
    twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
    twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
    twitter.follow(1, 2);    // User 1 follows user 2.
    twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
    twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
    twitter.unfollow(1, 2);  // User 1 unfollows user 2.
    twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
    ```
    

---

---

```cpp
class Twitter {
private:
    int timestamp;  // Global time counter for ordering tweets
    map<int, unordered_set<int>> followMap;  // followerId → set of followeeIds
    vector<tuple<int, int, int>> tweets;  // {timestamp, tweetId, userId}

public:
    Twitter() {
        timestamp = 0;
    }

    void postTweet(int userId, int tweetId) {
        // Record a new tweet with current timestamp
        tweets.push_back({timestamp++, tweetId, userId});
    }

    vector<int> getNewsFeed(int userId) {
        vector<int> result;
        priority_queue<pair<int, int>> maxHeap;  // {timestamp, tweetId}

        // Include user's own tweets + followees' tweets
        unordered_set<int> users = followMap[userId];
        users.insert(userId);

        int checkedTweets = 0;

        // Traverse tweets from latest to oldest using reverse iterator
        for(auto it = tweets.rbegin(); it != tweets.rend() && checkedTweets < 100; ++it) {
            int time = get<0>(*it);
            int tweetId = get<1>(*it);
            int authorId = get<2>(*it);

            if(users.count(authorId)) {
                maxHeap.push({time, tweetId});
                checkedTweets++;
            }
        }

        // Extract the top 10 most recent tweet IDs
        while(!maxHeap.empty() && result.size() < 10) {
            result.push_back(maxHeap.top().second);
            maxHeap.pop();
        }
        return result;
    }

    void follow(int followerId, int followeeId) {
        followMap[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        if(followMap.count(followerId)) {
            followMap[followerId].erase(followeeId);
        }
    }
};

```

---

## 📝 Required Notes Template

### 📝 How It Works

- Maintains a global `timestamp` to track the order of tweets.
- `tweets` stores all tweets globally as `{timestamp, tweetId, userId}`.
- `followMap` keeps track of follow relationships using `unordered_set`.
- For `getNewsFeed`, we:
    - Collect the latest tweets by scanning backwards (`rbegin()`) and using a max-heap (priority queue).
    - Limit to 10 tweets maximum in the news feed.
    - Limit to scanning the latest 100 tweets for efficiency.

### 🧩 Key Formula / Recurrence

- **Priority Queue for Top K:** Maintain top 10 recent tweets using `priority_queue`.
- **Reverse Iteration:** Scan up to 100 latest tweets:
    
    For each `tweet`:
    
    - If `tweet.userId` is in `followMap[userId] + userId`, add to heap.

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| postTweet | O(1) | O(1) |
| follow/unfollow | O(1) (average) | O(1) (average) |
| getNewsFeed | O(K + log K) where K = min(100, total tweets) | O(K) for max-heap |
- **Notes:**
    - Reverse iterating `tweets` and pushing into heap: up to 100 tweets.
    - Heap stores at most 100 tweets → O(K log K) simplifies to O(100 * log 100).

### ⚠️ Edge Cases

- A user follows no one, only their tweets count.
- No tweets exist at all → should return empty feed.
- Repeated follow/unfollow operations should not corrupt the state.

### 💡 Other Approaches

| Approach | Time Complexity (getNewsFeed) |
| --- | --- |
| Brute Force | O(N), where N = all tweets |
| HashMap + Min-Heap (Top K by user streams) | O(M * log U), M = number of users followed, U = number of tweets per user. Better for large datasets. |
- The given solution is simpler for small/medium datasets, not optimized for large-scale Twitter-like systems.

### 🔁 Related Problems

- LeetCode 355: Design Twitter (same problem)
- LeetCode 692: Top K Frequent Words (priority queue + hash map)
- LeetCode 703: Kth Largest Element in a Stream

---

## 🛠️ Other Notes

- **Real-World Analogy:** Scrolling your Instagram or Twitter feed, where you see posts from people you follow, prioritized by recency.
- **Why Priority Queue?** You want the top K most recent tweets, so using a max-heap avoids sorting all candidates unnecessarily.