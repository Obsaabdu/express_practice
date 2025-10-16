# Task Management API Documentation

Base URL: `http://localhost:3000`

---

## Endpoints

### 1. Get All Tasks

- **GET** `/tasks`
- **Response:**
  - `200 OK` — Array of task objects

### 2. Get Task by ID

- **GET** `/tasks/:id`
- **Params:**
  - `id` (number, required)
- **Response:**
  - `200 OK` — Task object
  - `404 Not Found` — If not found

### 3. Add Task

- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "string (required)",
    "completed": "boolean (optional)"
  }
  ```
- **Response:**
  - `201 Created` — Created task object
  - `400 Bad Request` — Validation error

### 4. Update Task

- **PUT** `/tasks/:id`
- **Params:**
  - `id` (number, required)
- **Body:**
  ```json
  {
    "title": "string (optional)",
    "completed": "boolean (optional)"
  }
  ```
- **Response:**
  - `200 OK` — Updated task object
  - `400 Bad Request` — Validation error
  - `404 Not Found` — If not found

### 5. Delete Task

- **DELETE** `/tasks/:id`
- **Params:**
  - `id` (number, required)
- **Response:**
  - `200 OK` — Success message
  - `404 Not Found` — If not found

### 6. Delete All Tasks

- **DELETE** `/tasks`
- **Response:**
  - `200 OK` — Success message

---

## Task Object Schema

```json
{
  "id": number,
  "title": string,
  "completed": boolean,
  "createdAt": string (ISO 8601),
  "updatedAt": string (ISO 8601 | null)
}
```

---

## Error Response Example

```json
{
  "message": "Validation error",
  "errors": [
    { "path": "title", "message": "Title is required and must be non-empty." }
  ]
}
```

---

## Notes

- All endpoints return JSON.
- Validation errors return HTTP 400 with details.
- Dates are in ISO 8601 string format.
