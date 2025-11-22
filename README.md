# Next.js TypeScript Demo Apps

This repository contains multiple Next.js demo applications showcasing different features and patterns.

## Repository Structure

```
/
├── tsconfig.json                              # Shared TypeScript configuration
├── todo-list-in-memory-with-server-action/    # Todo app with SSE and server actions
└── README.md                                   # This file
```

## Demo Applications

### 1. Todo List with In-Memory Storage and Server Actions

**Location:** `todo-list-in-memory-with-server-action/`

A todo list application demonstrating:
- Next.js 15 with App Router
- Server Actions for data mutations
- Server-Sent Events (SSE) for real-time updates
- In-memory state management
- TypeScript strict mode

**To run:**
```bash
cd todo-list-in-memory-with-server-action
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Shared Configuration

All apps extend the root `tsconfig.json` which provides:
- Strict TypeScript settings
- ES5 target for broad compatibility
- Modern module resolution
- JSX preservation for Next.js

Each app has its own `tsconfig.json` that extends the base configuration with app-specific settings.

## Adding New Demo Apps

1. Create a new folder at the root level
2. Add a `tsconfig.json` that extends `../tsconfig.json`
3. Set up your Next.js app inside the folder
4. Update this README with the new app details

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
