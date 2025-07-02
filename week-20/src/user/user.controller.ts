import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  async getProfile() {
    // For simplicity, we'll return the first user in the repository
    // In a real app, you would get the user from the authenticated session
    const user = await this.userService.getFirstUser();
    if (!user) {
      throw new NotFoundException("No users found");
    }
    return user;
  }

  @Patch("profile")
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    // For simplicity, we'll update the first user in the repository
    // In a real app, you would get the user ID from the authenticated session
    const user = await this.userService.getFirstUser();
    if (!user) {
      throw new NotFoundException("No users found");
    }
    return this.userService.updateProfile(user.id, updateProfileDto);
  }
}
