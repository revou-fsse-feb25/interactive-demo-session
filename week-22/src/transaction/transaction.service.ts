import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService,
  ) {}

  // Create a new transaction for an account
  async create(data: {
    accountId: string;
    amount: number;
    type: string;
    description?: string;
  }): Promise<Transaction> {
    const { accountId, amount, type, description } = data;
    
    // Create the transaction in a transaction to ensure atomicity
    return this.prisma.$transaction(async (prisma) => {
      // Get the current account
      const account = await prisma.account.findUnique({
        where: { id: accountId },
      });
      
      if (!account) {
        throw new Error('Account not found');
      }
      
      // Calculate new balance based on transaction type
      let newBalance = account.balance;
      if (type === 'deposit') {
        newBalance += amount;
      } else if (type === 'withdrawal') {
        if (account.balance < amount) {
          throw new Error('Insufficient funds');
        }
        newBalance -= amount;
      }
      
      // Update account balance
      await prisma.account.update({
        where: { id: accountId },
        data: { balance: newBalance },
      });
      
      // Create the transaction
      return prisma.transaction.create({
        data: {
          amount,
          type,
          description,
          account: {
            connect: { id: accountId },
          },
        },
      });
    });
  }

  // Get a transaction by ID
  async findById(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  // Get all transactions for an account
  async findAllByAccountId(accountId: string) {
    return this.prisma.transaction.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get all transactions for a user across all their accounts
  async findAllByUserId(userId: string) {
    // First get all accounts for the user
    const accounts = await this.prisma.account.findMany({
      where: { userId },
      select: { id: true },
    });
    
    const accountIds = accounts.map(account => account.id);
    
    // Then get all transactions for those accounts
    return this.prisma.transaction.findMany({
      where: {
        accountId: { in: accountIds },
      },
      include: {
        account: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}