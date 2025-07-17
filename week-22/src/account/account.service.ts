import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  // Create a new account for a user
  async create(data: {
    userId: string;
    accountName: string;
    accountType: string;
    balance: number;
  }): Promise<Account> {
    const { userId, ...accountData } = data;
    
    return this.prisma.account.create({
      data: {
        ...accountData,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  // Get an account by ID
  async findById(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  // Get an account with its transactions
  async findAccountWithTransactions(accountId: string) {
    return this.prisma.account.findUnique({
      where: { id: accountId },
      include: {
        transactions: true,
      },
    });
  }

  // Get all accounts for a user
  async findAllByUserId(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  // Get all accounts with their transactions for a user
  async findAllWithTransactionsByUserId(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      include: {
        transactions: true,
      },
    });
  }

  // Update account balance
  async updateBalance(accountId: string, newBalance: number) {
    return this.prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });
  }
}