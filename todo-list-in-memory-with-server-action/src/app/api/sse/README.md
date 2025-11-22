---
marp: true
theme: default
---

# Server-Sent Events (SSE)

```typescript
headers: {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
}
```

---

# Cons

- One-way communication only (server to client)
- No built-in binary data support (text-only)
- Limited support in some older browsers
- Limited to maximum 6 concurrent connections per domain/origin

---

# Pros

- Works over regular HTTP/HTTPS (benefit of exisiting auth/permission)
- Real-time one-way communication from server to client
- Automatic reconnection handling by browsers (allegedly)
- Built-in browser support (no additional libraries needed)


