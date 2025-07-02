# Week 20 Challenge — NestJS Features

---

## 🎯 Endpoints

- `POST /auth/register`: Create new user
- `POST /auth/login`: Dummy login
- `GET /user/profile`: Retrieve user profile (no auth required)
- `PATCH /user/profile`: Update name/password

---

### 1. **DTOs (Data Transfer Objects)**

- Create DTOs for user registration, login, and profile update.
- Use `class-validator` decorators to enforce input constraints (e.g., email must be valid, password not empty, etc.).
- Each incoming request to `/auth/register`, `/auth/login`, and `/user/profile` (PATCH) should be validated with the appropriate DTO.

---

### 2. **Interceptor (Password Removal)**

- Develop an interceptor that automatically **removes the `password` field** from any user data in the response.
  - Should work for single object or array responses.
  - Should not affect other fields.
- Apply the interceptor globally or to relevant controllers/routes so that **password is never leaked in any API response**.

---

### 3. **Middleware (Request Logging)**

- Create a middleware that logs **method**, **path**, and **timestamp** for every incoming request.
- This should run early in the request lifecycle (before controllers).

---

### 4. **Dependency Injection**

- Organize your user data provider (repository) and business logic (service) as injectable classes.
- Inject repositories into services, and services into controllers using NestJS’s DI framework.
- Store users in an in-memory array within the repository.

---

## 📝 Sample Data

```json
// Register
{
  "email": "jane@example.com",
  "password": "pass123",
  "name": "Jane"
}

// Patch
{
  "name": "Jane Newname"
}

```

**Example user object in-memory:**

```json
{
  "id": "u1",
  "email": "jane@example.com",
  "name": "Jane",
  "password": "pass123"
}
```

**Response with interceptor:**

```json
{
  "id": "u1",
  "email": "jane@example.com",
  "name": "Jane"
}
```

---

## 🧪 Testing

- Use Postman or curl to verify endpoints.
- Ensure DTO validation works (rejects bad input).
- Confirm password field is never present in any response.
- Check console logs reflect all requests (from middleware).

---

**Success Criteria:**

- Robust input validation (DTOs)
- Secure response handling (interceptor)
- Clean observability (middleware)
- Proper NestJS service/repository DI
- Clear modular codebase (`auth`, `user`, etc.)

---

**Happy coding! 🚀**
