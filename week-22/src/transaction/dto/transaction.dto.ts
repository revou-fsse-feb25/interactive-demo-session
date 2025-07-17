import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}

export class CreateTransactionDto {
  @ApiProperty({ example: 100.50, description: 'Transaction amount', minimum: 0.01 })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be greater than 0' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ApiProperty({ 
    example: 'deposit', 
    description: 'Type of transaction', 
    enum: TransactionType,
    enumName: 'TransactionType'
  })
  @IsEnum(TransactionType, { message: 'Type must be one of: deposit, withdrawal, transfer' })
  @IsNotEmpty({ message: 'Transaction type is required' })
  type: string;

  @ApiPropertyOptional({ example: 'Salary deposit', description: 'Description of the transaction' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}

export class TransactionResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Transaction ID' })
  id: string;

  @ApiProperty({ example: 100.50, description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ example: 'deposit', description: 'Type of transaction', enum: TransactionType })
  type: string;

  @ApiPropertyOptional({ example: 'Salary deposit', description: 'Description of the transaction' })
  description?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID of the account this transaction belongs to' })
  accountId: string;

  @ApiProperty({ example: '2023-07-15T10:30:00Z', description: 'Transaction timestamp' })
  createdAt: Date;
}