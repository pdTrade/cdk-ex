import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Route53 } from './constructs/Route53';
import { ACM } from './constructs/ACM';
import { S3 } from './constructs/S3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
  public readonly route53: Route53;
  public readonly acm: ACM;
  public readonly s3: S3;


  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.route53 = new Route53(this, 'Route53');

    this.acm = new ACM(this, 'ACM', {
      hosted_zone: this.route53.hosted_zone,
    });

    this.s3 = new S3(this, 'S3', {
      acm: this.acm,
      route53: this.route53,
    });

  }

  
}
