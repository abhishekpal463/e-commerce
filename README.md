
# AWS AppSync & Lambda-based Microservice

This project is a **serverless** product management API built using **AWS AppSync** for the GraphQL API, **AWS Lambda** for business logic, and **Amazon DynamoDB** as the data store. The API allows users to create, update, and retrieve product details through a GraphQL interface.

## Features

- **AWS AppSync** provides the GraphQL API interface.
- **AWS Lambda** processes requests and interacts with DynamoDB.
- **DynamoDB** is used to store product information.
- **GraphQL API** supports product creation, retrieval, and updates.
- **Jest** is used for testing the business logic.
- **GitHub Actions** is used to automate the CI/CD pipeline, including testing, building, and deploying the application.

## Getting Started

### Prerequisites

- **AWS Account** - You need an AWS account to deploy the AppSync API, Lambda functions, and DynamoDB.
- **Node.js** - Make sure you have Node.js installed (v14.x or above).
- **AWS CLI** - AWS Command Line Interface configured on your machine.
- **Serverless Framework** - A framework for deploying Lambda functions easily.

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abhishekpal463/e-commerce.git
   cd your-repository
   ```

2. **Install dependencies**:

   Install the Node.js dependencies:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file to store AWS credentials, API keys, and other environment variables (if required).

   Example `.env` file:
   ```
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   ```

## Deployment

We have configured a **CI/CD pipeline** using **GitHub Actions** to automate the process of building, testing, and deploying the application. This ensures that the application is consistently deployed to AWS Lambda and AppSync whenever new changes are pushed to the `main` branch.

### Steps:

1. **Continuous Integration (CI)**:
   - When code is pushed to the `main` branch, the pipeline will:
     - **Run tests** using **Jest** to ensure the business logic is functioning correctly.
     - **Build** the application to package the Lambda function and its dependencies.

2. **Continuous Deployment (CD)**:
   - If all tests pass, the pipeline will automatically deploy the updated Lambda functions to AWS.
   - The **Serverless Framework** is used to manage and deploy AWS resources, including:
     - **AWS Lambda** functions for the backend logic.
     - **AppSync** as the GraphQL API layer.
     - **DynamoDB** for data persistence.

3. **Automated Testing**:
   - The pipeline also runs **unit tests** to validate the application logic before deployment.
   - If any test fails, the deployment is aborted, ensuring only error-free code is deployed.

### Deploy using GitHub Actions:

1. **Pipeline Trigger**:
   - The GitHub Actions pipeline is triggered automatically when you push code to the `main` branch.

2. **GitHub Actions Workflow**:
   - The `.github/workflows/main.yml` file contains the configuration for the CI/CD pipeline.
   - This workflow will:
     - Install the necessary dependencies.
     - Run unit tests to ensure code quality.
     - Deploy the Lambda functions and related resources to AWS.

3. **Manual Deployment** (if needed):
   - You can still manually deploy the application using the **Serverless Framework**.
   
   Run the following command to manually deploy:

   ```bash
   serverless deploy
   ```

## Testing the API

### Postman Setup

To test the API via **Postman**:

1. **Create a new POST request** in Postman.
2. Use your AppSync GraphQL endpoint as the request URL:
   ```
   https://<appsync-api-id>.appsync-api.<region>.amazonaws.com/graphql
   ```
3. **Add the following headers**:
   - `x-api-key: <your-api-key>`
   - `Content-Type: application/json`


### Running Tests

To run the Jest test cases for the service logic:

```bash
npm test
```

Ensure that you have written proper test cases for business logic (for example, in `productService.test.js`).

## GraphQL Queries & Mutations

### Sample Queries

#### Get Product by ID
```graphql
query GetProduct($input: GetProductInput!) {
  getProduct(input: $input) {
    productId
    name
    description
  }
}
```

#### Create Product
```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    name
    description
    category
    price
    stock
  }
}
```

#### Update Product
```graphql
mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    productId
    name
    description
    category
    price
    stock
  }
}
```
