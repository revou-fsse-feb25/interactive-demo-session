import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  // Create users with hashed passwords
  const password = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      password,
    },
  });

  console.log('Created users:', { alice, bob });

  // Create accounts for users
  const aliceChecking = await prisma.account.create({
    data: {
      accountName: 'Alice Checking',
      accountType: 'checking',
      balance: 1000,
      userId: alice.id,
    },
  });

  const aliceSavings = await prisma.account.create({
    data: {
      accountName: 'Alice Savings',
      accountType: 'savings',
      balance: 5000,
      userId: alice.id,
    },
  });

  const bobChecking = await prisma.account.create({
    data: {
      accountName: 'Bob Checking',
      accountType: 'checking',
      balance: 2000,
      userId: bob.id,
    },
  });

  console.log('Created accounts:', { aliceChecking, aliceSavings, bobChecking });

  // Create transactions
  const transactions = await Promise.all([
    // Alice's checking transactions
    prisma.transaction.create({
      data: {
        amount: 500,
        type: 'deposit',
        description: 'Paycheck deposit',
        accountId: aliceChecking.id,
      },
    }),
    prisma.transaction.create({
      data: {
        amount: 50,
        type: 'withdrawal',
        description: 'ATM withdrawal',
        accountId: aliceChecking.id,
      },
    }),
    // Alice's savings transactions
    prisma.transaction.create({
      data: {
        amount: 1000,
        type: 'deposit',
        description: 'Transfer from checking',
        accountId: aliceSavings.id,
      },
    }),
    // Bob's checking transactions
    prisma.transaction.create({
      data: {
        amount: 200,
        type: 'withdrawal',
        description: 'Grocery shopping',
        accountId: bobChecking.id,
      },
    }),
  ]);

  console.log(`Created ${transactions.length} transactions`);
  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });