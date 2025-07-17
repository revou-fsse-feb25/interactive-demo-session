import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountService } from '../account/account.service';

@Module({
  imports: [PrismaModule],
  providers: [TransactionService, AccountService],
  exports: [TransactionService],
})
export class TransactionModule {}