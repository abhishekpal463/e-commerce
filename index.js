const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = "us-east-1";
const dynamoDbClient = new DynamoDBClient({
  region: REGION,
});

const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
module.exports = dynamoDb;
