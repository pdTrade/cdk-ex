import { RemovalPolicy } from "aws-cdk-lib";
import { Bucket} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class S3 extends Construct {
  public readonly web_bucket: Bucket
  
  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.web_bucket = new Bucket(scope, 'WebBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,

    });



  }
}