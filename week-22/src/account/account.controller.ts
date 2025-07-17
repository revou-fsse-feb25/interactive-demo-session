import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TransactionService } from '../transaction/transaction.service';
import { CreateAccountDto, AccountResponseDto } from './dto/account.dto';
import { CreateTransactionDto, TransactionResponseDto } from '../transaction/dto/transaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@ApiBearerAuth()
export class AccountController {
  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of accounts', type: [AccountResponseDto] })
  async findAll(@CurrentUser() user) {
    return this.accountService.findAllByUserId(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'Account details', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async findOne(@Param('id') id: string, @CurrentUser() user) {
    // You might want to add authorization check here to ensure
    // the user can only access their own accounts
    return this.accountService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account created successfully', type: AccountResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user,
  ) {
    return this.accountService.create({
      ...createAccountDto,
      userId: user.id,
    });
  }

  @Get(':id/transactions')
  @ApiOperation({ summary: 'Get all transactions for an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiResponse({ status: 200, description: 'List of transactions', type: [TransactionResponseDto] })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async findAccountTransactions(@Param('id') id: string, @CurrentUser() user) {
    // You might want to add authorization check here to ensure
    // the user can only access transactions for their own accounts
    return this.transactionService.findAllByAccountId(id);
  }

  @Post(':id/transactions')
  @ApiOperation({ summary: 'Create a new transaction for an account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully', type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  async createTransaction(
    @Param('id') id: string,
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user,
  ) {
    // You might want to add authorization check here to ensure
    // the user can only create transactions for their own accounts
    return this.transactionService.create({
      ...createTransactionDto,
      accountId: id,
    });
  }
}