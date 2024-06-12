
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "ex-4/rds/my-sql-instance";

const client = new SecretsManagerClient({});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
    })
  );
} catch (error) {
  throw error;
}

const secret = response.SecretString;

export const handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(secret));
  return context.logStreamName;
};
