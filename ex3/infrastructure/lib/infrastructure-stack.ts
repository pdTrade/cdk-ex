import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Dynamodb } from "./constructs/Dynamodb";
import { ECS } from "./constructs/ECS";
import { S3 } from "./constructs/S3";

export class InfrastructureStack extends Stack {
  public readonly dynamodb: Dynamodb;

  public readonly ecs: ECS;

  public readonly s3: S3;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.dynamodb = new Dynamodb(this, "Dynamodb");

    this.ecs = new ECS(this, "ECS", {
      dynamodb: this.dynamodb,
    });

    this.s3 = new S3(this, 'S3')
  }
}
