import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../user/user.repository";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email
    );
    if (existingUser) {
      throw new ConflictException("Email already exists");
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

  async login(
    loginDto: LoginDto
  ): Promise<{ id: string; email: string; name: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check password (simple comparison for this challenge)
    if (user.password !== loginDto.password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Return user data (password will be removed by interceptor)
    return user;
  }
}
