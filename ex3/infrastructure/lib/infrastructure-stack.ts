import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Dynamodb } from './constructs/Dynamodb';

export class InfrastructureStack extends Stack {
  public readonly dynamodb: Dynamodb

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.dynamodb = new Dynamodb(this, 'Dynamodb')

  }
}
