import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Bucket } from './constructs';

export class Ex2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new S3Bucket(this, 'TestBucket', {
      environment: 'dev'
    });
  }
}