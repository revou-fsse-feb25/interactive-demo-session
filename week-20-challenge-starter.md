# Week 20 Challenge — NestJS Features (Starter Code)

Berikut adalah starter code untuk Week 20 Challenge tentang fitur-fitur NestJS. Kode ini fokus pada 4 aspek utama yang perlu dilengkapi oleh student: DTO, Interceptor, Middleware, dan Dependency Injection.

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

## File-file yang Perlu Dilengkapi

### 1. DTOs (Data Transfer Objects)

#### `src/auth/dto/register.dto.ts`
```typescript
// TODO: Implement RegisterDto with class-validator decorators
// Should validate email, password, and name

export class RegisterDto {
  // Add properties and validation decorators here
  email: string;
  password: string;
  name: string;
}
```

#### `src/auth/dto/login.dto.ts`
```typescript
// TODO: Implement LoginDto with class-validator decorators
// Should validate email and password

export class LoginDto {
  // Add properties and validation decorators here
  email: string;
  password: string;
}
```

#### `src/user/dto/update-profile.dto.ts`
```typescript
// TODO: Implement UpdateProfileDto with class-validator decorators
// Should validate name and/or password (both optional)

export class UpdateProfileDto {
  // Add properties and validation decorators here
  name?: string;
  password?: string;
}
```

### 2. Interceptor (Password Removal)

#### `src/common/interceptors/remove-password.interceptor.ts`
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  // TODO: Implement the intercept method to remove password field from response
  // The interceptor should work for both single objects and arrays
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Your implementation here
    // Hint: Use rxjs operators like map to transform the response
    
    return next.handle();
  }
}
```

### 3. Middleware (Request Logging)

#### `src/common/middleware/request-logger.middleware.ts`
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  // TODO: Implement the middleware to log request method, path, and timestamp
  
  use(req: Request, res: Response, next: NextFunction) {
    // Your implementation here
    // Hint: Use console.log to output the required information
    
    next();
  }
}
```

### 4. Dependency Injection

Dependency Injection sudah diimplementasikan sebagai contoh dalam struktur proyek:
- Repository diinjeksi ke Service
- Service diinjeksi ke Controller

## File-file Lainnya

### `src/models/user.model.ts`
```typescript
export class User {
  id: string;
  email: string;
  name: string;
  password: string;
}
```

### `src/auth/auth.controller.ts`
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

### `src/auth/auth.service.ts`
```typescript
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.userRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password, // In a real app, you would hash this password
    };

    // Save user
    return this.userRepository.create(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ id: string; email: string; name: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check password (simple comparison for this challenge)
    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user data (password will be removed by interceptor)
    return user;
  }
}
```

### `src/auth/auth.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
```

### `src/user/user.controller.ts`
```typescript
import { Controller, Get, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile() {
    // For simplicity, we'll return the first user in the repository
    // In a real app, you would get the user from the authenticated session
    const user = await this.userService.getFirstUser();
    if (!user) {
      throw new NotFoundException('No users found');
    }
    return user;
  }

  @Patch('profile')
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    // For simplicity, we'll update the first user in the repository
    // In a real app, you would get the user ID from the authenticated session
    const user = await this.userService.getFirstUser();
    if (!user) {
      throw new NotFoundException('No users found');
    }
    return this.userService.updateProfile(user.id, updateProfileDto);
  }
}
```

### `src/user/user.service.ts`
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getFirstUser(): Promise<User | null> {
    return this.userRepository.getFirst();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.getUserById(id);
    
    // Update fields if provided
    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }
    
    if (updateProfileDto.password) {
      user.password = updateProfileDto.password; // In a real app, you would hash this password
    }
    
    return this.userRepository.update(id, user);
  }
}
```

### `src/user/user.repository.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async getFirst(): Promise<User | null> {
    return this.users.length > 0 ? this.users[0] : null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(id: string, updatedUser: User): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return updatedUser;
    }
    return null;
  }
}
```

### `src/user/user.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
```

### `src/app.module.ts`
```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RemovePasswordInterceptor } from './common/interceptors/remove-password.interceptor';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    // Register the interceptor globally
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply middleware to all routes
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
```

### `src/main.ts`
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties not in DTO
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    transform: true, // Transform payloads to DTO instances
  }));
  
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
```

## Cara Menjalankan

1. Buat folder proyek baru dan salin semua file di atas ke dalam struktur yang sesuai

2. Install dependencies:
   ```
   npm install @nestjs/common @nestjs/core @nestjs/platform-express class-transformer class-validator reflect-metadata rxjs uuid
   npm install --save-dev @nestjs/cli @nestjs/schematics @types/express @types/node @types/uuid typescript
   ```

3. Jalankan aplikasi dalam mode development:
   ```
   npm run start:dev
   ```

4. Aplikasi akan berjalan di http://localhost:3000

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