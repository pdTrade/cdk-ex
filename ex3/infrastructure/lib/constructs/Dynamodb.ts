import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class Dynamodb extends Construct {
  public readonly main_table: Table

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.main_table = new Table(scope, 'MainTable', {
      partitionKey: {
        name: 'partition_key',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'sort_key',
        type: AttributeType.STRING
      },
      tableName: 'main_table',
      removalPolicy: RemovalPolicy.DESTROY
    });


  }
}