# Todo List with In-Memory Storage and Server Actions

A Next.js 15 demo application showcasing Server Actions and Server-Sent Events (SSE) for real-time updates.

## Features

- **Server Actions**: Data mutations handled through Next.js Server Actions
- **Server-Sent Events (SSE)**: Real-time updates pushed to clients
- **In-Memory Storage**: Simple state management (development only)
- **TypeScript**: Full type safety with strict mode
- **React 19**: Latest React features including `use()` hook

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## How It Works

### Server Actions

Server Actions in [src/app/actions.ts](src/app/actions.ts) handle todo operations:
- `addTodo(formData)` - Adds a new todo
- `deleteTodo(id)` - Removes a todo
- `toggleTodo(id)` - Toggles todo completion status

### Server-Sent Events

The SSE endpoint at [src/app/api/sse/route.ts](src/app/api/sse/route.ts) pushes updates to connected clients whenever todos change. This enables real-time synchronization across multiple browser tabs.

### Components

- [src/app/page.tsx](src/app/page.tsx) - Main page with server component
- [src/app/todos.tsx](src/app/todos.tsx) - Client component with SSE connection

## Architecture

```
Client (Browser)
    ↓
Server Actions (mutations)
    ↓
In-Memory State
    ↓
EventEmitter
    ↓
SSE Connection → Real-time updates
```

## Limitations

⚠️ **This is a demo application with intentional limitations:**

- In-memory storage (data lost on server restart)
- Not suitable for production or multiple server instances
- No database persistence
- No authentication
- No input validation

## Learn More

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [React 19 Features](https://react.dev/blog/2024/12/05/react-19)
