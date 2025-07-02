import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "../models/user.model";

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

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto
  ): Promise<User> {
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
