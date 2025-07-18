import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum AccountType {
  CHECKING = "checking",
  SAVINGS = "savings",
}

export class CreateAccountDto {
  @ApiProperty({
    example: "Checking Account",
    description: "Name of the account",
  })
  @IsString({ message: "Account name must be a string" })
  @IsNotEmpty({ message: "Account name is required" })
  accountName: string;

  @ApiProperty({
    example: "checking",
    description: "Type of account (e.g., checking, savings)",
    enum: AccountType, // <-- Swagger enum
  })
  @IsEnum(AccountType, {
    message: "Account type must be either checking or savings",
  })
  accountType: AccountType;

  @ApiPropertyOptional({
    example: 1000,
    description: "Initial account balance",
    default: 0,
  })
  @IsNumber({}, { message: "Balance must be a number" })
  @Min(0, { message: "Balance must be a positive number" })
  @IsOptional()
  balance: number = 0;
}

export class AccountResponseDto {
  @ApiProperty({ example: "c2f1b8e2-1234-4abc-8def-1234567890ab" })
  id: string;

  @ApiProperty({ example: "Checking Account" })
  accountName: string;

  @ApiProperty({ example: "checking", enum: AccountType })
  accountType: AccountType;

  @ApiProperty({ example: 1500 })
  balance: number;

  @ApiProperty({ example: "c2f1b8e2-1234-4abc-8def-1234567890ab" })
  userId: string;

  @ApiProperty({ example: "2025-07-18T12:34:56.789Z" })
  createdAt: Date;

  @ApiProperty({ example: "2025-07-18T12:34:56.789Z" })
  updatedAt: Date;
}
