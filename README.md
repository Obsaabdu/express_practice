# Task Management API

A simple Express.js + TypeScript REST API for managing tasks, with validation and file-based storage.

## Features

- Add, update, delete, and list tasks
- Input validation with Zod
- File-based storage
- Modular structure (controllers, routes, middlewares, models)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```sh
pnpm install
```

### Running the Server

```sh
pnpm start
# or
pnpm run dev
```

Server runs on [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  main.ts              # Entry point
  controllers/         # Route handlers
  middlewares/         # Logger, error handler, validation
  models/              # Zod schemas and types
  routes/              # Express routers
  services/            # Business logic
  storage/             # File-based DB
```

## API Documentation

See [API_documentation.md](/src/docs/API_documentation.md) for full endpoint documentation.

---

## License

MIT
