import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserWithAccountDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  async getProfile(@CurrentUser() user) {
    return this.userService.findById(user.id);
  }

  @Get('financial-profile')
  @ApiOperation({ summary: 'Get current user financial profile with accounts and transactions' })
  @ApiResponse({ status: 200, description: 'User financial profile retrieved successfully' })
  async getFinancialProfile(@CurrentUser() user) {
    return this.userService.findUserWithFinancialProfile(user.id);
  }

  // Admin only endpoint - would need additional authorization guard in real app
  @Post('with-account')
  @ApiOperation({ summary: 'Create a new user with initial account (Admin only)' })
  @ApiResponse({ status: 201, description: 'User with account created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  async createUserWithAccount(@Body() createUserWithAccountDto: CreateUserWithAccountDto) {
    return this.userService.createUserWithAccount(createUserWithAccountDto);
  }
}