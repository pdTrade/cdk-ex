import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Route53 } from './constructs/Route53';
import { ACM } from './constructs/ACM';
import { S3 } from './constructs/S3';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends Stack {
  public readonly route53: Route53;
  public readonly acm: ACM;
  public readonly s3: S3;
  public readonly vpc: Vpc;



  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.route53 = new Route53(this, 'Route53');

    this.acm = new ACM(this, 'ACM', {
      hosted_zone: this.route53.hosted_zone,
    });

    this.s3 = new S3(this, 'S3', {
      acm: this.acm,
      route53: this.route53,
    });

    this.vpc = new Vpc(this, 'Ex4VPC', {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'compute',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

  }

  
}
