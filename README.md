# 📘 Task Management API

A clean, modular, and production-grade **REST API** built with
**TypeScript, Express.js, Prisma ORM, PostgreSQL, and Zod validation**.

It provides full CRUD operations for managing tasks — with type safety, validation, and database persistence.

---

## 🚀 Features

- 🧠 **Type-safe** from end to end (TypeScript + Prisma)
- 💾 **PostgreSQL** as persistent storage
- 🧩 **Zod validation** for input safety
- ⚙️ **Express middleware** for logging and error handling
- 🔁 **Full CRUD API** for task management
- 🧱 **Scalable structure** — ready for new modules (like users, auth, etc.)

---

## 🗂️ Project Structure

```
src/
├── main.ts
├── db.ts
├── routers/
│   └── taskRouter.ts
├── controllers/
│   └── taskController.ts
├── services/
│   └── taskService.ts
├── middlewares/
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── validator.ts
├── schemas/
│   └── taskSchema.ts
prisma/
│   └── schema.prisma
```

---

## 🧩 Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Language   | TypeScript |
| Framework  | Express.js |
| ORM        | Prisma     |
| Database   | PostgreSQL |
| Validation | Zod        |
| Runtime    | Node.js    |

---

## ⚙️ Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/task-api.git
cd task-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/task_manager?schema=public"
PORT=3000
```

### 4️⃣ Initialize Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Start the server

```bash
npm run dev
```

---
