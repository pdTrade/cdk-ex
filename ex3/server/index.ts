import express from "express";
import cors from "cors";
import {
  DynamoDBDocumentClient,
  QueryCommandInput,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const app = express();

app.use(cors());
app.use(express.json());

const ddbClient = new DynamoDBClient({ region: "ap-northeast-1" });
const docClient = DynamoDBDocumentClient.from(ddbClient);

app.get("/healthcheck", (_, res) => res.status(200).send(JSON.stringify("OK")));

app.get("/", async (_, res) => {
  const params: QueryCommandInput = {
    TableName: "main_table",
    ExpressionAttributeNames: {
      "#pk": "partition_key",
    },
    ExpressionAttributeValues: {
      ":pk": "todo",
    },
    KeyConditionExpression: "#pk = :pk",
  };

  const cmd = new QueryCommand(params);

  const { Items } = await docClient.send(cmd);

  res.status(200).send({ todos: Items });
});

app.listen(80, () => {
  console.info("API listening");
});
