# 🧠 API Documentation

## 🔹 Base URL

```
http://localhost:3000/tasks
```

---

## 📜 **1. Get All Tasks**

**GET** `/tasks`

### ✅ Response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Express.js",
      "completed": false,
      "createdAt": "2025-10-16T09:00:00.000Z",
      "updatedAt": null
    }
  ]
}
```

---

## 📜 **2. Get Task by ID**

**GET** `/tasks/:id`

### ✅ Example:

```
GET /tasks/1
```

### ✅ Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Express.js",
    "completed": false,
    "createdAt": "2025-10-16T09:00:00.000Z",
    "updatedAt": null
  }
}
```

---

## 🟢 **3. Create Task**

**POST** `/tasks`

### 🧾 Body:

```json
{
  "title": "Learn Prisma ORM"
}
```

### ✅ Response:

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Learn Prisma ORM",
    "completed": false,
    "createdAt": "2025-10-16T09:10:00.000Z"
  }
}
```

### ⚠️ Validation:

If you send an empty title:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "path": "title", "message": "Title is required" }]
}
```

---

## 🟡 **4. Update Task**

**PUT** `/tasks/:id`

### 🧾 Body:

```json
{
  "title": "Learn Prisma + Zod",
  "completed": true
}
```

### ✅ Response:

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Learn Prisma + Zod",
    "completed": true,
    "updatedAt": "2025-10-16T09:20:00.000Z"
  }
}
```

---

## 🔴 **5. Delete Task**

**DELETE** `/tasks/:id`

### ✅ Response:

```json
{
  "success": true,
  "message": "Task 2 deleted"
}
```

---

## 🧹 **6. Error Example**

If a task doesn’t exist:

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

# 🧰 Middleware Summary

| Middleware         | Description                                   |
| ------------------ | --------------------------------------------- |
| `logger`           | Logs every request with response time         |
| `errorHandler`     | Catches thrown errors and sends JSON response |
| `validate(schema)` | Validates incoming requests with Zod          |

---

# 🧪 Development Commands

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Run the app in dev mode (with hot reload) |
| `npx prisma studio`      | Open the database dashboard               |
| `npx prisma migrate dev` | Apply migrations                          |
| `npx prisma generate`    | Re-generate Prisma client                 |

---

# 💡 Future Improvements

- 🔐 Add Authentication (JWT)
- 👥 Add User model and relations (User ↔ Task)
- 🧱 Implement pagination and filtering
- 🧰 Add unit tests with Jest

---

# 🧑‍💻 Author

**Obsa Abdulkadir**
