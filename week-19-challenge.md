# Week 19 Challenge - Introduction to NestJS: Banking API

## Challenge Description

In this challenge, you will create a simple RESTful API for a banking application using the NestJS framework. This challenge will help you understand the basic concepts of NestJS such as Controllers, Services, Repositories, and Dependency Injection.

You will implement CRUD (Create, Read, Update, Delete) operations to manage user bank accounts with a code structure that follows NestJS best practices.

## Learning Objectives

- Understand the basic structure of a NestJS application
- Implement the Controller-Service-Repository architecture pattern
- Create a RESTful API with CRUD operations
- Apply good error handling practices
- Understand Dependency Injection in NestJS

## Requirements

### Endpoints to Implement

1. `POST /accounts`: Create a new bank account (user-specific)
2. `GET /accounts`: List all user bank accounts
3. `GET /accounts/:id`: Get specific account details
4. `PATCH /accounts/:id`: Update bank account information
5. `DELETE /accounts/:id`: Delete a bank account

### Code Structure

You must implement the following code structure:

1. **Controller**: Handle HTTP requests and responses
2. **Service Interface**: Define the contract for the service
3. **Service Implementation**: Implement business logic
4. **Repository**: Handle data interactions (for this challenge, use an in-memory array)

### Error Handling

Implement error handling for the following cases:

1. Account not found
2. Input validation (e.g., balance cannot be negative)
3. Internal server errors

## Implementation Steps

### 1. Setup NestJS Project

Install NestJS CLI globally if not already installed, create a new NestJS project, and navigate to the project directory.

### 2. Create Model/Entity

Create an Account entity with properties like id, userId, accountNumber, accountName, balance, accountType, createdAt, and updatedAt.

### 3. Create DTOs (Data Transfer Objects)

Create DTOs for creating and updating accounts with appropriate validation rules.

### 4. Create Repository

Implement a repository to handle data operations using an in-memory array.

### 5. Create Service Interface

Define the service interface with methods for CRUD operations.

### 6. Create Service Implementation

Implement the service with business logic and error handling.

### 7. Create Controller

Implement the controller to handle HTTP requests and responses.

### 8. Create Module

Create a module to organize the components.

### 9. Update App Module

Update the app module to include the accounts module.

### 10. Create Global Exception Filter

Implement a global exception filter for consistent error handling.

### 11. Update main.ts

Configure the application with validation pipes and exception filters.

### 12. Run the Application

Install required dependencies and run the application in development mode.

## Sample Data (Mock)

Here is sample data that can be used for testing the API:

```json
// POST /accounts
{
  "userId": "user123",
  "accountName": "Primary Savings",
  "balance": 1000000,
  "accountType": "SAVINGS"
}

// POST /accounts (another example)
{
  "userId": "user123",
  "accountName": "Education Fund",
  "balance": 5000000,
  "accountType": "SAVINGS"
}

// PATCH /accounts/:id
{
  "accountName": "Primary Savings Updated",
  "balance": 1500000
}
```

## Testing the API

You can use tools like Postman, Insomnia, or curl to test the API you've created.

Good luck! 🚀
