---
title: "Why ChatGPT Uses SSE Instead of WebSockets"
day: 25
category: "System Design"
summary: "ChatGPT streams token-by-token LLM responses using Server-Sent Events (SSE) because token generation is strictly unidirectional, lightweight, firewall-friendly, and runs over HTTP/2 multiplexing."
tags: ["system-design", "sse", "websockets", "http2", "llm-streaming", "interview", "binary-dose"]
youtubeId: "cREiW2_fijs"
hide_table_of_contents: true
---

## 🎯 The Question

> **"When ChatGPT streams tokens to your screen in real time, why does OpenAI use Server-Sent Events (SSE) instead of bidirectional WebSockets?"**

---

## ⚡ 30-Second Elevator Pitch

WebSockets are designed for **bidirectional, full-duplex communication** (like multiplayer games or live chat rooms where both client and server constantly send messages simultaneously).

LLM token streaming is **strictly unidirectional**:
1. The user sends **1 prompt** to the server (standard HTTP POST).
2. The AI model streams **hundreds of tokens back** sequentially over time.

**Why SSE is superior for LLM streaming**:
* **Runs over standard HTTP/2**: Free HTTP/2 connection multiplexing, header compression, and zero custom TCP upgrade handshakes.
* **Built-in Browser Reconnection**: Native `EventSource` automatically reconnects and resumes streams if Wi-Fi drops.
* **Firewall & Proxy Friendly**: Uses standard HTTP/HTTPS (`text/event-stream`), avoiding WebSocket proxy blocking in corporate enterprise firewalls.

---

## 🧠 Under-the-Hood: SSE Stream vs. WebSocket Protocol

```mermaid
flowchart TD
    subgraph SSE["1. Server-Sent Events (ChatGPT Model)"]
        direction TB
        C1["Client sends HTTP POST with Prompt"] --> S1["LLM Server"]
        S1 -->|Streams data: token1| C1
        S1 -->|Streams data: token2| C1
        S1 -->|Streams data: [DONE]| C1
    end

    subgraph WS["2. WebSocket Protocol (Overhead for Unidirectional)"]
        direction TB
        C2["Client"] -->|HTTP Upgrade Request| S2["Server"]
        S2 -->|101 Switching Protocols| C2
        Note over C2,S2: Stateful TCP Socket (Custom binary framing & heartbeat pings)
    end
```

---

## 🔬 How SSE Works Over HTTP

The server simply responds with standard HTTP headers:
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"token": "Hello"}

data: {"token": " world"}

data: [DONE]
```
The browser receives tokens as continuous text chunks without parsing custom binary framing protocols.

---

## 📌 Comparison Matrix: Server-Sent Events (SSE) vs. WebSockets

| Dimension | Server-Sent Events (SSE) | WebSockets |
| :--- | :--- | :--- |
| **Communication Flow** | Unidirectional (Server $	o$ Client) | Bidirectional (Client $\leftrightarrow$ Server) |
| **Protocol Foundation** | Standard HTTP/1.1 or HTTP/2 | Custom `ws://` / `wss://` TCP protocol |
| **Auto-Reconnection** | ✅ Built-in by browser specification | ❌ Requires custom JavaScript heartbeat logic |
| **Corporate Firewalls** | ✅ Passes cleanly (Standard HTTPS 443) | ⚠️ Often blocked/dropped by enterprise proxies |
| **Ideal Workloads** | LLM token streaming, stock tickers, news feeds | Multiplayer games, collaborative whiteboards |

---

## 💡 What Interviewers Ask Next (Follow-Up Traps)

1. **"What is the 6-connection limit bug with SSE in HTTP/1.1?"**
   - *Answer*: Under HTTP/1.1, browsers restrict maximum connections per domain to 6. Opening 6 SSE streams in different tabs completely blocks all subsequent HTTP requests. **Solution**: Serve SSE over **HTTP/2**, which multiplexes hundreds of streams over a single shared TCP connection.

2. **"Can the client send data over an open SSE connection?"**
   - *Answer*: No. SSE is strictly unidirectional. If the client needs to send new data (e.g. stop generating or send a new prompt), it makes a separate standard HTTP POST request.

---

:::tip Placement & Interview Takeaway
**Interview Answer**: ChatGPT uses Server-Sent Events (SSE) because LLM inference is strictly unidirectional (client sends a single prompt, server streams tokens back). SSE runs over standard HTTP/2 with built-in auto-reconnection and seamless firewall traversal without the overhead of WebSocket state management.
:::

---

## 📺 Video Explanation

<YouTubeEmbed 
  id="cREiW2_fijs" 
  title="Why ChatGPT Uses SSE Instead of WebSockets | Interview Question #25" 
/>
