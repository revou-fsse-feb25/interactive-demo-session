import { Injectable } from "@nestjs/common";
import { User } from "../models/user.model";

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async getFirst(): Promise<User | null> {
    return this.users.length > 0 ? this.users[0] : null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(id: string, updatedUser: User): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return updatedUser;
    }
    return null;
  }
}
