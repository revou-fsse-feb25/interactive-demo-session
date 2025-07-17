import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authToken: string;
  let userId: string;
  let accountId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    prismaService = app.get<PrismaService>(PrismaService);
    await app.init();

    // Clean up database before tests
    await prismaService.transaction.deleteMany();
    await prismaService.account.deleteMany();
    await prismaService.user.deleteMany();

    // Register a test user
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'account-test@example.com',
        password: 'password123',
        name: 'Account Test User',
      });

    userId = registerResponse.body.id;

    // Login to get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'account-test@example.com',
        password: 'password123',
      });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    // Clean up database after tests
    await prismaService.transaction.deleteMany();
    await prismaService.account.deleteMany();
    await prismaService.user.deleteMany();
    await app.close();
  });

  describe('/accounts (POST)', () => {
    it('should create a new account', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          accountName: 'Test Checking',
          accountType: 'checking',
          balance: 1000,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('accountName', 'Test Checking');
          expect(res.body).toHaveProperty('accountType', 'checking');
          expect(res.body).toHaveProperty('balance', 1000);
          expect(res.body).toHaveProperty('userId', userId);
          accountId = res.body.id; // Save for later tests
        });
    });

    it('should return 400 for invalid data', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          // Missing required fields
          balance: -100, // Invalid negative balance
        })
        .expect(400);
    });

    it('should return 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .send({
          accountName: 'Unauthorized Account',
          accountType: 'savings',
        })
        .expect(401);
    });
  });

  describe('/accounts (GET)', () => {
    it('should return all accounts for the authenticated user', () => {
      return request(app.getHttpServer())
        .get('/accounts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('accountName');
          expect(res.body[0]).toHaveProperty('userId', userId);
        });
    });

    it('should return 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .get('/accounts')
        .expect(401);
    });
  });

  describe('/accounts/:id (GET)', () => {
    it('should return a specific account', () => {
      return request(app.getHttpServer())
        .get(`/accounts/${accountId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', accountId);
          expect(res.body).toHaveProperty('accountName', 'Test Checking');
          expect(res.body).toHaveProperty('userId', userId);
        });
    });

    it('should return 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .get(`/accounts/${accountId}`)
        .expect(401);
    });

    it('should return 404 for non-existent account', () => {
      return request(app.getHttpServer())
        .get('/accounts/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('/accounts/:id/transactions (POST)', () => {
    it('should create a new transaction for an account', () => {
      return request(app.getHttpServer())
        .post(`/accounts/${accountId}/transactions`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: 500,
          type: 'deposit',
          description: 'Test deposit',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('amount', 500);
          expect(res.body).toHaveProperty('type', 'deposit');
          expect(res.body).toHaveProperty('description', 'Test deposit');
          expect(res.body).toHaveProperty('accountId', accountId);
        });
    });

    it('should update account balance after transaction', async () => {
      // Create a withdrawal transaction
      await request(app.getHttpServer())
        .post(`/accounts/${accountId}/transactions`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: 200,
          type: 'withdrawal',
          description: 'Test withdrawal',
        })
        .expect(201);

      // Check that account balance was updated
      return request(app.getHttpServer())
        .get(`/accounts/${accountId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          // Initial balance was 1000, added 500 deposit, subtracted 200 withdrawal
          expect(res.body).toHaveProperty('balance', 1300);
        });
    });

    it('should return 400 for invalid transaction data', () => {
      return request(app.getHttpServer())
        .post(`/accounts/${accountId}/transactions`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: -100, // Invalid negative amount
          type: 'invalid-type', // Invalid transaction type
        })
        .expect(400);
    });
  });

  describe('/accounts/:id/transactions (GET)', () => {
    it('should return all transactions for an account', () => {
      return request(app.getHttpServer())
        .get(`/accounts/${accountId}/transactions`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('amount');
          expect(res.body[0]).toHaveProperty('type');
          expect(res.body[0]).toHaveProperty('accountId', accountId);
        });
    });

    it('should return 401 when not authenticated', () => {
      return request(app.getHttpServer())
        .get(`/accounts/${accountId}/transactions`)
        .expect(401);
    });
  });
});