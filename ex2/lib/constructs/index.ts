import { RemovalPolicy } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface Props {
  environment: string;
}

export class S3Bucket extends Construct {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.bucket = new Bucket(scope, 'Bucket-S3', {
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}