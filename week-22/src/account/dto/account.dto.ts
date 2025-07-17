import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: 'Checking Account', description: 'Name of the account' })
  @IsString({ message: 'Account name must be a string' })
  @IsNotEmpty({ message: 'Account name is required' })
  accountName: string;

  @ApiProperty({ example: 'checking', description: 'Type of account (e.g., checking, savings)' })
  @IsString({ message: 'Account type must be a string' })
  @IsNotEmpty({ message: 'Account type is required' })
  accountType: string;

  @ApiPropertyOptional({ example: 1000, description: 'Initial account balance', default: 0 })
  @IsNumber({}, { message: 'Balance must be a number' })
  @Min(0, { message: 'Balance must be a positive number' })
  @IsOptional()
  balance: number = 0;
}

export class AccountResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Account ID' })
  id: string;

  @ApiProperty({ example: 'Checking Account', description: 'Name of the account' })
  accountName: string;

  @ApiProperty({ example: 'checking', description: 'Type of account' })
  accountType: string;

  @ApiProperty({ example: 1000, description: 'Current account balance' })
  balance: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the user who owns this account' })
  userId: string;

  @ApiProperty({ example: '2023-07-15T10:30:00Z', description: 'Account creation timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2023-07-15T10:30:00Z', description: 'Account last update timestamp' })
  updatedAt: Date;
}