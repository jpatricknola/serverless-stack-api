import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userid': Identity Pool identity id of the authenticated user
    // - 'noteid': path parameter
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: event.pathParameters.id
    }
  };

  await dynamoDb.delete(params);

  return {status: true};
});