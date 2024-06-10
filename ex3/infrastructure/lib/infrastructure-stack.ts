import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Dynamodb } from "./constructs/Dynamodb";
import { ECS } from "./constructs/ECS";

export class InfrastructureStack extends Stack {
  public readonly dynamodb: Dynamodb;

  public readonly ecs: ECS;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.dynamodb = new Dynamodb(this, "Dynamodb");

    this.ecs = new ECS(this, "ECS", {
      dynamodb: this.dynamodb,
    });
  }
}
