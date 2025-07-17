import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 6 characters)' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;
}

export class CreateUserWithAccountDto extends CreateUserDto {
  @ApiProperty({ example: 'Primary Checking', description: 'Name of the initial account' })
  @IsString({ message: 'Account name must be a string' })
  @IsNotEmpty({ message: 'Account name is required' })
  accountName: string;

  @ApiProperty({ example: 'checking', description: 'Type of the initial account' })
  @IsString({ message: 'Account type must be a string' })
  @IsNotEmpty({ message: 'Account type is required' })
  accountType: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  name?: string;

  @ApiProperty({ example: '2023-07-15T10:30:00Z', description: 'User creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-15T10:30:00Z', description: 'User last update timestamp' })
  updatedAt: Date;
}

export class UserWithAccountsResponseDto extends UserResponseDto {
  @ApiProperty({ description: 'User accounts', type: 'array', isArray: true })
  accounts: any[];
}

export class UserWithFinancialProfileResponseDto extends UserResponseDto {
  @ApiProperty({ description: 'User accounts with transactions', type: 'array', isArray: true })
  accounts: {
    id: string;
    accountName: string;
    accountType: string;
    balance: number;
    transactions: any[];
  }[];
}