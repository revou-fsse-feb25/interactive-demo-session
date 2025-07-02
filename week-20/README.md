# Week 20 Challenge — NestJS Features

Starter code untuk Week 20 Challenge tentang fitur-fitur NestJS.

## Struktur Proyek

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts         # TODO: Implement
│   │   └── register.dto.ts      # TODO: Implement
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── common/
│   ├── interceptors/
│   │   └── remove-password.interceptor.ts  # TODO: Implement
│   └── middleware/
│       └── request-logger.middleware.ts     # TODO: Implement
├── models/
│   └── user.model.ts
├── user/
│   ├── dto/
│   │   └── update-profile.dto.ts  # TODO: Implement
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.repository.ts
│   └── user.service.ts
├── app.module.ts
└── main.ts
```

## Tugas

Lengkapi bagian-bagian yang ditandai dengan TODO:

1. **DTOs (Data Transfer Objects)**
   - `src/auth/dto/register.dto.ts`
   - `src/auth/dto/login.dto.ts`
   - `src/user/dto/update-profile.dto.ts`

2. **Interceptor (Password Removal)**
   - `src/common/interceptors/remove-password.interceptor.ts`

3. **Middleware (Request Logging)**
   - `src/common/middleware/request-logger.middleware.ts`

4. **Dependency Injection**
   - Sudah diimplementasikan sebagai contoh dalam struktur proyek

## Cara Menjalankan

1. Install dependencies:
   ```
   npm install
   ```

2. Jalankan aplikasi dalam mode development:
   ```
   npm run start:dev
   ```

3. Aplikasi akan berjalan di http://localhost:3000

## Endpoint API

- `POST /auth/register`: Membuat user baru
- `POST /auth/login`: Login dummy
- `GET /user/profile`: Mendapatkan profil user (tanpa auth)
- `PATCH /user/profile`: Update nama/password

## Pengujian

Gunakan Postman atau curl untuk menguji endpoint API.

### Contoh Data

**Register:**
```json
{
  "email": "jane@example.com",
  "password": "pass123",
  "name": "Jane"
}
```

**Update Profile:**
```json
{
  "name": "Jane Newname"
}
```

## Kriteria Sukses

- Validasi input yang kuat (DTOs)
- Penanganan respons yang aman (interceptor)
- Observabilitas yang bersih (middleware)
- Dependency Injection NestJS yang tepat
- Kode modular yang jelas (`auth`, `user`, dll.)